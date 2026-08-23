import React from 'react';
import { Smartphone, Wifi, Battery, Signal, Zap } from 'lucide-react';

interface IQOOPhoneSimulatorProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const IQOOPhoneSimulator: React.FC<IQOOPhoneSimulatorProps> = ({ children, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 bg-surface-950/60 rounded-3xl border border-surface-800 my-4 shadow-2xl relative">
      {/* Top Simulator Control Bar */}
      <div className="w-full flex items-center justify-between px-4 py-2 mb-3 bg-surface-900 rounded-xl border border-surface-800 text-xs">
        <div className="flex items-center space-x-2 text-iqoo-amber font-semibold">
          <Smartphone className="w-4 h-4" />
          <span>iQOO 13 Pro 5G Command Center</span>
        </div>
        <div className="flex items-center space-x-3 text-surface-400">
          <span className="text-[11px]">Primary Interaction Device</span>
          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-0.5 rounded bg-surface-800 text-surface-200 hover:text-white"
            >
              Close Simulator
            </button>
          )}
        </div>
      </div>

      {/* Outer Phone Bezel */}
      <div className="w-[375px] sm:w-[390px] h-[780px] sm:h-[812px] bg-black rounded-[48px] p-3 shadow-2xl border-[6px] border-surface-800 relative flex flex-col overflow-hidden ring-1 ring-surface-700">
        
        {/* iQOO Sleek Centered Punch-Hole Camera */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-surface-800 flex items-center justify-center shadow-inner">
          <div className="w-2 h-2 rounded-full bg-surface-900 border border-surface-700 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-iqoo-amber/80" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="w-full pt-2.5 px-6 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-surface-200 z-40 bg-surface-950 border-b border-surface-900/50">
          <span className="font-mono tracking-tight">9:41</span>
          <div className="flex items-center space-x-2 text-surface-300">
            <span className="text-[10px] text-iqoo-amber font-bold tracking-wider">5G</span>
            <Signal className="w-3 h-3 text-surface-200" />
            <Wifi className="w-3 h-3 text-surface-200" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Screen Viewport Container */}
        <div className="flex-1 bg-surface-950 text-surface-100 overflow-y-auto rounded-[36px] relative flex flex-col scrollbar-none">
          {children}
        </div>

        {/* Mobile Gesture Bar (Home Line) */}
        <div className="w-full py-1 bg-surface-950 flex justify-center z-40">
          <div className="w-32 h-1 bg-surface-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
