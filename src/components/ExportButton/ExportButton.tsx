import { UserData } from '@/types/data';
import { Button } from '../ui/button';

interface ExportButtonProps {
  data: UserData[];
  type: 'csv' | 'json';
}

export const ExportButton = ({ data, type }: ExportButtonProps) => {
  const exportData = () => {
    let content: string;
    let filename: string;

    if (type === 'csv') {
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map((item) => Object.values(item).join(','));
      content = [headers, ...rows].join('\n');
      filename = 'export.csv';
    } else {
      content = JSON.stringify(data, null, 2);
      filename = 'export.json';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={exportData} variant="outline" className="ml-auto">
      Export {type.toUpperCase()}
    </Button>
  );
};
