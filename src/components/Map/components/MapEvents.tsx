import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { logger } from '@/utils/logger';

interface MapEventsProps {
  onError: (msg: string) => void;
}

export const MapEvents = ({ onError }: MapEventsProps) => {
  const map = useMap();

  useEffect(() => {
    logger.debug('Map initialized successfully');
    map.on('error', (e) => {
      logger.error('Map error:', new Error(e.type));
      onError('Failed to load map');
    });
    return () => {
      map.off('error');
    };
  }, [map, onError]);

  return null;
};
