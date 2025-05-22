"use client";

import { useUpload } from "@/app/contexts/UploadContext";
import { FunnelIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function FilterControls() {
  const { data, filters, actions } = useUpload();

  const handleFilterChange = (column, value) => {
    const newFilters = { ...filters, [column]: value };
    actions.setFilters(newFilters);
  };

  if (!data.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-8">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <FunnelIcon className="h-8 w-8 text-blue-500 mr-3" />
            Filter Data
          </h2>
          <button
            onClick={actions.resetFilters}
            className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(data[0]).map((column) => (
            <div key={column} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{column}</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters[column] || ""}
                  onChange={(e) => handleFilterChange(column, e.target.value)}
                  placeholder={`Filter ${column}...`}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {filters[column] && (
                  <button
                    onClick={() => handleFilterChange(column, "")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
