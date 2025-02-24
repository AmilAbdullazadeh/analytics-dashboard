import { Table } from '@tanstack/react-table';
import { UserData } from '@/types/data';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TablePaginationProps {
  table: Table<UserData>;
}

export function TablePagination({ table }: TablePaginationProps) {
  return (
    <div
      className="flex items-center justify-between"
      role="navigation"
      aria-label="Table pagination"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="page-size" className="text-sm text-gray-700">
          Rows per page
        </label>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]" aria-label="Select page size">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div
        className="flex items-center gap-2"
        role="group"
        aria-label="Pagination controls"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <div aria-live="polite" className="sr-only">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
