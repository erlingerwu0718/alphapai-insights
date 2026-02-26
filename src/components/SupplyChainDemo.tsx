import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChainNode {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  tier: 'upstream' | 'midstream' | 'downstream';
  priceChange?: string;
}

const nodes: ChainNode[] = [
  // Upstream
  { id: 'silicon', label: '工业硅', sublabel: '¥18,200/t', x: 60, y: 60, tier: 'upstream', priceChange: '+12.3%' },
  { id: 'steel', label: '特种钢', sublabel: '¥5,840/t', x: 60, y: 160, tier: 'upstream', priceChange: '+8.7%' },
  { id: 'copper', label: '电解铜', sublabel: '¥72,100/t', x: 60, y: 260, tier: 'upstream', priceChange: '-3.2%' },
  // Midstream
  { id: 'wafer', label: '硅片制造', sublabel: '产能利用率 87%', x: 300, y: 80, tier: 'midstream' },
  { id: 'parts', label: '精密零部件', sublabel: '交付周期 +2周', x: 300, y: 200, tier: 'midstream' },
  // Downstream
  { id: 'cogs', label: '生产成本 COGS', sublabel: '', x: 540, y: 100, tier: 'downstream' },
  { id: 'margin', label: '毛利预测', sublabel: '', x: 540, y: 220, tier: 'downstream' },
];

const links: { from: string; to: string }[] = [
  { from: 'silicon', to: 'wafer' },
  { from: 'steel', to: 'parts' },
  { from: 'copper', to: 'parts' },
  { from: 'wafer', to: 'cogs' },
  { from: 'parts', to: 'cogs' },
  { from: 'cogs', to: 'margin' },
];

const tierColors = {
  upstream: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
  midstream: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  downstream: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
};

// Trace which nodes are affected by a clicked upstream node
function getAffectedNodes(startId: string): Set<string> {
  const affected = new Set<string>();
  const queue = [startId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    affected.add(current);
    for (const link of links) {
      if (link.from === current && !affected.has(link.to)) {
        queue.push(link.to);
      }
    }
  }
  return affected;
}

function getAffectedLinks(affected: Set<string>): Set<string> {
  const set = new Set<string>();
  for (const link of links) {
    if (affected.has(link.from) && affected.has(link.to)) {
      set.add(`${link.from}-${link.to}`);
    }
  }
  return set;
}

export const SupplyChainDemo: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const affected = activeId ? getAffectedNodes(activeId) : new Set<string>();
  const affectedLinks = activeId ? getAffectedLinks(affected) : new Set<string>();
  const activeNode = activeId ? nodes.find(n => n.id === activeId) : null;

  const getNodePos = useCallback((id: string) => {
    const n = nodes.find(n => n.id === id)!;
    return { x: n.x, y: n.y };
  }, []);

  // Impact text based on selected node
  const impactText: Record<string, { cogs: string; margin: string }> = {
    silicon: { cogs: '+4.1% 硅片成本上升', margin: '毛利率预计下降 1.8pp' },
    steel: { cogs: '+2.6% 零部件成本上升', margin: '毛利率预计下降 0.9pp' },
    copper: { cogs: '-0.8% 线缆成本下降', margin: '毛利率预计回升 0.4pp' },
  };

  return (
    <div className="relative w-full" style={{ height: 340 }}>
      {/* Tier labels */}
      <div className="absolute top-0 left-[20px] text-[10px] text-amber-400/60 uppercase tracking-widest font-semibold">上游原材料</div>
      <div className="absolute top-0 left-[260px] text-[10px] text-blue-400/60 uppercase tracking-widest font-semibold">中游制造</div>
      <div className="absolute top-0 left-[500px] text-[10px] text-emerald-400/60 uppercase tracking-widest font-semibold">财务影响</div>

      {/* SVG links */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        {links.map(link => {
          const from = getNodePos(link.from);
          const to = getNodePos(link.to);
          const key = `${link.from}-${link.to}`;
          const isActive = affectedLinks.has(key);
          const mx = (from.x + to.x) / 2;
          return (
            <g key={key}>
              <motion.path
                d={`M${from.x + 80},${from.y + 20} C${mx + 40},${from.y + 20} ${mx - 40},${to.y + 20} ${to.x},${to.y + 20}`}
                fill="none"
                stroke={isActive ? '#3b82f6' : 'rgba(255,255,255,0.06)'}
                strokeWidth={isActive ? 2 : 1}
                animate={{ stroke: isActive ? '#3b82f6' : 'rgba(255,255,255,0.06)', strokeWidth: isActive ? 2 : 1 }}
                transition={{ duration: 0.4 }}
              />
              {isActive && (
                <motion.circle
                  r={3}
                  fill="#60a5fa"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path={`M${from.x + 80},${from.y + 20} C${mx + 40},${from.y + 20} ${mx - 40},${to.y + 20} ${to.x},${to.y + 20}`}
                  />
                </motion.circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map(node => {
        const colors = tierColors[node.tier];
        const isAffected = affected.has(node.id);
        const isClickable = node.tier === 'upstream';
        const isSelected = activeId === node.id;

        // Show dynamic sublabel for downstream when active
        let sublabel = node.sublabel;
        if (activeId && node.id === 'cogs' && impactText[activeId]) sublabel = impactText[activeId].cogs;
        if (activeId && node.id === 'margin' && impactText[activeId]) sublabel = impactText[activeId].margin;

        return (
          <motion.div
            key={node.id}
            className={`absolute rounded-lg border px-3 py-2 ${colors.bg} ${colors.border} ${
              isClickable ? 'cursor-pointer hover:shadow-lg' : ''
            } ${isSelected ? `ring-1 ring-amber-400/50 shadow-lg ${colors.glow}` : ''} ${
              isAffected && !isSelected ? 'ring-1 ring-blue-400/30' : ''
            } transition-all duration-300`}
            style={{ left: node.x, top: node.y + 20, width: 140 }}
            onClick={() => isClickable && setActiveId(isSelected ? null : node.id)}
            animate={{
              scale: isAffected ? 1.03 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className={`text-xs font-semibold ${colors.text}`}>{node.label}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{sublabel}</p>
            {node.priceChange && (
              <span className={`text-[10px] font-mono mt-1 inline-block ${
                node.priceChange.startsWith('+') ? 'text-red-400' : 'text-green-400'
              }`}>
                {node.priceChange}
              </span>
            )}
            {isClickable && !isSelected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </motion.div>
        );
      })}

      {/* Impact callout */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            className="absolute right-0 bottom-0 max-w-[200px] p-3 rounded-lg bg-zinc-900/90 border border-zinc-700/50 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p className="text-zinc-500 mb-1">价格波动传导路径</p>
            <p className="text-zinc-300">
              <span className="text-amber-400 font-semibold">{activeNode.label}</span> {activeNode.priceChange} →
              中游成本变动 → 终端毛利影响
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
