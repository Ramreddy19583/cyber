"use client";

import React, { useState, useEffect } from "react";
import { Share2, Database, ShieldAlert, FileText, Info, Layers, RefreshCw } from "lucide-react";

export default function KnowledgeGraphView() {
  const [selectedCve, setSelectedCve] = useState("CVE-2021-45706");
  const [graphData, setGraphData] = useState<any>(null);
  const [activeNode, setActiveNode] = useState<any>(null);

  useEffect(() => {
    fetchGraph(selectedCve);
  }, [selectedCve]);

  const fetchGraph = async (cveId: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/graph?cve_id=${cveId}`);
      const data = await res.json();
      setGraphData(data);
      if (data.nodes && data.nodes.length > 0) {
        setActiveNode(data.nodes[0]);
      }
    } catch (err) {
      console.error("Graph API fallback", err);
      setGraphData(getMockGraphData(cveId));
      setActiveNode(getMockGraphData(cveId).nodes[0]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="cyber-card p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Share2 className="h-5 w-5 text-cyan-400" />
            CVE → CWE → CAPEC Intelligence Graph
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Visualizing multi-level hierarchical relationships (ChildOf, CanPrecede, PeerOf, Requires, StartsWith).
          </p>
        </div>

        {/* CVE Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Target Scenario:</span>
          {["CVE-2021-45706", "CVE-2021-44228", "CVE-2021-3156"].map((cve) => (
            <button
              key={cve}
              onClick={() => setSelectedCve(cve)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                selectedCve === cve
                  ? "bg-cyan-950 text-cyan-400 border border-cyan-700 font-bold"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {cve}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive SVG Network Graph (Left 3 Columns) */}
        <div className="lg:col-span-3 cyber-card p-6 rounded-2xl border border-slate-800 min-h-[500px] flex flex-col justify-between relative overflow-hidden bg-slate-950/90">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-400" /> CVE Instance
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-400 inline-block shadow-sm shadow-purple-400" /> CWE Weakness
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400" /> CAPEC Attack Pattern
              </span>
            </div>
            <button
              onClick={() => fetchGraph(selectedCve)}
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset View
            </button>
          </div>

          {/* Interactive Flow Diagram Rendering */}
          {graphData && (
            <div className="my-8 relative min-h-[400px] flex flex-col items-center justify-center space-y-12">
              {/* Level 1: CVE Node */}
              <div className="flex justify-center z-10">
                {graphData.nodes.filter((n: any) => n.type === "CVE").map((node: any) => (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`px-6 py-3 rounded-xl font-mono text-sm font-bold transition-all border shadow-lg cursor-pointer ${
                      activeNode?.id === node.id
                        ? "bg-cyan-950 text-cyan-300 border-cyan-400 shadow-cyan-500/30 scale-105"
                        : "bg-slate-900 text-cyan-400 border-cyan-800 hover:border-cyan-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-cyan-400" />
                      {node.id}
                    </div>
                  </button>
                ))}
              </div>

              {/* Connecting Line 1 -> 2 */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-purple-500" />

              {/* Level 2: CWE Nodes */}
              <div className="flex flex-wrap justify-center gap-6 z-10">
                {graphData.nodes.filter((n: any) => n.type === "CWE").map((node: any) => (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border shadow-md cursor-pointer ${
                      activeNode?.id === node.id
                        ? "bg-purple-950 text-purple-200 border-purple-400 shadow-purple-500/30 scale-105"
                        : "bg-slate-900 text-purple-400 border-purple-800 hover:border-purple-500"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Database className="h-3.5 w-3.5 text-purple-400" />
                      {node.id}
                    </div>
                  </button>
                ))}
              </div>

              {/* Connecting Line 2 -> 3 */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-emerald-500" />

              {/* Level 3: CAPEC Nodes */}
              <div className="flex flex-wrap justify-center gap-4 z-10 max-w-2xl">
                {graphData.nodes.filter((n: any) => n.type === "CAPEC").map((node: any) => (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`px-3 py-2 rounded-lg font-mono text-[11px] font-semibold transition-all border cursor-pointer ${
                      activeNode?.id === node.id
                        ? "bg-emerald-950 text-emerald-200 border-emerald-400 shadow-emerald-500/30 scale-105"
                        : "bg-slate-900 text-emerald-400 border-emerald-900 hover:border-emerald-500"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <ShieldAlert className="h-3 w-3 text-emerald-400" />
                      {node.id}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Node Detail Drawer (Right 1 Column) */}
        <div className="cyber-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Info className="h-4 w-4 text-cyan-400" />
            Node Intelligence Detail
          </h3>

          {activeNode ? (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Entity ID</span>
                <div className="text-base font-bold text-white">{activeNode.id}</div>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                  {activeNode.type} Node
                </span>
              </div>

              {activeNode.name && (
                <div>
                  <span className="text-slate-400 block mb-1">Entity Name:</span>
                  <p className="text-slate-200 font-sans text-xs font-semibold">{activeNode.name}</p>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-1">Description:</span>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">{activeNode.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">VWC-MAP Edge Mappings:</span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Hierarchy Edge:</span>
                    <span className="text-purple-400 font-bold">ChildOf / PeerOf</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Attack Vector:</span>
                    <span className="text-emerald-400 font-bold">CanPrecede</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-slate-500">Click any node on the graph to inspect detailed taxonomy.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function getMockGraphData(cveId: string) {
  return {
    nodes: [
      { id: cveId, type: "CVE", description: "Vulnerability instance in NVD dataset." },
      { id: "CWE-401", type: "CWE", name: "Missing Release of Memory after Effective Lifetime", description: "Unreleased memory allocation frame." },
      { id: "CWE-772", type: "CWE", name: "Missing Release of Resource after Effective Lifetime", description: "Resource leak category." },
      { id: "CWE-404", type: "CWE", name: "Improper Resource Shutdown or Release", description: "Root cleanup failure." },
      { id: "CAPEC-125", type: "CAPEC", name: "Flooding", description: "DoS memory flooding attack." },
      { id: "CAPEC-130", type: "CAPEC", name: "Excessive Allocation", description: "Memory growth exhaustion." },
      { id: "CAPEC-229", type: "CAPEC", name: "Serialized Data Blowup", description: "Deserialization blowup." }
    ],
    edges: [
      { source: cveId, target: "CWE-401", label: "maps_to" },
      { source: "CWE-401", target: "CAPEC-125", label: "associated_with" }
    ]
  };
}
