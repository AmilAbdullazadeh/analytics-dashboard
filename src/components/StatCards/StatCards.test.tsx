import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { StatCards } from './StatCards';

const mockData = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    birth_year: 1990,
    gps_code: 'GPS1',
    latitude: 40.7128,
    longitude: -74.006,
    datetime: '2024-01-01T00:00:00Z',
    status: 'Qualified' as const,
    value: 1000,
  },
];

describe('StatCards', () => {
  it('renders all stat cards with correct values', () => {
    render(<StatCards data={mockData} />);

    expect(screen.getByText('1')).toBeInTheDocument(); // Total Users
    expect(screen.getByText('$1,000')).toBeInTheDocument(); // Average Value
    expect(screen.getByText('1')).toBeInTheDocument(); // Active Regions

    // Status Distribution
    const statusBar = screen.getByTitle('Qualified: 1');
    expect(statusBar).toBeInTheDocument();
    expect(statusBar).toHaveStyle({ width: '100%' });
  });

  it('handles empty data gracefully', () => {
    render(<StatCards data={[]} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('applies dark mode styles correctly', () => {
    document.documentElement.classList.add('dark');
    render(<StatCards data={mockData} />);

    const cards = screen.getAllByRole('article');
    cards.forEach((card) => {
      expect(card).toHaveClass('dark:bg-gray-800');
    });

    document.documentElement.classList.remove('dark');
  });
});
