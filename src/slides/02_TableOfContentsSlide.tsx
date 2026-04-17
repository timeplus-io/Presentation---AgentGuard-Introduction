// Page 2
import { motion } from 'motion/react';
import { SlideLayout, useSlideNav } from '../components/Presentation';
import { TrendingUp, ShieldOff, AlertTriangle, Zap, Layers, Database, GitMerge, Activity, Bell, Play, ExternalLink } from 'lucide-react';

const ITEMS = [
  { index: 2, num: '03', label: 'The Current Status of AI Agents', desc: 'Scale, economics, and the growing risk surface', icon: TrendingUp, color: 'bg-blue-500', ring: 'ring-blue-200', card: 'bg-blue-50 border-blue-200' },
  { index: 3, num: '04', label: 'The Security Reality', desc: 'What is being exploited and why it matters', icon: ShieldOff, color: 'bg-red-500', ring: 'ring-red-200', card: 'bg-red-50 border-red-200' },
  { index: 4, num: '05', label: 'Why Existing Tools Fall Short', desc: 'Gaps in today\'s observability for agentic workloads', icon: AlertTriangle, color: 'bg-amber-500', ring: 'ring-amber-200', card: 'bg-amber-50 border-amber-200' },
  { index: 5, num: '06', label: 'What AgentGuard Does', desc: 'Real-time security across any AI agent framework', icon: Zap, color: 'bg-pink-500', ring: 'ring-pink-200', card: 'bg-pink-50 border-pink-200' },
  { index: 6, num: '07', label: 'How AgentGuard Is Designed', desc: 'Collection → CIM → Detection → Live UI', icon: Layers, color: 'bg-violet-500', ring: 'ring-violet-200', card: 'bg-violet-50 border-violet-200' },
  { index: 7, num: '08', label: 'Data Collection: Two Paths In', desc: 'Hook events and OTel from OpenClaw and Claude Code', icon: Database, color: 'bg-sky-500', ring: 'ring-sky-200', card: 'bg-sky-50 border-sky-200' },
  { index: 8, num: '09', label: 'Common Information Model', desc: 'One schema for all agents — rules written once', icon: GitMerge, color: 'bg-orange-500', ring: 'ring-orange-200', card: 'bg-orange-50 border-orange-200' },
  { index: 9, num: '10', label: 'Streaming Detection', desc: 'SQL materialized views as always-on security rules', icon: Activity, color: 'bg-pink-500', ring: 'ring-pink-200', card: 'bg-pink-50 border-pink-200' },
  { index: 10, num: '11', label: 'Alert Pipeline', desc: 'Detection → dedup → lifecycle → live browser UI', icon: Bell, color: 'bg-red-500', ring: 'ring-red-200', card: 'bg-red-50 border-red-200' },
  { index: 11, num: '12', label: 'Live Demo', desc: 'See AgentGuard catch real threats in real time', icon: Play, color: 'bg-green-500', ring: 'ring-green-200', card: 'bg-green-50 border-green-200' },
  { index: 12, num: '13', label: 'Get Started', desc: 'Docs, install guide, Slack, and GitHub', icon: ExternalLink, color: 'bg-gray-500', ring: 'ring-gray-200', card: 'bg-gray-50 border-gray-200' },
];

const COL_A = ITEMS.slice(0, 6);
const COL_B = ITEMS.slice(6);

function TimelineColumn({ items, delay = 0 }: { items: typeof ITEMS; delay?: number }) {
  const { goToSlide } = useSlideNav();
  return (
    <div className="relative flex flex-col gap-0">
      {/* vertical line */}
      <div className="absolute left-5 top-5 bottom-5 w-px bg-gray-200 z-0" />
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + i * 0.06 }}
            className="relative flex items-start gap-3 py-1.5 cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); goToSlide(item.index); }}
          >
            {/* badge */}
            <div className={`shrink-0 z-10 w-11 h-11 rounded-full ${item.color} ring-4 ${item.ring} flex items-center justify-center`}>
              <Icon size={20} className="text-white" />
            </div>
            {/* card */}
            <div className={`flex-1 border rounded-xl px-4 py-3 ${item.card} group-hover:brightness-95 transition-all`}>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-400 leading-tight">{item.label}</span>
              </div>
              <p className="text-sm text-gray-300 mt-0.5 leading-snug">{item.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function TableOfContentsSlide() {
  return (
    <SlideLayout title="Agenda">
      <div className="grid grid-cols-2 gap-6 h-full">
        <TimelineColumn items={COL_A} delay={0.05} />
        <TimelineColumn items={COL_B} delay={0.38} />
      </div>
    </SlideLayout>
  );
}
