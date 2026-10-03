"use client";

import React from "react";
import { 
  ShieldAlert, 
  Search, 
  Database, 
  Share2, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Zap,
  FlaskConical,
  Lock,
  Layers
} from "lucide-react";

interface DashboardViewProps {
  setActiveTab: (tab: string) => void;
  onSelectQuery: (query: string) => void;
}

export default function DashboardView({ setActiveTab, onSelectQuery }: DashboardViewProps) {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 border border-slate-800 p-8 md:p-12 overflow-hidden shadow-2xl">
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-mono">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            VWC-MAP Two-Tiered NLP Framework
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Automated Mapping of Vulnerabilities to Attack Patterns using LLMs
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Bridging real-world security vulnerabilities (<span className="text-cyan-400 font-semibold">CVEs</span>) to execution attack techniques (<span className="text-emerald-400 font-semibold">CAPECs</span>) using software/hardware weakness abstractions (<span className="text-purple-400 font-semibold">CWEs</span>).
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab("mapping")}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold px-6 py-3 rounded-lg text-sm shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
              Analyze Vulnerability
            </button>

            <button
              onClick={() => {
                onSelectQuery("CVE-2021-45706");
                setActiveTab("mapping");
              }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono px-5 py-3 rounded-lg text-sm transition-all"
            >
              <FlaskConical className="h-4 w-4 text-cyan-400" />
              Run Paper Motivating Example (CVE-2021-45706)
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="cyber-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">CVE Entries</span>
            <FileText className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white font-mono">~170,000</div>
          <p className="text-xs text-slate-400 mt-1">National Vulnerability Database (NVD)</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">CWE Weaknesses</span>
            <Database className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white font-mono">924</div>
          <p className="text-xs text-slate-400 mt-1">MITRE Research Concepts View</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">CAPEC Patterns</span>
            <ShieldAlert className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white font-mono">546</div>
          <p className="text-xs text-slate-400 mt-1">Attack Mechanisms & Domains</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Known Associations</span>
            <Share2 className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white font-mono">1,152</div>
          <p className="text-xs text-slate-400 mt-1">MITRE Ground Truth Links</p>
        </div>
      </div>

      {/* Two-Tier Architecture Explanation Card */}
      <div className="cyber-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              Two-Tiered Intelligence Architecture
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              CVEs represent real-world vulnerability instances; CAPECs represent attack techniques exploiting weaknesses.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("architecture")}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
          >
            Explore Diagram <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                TIER 1: CVE → CWE
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">87% Accuracy</span>
            </div>
            <h3 className="text-sm font-semibold text-white">Vulnerability Classification via Siamese Transformers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Uses a transformer-based encoder (V2W-BERT / RoBERTa-Large) in a Siamese link-prediction network to map natural language vulnerability descriptions to appropriate weakness categories across 3 hierarchical levels.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
              Root (1,1,1) & Relaxed (3,2,1) Hierarchy Evaluation
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                TIER 2: CWE → CAPEC
              </span>
              <span className="text-xs text-purple-400 font-mono font-bold">Link Pred & T5 Text-to-Text</span>
            </div>
            <h3 className="text-sm font-semibold text-white">Weakness to Attack Pattern Link Prediction</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluates two novel methods: (A) Link Prediction using feature subtraction & multiplication concatenation <code>((x-y)|x*y)</code>, and (B) Google T5 Text-to-Text sequence generation using multi-command tokens like <code>One Weakness to Attack:</code>.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
              Solves One-to-Many Weakness-to-Attack mappings
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Test Prompts */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-mono uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
          <Zap className="h-4 w-4 text-cyan-400" />
          Try Benchmark Test Cases
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => {
              onSelectQuery("CVE-2021-45706");
              setActiveTab("mapping");
            }}
            className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-cyan-400 mb-1">
              <span>CVE-2021-45706</span>
              <span className="text-[10px] text-slate-500 group-hover:text-cyan-400">Run →</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2">
              Rust data type does not properly zero memory after release in zeroize_derive.
            </p>
          </button>

          <button
            onClick={() => {
              onSelectQuery("CWE-20");
              setActiveTab("mapping");
            }}
            className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-purple-400 mb-1">
              <span>CWE-20</span>
              <span className="text-[10px] text-slate-500 group-hover:text-purple-400">Run →</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2">
              Improper Input Validation (Mapped to CAPEC-10 Buffer Overflow & CAPEC-101 SSI Injection).
            </p>
          </button>

          <button
            onClick={() => {
              onSelectQuery("CWE-22");
              setActiveTab("mapping");
            }}
            className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-emerald-400 mb-1">
              <span>CWE-22</span>
              <span className="text-[10px] text-slate-500 group-hover:text-emerald-400">Run →</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-2">
              Improper Limitation of Pathname ('Path Traversal' evaluated in Paper Table II).
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
