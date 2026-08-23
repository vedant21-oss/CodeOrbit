import React from 'react';
import { Smartphone, Laptop, GitBranch, Sparkles, ArrowRight, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AppViewMode } from '../types';

interface LandingPageProps {
  onOpenConsole: () => void;
  onOpenMobileFrame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenConsole, onOpenMobileFrame }) => {
  return (
    <div className="min-h-screen bg-surface-950 text-surface-100 flex flex-col justify-between selection:bg-iqoo-amber selection:text-white">
      
      {/* Top Brand Nav */}
      <nav className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-surface-900 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-iqoo-amber to-iqoo-orange flex items-center justify-center text-white shadow-iqoo font-bold">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-tight">CodeOrbit AI</span>
            <span className="text-[10px] uppercase font-bold text-iqoo-amber ml-2 px-2 py-0.5 rounded bg-iqoo-amber/10 border border-iqoo-amber/30">
              iQOO Hackathon
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenMobileFrame}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-iqoo-amber border border-iqoo-amber/30 hover:bg-iqoo-amber/10 transition-all hidden sm:block"
          >
            📱 Mobile Simulator
          </button>
          <button
            onClick={onOpenConsole}
            className="px-5 py-2.5 rounded-xl bg-iqoo-amber hover:bg-iqoo-orange text-white text-xs font-bold shadow-iqoo transition-all"
          >
            Open CodeOrbit →
          </button>
        </div>
      </nav>

      {/* HERO SECTION (Section 8 Specification) */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center space-y-8 flex-1 flex flex-col justify-center">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-surface-900 border border-surface-800 text-xs font-semibold text-surface-300 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-iqoo-amber" />
          <span>Phone-first AI Developer Command Center</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            CodeOrbit <br />
            <span className="iqoo-gradient-text">Your AI development command center.</span>
          </h1>
          <p className="text-lg sm:text-xl text-surface-400 font-normal max-w-2xl mx-auto leading-relaxed">
            Understand code. Debug faster. Review smarter. Fix with confidence.
          </p>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenConsole}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-iqoo-amber hover:bg-iqoo-orange text-white font-bold text-sm shadow-iqoo flex items-center justify-center space-x-3 transition-all hover:scale-105"
          >
            <span>Open CodeOrbit</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenMobileFrame}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-surface-900 border border-surface-800 hover:border-iqoo-amber/40 text-surface-200 hover:text-white font-semibold text-sm transition-all"
          >
            Connect iQOO Phone
          </button>
        </div>

        {/* ARCHITECTURAL FLOW DIAGRAM (Section 8 Spec) */}
        <div className="pt-12 max-w-3xl mx-auto w-full">
          <div className="p-6 rounded-3xl bg-surface-900/80 border border-surface-800 space-y-4 shadow-2xl backdrop-blur-md">
            <p className="text-xs font-bold text-surface-400 uppercase tracking-wider">
              System Architecture Flow
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
              
              {/* Node 1: iQOO Phone */}
              <div className="flex-1 p-4 rounded-2xl bg-surface-950 border border-iqoo-amber/30 text-center space-y-1">
                <Smartphone className="w-6 h-6 text-iqoo-amber mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">📱 iQOO PHONE</span>
                <span className="text-[10px] text-surface-400 block">Camera • Voice • Touch</span>
              </div>

              <div className="text-iqoo-amber font-bold text-sm">→</div>

              {/* Node 2: CodeOrbit AI */}
              <div className="flex-1 p-4 rounded-2xl bg-surface-950 border border-iqoo-amber/40 text-center space-y-1">
                <Zap className="w-6 h-6 text-iqoo-amber mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">🤖 CODEORBIT AI</span>
                <span className="text-[10px] text-surface-400 block">Reasoning Orchestrator</span>
              </div>

              <div className="text-iqoo-amber font-bold text-sm">→</div>

              {/* Node 3: Laptop */}
              <div className="flex-1 p-4 rounded-2xl bg-surface-950 border border-surface-800 text-center space-y-1">
                <Laptop className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">💻 LAPTOP RUNNER</span>
                <span className="text-[10px] text-surface-400 block">GitHub • Sandbox Tests</span>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-surface-900 text-center text-xs text-surface-500">
        Built for the iQOO Hackathon — Developer Tools Track. CodeOrbit AI.
      </footer>

    </div>
  );
};
