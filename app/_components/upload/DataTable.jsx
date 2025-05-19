"use client";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useUpload } from "@/app/contexts/UploadContext";

export default function DataTable() {
  const { filteredData } = useUpload();

  // Memoized row component
  const Row = useCallback(
    ({ index, style }) => {
      const row = filteredData[index];
      return (
        <div
          style={style}
          className={`px-6 py-4 whitespace-nowrap text-sm ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          {Object.values(row).map((val, i) => (
            <span key={i} className="inline-block w-full truncate">
              {val !== undefined && val !== null ? String(val) : ""}
            </span>
          ))}
        </div>
      );
    },
    [filteredData]
  );

  if (!filteredData.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-[500px]">
      <AutoSizer>
        {({ height, width }) => (
          <>
            {/* Header */}
            <div className="bg-gray-50 sticky top-0 z-10">
              <div className="flex px-6 py-3">
                {Object.keys(filteredData[0]).map((key) => (
                  <div
                    key={key}
                    className="text-xs font-medium text-gray-500 uppercase tracking-wider flex-1"
                  >
                    {key}
                  </div>
                ))}
              </div>
            </div>

            {/* Virtualized list */}
            <List
              height={height - 48} // Account for header
              itemCount={filteredData.length}
              itemSize={48} // Row height
              width={width}
            >
              {Row}
            </List>
          </>
        )}
      </AutoSizer>
    </div>
  );
}
