import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  GitPullRequest, 
  Play, 
  MessageSquare, 
  Home, 
  Activity, 
  FolderGit2, 
  Bot, 
  Settings as SettingsIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Mic,
  Shield,
  Zap,
  ChevronRight,
  Terminal
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
      text: 'Good afternoon! CodeOrbit AI is connected to your laptop sandbox. How can I assist your workflow today?',
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
            text: 'I analyzed the build output and identified a likely null pointer exception in `src/middleware/authMiddleware.ts:42`. Confidence: 94%.',
            action: 'VIEW_ROOT_CAUSE'
          }
        ]);
      } else if (query.toLowerCase().includes('security') || query.toLowerCase().includes('secret')) {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: 'Critical Security Vulnerability: Hardcoded production secret key found in `src/config/apiConfig.ts:12`. Recommended fix: convert to `process.env.JWT_SECRET_KEY`.',
            action: 'GENERATE_SECURITY_FIX'
          }
        ]);
      } else {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `CodeOrbit AI inspected codeorbit-demo (248 files). Query "${query}" matched authentication middleware and payment service.`,
          }
        ]);
      }
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-surface-950 text-surface-100 font-sans select-none">
      
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Header Status Bar */}
        <div className="flex items-center justify-between bg-surface-900/80 p-3 rounded-2xl border border-surface-800">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-surface-300">Good afternoon 👋</span>
              <span className="text-xs font-bold text-white">codeorbit-demo</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-surface-400 mt-1">
              <span className="flex items-center space-x-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GitHub Connected</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-iqoo-amber">
                <span className="w-1.5 h-1.5 rounded-full bg-iqoo-amber animate-pulse" />
                <span>Laptop Connected</span>
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-iqoo-amber/15 border border-iqoo-amber/30 flex items-center justify-center text-iqoo-amber font-bold text-xs">
            iQOO
          </div>
        </div>

        {/* Tab 1: HOME */}
        {activeMobileTab === 'home' && (
          <div className="space-y-4">
            
            {/* Primary Action Section */}
            <div>
              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">
                What do you need?
              </p>

              {/* Primary Action Button: ASK CODEORBIT */}
              <button
                onClick={() => setActiveMobileTab('ai')}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-iqoo-amber to-iqoo-orange text-white shadow-iqoo flex items-center justify-between font-bold group text-left transition-all active:scale-[0.98]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-base tracking-tight block">Ask CodeOrbit</span>
                    <span className="text-xs font-normal text-white/80">AI Codebase Reasoning & Assistance</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Grid of Secondary Quick Action Tiles */}
            <div className="grid grid-cols-3 gap-2">
              {/* Scan Error */}
              <button
                onClick={onOpenCamera}
                className="p-3 rounded-2xl bg-surface-900 border border-surface-800 hover:border-iqoo-amber/40 flex flex-col items-center justify-center space-y-2 text-center transition-all active:scale-95 group"
              >
                <div className="w-9 h-9 rounded-xl bg-iqoo-amber/10 border border-iqoo-amber/20 flex items-center justify-center text-iqoo-amber group-hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-surface-200">Scan Error</span>
              </button>

              {/* Review PR */}
              <button
                onClick={() => onSelectTab('prs')}
                className="p-3 rounded-2xl bg-surface-900 border border-surface-800 hover:border-iqoo-amber/40 flex flex-col items-center justify-center space-y-2 text-center transition-all active:scale-95 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-surface-200">Review PR</span>
              </button>

              {/* Run Tests */}
              <button
                onClick={onRunTests}
                className="p-3 rounded-2xl bg-surface-900 border border-surface-800 hover:border-iqoo-amber/40 flex flex-col items-center justify-center space-y-2 text-center transition-all active:scale-95 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-surface-200">Run Tests</span>
              </button>
            </div>

            {/* Voice Command Button */}
            <button
              onClick={onOpenVoice}
              className="w-full py-2.5 px-4 rounded-xl bg-surface-900 border border-surface-800 flex items-center justify-between text-xs text-surface-300 hover:text-white hover:border-iqoo-amber/40 transition-all"
            >
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-iqoo-amber animate-pulse" />
                <span>Voice Command: "Why did my build fail?"</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-iqoo-amber/20 text-iqoo-amber">
                iQOO Voice
              </span>
            </button>

            {/* HERO WORKFLOW STATE CARD */}
            <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-surface-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>CURRENT REPOSITORY DIAGNOSTIC</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  {isFixApplied ? '✓ Fix Applied' : 'Issue Detected'}
                </span>
              </div>

              <div>
                <p className="text-xs font-mono text-surface-300">
                  authMiddleware.ts:42
                </p>
                <p className="text-xs text-surface-400 mt-1">
                  {issue.rootCause.summary}
                </p>
              </div>

              {/* Confidence Gauge */}
              <div className="flex items-center justify-between text-xs bg-surface-950 p-2.5 rounded-xl border border-surface-800">
                <span className="text-surface-400">AI Confidence:</span>
                <span className="text-emerald-400 font-bold">94% High Confidence</span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onSelectTab('debugger')}
                  className="py-2 px-3 rounded-xl bg-surface-800 text-surface-200 hover:text-white text-xs font-semibold text-center"
                >
                  View Root Cause
                </button>
                <button
                  onClick={onGenerateFix}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all ${
                    isFixApplied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-iqoo-amber text-white shadow-iqoo'
                  }`}
                >
                  {isFixApplied ? '✓ Fix Applied' : 'Generate Fix'}
                </button>
              </div>
            </div>

            {/* TEST VERIFICATION STATUS CARD */}
            {testResults && (
              <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-surface-200">TEST RUNNER STATUS</span>
                  <span className={testResults.failed === 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {testResults.failed === 0 ? '✓ FIX VERIFIED' : '3 FAILURES'}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-surface-950 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      testResults.failed === 0 ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${(testResults.passed / testResults.total) * 100}%` }}
                  />
                </div>

                <p className="text-xs text-surface-300 font-mono">
                  {testResults.passed} / {testResults.total} tests passed (0 failed). Safe to merge.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI ASSISTANT CHAT */}
        {activeMobileTab === 'ai' && (
          <div className="h-[480px] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-surface-800">
              <div className="flex items-center space-x-2 text-xs font-bold text-surface-200">
                <Bot className="w-4 h-4 text-iqoo-amber" />
                <span>CodeOrbit AI Assistant</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-iqoo-amber/20 text-iqoo-amber">
                iQOO Agent
              </span>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-iqoo-amber text-white rounded-br-none'
                        : 'bg-surface-900 border border-surface-800 text-surface-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.action === 'VIEW_ROOT_CAUSE' && (
                      <button
                        onClick={() => onSelectTab('debugger')}
                        className="mt-2 text-[11px] font-bold text-iqoo-amber underline block"
                      >
                        View authMiddleware.ts:42 Root Cause →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="flex items-center space-x-2 pt-2 border-t border-surface-800">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask about authentication, payment flow, or build errors..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-900 border border-surface-800 text-xs text-white placeholder-surface-500 focus:outline-none focus:border-iqoo-amber"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-iqoo-amber text-white font-bold hover:bg-iqoo-orange"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: PR REVIEW SUMMARY */}
        {activeMobileTab === 'repo' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">PR #142 Review</span>
                  <span className="text-[11px] text-surface-400">feat(auth): refactor JWT verification</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-400 block">Score: {prReview.score}/100</span>
                  <span className="text-[10px] text-surface-400">CodeOrbit AI</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-surface-950 border border-surface-800 text-amber-400 font-semibold">
                  🐛 {prReview.bugsCount} Bugs Found
                </div>
                <div className="p-2.5 rounded-xl bg-surface-950 border border-surface-800 text-red-400 font-semibold">
                  🔐 {prReview.securityCount} Critical Flaw
                </div>
                <div className="p-2.5 rounded-xl bg-surface-950 border border-surface-800 text-blue-400 font-semibold">
                  🧪 {prReview.missingTestsCount} Missing Tests
                </div>
                <div className="p-2.5 rounded-xl bg-surface-950 border border-surface-800 text-surface-300 font-semibold">
                  ⚡ {prReview.performanceCount} Perf Issue
                </div>
              </div>

              <button
                onClick={() => onSelectTab('prs')}
                className="w-full py-2 rounded-xl bg-surface-800 text-surface-200 text-xs font-semibold text-center hover:text-white"
              >
                View Full PR Findings on Desktop Console →
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: ACTIVITY FEED */}
        {activeMobileTab === 'activity' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-surface-200 text-xs uppercase tracking-wider">
              Live iQOO Sync Activity
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-surface-900 border border-surface-800">
                <span className="text-emerald-400 font-bold block">✓ Fix Verified</span>
                <span className="text-surface-400 text-[11px]">17 / 17 unit tests passed on laptop execution runner.</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-900 border border-surface-800">
                <span className="text-iqoo-amber font-bold block">📱 Phone Command Received</span>
                <span className="text-surface-400 text-[11px]">Action: SCAN_ERROR via iQOO Vision Camera</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-900 border border-surface-800">
                <span className="text-blue-400 font-bold block">🤖 Root Cause Identified</span>
                <span className="text-surface-400 text-[11px]">authMiddleware.ts:42 (94% confidence)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: SETTINGS */}
        {activeMobileTab === 'settings' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-surface-900 border border-surface-800 space-y-2">
              <h4 className="font-bold text-white">Device Settings</h4>
              <p className="text-surface-400 text-[11px]">Device: iQOO 13 Pro 5G</p>
              <p className="text-surface-400 text-[11px]">Execution Node: Laptop Connected</p>
              <p className="text-surface-400 text-[11px]">Model: Gemini / Local Hybrid AI</p>
            </div>
          </div>
        )}

      </div>

      {/* MOBILE BOTTOM NAVIGATION (Section 11) */}
      <nav className="h-16 bg-surface-900 border-t border-surface-800 px-3 flex items-center justify-around z-40 shrink-0">
        
        {/* 1. Home */}
        <button
          onClick={() => setActiveMobileTab('home')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-3 rounded-xl transition-all ${
            activeMobileTab === 'home' ? 'text-iqoo-amber font-bold' : 'text-surface-400 hover:text-surface-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* 2. Activity */}
        <button
          onClick={() => setActiveMobileTab('activity')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-3 rounded-xl transition-all ${
            activeMobileTab === 'activity' ? 'text-iqoo-amber font-bold' : 'text-surface-400 hover:text-surface-200'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px]">Activity</span>
        </button>

        {/* 3. Repository */}
        <button
          onClick={() => setActiveMobileTab('repo')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-3 rounded-xl transition-all ${
            activeMobileTab === 'repo' ? 'text-iqoo-amber font-bold' : 'text-surface-400 hover:text-surface-200'
          }`}
        >
          <FolderGit2 className="w-5 h-5" />
          <span className="text-[10px]">Repository</span>
        </button>

        {/* 4. AI Assistant */}
        <button
          onClick={() => setActiveMobileTab('ai')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-3 rounded-xl transition-all ${
            activeMobileTab === 'ai' ? 'text-iqoo-amber font-bold' : 'text-surface-400 hover:text-surface-200'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span className="text-[10px]">AI</span>
        </button>

        {/* 5. Settings */}
        <button
          onClick={() => setActiveMobileTab('settings')}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-3 rounded-xl transition-all ${
            activeMobileTab === 'settings' ? 'text-iqoo-amber font-bold' : 'text-surface-400 hover:text-surface-200'
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-[10px]">Settings</span>
        </button>

      </nav>
    </div>
  );
};
