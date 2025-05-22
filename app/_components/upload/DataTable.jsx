"use client";

import { useCallback } from "react";
import { useUpload } from "@/app/contexts/UploadContext";
import EmptyState from "./EmptyState";

export default function DataTable() {
  const { filteredData, actions } = useUpload();

  // Memoized row component
  const Row = useCallback(
    ({ row, index }) => {
      return (
        <tr className={`whitespace-nowrap text-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
          {Object.values(row).map((val, i) => (
            <td key={i} className="px-6 py-4 max-w-xs truncate">
              {val !== undefined && val !== null ? String(val) : ""}
            </td>
          ))}
        </tr>
      );
    },
    [filteredData]
  );

  // if (!filteredData.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow border border-gray-200 max-h-[500px] overflow-y-auto">
      {!filteredData.length ? (
        <EmptyState
          icon="filter"
          title="No matching results"
          description="Your filters didn't match any data"
          actionText="Reset Filters"
          onAction={actions.resetFilters}
        />
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gray-50 sticky top-0 z-10">
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

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <Row key={index} row={row} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
