import { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { SlideLayout, useSlideStep } from '../components/Presentation';
import { Sparkles, Eye, Zap, Database, ShieldAlert } from 'lucide-react';
import claudeLogo from '../assets/claude-seeklogo.svg';
import openClawLogo from '../assets/openclaw-dark.svg';

const TOTAL_STEPS = 3;

const eventKinds = [
  { key: 'loaded', icon: Eye, name: 'LOADED', desc: 'Skill is present in the system prompt — available to call', color: 'sky' },
  { key: 'invoked', icon: Zap, name: 'INVOKED', desc: 'Agent explicitly activated the skill mid-session', color: 'amber' },
];

const eventColorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-400', iconBg: 'bg-sky-100' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-400', iconBg: 'bg-amber-100' },
};

const sources = [
  { key: 'invoked_claudecode', logo: claudeLogo, agent: 'Claude Code', mech: 'before_tool_call · Skill', mvName: 'mv_skills_invoked_claudecode', kind: 'invoked', color: 'amber' },
  { key: 'invoked_openclaw', logo: openClawLogo, agent: 'OpenClaw', mech: 'before_tool_call · read SKILL.md', mvName: 'mv_skills_invoked_openclaw', kind: 'invoked', color: 'amber' },
  { key: 'loaded_claudecode', logo: claudeLogo, agent: 'Claude Code', mech: 'prompt_context', mvName: 'mv_skills_loaded_claudecode', kind: 'loaded', color: 'sky' },
  { key: 'loaded_openclaw', logo: openClawLogo, agent: 'OpenClaw', mech: 'llm_input', mvName: 'mv_skills_loaded_openclaw', kind: 'loaded', color: 'sky' },
];

const sourceColorMap: Record<string, { bg: string; border: string; text: string; pipe: string; dot: string }> = {
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-400', pipe: 'bg-sky-200', dot: 'bg-sky-400' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-400', pipe: 'bg-amber-200', dot: 'bg-amber-400' },
};

const sourceTypes = [
  { name: 'workspace', risk: true, color: 'bg-red-50 border-red-300 text-red-400' },
  { name: 'managed', risk: false, color: 'bg-emerald-50 border-emerald-200 text-emerald-400' },
  { name: 'personal', risk: false, color: 'bg-blue-50 border-blue-200 text-blue-400' },
  { name: 'bundled', risk: false, color: 'bg-zinc-50 border-zinc-200 text-zinc-400' },
  { name: 'plugin', risk: false, color: 'bg-violet-50 border-violet-200 text-violet-400' },
  { name: 'user', risk: false, color: 'bg-gray-50 border-gray-200 text-gray-400' },
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

export function SkillsMonitorSlide() {
  const [revealed, setRevealed] = useState(0);
  const stepHandler = useCallback(() => {
    if (revealed < TOTAL_STEPS) { setRevealed(n => n + 1); return true; }
    return false;
  }, [revealed]);
  useSlideStep(revealed < TOTAL_STEPS ? stepHandler : null);
  const show = (n: number) => revealed >= n;

  return (
    <SlideLayout
      title="Skills Monitoring"
      subtitle="Track which skills load and which fire — flag workspace-installed skills as a planted-attack surface."
    >
      <div className="flex flex-col h-full gap-3 pt-1 pb-2 px-2">

        {/* Top: Two event kinds */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(1) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 gap-3 shrink-0"
        >
          {eventKinds.map((e) => {
            const Icon = e.icon;
            const c = eventColorMap[e.color];
            return (
              <div key={e.key} className={`${c.bg} border-2 ${c.border} rounded-xl px-3 py-2.5 flex items-center gap-3`}>
                <div className={`shrink-0 w-10 h-10 rounded-lg ${c.iconBg} flex items-center justify-center`}>
                  <Icon size={20} className={c.text} />
                </div>
                <div className="min-w-0">
                  <div className={`text-sm font-black ${c.text} leading-tight tracking-wider`}>{e.name}</div>
                  <div className="text-xs text-gray-300 mt-0.5 leading-snug">{e.desc}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Middle: Pipeline — four sources merge into one stream */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(2) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="bg-white border-2 border-pink-100 rounded-2xl p-4 flex-1 min-h-0 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-pink-400" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Skills Detection Pipeline</span>
          </div>

          <div className="flex items-stretch gap-0 w-full">
            {/* Source cards */}
            <div className="flex flex-col gap-2 shrink-0 w-[210px]">
              {sources.map((s) => {
                const c = sourceColorMap[s.color];
                return (
                  <div key={s.key} className={`${c.bg} border-2 ${c.border} rounded-xl px-3 h-12 flex items-center gap-2`}>
                    <img src={s.logo} alt={s.agent} className="h-4 w-4 object-contain shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className={`text-[11px] font-black ${c.text} leading-tight uppercase tracking-wider`}>{s.kind} · {s.agent}</div>
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
                  <div key={s.key} className="relative h-12 flex items-center">
                    <div className={`w-full h-0.5 ${c.pipe}`} />
                    <FlowDot color={c.dot} delay={i * 0.25} />
                    <FlowDot color={c.dot} delay={i * 0.25 + 0.7} />
                  </div>
                );
              })}
            </div>

            {/* MVs column */}
            <div className="flex flex-col gap-2 shrink-0 w-[230px]">
              {sources.map((s) => {
                const c = sourceColorMap[s.color];
                return (
                  <div key={s.key} className={`${c.bg} border-2 ${c.border} rounded-xl px-3 h-12 flex items-center justify-center text-center`}>
                    <div className={`text-[11px] font-black ${c.text} leading-tight font-mono`}>{s.mvName}</div>
                  </div>
                );
              })}
            </div>

            {/* Pipes merging */}
            <div className="flex flex-col gap-2 flex-1 px-2">
              {sources.map((s, i) => (
                <div key={s.key} className="relative h-12 flex items-center">
                  <div className="w-full h-0.5 bg-pink-200" />
                  <FlowDot color="bg-pink-400" delay={i * 0.2} />
                  <FlowDot color="bg-pink-400" delay={i * 0.2 + 0.6} />
                </div>
              ))}
            </div>

            {/* Output stream */}
            <div className="bg-pink-50 border-2 border-pink-300 rounded-xl px-4 text-center shrink-0 shadow-md shadow-pink-100 flex flex-col items-center justify-center gap-2 self-stretch">
              <Database size={20} className="text-pink-400" />
              <div className="text-xs font-black text-pink-400 whitespace-nowrap">agentguard_skills</div>
              <div className="text-[10px] text-pink-300 font-medium">unified stream</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom: Source type badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(3) ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-100 rounded-2xl p-3 shrink-0 flex items-center gap-3"
        >
          <span className="text-xs font-black uppercase tracking-widest text-gray-400 shrink-0">skill_source_type</span>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {sourceTypes.map((t) => (
              <span key={t.name} className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${t.color}`}>
                {t.risk && <ShieldAlert size={11} />}
                {t.name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </SlideLayout>
  );
}
