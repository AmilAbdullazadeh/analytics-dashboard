export const getStatusColor = (status: string): string => {
  const colors = {
    Qualified: '#9333ea', // purple-600
    Lead: '#f97316', // orange-500
    Closed: '#22c55e', // green-500
    Lost: '#ef4444', // red-500
    Negotiation: '#3b82f6', // blue-500
    Proposal: '#eab308', // yellow-500
  };
  return colors[status as keyof typeof colors] || '#64748b'; // gray-500 as fallback
};
