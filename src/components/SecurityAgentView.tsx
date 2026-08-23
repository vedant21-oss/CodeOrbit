import React from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, Lock, FileCode, AlertOctagon } from 'lucide-react';

interface SecurityAgentViewProps {
  onGenerateFix: () => void;
  isFixApplied: boolean;
}

export const SecurityAgentView: React.FC<SecurityAgentViewProps> = ({
  onGenerateFix,
  isFixApplied,
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-surface-900 border border-surface-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>CodeOrbit Security Agent</span>
              <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-mono">
                Static Analysis + AI Guard
              </span>
            </h2>
            <p className="text-xs text-surface-400">
              Scans for hardcoded credentials, JWT flaws, and unsafe configuration
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
          1 Critical Issue Detected
        </span>
      </div>

      {/* CRITICAL SECURITY CARD (Section 19 Specification) */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/40 space-y-4 shadow-2xl">
        <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
          <AlertOctagon className="w-4 h-4" />
          <span>CRITICAL SECURITY ISSUE</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-500/20 pb-3">
          <h3 className="text-base font-bold text-white font-mono">
            src/config/apiConfig.ts:12
          </h3>
          <span className="text-xs text-red-400 font-bold">Risk: High Vulnerability</span>
        </div>

        <div className="space-y-2 text-xs">
          <p className="text-surface-200 font-semibold">
            Hardcoded API Production Credential detected (<code className="text-red-400">sk_live_998234...</code>).
          </p>
          <p className="text-surface-400 leading-relaxed">
            Risk: Raw production API credential stored directly in source code. Could be exposed in public Git repositories or commit history.
          </p>
          <div className="p-3 rounded-xl bg-surface-950 border border-surface-800 font-mono text-emerald-400">
            <span className="text-[10px] text-surface-400 font-sans block">Recommendation:</span>
            <code>Move credential to environment variable: process.env.JWT_SECRET_KEY</code>
          </div>
        </div>

        <button
          onClick={onGenerateFix}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center space-x-2 transition-all ${
            isFixApplied
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isFixApplied ? '✓ Security Patch Applied' : 'Generate Security Patch →'}</span>
        </button>
      </div>

    </div>
  );
};
