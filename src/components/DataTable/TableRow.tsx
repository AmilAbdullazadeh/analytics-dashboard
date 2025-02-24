import { flexRender } from '@tanstack/react-table';
import { TableRowProps } from '@/types/components';

export const TableRow = ({ table, onRowClick }: TableRowProps) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {table.getRowModel().rows.map((row) => (
      <tr
        key={row.id}
        onClick={() => onRowClick?.(row.original)}
        className="hover:bg-gray-50 cursor-pointer"
      >
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);
