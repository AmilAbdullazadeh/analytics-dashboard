import { Table, flexRender } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserData } from '@/types/data';

interface TableHeaderProps {
  table: Table<UserData>;
}

export function TableHeader({ table }: TableHeaderProps) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            
            <th
              key={header.id}
              scope="col"
              className="h-12 px-4 text-left align-middle font-medium text-gray-500"
              aria-sort={header.column.getIsSorted() === 'asc' ? 'ascending' : 
                        header.column.getIsSorted() === 'desc' ? 'descending' : 'none'}
            >
              {header.isPlaceholder ? null : (
                <Button
                  variant="outline"
                  onClick={header.column.getToggleSortingHandler()}
                  aria-label={`Sort by ${header.column.columnDef.header} ${
                    header.column.getIsSorted() === 'asc'
                      ? 'descending'
                      : 'ascending'
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getCanSort() && (
                    <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
