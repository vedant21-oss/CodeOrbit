import React from 'react';
import { Smartphone, Wifi, Battery, Signal, X } from 'lucide-react';

interface IQOOPhoneSimulatorProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const IQOOPhoneSimulator: React.FC<IQOOPhoneSimulatorProps> = ({ children, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-h-full p-1 relative select-none">
      
      {/* Top Simulator Control Bar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 mb-2 bg-white rounded-lg border border-slate-200 text-xs shadow-2xs">
        <div className="flex items-center space-x-2 text-[#EA580C] font-semibold text-[11px]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>iQOO 13 Pro Simulator</span>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            title="Hide Phone View"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Outer Phone Chassis */}
      <div className="w-[320px] sm:w-[340px] h-[630px] sm:h-[660px] max-h-[calc(100vh-7rem)] bg-slate-900 rounded-[38px] p-2 shadow-xl border-[3px] border-slate-700 relative flex flex-col overflow-hidden ring-1 ring-slate-800">
        
        {/* Punch-Hole Camera */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-50 border border-slate-700 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#EA580C]" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="w-full pt-1.5 px-4 pb-1 flex items-center justify-between text-[10px] font-semibold text-slate-800 z-40 bg-white border-b border-slate-200 shrink-0">
          <span className="font-mono tracking-tight text-[10px]">09:41</span>
          <div className="flex items-center space-x-1 text-slate-600">
            <span className="text-[9px] text-[#EA580C] font-bold font-mono tracking-wider">5G</span>
            <Signal className="w-3 h-3 text-slate-700" />
            <Wifi className="w-3 h-3 text-slate-700" />
            <Battery className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        {/* Screen Viewport Container */}
        <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto rounded-[28px] relative flex flex-col scrollbar-none">
          {children}
        </div>

        {/* Home Gesture Bar */}
        <div className="w-full py-1 bg-[#FAFAFA] flex justify-center z-40 shrink-0">
          <div className="w-24 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
