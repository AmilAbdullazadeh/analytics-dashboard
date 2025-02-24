import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FilterPreset } from '@/types/data';
import { savePreset, loadPreset, deletePreset } from '@/store/filterSlice';
import { RootState } from '@/store';

export const FilterPresets = () => {
  const dispatch = useDispatch();
  const [newPresetName, setNewPresetName] = useState('');
  const currentFilters = useSelector((state: RootState) => state.filters);
  const savedPresets = useSelector((state: RootState) => state.filters.presets);

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset: FilterPreset = {
      id: crypto.randomUUID(),
      name: newPresetName,
      filters: {
        searchTerm: currentFilters.searchTerm,
        gpsCode: currentFilters.gpsCode,
        ageRange: currentFilters.ageRange,
        dateRange: currentFilters.dateRange,
        statusFilter: currentFilters.statusFilter,
        valueRange: currentFilters.valueRange,
        advancedSearch: currentFilters.advancedSearch,
        groupBy: currentFilters.groupBy,
        mapLayer: currentFilters.mapLayer,
      },
      createdBy: 'current-user',
      createdAt: new Date(),
    };

    dispatch(savePreset(newPreset));
    setNewPresetName('');
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Saved Filters</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            placeholder="New preset name"
          />
          <Button onClick={handleSavePreset}>Save Current</Button>
        </div>
        <div className="space-y-2">
          {savedPresets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span>{preset.name}</span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(loadPreset(preset.id))}
                >
                  Load
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch(deletePreset(preset.id))}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
