import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Highlight, themes } from 'prism-react-renderer';
import { SlideLayout } from '../components/Presentation';
import { Code2, X, Zap } from 'lucide-react';

function FlowDot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${color}`}
      animate={{ left: ['-8px', 'calc(100% + 8px)'] }}
      transition={{ duration: 1.2, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function Pipe({ color, children }: { color: string; children?: React.ReactNode }) {
  return (
    <div className="relative flex-1 h-1.5 flex items-center">
      <div className={`w-full h-0.5 ${color}`} />
      {children}
    </div>
  );
}

const rules = [
  {
    id: 'rp-001', name: 'Prompt Injection Shield', severity: 'critical',
    events: ['user_input', 'llm_request'], version: '1.1.0',
    sql: `SELECT
  event_time AS detected_at,
  'rp-001'   AS rule_id,
  'critical' AS severity,
  agent_id, session_id, run_id,
  concat('Prompt injection in ', raw_hook_name,
    ' from agent ', agent_id) AS message
FROM agentguard_cim_event
WHERE event_type IN ('user_input', 'llm_request')
  AND (
    lower(user_message) LIKE '%ignore previous instructions%'
    OR lower(user_message) LIKE '%ignore all previous%'
    OR lower(user_message) LIKE '%disregard your instructions%'
    OR match(lower(user_message), '\\bjailbroken?\\b')
    OR match(lower(user_message), '\\byou are now (a|an|the)\\b')
    OR match(lower(user_message), '\\b(dan mode|developer mode|god mode)\\b')
    OR match(lower(user_message), '\\bassistant:\\s*sure')
    OR match(lower(user_message), '\\bif .{0,40} then (ignore|disregard|forget)\\b')
    OR lower(user_message) LIKE '%aWdub3Jl%'
  )`,
  },
  {
    id: 'rp-002', name: 'DLP Sentinel', severity: 'critical',
    events: ['tool_complete', 'llm_response'], version: '1.1.0',
    sql: `SELECT
  event_time   AS detected_at,
  'rp-002'     AS rule_id,
  'critical'   AS severity,
  agent_id, session_id, run_id,
  concat('Sensitive data in ', raw_hook_name,
    ' from agent ', agent_id) AS message
FROM agentguard_cim_event
WHERE event_type IN ('tool_complete', 'llm_response')
  AND session_id != ''
  AND (
    match(concat(tool_result,' ',assistant_message),
      '[0-9]{3}-[0-9]{2}-[0-9]{4}')
    OR lower(concat(tool_result,' ',assistant_message)) LIKE '%sk-ant-%'
    OR lower(concat(tool_result,' ',assistant_message)) LIKE '%ghp_%'
    OR lower(concat(tool_result,' ',assistant_message)) LIKE '%bearer %'
    OR lower(concat(tool_result,' ',assistant_message)) LIKE '%aws_secret%'
    OR match(concat(tool_result,' ',assistant_message), 'sk-[a-zA-Z0-9]{32,}')
    OR match(concat(tool_result,' ',assistant_message),
      'ey[a-zA-Z0-9_\\-]{10,}\\.[a-zA-Z0-9_\\-]{10,}\\.[a-zA-Z0-9_\\-]{10,}')
    OR lower(concat(tool_result,' ',assistant_message)) LIKE '%begin private key%'
  )`,
  },
  {
    id: 'rp-003', name: 'Privilege Guard', severity: 'warning',
    events: ['tool_invoke'], version: '1.1.0',
    sql: `SELECT
  event_time        AS detected_at,
  'rp-003'          AS rule_id,
  'warning'         AS severity,
  agent_id, session_id, run_id,
  concat('Dangerous command: ', tool_name,
    ' by agent ', agent_id) AS message
FROM agentguard_cim_event
WHERE event_type = 'tool_invoke'
  AND (
    lower(tool_name) IN ('bash','shell','exec','run_terminal_cmd')
    OR lower(tool_input) LIKE '%sudo %'
    OR lower(tool_input) LIKE '%rm -rf%'
    OR lower(tool_input) LIKE '%/etc/passwd%'
    OR lower(tool_input) LIKE '%/etc/shadow%'
    OR match(tool_input, '\`[^\`]{1,200}\`')
    OR match(tool_input, '\\$\\([^)]{1,200}\\)')
    OR match(lower(tool_input), '\\bnsenter\\b')
    OR lower(tool_input) LIKE '%--privileged%'
    OR match(lower(tool_input), '\\bcrontab\\s+-[el]\\b')
  )`,
  },
  {
    id: 'rp-004', name: 'Supply Chain Watch', severity: 'warning',
    events: ['tool_invoke'], version: '1.1.0',
    sql: `SELECT
  event_time           AS detected_at,
  'rp-004'             AS rule_id,
  'warning'            AS severity,
  agent_id, session_id, run_id,
  concat('Package install by agent ', agent_id,
    ' via ', tool_name) AS message
FROM agentguard_cim_event
WHERE event_type = 'tool_invoke'
  AND (
    lower(tool_input) LIKE '%npm install%'
    OR lower(tool_input) LIKE '%pip install%'
    OR lower(tool_input) LIKE '%yarn add%'
    OR lower(tool_input) LIKE '%cargo install%'
    OR lower(tool_input) LIKE '%apt-get install%'
    OR lower(tool_input) LIKE '%brew install%'
    OR lower(tool_input) LIKE '%uv add%'
    OR lower(tool_input) LIKE '%pipx install%'
    OR match(lower(tool_input), '\\bcurl\\b.{0,100}\\|\\s*(ba)?sh\\b')
    OR match(lower(tool_input), '\\bwget\\b.{0,100}\\|\\s*(ba)?sh\\b')
    OR match(lower(tool_input), '\\bpip\\s+install\\b.{0,100}--(?:extra-)?index-url\\b')
  )`,
  },
];

const severityStyle = {
  critical: { badge: 'bg-red-50 border-red-200 text-red-400', border: 'border-l-red-400', dot: 'bg-red-400' },
  warning: { badge: 'bg-amber-50 border-amber-200 text-amber-400', border: 'border-l-amber-400', dot: 'bg-amber-400' },
};

export function StreamingDetectionSlide() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = rules.find(r => r.id === selectedId) ?? null;

  return (
    <SlideLayout
      title="Streaming Detection"
      subtitle="Security rules as Timeplus materialized views — SQL-native, agent-agnostic, always-on."
    >
      <div className="flex flex-col h-full gap-3 pt-1 pb-2 px-2">

        {/* Pipeline — prominent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border-2 border-pink-100 rounded-2xl p-4 shrink-0"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-pink-400" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Detection Pipeline</span>
          </div>
          <div className="flex items-center gap-0 w-full">
            {/* CIM source */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-pink-50 border-2 border-pink-200 rounded-xl px-4 py-3 text-center shrink-0 whitespace-nowrap">
              <div className="text-xs font-black text-pink-400">agentguard_cim_event</div>
            </motion.div>

            <Pipe color="bg-pink-200">
              <FlowDot color="bg-pink-400" delay={0} />
              <FlowDot color="bg-pink-400" delay={0.4} />
              <FlowDot color="bg-pink-400" delay={0.8} />
            </Pipe>

            {/* Rule MV */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
              className="bg-violet-50 border-2 border-violet-200 rounded-xl px-4 py-3 text-center shrink-0">
              <div className="text-xs font-black text-violet-400">mv_rule_&lt;id&gt;</div>
              <div className="text-xs text-gray-400 font-mono mt-0.5">Streaming SQL Detection Logic</div>
            </motion.div>

            <Pipe color="bg-red-200">
              <FlowDot color="bg-red-400" delay={0.2} />
              <FlowDot color="bg-red-400" delay={0.6} />
              <FlowDot color="bg-red-400" delay={1.0} />
            </Pipe>

            {/* Output */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3 text-center shrink-0 whitespace-nowrap">
              <div className="text-xs font-black text-red-400">agentguard_security_events</div>
            </motion.div>

          </div>
        </motion.div>

        {/* Bottom: rules + code */}
        <div className="flex gap-3 flex-1 min-h-0">

          {/* Rule list */}
          <div className="flex flex-col gap-2 w-[46%] shrink-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Built-in Rules</span>
              <div className="flex gap-2 text-xs font-bold">
                <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Critical</span>
                <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Warning</span>
              </div>
            </div>
            {rules.map((rule, i) => {
              const s = severityStyle[rule.severity as keyof typeof severityStyle];
              const isSelected = selectedId === rule.id;
              return (
                <motion.div key={rule.id}
                  initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                  className={`bg-white border border-l-4 ${s.border} border-gray-100 rounded-xl p-3 flex items-center gap-3 ${isSelected ? 'ring-2 ring-violet-300' : ''}`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-200 truncate">{rule.name}</span>
                      <span className={`text-[10px] font-bold border rounded-full px-1.5 py-0.5 shrink-0 ${s.badge}`}>{rule.id}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {rule.events.map(e => (
                        <span key={e} className="text-[10px] font-mono font-bold bg-pink-50 border border-pink-200 text-pink-400 px-1.5 py-0.5 rounded">{e}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedId(isSelected ? null : rule.id)}
                    className={`shrink-0 flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${isSelected ? 'bg-violet-500 text-white border-violet-500' : 'bg-violet-50 text-violet-400 border-violet-200 hover:bg-violet-100'}`}
                  >
                    <Code2 size={12} />
                    {isSelected ? 'Hide' : 'SQL'}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* SQL viewer */}
          <div className="flex-1 min-w-0 min-h-0">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.id}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-200">{selected.id}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-400">{selected.name}</span>
                      <span className="text-[10px] font-mono text-gray-200 bg-gray-500 px-1.5 py-0.5 rounded">v{selected.version}</span>
                    </div>
                    <button onClick={() => setSelectedId(null)} className="text-gray-400 hover:text-gray-700 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                  <Highlight theme={themes.github} code={selected.sql} language="sql">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre className={`${className} flex-1 overflow-auto p-4 text-xs leading-relaxed m-0`} style={style}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </motion.div>
              ) : (
                <motion.div key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full bg-gray-50 border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-2"
                >
                  <Code2 size={28} className="text-gray-400" />
                  <span className="text-sm font-bold text-gray-400">Click SQL on a rule to view its materialized view query</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </SlideLayout>
  );
}
