import UploadArea from "../_components/upload/UploadArea";
import FilterControls from "../_components/upload/FileControls";
import EmptyState from "../_components/upload/EmptyState";
import DataTable from "../_components/upload/DataTable";

import { UploadProvider } from "../contexts/UploadContext";

export default function UploadPage() {
  return (
    <UploadProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Process Your Data</h1>
          </div>

          <UploadArea />
          <FilterControls />

          {/* Conditional rendering */}
          <UploadContext.Consumer>
            {({ data, filteredData }) => (
              <>
                {!data.length ? (
                  <EmptyState
                    icon="upload"
                    title="No data loaded"
                    description="Upload an Excel or CSV file to get started"
                  />
                ) : !filteredData.length ? (
                  <EmptyState
                    icon="filter"
                    title="No matching results"
                    description="Your filters didn't match any data"
                    actionText="Reset Filters"
                    onAction={actions.resetFilters}
                  />
                ) : (
                  <DataTable />
                )}
              </>
            )}
          </UploadContext.Consumer>
        </div>
      </main>
    </UploadProvider>
  );
}
