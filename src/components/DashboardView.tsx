import React from 'react';
import { 
  Bug, 
  TestTube2, 
  GitPullRequest, 
  ShieldAlert, 
  Play, 
  Sparkles, 
  Camera, 
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
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      
      {/* Top Greeting Header */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#EA580C]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active & Synced with iQOO 13 Pro</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Welcome back 👋
          </h1>
          <p className="text-xs text-slate-600">
            Repository <span className="text-slate-900 font-mono font-semibold">{repo.name}</span> • 1 active diagnostic target
          </p>
        </div>

        {/* Quick Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={onGenerateFix}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center space-x-1.5 ${
              isFixApplied 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-[#EA580C] hover:bg-orange-600 text-white shadow-xs'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFixApplied ? '✓ Patch Applied' : 'Auto-Fix Issue (1-Click)'}</span>
          </button>

          <button
            onClick={onRunTests}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-medium flex items-center space-x-1.5 border border-slate-200 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-600" />
            <span>Run Tests</span>
          </button>

          <button
            onClick={onOpenCamera}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium border border-slate-200 transition-all"
          >
            <Camera className="w-3.5 h-3.5 text-[#EA580C]" />
          </button>
        </div>
      </div>

      {/* Hero Diagnostic Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-[#EA580C]">
              <Bug className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Active Target</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{issue.filePath}:{issue.lineNumber}</span>
            </div>
          </div>

          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
            isFixApplied 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {isFixApplied ? '✓ Patch Applied' : 'Fix Pending'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <p className="text-xs font-semibold text-slate-900 font-mono">
            {issue.rootCause.summary}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {issue.rootCause.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono text-[11px]">
            <span>Confidence: <strong className="text-emerald-600">94%</strong></span>
            <span>•</span>
            <span>Target: <strong className="text-slate-800">3 files</strong></span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateTab('debugger')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200"
            >
              See Details →
            </button>

            <button
              onClick={onGenerateFix}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                isFixApplied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#EA580C] text-white hover:bg-orange-600 shadow-2xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFixApplied ? '✓ Applied' : 'Auto-Fix (1-Click)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        {/* Test Sandbox */}
        <div 
          onClick={() => onNavigateTab('tests')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-2xs transition-all cursor-pointer group space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <TestTube2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-emerald-600 font-mono font-medium">
              {testResults?.failed === 0 ? '✓ 17/17 Passed' : 'Failures Present'}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-xs group-hover:text-emerald-600 transition-colors">
              Test Sandbox
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              17 unit & integration tests ready.
            </p>
          </div>

          <div className="text-[11px] text-emerald-600 font-medium">
            Run sandbox suite →
          </div>
        </div>

        {/* PR Reviewer */}
        <div 
          onClick={() => onNavigateTab('prs')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-2xs transition-all cursor-pointer group space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <GitPullRequest className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-amber-600 font-mono font-medium">
              Score: {prReview.score}/100
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
              Pull Request #142
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              1 security flaw & 2 edge cases.
            </p>
          </div>

          <div className="text-[11px] text-blue-600 font-medium">
            Review PR findings →
          </div>
        </div>

        {/* Security Auditor */}
        <div 
          onClick={() => onNavigateTab('security')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-300 shadow-2xs transition-all cursor-pointer group space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-red-600 font-mono font-medium">
              1 Alert
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 text-xs group-hover:text-red-600 transition-colors">
              Security Auditor
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Hardcoded credential in apiConfig.ts.
            </p>
          </div>

          <div className="text-[11px] text-red-600 font-medium">
            Fix security issue →
          </div>
        </div>

      </div>

      {/* Activity Timeline Feed */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-900 tracking-tight">
            Live Sync Feed
          </span>
          <button 
            onClick={() => onNavigateTab('activity')}
            className="text-[11px] text-[#EA580C] hover:underline font-medium"
          >
            View full timeline →
          </button>
        </div>

        <div className="space-y-1.5">
          {activityLog.slice(0, 3).map((act) => (
            <div 
              key={act.id} 
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0" />
                <div>
                  <span className="font-medium text-slate-900 block text-xs">{act.title}</span>
                  <span className="text-slate-500 text-[10px]">{act.description}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
