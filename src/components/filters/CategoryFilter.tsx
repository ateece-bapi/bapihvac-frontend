import React from 'react';

export type Category = {
  id: string;
  name: string;
};

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryIds: string[];
  onChange: (selected: string[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryIds,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`px-3 py-1 rounded border text-sm transition-colors ${selectedCategoryIds.includes(cat.id) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          aria-pressed={selectedCategoryIds.includes(cat.id)}
          onClick={() => {
            const isSelected = selectedCategoryIds.includes(cat.id);
            onChange(
              isSelected
                ? selectedCategoryIds.filter((id) => id !== cat.id)
                : [...selectedCategoryIds, cat.id]
            );
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
