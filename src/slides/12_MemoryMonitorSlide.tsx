import { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { SlideLayout, useSlideStep } from '../components/Presentation';
import { Brain, Skull, ArrowDownToLine, FileStack, FileText, Plug, FolderOpen, Database } from 'lucide-react';

const TOTAL_STEPS = 3;

const threats = [
  { icon: Skull, name: 'Memory Poisoning', desc: 'Attacker plants malicious content; future runs act on it' },
  { icon: ArrowDownToLine, name: 'Exfiltration via Recall', desc: 'Agent is prompted to retrieve and leak stored secrets' },
  { icon: FileStack, name: 'Accumulation Attack', desc: 'Sensitive data gradually written across many sessions' },
];

const sources = [
  { key: 'auto_memory', icon: FileText, agent: 'Claude Code', mech: '~/.claude/projects/<repo>/memory/*.md', color: 'sky', name: 'Auto Memory' },
  { key: 'mcp', icon: Plug, agent: 'Claude Code', mech: 'mcp__<server>__<tool>', color: 'violet', name: 'MCP Plugins' },
  { key: 'openclaw_file', icon: FolderOpen, agent: 'OpenClaw', mech: '.openclaw/workspace/memory/', color: 'orange', name: 'OpenClaw File' },
];

const ops = [
  { name: 'save', color: 'bg-amber-50 border-amber-200 text-amber-400' },
  { name: 'search', color: 'bg-blue-50 border-blue-200 text-blue-400' },
  { name: 'read', color: 'bg-green-50 border-green-200 text-green-400' },
  { name: 'update', color: 'bg-violet-50 border-violet-200 text-violet-400' },
  { name: 'delete', color: 'bg-red-50 border-red-200 text-red-400' },
  { name: 'other', color: 'bg-zinc-50 border-zinc-200 text-zinc-400' },
];

function FlowDot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${color}`}
      animate={{ left: ['-8px', 'calc(100% + 8px)'] }}
      transition={{ duration: 1.4, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

const sourceColorMap: Record<string, { bg: string; border: string; text: string; pipe: string; dot: string }> = {
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-400', pipe: 'bg-sky-200', dot: 'bg-sky-400' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-400', pipe: 'bg-violet-200', dot: 'bg-violet-400' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-400', pipe: 'bg-orange-200', dot: 'bg-orange-400' },
};

export function MemoryMonitorSlide() {
  const [revealed, setRevealed] = useState(0);
  const stepHandler = useCallback(() => {
    if (revealed < TOTAL_STEPS) { setRevealed(n => n + 1); return true; }
    return false;
  }, [revealed]);
  useSlideStep(revealed < TOTAL_STEPS ? stepHandler : null);
  const show = (n: number) => revealed >= n;

  return (
    <SlideLayout
      title="Memory Monitoring"
      subtitle="Track every read and write to agent memory — across auto-memory, MCP plugins, and OpenClaw files."
    >
      <div className="flex flex-col h-full gap-3 pt-1 pb-2 px-2">

        {/* Top: Threats — why monitor */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(1) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-3 shrink-0"
        >
          {threats.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.name} className="bg-white border border-l-4 border-l-red-300 border-gray-100 rounded-xl px-3 py-2.5 flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
                  <Icon size={18} className="text-red-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-gray-400 leading-tight">{t.name}</div>
                  <div className="text-xs text-gray-300 mt-0.5 leading-snug">{t.desc}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Middle: Pipeline — three sources merge into one stream */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(2) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="bg-white border-2 border-pink-100 rounded-2xl p-4 flex-1 min-h-0 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <Brain size={14} className="text-pink-400" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Memory Operation Pipeline</span>
          </div>

          <div className="flex items-stretch gap-0 w-full">
            {/* Source cards */}
            <div className="flex flex-col gap-2 shrink-0 w-[200px]">
              {sources.map((s) => {
                const Icon = s.icon;
                const c = sourceColorMap[s.color];
                return (
                  <div key={s.key} className={`${c.bg} border-2 ${c.border} rounded-xl px-3 h-14 flex items-center gap-2`}>
                    <Icon size={16} className={c.text} />
                    <div className="min-w-0">
                      <div className={`text-xs font-black ${c.text} leading-tight`}>{s.name}</div>
                      <div className="text-[10px] text-gray-300 font-mono mt-0.5 truncate">{s.mech}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pipes from each source */}
            <div className="flex flex-col gap-2 flex-1 px-2">
              {sources.map((s, i) => {
                const c = sourceColorMap[s.color];
                return (
                  <div key={s.key} className="relative h-14 flex items-center">
                    <div className={`w-full h-0.5 ${c.pipe}`} />
                    <FlowDot color={c.dot} delay={i * 0.3} />
                    <FlowDot color={c.dot} delay={i * 0.3 + 0.7} />
                  </div>
                );
              })}
            </div>

            {/* MVs column */}
            <div className="flex flex-col gap-2 shrink-0 w-[170px]">
              {sources.map((s) => {
                const c = sourceColorMap[s.color];
                return (
                  <div key={s.key} className={`${c.bg} border-2 ${c.border} rounded-xl px-3 h-14 flex items-center justify-center text-center`}>
                    <div className={`text-[11px] font-black ${c.text} leading-tight`}>mv_memory_{s.key}</div>
                  </div>
                );
              })}
            </div>

            {/* Pipes merging */}
            <div className="flex flex-col gap-2 flex-1 px-2">
              {sources.map((s, i) => (
                <div key={s.key} className="relative h-14 flex items-center">
                  <div className="w-full h-0.5 bg-pink-200" />
                  <FlowDot color="bg-pink-400" delay={i * 0.25} />
                  <FlowDot color="bg-pink-400" delay={i * 0.25 + 0.6} />
                </div>
              ))}
            </div>

            {/* Output stream */}
            <div className="bg-pink-50 border-2 border-pink-300 rounded-xl px-4 text-center shrink-0 shadow-md shadow-pink-100 flex flex-col items-center justify-center gap-2 self-stretch">
              <Database size={20} className="text-pink-400" />
              <div className="text-xs font-black text-pink-400 whitespace-nowrap">agentguard_memory_ops</div>
              <div className="text-[10px] text-pink-300 font-medium">unified stream</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom: Operation types */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(3) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-100 rounded-2xl p-3 shrink-0 flex items-center gap-3"
        >
          <span className="text-xs font-black uppercase tracking-widest text-gray-400 shrink-0">Operation Types</span>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {ops.map((op) => (
              <span key={op.name} className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${op.color}`}>{op.name}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </SlideLayout>
  );
}
