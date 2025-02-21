import React from 'react';
import type { BFHLResponse } from '../services/api';
import type { FilterOption } from './DropdownFilter';

interface ResponseDisplayProps {
  data: BFHLResponse;
  selectedFilters: FilterOption[];
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ data, selectedFilters }) => {
  const filteredData = selectedFilters.length > 0
    ? Object.fromEntries(
        Object.entries(data).filter(([key]) =>
          selectedFilters.some((filter) => filter.value === key)
        )
      )
    : data;

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Response Data</h3>
      </div>
      <div className="p-4">
        {Object.entries(filteredData).map(([key, value]) => (
          <p key={key} className="text-sm text-gray-700">
            <strong className="text-gray-900">{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ResponseDisplay;