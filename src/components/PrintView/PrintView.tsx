import { forwardRef } from 'react';
import { UserData } from '@/types/data';
import { formatDate } from '@/utils/formatters';

interface PrintViewProps {
  data: UserData[];
}

export const PrintView = forwardRef<HTMLDivElement, PrintViewProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="p-8 print:p-0">
        <style type="text/css" media="print">
          {`
          @page { size: landscape; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        `}
        </style>

        <h1 className="text-2xl font-bold mb-6">Analytics Report</h1>
        <div className="space-y-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Status</th>
                <th className="text-left">GPS Code</th>
                <th className="text-right">Value</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.status}</td>
                  <td>{user.gps_code}</td>
                  <td className="text-right">${user.value.toLocaleString()}</td>
                  <td>{formatDate(user.datetime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

PrintView.displayName = 'PrintView';
