import { LatLngTuple } from 'leaflet';

export const MAP_CONFIG = {
  DEFAULT_CENTER: [39.8283, -98.5795] as LatLngTuple, // Center of USA
  DEFAULT_ZOOM: 4,
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy HH:mm',
};

export const FILTER_DEFAULTS = {
  AGE_RANGE: [1980, 2010] as [number, number],
  SEARCH_DELAY: 300, // ms
};
