"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardView from "@/components/DashboardView";
import VulnerabilityMappingView from "@/components/VulnerabilityMappingView";
import KnowledgeGraphView from "@/components/KnowledgeGraphView";
import CWEExplorerView from "@/components/CWEExplorerView";
import CAPECExplorerView from "@/components/CAPECExplorerView";
import CVEExplorerView from "@/components/CVEExplorerView";
import ResearchDemoView from "@/components/ResearchDemoView";
import EvaluationView from "@/components/EvaluationView";
import ArchitectureView from "@/components/ArchitectureView";
import PaperView from "@/components/PaperView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedQuery, setSelectedQuery] = useState("");

  const handleSelectQuery = (query: string) => {
    setSelectedQuery(query);
    setActiveTab("mapping");
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === "dashboard" && (
          <DashboardView setActiveTab={setActiveTab} onSelectQuery={handleSelectQuery} />
        )}

        {activeTab === "mapping" && (
          <VulnerabilityMappingView initialQuery={selectedQuery} onSelectQuery={handleSelectQuery} />
        )}

        {activeTab === "graph" && <KnowledgeGraphView />}

        {activeTab === "cwe" && <CWEExplorerView />}

        {activeTab === "capec" && <CAPECExplorerView />}

        {activeTab === "cve" && <CVEExplorerView onSelectCve={handleSelectQuery} />}

        {activeTab === "demo" && <ResearchDemoView />}

        {activeTab === "evaluation" && <EvaluationView />}

        {activeTab === "architecture" && <ArchitectureView />}

        {activeTab === "paper" && <PaperView />}
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-slate-950/80 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">VWC-MAP Intelligence Engine</span>
            <span>•</span>
            <span>IEEE HST 2022 Implementation</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>NVD (170K CVEs)</span>
            <span>MITRE CWE (924)</span>
            <span>MITRE CAPEC (546)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
