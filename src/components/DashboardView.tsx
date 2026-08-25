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
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FF6B00]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active & Synced with iQOO 13 Pro</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Welcome back 👋
          </h1>
          <p className="text-xs text-slate-400">
            Repository <span className="text-white font-mono">{repo.name}</span> • 1 active diagnostic target
          </p>
        </div>

        {/* Quick Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={onGenerateFix}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center space-x-1.5 ${
              isFixApplied 
                ? 'bg-emerald-500 text-white' 
                : 'bg-[#FF6B00] hover:bg-[#FF5500] text-white shadow-sm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFixApplied ? '✓ Patch Applied' : 'Auto-Fix Issue (1-Click)'}</span>
          </button>

          <button
            onClick={onRunTests}
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-white font-medium flex items-center space-x-1.5 border border-white/[0.06] transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>Run Tests</span>
          </button>

          <button
            onClick={onOpenCamera}
            className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-slate-200 font-medium border border-white/[0.06] transition-all"
          >
            <Camera className="w-3.5 h-3.5 text-[#FF6B00]" />
          </button>
        </div>
      </div>

      {/* Hero Diagnostic Card */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-[#FF6B00]/30 space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
              <Bug className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Active Target</span>
              <span className="text-xs font-bold text-white font-mono">{issue.filePath}:{issue.lineNumber}</span>
            </div>
          </div>

          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
            isFixApplied 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}>
            {isFixApplied ? '✓ Patch Applied' : 'Fix Pending'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#090A0F] border border-white/[0.06] space-y-1">
          <p className="text-xs font-semibold text-white font-mono">
            {issue.rootCause.summary}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {issue.rootCause.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono text-[11px]">
            <span>Confidence: <strong className="text-emerald-400">94%</strong></span>
            <span>•</span>
            <span>Target: <strong className="text-slate-200">3 files</strong></span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateTab('debugger')}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-medium border border-white/[0.06]"
            >
              See Details →
            </button>

            <button
              onClick={onGenerateFix}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                isFixApplied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#FF6B00] text-white hover:bg-[#FF5500]'
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
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all cursor-pointer group space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TestTube2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">
              {testResults?.failed === 0 ? '✓ 17/17 Passed' : 'Failures Present'}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs group-hover:text-emerald-400 transition-colors">
              Test Sandbox
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              17 unit & integration tests ready.
            </p>
          </div>

          <div className="text-[11px] text-emerald-400 font-medium">
            Run sandbox suite →
          </div>
        </div>

        {/* PR Reviewer */}
        <div 
          onClick={() => onNavigateTab('prs')}
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 transition-all cursor-pointer group space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <GitPullRequest className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-amber-400 font-mono">
              Score: {prReview.score}/100
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs group-hover:text-blue-400 transition-colors">
              Pull Request #142
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              1 security flaw & 2 edge cases.
            </p>
          </div>

          <div className="text-[11px] text-blue-400 font-medium">
            Review PR findings →
          </div>
        </div>

        {/* Security Auditor */}
        <div 
          onClick={() => onNavigateTab('security')}
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/30 transition-all cursor-pointer group space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-red-400 font-mono">
              1 Alert
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs group-hover:text-red-400 transition-colors">
              Security Auditor
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Hardcoded credential in apiConfig.ts.
            </p>
          </div>

          <div className="text-[11px] text-red-400 font-medium">
            Fix security issue →
          </div>
        </div>

      </div>

      {/* Activity Timeline Feed */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white tracking-tight">
            Live Sync Feed
          </span>
          <button 
            onClick={() => onNavigateTab('activity')}
            className="text-[11px] text-[#FF6B00] hover:underline font-medium"
          >
            View full timeline →
          </button>
        </div>

        <div className="space-y-1.5">
          {activityLog.slice(0, 3).map((act) => (
            <div 
              key={act.id} 
              className="p-2.5 rounded-xl bg-[#090A0F] border border-white/[0.06] flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />
                <div>
                  <span className="font-medium text-white block text-xs">{act.title}</span>
                  <span className="text-slate-400 text-[10px]">{act.description}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
