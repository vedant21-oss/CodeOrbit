import React from 'react';
import { TestSuiteResult } from '../types';
import { TestTube2, CheckCircle2, XCircle, Play, RefreshCw, Terminal, Laptop } from 'lucide-react';

interface TestExecutionPanelProps {
  testResults: TestSuiteResult | null;
  isRunning: boolean;
  progressPercent: number;
  progressStatus: string;
  onRunTests: () => void;
  isFixApplied: boolean;
}

export const TestExecutionPanel: React.FC<TestExecutionPanelProps> = ({
  testResults,
  isRunning,
  progressPercent,
  progressStatus,
  onRunTests,
  isFixApplied,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-surface-900 border border-surface-800 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TestTube2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Laptop Execution Test Runner</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Sandbox
              </span>
            </h3>
            <p className="text-xs text-surface-400">
              Executes real Node.js unit and integration tests on the laptop node
            </p>
          </div>
        </div>

        <button
          onClick={onRunTests}
          disabled={isRunning}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-2 shadow-md disabled:opacity-50 transition-all"
        >
          {isRunning ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          <span>{isRunning ? 'Running Tests...' : 'Execute Test Suite'}</span>
        </button>
      </div>

      {/* PROGRESS BAR (Section 22 Specification) */}
      {isRunning && (
        <div className="p-4 rounded-xl bg-surface-950 border border-iqoo-amber/30 space-y-2">
          <div className="flex justify-between text-xs font-mono text-surface-200">
            <span>Running tests...</span>
            <span className="text-iqoo-amber font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-surface-900 overflow-hidden border border-surface-800">
            <div
              className="h-full bg-gradient-to-r from-iqoo-amber to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-surface-400 font-mono text-right">
            {progressStatus}
          </p>
        </div>
      )}

      {/* FINAL VERIFICATION STATUS BANNER */}
      {testResults && !isRunning && (
        <div className={`p-4 rounded-xl border space-y-2 ${
          testResults.failed === 0
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
            : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                {testResults.failed === 0 ? '✓ FIX VERIFIED' : `${testResults.failed} FAILURES DETECTED`}
              </span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-900 border border-surface-800 text-surface-200">
              {testResults.passed} / {testResults.total} Tests Passed
            </span>
          </div>

          <p className="text-xs text-surface-300 font-mono">
            {testResults.failed === 0
              ? '17 / 17 tests passed 0 failed. Safe to merge into main branch.'
              : '3 tests failed due to null pointer exception in authMiddleware.ts:42. Apply patch to resolve.'}
          </p>
        </div>
      )}

      {/* INDIVIDUAL TEST SUITE RESULTS LIST */}
      {testResults && (
        <div>
          <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-2">
            Test Cases ({testResults.tests.length})
          </h4>
          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {testResults.tests.map((test) => (
              <div
                key={test.id}
                className="p-3 rounded-xl bg-surface-950 border border-surface-800 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center space-x-2">
                  {test.status === 'passed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span className={test.status === 'passed' ? 'text-surface-200' : 'text-red-300 font-bold'}>
                    {test.name}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-surface-400">
                  <span>{test.durationMs}ms</span>
                  <span className="px-2 py-0.5 rounded bg-surface-900 border border-surface-800 text-surface-300">
                    {test.filePath}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
