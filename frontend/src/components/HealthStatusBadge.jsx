import React from 'react';
import { RefreshCw } from 'lucide-react';

export function HealthStatusBadge({ isConnected, isChecking, statusMessage, onRefresh }) {
  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border-2 border-black text-xs text-zinc-900 shadow-[2px_2px_0_#000]">
      <span className="relative flex h-2.5 w-2.5">
        {isConnected ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        )}
      </span>

      <span className="font-mono text-[11px] font-extrabold tracking-wide">
        Backend: <span className={isConnected ? "text-emerald-700 font-black" : "text-amber-600 font-black"}>
          {isChecking ? "Checking..." : isConnected ? "Connected" : "Offline"}
        </span>
      </span>

      <button
        onClick={onRefresh}
        disabled={isChecking}
        title={`Status: ${statusMessage}. Click to re-check backend.`}
        className="ml-0.5 text-zinc-700 hover:text-orange-600 transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin text-orange-600' : ''}`} />
      </button>
    </div>
  );
}

export default HealthStatusBadge;
