import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { Clock, Zap, Network, AlertTriangle, FileJson, Unlink, Layers, ArrowRight, ShieldCheck, DatabaseZap } from 'lucide-react';
import timeplusLogo from '../assets/timeplus-circles_for-light-bg.svg';

export function FallShortSlide() {
  return (
    <SlideLayout 
      title="Why Existing Tools Fall Short" 
      subtitle="Traditional security infrastructure breaks down against autonomous agentic workloads."
    >
      <div className="flex flex-col h-full gap-3 px-8 pb-4 pt-4">
        
        {/* Three Pillars of Failure */}
        <div className="flex flex-1 gap-5 min-h-0">
          
          {/* 1. Speed Mismatch */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 bg-white border border-gray-700 rounded-xl p-6 flex flex-col relative overflow-hidden group hover:border-pink-500/40 transition-colors"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-pink-50 p-3 rounded-xl text-pink-500"><Clock size={24} /></div>
              <h3 className="font-bold text-gray-200 text-xl">Speed Mismatch</h3>
            </div>
            
            <p className="text-gray-400 text-base mb-6 font-medium leading-relaxed">
              Static scans alert <span className="font-bold text-red-500">hours later</span>.<br/>Agents execute malicious chains in <span className="font-bold text-pink-500">seconds</span>.
            </p>

            <div className="flex flex-col gap-4 mt-auto relative z-10">
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-xl opacity-60">
                <span className="text-base font-semibold text-gray-500 line-through">Batch Collection</span>
                <Clock size={20} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between bg-pink-50 border border-pink-200 p-4 rounded-xl">
                <span className="text-base font-bold text-pink-600">Real-time Exfiltration</span>
                <Zap size={20} className="text-pink-500" />
              </div>
            </div>
          </motion.div>

          {/* 2. Context Blindspots */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 bg-white border border-gray-700 rounded-xl p-6 flex flex-col relative overflow-hidden group hover:border-pink-500/40 transition-colors"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-pink-50 p-3 rounded-xl text-pink-500"><Network size={24} /></div>
              <h3 className="font-bold text-gray-200 text-xl">Context Blindspots</h3>
            </div>
            
            <p className="text-gray-400 text-base mb-6 font-medium leading-relaxed">
              Individual tools look benign.<br/>The <span className="font-bold text-gray-100">chain of context</span> carries the danger.
            </p>

            <div className="flex items-center justify-between mt-auto px-1 relative z-10">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 text-lg font-bold mx-auto mb-2 shadow-sm border border-gray-100">P</div>
                <span className="text-xs uppercase font-bold text-gray-400">Prompt</span>
              </div>
              <ArrowRight size={20} className="text-gray-300" />
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 text-lg font-bold mx-auto mb-2 shadow-sm border border-gray-100">R</div>
                <span className="text-xs uppercase font-bold text-gray-400">Reason</span>
              </div>
              <ArrowRight size={20} className="text-gray-300" />
              <div className="text-center relative">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 border border-red-200 text-lg font-bold mx-auto mb-2 relative shadow-sm">
                  T
                  <AlertTriangle size={14} className="absolute -top-1.5 -right-1.5 text-red-500 bg-white rounded-full" />
                </div>
                <span className="text-xs uppercase font-bold text-red-500">Malicious</span>
              </div>
            </div>
          </motion.div>

          {/* 3. Heterogeneity */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1 bg-white border border-gray-700 rounded-xl p-6 flex flex-col relative overflow-hidden group hover:border-pink-500/40 transition-colors"
          >
             <div className="mb-4 flex items-center gap-3">
              <div className="bg-pink-50 p-3 rounded-xl text-pink-500"><Layers size={24} /></div>
              <h3 className="font-bold text-gray-200 text-xl">Heterogeneity</h3>
            </div>
            
            <p className="text-gray-400 text-base mb-6 font-medium leading-relaxed">
              Every agent shifts telemetry.<br/>Custom code across 50 schemas is fragile.
            </p>

            <div className="mt-auto grid grid-cols-2 gap-3 relative z-10">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-1.5">
                <span className="text-[11px] uppercase font-bold text-pink-500 text-center">OpenClaw</span>
                <span className="text-sm font-mono text-gray-500 text-center">msg_recv</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-1.5">
                <span className="text-[11px] uppercase font-bold text-pink-500 text-center">Claude</span>
                <span className="text-sm font-mono text-gray-500 text-center">usr_pmpt</span>
              </div>
              <div className="col-span-2 flex justify-center -mt-3 -mb-3 relative z-20">
                <div className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100"><Unlink size={20} className="text-red-500" /></div>
              </div>
              <div className="col-span-2 bg-red-50 border border-red-200 text-red-500 text-sm font-bold text-center py-3 rounded-xl">
                Unmaintainable Logic
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Solution Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="shrink-0 bg-[#F7F6F6] border border-gray-300 rounded-xl p-3 flex items-center justify-between"
        >
          <div className="flex-1 pr-4">
             <div className="text-xs uppercase font-black text-pink-500 tracking-widest mb-1">The AgentGuard Advantage</div>
             <h2 className="text-lg font-black text-[black] tracking-tight leading-snug">
               Streaming SQL engine for continuous, low-latency processing.
             </h2>
             <p className="text-gray-500 text-sm mt-1 font-medium">Normalizes data natively while catching events the millisecond they happen.</p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <div className="bg-white px-5 py-3 rounded-xl flex items-center gap-3 border border-pink-200 shadow-lg shadow-pink-500/10">
              <img src={timeplusLogo} alt="Timeplus" className="h-8 w-auto" />
              <span className="text-black font-black text-base">Timeplus Engine</span>
            </div>
          </div>
        </motion.div>
        
      </div>
    </SlideLayout>
  );
}
