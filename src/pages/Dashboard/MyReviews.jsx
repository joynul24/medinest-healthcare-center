/**
 * @file MyReviews.jsx
 * @description Patient Dashboard view for managing personal doctor reviews and feedback.
 * Features rating edit modal, review deletion with SweetAlert2, and new review creation.
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Edit3, Trash2, Plus, MessageSquare, ThumbsUp, X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  useReviews,
  useAddReview,
  useUpdateReview,
  useDeleteReview,
} from '../../hooks/useReviews.js';

export default function MyReviews() {
  const { user } = useAuth();
  const { data: allReviews = [], isLoading } = useReviews();
  const addReviewMutation = useAddReview();
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();

  const reviews = Array.isArray(allReviews)
    ? user?.email
      ? allReviews.filter((r) => !r.userEmail || r.userEmail === user.email || r.userEmail === '')
      : allReviews
    : [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    doctorName: 'Dr. Ruby Perrin',
    treatment: 'Teeth Orthodontics',
    rating: 5,
    comment: '',
  });

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      doctorName: 'Dr. Ruby Perrin',
      treatment: 'Teeth Orthodontics',
      rating: 5,
      comment: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (rev) => {
    setEditingReview(rev);
    setFormData({
      doctorName: rev.doctorName || 'Dr. Ruby Perrin',
      treatment: rev.treatment || 'Teeth Orthodontics',
      rating: rev.rating || 5,
      comment: rev.comment || '',
    });
    setModalOpen(true);
  };

  const handleDelete = (rev) => {
    Swal.fire({
      title: 'Delete Review?',
      text: `Are you sure you want to remove your review for ${rev.doctorName || rev.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#E11D48',
      cancelButtonColor: '#94A3B8',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteReviewMutation.mutateAsync(rev._id || rev.id);
          Swal.fire({
            icon: 'success',
            title: 'Review Deleted',
            text: 'Your review has been successfully removed from MediNest database.',
            confirmButtonColor: '#07332F',
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Delete',
            text: err.message || 'Could not delete review.',
            confirmButtonColor: '#07332F',
          });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.comment) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Feedback',
        text: 'Please write your review feedback.',
        confirmButtonColor: '#07332F',
      });
      return;
    }

    try {
      if (editingReview) {
        await updateReviewMutation.mutateAsync({
          id: editingReview._id || editingReview.id,
          reviewData: {
            doctorName: formData.doctorName,
            treatment: formData.treatment,
            specialty: formData.treatment,
            rating: Number(formData.rating),
            comment: formData.comment,
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Review Updated!',
          text: 'Your modifications have been saved in the database.',
          confirmButtonColor: '#07332F',
        });
      } else {
        await addReviewMutation.mutateAsync({
          doctorName: formData.doctorName,
          specialty: formData.treatment,
          treatment: formData.treatment,
          name: user?.displayName || 'Verified Patient',
          userEmail: user?.email || '',
          rating: Number(formData.rating),
          comment: formData.comment,
          avatar:
            user?.photoURL ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          doctorAvatar: formData.doctorName.includes('Kazi')
            ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
            : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        });
        Swal.fire({
          icon: 'success',
          title: 'Review Published!',
          text: 'Thank you for your valuable feedback. It is saved in the database.',
          confirmButtonColor: '#07332F',
        });
      }
      setModalOpen(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Action failed. Please try again.',
        confirmButtonColor: '#07332F',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>My Reviews - Patient Portal | MediNest</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              My Reviews : {String(reviews.length).padStart(2, '0')}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Feedback and ratings submitted by {user?.displayName || 'you'} for MediNest doctors.
            </p>
          </div>

          <Button
            onClick={handleOpenAdd}
            variant="coral"
            size="sm"
            icon={Plus}
            className="font-bold shadow-sm self-start sm:self-auto"
          >
            Add New Review
          </Button>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 gap-5">
          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No Reviews Submitted Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Share your clinical experience and help other patients choose the right physician.
              </p>
              <div className="pt-4">
                <Button onClick={handleOpenAdd} variant="coral" size="sm">
                  Write Your First Review
                </Button>
              </div>
            </div>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow space-y-4"
              >
                {/* Doctor and Rating Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.doctorAvatar}
                      alt={rev.doctorName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#F7A582]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{rev.doctorName}</h4>
                      <p className="text-xs text-slate-500">{rev.specialty}</p>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF0EC] text-[#F7A582]">
                        {rev.treatment}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{rev.date}</span>
                  </div>
                </div>

                {/* Comment Content */}
                <p className="text-slate-700 text-sm leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
                  "{rev.comment}"
                </p>

                {/* Card Action Controls */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(rev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#07332F]" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(rev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal: Write or Edit Review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingReview ? 'Edit Your Review' : 'Add a Doctor Review'}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Name</label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                  >
                    <option value="Dr. Ruby Perrin">Dr. Ruby Perrin (Orthodontics)</option>
                    <option value="Dr. Kazi Rahman">Dr. Kazi Rahman (Oral Surgery)</option>
                    <option value="Dr. Mahfuzur Rahman">Dr. Mahfuzur Rahman (Pediatric)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Treatment Category</label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                  >
                    <option value="Teeth Orthodontics">Teeth Orthodontics</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                    <option value="Teeth Cleaning">Teeth Cleaning</option>
                    <option value="Cavity Protection">Cavity Protection</option>
                    <option value="Oral Surgery">Oral Surgery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Rating</label>
                  <div className="flex gap-2 text-amber-400 items-center">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: starVal })}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starVal <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-500 font-semibold ml-2">
                      {formData.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Feedback & Experience</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share clinical results, treatment comfort, or advice for fellow patients..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="teal"
                    loading={addReviewMutation.isPending || updateReviewMutation.isPending}
                    className="w-full py-3.5 rounded-xl font-bold text-sm shadow-md"
                  >
                    {editingReview ? 'Save Changes' : 'Publish Review'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
