import React from 'react';
import { Smartphone, Laptop, Sparkles, ArrowRight, Zap, Camera, Mic, Play } from 'lucide-react';

interface LandingPageProps {
  onOpenConsole: () => void;
  onOpenMobileFrame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenConsole, onOpenMobileFrame }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-[#EA580C] selection:text-white font-sans">
      
      {/* Sleek Top Navigation */}
      <nav className="h-16 px-6 sm:px-12 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-2xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-[#EA580C] flex items-center justify-center text-white font-bold shadow-2xs">
            <Zap className="w-4 h-4 fill-current text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold text-slate-900 tracking-tight">CodeOrbit</span>
            <span className="text-[10px] font-mono font-semibold text-[#EA580C] px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200">
              iQOO Hackathon
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMobileFrame}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-slate-100 transition-all hidden sm:flex items-center space-x-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Mobile Simulator</span>
          </button>
          <button
            onClick={onOpenConsole}
            className="px-4 py-1.5 rounded-lg bg-[#EA580C] hover:bg-orange-600 text-white text-xs font-semibold shadow-2xs transition-all flex items-center space-x-1.5"
          >
            <span>Open Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center space-y-10 flex-1 flex flex-col justify-center">
        
        {/* Minimalist Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-2xs text-xs text-slate-700 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Phone-first AI Developer Command Center</span>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            CodeOrbit <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-[#EA580C]">
              Your AI command center.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Monitor repos, parse error logs via camera, run remote tests, and review PRs—straight from your phone, synced live with your laptop.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenConsole}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-semibold text-xs shadow-xs flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
          >
            <span>Launch CodeOrbit Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenMobileFrame}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-medium text-xs shadow-2xs transition-all flex items-center justify-center space-x-2"
          >
            <Smartphone className="w-4 h-4 text-[#EA580C]" />
            <span>Try iQOO 13 Pro Simulator</span>
          </button>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EA580C]">
              <Camera className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Camera OCR Error Scan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Snap photos of error logs from any screen to extract stack traces automatically into the AI debugger.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Mic className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Voice Agent Controls</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak natural commands like "Fix build error" or "Review PR" to trigger automated AI workflows.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Remote Test Sandbox</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Execute laptop unit tests remotely from mobile with live step-by-step WebSocket progress streaming.
            </p>
          </div>

        </div>

        {/* SYSTEM ARCHITECTURE FLOW CARD */}
        <div className="pt-6 max-w-3xl mx-auto w-full text-left">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Real-Time Dual Device Architecture
              </span>
              <span className="text-[10px] font-mono text-emerald-600 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>WebSocket Connected (Port 3001)</span>
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2">
              
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <Smartphone className="w-5 h-5 text-[#EA580C] mx-auto" />
                <span className="text-xs font-bold text-slate-900 block">📱 iQOO 13 Pro</span>
                <span className="text-[10px] text-slate-500 block">Mobile UI • Camera • Voice</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-orange-200 text-center space-y-1">
                <Zap className="w-5 h-5 text-[#EA580C] mx-auto" />
                <span className="text-xs font-bold text-slate-900 block">⚡ Sync Engine</span>
                <span className="text-[10px] text-slate-500 block">Bi-directional WebSockets</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <Laptop className="w-5 h-5 text-emerald-600 mx-auto" />
                <span className="text-xs font-bold text-slate-900 block">💻 Laptop Host</span>
                <span className="text-[10px] text-slate-500 block">Git Repo • Test Suite</span>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Clean Footer */}
      <footer className="py-5 border-t border-slate-200 text-center text-xs text-slate-500">
        Built for the iQOO Hackathon — Developer Tools Track. CodeOrbit AI.
      </footer>

    </div>
  );
};
