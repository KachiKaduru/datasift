import UploadArea from "../_components/upload/UploadArea";
import FilterControls from "../_components/upload/FileControls";
import DataTable from "../_components/upload/DataTable";

import { UploadProvider } from "../contexts/UploadContext";

export default function UploadPage() {
  return (
    <UploadProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UploadArea />
          <FilterControls />

          <DataTable />
        </div>
      </main>
    </UploadProvider>
  );
}
