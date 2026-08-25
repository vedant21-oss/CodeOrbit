import React from 'react';
import { 
  Bug, 
  Sparkles, 
  CheckCircle2, 
  FileCode, 
  Play, 
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
    <div className="space-y-4 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
            <Bug className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              AI Debugger & Patch Generator
            </h2>
            <p className="text-xs text-slate-400">
              Pinpoints exact bug root causes and generates 1-click patches
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={onGenerateFix}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              isFixApplied
                ? 'bg-emerald-500 text-white'
                : 'bg-[#FF6B00] hover:bg-[#FF5500] text-white shadow-sm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFixApplied ? '✓ Patch Applied' : 'Auto-Fix (1-Click)'}</span>
          </button>
          
          <button
            onClick={onRunTests}
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-white font-medium flex items-center space-x-1.5 border border-white/[0.06]"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>Run Tests</span>
          </button>
        </div>
      </div>

      {/* 3-Step Journey */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
          Diagnostic Journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-left space-y-0.5 transition-all ${
                step.done
                  ? 'bg-[#090A0F] border-emerald-500/30 text-slate-200'
                  : 'bg-[#090A0F]/40 border-white/[0.06] text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={step.done ? 'text-white' : 'text-slate-400'}>{step.title}</span>
                {step.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                )}
              </div>
              <p className="text-[11px] text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Root Cause Card */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-[#FF6B00]/30 space-y-4">
        
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-mono mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Root Cause Identified</span>
            </div>
            <h3 className="text-base font-bold font-mono text-white tracking-tight">
              {issue.rootCause.filePath}:{issue.rootCause.lineNumber}
            </h3>
          </div>

          <div className="text-right bg-[#090A0F] px-3 py-1.5 rounded-xl border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 block font-mono">AI Confidence</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">94% High</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#090A0F] border border-white/[0.06] space-y-1">
          <p className="text-xs font-semibold text-amber-400 font-mono">
            {issue.rootCause.summary}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {issue.rootCause.description}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono block">
            Affected Files ({issue.rootCause.affectedFilesCount})
          </span>

          <div className="space-y-1">
            {issue.rootCause.affectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#090A0F] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-200"
              >
                <div className="flex items-center space-x-2">
                  <FileCode className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                  <span className="truncate">{file}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans shrink-0">
                  {idx === 0 ? 'Bug Target (L42)' : 'Dependent'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={onGenerateFix}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center space-x-1.5 transition-all ${
              isFixApplied
                ? 'bg-emerald-500 text-white'
                : 'bg-[#FF6B00] hover:bg-[#FF5500] text-white shadow-sm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFixApplied ? '✓ Patch Applied to Sandbox' : 'Auto-Fix (1-Click)'}</span>
          </button>
          
          <button
            onClick={onRunTests}
            className="px-4 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-white font-medium text-xs flex items-center space-x-1.5 border border-white/[0.06]"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>Run Sandbox Tests</span>
          </button>
        </div>

      </div>

    </div>
  );
};
