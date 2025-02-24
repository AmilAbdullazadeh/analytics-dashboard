import { z } from 'zod';
import { UserStatus } from '@/types';

export const userSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  birth_year: z.number(),
  gps_code: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  datetime: z.string(),
  status: z.enum([
    'Qualified',
    'Lead',
    'Closed',
    'Lost',
    'Negotiation',
    'Proposal',
  ] as [UserStatus, ...UserStatus[]]),
  value: z.number(),
});
