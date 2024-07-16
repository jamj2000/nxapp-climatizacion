import React from "react";

function proyectoSkeeleton() {
  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 animate-pulse"
          >
            <div className="rounded-t-lg w-full h-48 bg-gray-200"></div>
            <div className="p-5">
              <div className="mb-2 h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="mb-3 h-6 bg-gray-200 rounded w-full"></div>
              <div className="mb-3 h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="flex justify-around gap-5 mt-5">
                <div className="inline-flex items-center px-3 py-2 rounded-lg w-1/4 h-6 bg-gray-200"></div>
                <div className="inline-flex items-center px-3 py-2 rounded-lg w-1/4 h-6 bg-gray-200"></div>
                <div className="inline-flex items-center px-3 py-2 rounded-lg w-1/4 h-6 bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default proyectoSkeeleton;
