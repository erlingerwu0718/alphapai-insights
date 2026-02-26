import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Target, Layers, ArrowDown } from 'lucide-react';

// Flowing formula background
const FormulaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const formulas = [
      'WACC = E/(E+D)·Re + D/(E+D)·Rd·(1-T)',
      'EBITDA = Revenue - COGS - OpEx',
      'EV/EBITDA = Enterprise Value / EBITDA',
      'FCF = EBIT(1-T) + D&A - ΔWC - CapEx',
      'P/E = Price / EPS',
      'ROE = Net Income / Equity',
      'β = Cov(Ri,Rm) / Var(Rm)',
      'NPV = Σ CFt/(1+r)^t',
      'IRR: Σ CFt/(1+IRR)^t = 0',
      'CAPM: E(R) = Rf + β(Rm-Rf)',
      'DCF = Σ FCFt/(1+WACC)^t + TV',
      'Debt/Equity = Total Debt / Equity',
      'Gross Margin = (Rev-COGS)/Rev',
      'Quick Ratio = (CA-Inv)/CL',
    ];

    let particles: Array<{
      x: number; y: number; speed: number; text: string; opacity: number; size: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    // Init particles
    for (let i = 0; i < 18; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        speed: 0.15 + Math.random() * 0.25,
        text: formulas[Math.floor(Math.random() * formulas.length)],
        opacity: 0.04 + Math.random() * 0.06,
        size: 9 + Math.random() * 3,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        ctx.font = `${p.size}px "SF Mono", "Fira Code", monospace`;
        ctx.fillStyle = `rgba(59,130,246,${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);
        p.y -= p.speed;
        if (p.y < -20) {
          p.y = canvas.offsetHeight + 20;
          p.x = Math.random() * canvas.offsetWidth;
          p.text = formulas[Math.floor(Math.random() * formulas.length)];
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// Logic card flow for Workflow hover
const LogicCardFlow = () => {
  const steps = [
    { label: '原始文本', color: 'blue', content: '"管理层表示海外需求unprecedented…"' },
    { label: '逻辑提取', color: 'blue', content: '海外需求 → 强劲 → 验证: 收入数据?' },
    { label: '公式生成', color: 'blue', content: 'overseas_rev_growth = (Q3-Q2)/Q2' },
    { label: '可视化', color: 'amber', content: '📊 海外收入环比 +34%，验证管理层表态' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <div className={`px-3 py-2 rounded-lg border text-[11px] leading-tight max-w-[160px] ${
            step.color === 'amber'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
          }`}>
            <p className={`text-[9px] uppercase tracking-wider mb-1 ${
              step.color === 'amber' ? 'text-amber-500' : 'text-blue-500'
            }`}>{step.label}</p>
            <p className="font-mono">{step.content}</p>
          </div>
          {i < steps.length - 1 && (
            <span className="text-zinc-600 text-xs flex-shrink-0">→</span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Pyramid layer component
const PyramidLayer = ({
  id, icon, title, subtitle, width, isHovered, anyHovered, onHover, isTop,
}: {
  id: string; icon: React.ReactNode; title: string; subtitle: string;
  width: string; isHovered: boolean; anyHovered: boolean;
  onHover: (id: string | null) => void; isTop?: boolean;
}) => {
  const dimmed = anyHovered && !isHovered;

  return (
    <motion.div
      className={`relative mx-auto cursor-pointer ${width}`}
      animate={isHovered ? { y: isTop ? -16 : -8, scale: 1.03 } : { y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`relative p-4 rounded-xl border backdrop-blur-md transition-all duration-500 ${
          isHovered
            ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
            : dimmed
              ? 'bg-zinc-900/40 border-zinc-800/30 opacity-40'
              : 'bg-zinc-900/60 border-zinc-700/40'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isHovered ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800/50 text-zinc-500'
          }`}>
            {icon}
          </div>
          <div>
            <h4 className={`font-semibold text-sm transition-colors ${
              isHovered ? 'text-blue-300' : 'text-zinc-300'
            }`}>{title}</h4>
            <p className="text-[10px] text-zinc-600">{subtitle}</p>
          </div>
        </div>
      </div>
      {/* Thickness illusion */}
      {!isTop && (
        <div
          className="absolute left-1 right-1 pointer-events-none rounded-b-lg"
          style={{
            bottom: -6,
            height: 6,
            background: `linear-gradient(to bottom, rgba(59,130,246,${isHovered ? 0.12 : 0.05}), transparent)`,
          }}
        />
      )}
    </motion.div>
  );
};

// Main exported component
export const CorePyramidExploded = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const anyHovered = hovered !== null;

  // Hover detail content
  const hoverDetails: Record<string, { title: string; desc: string; extra?: React.ReactNode }> = {
    interaction: {
      title: '交互设计 · 信任沙箱',
      desc: '把底层的确定性计算和中层的 Workflow，通过悬停预览、置信度红绿灯和证据卡片展示给用户。冰山浮出水面的部分。',
    },
    workflow: {
      title: 'Workflow 沉淀 · 逻辑代工厂',
      desc: '分析师的一段文字 → 一个算式 → 一张图表。这个转化过程被固化为可复用的 Playbook：',
      extra: <LogicCardFlow />,
    },
    algorithm: {
      title: '算法架构 · 双引擎 + 技能编排',
      desc: '定性（RAG 语义推理）与定量（Text-to-SQL 精确计算）彻底分离，再由 Master Controller 编排 DCF/LBO 等标准化技能插件。地基。',
    },
  };

  return (
    <div className="relative rounded-2xl border border-zinc-800/50 overflow-hidden bg-[#0a0a0a]">
      {/* Flowing formula background */}
      <FormulaBackground />

      <div className="relative z-10 p-8 md:p-12">
        {/* Narrative */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-xs text-blue-400 tracking-widest uppercase mb-3">产品内核 · 透视分解</p>
          <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 mb-4 leading-snug">
            不只提供画笔，而是沉淀绘画的技法
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            当通用 Agent（如 Anthropic）还在竞相开放基础工具（Skills）时，AlphaPai 已经步入<span className="text-blue-400 font-medium">逻辑工厂（Logic Factory）</span>时代——不只提供画笔（DCF/模型），而是沉淀绘画的<span className="text-amber-400 font-medium">技法（Workflow）</span>与对真相的<span className="text-blue-400 font-medium">绝对确定性</span>。
          </p>
        </div>

        {/* Exploded pyramid */}
        <div className="max-w-md mx-auto mb-8 pb-4">
          <div className="space-y-4">
            {/* Top: 交互设计 — narrowest, floats */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PyramidLayer
                id="interaction"
                icon={<Layers className="w-4 h-4" />}
                title="05 · 交互设计"
                subtitle="信任沙箱 · 前端表现"
                width="w-[50%]"
                isHovered={hovered === 'interaction'}
                anyHovered={anyHovered}
                onHover={setHovered}
                isTop
              />
            </motion.div>

            {/* Exploded gap arrow */}
            <div className="flex justify-center">
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-3 h-3 text-blue-500/30" />
              </motion.div>
            </div>

            {/* Mid: Workflow — medium */}
            <PyramidLayer
              id="workflow"
              icon={<Target className="w-4 h-4" />}
              title="04 · Workflow 沉淀"
              subtitle="逻辑代工厂 · 业务中台"
              width="w-[72%]"
              isHovered={hovered === 'workflow'}
              anyHovered={anyHovered}
              onHover={setHovered}
            />

            {/* Exploded gap arrow */}
            <div className="flex justify-center">
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <ArrowDown className="w-3 h-3 text-blue-500/30" />
              </motion.div>
            </div>

            {/* Base: 算法架构 — widest */}
            <PyramidLayer
              id="algorithm"
              icon={<Cpu className="w-5 h-5" />}
              title="03 · 算法架构"
              subtitle="双引擎 + 技能编排 · 地基"
              width="w-full"
              isHovered={hovered === 'algorithm'}
              anyHovered={anyHovered}
              onHover={setHovered}
            />
          </div>
        </div>

        {/* Hover detail panel */}
        <AnimatePresence mode="wait">
          {hovered && hoverDetails[hovered] && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto p-5 rounded-xl bg-zinc-900/80 border border-blue-500/20 backdrop-blur-md"
            >
              <h4 className="text-blue-400 font-semibold text-sm mb-2">{hoverDetails[hovered].title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">{hoverDetails[hovered].desc}</p>
              {hoverDetails[hovered].extra && (
                <div className="mt-3 overflow-x-auto pb-2">
                  {hoverDetails[hovered].extra}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default hint when nothing hovered */}
        {!hovered && (
          <div className="text-center">
            <p className="text-[10px] text-zinc-600 tracking-wider">悬停各层查看详情</p>
          </div>
        )}
      </div>
    </div>
  );
};
