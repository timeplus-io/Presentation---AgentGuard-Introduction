import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { ArrowRight, Monitor, ShieldAlert, GitMerge, Filter, Code2, Server } from 'lucide-react';

function FlowDot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${color}`}
      animate={{ top: ['-8px', 'calc(100% + 8px)'] }}
      transition={{ duration: 1.1, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function VerticalPipe({ color, children }: { color: string; children?: React.ReactNode }) {
  return (
    <div className="relative w-full flex justify-center" style={{ height: 44 }}>
      <div className={`w-0.5 h-full ${color}`} />
      {children}
    </div>
  );
}

const stages = [
  {
    label: 'mv_rule_<id>',
    sublabel: 'Rule match written',
    stream: 'agentguard_security_events',
    streamColor: 'bg-red-50 border-red-200 text-red-400',
    pipeColor: 'bg-red-200',
    dotColor: 'bg-red-400',
    tagColor: 'bg-red-50 border-red-200 text-red-400',
    icon: <ShieldAlert size={18} className="text-red-400" />,
    iconBg: 'bg-red-50',
  },
  {
    label: 'mv_threats',
    sublabel: 'Deduplication · keyed on (agent_id, session_id, rule_id)',
    stream: 'agentguard_threats',
    streamColor: 'bg-violet-50 border-violet-200 text-violet-400',
    pipeColor: 'bg-violet-200',
    dotColor: 'bg-violet-400',
    tagColor: 'bg-violet-50 border-violet-200 text-violet-400',
    icon: <GitMerge size={18} className="text-violet-400" />,
    iconBg: 'bg-violet-50',
  },
  {
    label: 'mv_notify_filter',
    sublabel: 'Noise suppression · skip acknowledged, pass new or re-opened',
    stream: null,
    streamColor: '',
    pipeColor: 'bg-amber-200',
    dotColor: 'bg-amber-400',
    tagColor: 'bg-amber-50 border-amber-200 text-amber-400',
    icon: <Filter size={18} className="text-amber-400" />,
    iconBg: 'bg-amber-50',
  },
  {
    label: 'notify_agentguard_udf',
    sublabel: 'Python UDF → POST /api/alerts/webhook',
    stream: null,
    streamColor: '',
    pipeColor: 'bg-sky-200',
    dotColor: 'bg-sky-400',
    tagColor: 'bg-sky-50 border-sky-200 text-sky-400',
    icon: <Code2 size={18} className="text-sky-400" />,
    iconBg: 'bg-sky-50',
  },
];

// Badge card node
function BadgeCard({ x, y, w, h, badge, label, sublabel, badgeColor, borderColor }:
  { x: number; y: number; w: number; h: number; badge: string; label: string; sublabel: string; badgeColor: string; borderColor: string }) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div style={{ width: w, height: h }}
        className={`bg-white border ${borderColor} rounded-xl flex overflow-hidden shadow-sm`}>
        <div className={`w-2 shrink-0 ${badgeColor}`} />
        <div className="flex flex-col justify-center px-3 py-2 gap-0.5">
          <span className={`text-[10px] font-black uppercase tracking-widest ${badgeColor.replace('bg-', 'text-').replace('-400', '-500').replace('-500', '-500')}`}>{badge}</span>
          <span className="text-sm font-black text-gray-200">{label}</span>
          <span className="text-xs text-gray-400">{sublabel}</span>
        </div>
      </div>
    </foreignObject>
  );
}

export function AlertPipelineSlide() {
  return (
    <SlideLayout
      title="Alert Pipeline: Detection to Dashboard"
      subtitle="Sub-second path from agent action to browser notification."
    >
      <div className="flex h-full gap-4 pt-1 pb-2 px-2">

        {/* Left: Pipeline */}
        <div className="flex flex-col w-[38%] shrink-0 gap-0">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.12 }}
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 relative z-10"
              >
                <div className={`p-2 rounded-xl shrink-0 ${stage.iconBg}`}>{stage.icon}</div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-black font-mono border rounded-md px-1.5 py-0.5 inline-block w-fit mb-1 ${stage.tagColor}`}>{stage.label}</span>
                  <span className="text-xs text-gray-400 font-medium leading-tight">{stage.sublabel}</span>
                  {stage.stream && (
                    <span className={`mt-1 text-xs font-black font-mono border rounded-md px-1.5 py-0.5 inline-block w-fit ${stage.streamColor}`}>
                      {stage.stream}
                    </span>
                  )}
                </div>
              </motion.div>

              {i < stages.length - 1 && (
                <VerticalPipe color={stage.pipeColor}>
                  <FlowDot color={stage.dotColor} delay={i * 0.25} />
                  <FlowDot color={stage.dotColor} delay={i * 0.25 + 0.55} />
                </VerticalPipe>
              )}
            </div>
          ))}

          {/* Arrow to backend */}
          <div className="flex items-center gap-0 mt-0 w-full">
            <VerticalPipe color="bg-sky-200">
              <FlowDot color="bg-sky-400" delay={0.1} />
              <FlowDot color="bg-sky-400" delay={0.65} />
            </VerticalPipe>
          </div>

          {/* Backend + SSE + Browser */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 relative z-10"
          >
            <div className="p-2 rounded-xl bg-green-50 shrink-0"><Monitor size={18} className="text-green-500" /></div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black font-mono border rounded-md px-1.5 py-0.5 bg-sky-50 border-sky-200 text-sky-400">Backend</span>
                <ArrowRight size={12} className="text-gray-300 shrink-0" />
                <span className="text-xs font-black font-mono border rounded-md px-1.5 py-0.5 bg-green-50 border-green-200 text-green-500">SSE</span>
                <ArrowRight size={12} className="text-gray-300 shrink-0" />
                <span className="text-xs font-black text-gray-400">Browser</span>
              </div>
              <span className="text-xs text-gray-400 mt-0.5">≤ 10 alerts / min</span>
            </div>
          </motion.div>

          {/* Sub-second badge */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-3 flex justify-center"
          >
            <div className="flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              <span className="text-sm font-black text-pink-400">End-to-end latency: sub-second</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Threat lifecycle — badge-card flow */}
        <div className="flex-1 flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex-1 flex flex-col"
          >
            <div className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Threat Lifecycle</div>

            <div className="flex-1 flex items-center justify-center">
              <svg viewBox="0 0 220 360" className="w-full h-full max-h-[300px]" overflow="visible">
                <defs>
                  <marker id="arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="#f87171" />
                  </marker>
                  <marker id="arr-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="#fbbf24" />
                  </marker>
                  <marker id="arr-green-up" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="#6ee7b7" />
                  </marker>
                </defs>

                {/* Edges */}
                <path d="M 110 90 L 110 140" fill="none" stroke="#f87171" strokeWidth={2} strokeOpacity={0.6} />
                <path d="M 110 230 L 110 280" fill="none" stroke="#fbbf24" strokeWidth={2} strokeOpacity={0.6} />
                <path d="M 20 308 C -25 308 -25 62 20 62" fill="none" stroke="#6ee7b7" strokeWidth={2} strokeOpacity={0.6} />

                {/* Arrowheads */}
                <line x1="110" y1="120" x2="110" y2="140" stroke="#f87171" strokeWidth={2} markerEnd="url(#arr-red)" />
                <line x1="110" y1="260" x2="110" y2="280" stroke="#fbbf24" strokeWidth={2} markerEnd="url(#arr-amber)" />
                <line x1="-22" y1="78" x2="18" y2="62" stroke="#6ee7b7" strokeWidth={2} markerEnd="url(#arr-green-up)" />

                {/* Re-open label */}
                <text x="-38" y="185" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90, -38, 185)">re-open</text>

                {/* Badge card nodes — taller */}
                <BadgeCard x={20} y={12} w={188} h={78}
                  badge="OPEN" label="Threat Detected" sublabel="Newly fired, awaiting triage"
                  badgeColor="bg-red-400" borderColor="border-red-200" />
                <BadgeCard x={20} y={152} w={188} h={78}
                  badge="ACK" label="Acknowledged" sublabel="Operator has seen the alert"
                  badgeColor="bg-amber-400" borderColor="border-amber-200" />
                <BadgeCard x={20} y={292} w={188} h={78}
                  badge="CLEAR" label="Cleared" sublabel="Resolved — auto-reopens if fired again"
                  badgeColor="bg-emerald-400" borderColor="border-emerald-200" />
              </svg>
            </div>
          </motion.div>

          {/* Mutable stream callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3"
          >
            <div className="text-sm font-black uppercase tracking-widest text-violet-400 mb-1">agentguard_threats</div>
            <div className="text-sm text-gray-400 leading-relaxed">Mutable stream · upsert keyed on <span className="font-mono text-violet-400">(agent_id, session_id, rule_id)</span></div>
          </motion.div>
        </div>

      </div>
    </SlideLayout>
  );
}
