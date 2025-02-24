import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters, toggleBulkSelect } from '@/store/filterSlice';
import { Table } from '@tanstack/react-table';
import { UserData } from '@/types/data';

interface UseKeyboardShortcutsProps {
  table?: Table<UserData>;
}

export const useKeyboardShortcuts = ({
  table,
}: UseKeyboardShortcutsProps = {}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Search shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document
          .querySelector<HTMLInputElement>('[data-search-input]')
          ?.focus();
      }

      // Filter shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        dispatch(resetFilters());
        table?.resetSorting();
        table?.resetColumnFilters();
        table?.resetGlobalFilter();
      }

      // Bulk selection
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        dispatch(toggleBulkSelect());
      }

      // Sorting shortcuts
      if (table && e.altKey) {
        const columns = table.getAllColumns();

        // Alt + 1-9 for quick column sorting
        if (/^[1-9]$/.test(e.key)) {
          e.preventDefault();
          const columnIndex = parseInt(e.key) - 1;
          const column = columns[columnIndex];
          if (column?.getCanSort()) {
            column.toggleSorting();
          }
        }
      }

      // Navigation shortcuts
      if (table) {
        if (e.altKey && e.key === 'ArrowRight') {
          e.preventDefault();
          table.nextPage();
        }
        if (e.altKey && e.key === 'ArrowLeft') {
          e.preventDefault();
          table.previousPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, table]);
};
