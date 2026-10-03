"use client";

import React, { useState, useEffect } from "react";
import { BarChart2, Cpu, CheckCircle2, Award, Zap, TrendingUp, ShieldCheck } from "lucide-react";

export default function EvaluationView() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/evaluation");
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Evaluation API fallback", err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="cyber-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono">
          <Award className="h-3.5 w-3.5 text-cyan-400" />
          Published Research Results Benchmark
        </div>
        <h2 className="text-2xl font-bold text-white">VWC-MAP Evaluation & Performance Dashboard</h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed max-w-3xl">
          Experimental metrics reported in the research paper (HST 2022). Highlighting RoBERTa-Large 87% CVE→CWE classification accuracy, Link Prediction vs T5 Text-to-Text performance, and Distributed Data-Parallel (DDP) GPU scaling.
        </p>
      </div>

      {/* Key Metric Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyber-card p-6 rounded-2xl border border-emerald-800/80 bg-slate-950/80 space-y-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">CVE → CWE Top Accuracy</span>
          <div className="text-4xl font-bold font-mono text-emerald-400">87.0%</div>
          <p className="text-xs text-slate-300">Achieved by RoBERTa-Large model fine-tuned on cybersecurity contexts via Siamese link-prediction.</p>
        </div>

        <div className="cyber-card p-6 rounded-2xl border border-purple-800/80 bg-slate-950/80 space-y-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">CWE → CAPEC Expert Agreement</span>
          <div className="text-4xl font-bold font-mono text-purple-400">&gt;80.0%</div>
          <p className="text-xs text-slate-300">Manual verification score (scale 0-10) confirmed predicted attack patterns are highly correlated.</p>
        </div>

        <div className="cyber-card p-6 rounded-2xl border border-cyan-800/80 bg-slate-950/80 space-y-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">Ground Truth Exact Matches</span>
          <div className="text-4xl font-bold font-mono text-cyan-400">50.0%</div>
          <p className="text-xs text-slate-300">Matches exact ground-truth MITRE links despite limited initial association dataset (1,152 links).</p>
        </div>
      </div>

      {/* Model Comparison Table (Section 25) */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-cyan-400" />
            Language Model Accuracy Comparison (CVE → CWE Tier 1)
          </h3>
          <span className="text-xs font-mono text-slate-400">Evaluated on 170K CVEs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                <th className="p-3 font-semibold">Transformer Model</th>
                <th className="p-3 font-semibold">Strict (1,1,1) Accuracy</th>
                <th className="p-3 font-semibold">Relaxed (3,2,1) Accuracy</th>
                <th className="p-3 font-semibold">Broad (5,2,2) Accuracy</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {[
                { model: "BERT-Base", s: "82.5%", r: "85.2%", b: "87.1%", status: "Baseline" },
                { model: "BERT-Large", s: "83.1%", r: "86.4%", b: "88.0%", status: "High Accuracy" },
                { model: "DistilBERT", s: "81.2%", r: "84.0%", b: "85.9%", status: "Lightweight" },
                { model: "RoBERTa-Base", s: "84.5%", r: "87.1%", b: "89.2%", status: "Robust" },
                { model: "RoBERTa-Large", s: "87.0%", r: "89.5%", b: "91.5%", status: "Best Model (87%)", highlight: true }
              ].map((row) => (
                <tr key={row.model} className={row.highlight ? "bg-cyan-950/40 text-cyan-200 font-bold border-l-4 border-l-cyan-400" : "hover:bg-slate-900/40 text-slate-300"}>
                  <td className="p-3 font-semibold">{row.model}</td>
                  <td className="p-3 text-emerald-400">{row.s}</td>
                  <td className="p-3 text-cyan-400">{row.r}</td>
                  <td className="p-3 text-purple-400">{row.b}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${row.highlight ? "bg-cyan-900 text-cyan-300 border border-cyan-700" : "bg-slate-900 text-slate-400"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GPU Scaling DDP Summary Card */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Cpu className="h-5 w-5 text-purple-400" />
          Distributed Data-Parallel (DDP) Scalability Performance
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-purple-400 font-bold block">Combinatorial Explosion Mitigation</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              With 170K CVEs and 1K CWEs, link pair space expands to millions of links. Using a principal GPU to coordinate link representations reduces epoch training time from 144 minutes down to 14 minutes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold block">T5 Text-to-Text Few-Shot Advantage</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              Google T5 incorporates pre-trained transformer knowledge suitable for few-shot learning, generating complete CAPEC text descriptions without requiring negative training links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
