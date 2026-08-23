import React from 'react';
import { 
  Bug, 
  Sparkles, 
  CheckCircle2, 
  FileCode, 
  ArrowRight, 
  Play, 
  ShieldAlert,
  Check
} from 'lucide-react';
import { IssueItem, SyncState } from '../types';

interface AIDebuggerViewProps {
  issue: IssueItem;
  syncState: SyncState;
  isFixApplied: boolean;
  onGenerateFix: () => void;
  onRunTests: () => void;
}

export const AIDebuggerView: React.FC<AIDebuggerViewProps> = ({
  issue,
  syncState,
  isFixApplied,
  onGenerateFix,
  onRunTests,
}) => {
  const steps = [
    { title: '1. Error Captured', desc: 'Traceback analyzed', done: true },
    { title: '2. Root Cause Found', desc: 'authMiddleware.ts:42', done: true },
    { title: '3. Patch Ready', desc: isFixApplied ? '✓ Applied' : 'Click to apply', done: isFixApplied },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-3xl bg-surface-900/80 border border-surface-800 gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-iqoo-amber/20 flex items-center justify-center text-iqoo-amber">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              AI Debugger & Auto-Fix
            </h2>
            <p className="text-xs text-surface-300">
              Pinpoints exact bug root causes and generates 1-click patches
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 text-xs">
          <button
            onClick={onGenerateFix}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all shadow-iqoo flex items-center space-x-2 ${
              isFixApplied
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-iqoo-amber hover:bg-iqoo-orange text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFixApplied ? '✓ Patch Applied' : 'Auto-Fix (1-Click)'}</span>
          </button>
          
          <button
            onClick={onRunTests}
            className="px-4 py-2.5 rounded-2xl bg-surface-800/90 hover:bg-surface-700 text-white font-semibold flex items-center space-x-2 border border-surface-700/60"
          >
            <Play className="w-4 h-4 fill-current text-emerald-400" />
            <span>Run Tests</span>
          </button>
        </div>
      </div>

      {/* 3-Step Humanized Progress Journey */}
      <div className="p-5 rounded-3xl bg-surface-900/80 border border-surface-800">
        <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3 px-1">
          Diagnostic Journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                step.done
                  ? 'bg-surface-950/80 border-emerald-500/30 text-surface-200'
                  : 'bg-surface-950/40 border-surface-800 text-surface-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={step.done ? 'text-white' : 'text-surface-400'}>{step.title}</span>
                {step.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-iqoo-amber animate-pulse" />
                )}
              </div>
              <p className="text-xs text-surface-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROOT CAUSE CARD */}
      <div className="p-6 rounded-3xl bg-surface-900/90 border border-iqoo-amber/30 space-y-5 shadow-xl">
        
        {/* Result Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-iqoo-amber/15 border border-iqoo-amber/25 text-iqoo-amber text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Root Cause Identified</span>
            </div>
            <h3 className="text-xl font-bold font-mono text-white tracking-tight">
              {issue.rootCause.filePath}:{issue.rootCause.lineNumber}
            </h3>
          </div>

          <div className="text-right bg-surface-950/80 px-4 py-2 rounded-2xl border border-surface-800">
            <span className="text-[11px] text-surface-400 block">AI Confidence</span>
            <span className="text-base font-bold text-emerald-400">94% High</span>
          </div>
        </div>

        {/* Root Cause Plain English Explanation */}
        <div className="p-4 rounded-2xl bg-surface-950/80 border border-surface-800 space-y-2">
          <p className="text-sm font-semibold text-amber-400">
            {issue.rootCause.summary}
          </p>
          <p className="text-xs text-surface-300 leading-relaxed">
            {issue.rootCause.description}
          </p>
        </div>

        {/* Affected Files List */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider block">
            Affected Files ({issue.rootCause.affectedFilesCount})
          </span>

          <div className="space-y-1.5">
            {issue.rootCause.affectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-surface-950/80 border border-surface-800/80 flex items-center justify-between text-xs font-mono text-surface-200"
              >
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-iqoo-amber shrink-0" />
                  <span className="truncate">{file}</span>
                </div>
                <span className="text-[11px] text-surface-400 font-sans shrink-0">
                  {idx === 0 ? 'Bug Target (L42)' : 'Dependent'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onGenerateFix}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-iqoo flex items-center space-x-2 transition-all ${
              isFixApplied
                ? 'bg-emerald-500 text-white'
                : 'bg-iqoo-amber hover:bg-iqoo-orange text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFixApplied ? '✓ Patch Applied to Sandbox' : 'Auto-Fix (1-Click)'}</span>
          </button>
          
          <button
            onClick={onRunTests}
            className="px-5 py-2.5 rounded-2xl bg-surface-800 hover:bg-surface-700 text-white font-semibold text-xs flex items-center space-x-2 border border-surface-700"
          >
            <Play className="w-4 h-4 fill-current text-emerald-400" />
            <span>Run Sandbox Tests</span>
          </button>
        </div>

      </div>

    </div>
  );
};
