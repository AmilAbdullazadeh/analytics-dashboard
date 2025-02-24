import { format } from 'date-fns';
import { DATE_FORMATS } from '@/config/constants';

export const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), DATE_FORMATS.DISPLAY);
  } catch {
    return 'Invalid Date';
  }
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};
