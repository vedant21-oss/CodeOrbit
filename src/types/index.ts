export type NavigationTab = 
  | 'home'
  | 'repository'
  | 'graph'
  | 'debugger'
  | 'prs'
  | 'security'
  | 'tests'
  | 'activity'
  | 'settings';

export type AppViewMode = 'landing' | 'console' | 'mobile-only';

export type AIRuntimeMode = 'phone-local' | 'laptop-connected' | 'server-cloud';

export interface RepositoryInfo {
  id: string;
  name: string;
  owner: string;
  branch: string;
  fileCount: number;
  languages: string[];
  lastCommit: string;
  isIndexed: boolean;
  isDependencyGraphReady: boolean;
  isTestRunnerReady: boolean;
}

export interface CodeFile {
  path: string;
  language: string;
  content: string;
  lineCount: number;
  functions?: string[];
  imports?: string[];
}

export interface DependencyNode {
  id: string;
  name: string;
  type: 'component' | 'service' | 'controller' | 'middleware' | 'database';
  path: string;
  dependencies: string[];
  dependents: string[];
  risk: 'low' | 'medium' | 'high';
}

export interface RootCause {
  filePath: string;
  lineNumber: number;
  summary: string;
  description: string;
  confidence: number; // e.g. 94
  affectedFilesCount: number;
  affectedFiles: string[];
}

export interface FixPatch {
  id: string;
  issueId: string;
  filePath: string;
  originalCode: string;
  fixedCode: string;
  diffSummary: string;
  status: 'draft' | 'applied' | 'verified' | 'rejected';
}

export interface IssueItem {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'bug' | 'security' | 'test' | 'performance';
  filePath: string;
  lineNumber: number;
  rootCause: RootCause;
  patch?: FixPatch;
  status: 'open' | 'fixing' | 'verified';
}

export interface PRFinding {
  id: string;
  type: 'bug' | 'security' | 'test' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  file: string;
  line: number;
  suggestedFix?: string;
}

export interface PullRequestReview {
  id: number;
  title: string;
  author: string;
  branch: string;
  score: number; // 0-100
  bugsCount: number;
  securityCount: number;
  missingTestsCount: number;
  performanceCount: number;
  findings: PRFinding[];
  summary: string;
}

export interface TestResultItem {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  durationMs: number;
  errorMessage?: string;
  filePath: string;
}

export interface TestSuiteResult {
  total: number;
  passed: number;
  failed: number;
  running: number;
  progressPercent: number;
  isCompleted: boolean;
  tests: TestResultItem[];
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'connect' | 'index' | 'scan' | 'root-cause' | 'patch' | 'test' | 'pr' | 'voice';
  title: string;
  description: string;
  status: 'success' | 'warning' | 'info' | 'progress';
}

export interface SyncState {
  isPhoneConnected: boolean;
  phoneDeviceModel: string; // e.g. "iQOO 13 Pro 5G"
  isLaptopConnected: boolean;
  laptopName: string; // e.g. "MacBook Pro M3 Max"
  isGitHubConnected: boolean;
  aiRuntime: AIRuntimeMode;
  lastCommandReceived?: string;
  isDemoMode: boolean;
}

export interface PhoneCommand {
  action: 'SCAN_ERROR' | 'ASK_AI' | 'GENERATE_FIX' | 'RUN_TESTS' | 'REVIEW_PR' | 'VOICE_COMMAND';
  payload?: any;
  timestamp: string;
}
