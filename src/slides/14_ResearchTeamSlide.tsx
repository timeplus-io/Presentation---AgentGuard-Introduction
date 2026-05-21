import { Fragment, useCallback, useState } from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { SlideLayout, useSlideStep } from '../components/Presentation';
import { Search, FileCode2, ShieldCheck, Globe, Bot, Clock, Library } from 'lucide-react';
import agentGuardLogo from '../assets/timeplus-agentguard_logo-pink.svg';
import timeplusLogo from '../assets/timeplus-circles_for-light-bg.svg';

const TOTAL_STEPS = 2;

type NodeId = 'researcher' | 'websearch' | 'analyst' | 'catalog' | 'validator' | 'timeplus';

type ColorTone = 'sky' | 'violet' | 'emerald' | 'pink' | 'orange' | 'gray';

const tones: Record<ColorTone, { bg: string; border: string; text: string; iconBg: string; stroke: string; dot: string }> = {
  sky:     { bg: 'bg-sky-50',     border: 'border-sky-200',     text: 'text-sky-400',     iconBg: 'bg-sky-100',     stroke: '#7dd3fc', dot: 'bg-sky-400' },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-400',  iconBg: 'bg-violet-100',  stroke: '#c4b5fd', dot: 'bg-violet-400' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-400', iconBg: 'bg-emerald-100', stroke: '#6ee7b7', dot: 'bg-emerald-400' },
  pink:    { bg: 'bg-pink-50',    border: 'border-pink-200',    text: 'text-pink-400',    iconBg: 'bg-pink-100',    stroke: '#f9a8d4', dot: 'bg-pink-400' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-400',  iconBg: 'bg-orange-100',  stroke: '#fdba74', dot: 'bg-orange-400' },
  gray:    { bg: 'bg-gray-50',    border: 'border-gray-200',    text: 'text-gray-400',    iconBg: 'bg-gray-100',    stroke: '#d1d5db', dot: 'bg-gray-400' },
};

type GraphNode = {
  id: NodeId;
  kind: 'agent' | 'infra';
  icon?: LucideIcon;
  logo?: string;
  name: string;
  sub: string;
  color: ColorTone;
  x: number;
  y: number;
};

const nodes: Record<NodeId, GraphNode> = {
  researcher: { id: 'researcher', kind: 'agent', icon: Search,      name: 'Researcher', sub: 'mines threat intel',       color: 'violet',  x: 14, y: 18 },
  websearch:  { id: 'websearch',  kind: 'infra', icon: Globe,       name: 'Web Search', sub: 'OWASP · CVE · arXiv',      color: 'sky',     x: 86, y: 18 },
  analyst:    { id: 'analyst',    kind: 'agent', icon: FileCode2,   name: 'Analyst',    sub: 'authors SQL rules',        color: 'violet',  x: 14, y: 54 },
  catalog:    { id: 'catalog',    kind: 'infra', logo: agentGuardLogo, name: 'Catalog', sub: 'AgentGuard · rp-NNN.yaml', color: 'pink',    x: 50, y: 54 },
  validator:  { id: 'validator',  kind: 'agent', icon: ShieldCheck, name: 'Validator',  sub: 'hardens & updates',        color: 'violet',  x: 86, y: 54 },
  timeplus:   { id: 'timeplus',   kind: 'infra', logo: timeplusLogo,   name: 'Timeplus', sub: 'live SQL validation',     color: 'pink',    x: 50, y: 92 },
};

type Edge = {
  from: NodeId;
  to: NodeId;
  color: ColorTone;
  mode: 'one-way' | 'two-way';
  label: string;
};

const edges: Edge[] = [
  { from: 'researcher', to: 'websearch', color: 'violet', mode: 'two-way', label: 'query · results' },
  { from: 'researcher', to: 'analyst',   color: 'violet', mode: 'one-way', label: 'research_done' },
  { from: 'analyst',    to: 'catalog',   color: 'violet', mode: 'one-way', label: 'write rule' },
  { from: 'analyst',    to: 'timeplus',  color: 'violet', mode: 'one-way', label: 'validate SQL' },
  { from: 'validator',  to: 'catalog',   color: 'violet', mode: 'two-way', label: 'read · update' },
  { from: 'validator',  to: 'timeplus',  color: 'violet', mode: 'one-way', label: 'validate' },
];

const stats = [
  { icon: Library, value: '120+',    label: 'rules in catalog' },
  { icon: Bot,     value: '3 roles', label: 'autonomous LLM agents' },
  { icon: Clock,   value: '2h / 4h', label: 'research / validate cadence' },
];

function FlowingDot({ from, to, color, delay = 0 }: { from: { x: number; y: number }; to: { x: number; y: number }; color: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${color} z-10 -translate-x-1/2 -translate-y-1/2 shadow`}
      initial={{ left: `${from.x}%`, top: `${from.y}%` }}
      animate={{ left: [`${from.x}%`, `${to.x}%`], top: [`${from.y}%`, `${to.y}%`] }}
      transition={{ duration: 2.0, delay, repeat: Infinity, ease: 'linear', repeatDelay: 0.1 }}
    />
  );
}

function NodeCard({ node }: { node: GraphNode }) {
  const c = tones[node.color];
  const Icon = node.icon;
  const isAgent = node.kind === 'agent';
  const hasLogo = Boolean(node.logo);
  const widthPx = hasLogo ? 300 : isAgent ? 230 : 180;
  return (
    <div
      className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 ${c.bg} border-2 ${c.border} rounded-2xl ${
        hasLogo ? 'shadow-lg shadow-pink-100' : isAgent ? 'shadow-md shadow-violet-100' : 'shadow-md'
      }`}
      style={{ left: `${node.x}%`, top: `${node.y}%`, width: widthPx }}
    >
      <div className={`flex items-center gap-3 ${hasLogo ? 'px-5 py-4' : isAgent ? 'px-4 py-3' : 'px-3 py-2'}`}>
        <div
          className={`shrink-0 rounded-xl ${c.iconBg} flex items-center justify-center overflow-hidden ${
            hasLogo ? 'w-20 h-20' : isAgent ? 'w-14 h-14' : 'w-10 h-10'
          }`}
        >
          {node.logo ? (
            <img src={node.logo} alt={node.name} className="w-16 h-16 object-contain" />
          ) : Icon ? (
            <Icon size={isAgent ? 28 : 20} className={c.text} />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          {isAgent && (
            <span className={`inline-flex items-center gap-1 ${c.iconBg} ${c.border} border rounded-full px-1.5 py-0.5 mb-1`}>
              <Bot size={9} className={c.text} />
              <span className={`text-[8px] font-mono font-bold ${c.text} uppercase tracking-wider`}>agent</span>
            </span>
          )}
          <div
            className={`font-black ${c.text} uppercase tracking-wider leading-tight ${
              hasLogo ? 'text-lg' : isAgent ? 'text-base' : 'text-xs'
            }`}
          >
            {node.name}
          </div>
          <div className={`text-gray-300 leading-snug truncate ${hasLogo ? 'text-xs mt-1' : isAgent ? 'text-[11px] mt-0.5' : 'text-[10px] mt-0.5'}`}>{node.sub}</div>
        </div>
      </div>
    </div>
  );
}

function EdgeLabel({ edge }: { edge: Edge }) {
  const f = nodes[edge.from];
  const t = nodes[edge.to];
  const mx = (f.x + t.x) / 2;
  const my = (f.y + t.y) / 2;
  const c = tones[edge.color];
  return (
    <div
      className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white border ${c.border} text-[9px] font-mono font-bold ${c.text} whitespace-nowrap shadow-sm`}
      style={{ left: `${mx}%`, top: `${my}%` }}
    >
      {edge.label}
    </div>
  );
}

export function ResearchTeamSlide() {
  const [revealed, setRevealed] = useState(0);
  const stepHandler = useCallback(() => {
    if (revealed < TOTAL_STEPS) { setRevealed(n => n + 1); return true; }
    return false;
  }, [revealed]);
  useSlideStep(revealed < TOTAL_STEPS ? stepHandler : null);
  const show = (n: number) => revealed >= n;

  return (
    <SlideLayout
      title="Rule Research Team"
      subtitle="A network of autonomous agents continuously researches, authors, and validates detection rules — running SQL against a live Timeplus to prove every rule before it ships."
    >
      <div className="flex flex-col h-full gap-3 pt-1 pb-2 px-2">

        {/* Network diagram */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(1) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white border-2 border-pink-100 rounded-2xl p-4 flex-1 min-h-0 overflow-hidden"
        >
          {/* Legend strip */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bot size={14} className="text-pink-400" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Research Workflow Network</span>
            </div>
            <div className="flex items-center gap-3">
              <LegendDot color="bg-violet-400" label="agent" />
              <LegendDot color="bg-pink-400" label="infrastructure" />
              <LegendDot color="bg-sky-400" label="external" />
            </div>
          </div>

          {/* The graph canvas */}
          <div className="relative w-full" style={{ height: 'calc(100% - 28px)' }}>
            {/* SVG edges */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ pointerEvents: 'none' }}
            >
              {edges.map((e) => {
                const f = nodes[e.from];
                const t = nodes[e.to];
                return (
                  <line
                    key={`edge-${e.from}-${e.to}`}
                    x1={f.x}
                    y1={f.y}
                    x2={t.x}
                    y2={t.y}
                    stroke={tones[e.color].stroke}
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {/* Animated flowing dots */}
            {edges.map((e, i) => {
              const f = nodes[e.from];
              const t = nodes[e.to];
              const c = tones[e.color];
              return (
                <Fragment key={`dots-${e.from}-${e.to}`}>
                  <FlowingDot from={f} to={t} color={c.dot} delay={i * 0.18} />
                  <FlowingDot from={f} to={t} color={c.dot} delay={i * 0.18 + 1.0} />
                  {e.mode === 'two-way' && (
                    <FlowingDot from={t} to={f} color={c.dot} delay={i * 0.18 + 0.5} />
                  )}
                </Fragment>
              );
            })}

            {/* Edge labels */}
            {edges.map((e) => (
              <Fragment key={`label-${e.from}-${e.to}`}>
                <EdgeLabel edge={e} />
              </Fragment>
            ))}

            {/* Nodes */}
            {Object.values(nodes).map((n) => (
              <Fragment key={n.id}>
                <NodeCard node={n} />
              </Fragment>
            ))}
          </div>
        </motion.div>

        {/* Bottom: Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(2) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-3 shrink-0"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-3 py-2.5 flex items-center gap-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-pink-50 flex items-center justify-center">
                  <Icon size={18} className="text-pink-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-black text-gray-400 leading-none tracking-tight">{s.value}</div>
                  <div className="text-xs text-gray-300 mt-1 leading-snug">{s.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </SlideLayout>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">{label}</span>
    </div>
  );
}
