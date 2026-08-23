import React from 'react';
import { 
  Bug, 
  TestTube2, 
  GitPullRequest, 
  ShieldAlert, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Camera,
  Activity,
  Zap,
  Check,
  Code2,
  Smartphone
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
    <div className="space-y-5 max-w-6xl mx-auto">
      
      {/* Friendly Human Greeting Header */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-iqoo-amber font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active & Synced with iQOO 13 Pro</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back! 👋
          </h1>
          <p className="text-xs text-surface-400">
            Working on <span className="text-white font-mono font-medium">{repo.name}</span> • 1 diagnostic issue needs attention
          </p>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <button
            onClick={onGenerateFix}
            className={`px-4 py-2 rounded-xl font-semibold text-xs shadow-iqoo transition-all flex items-center space-x-2 ${
              isFixApplied 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                : 'bg-iqoo-amber hover:bg-iqoo-orange text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFixApplied ? '✓ Patch Applied' : 'Auto-Fix Issue (1-Click)'}</span>
          </button>

          <button
            onClick={onRunTests}
            className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium flex items-center space-x-2 border border-white/[0.08] transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>Run Tests</span>
          </button>

          <button
            onClick={onOpenCamera}
            className="px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-surface-200 font-medium border border-white/[0.08] transition-all"
          >
            <Camera className="w-3.5 h-3.5 text-iqoo-amber" />
          </button>
        </div>
      </div>

      {/* Linear-Style Hero Issue Solution Card */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-iqoo-amber/30 space-y-4 shadow-linear relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-iqoo-amber/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-iqoo-amber/15 border border-iqoo-amber/30 flex items-center justify-center text-iqoo-amber">
              <Bug className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-surface-400 block font-normal">Active Diagnostic Target</span>
              <span className="text-sm font-bold text-white font-mono">{issue.filePath}:{issue.lineNumber}</span>
            </div>
          </div>

          <span className={`text-xs px-3 py-1 rounded-full font-medium border ${
            isFixApplied 
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
              : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
          }`}>
            {isFixApplied ? '✓ Patch Ready for Review' : 'Needs Fix'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-1.5">
          <p className="text-xs font-semibold text-white font-mono">
            {issue.rootCause.summary}
          </p>
          <p className="text-xs text-surface-300 leading-relaxed">
            {issue.rootCause.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-4 text-xs text-surface-400">
            <span>Confidence: <strong className="text-emerald-400 font-bold">94% High</strong></span>
            <span>Affected files: <strong className="text-white font-mono">3 files</strong></span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateTab('debugger')}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-surface-200 text-xs font-medium border border-white/[0.08]"
            >
              See Details →
            </button>

            <button
              onClick={onGenerateFix}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-iqoo flex items-center space-x-1.5 ${
                isFixApplied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-iqoo-amber text-white hover:bg-iqoo-orange'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFixApplied ? '✓ Patch Applied' : 'Auto-Fix (1-Click)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clean 3-Grid Workspace Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Test Runner Health */}
        <div 
          onClick={() => onNavigateTab('tests')}
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <TestTube2 className="w-4 h-4" />
            </div>
            <span className="text-xs text-emerald-400 font-medium font-mono">
              {testResults?.failed === 0 ? '✓ 17/17 Passed' : 'Failures Present'}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors">
              Test Sandbox
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              17 unit & integration tests ready to execute.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-400 pt-1 font-medium">
            <span>Run sandbox suite →</span>
          </div>
        </div>

        {/* Card 2: Pull Request #142 */}
        <div 
          onClick={() => onNavigateTab('prs')}
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <span className="text-xs text-amber-400 font-medium font-mono">
              Score: {prReview.score}/100
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
              Pull Request #142
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              1 security flaw & 2 edge cases found.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-blue-400 pt-1 font-medium">
            <span>Review PR findings →</span>
          </div>
        </div>

        {/* Card 3: Security Guard */}
        <div 
          onClick={() => onNavigateTab('security')}
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-red-500/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-red-500/15 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-xs text-red-400 font-medium">
              1 Alert
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm group-hover:text-red-400 transition-colors">
              Security Scanner
            </h3>
            <p className="text-xs text-surface-400 mt-0.5">
              Hardcoded credential detected in apiConfig.ts.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-red-400 pt-1 font-medium">
            <span>Fix security issue →</span>
          </div>
        </div>

      </div>

      {/* Humanized Activity Stream */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white tracking-tight">
            Live Activity Feed
          </span>
          <button 
            onClick={() => onNavigateTab('activity')}
            className="text-xs text-iqoo-amber hover:underline font-medium"
          >
            View full timeline →
          </button>
        </div>

        <div className="space-y-2">
          {activityLog.slice(0, 3).map((act) => (
            <div 
              key={act.id} 
              className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-iqoo-amber shrink-0" />
                <div>
                  <span className="font-medium text-white block">{act.title}</span>
                  <span className="text-surface-400 text-[11px]">{act.description}</span>
                </div>
              </div>
              <span className="text-[10px] text-surface-500 font-mono shrink-0 ml-2">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
