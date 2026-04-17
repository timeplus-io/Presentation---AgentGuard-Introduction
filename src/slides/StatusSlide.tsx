import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { TrendingUp, FileText, Database, Terminal, Cloud, Webhook, Briefcase } from 'lucide-react';

export function StatusSlide() {
  const capabilities = [
    { icon: <FileText size={18} />, label: "Draft documents" },
    { icon: <Database size={18} />, label: "Query databases" },
    { icon: <Terminal size={18} />, label: "Execute shell commands" },
    { icon: <Cloud size={18} />, label: "Manage cloud infrastructure" },
    { icon: <Webhook size={18} />, label: "Interact with external APIs" },
  ];

  return (
    <SlideLayout 
      title="The Current Status of AI Agents" 
      subtitle="Agents are moving from scattered experiments to enterprise production at scale."
    >
      <div className="flex h-full gap-12 mt-4 px-8 items-start">
        
        {/* Left Column: Context & Capabilities */}
        <div className="flex-[1.2] flex flex-col pt-4">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 font-medium mb-6 leading-relaxed"
          >
            AI agents are everywhere. They operate autonomously, often chaining multiple tools together in a single session:
          </motion.p>
          
          <div className="flex flex-col gap-3">
            {capabilities.map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-3 bg-white border border-gray-700 px-4 py-3 rounded-lg shadow-sm w-4/5 hover:border-pink-500/30 transition-colors"
              >
                <div className="text-pink-500 bg-pink-500/10 p-2 rounded-md shrink-0">
                  {cap.icon}
                </div>
                <span className="font-semibold text-gray-200 text-sm">{cap.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Key Stats */}
        <div className="flex-[1.5] grid grid-cols-2 gap-6">
          {/* Gartner Stat (Spans Full Width) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="col-span-2 bg-white border border-gray-700 p-8 rounded-2xl shadow-lg relative overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl"></div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Gartner Projection</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[5rem] font-bold text-gray-100 leading-none tracking-tighter">40<span className="text-pink-500">%</span></span>
            </div>
            <p className="text-gray-300 font-medium max-w-lg text-lg leading-snug">
              of enterprise applications will embed AI agents by the end of 2026, up from less than <span className="font-bold text-gray-100 mb-1 inline-block">5%</span> in early 2025.
            </p>
          </motion.div>

          {/* McKinsey Stats (Side by Side) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <Briefcase size={14} className="text-pink-500" /> McKinsey 2025
            </div>
            <div className="text-[3.5rem] font-bold text-gray-100 leading-none mb-2 tracking-tighter relative z-10">
              62<span className="text-pink-500">%</span>
            </div>
            <p className="text-sm font-medium text-gray-300 leading-snug relative z-10">
              of organizations are currently <span className="text-gray-100 font-bold">experimenting</span> with agentic AI.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-pink-500" /> McKinsey 2025
            </div>
            <div className="text-[3.5rem] font-bold text-gray-100 leading-none mb-2 tracking-tighter relative z-10">
              23<span className="text-pink-500">%</span>
            </div>
            <p className="text-sm font-medium text-gray-300 leading-snug relative z-10">
              are already <span className="text-gray-100 font-bold">scaling agents</span> in production environments.
            </p>
          </motion.div>

        </div>

      </div>
    </SlideLayout>
  );
}
