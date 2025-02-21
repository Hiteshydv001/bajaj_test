import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "alphabets", label: "Alphabets" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

export default function App() {
  const [jsonInput, setJsonInput] = useState('{"data": ["A", "C", "z"]}');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "ABCD123"; // Set website title to roll number
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://127.0.0.1:5000/bfhl", parsedInput);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON or API Error");
      setResponse(null);
    }
  };

  const filteredResponse = response
    ? Object.fromEntries(
        Object.entries(response).filter(([key]) =>
          selectedFilters.some((filter) => filter.value === key)
        )
      )
    : {};

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">BFHL API Frontend</h1>
      <textarea
        className="w-96 h-24 border p-2 rounded mb-4"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={handleSubmit}>
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelectedFilters}
            className="w-96 mb-4"
          />
          <pre className="bg-white p-4 rounded shadow-md">{JSON.stringify(filteredResponse || response, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
