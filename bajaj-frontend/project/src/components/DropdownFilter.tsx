import React from 'react';
import Select, { MultiValue } from 'react-select';

export interface FilterOption {
  value: 'numbers' | 'alphabets' | 'highest_alphabet';
  label: string;
}

const options: FilterOption[] = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' },
];

interface DropdownFilterProps {
  onChange: (selected: MultiValue<FilterOption>) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ onChange }) => {
  return (
    <div className="w-full max-w-2xl">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter Response
      </label>
      <Select
        options={options}
        isMulti
        onChange={onChange}
        className="text-sm"
        placeholder="Select filters..."
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#2563eb',
            primary25: '#dbeafe',
            primary50: '#bfdbfe',
          },
        })}
      />
    </div>
  );
};

export default DropdownFilter;