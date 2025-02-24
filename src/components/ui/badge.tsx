import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        secondary:
          'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20',
        Qualified:
          'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20',
        Lead: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
        Closed:
          'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20',
        Lost: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20',
        Negotiation:
          'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20',
        Proposal:
          'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant:
    | 'secondary'
    | 'Qualified'
    | 'Lead'
    | 'Closed'
    | 'Lost'
    | 'Negotiation'
    | 'Proposal';
}

export function Badge({ variant, className, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
