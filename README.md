# CodeOrbit 🚀

> **Phone-first AI developer command center built for the iQOO Hackathon.**  
> Monitor codebases, debug error logs from photos, run remote tests, and review PRs—straight from your phone while synced live with your laptop.

---

## 💡 Why CodeOrbit?

When code breaks on staging or tests fail after hours, you shouldn't have to pull out your laptop and connect to VPN just to inspect stack traces or trigger test runs.

**CodeOrbit** bridges your phone and laptop in real time via WebSockets. It turns your mobile device into a remote command center where you can:
- **Scan errors on screens using your camera** to auto-parse stack traces.
- **Trigger AI root-cause analysis** and inspect side-by-side Git diff patches.
- **Run unit tests remotely** on your laptop sandbox and stream live progress.
- **Perform voice-assisted PR reviews** and security scans on the move.

Includes a built-in **iQOO 13 Pro 5G simulator** directly inside the web app so you can test the full dual-device experience from a single browser tab.

---

## ⚡ Core Features

- 📱 **iQOO Mobile Simulator**: Interactive phone frame with touch controls simulating the native Android app experience.
- 📸 **Camera Error OCR**: Snap a quick picture of error logs from any monitor to extract stack traces into the AI debugger.
- 🎙️ **Voice Command Agent**: Speak commands like *"Fix payment bug"*, *"Run unit tests"*, or *"Review PR"* to trigger actions instantly.
- 🧠 **AI Debugger & Git Diff Viewer**: Get root cause analyses with side-by-side visual diffs before applying patches to your code.
- 🧪 **Live Remote Test Sandbox**: Trigger laptop test suites from mobile with real-time WebSocket progress updates.
- 🛡️ **Security Auditor**: OWASP risk scanning for vulnerability detection and automated patch suggestions.
- 📊 **Interactive Codebase Graph**: Visual node graph of system modules, dependencies, and API relationships.

---

## 🛠️ How It Works

```
┌────────────────────────────────┐         WebSocket (Port 3001)        ┌────────────────────────────────┐
│      📱 iQOO Mobile App        │ ◄──────────────────────────────────► │     💻 Laptop Execution Host   │
│  (Camera OCR, Voice, Touch UI) │                                      │  (Vite + Express + AI Engine)  │
└────────────────────────────────┘                                      └────────────────────────────────┘
```

1. **Mobile UI** captures user inputs (voice commands, camera error scans, or touch actions).
2. **WebSocket Sync Server (`server/server.ts`)** broadcasts real-time events between mobile and desktop views.
3. **AI Orchestrator (`src/services/aiOrchestrator.ts`)** analyzes the codebase context, generates Git patches, and runs test suites in your laptop sandbox.

---

## 💻 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend & Sync**: Node.js, Express, WebSockets (`ws`), `tsx`
- **UI Components & Icons**: Lucide React, Tailwind CSS

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/vedant21-oss/CodeOrbit.git
cd CodeOrbit/CodeOrbit
npm install
```

### 2. Run the App
Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Run the Live Sync Server (Optional for WebSockets)
To enable dual-device WebSocket streaming, start the server in a second terminal window:
```bash
npm run server
```
The server listens on `http://localhost:3001`.

---

## 🎯 Demo Walkthrough Guide

1. Launch `http://localhost:5173`.
2. Ensure the **📱 Mobile Simulator** toggle is enabled in the top navigation bar.
3. Click **"Scan Error"** (Camera Scanner modal) or **"Voice Agent"** on the mobile simulator.
4. Click **"Generate Fix"** to view the generated Git patch diff.
5. Click **"Run Tests"** to watch the test suite execute live on the simulated laptop runner.
6. Open the **Activity Log** tab to see real-time WebSocket event logs streaming between devices.

---

## 📁 Repository Structure

```
CodeOrbit/
├── server/
│   └── server.ts           # Real-time WebSocket & REST sync server
├── src/
│   ├── components/         # Mobile Simulator & Desktop Console UI components
│   ├── demo-repo/          # Mock payment service & test runner
│   ├── services/           # AI orchestrator & sync service engine
│   ├── types/              # TypeScript interface definitions
│   ├── App.tsx             # Main dashboard layout
│   └── main.tsx            # React app entry point
└── package.json
```

---

<p align="center">
  Built for the <b>iQOO Hackathon — Developer Tools Track</b>
</p>
