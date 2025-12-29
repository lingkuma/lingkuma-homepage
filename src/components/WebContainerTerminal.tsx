import { useEffect, useState, useRef } from 'react';
import { Plus, X, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Static terminal simulation data (without cd command, will be added dynamically)
const terminalCommands = [
  { type: 'input', content: 'npm install', delay: 800 },
  { type: 'output', content: 'added 1423 packages in 12s', delay: 2000 },
  { type: 'input', content: 'npm run dev', delay: 2800 },
  { type: 'output', content: '', delay: 3500 },
  { type: 'output', content: 'VITE v6.0.5  ready in 234 ms', delay: 3600 },
  { type: 'output', content: '', delay: 3700 },
  { type: 'output', content: '➜  Local:   http://localhost:5173/', delay: 3800 },
  { type: 'output', content: '➜  Network: http://192.168.1.100:5173/', delay: 3900 },
];

// Generate terminal history with dynamic path
const getTerminalHistory = (workspacePath: string) => [
  { type: 'input', content: `cd ${workspacePath}`, delay: 0 },
  ...terminalCommands,
];

interface WebContainerTerminalProps {
  workspacePath?: string;
  worktreeKey: string;
  hasPlayed: boolean;
  onComplete: () => void;
  initialProgress: number;
  onProgressUpdate: (progress: number) => void;
}

export function WebContainerTerminal({
  workspacePath = '',
  worktreeKey,
  hasPlayed,
  onComplete,
  initialProgress,
  onProgressUpdate
}: WebContainerTerminalProps) {
  const terminalHistory = getTerminalHistory(workspacePath);
  const [visibleLines, setVisibleLines] = useState<typeof terminalHistory>(
    hasPlayed ? terminalHistory : terminalHistory.slice(0, initialProgress)
  );
  const progressRef = useRef(initialProgress);
  const animationStartedRef = useRef(false);

  useEffect(() => {
    const history = getTerminalHistory(workspacePath);

    if (hasPlayed) {
      setVisibleLines(history);
      return;
    }

    // Restore from saved progress
    const startIndex = initialProgress;
    setVisibleLines(history.slice(0, startIndex));
    progressRef.current = startIndex;
    animationStartedRef.current = false;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Only schedule remaining lines
    history.slice(startIndex).forEach((line, index) => {
      const actualIndex = startIndex + index;
      const delay = startIndex === 0 ? line.delay : (index === 0 ? 100 : line.delay - history[startIndex].delay + 100);
      const timer = setTimeout(() => {
        animationStartedRef.current = true;
        progressRef.current = actualIndex + 1;
        setVisibleLines(history.slice(0, actualIndex + 1));
        if (actualIndex === history.length - 1) {
          onComplete();
        }
      }, delay);
      timers.push(timer);
    });

    // Save progress when unmounting (only if animation actually started)
    return () => {
      timers.forEach(clearTimeout);
      if (animationStartedRef.current) {
        onProgressUpdate(progressRef.current);
      }
    };
  }, [worktreeKey, workspacePath, hasPlayed, onComplete, initialProgress, onProgressUpdate]);

  return (
    <div className="h-full w-full flex flex-col bg-[#1a1a2e] text-gray-300">
      {/* Terminal tabs */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-700 bg-[#252536]">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#1a1a2e] rounded text-xs border border-gray-700">
          <TerminalIcon className="w-3 h-3 text-green-400" />
          <span>zsh</span>
          <X className="w-3 h-3 text-gray-500 hover:text-gray-300 cursor-pointer" />
        </div>
        <button className="p-1 rounded hover:bg-gray-700 text-gray-500 hover:text-gray-300">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal content */}
      <div className="flex-1 p-4 font-mono text-xs overflow-auto">
        {visibleLines.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-gray-300' : 'text-gray-500'} mb-1`}>
            {line.type === 'input' && <span className="text-green-400 mr-2">❯</span>}
            {line.content}
          </div>
        ))}
        <div className="flex items-center mt-2">
          <span className="text-green-400 mr-2">❯</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-gray-400"
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="px-3 py-1.5 border-t border-gray-700 bg-[#252536] text-[10px] text-gray-500 flex items-center gap-4">
        <span>{workspacePath}</span>
        <span className="text-green-400">zsh</span>
        <span className="ml-auto">UTF-8</span>
      </div>
    </div>
  );
}
