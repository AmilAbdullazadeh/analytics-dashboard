import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, FilterPreset, Status } from '@/types/data';

interface ExtendedFilterState extends FilterState {
  presets: FilterPreset[];
  selectedIds: string[];
}

const initialState: ExtendedFilterState = {
  searchTerm: '',
  gpsCode: '',
  ageRange: [1980, 2010],
  dateRange: ['', ''],
  statusFilter: [],
  valueRange: [0, 1000000],
  advancedSearch: [],
  selectedPreset: null,
  selectedIds: [],
  groupBy: null,
  mapLayer: 'default',
  presets: [],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setGpsCode: (state, action: PayloadAction<string>) => {
      state.gpsCode = action.payload;
    },
    setAgeRange: (state, action: PayloadAction<[number, number]>) => {
      state.ageRange = action.payload;
    },
    setDateRange: (state, action: PayloadAction<[string, string]>) => {
      state.dateRange = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<Status[]>) => {
      state.statusFilter = action.payload;
      state.selectedPreset = null;
    },
    setValueRange: (state, action: PayloadAction<[number, number]>) => {
      state.valueRange = action.payload;
    },
    resetFilters: (state) => {
      return {
        ...initialState,
        presets: state.presets, // Preserve presets when resetting
      };
    },
    savePreset: (state, action: PayloadAction<FilterPreset>) => {
      state.presets.push(action.payload);
    },
    loadPreset: (state, action: PayloadAction<string>) => {
      const preset = state.presets.find((p) => p.id === action.payload);
      if (preset) Object.assign(state, preset.filters);
    },
    deletePreset: (state, action: PayloadAction<string>) => {
      state.presets = state.presets.filter((p) => p.id !== action.payload);
    },
    toggleBulkSelect: (state) => {
      state.selectedIds = state.selectedIds.length ? [] : ['all'];
    },
    updateSelectedStatus: (state, action: PayloadAction<Status>) => {
      if (state.selectedIds.includes('all')) {
        state.statusFilter = [action.payload];
      } else {
        state.selectedIds = state.selectedIds.filter(
          (id) => id !== action.payload,
        );
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
});

export const {
  savePreset,
  loadPreset,
  deletePreset,
  toggleBulkSelect,
  updateSelectedStatus,
  clearSelection,
  setAgeRange,
  setDateRange,
  setSearchTerm,
  setGpsCode,
  setStatusFilter,
  setValueRange,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
