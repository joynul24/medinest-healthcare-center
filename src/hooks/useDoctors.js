/**
 * @file useDoctors.js
 * @description Custom TanStack Query hooks for fetching, adding, and deleting doctors.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorService } from '../services/apiServices.js';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () => doctorService.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDoctor = (id) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => doctorService.getById(id),
    enabled: Boolean(id),
  });
};

export const useAddDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newDoctor) => doctorService.create(newDoctor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => doctorService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
};
