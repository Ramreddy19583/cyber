"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ExternalLink, UserCheck, Award, FileText, Globe } from "lucide-react";

export default function PaperView() {
  const [paper, setPaper] = useState<any>(null);

  useEffect(() => {
    fetchPaperInfo();
  }, []);

  const fetchPaperInfo = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/paper");
      const data = await res.json();
      setPaper(data);
    } catch (err) {
      console.error("Paper API fallback", err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="cyber-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono">
          <Award className="h-3.5 w-3.5 text-cyan-400" />
          IEEE HST 2022 Scientific Foundation
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          Towards Automatic Mapping of Vulnerabilities to Attack Patterns using Large Language Models
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Framework: <strong className="text-cyan-400">VWC-MAP</strong></span>
          <span>DOI: <strong className="text-purple-400 font-bold">10.1109/HST56032.2022.10025459</strong></span>
          <span>Conference: <strong className="text-emerald-400">IEEE HST 2022</strong></span>
        </div>
      </div>

      {/* Authors & Institutional Affiliations */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
          <UserCheck className="h-4 w-4 text-cyan-400" />
          Research Paper Authors & Institutions
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {[
            { name: "Siddhartha Shankar Das", inst: "Purdue University" },
            { name: "Ashutosh Dutta", inst: "Pacific Northwest National Laboratory" },
            { name: "Sumit Purohit", inst: "Pacific Northwest National Laboratory" },
            { name: "Edoardo Serra", inst: "Boise State University & PNNL" },
            { name: "Mahantesh Halappanavar", inst: "Pacific Northwest National Laboratory" },
            { name: "Alex Pothen", inst: "Purdue University" }
          ].map((a) => (
            <div key={a.name} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="font-bold text-slate-200 block">{a.name}</span>
              <span className="text-[11px] text-cyan-400 font-semibold">{a.inst}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Abstract & Summary Card */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
          <BookOpen className="h-4 w-4 text-purple-400" />
          Abstract & Core Contributions
        </h3>

        <div className="space-y-4 text-xs font-sans text-slate-200 leading-relaxed">
          <p>
            Cyber-attack surface of an enterprise continuously evolves due to the advent of new devices and applications with inherent vulnerabilities, and the emergence of novel attack techniques that exploit these vulnerabilities. Security management tools must assess cyber-risk by comprehensively identifying associations among attack techniques, weaknesses, and vulnerabilities. However, existing repositories providing such associations are incomplete or rely on manual interpretations.
          </p>

          <p>
            We present <strong>VWC-MAP (Vulnerabilities-Weakness-Common Attack Pattern Mapping)</strong>, a framework that automatically identifies all relevant attack techniques of a vulnerability via weakness abstractions based on natural language processing (NLP) techniques.
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
            <span className="text-cyan-400 font-bold block">Key Paper Breakthroughs:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>First automated complete mapping framework of CVE ➔ CWE ➔ CAPEC using large language models.</li>
              <li>Tier 1 Siamese RoBERTa-Large model achieves 87% accuracy mapping CVEs to CWEs.</li>
              <li>Tier 2 novel Link Prediction & Google T5 Text-to-Text models for CWE-to-CAPEC mapping.</li>
              <li>DDP scalability optimization reducing combinatorial link training time from 144m to 14m.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
