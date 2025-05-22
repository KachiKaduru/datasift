"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUpload } from "@/app/contexts/UploadContext";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function UploadArea() {
  const { actions, isLoading, fileName } = useUpload();
  // console.log(fileName);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) actions.uploadFile(file);
    },
    [actions]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  if (fileName)
    return (
      <div className="p-8">
        <h2 className="text-blue-600 font-semibold bg-blue-200 p-3 w-fit rounded-2xl">
          {fileName}
        </h2>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-8">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <CloudArrowUpIcon className="h-8 w-8 text-blue-500 mr-3" />
            Upload File
          </h2>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 bg-gray-50/50"
          }`}
        >
          <input {...getInputProps()} />
          <CloudArrowUpIcon
            className={`mx-auto h-12 w-12 mb-3 ${isDragActive ? "text-blue-500" : "text-gray-400"}`}
          />
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop the file here</p>
          ) : (
            <>
              <p className="text-gray-600 mb-1">
                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-gray-500">.xlsx or .csv files</p>
            </>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Processing your file...</span>
          </div>
        )}
      </div>
    </div>
  );
}
