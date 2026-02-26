import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Calculator, Search, BarChart3, FileText, TrendingUp, GitBranch, Brain, Zap, ArrowRight, Lock, Layers } from 'lucide-react';

const skills = [
  { icon: <Calculator className="w-4 h-4" />, label: 'DCF' },
  { icon: <BarChart3 className="w-4 h-4" />, label: 'Comps' },
  { icon: <Search className="w-4 h-4" />, label: 'Search' },
  { icon: <FileText className="w-4 h-4" />, label: 'LBO' },
  { icon: <TrendingUp className="w-4 h-4" />, label: '三表' },
  { icon: <BarChart3 className="w-4 h-4" />, label: '敏感性' },
];

// SVG neural connection lines for the right panel
const NeuralLines = () => {
  const paths = [
    'M 30,30 C 80,20 100,60 160,45',
    'M 30,30 C 60,50 120,30 160,80',
    'M 160,45 C 200,50 220,90 280,75',
    'M 160,80 C 190,70 230,50 280,75',
    'M 280,75 C 310,80 340,40 380,55',
    'M 280,75 C 320,90 350,70 380,55',
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 410 110">
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="1.5" />
          <motion.circle r="2.5" fill="#3b82f6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
          >
            <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} path={d} />
          </motion.circle>
        </g>
      ))}
    </svg>
  );
};

export const OrchestrationCompare = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl border border-zinc-800/50 bg-[#0a0a0a] overflow-hidden">
      <div className="p-8 md:p-10">
        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-xs text-blue-400 tracking-widest uppercase mb-2">Skills vs Orchestration</p>
          <h3 className="text-xl font-semibold text-zinc-100">
            技能是标准件，<span className="text-amber-400">编排才是超额收益</span>
          </h3>
        </div>

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT: Traditional AI Agent */}
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-700/40 relative">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded bg-zinc-700/50 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-400">Traditional AI Agent</p>
                <p className="text-[10px] text-zinc-600">XunTu / Generic Style</p>
              </div>
            </div>

            {/* Skills grid — lego blocks landing */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {skills.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={inView ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200, damping: 15 }}
                  className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-zinc-800/60 border border-zinc-700/40"
                >
                  <span className="text-zinc-500">{s.icon}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Arrow down to output */}
            <div className="flex justify-center mb-3">
              <ArrowRight className="w-4 h-4 text-zinc-700 rotate-90" />
            </div>

            <div className="p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30 text-center">
              <p className="text-xs text-zinc-500">输出：标准化报告</p>
              <p className="text-[10px] text-zinc-600 mt-1">每家都能做，无差异化</p>
            </div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider font-semibold">
                "Skills are Commodities"
              </p>
              <p className="text-[10px] text-zinc-700">技能是标准件</p>
            </div>
          </div>

          {/* RIGHT: AlphaPai Style */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-amber-500/5 border border-blue-500/30 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-300">AlphaPai Style</p>
                <p className="text-[10px] text-blue-500/60">Logic Factory · Orchestration</p>
              </div>
            </div>

            {/* Neural orchestration visualization */}
            <div className="relative h-[110px] mb-5">
              <NeuralLines />

              {/* Nodes overlaid on the SVG */}
              <div className="absolute inset-0 flex items-center justify-between px-2">
                {/* Skill node */}
                <motion.div
                  initial={inView ? { scale: 0 } : { scale: 1 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 1.2, type: 'spring' }}
                  className="flex flex-col items-center gap-1 z-10"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-zinc-500" />
                  </div>
                  <span className="text-[9px] text-zinc-600">DCF</span>
                </motion.div>

                {/* Human logic node */}
                <motion.div
                  initial={inView ? { scale: 0 } : { scale: 1 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 1.5, type: 'spring' }}
                  className="flex flex-col items-center gap-1 z-10"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[9px] text-amber-500">判研逻辑</span>
                </motion.div>

                {/* Skill node */}
                <motion.div
                  initial={inView ? { scale: 0 } : { scale: 1 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 1.8, type: 'spring' }}
                  className="flex flex-col items-center gap-1 z-10"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-zinc-500" />
                  </div>
                  <span className="text-[9px] text-zinc-600">Comps</span>
                </motion.div>

                {/* Human logic node */}
                <motion.div
                  initial={inView ? { scale: 0 } : { scale: 1 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 2.1, type: 'spring' }}
                  className="flex flex-col items-center gap-1 z-10"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[9px] text-amber-500">交叉校验</span>
                </motion.div>

                {/* Output node */}
                <motion.div
                  initial={inView ? { scale: 0 } : { scale: 1 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 2.4, type: 'spring' }}
                  className="flex flex-col items-center gap-1 z-10"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/40 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[9px] text-blue-400">Alpha</span>
                </motion.div>
              </div>
            </div>

            {/* Additional logic layers */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <motion.div
                initial={inView ? { opacity: 0, x: -20 } : {}}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 2.6, duration: 0.4 }}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20"
              >
                <div>
                  <p className="text-[11px] text-blue-300 font-semibold">私域对齐 Private Alignment</p>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">自动同步分析师个人的 Excel 历史预测数据或私有专家访谈记录</p>
                </div>
              </motion.div>

              <motion.div
                initial={inView ? { opacity: 0, x: -20 } : {}}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 2.9, duration: 0.4 }}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20"
              >
                <div>
                  <p className="text-[11px] text-amber-300 font-semibold">任务拆解 Decomposition</p>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">识别分析师意图中的隐性任务——如提到"毛利影响"时，自动调取"原材料价格追踪"技能</p>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 text-center">
              <p className="text-xs text-zinc-300">输出：<span className="text-amber-400 font-semibold">非标分析逻辑</span></p>
              <p className="text-[10px] text-zinc-500 mt-1">Skills 相同，但编排方式独一无二</p>
            </div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">
                "Orchestration is Alpha"
              </p>
              <p className="text-[10px] text-zinc-500">编排才是超额收益</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
