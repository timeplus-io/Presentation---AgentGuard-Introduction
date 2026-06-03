import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import {
  Bot, ShieldCheck, UserCheck, Check, Ban, Hourglass,
  ArrowRight, ArrowDown, Zap, ToggleLeft, RotateCcw, CornerDownLeft,
} from 'lucide-react';

// Animated dot traveling along a horizontal connector
function FlowDotH({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${color}`}
      animate={{ left: ['-4px', 'calc(100% + 4px)'] }}
      transition={{ duration: 1, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function ConnectorH({ label, color, dot }: { label: string; color: string; dot: string }) {
  return (
    <div className="flex flex-col items-center justify-center shrink-0 px-1" style={{ width: 96 }}>
      <span className="text-[10px] font-mono font-black text-gray-400 mb-1 text-center leading-tight">{label}</span>
      <div className="relative w-full h-0.5">
        <div className={`absolute inset-0 ${color} rounded-full`} />
        <FlowDotH color={dot} delay={0} />
        <FlowDotH color={dot} delay={0.5} />
      </div>
      <ArrowRight size={14} className="text-gray-400 -mt-2 ml-auto" />
    </div>
  );
}

// Stage card
function Stage({ icon, iconBg, badge, badgeColor, title, children }:
  { icon: ReactNode; iconBg: string; badge: string; badgeColor: string; title: string; children: ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm flex flex-col gap-2 h-full">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg shrink-0 ${iconBg}`}>{icon}</div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${badgeColor}`}>{badge}</span>
      </div>
      <div className="text-sm font-black text-gray-400 leading-tight">{title}</div>
      {children}
    </div>
  );
}

const OUTCOMES = [
  { key: 'allow', icon: <Check size={15} className="text-emerald-500" />, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-500', label: 'allow', policy: 'log_only', desc: 'Tool call proceeds' },
  { key: 'block', icon: <Ban size={15} className="text-red-500" />, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-500', label: 'block', policy: 'auto_block', desc: 'Denied — no prompt' },
  { key: 'hold', icon: <Hourglass size={15} className="text-amber-500" />, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-500', label: 'hold', policy: 'require approval', desc: 'Wait for a human' },
];

export function HoldsSlide() {
  return (
    <SlideLayout
      title="Prevention: Block Tool Calls with Human Approval"
      subtitle="A synchronous gate on PreToolUse pauses the agent until AgentGuard — and a human — decide."
    >
      <div className="flex h-full gap-5 pt-1 pb-2">

        {/* LEFT — the synchronous gate loop */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">

          {/* Top request lane: Agent → Gate → Decision */}
          <div className="flex items-stretch">
            {/* Agent */}
            <motion.div
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              <Stage
                icon={<Bot size={16} className="text-violet-500" />} iconBg="bg-violet-50"
                badge="Agent" badgeColor="text-violet-500" title="PreToolUse hook fires"
              >
                <span className="text-[11px] font-mono font-bold border rounded-md px-1.5 py-0.5 inline-block w-fit bg-red-50 border-red-200 text-red-500">rm -rf /</span>
                <span className="text-xs text-gray-300 leading-tight">Tool call <span className="font-bold text-gray-400">paused</span> — agent blocks on the response</span>
              </Stage>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center">
              <ConnectorH label="POST /api/holds" color="bg-pink-200" dot="bg-pink-400" />
            </motion.div>

            {/* Gate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
              className="flex-[1.25] min-w-0"
            >
              <Stage
                icon={<ShieldCheck size={16} className="text-pink-500" />} iconBg="bg-pink-50"
                badge="AgentGuard Gate" badgeColor="text-pink-500" title="Ingest → evaluate → decide"
              >
                <div className="flex flex-col gap-1 mt-0.5">
                  {[
                    ['1', 'Ingest event to Timeplus'],
                    ['2', 'Poll streaming rules ≤ 500 ms'],
                    ['3', 'Decide: hold › auto_block › log_only'],
                  ].map(([n, t]) => (
                    <div key={n} className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-pink-50 text-pink-500 text-[9px] font-black flex items-center justify-center shrink-0">{n}</span>
                      <span className="text-[11px] text-gray-400 leading-tight">{t}</span>
                    </div>
                  ))}
                </div>
              </Stage>
            </motion.div>
          </div>

          {/* Decision fan-out */}
          <div className="flex items-center justify-center gap-1.5 text-gray-400">
            <ArrowDown size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Decision</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.key}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.12 }}
                className={`rounded-2xl border ${o.border} ${o.bg} px-3 py-2.5 flex flex-col gap-1`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-white shrink-0">{o.icon}</div>
                  <span className={`text-sm font-black font-mono ${o.text}`}>{o.label}</span>
                </div>
                <span className="text-[11px] text-gray-400 leading-tight">{o.desc}</span>
                <span className={`text-[9px] font-mono font-bold ${o.text} opacity-80`}>{o.policy}</span>
              </motion.div>
            ))}
          </div>

          {/* Human-in-the-loop card under HOLD */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            className="relative bg-white border-2 border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-4 shadow-sm"
          >
            <div className="absolute -top-2.5 left-6 flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
              <ArrowDown size={11} className="text-amber-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">on hold</span>
            </div>
            <div className="p-2 rounded-xl bg-sky-50 shrink-0"><UserCheck size={20} className="text-sky-500" /></div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-black text-gray-400">Human-in-the-loop</span>
              <span className="text-[11px] text-gray-300 leading-tight">SSE toast → operator reviews in the live UI · waits up to <span className="font-bold text-gray-400">540 s</span></span>
            </div>
            <div className="flex items-center gap-2 ml-auto shrink-0">
              <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5">
                <Check size={14} className="text-emerald-500" /><span className="text-xs font-black text-emerald-500">Approve</span>
              </div>
              <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5">
                <Ban size={14} className="text-red-500" /><span className="text-xs font-black text-red-500">Deny</span>
              </div>
            </div>
          </motion.div>

          {/* Return path */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}
            className="flex items-center justify-center gap-2 text-gray-400"
          >
            <CornerDownLeft size={14} className="text-violet-500" />
            <span className="text-[11px] font-medium text-gray-400">Decision returns on the open connection → plugin writes <span className="font-mono font-bold text-violet-500">allow</span>/<span className="font-mono font-bold text-red-500">deny</span> to agent</span>
          </motion.div>
        </div>

        {/* RIGHT — guarantees */}
        <div className="w-[28%] shrink-0 flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-violet-50"><ToggleLeft size={16} className="text-violet-500" /></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">Opt-in</span>
            </div>
            <p className="text-xs text-gray-400 leading-snug">Per-plugin switch. Off by default for high-throughput agents — blocking adds round-trip latency to every call.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 }}
            className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-50"><RotateCcw size={16} className="text-amber-500" /></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Fail-safe</span>
            </div>
            <p className="text-xs text-gray-400 leading-snug">Server unreachable or no human in time → <span className="font-mono font-bold text-gray-400">fail_policy</span> (deny / allow). Crash → pending holds marked <span className="font-mono font-bold text-gray-400">abandoned</span>.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
            className="bg-pink-50 border border-pink-200 rounded-2xl px-4 py-3 flex-1 flex flex-col justify-center gap-2"
          >
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-pink-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-400">Latency budget</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-400">no rule fires</span>
                <span className="text-sm font-black text-pink-400">~70–110 ms</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-400">rule poll window</span>
                <span className="text-sm font-black text-pink-400">≤ 500 ms</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-400">human hold</span>
                <span className="text-sm font-black text-pink-400">sec – min</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </SlideLayout>
  );
}
