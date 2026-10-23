/**
 * @file useServices.js
 * @description TanStack Query hook for fetching clinical services from MongoDB database.
 */

import { useQuery } from '@tanstack/react-query';
import { clinicService } from '../services/apiServices.js';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => clinicService.getServices(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
