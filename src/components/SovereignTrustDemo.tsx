import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Cpu, Brain, Zap, Play, CheckCircle2 } from 'lucide-react';

export const SovereignTrustDemo = () => {
  const [phase, setPhase] = useState<'idle' | 'routing' | 'deterministic' | 'reasoning' | 'done'>('idle');
  const [pulseLeft, setPulseLeft] = useState(false);
  const [pulseRight, setPulseRight] = useState(false);

  const startDemo = () => {
    setPhase('routing');
    setPulseLeft(false);
    setPulseRight(false);
    setTimeout(() => { setPhase('deterministic'); setPulseLeft(true); }, 1200);
    setTimeout(() => { setPulseLeft(false); setPhase('reasoning'); setPulseRight(true); }, 3500);
    setTimeout(() => { setPulseRight(false); setPhase('done'); }, 5800);
  };

  // Ambient code lines for deterministic core
  const codeLines = [
    'SELECT revenue, yoy_growth',
    'FROM financials WHERE ticker="BYD"',
    'growth = (245 - 213) / 213',
    'XBRL: us-gaap:Revenue = 24.5B',
    'ASSERT growth == 0.1502...',
    'VERIFIED ✓ deterministic',
  ];

  // Semantic fragments for reasoning core
  const semanticLines = [
    '语义关联: "产能爬坡" → 扩张信号',
    '语气判断: CFO措辞 → 谨慎乐观',
    '风险关联: 关税风险 ↔ 毛利率承压',
    '趋势推理: 规模效应 → 成本下降',
    '信心评估: 管理层信心指数 ↑',
    '因果分析: 出海战略 → 长期利好',
  ];

  return (
    <div className="space-y-8">
      {/* 标题区 */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6">
          <Shield className="w-3.5 h-3.5" /> 数字绝对准确 · 分析足够深度
        </div>
        <h3 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tight">
          双引擎架构：数字计算和语义分析彻底分开
        </h3>
        <p className="text-zinc-400 leading-relaxed">
          金融 AI 最大的问题是"编造数据"。可以尝试的解法很直接：<span className="text-cyan-400 font-semibold">所有涉及数字的计算，根本不经过大模型</span>，
          而是用 SQL 和 Python 精确计算。大模型只负责理解语义、分析语气、推理因果。两条路径各司其职，互不干扰。
        </p>
      </div>

      {/* 双核架构可视化 */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-stretch min-h-[420px]">

          {/* 左核心：确定性引擎 */}
          <div className="lg:col-span-5">
            <motion.div
              animate={{
                boxShadow: pulseLeft
                  ? '0 0 60px rgba(6,182,212,0.25), inset 0 1px 0 rgba(6,182,212,0.2)'
                  : '0 0 20px rgba(6,182,212,0.05)',
              }}
              transition={{ duration: 0.8 }}
              className="glass-card h-full p-6 relative overflow-hidden"
            >
              {/* 背景网格 */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-cyan-400 font-bold text-sm tracking-wide">DETERMINISTIC CORE</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">确定性计算引擎</p>
                  </div>
                  <div className={`ml-auto w-2.5 h-2.5 rounded-full ${pulseLeft ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-700'}`} />
                </div>

                {/* 代码流 */}
                <div className="space-y-1.5 font-mono text-xs">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.2 }}
                      animate={{
                        opacity: pulseLeft ? 1 : 0.25,
                        x: pulseLeft ? 0 : -5,
                      }}
                      transition={{ delay: pulseLeft ? i * 0.15 : 0, duration: 0.3 }}
                      className={`px-3 py-1.5 rounded ${
                        pulseLeft && i === codeLines.length - 1
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-zinc-900/50 text-zinc-500'
                      }`}
                    >
                      <span className="text-zinc-700 mr-2">{i + 1}</span>
                      {line}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">设计原则</p>
                  <p className="text-xs text-zinc-400">SQL 查询 · Python 计算 · XBRL 校验 · 零 LLM 参与</p>
                  <p className="text-xs text-cyan-400/70 mt-1">→ 每个数字都可追溯、可验证、可复现</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 中间连接 */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center gap-3 py-8">
            <AnimatePresence>
              {phase === 'routing' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"
                >
                  <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor: phase === 'deterministic' ? 'rgba(6,182,212,0.5)'
                      : phase === 'reasoning' ? 'rgba(168,85,247,0.5)'
                      : phase === 'done' ? 'rgba(16,185,129,0.5)'
                      : 'rgba(63,63,70,0.3)',
                  }}
                  transition={{ delay: i * 0.08 }}
                  className="w-1 h-3 rounded-full"
                />
              ))}
            </div>

            <AnimatePresence>
              {phase === 'done' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 右核心：推理引擎 */}
          <div className="lg:col-span-5">
            <motion.div
              animate={{
                boxShadow: pulseRight
                  ? '0 0 60px rgba(168,85,247,0.25), inset 0 1px 0 rgba(168,85,247,0.2)'
                  : '0 0 20px rgba(168,85,247,0.05)',
              }}
              transition={{ duration: 0.8 }}
              className="glass-card h-full p-6 relative overflow-hidden"
            >
              {/* 神经元背景 */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168,85,247,0.4) 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-bold text-sm tracking-wide">REASONING CORE</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">语义推理引擎</p>
                  </div>
                  <div className={`ml-auto w-2.5 h-2.5 rounded-full ${pulseRight ? 'bg-purple-400 animate-pulse' : 'bg-zinc-700'}`} />
                </div>

                {/* 语义流 */}
                <div className="space-y-1.5 text-xs">
                  {semanticLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.2 }}
                      animate={{
                        opacity: pulseRight ? 1 : 0.25,
                        x: pulseRight ? 0 : 5,
                      }}
                      transition={{ delay: pulseRight ? i * 0.15 : 0, duration: 0.3 }}
                      className={`px-3 py-1.5 rounded ${
                        pulseRight && i === semanticLines.length - 1
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-zinc-900/50 text-zinc-500'
                      }`}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">设计原则</p>
                  <p className="text-xs text-zinc-400">语义搜索 · 因果推理 · 情绪分析 · LLM 驱动</p>
                  <p className="text-xs text-purple-400/70 mt-1">→ 只负责"读懂意思"，绝不碰数字计算</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 请求触发按钮 */}
        <div className="flex justify-center mt-8">
          {phase === 'idle' ? (
            <motion.button
              onClick={startDemo}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              模拟请求："计算比亚迪 Q3 营收同比增长率"
            </motion.button>
          ) : phase === 'done' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 max-w-2xl w-full"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    比亚迪 Q3 营收 <span className="text-cyan-400 font-mono font-bold">245 亿</span>，
                    同比增长 <span className="text-cyan-400 font-mono font-bold">+15.0%</span>
                    <span className="text-[10px] text-cyan-500/60 ml-1">[确定性引擎 ✓]</span>。
                    管理层在电话会议中首次使用"<span className="text-purple-400 font-semibold">unprecedented demand</span>"描述海外业务，
                    语气从"谨慎乐观"转为"强烈看好"
                    <span className="text-[10px] text-purple-500/60 ml-1">[推理引擎]</span>。
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">数字 → 精确计算</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">语义 → AI 分析</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPhase('idle')}
                className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                重置演示
              </button>
            </motion.div>
          ) : (
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {phase === 'routing' && '路由分析中：识别请求类型...'}
              {phase === 'deterministic' && '确定性引擎：SQL 查询 + 数学计算...'}
              {phase === 'reasoning' && '推理引擎：语义分析 + 因果推理...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
