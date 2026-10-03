"use client";

import React, { useState } from "react";
import { Cpu, ArrowDown, Info, ShieldAlert, Database, Layers, CheckCircle2 } from "lucide-react";

export default function ArchitectureView() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="cyber-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono">
          <Layers className="h-3.5 w-3.5 text-cyan-400" />
          Interactive System Blueprint
        </div>
        <h2 className="text-2xl font-bold text-white">VWC-MAP Architectural Specification</h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed max-w-3xl">
          Detailed two-tiered pipeline converting natural language vulnerability descriptions into weakness classifications and attack pattern enumerations.
        </p>
      </div>

      {/* Interactive Flow Architecture Diagram (Section 26) */}
      <div className="cyber-card p-8 rounded-2xl border border-slate-800 space-y-8 bg-slate-950/90 relative">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Node 1: Input CVE */}
          <div
            onMouseEnter={() => setActiveTooltip("cve_input")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-5 rounded-xl bg-slate-900 border border-cyan-500/60 shadow-lg shadow-cyan-500/10 text-center cursor-pointer hover:border-cyan-400 transition-all relative"
          >
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Input Layer</span>
            <h3 className="text-sm font-bold text-white font-mono mt-0.5">CVE / Vulnerability Description</h3>
            <p className="text-xs text-slate-300 mt-1">Natural language text extracted from NVD reports or analyst query</p>

            {activeTooltip === "cve_input" && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 p-3 rounded-lg bg-cyan-950 border border-cyan-700 text-xs font-mono text-cyan-200 shadow-xl z-20">
                <strong>NVD Data Provider:</strong> Accepts raw CVE ID or free-text descriptions up to 512 tokens.
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-cyan-400 animate-bounce" />
          </div>

          {/* Node 2: Tier 1 Transformer Model */}
          <div
            onMouseEnter={() => setActiveTooltip("tier1_model")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-5 rounded-xl bg-slate-900 border border-purple-500/60 shadow-lg shadow-purple-500/10 text-center cursor-pointer hover:border-purple-400 transition-all relative"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                TIER 1 CLASSIFIER
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">87% Accuracy</span>
            </div>
            <h3 className="text-sm font-bold text-white font-mono">CVE → CWE Model (RoBERTa / BERT Siamese)</h3>
            <p className="text-xs text-slate-300 mt-1">Siamese network with Distributed Data-Parallel (DDP) link prediction</p>

            {activeTooltip === "tier1_model" && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-80 p-3 rounded-lg bg-purple-950 border border-purple-700 text-xs font-mono text-purple-200 shadow-xl z-20">
                <strong>V2W-BERT Architecture:</strong> Uses RoBERTa-Large shared encoder weights. Evaluates hierarchy paths across root (1,1,1) and relaxed (3,2,1) trees.
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-purple-400" />
          </div>

          {/* Node 3: CWE Intermediate Predictions */}
          <div
            onMouseEnter={() => setActiveTooltip("cwe_output")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-5 rounded-xl bg-slate-900 border border-purple-500/60 text-center cursor-pointer hover:border-purple-400 transition-all relative"
          >
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Intermediate Representation</span>
            <h3 className="text-sm font-bold text-white font-mono mt-0.5">Ranked CWE Weaknesses</h3>
            <p className="text-xs text-slate-300 mt-1">Abstraction layer isolating root, child, and leaf weakness classes</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-purple-400" />
          </div>

          {/* Node 4: Dual Tier 2 Approaches */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onMouseEnter={() => setActiveTooltip("link_pred")}
              onMouseLeave={() => setActiveTooltip(null)}
              className="p-4 rounded-xl bg-slate-900 border border-cyan-500/60 text-center cursor-pointer hover:border-cyan-400 transition-all relative"
            >
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Approach A</span>
              <h4 className="text-xs font-bold text-white font-mono mt-0.5">Link Prediction</h4>
              <p className="text-[11px] text-slate-300 mt-1">Feature subtraction & multiplication ((x-y)|x*y)</p>
            </div>

            <div
              onMouseEnter={() => setActiveTooltip("t5_model")}
              onMouseLeave={() => setActiveTooltip(null)}
              className="p-4 rounded-xl bg-slate-900 border border-emerald-500/60 text-center cursor-pointer hover:border-emerald-400 transition-all relative"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Approach B</span>
              <h4 className="text-xs font-bold text-white font-mono mt-0.5">T5 Text-to-Text</h4>
              <p className="text-[11px] text-slate-300 mt-1">Google T5 multi-command sequence generator</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-emerald-400" />
          </div>

          {/* Node 5: Output CAPECs */}
          <div
            onMouseEnter={() => setActiveTooltip("capec_output")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-5 rounded-xl bg-slate-900 border border-emerald-500/60 shadow-lg shadow-emerald-500/10 text-center cursor-pointer hover:border-emerald-400 transition-all relative"
          >
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Final Intelligence Output</span>
            <h3 className="text-sm font-bold text-white font-mono mt-0.5">Ranked CAPEC Attack Patterns</h3>
            <p className="text-xs text-slate-300 mt-1">Actionable attack techniques, execution flows, and mitigations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
