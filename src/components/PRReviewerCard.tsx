import React from 'react';
import { PullRequestReview } from '../types';
import { GitPullRequest, ShieldAlert, Bug, TestTube2, Zap } from 'lucide-react';

interface PRReviewerCardProps {
  pr: PullRequestReview;
  onGenerateFix: () => void;
  onOpenVoice: () => void;
}

export const PRReviewerCard: React.FC<PRReviewerCardProps> = ({
  pr,
  onGenerateFix,
  onOpenVoice,
}) => {
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <GitPullRequest className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Pull Request #{pr.id} Reviewer</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">
                {pr.branch}
              </span>
            </h2>
            <p className="text-xs text-slate-400">{pr.title}</p>
          </div>
        </div>

        {/* Score Gauge */}
        <div className="flex items-center space-x-3 bg-[#090A0F] px-4 py-2 rounded-xl border border-white/[0.06]">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">CodeOrbit Score</span>
            <span className="text-base font-bold text-amber-400 font-mono">{pr.score} / 100</span>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-amber-400/40 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
            {pr.score}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Bugs</span>
            <span className="text-sm font-bold text-amber-400">{pr.bugsCount} Detected</span>
          </div>
          <Bug className="w-4 h-4 text-amber-400/40" />
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-red-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Security</span>
            <span className="text-sm font-bold text-red-400">{pr.securityCount} Critical</span>
          </div>
          <ShieldAlert className="w-4 h-4 text-red-400/40" />
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Tests</span>
            <span className="text-sm font-bold text-blue-400">{pr.missingTestsCount} Edge Cases</span>
          </div>
          <TestTube2 className="w-4 h-4 text-blue-400/40" />
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Performance</span>
            <span className="text-sm font-bold text-slate-200">{pr.performanceCount} Issue</span>
          </div>
          <Zap className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* PR Summary */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
        <h3 className="font-semibold text-white uppercase tracking-wider text-[10px] font-mono">AI Synthesis Summary</h3>
        <p className="text-slate-300 leading-relaxed">{pr.summary}</p>
      </div>

      {/* Findings List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-slate-400 text-[10px] font-mono uppercase tracking-wider">
          Detailed Findings ({pr.findings.length})
        </h3>

        <div className="space-y-2">
          {pr.findings.map((finding) => (
            <div
              key={finding.id}
              className={`p-4 rounded-xl border space-y-2 ${
                finding.severity === 'critical'
                  ? 'bg-red-950/10 border-red-500/30'
                  : 'bg-white/[0.02] border-white/[0.06]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                    finding.severity === 'critical'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {finding.severity} {finding.type}
                  </span>
                  <span className="text-xs font-semibold text-white">{finding.title}</span>
                </div>
                <span className="text-[11px] font-mono text-[#FF6B00]">{finding.file}:{finding.line}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{finding.description}</p>

              {finding.suggestedFix && (
                <div className="p-2.5 rounded-lg bg-[#090A0F] border border-white/[0.06] text-xs font-mono text-emerald-400 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-sans block">Suggested Fix:</span>
                  <code>{finding.suggestedFix}</code>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>CodeOrbit AI can automatically generate fixes for detected PR issues.</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenVoice}
            className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-slate-200 font-medium border border-white/[0.06]"
          >
            🎙 Voice Command
          </button>
          <button
            onClick={onGenerateFix}
            className="px-3.5 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#FF5500] text-white font-semibold shadow-sm transition-all"
          >
            Generate Fix for PR Findings →
          </button>
        </div>
      </div>

    </div>
  );
};
