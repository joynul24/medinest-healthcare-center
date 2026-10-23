/**
 * @file useReviews.js
 * @description TanStack Query hooks for fetching, submitting, updating, and deleting patient reviews.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../services/apiServices.js';

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviewService.getAll(),
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReview) => reviewService.create(newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reviewData }) => reviewService.update(id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => reviewService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
