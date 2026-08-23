import React from 'react';
import { ActivityItem } from '../types';
import { Activity, CheckCircle2, Clock, Smartphone, Laptop } from 'lucide-react';

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 p-5 rounded-2xl bg-surface-900 border border-surface-800">
        <div className="w-10 h-10 rounded-xl bg-iqoo-amber/20 flex items-center justify-center text-iqoo-amber">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Real-Time Activity Timeline</h2>
          <p className="text-xs text-surface-400">Live event stream between iQOO phone and laptop execution node</p>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-surface-900 border border-surface-800 flex items-start justify-between text-xs font-mono"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-iqoo-amber font-bold">{item.title}</span>
                <span className="text-[10px] text-surface-500 font-sans">{item.timestamp}</span>
              </div>
              <p className="text-surface-300 font-sans leading-relaxed">{item.description}</p>
            </div>

            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
};
