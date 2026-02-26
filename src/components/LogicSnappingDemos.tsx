import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Table, Search, Zap, CheckCircle2, AlertTriangle, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

// Shared hook: trigger animation on viewport entry + auto-replay every N seconds
function useViewportLoop(intervalSec: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // When entering viewport, kick off first cycle
  useEffect(() => {
    if (inView) setCycle(c => c + 1);
  }, [inView]);

  // Auto-replay while in viewport
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setCycle(c => c + 1), intervalSec * 1000);
    return () => clearInterval(id);
  }, [inView, intervalSec]);

  return { ref, cycle, inView };
}

/* ═══════════════════════════════════════════
   PROMPT A: 乐高积木组件 — 呼吸灯 + 接口
   ═══════════════════════════════════════════ */

const SkillBlock = ({ icon, label, delay, glowColor = 'blue', cycle }: {
  icon: React.ReactNode; label: string; delay: number; glowColor?: string; cycle: number;
}) => {
  const colors = glowColor === 'amber'
    ? { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/5' }
    : { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/5' };

  return (
    <motion.div
      key={cycle}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className="relative group"
    >
      <div className={`absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-3 h-5 rounded-r-full ${colors.bg} border ${colors.border} border-l-0`} />
      <div className={`absolute right-0 top-1/2 translate-x-1.5 -translate-y-1/2 w-3 h-5 rounded-l-full bg-zinc-900 border ${colors.border} border-r-0`} />

      <motion.div
        animate={{ boxShadow: ['0 0 8px rgba(59,130,246,0.05)', '0 0 20px rgba(59,130,246,0.15)', '0 0 8px rgba(59,130,246,0.05)'] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay * 0.5 }}
        className={`relative px-5 py-3.5 rounded-xl backdrop-blur-md bg-zinc-900/70 border ${colors.border} cursor-default`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`${colors.text} opacity-60`}>{icon}</span>
          <span className={`text-sm font-medium ${colors.text}`}>{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const DemoA_SkillBlocks = () => {
  const { ref, cycle } = useViewportLoop(8);

  return (
    <div ref={ref} className="rounded-2xl border border-zinc-800/50 bg-[#0a0a0a] p-8 md:p-10">
      <div className="text-center mb-2">
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest">方案 A</span>
      </div>
      <h3 className="text-lg font-semibold text-zinc-100 text-center mb-2">Skill Blocks — 金融乐高积木</h3>
      <p className="text-xs text-zinc-500 text-center mb-8 max-w-md mx-auto">
        每个 Skill 是一块标准化积木，左侧公头、右侧母头。悬停时呼吸灯发光。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <SkillBlock icon={<Calculator className="w-4 h-4" />} label="DCF Model" delay={0.1} cycle={cycle} />
        <SkillBlock icon={<Table className="w-4 h-4" />} label="三表建模" delay={0.25} cycle={cycle} />
        <SkillBlock icon={<Search className="w-4 h-4" />} label="Context Search" delay={0.4} cycle={cycle} />
        <SkillBlock icon={<BarChart3 className="w-4 h-4" />} label="Sensitivity" delay={0.55} cycle={cycle} />
        <SkillBlock icon={<TrendingUp className="w-4 h-4" />} label="Comps" delay={0.7} cycle={cycle} />
        <SkillBlock icon={<DollarSign className="w-4 h-4" />} label="LBO" delay={0.85} glowColor="amber" cycle={cycle} />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PROMPT B: 逻辑组装动效 — 积木飞入咬合
   ═══════════════════════════════════════════ */

export const DemoB_LogicAssembly = () => {
  const { ref, cycle } = useViewportLoop(10);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    setAssembled(false);
    const t = setTimeout(() => setAssembled(true), 600);
    return () => clearTimeout(t);
  }, [cycle]);

  const blocks = [
    { label: 'Context Data', icon: <Search className="w-4 h-4" />, from: { x: -200, y: -60, rotate: -15 } },
    { label: '各种插件', icon: <Calculator className="w-4 h-4" />, from: { x: 0, y: -120, rotate: 8 } },
    { label: 'Sensitivity', icon: <BarChart3 className="w-4 h-4" />, from: { x: 200, y: -60, rotate: 20 } },
  ];

  return (
    <div ref={ref} className="rounded-2xl border border-zinc-800/50 bg-[#0a0a0a] p-8 md:p-10 overflow-hidden">
      <div className="relative h-[280px] max-w-lg mx-auto">
        {/* Architecture lines */}
        <AnimatePresence>
          {assembled && (
            <motion.svg
              key={`svg-${cycle}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 280"
            >
              <motion.line x1="80" y1="150" x2="420" y2="150" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }}
              />
              <text x="250" y="168" textAnchor="middle" fill="rgba(59,130,246,0.3)" fontSize="9" fontFamily="monospace">Deterministic Engine</text>
              <motion.line x1="80" y1="180" x2="420" y2="180" stroke="rgba(245,158,11,0.2)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 1 }}
              />
              <text x="250" y="198" textAnchor="middle" fill="rgba(245,158,11,0.3)" fontSize="9" fontFamily="monospace">Reasoning Engine</text>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Blocks */}
        <div className="absolute inset-0 flex items-start justify-center gap-1 pt-8">
          {blocks.map((block, i) => (
            <motion.div
              key={`${block.label}-${cycle}`}
              initial={{ x: block.from.x, y: block.from.y, rotate: block.from.rotate, opacity: 0 }}
              animate={assembled
                ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                : { x: block.from.x, y: block.from.y, rotate: block.from.rotate, opacity: 0.4 }
              }
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.15 }}
              className="relative"
            >
              {i > 0 && <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-3 h-5 rounded-r-full bg-blue-500/5 border border-blue-500/30 border-l-0" />}
              {i < blocks.length - 1 && <div className="absolute right-0 top-1/2 translate-x-1.5 -translate-y-1/2 w-3 h-5 rounded-l-full bg-zinc-900 border border-blue-500/30 border-r-0" />}

              <motion.div
                animate={assembled ? {
                  boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 24px rgba(59,130,246,0.25)', '0 0 8px rgba(59,130,246,0.1)']
                } : {}}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                className={`px-6 py-4 rounded-xl backdrop-blur-md border transition-all duration-500 ${
                  assembled ? 'bg-blue-500/10 border-blue-500/40' : 'bg-zinc-900/60 border-zinc-700/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={assembled ? 'text-blue-400' : 'text-zinc-600'}>{block.icon}</span>
                  <span className={`text-sm font-medium ${assembled ? 'text-blue-300' : 'text-zinc-500'}`}>{block.label}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Snap text */}
        <AnimatePresence>
          {assembled && (
            <motion.div
              key={`text-${cycle}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-0 left-0 right-0 text-center pb-2"
            >
              <p className="text-xs text-zinc-400">
                <span className="text-zinc-500">Standard Skills,</span>{' '}
                <span className="text-amber-400 font-semibold">Proprietary Orchestration</span>
              </p>
              <p className="text-[10px] text-zinc-600 mt-1"> </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PROMPT C: 隐性任务拆解 — 树状图生长
   ═══════════════════════════════════════════ */

const TreeNode = ({ label, icon, status, delay, isRoot }: {
  label: string; icon?: React.ReactNode; status?: 'verified' | 'pending'; delay: number; isRoot?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7, x: -10 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 18 }}
    className="flex items-center gap-2"
  >
    <div className={`px-3 py-2 rounded-lg border backdrop-blur-md flex items-center gap-2 ${
      isRoot ? 'bg-amber-500/10 border-amber-500/30' : 'bg-zinc-900/70 border-blue-500/30'
    }`}>
      {icon && <span className="text-blue-400 opacity-70">{icon}</span>}
      <span className={`text-xs font-medium ${isRoot ? 'text-amber-300' : 'text-zinc-300'}`}>{label}</span>
    </div>
    {status && (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.3, type: 'spring' }}>
        {status === 'verified'
          ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          : <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        }
      </motion.div>
    )}
  </motion.div>
);

const TreeBranch = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <div className="flex items-stretch gap-0 ml-6">
    <motion.div
      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="w-px bg-blue-500/20 origin-top" style={{ minHeight: 20 }}
    />
    <motion.div
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
      transition={{ delay: delay + 0.15, duration: 0.2 }}
      className="w-4 h-px bg-blue-500/20 self-center origin-left"
    />
    <div className="py-1.5">{children}</div>
  </div>
);

export const DemoC_ImpliedTasks = () => {
  const { ref, cycle } = useViewportLoop(12);
  const [showTree, setShowTree] = useState(false);
  const [query, setQuery] = useState('');
  const targetQuery = '分析原材料对净利的影响';

  // Auto-type and show tree on each cycle
  useEffect(() => {
    setShowTree(false);
    setQuery('');
    let i = 0;
    const interval = setInterval(() => {
      if (i <= targetQuery.length) {
        setQuery(targetQuery.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowTree(true), 300);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [cycle]);

  return (
    <div ref={ref} className="rounded-2xl border border-zinc-800/50 bg-[#0a0a0a] p-8 md:p-10">
      <h3 className="text-lg font-semibold text-zinc-100 text-center mb-2">Implied Tasks — 隐性任务拆解</h3>
      <p className="text-xs text-zinc-500 text-center mb-8 max-w-md mx-auto">
        输入分析意图，系统自动拆解隐性任务并生长出技能树。
      </p>

      {/* Search box */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-700/50 text-sm text-zinc-200 min-h-[40px] flex items-center">
            {query || <span className="text-zinc-600">输入分析意图...</span>}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="text-blue-400 ml-0.5">|</motion.span>
          </div>
        </div>
      </div>

      {/* Tree visualization */}
      <div className="max-w-lg mx-auto min-h-[200px]">
        <AnimatePresence mode="wait">
          {showTree && (
            <motion.div
              key={cycle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-0"
            >
              <TreeNode label={targetQuery} delay={0} isRoot />
              <TreeBranch delay={0.3}>
                <TreeNode icon={<TrendingUp className="w-3.5 h-3.5" />} label="原材料价格追踪" status="verified" delay={0.5} />
              </TreeBranch>
              <TreeBranch delay={0.7}>
                <TreeNode icon={<Table className="w-3.5 h-3.5" />} label="成本结构映射" status="verified" delay={0.9} />
              </TreeBranch>
              <TreeBranch delay={1.1}>
                <TreeNode icon={<DollarSign className="w-3.5 h-3.5" />} label="净利润敏感性预测" status="pending" delay={1.3} />
              </TreeBranch>
              <TreeBranch delay={1.5}>
                <div>
                  <TreeNode icon={<Search className="w-3.5 h-3.5" />} label="供应链集中度分析" status="verified" delay={1.7} />
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                    className="text-[10px] text-amber-400/70 mt-1 ml-1"
                  >
                    ↑ 隐性任务：系统自动识别"原材料"关联"供应链风险"
                  </motion.p>
                </div>
              </TreeBranch>

              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}
                className="mt-6 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 text-center"
              >
                <p className="text-[11px] text-zinc-400">
                  识别 <span className="text-blue-400 font-semibold">3 个显性任务</span> + <span className="text-amber-400 font-semibold">1 个隐性任务</span>，
                  每个节点附带确定性验证状态
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
