import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import { FilterPanel } from './FilterPanel';
import { setSearchTerm, setStatusFilter } from '@/store/filterSlice';

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: () => ({
      searchTerm: '',
      statusFilter: [],
      dateRange: ['', ''],
    }),
  };
});

describe('FilterPanel', () => {
  it('handles search input correctly', () => {
    render(<FilterPanel />);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockDispatch).toHaveBeenCalledWith(setSearchTerm('test'));
  });

  it('handles status filter selection', () => {
    render(<FilterPanel />);

    const statusSelect = screen.getByRole('combobox');
    fireEvent.click(statusSelect);
    fireEvent.click(screen.getByText('Qualified'));

    expect(mockDispatch).toHaveBeenCalledWith(setStatusFilter(['Qualified']));
  });

  it('resets filters when reset button is clicked', () => {
    render(<FilterPanel />);

    const resetButton = screen.getByText('Reset Filters');
    fireEvent.click(resetButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'filters/resetFilters' });
  });
});
