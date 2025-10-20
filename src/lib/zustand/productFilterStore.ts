import { create } from 'zustand';

export interface ProductFilterState {
  selectedCategoryIds: string[];
  setSelectedCategoryIds: (ids: string[]) => void;
  resetFilters: () => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  selectedCategoryIds: [],
  setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }),
  resetFilters: () => set({ selectedCategoryIds: [] }),
}));
