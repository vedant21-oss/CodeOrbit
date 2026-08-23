import React from 'react';
import { PullRequestReview } from '../types';
import { GitPullRequest, ShieldAlert, Bug, TestTube2, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-surface-900 border border-surface-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <GitPullRequest className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Pull Request #{pr.id} Reviewer</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">
                {pr.branch}
              </span>
            </h2>
            <p className="text-xs text-surface-400">{pr.title}</p>
          </div>
        </div>

        {/* CodeOrbit Quality Score Gauge */}
        <div className="flex items-center space-x-4 bg-surface-950 px-5 py-2.5 rounded-2xl border border-surface-800">
          <div>
            <span className="text-[11px] text-surface-400 block">CodeOrbit Score</span>
            <span className="text-xl font-bold text-amber-400 font-mono">{pr.score} / 100</span>
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-amber-400/40 flex items-center justify-center text-xs font-bold text-amber-400">
            {pr.score}
          </div>
        </div>
      </div>

      {/* Metric Breakdown Cards (Section 18 Spec) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-surface-400 block">🐛 Bugs</span>
            <span className="text-lg font-bold text-amber-400">{pr.bugsCount} Detected</span>
          </div>
          <Bug className="w-6 h-6 text-amber-400/40" />
        </div>

        <div className="p-4 rounded-2xl bg-surface-900 border border-red-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-surface-400 block">🔐 Security</span>
            <span className="text-lg font-bold text-red-400">{pr.securityCount} Critical</span>
          </div>
          <ShieldAlert className="w-6 h-6 text-red-400/40" />
        </div>

        <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-surface-400 block">🧪 Missing Tests</span>
            <span className="text-lg font-bold text-blue-400">{pr.missingTestsCount} Edge Cases</span>
          </div>
          <TestTube2 className="w-6 h-6 text-blue-400/40" />
        </div>

        <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-surface-400 block">⚡ Performance</span>
            <span className="text-lg font-bold text-surface-200">{pr.performanceCount} Issue</span>
          </div>
          <Zap className="w-6 h-6 text-surface-500" />
        </div>
      </div>

      {/* PR Summary */}
      <div className="p-5 rounded-2xl bg-surface-900 border border-surface-800 text-xs space-y-2">
        <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">AI Synthesis Summary</h3>
        <p className="text-surface-300 leading-relaxed">{pr.summary}</p>
      </div>

      {/* Detailed Findings List */}
      <div className="space-y-3">
        <h3 className="font-bold text-surface-300 text-xs uppercase tracking-wider">
          Detailed Findings & Recommendations ({pr.findings.length})
        </h3>

        <div className="space-y-3">
          {pr.findings.map((finding) => (
            <div
              key={finding.id}
              className={`p-5 rounded-2xl border space-y-3 ${
                finding.severity === 'critical'
                  ? 'bg-red-950/20 border-red-500/40'
                  : 'bg-surface-900 border-surface-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    finding.severity === 'critical'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {finding.severity} {finding.type}
                  </span>
                  <span className="text-xs font-bold text-white">{finding.title}</span>
                </div>
                <span className="text-xs font-mono text-iqoo-amber">{finding.file}:{finding.line}</span>
              </div>

              <p className="text-xs text-surface-300 leading-relaxed">{finding.description}</p>

              {finding.suggestedFix && (
                <div className="p-3 rounded-xl bg-surface-950 border border-surface-800 text-xs font-mono text-emerald-400 space-y-1">
                  <span className="text-[10px] text-surface-400 font-sans block">Suggested Fix:</span>
                  <code>{finding.suggestedFix}</code>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PR Action Bar */}
      <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-surface-300">
          <Zap className="w-4 h-4 text-iqoo-amber" />
          <span>CodeOrbit AI can automatically generate fixes for detected PR issues.</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenVoice}
            className="px-3.5 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-200 font-semibold border border-surface-700"
          >
            🎙 Voice Command
          </button>
          <button
            onClick={onGenerateFix}
            className="px-4 py-2 rounded-xl bg-iqoo-amber hover:bg-iqoo-orange text-white font-bold shadow-iqoo transition-all"
          >
            Generate Fix for PR Findings →
          </button>
        </div>
      </div>

    </div>
  );
};
