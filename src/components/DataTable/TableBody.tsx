import { flexRender, Table } from '@tanstack/react-table';
import { UserData } from '@/types/data';

interface TableBodyProps {
  table: Table<UserData>;
}

export function TableBody({ table }: TableBodyProps) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="border-t hover:bg-gray-50 transition-colors"
          role="row"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="p-4"
              role="cell"
              data-column={cell.column.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
      {table.getRowModel().rows.length === 0 && (
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="p-4 text-center text-gray-500"
          >
            No results found
          </td>
        </tr>
      )}
    </tbody>
  );
}
