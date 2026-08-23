import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import { DemoTestRunner } from '../src/demo-repo/demoRunner';
import { AIOrchestrator } from '../src/services/aiOrchestrator';

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const wss = new WebSocketServer({ server });

let isFixAppliedState = false;

// Broadcast to all connected clients (iQOO Mobile & Desktop Console)
function broadcast(event: string, data: any) {
  const payload = JSON.stringify({ event, data, timestamp: new Date().toISOString() });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// REST API Endpoints
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    device: 'Laptop Execution Environment',
    iqooConnected: true,
    phoneModel: 'iQOO 13 Pro 5G',
    githubConnected: true,
    repository: AIOrchestrator.getDemoRepository(),
    isFixApplied: isFixAppliedState
  });
});

app.post('/api/scan-error', (req, res) => {
  const issue = AIOrchestrator.getDemoIssue();
  broadcast('PHONE_COMMAND_RECEIVED', { action: 'SCAN_ERROR', source: 'iQOO Vision OCR Camera' });
  broadcast('AI_ANALYSIS_STARTED', { target: issue.filePath });
  
  setTimeout(() => {
    broadcast('ROOT_CAUSE_IDENTIFIED', { rootCause: issue.rootCause });
  }, 1000);

  res.json({ success: true, issue });
});

app.post('/api/generate-fix', (req, res) => {
  const issue = AIOrchestrator.getDemoIssue();
  broadcast('PHONE_COMMAND_RECEIVED', { action: 'GENERATE_FIX' });
  
  setTimeout(() => {
    isFixAppliedState = true;
    broadcast('PATCH_APPLIED', { patch: issue.patch, status: 'applied' });
  }, 1200);

  res.json({ success: true, patch: issue.patch });
});

app.post('/api/run-tests', (req, res) => {
  broadcast('PHONE_COMMAND_RECEIVED', { action: 'RUN_TESTS' });
  broadcast('TEST_EXECUTION_PROGRESS', { progressPercent: 20, status: 'Running 17 tests...' });

  setTimeout(() => {
    broadcast('TEST_EXECUTION_PROGRESS', { progressPercent: 60, status: 'Running auth.test.ts...' });
  }, 800);

  setTimeout(() => {
    broadcast('TEST_EXECUTION_PROGRESS', { progressPercent: 85, status: 'Running payment.test.ts...' });
  }, 1400);

  setTimeout(() => {
    const results = DemoTestRunner.runTests(isFixAppliedState);
    broadcast('VERIFICATION_RESULT', { results });
    res.json({ success: true, results });
  }, 2000);
});

// WebSocket Connection logic
wss.on('connection', (ws) => {
  console.log('📱 Client connected to CodeOrbit Laptop Execution Sync Engine');
  ws.send(JSON.stringify({
    event: 'SYNC_INIT',
    data: {
      phoneConnected: true,
      laptopConnected: true,
      repository: 'codeorbit-demo',
      isFixApplied: isFixAppliedState
    }
  }));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message.toString());
      console.log('Received command over WebSocket:', parsed);
      broadcast('EVENT_RECEIVED', parsed);
    } catch (err) {
      console.error('Invalid WS message', err);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 CodeOrbit Laptop Execution Server running on http://localhost:${PORT}`);
});
