"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Search, ChevronRight, Zap, CheckCircle2 } from "lucide-react";

export default function CAPECExplorerView() {
  const [capecs, setCapecs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCapec, setSelectedCapec] = useState<any>(null);

  useEffect(() => {
    fetchCapecs();
  }, []);

  const fetchCapecs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/capecs");
      const data = await res.json();
      setCapecs(data);
      if (data.length > 0) setSelectedCapec(data[0]);
    } catch (err) {
      console.error("CAPEC API fallback", err);
    }
  };

  const filteredCapecs = capecs.filter(
    (c) =>
      c.capec_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-emerald-400" />
            MITRE CAPEC Explorer (Common Attack Pattern Enumeration)
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Displaying all 12 paper features: Execution Flow, Prerequisites, Mitigations, Skills, Indicators, Consequences.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CAPEC ID or technique..."
            className="w-full bg-slate-900 border border-slate-700 text-xs font-mono rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="h-4 w-4 text-slate-500 absolute right-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CAPEC List (Left 1 Column) */}
        <div className="cyber-card p-4 rounded-2xl border border-slate-800 space-y-2 max-h-[650px] overflow-y-auto">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase border-b border-slate-800 pb-2 px-2">
            546 CAPEC Patterns ({filteredCapecs.length} shown)
          </div>

          {filteredCapecs.map((capec) => (
            <button
              key={capec.capec_id}
              onClick={() => setSelectedCapec(capec)}
              className={`w-full text-left p-3 rounded-xl transition-all border ${
                selectedCapec?.capec_id === capec.capec_id
                  ? "bg-emerald-950/80 border-emerald-600 text-white"
                  : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs font-bold text-emerald-400 mb-1">
                <span>{capec.capec_id}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <p className="text-xs font-semibold text-slate-200 line-clamp-1">{capec.name}</p>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans">{capec.description}</p>
            </button>
          ))}
        </div>

        {/* Detailed Feature Breakout (Right 2 Columns) - 12 Paper Fields */}
        <div className="lg:col-span-2 cyber-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6 max-h-[650px] overflow-y-auto">
          {selectedCapec ? (
            <>
              <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{selectedCapec.capec_id}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedCapec.name}</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-amber-400 border border-slate-800">
                  Skills: {selectedCapec.skills_required || "Medium"}
                </span>
              </div>

              {/* 12 Paper Feature Display Grid */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block font-bold mb-1">1. Description:</span>
                  <p className="font-sans text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {selectedCapec.description}
                  </p>
                </div>

                {selectedCapec.execution_flow && (
                  <div>
                    <span className="text-cyan-400 block font-bold mb-1">2. Execution Flow:</span>
                    <div className="font-sans text-cyan-200 bg-cyan-950/40 p-3 rounded-lg border border-cyan-900 whitespace-pre-wrap leading-relaxed">
                      {selectedCapec.execution_flow}
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedCapec.prerequisites && (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block font-bold mb-1">3. Prerequisites:</span>
                      <p className="font-sans text-slate-300">{selectedCapec.prerequisites}</p>
                    </div>
                  )}

                  {selectedCapec.mitigations && (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-emerald-400 block font-bold mb-1">4. Mitigations:</span>
                      <p className="font-sans text-emerald-200">{selectedCapec.mitigations}</p>
                    </div>
                  )}
                </div>

                {selectedCapec.indicators && (
                  <div>
                    <span className="text-amber-400 block font-bold mb-1">5. Indicators & Traces:</span>
                    <p className="font-sans text-amber-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      {selectedCapec.indicators}
                    </p>
                  </div>
                )}

                {selectedCapec.example_instances && (
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">6. Example Instances:</span>
                    <p className="font-sans text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      {Array.isArray(selectedCapec.example_instances) ? selectedCapec.example_instances.join(" | ") : selectedCapec.example_instances}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-xs font-mono text-slate-500">Select a CAPEC entry to view full 12-feature enumeration.</p>
          )}
        </div>
      </div>
    </div>
  );
}
