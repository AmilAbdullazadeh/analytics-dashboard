import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { RootState } from '@/store';
import { clearSelection, updateSelectedStatus } from '@/store/filterSlice';

export const BulkActions = () => {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.filters.selectedIds,
  );

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg border flex items-center gap-4">
      <span className="text-sm font-medium">
        {selectedIds.length} items selected
      </span>
      <div className="space-x-2">
        <Button
          variant="outline"
          onClick={() => dispatch(updateSelectedStatus('Qualified'))}
        >
          Mark Qualified
        </Button>
        <Button
          variant="outline"
          onClick={() => dispatch(updateSelectedStatus('Lost'))}
        >
          Mark Lost
        </Button>
        <Button
          variant="destructive"
          onClick={() => dispatch(clearSelection())}
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
};
