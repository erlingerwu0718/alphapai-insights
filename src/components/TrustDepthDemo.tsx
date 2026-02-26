import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Shield, AlertTriangle, CheckCircle2, FileText,
  Newspaper, TrendingUp, Calculator, Eye, MessageSquare,
  Search, ArrowRight
} from 'lucide-react';

// 逐字打字效果
const TypeWriter = ({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text]);
  return <>{displayed}</>;
};

export const TrustDepthDemo = () => {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done'>('idle');
  const [typingLine, setTypingLine] = useState(0);
  const [selectedRef, setSelectedRef] = useState<number | null>(null);
  const [expandedEvidence, setExpandedEvidence] = useState(false);
  const [calcStep, setCalcStep] = useState(0);
  const [showConflict, setShowConflict] = useState(false);

  const startAnalysis = () => {
    setPhase('typing');
    setTypingLine(0);
    setSelectedRef(null);
    setExpandedEvidence(false);
    setCalcStep(0);
    setShowConflict(false);
  };

  const handleLineComplete = (line: number) => {
    if (line < 2) {
      setTimeout(() => setTypingLine(line + 1), 300);
    } else {
      setPhase('done');
    }
  };

  const handleRefClick = (refId: number) => {
    setSelectedRef(refId);
    if (refId === 1) {
      setExpandedEvidence(false);
      setCalcStep(0);
      setTimeout(() => setExpandedEvidence(true), 100);
    } else if (refId === 2) {
      setExpandedEvidence(false);
      setCalcStep(0);
      // 逐步展示计算过程
      setTimeout(() => setCalcStep(1), 200);
      setTimeout(() => setCalcStep(2), 800);
      setTimeout(() => setCalcStep(3), 1400);
      setTimeout(() => setCalcStep(4), 2000);
    }
  };

  const lines = [
    '根据最新财报数据和市场研究，比亚迪在欧洲市场面临关税政策调整的不确定性。',
    '从财务数据来看，公司 Q3 营收达到 245 亿元，同比增长 15.0%，表现强劲。',
    '但关于欧洲关税的影响程度，不同信源存在分歧，建议结合多方证据综合判断。'
  ];

  // 可信度配置
  const confidenceLevels = [
    { color: 'emerald', label: '高可信度', icon: '🟢', desc: '官方财报数据，信源充足' },
    { color: 'emerald', label: '高可信度', icon: '🟢', desc: '确定性计算，可验证' },
    { color: 'amber', label: '中可信度', icon: '🟡', desc: '多方信源存在分歧' }
  ];

  return (
    <div className="space-y-6">
      {/* 启动按钮 */}
      {phase === 'idle' && (
        <div className="flex justify-center">
          <motion.button
            onClick={startAnalysis}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/30 flex items-center gap-3"
          >
            <Play className="w-5 h-5" />
            启动深度分析：比亚迪 Q3 财报
          </motion.button>
        </div>
      )}

      {phase !== 'idle' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 左侧：分析报告（3列宽） */}
          <div className="glass-card lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-zinc-300 font-semibold text-sm">AI 深度分析报告</h4>
              <button
                onClick={() => { setPhase('idle'); setSelectedRef(null); }}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                重置
              </button>
            </div>

            <div className="space-y-4">
              {/* 逐行打字输出 */}
              {lines.map((line, index) => (
                <AnimatePresence key={index}>
                  {typingLine >= index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      {/* 可信度信号灯 */}
                      <div className="flex items-start gap-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex-shrink-0 mt-1"
                        >
                          <span className="text-sm" title={confidenceLevels[index].desc}>
                            {confidenceLevels[index].icon}
                          </span>
                        </motion.div>

                        <div className="flex-1">
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            {typingLine === index && phase === 'typing' ? (
                              <TypeWriter
                                text={line}
                                speed={25}
                                onComplete={() => handleLineComplete(index)}
                              />
                            ) : (
                              <>
                                {index === 0 && (
                                  <>
                                    根据最新财报数据和市场研究，比亚迪在
                                    <span
                                      onClick={() => handleRefClick(1)}
                                      className={`inline-flex items-center mx-1 px-2 py-0.5 rounded cursor-pointer transition-all ${
                                        selectedRef === 1
                                          ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400 shadow-md shadow-indigo-500/20'
                                          : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25'
                                      }`}
                                    >
                                      欧洲市场面临关税压力
                                      <sup className="ml-1 text-[10px] font-bold">[1]</sup>
                                    </span>
                                    。
                                  </>
                                )}
                                {index === 1 && (
                                  <>
                                    从财务数据来看，公司 Q3 营收达到{' '}
                                    <span
                                      onClick={() => handleRefClick(2)}
                                      className={`inline-flex items-center mx-0.5 px-2 py-0.5 rounded font-mono cursor-pointer transition-all ${
                                        selectedRef === 2
                                          ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400 shadow-md shadow-emerald-500/20'
                                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                                      }`}
                                    >
                                      245亿
                                    </span>
                                    ，同比增长{' '}
                                    <span
                                      onClick={() => handleRefClick(2)}
                                      className={`inline-flex items-center mx-0.5 px-2 py-0.5 rounded font-mono font-semibold cursor-pointer transition-all ${
                                        selectedRef === 2
                                          ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400 shadow-md shadow-emerald-500/20'
                                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                                      }`}
                                    >
                                      +15.0%
                                      <sup className="ml-1 text-[10px] font-bold">[2]</sup>
                                    </span>
                                    。
                                  </>
                                )}
                                {index === 2 && line}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}

              {/* 黄灯冲突提示 */}
              <AnimatePresence>
                {phase === 'done' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-amber-400 font-semibold text-xs mb-1">🟡 观点冲突检测</p>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                          关于关税影响程度：CFO 表述为"不确定性"，但中信证券预估为 5-10% 成本压力。
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowConflict(!showConflict)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-semibold hover:bg-amber-500/30 transition-colors border border-amber-500/30 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            查看矛盾点
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-semibold hover:bg-zinc-700 transition-colors flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            召唤人工分析师
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-semibold hover:bg-zinc-700 transition-colors flex items-center gap-1">
                            <Search className="w-3 h-3" />
                            定向补充证据
                          </button>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showConflict && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                              <p className="text-[10px] text-emerald-400 font-semibold mb-1">📄 官方财报 (CFO)</p>
                              <p className="text-xs text-zinc-400 italic leading-relaxed">
                                "面临关税政策调整的<span className="text-amber-400 font-semibold">不确定性</span>，正在积极沟通"
                              </p>
                              <p className="text-[10px] text-zinc-600 mt-1">→ 语气：谨慎乐观</p>
                            </div>
                            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                              <p className="text-[10px] text-indigo-400 font-semibold mb-1">📊 中信证券研报</p>
                              <p className="text-xs text-zinc-400 italic leading-relaxed">
                                "预计造成 <span className="text-rose-400 font-semibold">5-10%</span> 的成本压力"
                              </p>
                              <p className="text-[10px] text-zinc-600 mt-1">→ 语气：明确看空</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 提示 */}
              {phase === 'done' && !selectedRef && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xs text-zinc-600 italic pt-2"
                >
                  💡 点击高亮的 [1] 或 [2] 标号，查看右侧证据堆栈或计算沙箱
                </motion.p>
              )}
            </div>
          </div>

          {/* 右侧：信任验证面板（3列宽） */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 min-h-[500px]">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-zinc-300 font-semibold text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  信任验证面板
                </h4>
                {selectedRef && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRefClick(1)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        selectedRef === 1
                          ? 'bg-indigo-500 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      [1] 证据堆栈
                    </button>
                    <button
                      onClick={() => handleRefClick(2)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        selectedRef === 2
                          ? 'bg-emerald-500 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      [2] 计算沙箱
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {!selectedRef ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[420px] text-center"
                  >
                    <Shield className="w-12 h-12 text-zinc-800 mb-4" />
                    <p className="text-zinc-600 text-sm">点击左侧引用标号</p>
                    <p className="text-zinc-700 text-xs mt-1">查看证据堆栈或计算沙箱</p>
                  </motion.div>
                ) : selectedRef === 1 ? (
                  /* ========== 证据堆栈 ========== */
                  <motion.div
                    key="evidence"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
                        Stacked Evidence Cards
                      </h5>
                      <span className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-400">
                        3 个信源交叉验证
                      </span>
                    </div>

                    {/* 扇形展开的卡片堆 */}
                    <div className="relative" style={{ perspective: '1000px' }}>
                      {[
                        {
                          type: '官方财报', source: '比亚迪 Q3 财报', page: 'P.15', weight: 100,
                          content: '"欧洲市场面临关税政策调整的不确定性，我们正在积极与当地政府沟通，评估对业务的潜在影响。"',
                          borderClass: 'border-emerald-500', bgClass: 'bg-emerald-500/10',
                          iconColor: 'text-emerald-400', icon: <FileText className="w-4 h-4" />,
                          weightColor: 'text-emerald-400', weightBorder: 'border-emerald-500',
                          shadowClass: 'shadow-emerald-500/20'
                        },
                        {
                          type: '券商研报', source: '中信证券', page: 'P.8', weight: 85,
                          content: '"欧盟委员会正在审查中国电动车补贴政策，预计将在 Q4 出台新关税措施，可能对比亚迪等中国车企造成 5-10% 的成本压力。"',
                          borderClass: 'border-indigo-500', bgClass: 'bg-indigo-500/10',
                          iconColor: 'text-indigo-400', icon: <TrendingUp className="w-4 h-4" />,
                          weightColor: 'text-indigo-400', weightBorder: 'border-indigo-500',
                          shadowClass: 'shadow-indigo-500/20'
                        },
                        {
                          type: '新闻快讯', source: '财联社 / 路透社', page: '2024-10-15', weight: 60,
                          content: '"据路透社报道，欧盟贸易专员表示正在考虑对中国电动车征收额外关税，最快将在 11 月做出决定。"',
                          borderClass: 'border-amber-500 border-dashed', bgClass: 'bg-amber-500/10',
                          iconColor: 'text-amber-400', icon: <Newspaper className="w-4 h-4" />,
                          weightColor: 'text-amber-400', weightBorder: 'border-amber-500 border-dashed',
                          shadowClass: 'shadow-amber-500/20'
                        }
                      ].map((card, index) => (
                        <motion.div
                          key={index}
                          initial={
                            expandedEvidence
                              ? { opacity: 0, y: 0, rotateZ: 0, scale: 0.92 }
                              : { opacity: 0 }
                          }
                          animate={
                            expandedEvidence
                              ? {
                                  opacity: 1,
                                  y: 0,
                                  rotateZ: index === 0 ? -1 : index === 1 ? 0.5 : 1.5,
                                  scale: 1,
                                }
                              : { opacity: 0 }
                          }
                          transition={{ delay: index * 0.18, type: 'spring', stiffness: 200, damping: 20 }}
                          className={`p-4 rounded-xl border-2 ${card.borderClass} ${card.bgClass} shadow-lg ${card.shadowClass} mb-3`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-lg bg-zinc-900/50 flex items-center justify-center ${card.iconColor}`}>
                                {card.icon}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-zinc-200">{card.source}</p>
                                <p className="text-[10px] text-zinc-500">{card.type} · {card.page}</p>
                              </div>
                            </div>
                            <div className={`w-11 h-11 rounded-full border-[3px] ${card.weightBorder} flex items-center justify-center bg-zinc-950`}>
                              <span className={`text-[10px] font-bold ${card.weightColor}`}>{card.weight}%</span>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed italic">{card.content}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* 信源权重图例 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="p-3 rounded-lg bg-zinc-950 border border-zinc-800"
                    >
                      <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-wider font-semibold">信源权重评分</p>
                      <div className="flex gap-4 text-[10px] text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-1.5 rounded-full bg-emerald-500" /> 官方 100%
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-1.5 rounded-full bg-indigo-500" /> 研报 85%
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500" /> 新闻 60%
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>

                ) : (
                  /* ========== 计算沙箱 ========== */
                  <motion.div
                    key="calculation"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                        <Calculator className="w-4 h-4" />
                        Deterministic Calculation Sandbox
                      </h5>
                      <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 已验证
                      </span>
                    </div>

                    {/* Step 1: 推理文字 */}
                    <AnimatePresence>
                      {calcStep >= 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">1</div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">推理文字 → 识别计算需求</p>
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            AI 识别到 "<span className="text-emerald-400 font-semibold">同比增长 15.0%</span>" 涉及数学计算，
                            自动将其路由到<span className="text-blue-400 font-semibold">确定性计算引擎</span>（非 LLM 概率预测）。
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 2: 数据提取溯源 */}
                    <AnimatePresence>
                      {calcStep >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center">2</div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">数据提取 → 溯源到文档</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                              <p className="text-[10px] text-zinc-500 mb-1">Current Year (A)</p>
                              <p className="text-xl font-mono font-bold text-blue-400">245 亿</p>
                              <div className="flex items-center gap-1 mt-2 text-[10px] text-zinc-500">
                                <FileText className="w-3 h-3" />
                                <span>Q3 2024 财报 · P.3</span>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                              <p className="text-[10px] text-zinc-500 mb-1">Last Year (B)</p>
                              <p className="text-xl font-mono font-bold text-purple-400">213 亿</p>
                              <div className="flex items-center gap-1 mt-2 text-[10px] text-zinc-500">
                                <FileText className="w-3 h-3" />
                                <span>Q3 2023 财报 · P.3</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 3: 公式透明化 */}
                    <AnimatePresence>
                      {calcStep >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">3</div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">数学公式 → 确定性计算</p>
                          </div>
                          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-700 font-mono text-sm">
                            <p className="text-zinc-500 text-xs mb-2"># Python 解释器（非 LLM）</p>
                            <p className="text-zinc-400">growth_rate = (<span className="text-blue-400">A</span> - <span className="text-purple-400">B</span>) / <span className="text-purple-400">B</span> × 100%</p>
                            <p className="text-zinc-400 mt-1">growth_rate = (<span className="text-blue-400">245</span> - <span className="text-purple-400">213</span>) / <span className="text-purple-400">213</span> × 100%</p>
                            <p className="text-zinc-400 mt-1">growth_rate = <span className="text-zinc-300">32</span> / <span className="text-purple-400">213</span> × 100%</p>
                            <p className="text-emerald-400 mt-1 font-semibold">growth_rate = <span className="text-lg">15.023%</span></p>
                            <p className="text-emerald-400">rounded = <span className="text-lg font-bold">+15.0%</span></p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 4: 最终结果 */}
                    <AnimatePresence>
                      {calcStep >= 4 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border-2 border-emerald-500"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[10px] text-emerald-400 mb-1 uppercase tracking-wider font-semibold">验证结果</p>
                              <p className="text-3xl font-mono font-bold text-emerald-300">+15.0%</p>
                              <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" />
                                与 AI 摘要中的数字一致
                              </p>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                              <CheckCircle2 className="w-7 h-7 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
