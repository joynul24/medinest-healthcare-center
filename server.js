import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DOCTORS_DATA,
  INITIAL_APPOINTMENTS,
  INITIAL_USERS,
  SERVICES_DATA,
  TESTIMONIALS_DATA,
} from './src/data/mockData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET =
  process.env.ACCESS_TOKEN_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI
const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PASS;
const uri =
  process.env.MONGODB_URI ||
  `mongodb+srv://${dbName}:${dbPass}@cluster0.svgbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let db = null;
let doctorsCollection = null;
let appointmentsCollection = null;
let usersCollection = null;
let reviewsCollection = null;
let servicesCollection = null;

// Local in-memory store as fallback if MongoDB Atlas IP whitelist or network is unavailable
let localStore = {
  doctors: [...DOCTORS_DATA],
  appointments: [...INITIAL_APPOINTMENTS],
  users: [...INITIAL_USERS],
  reviews: [...TESTIMONIALS_DATA],
  services: [...SERVICES_DATA],
};

// Initialize MongoDB connection
async function connectDB() {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      connectTimeoutMS: 8000,
      serverSelectionTimeoutMS: 8000,
    });

    await client.connect();
    db = client.db(dbName);
    doctorsCollection = db.collection('doctors');
    appointmentsCollection = db.collection('appointments');
    usersCollection = db.collection('users');
    reviewsCollection = db.collection('reviews');
    servicesCollection = db.collection('services');

    console.log('[MediNest Backend] Successfully connected to MongoDB Atlas!');

    // Seed initial data if collections are empty
    const doctorsCount = await doctorsCollection.countDocuments();
    if (doctorsCount === 0) {
      await doctorsCollection.insertMany(DOCTORS_DATA);
      console.log('[MediNest Backend] Seeded initial doctors data to MongoDB.');
    }

    const appointmentsCount = await appointmentsCollection.countDocuments();
    if (appointmentsCount === 0) {
      await appointmentsCollection.insertMany(INITIAL_APPOINTMENTS);
      console.log('[MediNest Backend] Seeded initial appointments data to MongoDB.');
    }

    const usersCount = await usersCollection.countDocuments();
    if (usersCount === 0) {
      await usersCollection.insertMany(INITIAL_USERS);
      console.log('[MediNest Backend] Seeded initial users data to MongoDB.');
    }

    const reviewsCount = await reviewsCollection.countDocuments();
    if (reviewsCount === 0) {
      await reviewsCollection.insertMany(TESTIMONIALS_DATA);
      console.log('[MediNest Backend] Seeded initial reviews data to MongoDB.');
    }

    const servicesCount = await servicesCollection.countDocuments();
    if (servicesCount === 0) {
      await servicesCollection.insertMany(SERVICES_DATA);
      console.log('[MediNest Backend] Seeded initial services data to MongoDB.');
    }
  } catch (error) {
    console.warn('[MediNest Backend] MongoDB Atlas connection error. Using high-availability fallback:', error.message);
    db = null;
  }
}

connectDB();

// =================================================================
// JWT AUTHENTICATION MIDDLEWARES
// =================================================================

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized access: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access: Malformed token' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized access: Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

// Verify Admin Role
const verifyAdmin = async (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden access: Administrator privileges required' });
  }
  next();
};

// =================================================================
// AUTHENTICATION & JWT ENDPOINTS
// =================================================================

// Issue JWT Token on login
app.post('/api/jwt', (req, res) => {
  try {
    const { email, role, displayName, uid } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required to issue token' });
    }

    const payload = {
      email,
      role: role || (email.includes('admin') ? 'admin' : 'user'),
      displayName: displayName || email.split('@')[0],
      uid: uid || `usr-${Date.now()}`,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: payload });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate JWT token', error: error.message });
  }
});

// Clear token on logout
app.post('/api/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// =================================================================
// DOCTORS API
// =================================================================

// GET all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    if (db && doctorsCollection) {
      const doctors = await doctorsCollection.find({}).toArray();
      return res.json(doctors);
    }
    res.json(localStore.doctors);
  } catch (error) {
    res.json(localStore.doctors);
  }
});

// GET doctor by ID
app.get('/api/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db && doctorsCollection) {
      let doctor = null;
      try {
        doctor = await doctorsCollection.findOne({ _id: new ObjectId(id) });
      } catch {
        doctor = await doctorsCollection.findOne({ id });
      }
      if (doctor) return res.json(doctor);
    }
    const local = localStore.doctors.find((d) => d.id === id) || localStore.doctors[0];
    res.json(local);
  } catch (error) {
    res.json(localStore.doctors[0]);
  }
});

// POST add new doctor (Admin Protected)
app.post('/api/doctors', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const doctorData = {
      id: `doc-${Date.now()}`,
      rating: 5,
      reviewsCount: 1,
      location: 'Dhanmondi, Dhaka - Bangladesh',
      availableDate: 'Available All Week',
      price: 15,
      featured: false,
      tags: ['General', req.body.specialty],
      about: `${req.body.name} is a dedicated healthcare specialist in ${req.body.specialty}.`,
      education: [{ institution: 'Medical College', degree: 'MBBS', year: '2015' }],
      experience: [{ role: 'MediNest Specialist', period: '2020 - Present' }],
      awards: [],
      services: [req.body.specialty, 'Consultation'],
      specializations: [req.body.specialty],
      businessHours: [{ day: 'Monday - Friday', hours: '09:00 AM - 05:00 PM' }],
      ...req.body,
      createdAt: new Date(),
    };

    if (db && doctorsCollection) {
      const result = await doctorsCollection.insertOne(doctorData);
      return res.status(201).json({ ...doctorData, _id: result.insertedId });
    }

    localStore.doctors = [doctorData, ...localStore.doctors];
    res.status(201).json(doctorData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create doctor', error: error.message });
  }
});

// DELETE doctor (Admin Protected)
app.delete('/api/doctors/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (db && doctorsCollection) {
      try {
        await doctorsCollection.deleteOne({ _id: new ObjectId(id) });
      } catch {
        await doctorsCollection.deleteOne({ id });
      }
    }
    localStore.doctors = localStore.doctors.filter((d) => d.id !== id);
    res.json({ success: true, message: 'Doctor deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete doctor', error: error.message });
  }
});

// =================================================================
// APPOINTMENTS API
// =================================================================

// GET all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const { email } = req.query;
    if (db && appointmentsCollection) {
      const query = email ? { userEmail: email } : {};
      const appointments = await appointmentsCollection.find(query).toArray();
      return res.json(appointments);
    }
    const filtered = email
      ? localStore.appointments.filter((a) => a.userEmail === email)
      : localStore.appointments;
    res.json(filtered);
  } catch (error) {
    res.json(localStore.appointments);
  }
});

// POST book new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const appointmentData = {
      id: `apt-${Date.now()}`,
      status: 'unpaid',
      price: req.body.price || 200,
      createdAt: new Date(),
      ...req.body,
    };

    if (db && appointmentsCollection) {
      const result = await appointmentsCollection.insertOne(appointmentData);
      return res.status(201).json({ ...appointmentData, _id: result.insertedId });
    }

    localStore.appointments = [appointmentData, ...localStore.appointments];
    res.status(201).json(appointmentData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
});

// PATCH payment for appointment
app.patch('/api/appointments/:id/pay', async (req, res) => {
  try {
    const { id } = req.params;
    const transactionId = `tx_${Math.random().toString(36).substring(2, 12)}`;

    if (db && appointmentsCollection) {
      try {
        await appointmentsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: 'paid', transactionId, paidAt: new Date() } }
        );
      } catch {
        await appointmentsCollection.updateOne(
          { id },
          { $set: { status: 'paid', transactionId, paidAt: new Date() } }
        );
      }
    }

    localStore.appointments = localStore.appointments.map((apt) =>
      apt.id === id || apt._id === id
        ? { ...apt, status: 'paid', transactionId, paidAt: new Date() }
        : apt
    );

    res.json({ success: true, message: 'Payment recorded', transactionId, id });
  } catch (error) {
    res.status(500).json({ message: 'Payment processing failed', error: error.message });
  }
});

// =================================================================
// USERS API
// =================================================================

// GET all users (Admin Protected)
app.get('/api/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    if (db && usersCollection) {
      const users = await usersCollection.find({}).toArray();
      return res.json(users);
    }
    res.json(localStore.users);
  } catch (error) {
    res.json(localStore.users);
  }
});

// POST sync user record on registration/login
app.post('/api/users', async (req, res) => {
  try {
    const { email, name, photoURL, role } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const userDoc = {
      id: `usr-${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      photoURL: photoURL || '',
      role: role || (email.includes('admin') ? 'admin' : 'user'),
      favoriteColor: 'Teal',
      lastLogin: new Date(),
    };

    if (db && usersCollection) {
      const existing = await usersCollection.findOne({ email });
      if (existing) {
        await usersCollection.updateOne({ email }, { $set: { lastLogin: new Date() } });
        return res.json(existing);
      }
      await usersCollection.insertOne(userDoc);
      return res.status(201).json(userDoc);
    }

    const existingLocal = localStore.users.find((u) => u.email === email);
    if (!existingLocal) {
      localStore.users = [userDoc, ...localStore.users];
    }
    res.status(201).json(userDoc);
  } catch (error) {
    res.status(500).json({ message: 'User sync failed', error: error.message });
  }
});

// PATCH promote to admin (Admin Protected)
app.patch('/api/users/:id/make-admin', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (db && usersCollection) {
      try {
        await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { role: 'admin' } });
      } catch {
        await usersCollection.updateOne({ id }, { $set: { role: 'admin' } });
      }
    }
    localStore.users = localStore.users.map((u) => (u.id === id ? { ...u, role: 'admin' } : u));
    res.json({ success: true, message: 'User promoted to admin', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to promote user', error: error.message });
  }
});

// DELETE remove user (Admin Protected)
app.delete('/api/users/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (db && usersCollection) {
      try {
        await usersCollection.deleteOne({ _id: new ObjectId(id) });
      } catch {
        await usersCollection.deleteOne({ id });
      }
    }
    localStore.users = localStore.users.filter((u) => u.id !== id);
    res.json({ success: true, message: 'User deleted', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

// =================================================================
// SERVICES API
// =================================================================

// GET all clinical services from MongoDB Atlas
app.get('/api/services', async (req, res) => {
  try {
    if (db && servicesCollection) {
      const services = await servicesCollection.find({}).toArray();
      return res.json(services);
    }
    res.json(localStore.services);
  } catch (error) {
    res.json(localStore.services);
  }
});

// =================================================================
// REVIEWS API
// =================================================================

// GET all reviews from MongoDB Atlas
app.get('/api/reviews', async (req, res) => {
  try {
    if (db && reviewsCollection) {
      const reviews = await reviewsCollection.find({}).sort({ createdAt: -1 }).toArray();
      return res.json(reviews);
    }
    res.json(localStore.reviews);
  } catch (error) {
    res.json(localStore.reviews);
  }
});

// POST create review into MongoDB Atlas
app.post('/api/reviews', async (req, res) => {
  try {
    let userFromToken = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        userFromToken = jwt.verify(token, JWT_SECRET);
      } catch {
        // Fallback gracefully if token is expired
      }
    }

    const reviewData = {
      id: req.body.id || `rev-${Date.now()}`,
      name: req.body.name || userFromToken?.displayName || 'Verified Patient',
      userEmail: req.body.userEmail || userFromToken?.email || '',
      role: req.body.role || 'Verified Patient',
      treatment: req.body.treatment || 'Teeth Orthodontics',
      rating: Number(req.body.rating) || 5,
      comment: req.body.comment || '',
      avatar:
        req.body.avatar ||
        userFromToken?.photoURL ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      doctorName: req.body.doctorName || 'Dr. Ruby Perrin',
      specialty: req.body.specialty || req.body.treatment || 'Teeth Orthodontics',
      date:
        req.body.date ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date(),
    };

    if (db && reviewsCollection) {
      const result = await reviewsCollection.insertOne(reviewData);
      return res.status(201).json({ ...reviewData, _id: result.insertedId });
    }

    localStore.reviews = [reviewData, ...localStore.reviews];
    res.status(201).json(reviewData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
});

// PATCH update review in MongoDB Atlas
app.patch('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body, updatedAt: new Date() };
    delete updateFields._id;

    if (db && reviewsCollection) {
      try {
        await reviewsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
      } catch {
        await reviewsCollection.updateOne({ id }, { $set: updateFields });
      }
    }

    localStore.reviews = localStore.reviews.map((r) =>
      r.id === id || r._id === id ? { ...r, ...updateFields } : r
    );

    res.json({ success: true, message: 'Review updated successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review', error: error.message });
  }
});

// DELETE review from MongoDB Atlas
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (db && reviewsCollection) {
      try {
        await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
      } catch {
        await reviewsCollection.deleteOne({ id });
      }
    }

    localStore.reviews = localStore.reviews.filter((r) => r.id !== id && r._id !== id);
    res.json({ success: true, message: 'Review deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
});

// =================================================================
// VITE SPA MIDDLEWARE INTEGRATION (PORT 3000)
// =================================================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MediNest] Full-stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
