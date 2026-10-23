/**
 * @file useAppointments.js
 * @description Custom TanStack Query hooks for appointments listing, booking, and payment processing.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '../services/apiServices.js';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => appointmentService.getAll(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => appointmentService.book(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

export const usePayAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, paymentInfo }) => appointmentService.pay(id, paymentInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};
