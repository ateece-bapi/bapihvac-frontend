import React from 'react';
import { Category, CategoryFilter } from './CategoryFilter';

export interface ProductFilterSidebarProps {
  categories: Category[];
  selectedCategoryIds: string[];
  onCategoryChange: (selected: string[]) => void;
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  categories,
  selectedCategoryIds,
  onCategoryChange,
}) => {
  return (
    <aside className="w-full md:w-64 p-4 border-r bg-white">
      <h2 className="font-semibold mb-3 text-lg">Categories</h2>
      <CategoryFilter
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        onChange={onCategoryChange}
      />
      {/* Add more filter controls here as needed */}
    </aside>
  );
};
