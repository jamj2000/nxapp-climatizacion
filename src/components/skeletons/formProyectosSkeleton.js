import React from "react";

function formProyectosSkeleton() {
  return (
    <div role="status" className="flex flex-col gap-2 animate-pulse">
      <div className="relative animate-pulse">
        <div className="h-10 bg-gray-400 rounded-sm dark:bg-gray-700 w-full"></div>
      </div>
      <div className="mt-4 p-4 bg-gray-400 rounded shadow-md animate-pulse">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-400 rounded shadow-md animate-pulse">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-400 rounded shadow-md animate-pulse">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-400 rounded shadow-md animate-pulse">
        <div className="grid ">
          <div className="h-16 bg-gray-400 rounded-sm dark:bg-gray-700 w-full"></div>

        </div>
      </div>
      <div className="flex justify-center mt-6 animate-pulse">
        <div className="h-10 bg-gray-400 rounded-sm dark:bg-gray-700 w-32"></div>
      </div>
    </div>
  );
}

export default formProyectosSkeleton;
