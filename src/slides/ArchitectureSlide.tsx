import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { Bot, DatabaseZap, Server, Layers, Filter, ShieldAlert, ArrowDown, ArrowRight, Share2, Activity, ShieldCheck, Zap } from 'lucide-react';

export function ArchitectureSlide() {
  return (
    <SlideLayout 
      title="How AgentGuard Is Designed" 
      subtitle="A 4-tier architecture: Collection, CIM Normalization, Streaming Detection, and Live UI."
    >
      <div className="flex h-full gap-8 pt-4 pb-2 px-2">
        
        {/* Left Side: The Pipeline Diagram */}
        <div className="flex-[0.8] flex flex-col gap-1 relative">

          {/* Layer 1: Agents */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-3 shadow-[0_4px_20px_rgb(0,0,0,0.02)] relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-pink-50 p-2 rounded-lg text-pink-500"><Bot size={16} /></div>
              <h3 className="font-bold text-[black] text-sm">Agent Workloads</h3>
              <span className="text-gray-400 text-xs font-medium ml-auto">OpenClaw / Claude</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="text-[black] font-bold text-xs">AgentGuard Plugin</span>
                <span className="text-gray-400 text-[10px] mt-0.5">Hook Events → :3218</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg flex flex-col items-center justify-center text-center">
                <span className="text-[black] font-bold text-xs">OTel Plugin</span>
                <span className="text-gray-400 text-[10px] mt-0.5">OTLP/HTTP → :4318</span>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center relative z-0">
            <ArrowDown size={18} className="text-pink-300" />
          </div>

          {/* Layer 2: Timeplus Engine */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white border-2 border-pink-100 rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-pink-500 text-white p-2 rounded-lg"><DatabaseZap size={16} /></div>
              <h3 className="font-bold text-[black] text-sm">Timeplus Streaming SQL Engine</h3>
            </div>

            <div className="flex flex-col gap-1 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-pink-50 rounded-full z-0"></div>

              <div className="flex items-center gap-2 relative z-10 bg-white group">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 shrink-0 text-gray-500"><Layers size={15} /></div>
                <div className="flex-1 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <div className="text-[black] font-bold text-xs">agentguard_hook_events</div>
                  <div className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mt-0.5">Raw Stream</div>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10 group pl-2">
                <ArrowRight size={12} className="text-pink-300 shrink-0 ml-5" />
                <div className="flex-1 bg-pink-50/50 p-1.5 rounded-lg border border-pink-100/50 flex items-center gap-2">
                  <Filter size={12} className="text-pink-400" />
                  <span className="text-pink-600 font-bold text-[10px] uppercase tracking-wider">CIM Normalizer MVs</span>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10 bg-white group">
                <div className="w-9 h-9 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-100 shrink-0 text-pink-500"><Share2 size={15} /></div>
                <div className="flex-1 bg-pink-50 p-2 rounded-lg border border-pink-100">
                  <div className="text-[black] font-bold text-xs">agentguard_cim_event</div>
                  <div className="text-pink-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Unified Security Schema</div>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10 group pl-2">
                <ArrowRight size={12} className="text-pink-300 shrink-0 ml-5" />
                <div className="flex-1 bg-pink-50/50 p-1.5 rounded-lg border border-pink-100/50 flex items-center gap-2">
                  <Zap size={12} className="text-pink-400" />
                  <span className="text-pink-600 font-bold text-[10px] uppercase tracking-wider">Security Rule MVs</span>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10 bg-white group">
                <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center border border-red-100 shrink-0 text-red-500"><ShieldAlert size={15} /></div>
                <div className="flex-1 bg-red-50 p-2 rounded-lg border border-red-100">
                  <div className="text-[black] font-bold text-xs">agentguard_security_events</div>
                  <div className="text-red-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Threats + Alerts</div>
                </div>
              </div>

            </div>
          </motion.div>

          <div className="flex justify-center relative z-0">
            <ArrowDown size={18} className="text-blue-300" />
          </div>

          {/* Layer 3: Backend */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white border border-blue-200 rounded-2xl p-3 shadow-[0_4px_20px_rgb(0,0,0,0.02)] relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-500"><Server size={16} /></div>
              <h3 className="font-bold text-[black] text-sm">AgentGuard Backend (Go/Gin :8080)</h3>
            </div>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-100 p-2 rounded-lg">
               <span className="text-gray-500 font-bold text-xs flex items-center gap-1.5"><DatabaseZap size={13}/> REST API</span>
               <span className="text-blue-500 font-bold text-xs flex items-center gap-1.5"><Activity size={13}/> SSE Subscriptions</span>
               <span className="text-[black] font-bold text-xs flex items-center gap-1.5"><ShieldCheck size={13}/> React SPA</span>
            </div>
          </motion.div>

        </div>

        {/* Right Side: The Concepts */}
        <div className="flex-1 flex flex-col pt-4 gap-6">
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl font-black text-[black] mb-2 flex items-center gap-3 tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center shadow-sm"><Share2 size={16} /></div>
              Common Information Model
            </h3>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              Two CIM Materialized Views seamlessly normalize heterogeneous events from OpenClaw and Claude Code into a single <code className="text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded text-sm">agentguard_cim_event</code> schema. SQL rules are written once and work across any supported agent.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="text-xl font-black text-[black] mb-2 flex items-center gap-3 tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shadow-sm"><ShieldAlert size={16} /></div>
              Stateful Threat Pipeline
            </h3>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              Matches are written to security events where a deduplication pipeline groups them by <code className="text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded text-sm">(agent, session, rule)</code>. Lifecycles track threats from <span className="font-bold text-[black]">Open &rarr; Ack &rarr; Cleared</span>, with noise-suppression ensuring alerts only fire when legitimately new.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="text-xl font-black text-[black] mb-2 flex items-center gap-3 tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm"><Activity size={16} /></div>
              Live Server-Sent Events
            </h3>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              The Go backend exposes a fast REST API for dashboards, while piping live <span className="font-bold text-[black]">Server-Sent Event (SSE) notifications</span> directly to connected browser clients the instant Timeplus registers a detection.
            </p>
          </motion.div>

        </div>
        
      </div>
    </SlideLayout>
  );
}
