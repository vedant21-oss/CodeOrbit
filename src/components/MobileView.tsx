import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  GitPullRequest, 
  Play, 
  Home, 
  Activity, 
  FolderGit2, 
  Bot, 
  Settings as SettingsIcon,
  AlertTriangle,
  ArrowRight,
  Mic,
} from 'lucide-react';
import { SyncState, IssueItem, TestSuiteResult, PullRequestReview } from '../types';

interface MobileViewProps {
  syncState: SyncState;
  onOpenCamera: () => void;
  onOpenVoice: () => void;
  onRunTests: () => void;
  onGenerateFix: () => void;
  issue: IssueItem;
  testResults: TestSuiteResult | null;
  prReview: PullRequestReview;
  isFixApplied: boolean;
  onSelectTab: (tab: any) => void;
}

export const MobileView: React.FC<MobileViewProps> = ({
  syncState,
  onOpenCamera,
  onOpenVoice,
  onRunTests,
  onGenerateFix,
  issue,
  testResults,
  prReview,
  isFixApplied,
  onSelectTab
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'activity' | 'repo' | 'ai' | 'settings'>('home');
  const [aiQuestion, setAiQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; action?: string }>>([
    {
      sender: 'ai',
      text: 'Connected to laptop sandbox. How can I assist your workflow today?',
    }
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const query = aiQuestion;
    setChatMessages(prev => [...prev, { sender: 'user', text: query }]);
    setAiQuestion('');

    setTimeout(() => {
      if (query.toLowerCase().includes('build') || query.toLowerCase().includes('fail') || query.toLowerCase().includes('error')) {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: 'Null pointer exception detected in `src/middleware/authMiddleware.ts:42`. Confidence: 94%.',
            action: 'VIEW_ROOT_CAUSE'
          }
        ]);
      } else {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `Inspected codeorbit-demo repository. "${query}" matches authentication middleware and payment service.`,
          }
        ]);
      }
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#07080D] text-slate-100 font-sans select-none">
      
      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        
        {/* Header Status */}
        <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.06]">
          <div>
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-400">Repo:</span>
              <span className="font-semibold text-white">codeorbit-demo</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5 font-mono">
              <span className="flex items-center space-x-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GitHub</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-[#FF6B00]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                <span>Laptop</span>
              </span>
            </div>
          </div>

          <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] font-bold text-[10px]">
            iQOO
          </div>
        </div>

        {/* Tab 1: HOME */}
        {activeMobileTab === 'home' && (
          <div className="space-y-3">
            
            {/* Primary Action Button */}
            <button
              onClick={() => setActiveMobileTab('ai')}
              className="w-full p-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#FF5500] text-white shadow-md shadow-[#FF6B00]/20 flex items-center justify-between font-semibold group text-left transition-all active:scale-[0.98]"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Ask CodeOrbit AI</span>
                  <span className="text-[10px] text-white/80">Codebase Reasoning</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Action Tiles */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={onOpenCamera}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6B00]/40 flex flex-col items-center justify-center space-y-1.5 text-center transition-all active:scale-95 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] group-hover:scale-105 transition-transform">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-200">Scan Error</span>
              </button>

              <button
                onClick={() => onSelectTab('prs')}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/40 flex flex-col items-center justify-center space-y-1.5 text-center transition-all active:scale-95 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-200">Review PR</span>
              </button>

              <button
                onClick={onRunTests}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/40 flex flex-col items-center justify-center space-y-1.5 text-center transition-all active:scale-95 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[11px] font-medium text-slate-200">Run Tests</span>
              </button>
            </div>

            {/* Voice Bar */}
            <button
              onClick={onOpenVoice}
              className="w-full py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-slate-300 hover:border-[#FF6B00]/40 transition-all"
            >
              <div className="flex items-center space-x-2">
                <Mic className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
                <span className="text-[11px]">Voice: "Why did build fail?"</span>
              </div>
              <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#FF6B00]/15 text-[#FF6B00]">
                Voice AI
              </span>
            </button>

            {/* Diagnostic Card */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>REPOSITORY DIAGNOSTIC</span>
                </div>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {isFixApplied ? '✓ Patch Applied' : 'Issue Detected'}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-mono text-slate-300">authMiddleware.ts:42</p>
                <p className="text-xs text-slate-400 mt-0.5">{issue.rootCause.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onSelectTab('debugger')}
                  className="py-1.5 px-3 rounded-lg bg-white/[0.04] text-slate-200 hover:text-white text-xs font-medium text-center"
                >
                  View Cause
                </button>
                <button
                  onClick={onGenerateFix}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
                    isFixApplied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#FF6B00] text-white shadow-sm'
                  }`}
                >
                  {isFixApplied ? '✓ Applied' : 'Generate Fix'}
                </button>
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">TEST VERIFICATION</span>
                  <span className={testResults.failed === 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {testResults.failed === 0 ? '✓ PASSED' : 'FAILURES'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {testResults.passed} / {testResults.total} tests passed. Safe to merge.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI CHAT */}
        {activeMobileTab === 'ai' && (
          <div className="h-[440px] flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between px-1 pb-1.5 border-b border-white/[0.06]">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-200">
                <Bot className="w-4 h-4 text-[#FF6B00]" />
                <span>CodeOrbit AI Assistant</span>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#FF6B00] text-white rounded-br-none'
                        : 'bg-white/[0.03] border border-white/[0.06] text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.action === 'VIEW_ROOT_CAUSE' && (
                      <button
                        onClick={() => onSelectTab('debugger')}
                        className="mt-1.5 text-[11px] font-semibold text-[#FF6B00] underline block"
                      >
                        View authMiddleware.ts:42 Root Cause →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="flex items-center space-x-1.5 pt-2 border-t border-white/[0.06]">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask about auth, payments, build logs..."
                className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF5500]"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: PR REVIEW */}
        {activeMobileTab === 'repo' && (
          <div className="space-y-2 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">PR #142 Review</span>
                  <span className="text-[11px] text-slate-400">feat(auth): JWT refactor</span>
                </div>
                <span className="font-mono font-bold text-amber-400">Score: {prReview.score}/100</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="p-2 rounded-lg bg-[#090A0F] border border-white/[0.06] text-amber-400">
                  🐛 {prReview.bugsCount} Bugs
                </div>
                <div className="p-2 rounded-lg bg-[#090A0F] border border-white/[0.06] text-red-400">
                  🔐 {prReview.securityCount} Security Flaw
                </div>
              </div>

              <button
                onClick={() => onSelectTab('prs')}
                className="w-full py-1.5 rounded-lg bg-white/[0.04] text-slate-300 text-xs text-center hover:text-white"
              >
                View Full PR Review →
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: ACTIVITY FEED */}
        {activeMobileTab === 'activity' && (
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
              Live Sync Events
            </h4>
            <div className="space-y-1.5">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-emerald-400 font-semibold block text-[11px]">✓ Fix Verified</span>
                <span className="text-slate-400 text-[10px]">17 tests passed on laptop runner.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[#FF6B00] font-semibold block text-[11px]">📱 Camera OCR Event</span>
                <span className="text-slate-400 text-[10px]">Scanned stack trace via camera.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: SETTINGS */}
        {activeMobileTab === 'settings' && (
          <div className="space-y-2 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <h4 className="font-semibold text-white text-xs">Device Info</h4>
              <p className="text-slate-400 text-[11px]">Device: iQOO 13 Pro 5G</p>
              <p className="text-slate-400 text-[11px]">Connection: WebSocket Active</p>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="h-14 bg-[#090A0F] border-t border-white/[0.06] px-2 flex items-center justify-around z-40 shrink-0">
        <button
          onClick={() => setActiveMobileTab('home')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2.5 rounded-lg transition-all ${
            activeMobileTab === 'home' ? 'text-[#FF6B00] font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px]">Home</span>
        </button>

        <button
          onClick={() => setActiveMobileTab('activity')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2.5 rounded-lg transition-all ${
            activeMobileTab === 'activity' ? 'text-[#FF6B00] font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span className="text-[9px]">Activity</span>
        </button>

        <button
          onClick={() => setActiveMobileTab('repo')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2.5 rounded-lg transition-all ${
            activeMobileTab === 'repo' ? 'text-[#FF6B00] font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span className="text-[9px]">Repo</span>
        </button>

        <button
          onClick={() => setActiveMobileTab('ai')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2.5 rounded-lg transition-all ${
            activeMobileTab === 'ai' ? 'text-[#FF6B00] font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="text-[9px]">AI</span>
        </button>

        <button
          onClick={() => setActiveMobileTab('settings')}
          className={`flex flex-col items-center justify-center space-y-0.5 py-1 px-2.5 rounded-lg transition-all ${
            activeMobileTab === 'settings' ? 'text-[#FF6B00] font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span className="text-[9px]">Settings</span>
        </button>
      </nav>
    </div>
  );
};
