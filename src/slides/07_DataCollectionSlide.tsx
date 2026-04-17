import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { ArrowRight, Plug, Radio, Database } from 'lucide-react';
import claudeLogo from '../assets/claude-seeklogo.svg';
import openClawLogo from '../assets/openclaw-dark.svg';

const hookEvents = ['session_start', 'user_prompt', 'pre_tool_use', 'post_tool_use', 'llm_output', 'session_end'];

const otelStreams = [
  { name: 'otel_traces', color: 'bg-violet-50 border-violet-200 text-violet-400' },
  { name: 'otel_logs', color: 'bg-violet-50 border-violet-200 text-violet-400' },
  { name: 'otel_metrics_gauge', color: 'bg-violet-50 border-violet-200 text-violet-400' },
  { name: 'otel_metrics_sum', color: 'bg-violet-50 border-violet-200 text-violet-400' },
  { name: 'otel_metrics_histogram', color: 'bg-violet-50 border-violet-200 text-violet-400' },
];

export function DataCollectionSlide() {
  return (
    <SlideLayout
      title="Data Collection: Two Paths In"
      subtitle="Agents send telemetry through two complementary channels."
    >
      <div className="flex h-full gap-5 pt-2 pb-2 px-2">

        {/* Path 1: Hook Events */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex-1 flex flex-col gap-3 bg-white border-2 border-pink-100 rounded-2xl p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-pink-50 text-pink-500 p-2 rounded-lg"><Plug size={16} /></div>
              <span className="font-black text-base text-gray-200">Hook Events</span>
            </div>
            <span className="text-xs font-bold bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full">PRIMARY</span>
          </div>

          {/* Agents row */}
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center flex flex-col items-center gap-1">
              <img src={claudeLogo} alt="Claude Code" className="h-7 w-7 object-contain" />
              <div className="text-sm font-black text-gray-200">Claude Code</div>
              <div className="text-xs text-gray-400 font-medium">@timeplus/agentguard-claudecode-plugin</div>
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center flex flex-col items-center gap-1">
              <img src={openClawLogo} alt="OpenClaw" className="h-7 object-contain" />
              <div className="text-sm font-black text-gray-200">OpenClaw</div>
              <div className="text-xs text-gray-400 font-medium">configured in openclaw.json</div>
              <div className="text-xs text-gray-400 font-medium">@timeplus/agentguard-openclaw-plugin</div>
            </div>
          </div>

          {/* Hook points */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Hook Points</span>
              <span className="text-2xl font-black text-pink-500 leading-none">10</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {hookEvents.map(e => (
                <span key={e} className="text-sm font-bold bg-pink-50 border border-pink-200 text-pink-700 px-2 py-0.5 rounded-full">{e}</span>
              ))}
              <span className="text-xs font-bold bg-pink-50 border border-pink-200 text-pink-600 px-2 py-0.5 rounded-full">+4 more</span>
            </div>
          </div>

          {/* Flow */}
          <div className="flex items-center gap-1.5 mt-auto">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
              <div className="text-xs font-bold text-gray-400">HTTP POST</div>
              <div className="text-sm font-black text-gray-200">async</div>
            </div>
            <ArrowRight size={14} className="text-pink-400 shrink-0" />
            <div className="flex-1 bg-pink-50 border border-pink-200 rounded-lg p-2 text-center">
              <div className="text-xs font-bold text-pink-700">port</div>
              <div className="text-base font-black text-pink-600">:3218</div>
            </div>
            <ArrowRight size={14} className="text-pink-400 shrink-0" />
            <div className="flex-1 bg-pink-50 border border-pink-200 rounded-lg p-2 text-center">
              <div className="text-xs font-bold text-pink-700 leading-tight">stream</div>
              <div className="text-xs font-black text-pink-700 leading-tight">hook_events</div>
            </div>
          </div>

          {/* What it captures */}
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-2.5">
            <div className="text-xs font-black uppercase tracking-widest text-pink-700 mb-1">Captures</div>
            <div className="text-sm text-gray-200 font-medium">Decision lifecycle — what the user asked, what tool was chosen, what it returned, whether governance blocked the action.</div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex flex-col items-center justify-center gap-1 shrink-0">
          <div className="w-px flex-1 bg-gray-300"></div>
          <span className="text-xs font-black text-gray-400 bg-gray-800 rounded-full px-2 py-1">+</span>
          <div className="w-px flex-1 bg-gray-300"></div>
        </div>

        {/* Path 2: OTel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col gap-3 bg-white border-2 border-violet-100 rounded-2xl p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-violet-50 text-violet-500 p-2 rounded-lg"><Radio size={16} /></div>
              <span className="font-black text-base text-gray-200">OTel Telemetry</span>
            </div>
            <span className="text-xs font-bold bg-violet-100 text-violet-400 px-2.5 py-1 rounded-full">SECONDARY</span>
          </div>

          {/* Signal types */}
          <div className="flex gap-2">
            {['Traces', 'Metrics', 'Logs'].map(s => (
              <div key={s} className="flex-1 bg-violet-50 border border-violet-200 rounded-xl p-2 text-center">
                <div className="text-xs font-black text-violet-400">{s}</div>
              </div>
            ))}
          </div>

          {/* Flow */}
          <div className="flex items-center gap-1.5">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
              <div className="text-xs font-bold text-gray-400">OTLP/HTTP</div>
              <div className="text-sm font-black text-gray-200">export</div>
            </div>
            <ArrowRight size={14} className="text-violet-400 shrink-0" />
            <div className="flex-1 bg-violet-50 border border-violet-200 rounded-lg p-2 text-center">
              <div className="text-xs font-bold text-violet-400">port</div>
              <div className="text-base font-black text-violet-400">:4318</div>
            </div>
            <ArrowRight size={14} className="text-violet-400 shrink-0" />
            <div className="flex-1 bg-violet-50 border border-violet-200 rounded-lg p-2 text-center">
              <div className="text-xs font-bold text-violet-400">streams</div>
              <div className="text-base font-black text-violet-400">5</div>
            </div>
          </div>

          {/* 5 streams */}
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5">Output Streams</div>
            <div className="flex flex-col gap-1">
              {otelStreams.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.07 }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-sm font-bold ${s.color}`}
                >
                  <Database size={13} />
                  {s.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* What it captures */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-2.5 mt-auto">
            <div className="text-xs font-black uppercase tracking-widest text-violet-400 mb-1">Captures</div>
            <div className="text-sm text-gray-200 font-medium">Operational profile — token counts, latency, cache hit ratios. Claude Code token &amp; latency data comes <span className="font-bold text-gray-200">exclusively</span> from OTel logs.</div>
          </div>
        </motion.div>

      </div>
    </SlideLayout>
  );
}
