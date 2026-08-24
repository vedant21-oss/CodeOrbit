import React from 'react';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface IQOOPhoneSimulatorProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const IQOOPhoneSimulator: React.FC<IQOOPhoneSimulatorProps> = ({ children, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white/[0.01] rounded-2xl border border-white/[0.06] my-2 shadow-2xl relative">
      {/* Top Simulator Control Bar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 mb-2 bg-[#0C0D14] rounded-lg border border-white/[0.06] text-xs">
        <div className="flex items-center space-x-2 text-[#FF6B00] font-semibold text-[11px]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>iQOO 13 Pro 5G Simulator</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 hover:text-white text-[10px]"
            >
              Hide Phone
            </button>
          )}
        </div>
      </div>

      {/* Outer Phone Bezel */}
      <div className="w-[360px] sm:w-[380px] h-[760px] sm:h-[790px] bg-[#05060A] rounded-[44px] p-2.5 shadow-2xl border-[4px] border-[#1C1E2A] relative flex flex-col overflow-hidden ring-1 ring-white/[0.1]">
        
        {/* Punch-Hole Camera */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 border border-white/10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#111218] border border-white/20 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#FF6B00]" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="w-full pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-medium text-slate-300 z-40 bg-[#090A0F] border-b border-white/[0.04]">
          <span className="font-mono tracking-tight text-[10px]">09:41</span>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <span className="text-[9px] text-[#FF6B00] font-bold font-mono tracking-wider">5G</span>
            <Signal className="w-3 h-3 text-slate-300" />
            <Wifi className="w-3 h-3 text-slate-300" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Screen Viewport Container */}
        <div className="flex-1 bg-[#07080D] text-slate-100 overflow-y-auto rounded-[32px] relative flex flex-col scrollbar-none">
          {children}
        </div>

        {/* Home Gesture Bar */}
        <div className="w-full py-1 bg-[#07080D] flex justify-center z-40">
          <div className="w-28 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
