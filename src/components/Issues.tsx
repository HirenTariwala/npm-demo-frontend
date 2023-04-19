import React from "react";

const Issues = () => {
  return (
    <div className="mt-4 bg-[#ffebe9] border-t-2 border-rose-600 py-5 px-4">
      <div className="flex gap-3">
        <div className="bg-rose-600 px-2 text-base rounded-full text-white">
          critical
        </div>
        <p className="font-bold text-xl">one critical severity issue</p>
      </div>
      <p className="mt-4 text-lg font-medium">
        Package has no specified license
      </p>
      <p className="text-base font-light">
        Recommendation: Check the package code and files for license information
      </p>
      <div className="flex gap-3 mt-2">
        <div className="text-sm border px-2 border-slate-400 rounded-full">
          node-bitmap@0.0.1
        </div>
        <div className="text-sm border px-2 border-slate-400 rounded-full">
          via: terminal-kit@1.49.4
        </div>
      </div>
    </div>
  );
};

export default Issues;
