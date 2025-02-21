import React, { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import InputField from './components/InputField';
import DropdownFilter, { FilterOption } from './components/DropdownFilter';
import ResponseDisplay from './components/ResponseDisplay';
import { sendDataToBackend, type BFHLResponse, type BFHLRequest } from './services/api';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [response, setResponse] = useState<BFHLResponse | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'ABCD123';
  }, []);

  const handleSubmit = async (data: BFHLRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendDataToBackend(data);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (selected: MultiValue<FilterOption>) => {
    setSelectedFilters(selected as FilterOption[]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">BFHL API Frontend</h1>
          <p className="mt-2 text-gray-600">Enter JSON data to process through the BFHL API</p>
        </div>

        <div className="space-y-6">
          <InputField onSubmit={handleSubmit} />

          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertTriangle className="text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {response && (
            <div className="space-y-6">
              <DropdownFilter onChange={handleFilterChange} />
              <ResponseDisplay data={response} selectedFilters={selectedFilters} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;