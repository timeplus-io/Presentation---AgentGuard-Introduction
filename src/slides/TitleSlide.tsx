import { ShieldCheck, Bot, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import agentGuardLogo from '../assets/timeplus-agentguard_logo-pink.svg';
import mascot from '../assets/AgentGuard Tabby.png';

export function TitleSlide() {
  return (
    <div className="flex flex-row items-center justify-between h-full w-full relative overflow-hidden bg-transparent px-16">
      
      {/* Left part: Title and Text */}
      <div className="flex-1 flex flex-col items-start justify-center text-left z-10 w-1/2">
        <div className="relative mb-6 self-start">
          <motion.img
            src={mascot}
            alt="AgentGuard Tabby"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-10 -left-6 h-16 w-auto drop-shadow-lg z-10"
          />
          <motion.img
            src={agentGuardLogo}
            alt="AgentGuard"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-24 lg:h-28 w-auto drop-shadow-lg"
          />
        </div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl lg:text-3xl max-w-xl text-gray-400 font-medium"
        >
          Real-time security monitoring & governance for AI agent fleets.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-6 text-sm font-semibold text-gray-500"
        >
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-800/20 rounded-full border border-gray-700 shadow-sm backdrop-blur-md text-gray-400"><Activity className="w-4 h-4 text-pink-500" /> Live Visibility</span>
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-800/20 rounded-full border border-gray-700 shadow-sm backdrop-blur-md text-gray-400"><ShieldCheck className="w-4 h-4 text-pink-500" /> Threat Prevention</span>
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-800/20 rounded-full border border-gray-700 shadow-sm backdrop-blur-md text-gray-400"><Bot className="w-4 h-4 text-pink-500" /> Multi-Agent</span>
        </motion.div>
      </div>

      {/* Right part: Visualization */}
      <div className="flex-1 absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none opacity-80">
        
        {/* Background glow */}
        <div className="absolute w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-3xl"></div>

        {/* Radar / Shield Rings */}
        <motion.div
          animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-96 h-96 border-2 border-pink-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
          className="absolute w-96 h-96 border-2 border-pink-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 2 }}
          className="absolute w-96 h-96 border-2 border-pink-500 rounded-full"
        />
        
        {/* Orbiting Agent Nodes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px]"
        >
          <div className="absolute top-0 left-1/2 -ml-6 p-3 bg-gray-900 border-2 border-gray-700 text-pink-400 rounded-full shadow-lg shadow-pink-500/20">
             <Bot className="w-6 h-6" />
          </div>
          <div className="absolute bottom-0 right-1/2 -mr-6 p-3 bg-gray-900 border-2 border-gray-700 text-pink-400 rounded-full shadow-lg shadow-pink-500/20">
             <Bot className="w-6 h-6" />
          </div>
          <div className="absolute top-1/2 -left-6 -mt-6 p-3 bg-gray-900 border-2 border-gray-700 text-pink-400 rounded-full shadow-lg shadow-pink-500/20">
             <Bot className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Central Core */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute z-10 p-8 bg-gray-900 rounded-full text-pink-500 shadow-[0_0_60px_rgba(213,63,140,0.3)] border-2 border-pink-500/30 backdrop-blur"
        >
          <ShieldCheck className="w-20 h-20" />
        </motion.div>
      </div>

    </div>
  );
}
