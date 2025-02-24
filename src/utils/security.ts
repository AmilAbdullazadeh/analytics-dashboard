import DOMPurify from 'dompurify';
import { encode, EncodeMode } from 'html-entities';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

export const escapeHtml = (unsafe: string): string => {
  return encode(unsafe, { level: 'html5', mode: 'nonAscii' as EncodeMode });
};

export const validateFileType = (
  file: File,
  allowedTypes: string[],
): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};
