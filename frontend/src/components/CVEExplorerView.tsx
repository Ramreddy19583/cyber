"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, ShieldAlert, Database, ArrowRight, ExternalLink } from "lucide-react";

interface CVEExplorerViewProps {
  onSelectCve: (cveId: string) => void;
}

export default function CVEExplorerView({ onSelectCve }: CVEExplorerViewProps) {
  const [cves, setCves] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCves();
  }, []);

  const fetchCves = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cves");
      const data = await res.json();
      setCves(data);
    } catch (err) {
      console.error("CVE API fallback", err);
    }
  };

  const filtered = cves.filter(
    (c) =>
      c.cve_id.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            NVD CVE Vulnerability Database Search
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Search National Vulnerability Database entries and view predicted CWE/CAPEC attack vectors.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search CVE-2021-45706 or technology..."
            className="w-full bg-slate-900 border border-slate-700 text-xs font-mono rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <Search className="h-4 w-4 text-slate-500 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* CVE Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cve) => (
          <div key={cve.cve_id} className="cyber-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-mono font-bold text-cyan-400">{cve.cve_id}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  CVSS {cve.cvss}
                </span>
              </div>

              <p className="text-xs text-slate-200 font-sans leading-relaxed line-clamp-3">
                {cve.description}
              </p>

              {cve.affected_technology && (
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Affected:</span> {cve.affected_technology}
                </div>
              )}

              {cve.ground_truth_cwes && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-500">Weaknesses:</span>
                  {cve.ground_truth_cwes.map((cwe: string) => (
                    <span key={cwe} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      {cwe}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">Source: {cve.source}</span>
              <button
                onClick={() => onSelectCve(cve.cve_id)}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                Analyze CVE <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
