import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { BarChart2, Layers } from 'lucide-react';
import claudeLogo from '../assets/claude-seeklogo.svg';
import openClawLogo from '../assets/openclaw-dark.svg';

const mismatchRows = [
  { concern: 'User message', openclaw: 'message_received', claude: 'user_prompt_submit' },
  { concern: 'Token field',  openclaw: 'event_data…usage.input', claude: "log_attributes['input_tokens']" },
  { concern: 'LLM latency', openclaw: 'agent_end → durationMs', claude: "OTel log…duration_ms" },
  { concern: 'Tool duration',openclaw: 'after_tool_call → durationMs', claude: 'Not available' },
  { concern: 'Prompt text',  openclaw: 'llm_input → event_data.prompt', claude: 'Virtual prompt_context' },
];

const eventTypes = ['session_start', 'session_end', 'user_input', 'llm_request', 'llm_response', 'tool_invoke', 'tool_complete'];
const metrics = ['llm.input_tokens', 'llm.output_tokens', 'llm.latency_ms', 'llm.cache_read_tokens', 'tool.call', 'tool.success', 'tool.duration_ms'];

function FlowDot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${color}`}
      animate={{ left: ['-8px', 'calc(100% + 8px)'] }}
      transition={{ duration: 1.4, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function Pipe({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="relative flex-1 h-1.5 overflow-visible flex items-center">
      <div className={`w-full h-0.5 ${color}`} />
      {children}
    </div>
  );
}

export function CIMSlide() {
  return (
    <SlideLayout
      title="Common Information Model"
      subtitle="One normalized schema for every agent — security rules written once, run everywhere."
    >
      <div className="flex flex-col h-full gap-4 pt-1 pb-2 px-2">

        {/* Pipeline — main focus */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border-2 border-pink-100 rounded-2xl p-5 flex flex-col gap-4"
        >
          <div className="text-xs font-black uppercase tracking-widest text-gray-400 text-center">Normalization Pipeline</div>

          {/* Flow diagram */}
          <div className="flex items-center gap-0 w-full">

            {/* Agent sources */}
            <div className="flex flex-col gap-3 shrink-0 w-[130px]">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="bg-orange-50 border-2 border-orange-200 rounded-xl px-3 py-2 text-center flex flex-col items-center gap-1">
                <img src={openClawLogo} alt="OpenClaw" className="h-5 object-contain" />
                <div className="text-xs font-black text-orange-400">OpenClaw</div>
                <div className="text-[10px] text-orange-300 font-mono">plugin</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="bg-sky-50 border-2 border-sky-200 rounded-xl px-3 py-2 text-center flex flex-col items-center gap-1">
                <img src={claudeLogo} alt="Claude Code" className="h-5 w-5 object-contain" />
                <div className="text-xs font-black text-sky-400">Claude Code</div>
                <div className="text-[10px] text-sky-300 font-mono">plugin</div>
              </motion.div>
            </div>

            {/* Pipes to hook_events */}
            <div className="flex flex-col gap-3 flex-1 px-1">
              <Pipe color="bg-orange-200">
                <FlowDot color="bg-orange-400" delay={0} />
                <FlowDot color="bg-orange-400" delay={0.5} />
                <FlowDot color="bg-orange-400" delay={1.0} />
              </Pipe>
              <Pipe color="bg-sky-200">
                <FlowDot color="bg-sky-400" delay={0.2} />
                <FlowDot color="bg-sky-400" delay={0.7} />
                <FlowDot color="bg-sky-400" delay={1.2} />
              </Pipe>
            </div>

            {/* Raw stream */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-3 text-center shrink-0 whitespace-nowrap">
              <div className="text-xs font-black text-gray-300">agentguard_hook_events</div>
              <div className="text-[10px] text-gray-400 mt-1 font-mono">raw stream</div>
            </motion.div>

            {/* Pipes to MVs */}
            <div className="flex flex-col gap-3 flex-1 px-1">
              <Pipe color="bg-orange-200">
                <FlowDot color="bg-orange-400" delay={0.3} />
                <FlowDot color="bg-orange-400" delay={0.8} />
              </Pipe>
              <Pipe color="bg-sky-200">
                <FlowDot color="bg-sky-400" delay={0.1} />
                <FlowDot color="bg-sky-400" delay={0.6} />
              </Pipe>
            </div>

            {/* MVs */}
            <div className="flex flex-col gap-3 shrink-0 w-[150px]">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-orange-50 border-2 border-orange-200 rounded-xl px-3 py-2 text-center">
                <div className="text-xs font-black text-orange-400">mv_cim_openclaw</div>
                <div className="text-[10px] text-orange-300 mt-0.5">field mapping</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="bg-sky-50 border-2 border-sky-200 rounded-xl px-3 py-2 text-center">
                <div className="text-xs font-black text-sky-400">mv_cim_claudecode</div>
                <div className="text-[10px] text-sky-300 mt-0.5">field mapping</div>
              </motion.div>
            </div>

            {/* Pipes merging to cim_event */}
            <div className="flex flex-col gap-3 flex-1 px-1">
              <Pipe color="bg-pink-200">
                <FlowDot color="bg-pink-400" delay={0.4} />
                <FlowDot color="bg-pink-400" delay={0.9} />
              </Pipe>
              <Pipe color="bg-pink-200">
                <FlowDot color="bg-pink-400" delay={0.2} />
                <FlowDot color="bg-pink-400" delay={0.7} />
              </Pipe>
            </div>

            {/* Unified CIM event */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
              className="bg-pink-50 border-2 border-pink-300 rounded-xl px-3 py-3 text-center shrink-0 whitespace-nowrap shadow-md shadow-pink-100">
              <div className="text-xs font-black text-pink-500">agentguard_cim_event</div>
              <div className="text-[10px] text-pink-300 mt-1 font-medium">unified · agent-agnostic</div>
            </motion.div>

          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-xs text-gray-400 text-center">
            Views are dropped &amp; recreated on every server startup — field mapping updates take effect immediately with no manual cleanup.
          </motion.p>
        </motion.div>

        {/* Bottom row */}
        <div className="flex gap-4 flex-1 min-h-0">

          {/* Bottom-left: Vocabulary mismatch table */}
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="flex-[1.2] flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 shrink-0">
              <Layers size={13} className="text-red-400" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Vocabulary Mismatch</span>
            </div>
            <div className="grid grid-cols-[0.8fr_1.1fr_1.1fr] text-xs font-black uppercase tracking-widest px-3 py-1.5 bg-gray-50 border-b border-gray-100 shrink-0">
              <span className="text-gray-400">Concern</span>
              <span className="text-orange-400">OpenClaw</span>
              <span className="text-sky-400">Claude Code</span>
            </div>
            <div className="flex flex-col divide-y divide-gray-50 flex-1 min-h-0 overflow-hidden">
              {mismatchRows.map((row, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 + i * 0.07 }}
                  className="grid grid-cols-[0.8fr_1.1fr_1.1fr] px-3 py-1.5 items-center flex-1">
                  <span className="text-sm font-bold text-gray-300 leading-tight">{row.concern}</span>
                  <span className="text-xs font-mono text-orange-400 leading-tight pr-1">{row.openclaw}</span>
                  <span className={`text-xs font-mono leading-tight ${row.claude === 'Not available' ? 'text-gray-400 italic' : 'text-sky-400'}`}>{row.claude}</span>
                </motion.div>
              ))}
            </div>
            <div className="px-3 py-1.5 bg-red-50 border-t border-red-100 shrink-0">
              <p className="text-xs text-red-400 font-bold">Without CIM: per-agent rule logic. Every new agent breaks all rules.</p>
            </div>
          </motion.div>

          {/* Bottom-right: Event types + Metrics stacked */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Canonical event types */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex-1 bg-white border border-gray-200 rounded-2xl p-3 flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Canonical Event Types</span>
                <span className="text-lg font-black text-pink-400 leading-none">7</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {eventTypes.map((e, i) => (
                  <motion.span key={e}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.05 }}
                    className="text-xs font-bold bg-pink-50 border border-pink-200 text-pink-400 px-2 py-0.5 rounded-full">
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CIM Metrics */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex-1 bg-white border border-gray-200 rounded-2xl p-3 flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <BarChart2 size={13} className="text-violet-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">CIM Metrics</span>
                </div>
                <span className="text-lg font-black text-violet-400 leading-none">7</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {metrics.map((m, i) => (
                  <motion.span key={m}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65 + i * 0.05 }}
                    className="text-xs font-mono font-bold bg-violet-50 border border-violet-200 text-violet-400 px-2 py-0.5 rounded-full">
                    {m}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </SlideLayout>
  );
}
