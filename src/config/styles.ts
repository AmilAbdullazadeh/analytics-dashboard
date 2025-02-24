export const STYLES = {
  container: {
    map: 'h-[500px] w-full relative rounded-lg overflow-hidden',
    error:
      'h-[500px] w-full flex items-center justify-center bg-gray-100 rounded-lg',
  },
  text: {
    error: 'text-red-500',
    popup: {
      container: 'text-sm',
      title: 'font-bold',
    },
  },
} as const;
