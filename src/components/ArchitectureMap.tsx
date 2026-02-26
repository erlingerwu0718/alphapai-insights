import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe, Lightbulb, Cpu, Target, Layers,
  Briefcase, Plug
} from 'lucide-react';

interface Props {
  onNavigate: (section: string) => void;
}

// Constellation background with drifting dots and faint lines
const ConstellationBG: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 200)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      // dots
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59,130,246,0.25)';
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

// Animated energy beam between two points
const EnergyBeam: React.FC<{
  x1: number; y1: number; x2: number; y2: number;
  active?: boolean; delay?: number;
}> = ({ x1, y1, x2, y2, active = false, delay = 0 }) => {
  const id = `beam-${x1}-${y1}-${x2}-${y2}`.replace(/\./g, '_');
  const opacity = active ? 0.8 : 0.25;
  return (
    <g>
      {/* glow layer */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={`url(#${id})`}
        strokeWidth={active ? 3 : 1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        filter="url(#glow)"
      />
      {/* particle dot traveling along the line */}
      <motion.circle
        r={active ? 3 : 2}
        fill="#3b82f6"
        filter="url(#glow)"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          cx: [x1, x2],
          cy: [y1, y2],
        }}
        transition={{
          duration: active ? 1.8 : 3,
          delay: delay + 0.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <defs>
        <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.3} />
        </linearGradient>
      </defs>
    </g>
  );
};

// Module node card with frosted glass
const ModuleNode: React.FC<{
  id: string;
  icon: React.ReactNode;
  num: string;
  title: string;
  desc: string;
  isHovered: boolean;
  anyHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ id, icon, num, title, desc, isHovered, anyHovered, onHover, onClick, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-4 py-3',
    md: 'px-5 py-4',
    lg: 'px-6 py-5',
  };

  return (
    <motion.button
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      className={`
        relative cursor-pointer text-center transition-all duration-500 rounded-2xl
        backdrop-blur-md border w-full
        ${sizeClasses[size]}
        ${isHovered
          ? 'bg-blue-500/15 border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-[1.03] -translate-y-1 z-10'
          : anyHovered
            ? 'bg-white/[0.02] border-zinc-800/30 opacity-50 scale-[0.98]'
            : 'bg-white/[0.03] border-zinc-700/30 hover:bg-blue-500/8 hover:border-blue-500/20'
        }
        ${className}
      `}
      whileTap={{ scale: 0.97 }}
    >
      <div className={`flex justify-center mb-2 transition-all duration-500 ${isHovered ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-zinc-500'}`}>
        {icon}
      </div>
      <p className={`font-semibold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-zinc-300'} ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
        <span className="text-blue-400/70 mr-1">{num}</span>{title}
      </p>
      <p className={`mt-1 transition-colors duration-300 ${isHovered ? 'text-zinc-400' : 'text-zinc-600'} ${size === 'lg' ? 'text-[11px]' : 'text-[10px]'}`}>
        {desc}
      </p>
      {/* hover glow ring */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl border border-blue-400/30 pointer-events-none"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const ArchitectureMap: React.FC<Props> = ({ onNavigate }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const anyHovered = hovered !== null;

  const beamGroups: Record<string, string[]> = {
    mapping: ['l1'],
    strategy: ['l1'],
    algorithm: ['l1', 'core-up1'],
    workflow: ['l1', 'core-up1', 'core-up2'],
    interaction: ['l1', 'core-up1', 'core-up2', 'l2'],
    enterprise: ['l1', 'core-up1', 'core-up2', 'l2'],
    plugin: ['l1', 'core-up1', 'core-up2', 'l2'],
  };
  const activeBeams = hovered ? beamGroups[hovered] || [] : [];
  const isBeamActive = (id: string) => activeBeams.includes(id);

  const handleClick = useCallback((section: string) => {
    onNavigate(section);
  }, [onNavigate]);

  // Is the hovered module in L1, Core, or L3?
  const isL1Hovered = hovered === 'mapping' || hovered === 'strategy';
  const isCoreHovered = hovered === 'algorithm' || hovered === 'workflow' || hovered === 'interaction';
  const isL3Hovered = hovered === 'enterprise' || hovered === 'plugin';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full overflow-hidden"
      style={{ minHeight: 640 }}
    >
      <ConstellationBG />

      {/* Ambient glow — centered on core */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[120px] pointer-events-none" />

      {/* Title */}
      <motion.div
        className="relative text-center mb-16 pt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-light text-zinc-100 tracking-tight mb-2">
          Architecture <span className="font-semibold text-blue-400">Map</span>
        </h2>
        <p className="text-zinc-600 text-xs tracking-wide">点击模块进入深度分析</p>
      </motion.div>

      {/* SVG beam layer — sits behind everything */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        viewBox="0 0 900 550"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* L1 → Core base */}
        <EnergyBeam x1={200} y1={310} x2={350} y2={420} active={isBeamActive('l1')} delay={0.3} />
        {/* Core base → Core mid */}
        <EnergyBeam x1={450} y1={400} x2={450} y2={320} active={isBeamActive('core-up1')} delay={0.6} />
        {/* Core mid → Core top */}
        <EnergyBeam x1={450} y1={300} x2={450} y2={220} active={isBeamActive('core-up2')} delay={0.9} />
        {/* Core top → L3 */}
        <EnergyBeam x1={550} y1={230} x2={700} y2={310} active={isBeamActive('l2')} delay={1.2} />
      </svg>

      {/* Main 3-column layout */}
      <div className="relative z-[2] grid grid-cols-[1fr_1.8fr_1fr] items-center px-4" style={{ minHeight: 440 }}>

        {/* Layer 1: 战略原点 — pushed back */}
        <motion.div
          className={`flex flex-col items-center gap-5 self-center transition-all duration-700 ${
            anyHovered && !isL1Hovered ? 'opacity-40 blur-[1px]' : 'opacity-80'
          } ${isL1Hovered ? '!opacity-100 !blur-0 scale-105' : ''}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ transform: `scale(0.88) translateY(-10px)` }}
        >
          <div className="text-center mb-1">
            <p className="text-base font-semibold text-blue-500/70 tracking-wide">战略原点</p>
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">The Genesis</p>
            <p className="text-[9px] text-zinc-700 mt-1.5 italic">为什么做 & 做什么</p>
          </div>
          <div className="space-y-2.5 w-full max-w-[180px]">
            <ModuleNode
              id="mapping" icon={<Globe className="w-4 h-4" />}
              num="01" title="全球竞争格局" desc="看清战场"
              isHovered={hovered === 'mapping'} anyHovered={anyHovered}
              onHover={setHovered} onClick={() => handleClick('mapping')}
              size="sm"
            />
            <ModuleNode
              id="strategy" icon={<Lightbulb className="w-4 h-4" />}
              num="02" title="核心战略推演" desc="破局之道"
              isHovered={hovered === 'strategy'} anyHovered={anyHovered}
              onHover={setHovered} onClick={() => handleClick('strategy')}
              size="sm"
            />
          </div>
        </motion.div>

        {/* Layer 2: 产品内核 — ISOMETRIC STACKED PYRAMID, visual focal point */}
        <motion.div
          className={`flex flex-col items-center transition-all duration-700 ${
            anyHovered && !isCoreHovered ? 'opacity-60' : ''
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <p className="text-2xl font-semibold text-blue-400 tracking-wide">产品内核</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">The Core Architecture</p>
            <p className="text-[10px] text-zinc-600 mt-2 italic">怎么做 · 核心护城河</p>
          </div>

          {/* Isometric container */}
          <div
            className="relative w-full max-w-[280px] mx-auto"
            style={{
              perspective: '800px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <div
              className="relative flex flex-col items-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(10deg)',
              }}
            >
              {/* Layer 3/3 — TOP: 交互设计 (floating, smallest, highest z) */}
              <motion.div
                className="relative w-[50%] mx-auto mb-1"
                style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ModuleNode
                  id="interaction" icon={<Layers className="w-4 h-4" />}
                  num="05" title="交互设计" desc="信任沙箱 · 前端"
                  isHovered={hovered === 'interaction'} anyHovered={anyHovered}
                  onHover={setHovered} onClick={() => handleClick('interaction')}
                  size="sm"
                />
                {/* Floating shadow */}
                <div className="absolute -bottom-2 left-[10%] right-[10%] h-3 bg-blue-500/10 blur-md rounded-full" />
              </motion.div>

              {/* Layer 2/3 — MID: Workflow (medium width) */}
              <div
                className="relative w-[72%] mx-auto mb-1"
                style={{ transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}
              >
                <ModuleNode
                  id="workflow" icon={<Target className="w-4 h-4" />}
                  num="04" title="Workflow 沉淀" desc="逻辑代工厂 · 中台"
                  isHovered={hovered === 'workflow'} anyHovered={anyHovered}
                  onHover={setHovered} onClick={() => handleClick('workflow')}
                />
                {/* Side face — gives thickness illusion */}
                <div
                  className="absolute left-0 right-0 h-2 rounded-b-lg pointer-events-none"
                  style={{
                    bottom: -8,
                    background: 'linear-gradient(to bottom, rgba(59,130,246,0.08), transparent)',
                    transform: 'rotateX(-60deg)',
                    transformOrigin: 'top center',
                  }}
                />
              </div>

              {/* Layer 1/3 — BASE: 算法架构 (widest, ground level, thickest) */}
              <div
                className="relative w-full"
                style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
              >
                <ModuleNode
                  id="algorithm" icon={<Cpu className="w-5 h-5" />}
                  num="03" title="算法架构" desc="双引擎 + 技能编排"
                  isHovered={hovered === 'algorithm'} anyHovered={anyHovered}
                  onHover={setHovered} onClick={() => handleClick('algorithm')}
                  size="lg"
                />
                {/* Thick base side face */}
                <div
                  className="absolute left-0 right-0 h-3 rounded-b-xl pointer-events-none"
                  style={{
                    bottom: -12,
                    background: 'linear-gradient(to bottom, rgba(59,130,246,0.12), rgba(59,130,246,0.02))',
                    transform: 'rotateX(-50deg)',
                    transformOrigin: 'top center',
                  }}
                />
                {/* Ground shadow */}
                <div className="absolute -bottom-5 left-[5%] right-[5%] h-4 bg-blue-500/8 blur-xl rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layer 3: 生态与商业 — pushed back */}
        <motion.div
          className={`flex flex-col items-center gap-5 self-center transition-all duration-700 ${
            anyHovered && !isL3Hovered ? 'opacity-40 blur-[1px]' : 'opacity-80'
          } ${isL3Hovered ? '!opacity-100 !blur-0 scale-105' : ''}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ transform: `scale(0.88) translateY(-10px)` }}
        >
          <div className="text-center mb-1">
            <p className="text-base font-semibold text-blue-300/60 tracking-wide">生态与商业</p>
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">The Ecosystem</p>
            <p className="text-[9px] text-zinc-700 mt-1.5 italic">未来多大</p>
          </div>
          <div className="space-y-2.5 w-full max-w-[180px]">
            <ModuleNode
              id="enterprise" icon={<Briefcase className="w-4 h-4" />}
              num="06" title="商业模式拓展" desc="to Enterprise模式"
              isHovered={hovered === 'enterprise'} anyHovered={anyHovered}
              onHover={setHovered} onClick={() => handleClick('enterprise')}
              size="sm"
            />
            <ModuleNode
              id="plugin" icon={<Plug className="w-4 h-4" />}
              num="07" title="插件生态思考" desc="自研or并购"
              isHovered={hovered === 'plugin'} anyHovered={anyHovered}
              onHover={setHovered} onClick={() => handleClick('plugin')}
              size="sm"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <motion.p
        className="relative text-center text-[11px] text-zinc-700 mt-14 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        战略定方向 → 产品建壁垒 → 生态做规模
      </motion.p>
    </motion.div>
  );
};
