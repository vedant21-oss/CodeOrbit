import React from 'react';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface IQOOPhoneSimulatorProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const IQOOPhoneSimulator: React.FC<IQOOPhoneSimulatorProps> = ({ children, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-slate-100/70 rounded-2xl border border-slate-200 my-2 shadow-xs relative">
      {/* Top Simulator Control Bar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 mb-2 bg-white rounded-lg border border-slate-200 text-xs shadow-2xs">
        <div className="flex items-center space-x-2 text-[#EA580C] font-semibold text-[11px]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>iQOO 13 Pro 5G Simulator</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-500">
          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 text-[10px] font-medium"
            >
              Hide Phone
            </button>
          )}
        </div>
      </div>

      {/* Outer Phone Chassis */}
      <div className="w-[360px] sm:w-[380px] h-[760px] sm:h-[790px] bg-slate-900 rounded-[44px] p-2.5 shadow-2xl border-[4px] border-slate-700 relative flex flex-col overflow-hidden ring-1 ring-slate-800">
        
        {/* Punch-Hole Camera */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 border border-slate-700 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#EA580C]" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="w-full pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-800 z-40 bg-white border-b border-slate-200">
          <span className="font-mono tracking-tight text-[10px]">09:41</span>
          <div className="flex items-center space-x-1.5 text-slate-600">
            <span className="text-[9px] text-[#EA580C] font-bold font-mono tracking-wider">5G</span>
            <Signal className="w-3 h-3 text-slate-700" />
            <Wifi className="w-3 h-3 text-slate-700" />
            <Battery className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto rounded-[32px] relative flex flex-col scrollbar-none">
          {children}
        </div>

        {/* Home Gesture Bar */}
        <div className="w-full py-1 bg-[#FAFAFA] flex justify-center z-40">
          <div className="w-28 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
