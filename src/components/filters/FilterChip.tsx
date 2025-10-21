import React from 'react';

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  onClick,
}) => (
  <button
    className={`px-2 py-1 rounded-full border text-xs transition-colors ${selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
    aria-pressed={selected}
    onClick={onClick}
  >
    {label}
  </button>
);
