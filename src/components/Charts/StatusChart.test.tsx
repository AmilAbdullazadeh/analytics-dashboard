import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { StatusChart } from './StatusChart';

const mockData = [
  {
    id: '1',
    status: 'Qualified' as const,
    value: 1000,
    datetime: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    status: 'Lead' as const,
    value: 2000,
    datetime: '2024-01-02T00:00:00Z',
  },
];

describe('StatusChart', () => {
  it('renders chart with correct data', () => {
    render(<StatusChart data={mockData} />);

    expect(screen.getByText('Value by Status')).toBeInTheDocument();
    expect(screen.getByText('Qualified')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('Lead')).toBeInTheDocument();
    expect(screen.getByText('$2,000')).toBeInTheDocument();
  });

  it('calculates percentages correctly', () => {
    render(<StatusChart data={mockData} />);

    const bars = screen.getAllByRole('progressbar');
    expect(bars[0]).toHaveStyle({ width: '33.33%' }); // Qualified
    expect(bars[1]).toHaveStyle({ width: '66.67%' }); // Lead
  });

  it('handles empty data', () => {
    render(<StatusChart data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
