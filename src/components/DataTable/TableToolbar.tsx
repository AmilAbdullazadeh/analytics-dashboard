import { Table } from '@tanstack/react-table';
import { UserData } from '@/types/data';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { FileJson, FileSpreadsheet } from 'lucide-react';

interface TableToolbarProps {
  table: Table<UserData>;
}

export function TableToolbar({ table }: TableToolbarProps) {
  const handleSearch = (value: string) => {
    table.setGlobalFilter(value);
  };

  const handleCSVExport = () => {
    const headers = ['Name', 'Status', 'Age', 'GPS Code', 'Date', 'Value'];
    const csvData = table
      .getFilteredRowModel()
      .rows.map((row) => [
        `${row.original.first_name} ${row.original.last_name}`,
        row.original.status,
        `${new Date().getFullYear() - row.original.birth_year}`,
        row.original.gps_code,
        row.original.datetime,
        row.original.value,
      ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(','))
      .join('\n');
    downloadFile(csvContent, 'export.csv', 'text/csv');
  };

  const handleJSONExport = () => {
    const jsonData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    downloadFile(
      JSON.stringify(jsonData, null, 2),
      'export.json',
      'application/json',
    );
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="flex items-center justify-between pb-4"
      role="toolbar"
      aria-label="Table actions"
    >
      <div className="w-full max-w-sm">
        <SearchInput
          value={table.getState().globalFilter || ''}
          onChange={handleSearch}
          placeholder="Search all columns..."
          aria-label="Search all columns"
        />
      </div>
      <div
        className="flex items-center space-x-2"
        role="group"
        aria-label="Export options"
      >
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleCSVExport}
          aria-label="Export as CSV"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" aria-hidden="true" />
          CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleJSONExport}
          aria-label="Export as JSON"
        >
          <FileJson className="mr-2 h-4 w-4" aria-hidden="true" />
          JSON
        </Button>
      </div>
    </div>
  );
}
