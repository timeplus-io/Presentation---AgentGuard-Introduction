import { useCallback, useState } from 'react';
import { LayoutDashboard, ShieldAlert, DollarSign, DatabaseZap, Network, FileDown, Layers } from 'lucide-react';
import timeplusLogo from '../assets/timeplus-circles_for-light-bg.svg';
import { motion } from 'motion/react';
import { SlideLayout, useSlideStep } from '../components/Presentation';

const TOTAL_STEPS = 4;

export function CapabilitiesSlide() {
  const [revealed, setRevealed] = useState(0);
  const stepHandler = useCallback(() => {
    if (revealed < TOTAL_STEPS) { setRevealed(n => n + 1); return true; }
    return false;
  }, [revealed]);
  useSlideStep(revealed < TOTAL_STEPS ? stepHandler : null);

  const show = (n: number) => revealed >= n;

  const capabilities = [
    {
      icon: <LayoutDashboard size={24} />,
      title: "Live Security Dashboard",
      desc: "Monitor active threats, agent activity, and KPIs in real-time."
    },
    {
      icon: <Network size={24} />,
      title: "Agent Fleet View",
      desc: "Drill down into session history via waterfall execution traces."
    },
    {
      icon: <ShieldAlert size={24} />,
      title: "Threat Feed",
      desc: "Track detection lifecycles from open to resolution automatically."
    },
    {
      icon: <DollarSign size={24} />,
      title: "Cost Governance",
      desc: "Token breakdowns, cache tracking, and deep pricing configuration."
    },
    {
      icon: <DatabaseZap size={24} />,
      title: "Investigation Console",
      desc: "Run ad-hoc queries via Streaming SQL against raw event traces."
    }
  ];

  return (
    <SlideLayout
      title="What AgentGuard Does"
      subtitle="A powerful real-time platform bridging agent autonomy and enterprise security."
    >
      <div className="flex flex-col h-full gap-8 pt-4 px-2 pb-2">

        {/* AntV Inspired: Sequence Steps Badge Card */}
        <div className="relative flex justify-between items-stretch gap-8 w-full shrink-0 px-2 mt-4">
          {/* Connecting Background Line */}
          <div className="absolute left-[15%] right-[15%] top-[40%] -translate-y-1/2 h-1.5 bg-pink-100 z-0 rounded-full"></div>

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={show(1) ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex-[1] bg-white border border-gray-100 rounded-3xl p-5 pt-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center overflow-visible group hover:-translate-y-1 transition-transform"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-pink-500 text-white font-black text-xl flex items-center justify-center border-4 border-[#F7F6F6] shadow-md group-hover:rotate-6 transition-transform">1</div>
            <div className="bg-pink-50 p-3 rounded-full mb-3 text-pink-500"><FileDown size={24} /></div>
            <h3 className="font-bold text-[black] text-lg leading-tight mb-1">Collect & Normalize</h3>
            <p className="text-gray-500 text-xs font-medium">OpenClaw, Claude Code & More</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={show(2) ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex-[1] bg-white border border-gray-100 rounded-3xl p-5 pt-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center overflow-visible group hover:-translate-y-1 transition-transform"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-pink-500 text-white font-black text-xl flex items-center justify-center border-4 border-[#F7F6F6] shadow-md group-hover:-rotate-6 transition-transform">2</div>
            <div className="bg-pink-50 p-3 rounded-full mb-3 flex items-center justify-center"><img src={timeplusLogo} alt="Timeplus" className="w-6 h-6" /></div>
            <h3 className="font-bold text-[black] text-lg leading-tight mb-1">Threat Detection with Streaming SQL</h3>
            <p className="text-gray-500 text-xs font-medium">Real-time Rule Engine</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={show(3) ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex-[1] bg-white border border-gray-100 rounded-3xl p-5 pt-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center overflow-visible group hover:-translate-y-1 transition-transform"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-pink-500 text-white font-black text-xl flex items-center justify-center border-4 border-[#F7F6F6] shadow-md group-hover:rotate-6 transition-transform">3</div>
            <div className="bg-pink-50 p-3 rounded-full mb-3 text-pink-500"><Layers size={24} /></div>
            <h3 className="font-bold text-[black] text-lg leading-tight mb-1">Live Surface</h3>
            <p className="text-gray-500 text-xs font-medium">Threats & Cost</p>
          </motion.div>
        </div>

        {/* AntV Inspired: List Grid Candy Card Lite */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 min-h-0 flex-1 mt-2">
          {capabilities.map((c, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={show(4) ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`bg-white border-l-4 border-l-pink-400 border-y border-r border-gray-100 px-5 py-4 rounded-2xl flex items-center gap-5 hover:bg-pink-50/20 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all group ${i === 4 ? 'col-span-2 w-2/3 mx-auto' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex shrink-0 items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shadow-sm border border-pink-100">
                {c.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[black] text-lg mb-0.5 tracking-tight">{c.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
