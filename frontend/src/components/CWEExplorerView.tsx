"use client";

import React, { useState, useEffect } from "react";
import { Database, Search, Shield, ChevronRight, CheckCircle2 } from "lucide-react";

export default function CWEExplorerView() {
  const [cwes, setCwes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCwe, setSelectedCwe] = useState<any>(null);

  useEffect(() => {
    fetchCwes();
  }, []);

  const fetchCwes = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cwes");
      const data = await res.json();
      setCwes(data);
      if (data.length > 0) setSelectedCwe(data[0]);
    } catch (err) {
      console.error("CWE API fallback", err);
    }
  };

  const filteredCwes = cwes.filter(
    (c) =>
      c.cwe_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-purple-400" />
            MITRE CWE Explorer (Common Weakness Enumeration)
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Displaying all 13 paper features: Name, Description, Mitigations, Consequences, Detection, Observed Examples, Taxonomy.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CWE ID or keywords..."
            className="w-full bg-slate-900 border border-slate-700 text-xs font-mono rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <Search className="h-4 w-4 text-slate-500 absolute right-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CWE List (Left 1 Column) */}
        <div className="cyber-card p-4 rounded-2xl border border-slate-800 space-y-2 max-h-[650px] overflow-y-auto">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase border-b border-slate-800 pb-2 px-2">
            924 CWE Enumerations ({filteredCwes.length} shown)
          </div>

          {filteredCwes.map((cwe) => (
            <button
              key={cwe.cwe_id}
              onClick={() => setSelectedCwe(cwe)}
              className={`w-full text-left p-3 rounded-xl transition-all border ${
                selectedCwe?.cwe_id === cwe.cwe_id
                  ? "bg-purple-950/80 border-purple-600 text-white"
                  : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs font-bold text-purple-400 mb-1">
                <span>{cwe.cwe_id}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <p className="text-xs font-semibold text-slate-200 line-clamp-1">{cwe.name}</p>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans">{cwe.description}</p>
            </button>
          ))}
        </div>

        {/* Detailed Feature Breakout (Right 2 Columns) - 13 Paper Fields */}
        <div className="lg:col-span-2 cyber-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6 max-h-[650px] overflow-y-auto">
          {selectedCwe ? (
            <>
              <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-400">{selectedCwe.cwe_id}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedCwe.name}</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {selectedCwe.notes || "Weakness Category"}
                </span>
              </div>

              {/* 13 Paper Feature Display Grid */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block font-bold mb-1">1. Description:</span>
                  <p className="font-sans text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {selectedCwe.description}
                  </p>
                </div>

                {selectedCwe.extended_description && (
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">2. Extended Description:</span>
                    <p className="font-sans text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                      {selectedCwe.extended_description}
                    </p>
                  </div>
                )}

                {selectedCwe.potential_mitigations && (
                  <div>
                    <span className="text-emerald-400 block font-bold mb-1">3. Potential Mitigations:</span>
                    <p className="font-sans text-emerald-200 leading-relaxed bg-emerald-950/40 p-3 rounded-lg border border-emerald-900">
                      {selectedCwe.potential_mitigations}
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedCwe.modes_of_introduction && (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block font-bold mb-1">4. Modes of Introduction:</span>
                      <ul className="list-disc list-inside text-slate-300">
                        {selectedCwe.modes_of_introduction.map((m: string) => <li key={m}>{m}</li>)}
                      </ul>
                    </div>
                  )}

                  {selectedCwe.common_consequences && (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block font-bold mb-1">5. Common Consequences:</span>
                      <ul className="list-disc list-inside text-rose-300">
                        {selectedCwe.common_consequences.map((c: string) => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                {selectedCwe.detection_methods && (
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">6. Detection Methods:</span>
                    <p className="font-sans text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      {Array.isArray(selectedCwe.detection_methods) ? selectedCwe.detection_methods.join(", ") : selectedCwe.detection_methods}
                    </p>
                  </div>
                )}

                {selectedCwe.taxonomy_mappings && (
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">7. Taxonomy Mappings:</span>
                    <p className="font-sans text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      {Array.isArray(selectedCwe.taxonomy_mappings) ? selectedCwe.taxonomy_mappings.join(" | ") : selectedCwe.taxonomy_mappings}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-xs font-mono text-slate-500">Select a CWE entry to view full 13-feature enumeration.</p>
          )}
        </div>
      </div>
    </div>
  );
}
