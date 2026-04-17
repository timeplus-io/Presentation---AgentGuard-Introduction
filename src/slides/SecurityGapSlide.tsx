import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { Bug, FileWarning, ShieldAlert, EyeOff, ShieldQuestion } from 'lucide-react';

export function SecurityGapSlide() {
  const threats = [
    {
      icon: <Bug size={20} />,
      title: 'Month of AI Bugs',
      source: 'Johann Rehberger, Aug 2025',
      desc: 'Prompt injection vulnerabilities demonstrated across every major AI platform tested — each assigned a formal CVE.'
    },
    {
      icon: <FileWarning size={20} />,
      title: 'Invisible Backdoors',
      source: 'Pillar Security',
      desc: 'Invisible Unicode characters in agent configuration files directed agents to inject backdoors into all subsequent outputs.'
    },
    {
      icon: <ShieldAlert size={20} />,
      title: 'OWASP Top 10 for Agents',
      source: 'Released Dec 2025',
      desc: 'Codified ten categories of agent-specific threats including excessive permissions, prompt injection, and trust breakdowns.'
    }
  ];

  return (
    <SlideLayout 
      title="The Security Reality" 
      subtitle="Rapid agent adoption has severely outpaced security and governance."
    >
      <div className="flex flex-col h-full gap-6 px-8 pb-4 pt-4">
        
        <div className="flex flex-1 gap-8 min-h-0">
          {/* Left Column: Threats */}
          <div className="flex-1 flex flex-col gap-3 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-px before:bg-gray-700 before:-z-10">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1 pl-1">Vulnerability Landscape</h3>
            
            {threats.map((threat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (i * 0.15) }}
                className="bg-white border border-gray-700 p-4 rounded-xl shadow-sm flex gap-4 items-start"
              >
                <div className="bg-red-500/10 text-red-500 p-2.5 rounded-lg shrink-0 mt-0.5">
                  {threat.icon}
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-1 gap-2">
                    <h4 className="font-bold text-gray-100 text-sm">{threat.title}</h4>
                    <span className="text-[10px] text-gray-500 font-mono tracking-tighter whitespace-nowrap">{threat.source}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{threat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: The Data Gap */}
          <div className="flex-[1.2] flex flex-col gap-4">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1 pl-1">The Governance Gap</h3>
            
            {/* Cybersecurity Insiders */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-700 p-5 rounded-xl shadow-sm flex flex-col justify-center"
            >
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">Cybersecurity Insiders</div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-100 mb-1.5">
                    <span>AI Tools Deployed</span><span>73%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div initial={{width:0}} animate={{width:'73%'}} transition={{delay: 0.5, duration: 1}} className="bg-gray-400 h-full rounded-full"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-100 mb-1.5">
                    <span>Real-time Governance</span><span className="text-red-500">7%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div initial={{width:0}} animate={{width:'7%'}} transition={{delay: 0.6, duration: 0.8}} className="bg-red-500 h-full rounded-full"></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Split Metrics: NeuralTrust & Akto */}
            <div className="flex gap-4 min-h-0 flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex-1 bg-white border border-gray-700 p-5 rounded-xl shadow-sm flex flex-col"
              >
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">NeuralTrust CISOs</div>
                <div className="flex flex-col h-full justify-around mt-1">
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-right font-bold text-gray-200 text-lg">73%</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full flex"><div className="bg-gray-400 h-full rounded-full w-[73%]"></div></div>
                    <span className="text-xs font-semibold text-gray-400 w-20">Critically<br/>Concerned</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-right font-bold text-pink-500 text-lg">30%</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full flex"><div className="bg-pink-500 h-full rounded-full w-[30%]"></div></div>
                    <span className="text-xs font-semibold text-gray-400 w-20">Mature<br/>Safeguards</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex-[0.8] bg-white border border-gray-700 p-5 rounded-xl shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <EyeOff className="absolute -right-4 -bottom-4 w-24 h-24 text-gray-800/50" />
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2 z-10">Akto Report</div>
                <div className="text-4xl font-bold text-red-500 tracking-tighter mb-1 z-10">79%</div>
                <p className="text-[11px] font-semibold text-gray-300 z-10 leading-snug">
                  of enterprises operate with <span className="text-gray-100 font-bold">unobservable security blindspots</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, scaleY: 0.9 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.9 }}
          className="shrink-0 bg-pink-500 rounded-xl p-5 shadow-xl flex items-center justify-between border border-pink-400"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <ShieldQuestion size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              AgentGuard was built to close that gap.
            </h2>
          </div>
          <p className="text-pink-100 text-sm font-medium">From vulnerable autonomy to governed fleets.</p>
        </motion.div>

      </div>
    </SlideLayout>
  );
}
