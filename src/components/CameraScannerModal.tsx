import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, CheckCircle2, AlertTriangle, Scan, Sparkles } from 'lucide-react';

interface CameraScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (ocrText: string) => void;
}

export const CameraScannerModal: React.FC<CameraScannerModalProps> = ({
  isOpen,
  onClose,
  onScanComplete,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hackathonDemoError = `TypeError: Cannot read properties of undefined (reading 'replace')
    at AuthenticationMiddleware.validateRequestBroken (authMiddleware.ts:42:24)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)
    at next (express/lib/router/route.js:144:13)
    at Route.dispatch (express/lib/router/route.js:114:3)`;

  const handleTriggerDemoScan = () => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(hackathonDemoError);
    }, 1500);
  };

  const handleConfirmScan = () => {
    onScanComplete(scannedResult || hackathonDemoError);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-900 rounded-3xl border border-surface-800 p-5 space-y-4 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-iqoo-amber/20 flex items-center justify-center text-iqoo-amber">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">iQOO Vision OCR Scanner</h3>
              <p className="text-[11px] text-surface-400">Point phone camera at error output on screen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="w-full h-64 bg-surface-950 rounded-2xl border border-surface-800 relative overflow-hidden flex flex-col items-center justify-center">
          
          {/* Simulated Screen & OCR Frame */}
          <div className="absolute inset-4 border-2 border-dashed border-iqoo-amber/60 rounded-xl pointer-events-none flex flex-col justify-between p-2">
            <div className="flex justify-between text-[10px] text-iqoo-amber font-mono">
              <span>[ OCR ACTIVE ]</span>
              <span>iQOO Vision v3</span>
            </div>
            <div className="flex justify-between text-[10px] text-iqoo-amber font-mono">
              <span>94% CONFIDENCE</span>
              <span>AUTO-FOCUS</span>
            </div>
          </div>

          {/* Scanning Animation line */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-iqoo-amber to-transparent animate-bounce z-20" />
          )}

          {!scannedResult && !isScanning && (
            <div className="text-center p-6 space-y-3">
              <Scan className="w-12 h-12 text-iqoo-amber mx-auto animate-pulse" />
              <p className="text-xs text-surface-300">
                Ready to scan terminal tracebacks or error codes on laptop screen.
              </p>
            </div>
          )}

          {isScanning && (
            <div className="text-center space-y-2 z-10">
              <RefreshCw className="w-8 h-8 text-iqoo-amber animate-spin mx-auto" />
              <p className="text-xs text-iqoo-amber font-medium">Extracting Error Traceback with iQOO Vision OCR...</p>
            </div>
          )}

          {scannedResult && !isScanning && (
            <div className="p-4 bg-surface-900/90 rounded-xl border border-surface-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48 z-10 text-left w-full">
              <span className="text-[10px] font-semibold text-iqoo-amber block mb-1">
                ✓ OCR EXTRACTION COMPLETE (Demo Mode):
              </span>
              <pre className="whitespace-pre-wrap">{scannedResult}</pre>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="space-y-2">
          {!scannedResult ? (
            <button
              onClick={handleTriggerDemoScan}
              disabled={isScanning}
              className="w-full py-3 rounded-2xl bg-iqoo-amber text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-iqoo hover:bg-iqoo-orange transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isScanning ? 'Scanning...' : 'Trigger iQOO Camera OCR Scan'}</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleTriggerDemoScan}
                className="flex-1 py-2.5 rounded-xl bg-surface-800 text-surface-200 text-xs font-semibold hover:text-white"
              >
                Rescan
              </button>
              <button
                onClick={handleConfirmScan}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md hover:bg-emerald-600"
              >
                Analyze Root Cause →
              </button>
            </div>
          )}
        </div>

        <p className="text-[10px] text-surface-500 text-center">
          Demo Scan Mode configured for deterministic hackathon demonstration.
        </p>

      </div>
    </div>
  );
};
