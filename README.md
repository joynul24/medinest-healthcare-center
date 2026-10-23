# 🏥 MediNest — Next-Generation Healthcare & Appointment Management Platform

[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js & Express](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2F%20Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase Auth](https://img.shields.io/badge/Auth-Firebase%20%26%20OAuth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **MediNest** is a patient-centric, full-stack digital healthcare solution engineered to simplify specialist doctor discovery, streamline appointment scheduling, securely persist medical records, and facilitate verified patient feedback.

---

## 📌 Executive Summary (For Recruiters & Hiring Managers)

As a full-stack software engineer, I built **MediNest** to bridge the gap between patients and quality healthcare providers. Healthcare interfaces frequently suffer from cluttered workflows, slow load times, and fragmented authentication flows. MediNest addresses these real-world challenges through:

1. **User-First Architecture**: High-speed, responsive single-page application (SPA) running React 19 and Vite with zero page flickers.
2. **Robust Multi-Provider Authentication**: Integrated Firebase Auth with Google OAuth, backed by a persistent account switcher modal and custom fallbacks for restricted preview environments.
3. **End-to-End Persistence**: Synchronous profile and transactional data syncing between Firebase Auth, JWT-secured Express endpoints, and MongoDB.
4. **Resilient Data Pipelines**: Smart offline-resilient caching, optimistic UI updates, and automated fallback layers for doctor directories and patient reviews.
5. **Clean Code & Modularity**: Separation of concerns across service layers, custom React hooks, declarative Tailwind styling, and reusable micro-components.

---

## 🚀 Key Features & Capabilities

### 🩺 1. Specialist Doctor Discovery & Filtering
- Browse verified medical professionals categorized by medical specialties (Cardiology, Neurology, Pediatrics, Orthopedics, Dermatology, General Medicine).
- Real-time search by doctor name, specialty, availability, and consultation fees.
- Detailed doctor profiles with academic credentials, hospital affiliations, patient satisfaction ratings, and working schedules.

### 📅 2. Intuitive Appointment Booking Engine
- Step-by-step booking modal with instant date and time slot validation.
- Automatic conflict prevention ensuring double bookings cannot occur.
- Personalized dashboard for patients to view upcoming consultations, reschedule, or cancel appointments.

### ⭐ 3. Verified Patient Reviews & Rating System
- Patient review submission with 1–5 star ratings, structured feedback, and submission timestamps.
- Direct persistence to MongoDB with automatic caching in `apiServices.js` to eliminate unnecessary network re-fetches.
- Dynamic average rating and review counter recalculations on doctor profile cards.

### 🔐 4. Enterprise-Grade Authentication & Profile Security
- **Dual Sign-In Pathways**: Standard Email/Password registration alongside one-click Google Social Sign-In.
- **Account Switcher Modal**: Tailored Google account selection popup enabling users to pick from multiple accounts or input custom test credentials.
- **Persistent User Synchronization**: Automatic profile avatar and display name resolution from Google tokens directly to the application navbar and database.
- **Protected Routes & Role-Based Access**: Role validation separating standard Patient interactions from administrative views.

### 🖼️ 5. Cloud Media Uploads (ImgBB Cloud API)
- Direct image uploading for user profile avatars and medical prescriptions via ImgBB API.
- Instant client-side image preview with file type verification and size constraint safeguards.

### 📱 6. 100% Fully Responsive Design
- Handcrafted with Tailwind CSS for pixel-perfect presentation across **Smartphones, Tablets, Laptops, and Ultra-Wide 4K Displays**.
- Accessible navigation bar with mobile slide-out drawer, touch-friendly touch targets, and sticky emergency contact bar.

---

## 🛠️ Technology Stack & Architecture

### **Frontend**
| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-driven UI with modern hooks (`useActionState`, `useOptimistic`, `useEffect`) |
| **Vite** | Ultra-fast bundling, ES modules development server, and optimized production builds |
| **Tailwind CSS v4** | Utility-first responsive design system with custom healthcare color palette |
| **React Router v7** | Client-side declarative routing and protected navigation |
| **Lucide React** | Consistent, lightweight vector icon system |
| **React Toastify** | Non-intrusive toast notifications for feedback and error states |
| **React Helmet Async** | Dynamic document title and SEO OpenGraph meta tag handling |

### **Backend & Database**
| Technology | Purpose |
| :--- | :--- |
| **Node.js & Express** | RESTful API server handling business logic, appointments, and reviews |
| **MongoDB & Mongoose** | Document database with structured schemas (`User`, `Doctor`, `Appointment`, `Review`) |
| **JWT (JSON Web Tokens)** | Stateless token-based authorization and session management |
| **Firebase Auth** | Client-side OAuth credential verification and Google identity management |
| **ImgBB API** | Cloud-based media CDN storage for user profile pictures and files |

---

## 📂 Project Structure

```text
medinest/
├── public/                       # Static public assets & favicon
├── src/
│   ├── assets/                   # Images, vector illustrations & branding
│   ├── components/               # Modular UI Components
│   │   ├── Navbar.jsx            # Responsive header with profile dropdown
│   │   ├── Footer.jsx            # Informative footer & medical disclaimer
│   │   ├── DoctorCard.jsx        # Specialist card with rating & booking trigger
│   │   ├── GoogleAccountModal.jsx# Custom Google account switcher modal
│   │   ├── AppointmentModal.jsx  # Multi-step booking modal
│   │   └── ReviewSection.jsx     # Patient reviews list & submission form
│   ├── context/                  # Global Context Providers
│   │   └── AuthContext.jsx       # Firebase & MongoDB auth state management
│   ├── pages/                    # Route-level Page Views
│   │   ├── Home.jsx              # Landing page, emergency services, hero banner
│   │   ├── Doctors.jsx           # Filterable doctor directory
│   │   ├── DoctorDetails.jsx     # Full profile, credentials, and reviews
│   │   ├── Appointments.jsx      # Patient appointment tracker & status
│   │   ├── Login.jsx             # User login portal
│   │   └── SignUp.jsx            # Account registration portal
│   ├── services/                 # Centralized API & Networking
│   │   ├── apiServices.js        # MongoDB REST API calls & caching layer
│   │   └── firebase.js           # Firebase app initialization & auth helpers
│   ├── App.jsx                   # Primary application root & layout wrapper
│   ├── index.css                 # Global CSS & Tailwind configuration
│   └── main.jsx                  # React virtual DOM entry point
├── server.js                     # Express API server with MongoDB Mongoose connection
├── package.json                  # Dependencies & execution scripts
└── README.md                     # Project documentation
```

---

## 🎯 Developer Vision & Engineering Philosophy

### 💡 Why I Built This
Healthcare accessibility is one of the most critical societal needs today. I wanted to build an application that not only looks clean and modern, but is technically resilient under network stress, accessible to non-technical users, and respects user privacy.

### 🧠 Core Engineering Principles Applied
- **Defensive Programming**: Comprehensive error boundaries, fallback placeholder data, and user-friendly error messages when network drops occur.
- **Zero UI Layout Shifts (CLS)**: Skeleton loading cards and defined aspect ratios to guarantee smooth visual stability.
- **Maintainable & Clean Code**: Clean functional components, descriptive naming conventions, and DRY (Don't Repeat Yourself) API service modules.
- **Continuous Improvement**: Striving for optimal Lighthouse scores in Performance, Accessibility, Best Practices, and SEO.

---

## ⚙️ Local Setup & Installation

To run MediNest locally on your machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Git](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/joynuldev/medinest-healthcare.git
cd medinest-healthcare
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
# Server & Database Configuration
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/medinest?retryWrites=true&w=majority
JWT_SECRET=your_jwt_super_secret_key

# Firebase Authentication (Client-side)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# ImgBB Cloud API Key
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### Step 4: Run Development Environment
```bash
# Starts the Express backend & Vite dev server concurrently
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Step 5: Production Build & Linting
```bash
# Run lint check
npm run lint

# Build optimized production bundle
npm run build
```

---

## 📬 Contact & Career Opportunities

I am currently open to **Full-Stack Developer**, **Frontend Engineer (React)**, and **Software Engineer** roles. If you are looking for an engineer who writes clean, scalable code and cares deeply about user experience and business impact, let's connect!

- **Engineer**: Joynul
- **Email**: [joynul.dev@gmail.com](mailto:joynul.dev@gmail.com)
- **Specialties**: React.js, Next.js, Node.js, Express, MongoDB, Tailwind CSS, TypeScript, REST APIs

---

<p align="center">
  Crafted with care and precision by <strong>Joynul</strong> © 2026 MediNest Healthcare. All rights reserved.
</p>
