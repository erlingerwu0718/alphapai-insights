import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Database, Brain, DollarSign, Users, Sparkles } from 'lucide-react';

interface Axis {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  color: string;
  role: string;
  players: string[];
  input: string;
  output: string;
  caseStudy: { title: string; detail: string };
}

interface FlowLabel {
  from: string;
  to: string;
  description: string;
  metric: string;
}

export const EcosystemFlywheelDemo = () => {
  const [activeAxis, setActiveAxis] = useState<string | null>(null);

  // All positions use the same coordinate system: container is 340x340, center at (170,170)
  const CX = 170, CY = 170, R = 150;

  const getNodeCenter = (index: number) => {
    const angle = (index * 120 - 90) * (Math.PI / 180);
    return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R };
  };

  const axes: Axis[] = [
    {
      id: 'data', name: '数据提供方', nameEn: 'Data Providers',
      icon: <Database className="w-6 h-6" />, color: 'cyan', role: '授权数据输入方',
      players: ['券商研究所', '财经智库', '行业协会', '上市公司 IR'],
      input: '授权研报、会议纪要、行业数据',
      output: '技术支持 + 流量分润 + 数据增值报告',
      caseStudy: { title: '版权合规：数据方始终拥有所有权', detail: '数据提供方保留所有权，平台仅获得使用授权。每次引用都带有来源标签，确保版权可追踪。平台不是"拿走数据"，而是"帮数据增值"——把沉睡的研报变成持续产生收入的资产。' },
    },
    {
      id: 'logic', name: '分析师/KOL', nameEn: 'Alpha Creators',
      icon: <Brain className="w-6 h-6" />, color: 'purple', role: '分析经验贡献方',
      players: ['明星分析师', '行业 KOL', '独立研究员', '学术机构'],
      input: '分析模板、分析流程、投资逻辑',
      output: '品牌影响力 + 分析模板分润 + 自动化收入',
      caseStudy: { title: '分析师的自动化收入', detail: '分析师的分析经验被结构化后，变成一个可以自动运行的模板——即使分析师不在线，他的分析逻辑依然在平台上为客户服务并产生收入。这是从"卖时间"到"卖经验"的根本转变。' },
    },
    {
      id: 'capital', name: '买方机构', nameEn: 'Capital Side',
      icon: <DollarSign className="w-6 h-6" />, color: 'amber', role: '决策需求方',
      players: ['公募基金', '私募基金', '企业战投部', '高净值个人'],
      input: '决策需求 + 订阅费用', output: 'Alpha 收益 + 效率提升',
      caseStudy: { title: '让中小机构也能用上顶级分析能力', detail: '过去只有头部机构才能雇佣明星分析师。现在，中小机构通过平台可以调用同样的分析逻辑。这不是"投资建议"（规避合规风险），而是把专业分析能力变成人人可用的基础设施。' },
    },
  ];

  const flowLabels: Record<string, FlowLabel[]> = {
    data: [
      { from: 'data', to: 'logic', description: '中信证券授权 5000 份研报', metric: '月均被引用 12,000 次 · 分润 ¥45万/月' },
      { from: 'data', to: 'capital', description: '授权数据供机构调用', metric: '数据增值报告 · 版权可追踪' },
    ],
    logic: [
      { from: 'logic', to: 'capital', description: '张明的"产能延期预警模型"被 Fork 156 次', metric: '模板调用 2,400 次/月 · 分润 ¥8.2万/月' },
      { from: 'logic', to: 'data', description: '分析模板反哺数据标注质量', metric: '数据利用率提升 3 倍' },
    ],
    capital: [
      { from: 'capital', to: 'data', description: '订阅费用回流数据方', metric: '年化订阅 ¥120万 · 数据方分润 30%' },
      { from: 'capital', to: 'logic', description: '研究员人均覆盖 15→40 家', metric: '效率提升 167% · 持续付费' },
    ],
  };

  const colorMap: Record<string, { bg: string; border: string; text: string; ring: string }> = {
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', ring: 'ring-cyan-500/30' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', ring: 'ring-purple-500/30' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', ring: 'ring-amber-500/30' },
  };

  const axisIndexMap: Record<string, number> = { data: 0, logic: 1, capital: 2 };

  return (
    <div className="space-y-8">
      {/* 标题区 */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <RefreshCw className="w-3.5 h-3.5" /> 数据方 · 分析师 · 机构 三方共赢
        </div>
        <h3 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tight">
          生态飞轮：每一方都在贡献，每一方都在赚钱
        </h3>
        <p className="text-zinc-400 leading-relaxed">
          平台不抢数据方的版权，而是<span className="text-amber-400 font-semibold">帮他们把数据变成持续收入</span>。
          数据方提供内容、分析师提供经验、机构提供需求——三方在平台上形成合规的商业循环。
        </p>
      </div>

      {/* 飞轮可视化 */}
      <div className="glass-card p-8">
        {/* 统一坐标系容器: 340x340 */}
        <div className="relative mx-auto" style={{ width: 340, height: 340 }}>

          {/* 旋转的中心环 */}
          <motion.div
            animate={{ rotate: activeAxis ? 0 : 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full border border-zinc-800/50"
            style={{ left: CX - 110, top: CY - 110, width: 220, height: 220 }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            <div className="absolute -bottom-1 left-1/4 w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
            <div className="absolute -bottom-1 right-1/4 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
          </motion.div>

          {/* 中心 */}
          <div className="absolute flex items-center justify-center" style={{ left: CX - 48, top: CY - 48, width: 96, height: 96 }}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex flex-col items-center justify-center shadow-2xl">
              <RefreshCw className={`w-6 h-6 text-zinc-400 ${!activeAxis ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              <p className="text-[9px] text-zinc-500 mt-1 font-semibold">FLYWHEEL</p>
            </div>
          </div>

          {/* SVG 连接线 — 同一个 340x340 viewBox */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 340">
            <defs>
              <marker id="arrCyan" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="rgba(34,211,238,0.7)" /></marker>
              <marker id="arrPurple" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="rgba(168,85,247,0.7)" /></marker>
              <marker id="arrAmber" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="rgba(245,158,11,0.7)" /></marker>
            </defs>
            {axes.map((axis, index) => {
              const p1 = getNodeCenter(index);
              const p2 = getNodeCenter((index + 1) % 3);
              // Shorten line so it doesn't overlap the node boxes
              const dx = p2.x - p1.x, dy = p2.y - p1.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / len, uy = dy / len;
              const shrink = 52;
              const x1 = p1.x + ux * shrink, y1 = p1.y + uy * shrink;
              const x2 = p2.x - ux * shrink, y2 = p2.y - uy * shrink;
              const markers = ['arrCyan', 'arrPurple', 'arrAmber'];
              const isActive = activeAxis === axis.id;
              const strokeColor = isActive
                ? ['rgba(34,211,238,0.6)', 'rgba(168,85,247,0.6)', 'rgba(245,158,11,0.6)'][index]
                : 'rgba(113,113,122,0.15)';
              return (
                <line key={index} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={strokeColor} strokeWidth={isActive ? 2 : 1}
                  strokeDasharray={isActive ? undefined : '4 4'}
                  markerEnd={isActive ? `url(#${markers[index]})` : undefined}
                />
              );
            })}
          </svg>

          {/* 三个轴节点 — 用同一坐标系定位 */}
          {axes.map((axis, index) => {
            const pos = getNodeCenter(index);
            const c = colorMap[axis.color];
            const isActive = activeAxis === axis.id;
            return (
              <motion.button
                key={axis.id}
                onClick={() => setActiveAxis(isActive ? null : axis.id)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'absolute', left: pos.x - 48, top: pos.y - 48, width: 96, height: 96 }}
                className={`rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer z-10 ${
                  isActive ? `${c.bg} ${c.border} shadow-lg ring-2 ${c.ring}` : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className={isActive ? c.text : 'text-zinc-500'}>{axis.icon}</div>
                <p className={`text-[9px] font-bold mt-1.5 ${isActive ? c.text : 'text-zinc-400'}`}>{axis.nameEn}</p>
                <p className="text-[8px] text-zinc-600">{axis.name}</p>
              </motion.button>
            );
          })}

          {/* 价值流向标签 — 浮动在箭头中点 */}
          <AnimatePresence>
            {activeAxis && flowLabels[activeAxis]?.map((flow, i) => {
              const p1 = getNodeCenter(axisIndexMap[flow.from]);
              const p2 = getNodeCenter(axisIndexMap[flow.to]);
              const mx = (p1.x + p2.x) / 2;
              const my = (p1.y + p2.y) / 2;
              // Offset perpendicular to the line so two labels don't overlap
              const dx = p2.x - p1.x, dy = p2.y - p1.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const nx = -dy / len, ny = dx / len;
              const offset = i === 0 ? 20 : -20;
              const lx = mx + nx * offset;
              const ly = my + ny * offset;
              const ac = colorMap[axes.find(a => a.id === activeAxis)!.color];
              return (
                <motion.div
                  key={`${flow.from}-${flow.to}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ delay: i * 0.12 }}
                  style={{ position: 'absolute', left: lx - 88, top: ly - 20, width: 176, zIndex: 20 }}
                  className={`p-2 rounded-lg ${ac.bg} border ${ac.border} backdrop-blur-sm shadow-lg`}
                >
                  <p className="text-[10px] text-zinc-300 leading-snug mb-0.5">{flow.description}</p>
                  <p className={`text-[10px] ${ac.text} font-semibold leading-snug`}>{flow.metric}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 角色详情 — 点击节点时出现 */}
        <AnimatePresence mode="wait">
          {activeAxis && (
            <motion.div key={activeAxis} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-8">
              {(() => {
                const axis = axes.find(a => a.id === activeAxis)!;
                const c = colorMap[axis.color];
                return (
                  <div className={`p-6 rounded-xl ${c.bg} border ${c.border}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={c.text}>{axis.icon}</div>
                      <div>
                        <h4 className={`${c.text} font-bold`}>{axis.nameEn} — {axis.name}</h4>
                        <p className="text-xs text-zinc-500">{axis.role}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2"><Users className="w-3 h-3 inline mr-1" />参与者</p>
                        <div className="flex flex-wrap gap-1.5">
                          {axis.players.map((p, i) => (<span key={i} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{p}</span>))}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">价值交换</p>
                        <p className="text-xs text-zinc-400 mb-1"><span className="text-zinc-600">输入:</span> {axis.input}</p>
                        <p className="text-xs text-zinc-400"><span className="text-zinc-600">获得:</span> <span className={c.text}>{axis.output}</span></p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                      <p className={`text-xs ${c.text} font-semibold mb-2 flex items-center gap-1`}><Sparkles className="w-3 h-3" />{axis.caseStudy.title}</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{axis.caseStudy.detail}</p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {!activeAxis && (
          <p className="text-center text-xs text-zinc-600 italic mt-4">
            💡 点击飞轮上的任意节点，查看该方的角色说明和价值流向
          </p>
        )}
      </div>
    </div>
  );
};
