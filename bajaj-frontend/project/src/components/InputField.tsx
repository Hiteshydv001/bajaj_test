import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { BFHLRequest } from '../services/api';

interface InputFieldProps {
  onSubmit: (data: BFHLRequest) => void;
}

const InputField: React.FC<InputFieldProps> = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState('{ "data": ["A", "C", "z", "1"] }');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput) as BFHLRequest;
      if (!Array.isArray(parsedData.data)) {
        throw new Error('Input must contain a "data" array');
      }
      onSubmit(parsedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON input');
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-4">
        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter JSON Data
        </label>
        <textarea
          id="json-input"
          className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON data (e.g., { "data": ["A", "C", "z"] })'
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Submit
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;