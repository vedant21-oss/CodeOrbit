import React from 'react';
import { FixPatch } from '../types';
import { Sparkles, CheckCircle2, Play, GitCommit, FileDiff, ShieldAlert } from 'lucide-react';

interface FixDiffViewerProps {
  patch: FixPatch;
  isFixApplied: boolean;
  onApplyFix: () => void;
  onRunTests: () => void;
}

export const FixDiffViewer: React.FC<FixDiffViewerProps> = ({
  patch,
  isFixApplied,
  onApplyFix,
  onRunTests,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-surface-900 border border-surface-800 space-y-6 shadow-2xl">
      
      {/* Patch Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-iqoo-amber font-semibold mb-1">
            <GitCommit className="w-4 h-4" />
            <span>GIT WORKTREE SANDBOX PATCH</span>
          </div>
          <h3 className="text-lg font-bold text-white font-mono">
            {patch.filePath}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
            isFixApplied
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-iqoo-amber/20 text-iqoo-amber border-iqoo-amber/30'
          }`}>
            {isFixApplied ? '✓ Patch Applied to Demo Branch' : 'Draft Patch Ready'}
          </span>
        </div>
      </div>

      {/* Safety Sandbox Notice */}
      <div className="p-3 rounded-xl bg-surface-950 border border-surface-800 text-xs text-surface-300 flex items-center space-x-2">
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Isolated Sandbox: Patch targets <code className="text-iqoo-amber font-mono">demo/fix-auth-nullpointer</code> branch. Main branch protected.
        </span>
      </div>

      {/* Side-by-Side Unified Diff View */}
      <div className="rounded-xl bg-surface-950 border border-surface-800 font-mono text-xs overflow-hidden">
        <div className="bg-surface-900 px-4 py-2 text-surface-400 border-b border-surface-800 flex justify-between">
          <span>Target: {patch.filePath}:L42</span>
          <span>Unified Git Diff</span>
        </div>

        {/* Removed Lines (Red) */}
        <div className="p-3 bg-red-950/30 text-red-300 border-b border-surface-900 leading-relaxed overflow-x-auto">
          <span className="text-red-500 font-bold mr-2 select-none">-</span>
          <code>{patch.originalCode}</code>
        </div>

        {/* Added Lines (Green) */}
        <div className="p-3 bg-emerald-950/30 text-emerald-300 leading-relaxed overflow-x-auto">
          <span className="text-emerald-500 font-bold mr-2 select-none">+</span>
          <code>{patch.fixedCode}</code>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center space-x-3">
          <button
            onClick={onApplyFix}
            disabled={isFixApplied}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-iqoo flex items-center space-x-2 ${
              isFixApplied
                ? 'bg-surface-800 text-surface-400 cursor-not-allowed'
                : 'bg-iqoo-amber hover:bg-iqoo-orange text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFixApplied ? '✓ Patch Applied' : 'Apply Patch to Sandbox'}</span>
          </button>

          <button
            onClick={onRunTests}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Run Tests & Verify</span>
          </button>
        </div>

        <span className="text-xs text-surface-400">
          Target test runner: <code className="text-surface-200">npm test (17 tests)</code>
        </span>
      </div>

    </div>
  );
};
