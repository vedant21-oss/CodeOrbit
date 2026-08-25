import React, { useState } from 'react';
import { 
  Bug, 
  TestTube2, 
  Play, 
  Sparkles, 
  Camera, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FolderGit2,
  FileCode,
  ShieldCheck
} from 'lucide-react';
import { 
  RepositoryInfo, 
  IssueItem, 
  TestSuiteResult, 
  PullRequestReview, 
  ActivityItem, 
  SyncState,
  NavigationTab
} from '../types';

interface DashboardViewProps {
  repo: RepositoryInfo;
  issue: IssueItem;
  testResults: TestSuiteResult | null;
  prReview: PullRequestReview;
  activityLog: ActivityItem[];
  syncState: SyncState;
  isFixApplied: boolean;
  onNavigateTab: (tab: NavigationTab) => void;
  onGenerateFix: () => void;
  onRunTests: () => void;
  onOpenCamera: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  repo,
  issue,
  testResults,
  prReview,
  activityLog,
  syncState,
  isFixApplied,
  onNavigateTab,
  onGenerateFix,
  onRunTests,
  onOpenCamera,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(2); // Default to Step 2: Diagnosis

  const steps = [
    { num: 1, label: 'Repo & Sync', desc: 'codeorbit-demo indexed' },
    { num: 2, label: 'Root Cause', desc: 'authMiddleware.ts:42' },
    { num: 3, label: 'Apply Patch', desc: isFixApplied ? '✓ Patch Applied' : 'Review code diff' },
    { num: 4, label: 'Test & Merge', desc: testResults?.failed === 0 ? '✓ 17/17 Passed' : 'Run 17 tests' },
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      
      {/* Step Stepper Header Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#EA580C]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Step-by-Step AI Repair Workflow</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
              CodeOrbit Guided Workflow
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenCamera}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-all flex items-center space-x-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Scan Camera Log</span>
            </button>
          </div>
        </div>

        {/* 4-Step Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {steps.map((step) => {
            const isCompleted = step.num < currentStep || (step.num === 3 && isFixApplied) || (step.num === 4 && testResults?.failed === 0);
            const isActive = currentStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-orange-50/80 border-[#EA580C] shadow-2xs'
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-0.5">
                  <span className={`font-mono text-[11px] ${
                    isActive ? 'text-[#EA580C]' : isCompleted ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    Step {step.num}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                  ) : null}
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {step.label}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">
                  {step.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1 CONTENT: REPO INDEX & SYNC STATUS */}
      {currentStep === 1 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EA580C]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Step 1: Repository Indexing & Device Sync
              </h2>
              <p className="text-xs text-slate-500">
                Connected to iQOO 13 Pro via WebSocket (Port 3001)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Repository</span>
              <span className="text-xs font-bold text-slate-900 font-mono">codeorbit-demo (main)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">AST Indexing</span>
              <span className="text-xs font-bold text-emerald-600 font-mono">248 files • 1,420 AST Nodes</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Sync Node</span>
              <span className="text-xs font-bold text-[#EA580C] font-mono">iQOO 13 Pro 5G Live</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">✓ Repository AST fully indexed. Target ready for AI diagnosis.</span>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-semibold text-xs shadow-2xs flex items-center space-x-1.5 transition-all"
            >
              <span>Next: View Root Cause Diagnosis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 CONTENT: ROOT CAUSE DIAGNOSIS */}
      {currentStep === 2 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EA580C]">
                <Bug className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#EA580C] uppercase tracking-wider block">Step 2 of 4</span>
                <h2 className="text-base font-bold text-slate-900 tracking-tight font-mono">
                  {issue.filePath}:{issue.lineNumber}
                </h2>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold">
              94% AI Confidence
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <p className="text-xs font-bold text-amber-700 font-mono">
              {issue.rootCause.summary}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {issue.rootCause.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono block">
              Affected Dependencies ({issue.rootCause.affectedFilesCount})
            </span>
            <div className="space-y-1">
              {issue.rootCause.affectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-800"
                >
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                    <span>{file}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans">
                    {idx === 0 ? 'Bug Target (L42)' : 'Dependent'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Step 1</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-semibold text-xs shadow-2xs flex items-center space-x-1.5 transition-all"
            >
              <span>Next: Review & Apply Code Patch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 CONTENT: REVIEW & APPLY PATCH */}
      {currentStep === 3 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EA580C]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#EA580C] uppercase tracking-wider block">Step 3 of 4</span>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Generated Patch Code Diff
                </h2>
              </div>
            </div>

            <button
              onClick={onGenerateFix}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                isFixApplied
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-[#EA580C] hover:bg-orange-600 text-white shadow-2xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFixApplied ? '✓ Patch Applied to Sandbox' : 'Apply Patch (1-Click)'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 space-y-1">
            <div className="text-slate-400 text-[10px] pb-1 border-b border-slate-800">
              --- a/src/middleware/authMiddleware.ts<br />
              +++ b/src/middleware/authMiddleware.ts
            </div>
            <div className="text-slate-400">@@ -40,5 +40,8 @@</div>
            <div className="text-red-400 bg-red-950/40 px-1 py-0.5 rounded">- const bearer = token.replace('Bearer ', '');</div>
            <div className="text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded">+ if (!token || typeof token !== 'string') return next(new Error('Unauthorized'));</div>
            <div className="text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded">+ const bearer = token.startsWith('Bearer ') ? token.slice(7) : token;</div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Diagnosis</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-semibold text-xs shadow-2xs flex items-center space-x-1.5 transition-all"
            >
              <span>Next: Verify Test Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 CONTENT: TEST SUITE & MERGE */}
      {currentStep === 4 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <TestTube2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider block">Step 4 of 4</span>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Automated Test Verification & Merge
                </h2>
              </div>
            </div>

            <button
              onClick={onRunTests}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-2xs flex items-center space-x-1.5 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run 17 Sandbox Tests</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-900">Sandbox Test Suite Progress</span>
              <span className="text-emerald-600 font-mono">17 / 17 Passed (100%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
            <p className="text-xs text-slate-600">
              Authentication unit test suite, null pointer edge cases, and JWT token validation tests executed cleanly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Patch verified cleanly. Zero regressions found. Safe to merge into main branch.</span>
            </div>

            <button
              onClick={() => alert('Patch cleanly merged to git branch main!')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all"
            >
              Merge to Main Branch ✓
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Patch Diff</span>
            </button>

            <button
              onClick={() => setCurrentStep(1)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200"
            >
              Start New Workflow 🔄
            </button>
          </div>
        </div>
      )}

      {/* Clean Timeline Footer */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-900">Recent Workflow Logs</span>
          <button onClick={() => onNavigateTab('activity')} className="text-[#EA580C] font-medium hover:underline text-[11px]">
            View timeline →
          </button>
        </div>

        <div className="space-y-1">
          {activityLog.slice(0, 2).map((act) => (
            <div key={act.id} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-700 text-[11px] truncate">{act.title}</span>
              <span className="text-[10px] text-slate-400 font-mono ml-2 shrink-0">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
