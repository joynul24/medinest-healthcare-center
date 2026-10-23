/**
 * @file AddDoctor.jsx
 * @description Add a New Doctor administration form reproducing Screenshot 10.
 * Includes interactive photo uploader, specialty selection, and validation.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Image as ImageIcon, Check, UploadCloud, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import Button from '../../components/common/Button.jsx';
import { useAddDoctor } from '../../hooks/useDoctors.js';
import { uploadImageToImgBB } from '../../utils/imageUpload.js';

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: 'Teeth Orthodontics',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();
  const addDoctorMutation = useAddDoctor();

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please select an image file (JPEG, PNG, WebP).',
        confirmButtonColor: '#07332F',
      });
      return;
    }

    // Set temporary local preview immediately for great UX
    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);
    setUploadingImage(true);

    try {
      const hostedUrl = await uploadImageToImgBB(file);
      setFormData((prev) => ({ ...prev, avatar: hostedUrl }));
      setPreviewImage(hostedUrl);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: err.message || 'Could not upload image to ImgBB.',
        confirmButtonColor: '#07332F',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter doctor name and email address.',
        confirmButtonColor: '#07332F',
      });
      return;
    }

    try {
      await addDoctorMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        specialty: formData.specialty,
        avatar: formData.avatar,
        degree: `MBBS, Specialist in ${formData.specialty}`,
      });

      Swal.fire({
        icon: 'success',
        title: 'Doctor Added!',
        text: `${formData.name} has been successfully added to MediNest staff.`,
        confirmButtonColor: '#07332F',
      }).then(() => {
        navigate('/dashboard/manage-doctors');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add',
        text: 'Unable to save doctor record. Please retry.',
        confirmButtonColor: '#07332F',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Add a Doctor - MediNest Admin</title>
      </Helmet>

      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Add a New Doctor
        </h2>

        {/* Form Container (Matching Screenshot 10) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Specialty
              </label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
              >
                <option value="Teeth Orthodontics">Teeth Orthodontics</option>
                <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                <option value="Teeth Cleaning">Teeth Cleaning</option>
                <option value="Cavity Protection">Cavity Protection</option>
                <option value="Pediatric Dental">Pediatric Dental</option>
                <option value="Oral Surgery">Oral Surgery</option>
              </select>
            </div>

            {/* Upload Your Photo Dropzone (Matching Screenshot 10) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700">
                  Photo
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  Hosted on ImgBB
                </span>
              </div>
              <label className="border-2 border-dashed border-slate-200 hover:border-[#07332F] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50">
                {uploadingImage ? (
                  <div className="flex flex-col items-center py-4">
                    <Loader2 className="w-8 h-8 text-[#07332F] animate-spin mb-2" />
                    <span className="text-xs text-slate-600 font-medium">
                      Uploading doctor photo to ImgBB...
                    </span>
                  </div>
                ) : previewImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-[#07332F]"
                    />
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Photo Hosted on ImgBB (Click to change)
                    </span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-[#F7A582] mb-2" />
                    <span className="text-xs text-slate-500 font-medium">Upload Doctor Photo</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 10MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit Button (Dark Green #07332F from Screenshot 10) */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="teal"
                disabled={uploadingImage}
                loading={addDoctorMutation.isPending}
                className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md"
              >
                {uploadingImage ? 'Uploading Image...' : 'Add Doctor'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
