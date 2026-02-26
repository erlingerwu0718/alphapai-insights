import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Factory, FileText, Link, Variable, BookOpen, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

// Flowing formula topology background
const FormulaTopology = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const formulas = [
      'WACC = E/(E+D)·Re + D/(E+D)·Rd·(1-T)',
      'EBITDA = Rev - COGS - OpEx',
      'EV/EBITDA',
      'FCF = EBIT(1-T) + D&A - ΔWC - CapEx',
      'P/E = Price / EPS',
      'ROE = NI / Equity',
      'β = Cov(Ri,Rm)/Var(Rm)',
      'NPV = Σ CFt/(1+r)^t',
      'IRR → NPV = 0',
      'CAPM: Rf + β(Rm-Rf)',
      'DCF = Σ FCF/(1+WACC)^t',
      'D/E Ratio',
      'Gross Margin = (Rev-COGS)/Rev',
      'Quick = (CA-Inv)/CL',
      'ROIC = NOPAT / IC',
      'EPS growth = ΔNI / shares',
    ];

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      text: string; opacity: number; size: number; life: number; maxLife: number;
    };

    let particles: Particle[] = [];
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * 2;
      canvas.height = h * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
    };
    resize();

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.1 - Math.random() * 0.2,
      text: formulas[Math.floor(Math.random() * formulas.length)],
      opacity: 0,
      size: 10 + Math.random() * 3,
      life: 0,
      maxLife: 300 + Math.random() * 400,
    });

    for (let i = 0; i < 14; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.06 * Math.min(particles[i].opacity, particles[j].opacity) / 0.18;
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in/out
        const progress = p.life / p.maxLife;
        if (progress < 0.15) p.opacity = (progress / 0.15) * 0.18;
        else if (progress > 0.8) p.opacity = ((1 - progress) / 0.2) * 0.18;
        else p.opacity = 0.18;

        ctx.font = `${p.size}px "SF Mono", "Fira Code", monospace`;
        ctx.fillStyle = `rgba(59,130,246,${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);

        if (p.life >= p.maxLife) {
          Object.assign(p, spawn());
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" />;
};

interface Station {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  color: string;
  input: string;
  output: string;
  cotSteps: string[];
}

export const LogicFactoryDemo = () => {
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const [animatingBlocks, setAnimatingBlocks] = useState(false);

  const stations: Station[] = [
    {
      id: 'entity',
      name: '实体链接器',
      nameEn: 'Entity Linker',
      icon: <Link className="w-5 h-5" />,
      color: 'indigo',
      input: '10万字电话会议纪要 + 财报原文',
      output: '327 个实体节点 · 89 条关系边',
      cotSteps: [
        '扫描全文，识别出 "比亚迪"、"碳酸锂"、"欧洲关税" 等 327 个命名实体',
        '建立实体间的共现关系：同一段落中出现的实体自动建立弱关联',
        '分析师划选 "加大经销商补贴" → 手动连线 → "Q4销售费用率"，标注为 [正相关/增加压力]',
        '系统学习这条人工标注，自动推荐类似的潜在关联：发现 "海外建厂" 与 "资本开支" 的共现频率异常高',
      ],
    },
    {
      id: 'variable',
      name: '变量连接器',
      nameEn: 'Variable Connector',
      icon: <Variable className="w-5 h-5" />,
      color: 'emerald',
      input: '327 个实体节点 + 财务数据表',
      output: '12 个核心跟踪变量 · 因果关系链',
      cotSteps: [
        '从 327 个实体中筛选出与财务指标直接相关的 42 个变量候选',
        '交叉验证：将 "碳酸锂价格" 与 "电池成本/kWh" 做时序相关性分析 → r=0.87',
        '串联因果关系：碳酸锂降价 → 电池成本下降 → 单车毛利提升 → 但被价格战对冲',
        '最终输出 12 个核心变量，每个变量附带可信度评分和数据来源',
      ],
    },
    {
      id: 'playbook',
      name: '策略脚本',
      nameEn: 'Strategy Playbook',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'purple',
      input: '12 个核心变量 + 因果关系链',
      output: '3 条核心投资逻辑 · 可执行',
      cotSteps: [
        '将 12 个变量按影响权重排序：海外扩产(0.31) > 价格战(0.28) > 原材料(0.22) > ...',
        '生成逻辑模板：IF 碳酸锂价格 < 8万/吨 AND 海外工厂产能利用率 > 70% THEN 毛利率拐点确认',
        '封装为可复用的分析模板：其他分析师可一键运行，自动替换为不同公司的数据',
        '最终输出：① 出海毛利率拐点 ② 价格战底部信号 ③ 储能业务爆发点 — 三条可执行的投资逻辑',
      ],
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  };

  return (
    <div className="space-y-8">

      {/* 标题区 */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <Factory className="w-3.5 h-3.5" /> 10万字 → 3条投资逻辑
        </div>
        <h3 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tight">
          逻辑工厂：把顶级分析师的经验变成可复用的模板
        </h3>
        <p className="text-zinc-400 leading-relaxed">
          真正的优势不是"数据多"，而是<span className="text-emerald-400 font-semibold">把顶级分析师的分析经验，变成别人也能直接用的标准流程</span>。
          10 万字的原始资料，经过三道工序，变成 3 条可执行的投资逻辑。
        </p>
      </div>

      {/* 流水线可视化 */}
      <div className="glass-card p-8 relative overflow-hidden">
        <FormulaTopology />
        <div className="relative z-10">
        {/* 入口 → 加工站 → 出口 */}
        <div className="flex items-center gap-2 mb-8">
          {/* 入口 */}
          <div className="flex-shrink-0 p-3 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-center min-w-[100px]">
            <FileText className="w-5 h-5 text-zinc-500 mx-auto mb-1" />
            <p className="text-[10px] text-zinc-500 font-semibold">RAW INPUT</p>
            <p className="text-[10px] text-zinc-600">10万字 · 杂乱</p>
          </div>

          <div className="flex-1 flex items-center gap-2">
            {stations.map((station, index) => {
              const c = colorMap[station.color];
              const isActive = activeStation === station.id;
              return (
                <div key={station.id} className="flex-1 flex items-center gap-2">
                  {/* 箭头 */}
                  <ArrowRight className="w-4 h-4 text-zinc-700 flex-shrink-0" />

                  {/* 加工站 */}
                  <motion.button
                    onClick={() => setActiveStation(isActive ? null : station.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      isActive
                        ? `${c.bg} ${c.border} shadow-lg ${c.glow}`
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className={`${isActive ? c.text : 'text-zinc-500'} mb-1 flex justify-center`}>
                      {station.icon}
                    </div>
                    <p className={`text-[10px] font-bold ${isActive ? c.text : 'text-zinc-400'}`}>{station.nameEn}</p>
                    <p className="text-[10px] text-zinc-600">{station.name}</p>
                    <ChevronDown className={`w-3 h-3 mx-auto mt-1 transition-transform ${isActive ? `${c.text} rotate-180` : 'text-zinc-700'}`} />
                  </motion.button>
                </div>
              );
            })}

            {/* 最终箭头 */}
            <ArrowRight className="w-4 h-4 text-zinc-700 flex-shrink-0" />
          </div>

          {/* 出口 */}
          <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-center min-w-[100px]">
            <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className="text-[10px] text-amber-400 font-bold">LOGIC BLOCKS</p>
            <p className="text-[10px] text-zinc-500">3条 · 可执行</p>
          </div>
        </div>

        {/* 展开的加工站详情 */}
        <AnimatePresence mode="wait">
          {activeStation && (
            <motion.div
              key={activeStation}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {(() => {
                const station = stations.find(s => s.id === activeStation)!;
                const c = colorMap[station.color];
                return (
                  <div className={`p-6 rounded-xl ${c.bg} border ${c.border}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`${c.text} font-semibold flex items-center gap-2`}>
                        {station.icon}
                        {station.nameEn} — {station.name}
                      </h4>
                      <div className="flex gap-4 text-[10px] text-zinc-500">
                        <span>输入: {station.input}</span>
                        <span>→</span>
                        <span>输出: {station.output}</span>
                      </div>
                    </div>

                    {/* 分析过程漏斗 */}
                    <div className="space-y-3">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                        分析师的思考过程 — 从海量资料到核心结论的过滤步骤
                      </p>
                      {station.cotSteps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-7 h-7 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-xs font-bold ${c.text}`}>{i + 1}</span>
                          </div>
                          <div className="flex-1 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                            <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                          </div>
                          {i < station.cotSteps.length - 1 && (
                            <div className="absolute left-[13px] mt-7 w-0.5 h-3 bg-zinc-800" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {!activeStation && (
          <p className="text-center text-xs text-zinc-600 italic">
            💡 点击上方任意加工站，查看分析师是怎么一步步从海量资料中提炼出核心结论的
          </p>
        )}
        </div>
      </div>
    </div>
  );
};
