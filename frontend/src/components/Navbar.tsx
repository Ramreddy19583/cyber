"use client";

import React from "react";
import { 
  ShieldAlert, 
  Activity, 
  Search, 
  Share2, 
  Database, 
  BookOpen, 
  BarChart2, 
  Cpu, 
  FileText, 
  Zap, 
  FlaskConical 
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "mapping", label: "Vulnerability Mapping", icon: Search },
    { id: "graph", label: "Knowledge Graph", icon: Share2 },
    { id: "cwe", label: "CWE Explorer", icon: Database },
    { id: "capec", label: "CAPEC Explorer", icon: ShieldAlert },
    { id: "cve", label: "CVE Explorer", icon: FileText },
    { id: "demo", label: "Research Demo", icon: FlaskConical },
    { id: "evaluation", label: "Evaluation", icon: BarChart2 },
    { id: "architecture", label: "Architecture", icon: Cpu },
    { id: "paper", label: "Research Paper", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ShieldAlert className="h-6 w-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xl tracking-wider text-white">VWC-MAP</span>
                <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-800 px-1.5 py-0.5 rounded">
                  v2.0 LLM Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden md:block">
                Vulnerability → Weakness → Attack Pattern Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-emerald-400 hidden sm:inline">RoBERTa & T5 Active</span>
          </div>
        </div>

        {/* Mobile/Tablet Submenu Bar */}
        <div className="xl:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-cyan-400 border border-slate-700"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
