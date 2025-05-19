"use client";

import {
  CloudArrowUpIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const iconComponents = {
  upload: CloudArrowUpIcon,
  filter: FunnelIcon,
  error: ExclamationTriangleIcon,
};

export default function EmptyState({ icon = "upload", title, description, actionText, onAction }) {
  const IconComponent = iconComponents[icon] || CloudArrowUpIcon;
  const iconColor = icon === "error" ? "text-yellow-500" : "text-blue-500";

  return (
    <div className="text-center py-12 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div
        className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
          icon === "error" ? "bg-yellow-100" : "bg-blue-100"
        } mb-4`}
      >
        <IconComponent className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {onAction && actionText && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {icon === "filter" && <ArrowPathIcon className="h-4 w-4 mr-2" />}
          {actionText}
        </button>
      )}
    </div>
  );
}
