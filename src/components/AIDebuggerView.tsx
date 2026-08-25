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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white border border-slate-200 shadow-xs gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EA580C]">
            <Bug className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              AI Debugger & Patch Generator
            </h2>
            <p className="text-xs text-slate-500">
              Pinpoints exact bug root causes and generates 1-click patches
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={onGenerateFix}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              isFixApplied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#EA580C] hover:bg-orange-600 text-white shadow-2xs'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFixApplied ? '✓ Patch Applied' : 'Auto-Fix (1-Click)'}</span>
          </button>
          
          <button
            onClick={onRunTests}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium flex items-center space-x-1.5 border border-slate-200"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-600" />
            <span>Run Tests</span>
          </button>
        </div>
      </div>

      {/* 3-Step Journey */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
          Diagnostic Journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-left space-y-0.5 transition-all ${
                step.done
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={step.done ? 'text-slate-900' : 'text-slate-500'}>{step.title}</span>
                {step.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                )}
              </div>
              <p className="text-[11px] text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Root Cause Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[#EA580C] text-[10px] font-mono mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Root Cause Identified</span>
            </div>
            <h3 className="text-base font-bold font-mono text-slate-900 tracking-tight">
              {issue.rootCause.filePath}:{issue.rootCause.lineNumber}
            </h3>
          </div>

          <div className="text-right bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-mono">AI Confidence</span>
            <span className="text-xs font-bold text-emerald-600 font-mono">94% High</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-amber-700 font-mono">
            {issue.rootCause.summary}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {issue.rootCause.description}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono block">
            Affected Files ({issue.rootCause.affectedFilesCount})
          </span>

          <div className="space-y-1">
            {issue.rootCause.affectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-800"
              >
                <div className="flex items-center space-x-2">
                  <FileCode className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  <span className="truncate">{file}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-sans shrink-0">
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
                ? 'bg-emerald-600 text-white'
                : 'bg-[#EA580C] hover:bg-orange-600 text-white shadow-2xs'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFixApplied ? '✓ Patch Applied to Sandbox' : 'Auto-Fix (1-Click)'}</span>
          </button>
          
          <button
            onClick={onRunTests}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs flex items-center space-x-1.5 border border-slate-200"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-600" />
            <span>Run Sandbox Tests</span>
          </button>
        </div>

      </div>

    </div>
  );
};
