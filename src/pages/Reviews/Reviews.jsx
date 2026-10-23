/**
 * @file Reviews.jsx
 * @description Dedicated Patient Reviews and Ratings page for MediNest Healthcare Center.
 * Features clinical rating breakdown, service category filtering, verified patient testimonials,
 * Google profile picture support with referrer-policy protection, and an interactive
 * 'Write a Review' form with SweetAlert2 confirmation and MongoDB synchronization.
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Quote, Plus, CheckCircle2, MessageSquare, ThumbsUp, Filter, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import Button from '../../components/common/Button.jsx';
import { useReviews, useAddReview } from '../../hooks/useReviews.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Reviews() {
  const { user } = useAuth();
  const { data: reviewsData = [], isLoading } = useReviews();
  const addReviewMutation = useAddReview();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    treatment: 'Teeth Orthodontics',
    rating: 5,
    comment: '',
  });

  // Sync reviewer name whenever logged-in user changes
  useEffect(() => {
    if (user?.displayName) {
      setNewReview((prev) => ({
        ...prev,
        name: prev.name || user.displayName,
      }));
    }
  }, [user]);

  const categories = ['All', 'Teeth Orthodontics', 'Cosmetic Dentistry', 'Teeth Cleaning', 'Oral Surgery'];

  const reviewsList = Array.isArray(reviewsData) ? reviewsData : [];

  const filteredReviews =
    selectedFilter === 'All'
      ? reviewsList
      : reviewsList.filter((item) => item.treatment === selectedFilter || selectedFilter === 'All');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewerName = newReview.name?.trim() || user?.displayName?.trim();

    if (!reviewerName || !newReview.comment?.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Please provide your name and your review feedback.',
        confirmButtonColor: '#07332F',
      });
      return;
    }

    try {
      // Generate clean avatar fallback if user doesn't have one
      const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        reviewerName
      )}&background=07332F&color=fff&bold=true&size=200`;

      const reviewPayload = {
        name: reviewerName,
        userEmail: user?.email || '',
        role: newReview.role?.trim() || 'Verified Patient',
        treatment: newReview.treatment,
        specialty: newReview.treatment,
        rating: Number(newReview.rating) || 5,
        comment: newReview.comment.trim(),
        avatar: user?.photoURL?.trim() || fallbackAvatar,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      await addReviewMutation.mutateAsync(reviewPayload);

      setShowModal(false);
      setNewReview({
        name: user?.displayName || '',
        role: '',
        treatment: 'Teeth Orthodontics',
        rating: 5,
        comment: '',
      });

      Swal.fire({
        icon: 'success',
        title: 'Review Submitted!',
        text: 'Your review has been successfully saved to MediNest database.',
        confirmButtonColor: '#07332F',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Submit',
        text: err.message || 'Could not save your review. Please try again.',
        confirmButtonColor: '#07332F',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Patient Reviews & Ratings - MediNest</title>
        <meta
          name="description"
          content="Read verified patient testimonials, clinical feedback, and surgical ratings for MediNest Healthcare Center."
        />
      </Helmet>

      <div>
        {/* Banner Section */}
        <section className="bg-[#07332F] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute right-10 top-6 w-48 h-24 border-2 border-white/10 rounded-full rotate-45 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Home / Reviews</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  Patient Reviews & Feedback
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
                  Discover genuine clinical experiences and recovery stories from individuals and families treated at MediNest.
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  onClick={() => {
                    if (user?.displayName && !newReview.name) {
                      setNewReview((prev) => ({ ...prev, name: user.displayName }));
                    }
                    setShowModal(true);
                  }}
                  variant="coral"
                  size="md"
                  icon={Plus}
                  className="font-bold shadow-lg"
                >
                  Write a Review
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Rating Overview Cards */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
              
              {/* Score summary */}
              <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Care
                </div>
                <div className="flex items-baseline justify-center md:justify-start gap-3 pt-2">
                  <span className="text-5xl font-black text-slate-900">4.9</span>
                  <span className="text-slate-500 font-bold text-lg">/ 5.0</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">Based on 350+ certified patient evaluations</p>
              </div>

              {/* Category Breakdown Bars */}
              <div className="md:col-span-8 space-y-3.5">
                {[
                  { label: 'Dental & Clinical Expertise', score: 99 },
                  { label: 'Staff Empathy & Friendliness', score: 98 },
                  { label: 'Sterilization & Hygiene Standards', score: 100 },
                  { label: 'Punctuality & Zero Waiting Queue', score: 96 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.label}</span>
                      <span>{item.score}% Positive</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#07332F] rounded-full transition-all duration-1000"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Filters and Reviews List */}
        <section className="py-10 bg-slate-50/50 min-h-[500px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Treatment Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedFilter === cat
                      ? 'bg-[#07332F] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Reviews Loading State */}
            {isLoading && (
              <div className="py-16 text-center flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#07332F] animate-spin" />
                <p className="text-sm font-semibold text-slate-500">Loading patient reviews from database...</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredReviews.length === 0 && (
              <div className="py-16 text-center bg-white rounded-3xl p-10 border border-slate-200 max-w-lg mx-auto">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No Reviews Found</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Be the first patient to share feedback for {selectedFilter === 'All' ? 'our treatments' : selectedFilter}.
                </p>
                <Button
                  onClick={() => setShowModal(true)}
                  variant="coral"
                  size="sm"
                  className="font-bold"
                >
                  Write a Review
                </Button>
              </div>
            )}

            {/* Reviews Grid */}
            {!isLoading && filteredReviews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((rev) => {
                  const reviewKey = rev._id || rev.id || `rev-${Math.random()}`;
                  const authorAvatar =
                    rev.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      rev.name || 'Patient'
                    )}&background=07332F&color=fff&bold=true`;

                  return (
                    <div
                      key={reviewKey}
                      className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative flex flex-col justify-between"
                      data-aos="fade-up"
                    >
                      <Quote className="absolute top-6 right-6 w-8 h-8 text-[#F7A582]/20 pointer-events-none" />

                      <div className="space-y-4">
                        {/* Stars and Treatment Tag */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          {rev.treatment && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF0EC] text-[#F7A582]">
                              {rev.treatment}
                            </span>
                          )}
                        </div>

                        {/* Feedback text */}
                        <p className="text-slate-600 text-sm leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>

                      {/* Patient Info Footer */}
                      <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={authorAvatar}
                            alt={rev.name || 'Patient'}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                rev.name || 'Patient'
                              )}&background=07332F&color=fff&bold=true`;
                            }}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#F7A582] shadow-xs shrink-0"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                            <p className="text-xs text-slate-400">{rev.role || 'Verified Patient'}</p>
                          </div>
                        </div>
                        {rev.date && (
                          <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </section>

        {/* Modal: Write a Review */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF0EC] text-[#F7A582] flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Share Your Experience</h3>
                    <p className="text-xs text-slate-400">Help others with your honest feedback</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4 mt-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Profession / Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Designer, Teacher"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Treatment</label>
                    <select
                      value={newReview.treatment}
                      onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                      className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                    >
                      <option value="Teeth Orthodontics">Teeth Orthodontics</option>
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                      <option value="Teeth Cleaning">Teeth Cleaning</option>
                      <option value="Cavity Protection">Cavity Protection</option>
                      <option value="Oral Surgery">Oral Surgery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                  <div className="flex gap-2 text-amber-400 items-center">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: starVal })}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starVal <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-500 font-semibold ml-2">
                      {newReview.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Review</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the physician, treatment results, and clinical atmosphere..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="teal"
                    loading={addReviewMutation.isPending}
                    className="w-full py-3.5 font-bold rounded-xl text-sm shadow-md"
                  >
                    Submit Review
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
