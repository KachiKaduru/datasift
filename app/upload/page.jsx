"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle file upload (supports .xlsx and .csv)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setFileName(file.name.split(".")[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result);
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setData(jsonData);
        setFilteredData(jsonData);
        setFilters({});
      } catch (error) {
        alert("Error reading file. Please check the format.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Filter logic (unchanged)
  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value });
  };

  const applyFilters = () => {
    if (!data.length) return;

    if (Object.keys(filters).length === 0) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((row) => {
      return Object.entries(filters).every(([column, value]) => {
        if (!value) return true;
        return String(row[column] || "")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });
    setFilteredData(filtered);
  };

  // Export to XLSX
  const exportToXLSX = () => {
    if (!filteredData.length) return;

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FilteredData");
    XLSX.writeFile(wb, `${fileName}_filtered.xlsx`);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!filteredData.length) return;

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}_filtered.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredData(data);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              DataSift
            </span>{" "}
            Your Files
          </h1>
          <p className="text-gray-600">Upload, filter, and export in 3 steps</p>
        </header>

        {/* File Upload */}
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Excel/CSV File
          </label>
          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {isLoading && <p className="mt-2 text-sm text-gray-500">Processing file...</p>}
        </div>

        {/* Filter Controls */}
        {filteredData.length > 0 && (
          <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Filter Data</h2>
              <div className="flex space-x-2">
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(filteredData[0]).map((column) => (
                <div key={column} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">{column}</label>
                  <input
                    type="text"
                    value={filters[column] || ""}
                    onChange={(e) => handleFilterChange(column, e.target.value)}
                    placeholder={`Filter ${column}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Table and Export Options */}
        {filteredData.length > 0 && (
          <div className="overflow-x-auto mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-700">Filtered Data</h2>
              <div className="flex space-x-2">
                <button
                  onClick={exportToXLSX}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export as XLSX
                </button>
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export as CSV
                </button>
              </div>
            </div>

            <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    {Object.keys(filteredData[0]).map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {val !== undefined && val !== null ? String(val) : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

const FileExcelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const FileCSVIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);
