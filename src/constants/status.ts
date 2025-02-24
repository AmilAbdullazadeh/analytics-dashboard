import { UserStatus } from '@/types';

export const STATUS_COLORS: Record<UserStatus, string> = {
  Qualified: '#22c55e',
  Lead: '#3b82f6',
  Closed: '#ef4444',
  Lost: '#6b7280',
  Negotiation: '#f59e0b',
  Proposal: '#8b5cf6',
};

export const STATUS_OPTIONS = [
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Lead', label: 'Lead' },
  { value: 'Closed', label: 'Closed' },
  { value: 'Lost', label: 'Lost' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Proposal', label: 'Proposal' },
];
