import React, { useState, useEffect } from 'react';
import { 
  AppViewMode, 
  NavigationTab, 
  SyncState, 
  IssueItem, 
  TestSuiteResult, 
  ActivityItem, 
  AIRuntimeMode 
} from './types';
import { SyncService } from './services/syncService';
import { AIOrchestrator } from './services/aiOrchestrator';

// UI Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { IQOOPhoneSimulator } from './components/IQOOPhoneSimulator';
import { MobileView } from './components/MobileView';
import { CameraScannerModal } from './components/CameraScannerModal';
import { VoiceAgentModal } from './components/VoiceAgentModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';

// Desktop Console Tab Views
import { DashboardView } from './components/DashboardView';
import { RepositoryView } from './components/RepositoryView';
import { AIDebuggerView } from './components/AIDebuggerView';
import { FixDiffViewer } from './components/FixDiffViewer';
import { TestExecutionPanel } from './components/TestExecutionPanel';
import { CodebaseGraphView } from './components/CodebaseGraphView';
import { PRReviewerCard } from './components/PRReviewerCard';
import { SecurityAgentView } from './components/SecurityAgentView';
import { ActivityTimeline } from './components/ActivityTimeline';
import { SettingsView } from './components/SettingsView';

export function App() {
  const syncService = SyncService.getInstance();

  const [viewMode, setViewMode] = useState<AppViewMode>('console');
  const [activeTab, setActiveTab] = useState<NavigationTab>('debugger');
  const [showPhoneFrame, setShowPhoneFrame] = useState<boolean>(true); // Default show phone simulator frame for hackathon demo!

  const [syncState, setSyncState] = useState<SyncState>(syncService.getSyncState());
  const [activityLog, setActivityLog] = useState<ActivityItem[]>(syncService.getActivityLog());

  const [issue, setIssue] = useState<IssueItem>(AIOrchestrator.getDemoIssue());
  const [prReview, setPrReview] = useState(AIOrchestrator.getDemoPR());
  const [nodes] = useState(AIOrchestrator.getDependencyGraph());
  const [repo] = useState(AIOrchestrator.getDemoRepository());

  const [isFixApplied, setIsFixApplied] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<TestSuiteResult | null>(null);

  // Test Runner Execution state
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [testProgressPercent, setTestProgressPercent] = useState<number>(0);
  const [testProgressStatus, setTestProgressStatus] = useState<string>('');

  // Modals
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    const removeListener = syncService.addListener((event, data) => {
      if (event === 'STATE_CHANGE') setSyncState(data);
      if (event === 'ACTIVITY_UPDATED') setActivityLog(data);
      if (event === 'PATCH_APPLIED') setIsFixApplied(true);
      if (event === 'TEST_COMPLETED') setTestResults(data);
    });
    return () => {
      removeListener();
    };
  }, []);

  // Action Triggers
  const handleGenerateFix = async () => {
    const patch = await syncService.generateFix();
    setIsFixApplied(true);
  };

  const handleRunTests = async () => {
    setIsTestRunning(true);
    setTestProgressPercent(15);
    setTestProgressStatus('Running 17 unit tests on laptop execution sandbox...');

    const res = await syncService.runTestExecution((pct, text) => {
      setTestProgressPercent(pct);
      setTestProgressStatus(text);
    });

    setTestResults(res);
    setIsTestRunning(false);
  };

  const handleCameraScanComplete = async (ocrText: string) => {
    const foundIssue = await syncService.scanErrorFromCamera(ocrText);
    setIssue(foundIssue);
    setActiveTab('debugger');
  };

  const handleVoiceCommandSelect = (cmd: string) => {
    if (cmd.toLowerCase().includes('fix')) {
      handleGenerateFix();
    } else if (cmd.toLowerCase().includes('test')) {
      handleRunTests();
    } else if (cmd.toLowerCase().includes('pr')) {
      setActiveTab('prs');
    } else if (cmd.toLowerCase().includes('security')) {
      setActiveTab('security');
    } else {
      setActiveTab('debugger');
    }
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onOpenConsole={() => { setViewMode('console'); setShowPhoneFrame(false); }}
        onOpenMobileFrame={() => { setViewMode('console'); setShowPhoneFrame(true); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#EA580C] selection:text-white">
      
      {/* Header Bar */}
      <Header
        syncState={syncState}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showPhoneFrame={showPhoneFrame}
        setShowPhoneFrame={setShowPhoneFrame}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Desktop Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Dual View Layout: Desktop Console Content + Optional iQOO Phone Frame Simulator */}
          <div className={`grid grid-cols-1 ${showPhoneFrame ? 'xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            
            {/* Desktop Console View Area */}
            <div className={showPhoneFrame ? 'xl:col-span-2 space-y-6' : 'space-y-6'}>
              
              {activeTab === 'home' && (
                <DashboardView
                  repo={repo}
                  issue={issue}
                  testResults={testResults}
                  prReview={prReview}
                  activityLog={activityLog}
                  syncState={syncState}
                  isFixApplied={isFixApplied}
                  onNavigateTab={setActiveTab}
                  onGenerateFix={handleGenerateFix}
                  onRunTests={handleRunTests}
                  onOpenCamera={() => setIsCameraOpen(true)}
                />
              )}

              {activeTab === 'repository' && (
                <RepositoryView
                  repo={repo}
                  issue={issue}
                  onNavigateTab={setActiveTab}
                  onGenerateFix={handleGenerateFix}
                />
              )}

              {activeTab === 'debugger' && (
                <div className="space-y-6">
                  <AIDebuggerView
                    issue={issue}
                    syncState={syncState}
                    isFixApplied={isFixApplied}
                    onGenerateFix={handleGenerateFix}
                    onRunTests={handleRunTests}
                  />

                  {/* Git Patch Diff Viewer */}
                  {issue.patch && (
                    <FixDiffViewer
                      patch={issue.patch}
                      isFixApplied={isFixApplied}
                      onApplyFix={handleGenerateFix}
                      onRunTests={handleRunTests}
                    />
                  )}

                  {/* Test Execution Panel */}
                  <TestExecutionPanel
                    testResults={testResults}
                    isRunning={isTestRunning}
                    progressPercent={testProgressPercent}
                    progressStatus={testProgressStatus}
                    onRunTests={handleRunTests}
                    isFixApplied={isFixApplied}
                  />
                </div>
              )}

              {activeTab === 'graph' && (
                <CodebaseGraphView nodes={nodes} />
              )}

              {activeTab === 'prs' && (
                <PRReviewerCard
                  pr={prReview}
                  onGenerateFix={handleGenerateFix}
                  onOpenVoice={() => setIsVoiceOpen(true)}
                />
              )}

              {activeTab === 'security' && (
                <SecurityAgentView
                  onGenerateFix={handleGenerateFix}
                  isFixApplied={isFixApplied}
                />
              )}

              {activeTab === 'tests' && (
                <TestExecutionPanel
                  testResults={testResults}
                  isRunning={isTestRunning}
                  progressPercent={testProgressPercent}
                  progressStatus={testProgressStatus}
                  onRunTests={handleRunTests}
                  isFixApplied={isFixApplied}
                />
              )}

              {activeTab === 'activity' && (
                <ActivityTimeline activities={activityLog} />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  syncState={syncState}
                  onToggleDemoMode={() => setSyncState(prev => ({ ...prev, isDemoMode: !prev.isDemoMode }))}
                  onChangeRuntime={(rt) => setSyncState(prev => ({ ...prev, aiRuntime: rt }))}
                />
              )}

            </div>

            {/* Right Column: iQOO Phone Frame Simulator (Visible when showPhoneFrame is true) */}
            {showPhoneFrame && (
              <div className="xl:col-span-1 flex flex-col items-center sticky top-4 self-start">
                <IQOOPhoneSimulator onClose={() => setShowPhoneFrame(false)}>
                  <MobileView
                    syncState={syncState}
                    onOpenCamera={() => setIsCameraOpen(true)}
                    onOpenVoice={() => setIsVoiceOpen(true)}
                    onRunTests={handleRunTests}
                    onGenerateFix={handleGenerateFix}
                    issue={issue}
                    testResults={testResults}
                    prReview={prReview}
                    isFixApplied={isFixApplied}
                    onSelectTab={(tab) => setActiveTab(tab)}
                  />
                </IQOOPhoneSimulator>
              </div>
            )}

          </div>

        </main>
      </div>

      {/* Modals */}
      <CameraScannerModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onScanComplete={handleCameraScanComplete}
      />

      <VoiceAgentModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onSelectCommand={handleVoiceCommandSelect}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
        onGenerateFix={handleGenerateFix}
        onRunTests={handleRunTests}
        onOpenCamera={() => setIsCameraOpen(true)}
        onOpenVoice={() => setIsVoiceOpen(true)}
      />

    </div>
  );
}
