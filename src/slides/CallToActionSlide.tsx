import { motion } from 'motion/react';
import { SlideLayout } from '../components/Presentation';
import { ExternalLink, BookOpen, FileText, Download, Slack, Github } from 'lucide-react';
import architectureImg from '../assets/architecture.avif';

const resources = [
  {
    icon: <ExternalLink size={16} />,
    label: 'Product Page',
    url: 'https://www.timeplus.com/agentguard',
    color: 'bg-pink-50 border-pink-200 text-pink-600',
    iconColor: 'bg-pink-100 text-pink-500',
  },
  {
    icon: <FileText size={16} />,
    label: 'Blog Post',
    url: 'https://www.timeplus.com/post/agentguard',
    color: 'bg-orange-50 border-orange-200 text-orange-600',
    iconColor: 'bg-orange-100 text-orange-500',
  },
  {
    icon: <BookOpen size={16} />,
    label: 'Documentation',
    url: 'https://docs.timeplus.com/agentguard-introduction',
    color: 'bg-sky-50 border-sky-200 text-sky-600',
    iconColor: 'bg-sky-100 text-sky-500',
  },
  {
    icon: <Download size={16} />,
    label: 'Install Guide',
    url: 'https://docs.timeplus.com/agentguard-installation',
    color: 'bg-violet-50 border-violet-200 text-violet-600',
    iconColor: 'bg-violet-100 text-violet-500',
  },
  {
    icon: <Slack size={16} />,
    label: 'Join Slack Community',
    url: 'https://timeplus.com/slack',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    iconColor: 'bg-emerald-100 text-emerald-500',
  },
  {
    icon: <Github size={16} />,
    label: 'Proton (Open Source Engine)',
    url: 'https://github.com/timeplus-io/proton',
    color: 'bg-gray-50 border-gray-200 text-gray-600',
    iconColor: 'bg-gray-100 text-gray-500',
  },
];

export function CallToActionSlide() {
  return (
    <SlideLayout title="Get Started with AgentGuard" subtitle="From vulnerable autonomy to governed fleets — in minutes.">
      <div className="flex h-full gap-6 pb-2">

        {/* Left: Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="flex-1 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden"
        >
          <img
            src={architectureImg}
            alt="AgentGuard Architecture"
            className="w-full h-full object-contain p-3"
          />
        </motion.div>

        {/* Right: Resource links */}
        <motion.div
          initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col justify-start gap-3"
        >
          {resources.map((r, i) => (
            <motion.a
              key={r.label}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
              className={`flex items-center gap-3 border rounded-xl px-4 py-3 hover:shadow-md transition-shadow ${r.color}`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${r.iconColor}`}>{r.icon}</div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-black">{r.label}</span>
                <span className="text-sm font-mono opacity-60 truncate">{r.url}</span>
              </div>
              <ExternalLink size={13} className="ml-auto shrink-0 opacity-40" />
            </motion.a>
          ))}
        </motion.div>

      </div>
    </SlideLayout>
  );
}
