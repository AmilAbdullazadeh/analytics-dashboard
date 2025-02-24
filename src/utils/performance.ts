import { debounce, throttle } from 'lodash-es';

type CallbackFunction = () => void;

export const createResourceHint = (
  url: string,
  type: 'preload' | 'prefetch' | 'preconnect',
) => {
  const link = document.createElement('link');
  link.rel = type;
  link.href = url;
  document.head.appendChild(link);
};

export const measurePerformance = (name: string): CallbackFunction => {
  if (performance.mark) {
    performance.mark(`${name}-start`);
    return () => {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    };
  }
  return () => {};
};

export const optimizedDebounce = debounce((fn: CallbackFunction) => fn(), 300);
export const optimizedThrottle = throttle((fn: CallbackFunction) => fn(), 100);
