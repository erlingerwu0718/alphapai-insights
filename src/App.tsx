import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hls from 'hls.js';
import { 
  TrendingUp, Search, Target, CheckCircle2, 
  AlertTriangle, Eye, AlertCircle, HelpCircle,
  Compass, Zap, Link as LinkIcon, Layers, Lightbulb,
  Briefcase, Globe, ExternalLink, Database, Cpu,
  FileText, LayoutDashboard, Play, ArrowRight, Activity,
  GitBranch, Share2, Brain, MousePointer, Plug
} from 'lucide-react';
import { PlaybookBuilder } from './components/PlaybookBuilder';
import { PromptForkDemo } from './components/PromptForkDemo';
import { ShadowAIDemo } from './components/ShadowAIDemo';
import { HoverPreviewDemo } from './components/HoverPreviewDemo';
import { SentimentDriftDemo } from './components/SentimentDriftDemo';
import { TrustDepthDemo } from './components/TrustDepthDemo';
import { SovereignTrustDemo } from './components/SovereignTrustDemo';
import { LogicFactoryDemo } from './components/LogicFactoryDemo';
import { EcosystemFlywheelDemo } from './components/EcosystemFlywheelDemo';
import { ArchitectureMap } from './components/ArchitectureMap';
import { CorePyramidExploded } from './components/CorePyramidExploded';
import { OrchestrationCompare } from './components/OrchestrationCompare';
import { DemoB_LogicAssembly, DemoC_ImpliedTasks } from './components/LogicSnappingDemos';
import { SupplyChainDemo } from './components/SupplyChainDemo';

// Capturing the Analyst's Brain 交互组件
const AnalystBrainCapture = () => {
  const [selectedText, setSelectedText] = useState('');
  const [connections, setConnections] = useState<Array<{id: number, text: string, target: string}>>([]);
  const [showHint, setShowHint] = useState(true);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const transcriptText = `【比亚迪 2024 Q3 投资者电话会议纪要】

王传福（董事长）：
"我们将在Q4加大在下沉市场的经销商补贴力度，三四线城市的渗透率还有很大空间。预计单店补贴将从目前的50万提升至80万。"

李柯（CFO）：
"虽然短期内销售费用率会有所上升，但我们预计Q4的单车毛利率能够维持在16%以上，主要得益于电池成本的持续下降和规模效应的显现。"

何龙（销售VP）：
"我们计划在Q4新增200家经销商网点，重点布局在三四线城市。目标是将下沉市场的销量占比从目前的35%提升至45%。"`;

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 10) {
      setSelectedText(text);
      setShowHint(false);
      
      // 模拟自动连接到指标
      setTimeout(() => {
        const newConnection = {
          id: Date.now(),
          text: text.substring(0, 50) + '...',
          target: text.includes('补贴') ? 'Q4销售费用率' : text.includes('毛利') ? 'Q4单车毛利率' : 'Q4销量目标'
        };
        setConnections(prev => [...prev, newConnection]);
        
        // 添加日志
        const logEntry = `Action saved: Analyst linked [${text.substring(0, 30)}...] → [${newConnection.target}]`;
        setActionLog(prev => [...prev, logEntry]);
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 提示信息 */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3"
          >
            <MousePointer className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-400 font-semibold mb-1">交互提示</p>
              <p className="text-xs text-zinc-400">请用鼠标划选左侧文本中的任意段落，系统将自动建立与右侧指标的关联。</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：文本区域 */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h4 className="text-indigo-400 font-semibold">电话会议纪要</h4>
            <span className="ml-auto text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">可划选</span>
          </div>
          
          <div 
            className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap select-text cursor-text p-4 bg-zinc-950 rounded-lg border border-zinc-800"
            onMouseUp={handleTextSelection}
          >
            {transcriptText}
          </div>
        </div>

        {/* 右侧：关联图谱 */}
        <div className="glass-card p-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <h4 className="text-purple-400 font-semibold">分析逻辑图谱</h4>
            <span className="ml-auto text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">
              {connections.length} 个连接
            </span>
          </div>

          <div className="relative min-h-[400px] bg-zinc-950 rounded-lg border border-zinc-800 p-4">
            {connections.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-zinc-600 text-sm">等待建立连接...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {connections.map((conn, index) => (
                  <motion.div
                    key={conn.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    {/* 连接线 */}
                    <svg className="absolute -left-4 top-0 w-full h-full pointer-events-none" style={{zIndex: 0}}>
                      <motion.path
                        d={`M 0 ${20 + index * 80} Q 50 ${20 + index * 80}, 100 ${40 + index * 80}`}
                        stroke="url(#gradient-workflow)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                      <defs>
                        <linearGradient id="gradient-workflow" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* 源节点 */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-3 mb-3"
                    >
                      <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0 mt-1.5 shadow-lg shadow-purple-500/50" />
                      <div className="flex-1 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                        <p className="text-xs text-purple-400 font-semibold mb-1">高管表态</p>
                        <p className="text-xs text-zinc-300">{conn.text}</p>
                      </div>
                    </motion.div>

                    {/* 目标节点 */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3 ml-12"
                    >
                      <ArrowRight className="w-4 h-4 text-pink-400 flex-shrink-0 mt-2" />
                      <div className="flex-1 p-3 bg-pink-500/10 rounded-lg border border-pink-500/30">
                        <p className="text-xs text-pink-400 font-semibold mb-1">关联指标</p>
                        <p className="text-sm text-zinc-200 font-mono">{conn.target}</p>
                        <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          正相关 / 增加压力
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部：Action Log */}
      <AnimatePresence>
        {actionLog.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <h4 className="text-green-400 font-semibold">系统日志</h4>
            </div>
            <div className="space-y-2">
              {actionLog.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="font-mono text-xs text-zinc-400 bg-zinc-950 p-3 rounded border border-zinc-800"
                >
                  <span className="text-green-400">✓</span> {log}
                  <span className="text-blue-400 ml-2">Added to global playbook.</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 定性与定量联动分析组件 - Multi-Agent协作版本
const QualQuantAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agent1Complete, setAgent1Complete] = useState(false);
  const [agent2Complete, setAgent2Complete] = useState(false);
  const [agent3Complete, setAgent3Complete] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    setAgent1Complete(false);
    setAgent2Complete(false);
    setAgent3Complete(false);

    // 用户提问出现
    setTimeout(() => setCurrentStep(1), 500);
    // Agent 1 开始工作
    setTimeout(() => setCurrentStep(2), 1500);
    setTimeout(() => setAgent1Complete(true), 3500);
    // Agent 2 开始工作（并行）
    setTimeout(() => setCurrentStep(3), 1500);
    setTimeout(() => setAgent2Complete(true), 4000);
    // Agent 3 综合分析
    setTimeout(() => setCurrentStep(4), 4500);
    setTimeout(() => setAgent3Complete(true), 6500);
    // 重置
    setTimeout(() => setIsAnalyzing(false), 7000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button
          onClick={startAnalysis}
          disabled={isAnalyzing}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          <Play className="w-5 h-5" />
          {isAnalyzing ? 'Multi-Agent 分析中...' : '启动 Multi-Agent 分析：比亚迪降价策略'}
        </button>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        {/* 左侧：定性分析 (RAG) */}
        <AnimatePresence>
          {currentStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 relative"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h4 className="text-emerald-400 font-semibold">定性分析 (RAG检索)</h4>
                <span className="ml-auto text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">Q3 电话会议</span>
              </div>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800"
                >
                  <p className="text-xs text-zinc-500 mb-2">CEO Elon Musk - 2024 Q3 Earnings Call</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    "We are seeing <span className="text-emerald-400 font-semibold bg-emerald-500/20 px-1 rounded" id="qual-highlight">unprecedented demand</span> for our energy storage products. The Megapack factory in Lathrop is now at full capacity, and we're breaking ground on a new facility in Shanghai."
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800"
                >
                  <p className="text-xs text-zinc-500 mb-2">CFO Commentary</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    "Energy storage revenue grew significantly quarter-over-quarter, driven by both volume increases and improved margins."
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30"
                >
                  <p className="text-xs text-indigo-400 font-semibold mb-1">RAG 语义推理</p>
                  <p className="text-xs text-zinc-400">管理层语气从"谨慎乐观"转为"强烈看好"，关键词"unprecedented"首次出现在能源业务描述中。</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 右侧：定量分析 (Text-to-SQL) */}
        <AnimatePresence>
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 relative"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
                <h4 className="text-blue-400 font-semibold">定量分析 (Text-to-SQL)</h4>
                <span className="ml-auto text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300">财报数据</span>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800"
                >
                  <p className="text-xs text-zinc-500 mb-3">Energy Storage Revenue (单位: 百万美元)</p>
                  <div className="relative h-48">
                    {/* 简化的柱状图 */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around gap-2 h-full">
                      <div className="flex flex-col items-center flex-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: '40%' }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="w-full bg-zinc-700 rounded-t"
                        />
                        <span className="text-xs text-zinc-500 mt-2">Q1</span>
                        <span className="text-xs text-zinc-400">1,529</span>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: '55%' }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                          className="w-full bg-zinc-700 rounded-t"
                        />
                        <span className="text-xs text-zinc-500 mt-2">Q2</span>
                        <span className="text-xs text-zinc-400">1,825</span>
                      </div>
                      <div className="flex flex-col items-center flex-1" id="quant-highlight">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t shadow-lg shadow-blue-500/50"
                        />
                        <span className="text-xs text-blue-400 mt-2 font-semibold">Q3</span>
                        <span className="text-xs text-blue-300 font-semibold">2,376</span>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: '75%' }}
                          transition={{ delay: 1.1, duration: 0.5 }}
                          className="w-full bg-zinc-700/50 rounded-t border-2 border-dashed border-zinc-600"
                        />
                        <span className="text-xs text-zinc-500 mt-2">Q4E</span>
                        <span className="text-xs text-zinc-500">2,100</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30"
                >
                  <p className="text-xs text-blue-400 font-semibold mb-1">SQL 查询结果</p>
                  <p className="text-xs text-zinc-400">Q3环比增长 +30.2%，同比增长 +148%，创历史新高。</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 中间连线：因果关系 */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative">
                {/* 连接线 */}
                <svg width="200" height="100" className="absolute -left-24 -top-12">
                  <motion.path
                    d="M 20 50 Q 100 20, 180 50"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* 中心标签 */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm whitespace-nowrap">因果关联</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部：Multi-Agent 综合分析 */}
      <AnimatePresence>
        {currentStep >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-purple-400" />
              <h4 className="text-purple-400 font-semibold">Multi-Agent 综合分析</h4>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <span className="text-purple-400 font-semibold">因果推理：</span>
                管理层在Q3电话会议中首次使用"unprecedented demand"描述能源存储业务，这一<span className="text-emerald-400">定性信号</span>与财报数据中能源业务收入环比增长+30.2%的<span className="text-blue-400">定量异动</span>高度吻合。
                <br/><br/>
                <span className="text-purple-400 font-semibold">投资建议：</span>
                建议重点关注特斯拉能源业务板块，该业务可能成为新的增长引擎。上海Megapack工厂的扩建计划预计将在2025年进一步推高营收。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [algoTab, setAlgoTab] = useState<'dual-engine' | 'orchestration'>('dual-engine');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navTiers = [
    {
      tier: '第一层：战略原点',
      subtitle: 'The Genesis — 为什么做 & 做什么',
      color: 'text-blue-500',
      items: [
        { id: 'mapping', label: '1. 全球竞争格局', desc: '看清战场', icon: <Globe className="w-4 h-4" /> },
        { id: 'strategy', label: '2. 核心战略推演', desc: '破局之道', icon: <Lightbulb className="w-4 h-4" /> },
      ],
    },
    {
      tier: '第二层：产品内核',
      subtitle: 'The Core — 怎么做',
      color: 'text-blue-400',
      items: [
        { id: 'algorithm', label: '3. 算法架构思考', desc: '双引擎 + 技能编排', icon: <Cpu className="w-4 h-4" /> },
        { id: 'workflow', label: '4. 深度Workflow沉淀', desc: '逻辑代工厂', icon: <Target className="w-4 h-4" /> },
        { id: 'interaction', label: '5. 关键交互设计', desc: '信任沙箱', icon: <Layers className="w-4 h-4" /> },
      ],
    },
    {
      tier: '第三层：生态与商业',
      subtitle: 'The Ecosystem — 未来多大',
      color: 'text-blue-300',
      items: [
        { id: 'enterprise', label: '6. 商业模式拓展', desc: 'to Enterprise模式', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'plugin', label: '7. 插件生态思考', desc: '自研or并购', icon: <Plug className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-blue-500/30 flex">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#0f0f0f] border-b border-zinc-800/50 flex items-center gap-3 px-4 py-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.4)]">α</div>
        <span className="text-sm font-semibold text-zinc-100">@AlphaPai</span>
      </div>
      {/* Sidebar overlay */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/60 z-20" onClick={() => setSidebarOpen(false)} />}
      {/* Sidebar */}
      <aside className={`w-64 border-r border-zinc-800/50 bg-[#0f0f0f] flex flex-col fixed h-full z-20 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              α
            </div>
            <h1 className="text-lg font-semibold text-zinc-100 tracking-tight">@AlphaPai</h1>
          </div>
          <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-2">Insights 2026.2</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          <button
            onClick={() => { setActiveSection('overview'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'overview'
                ? 'bg-zinc-800/60 text-blue-400 shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4" />
            Overview
          </button>
          <div className="mx-3 h-px bg-zinc-800/50" />
          {navTiers.map((tier, tierIdx) => (
            <div key={tierIdx}>
              <div className="px-2 mb-2">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${tier.color}`}>{tier.tier}</p>
                <p className="text-[9px] text-zinc-600 mt-0.5">{tier.subtitle}</p>
              </div>
              <div className="space-y-1">
                {tier.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      activeSection === item.id 
                        ? 'bg-zinc-800/60 text-blue-400 shadow-sm border border-zinc-700/50' 
                        : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    {item.icon}
                    <div className="flex flex-col items-start">
                      <span className="leading-tight">{item.label}</span>
                      <span className="text-[10px] text-zinc-600 leading-tight">{item.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
              {tierIdx < navTiers.length - 1 && (
                <div className="mx-3 mt-3 h-px bg-zinc-800/50" />
              )}
            </div>
          ))}
          <div className="mx-3 mt-3 h-px bg-zinc-800/50" />
          <button
            onClick={() => { setActiveSection('summary'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeSection === 'summary'
                ? 'bg-zinc-800/60 text-blue-400 shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border border-transparent'
            }`}
          >
            <FileText className="w-4 h-4" />
            Summary
          </button>
        </nav>
        
        <div className="p-6 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium tracking-wide">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            Produced by Yujie
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-12 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-12 lg:pb-12 max-w-5xl mx-auto w-full relative">
        {/* Ambient glow for glass effect */}
        <div className="fixed top-1/4 left-1/2 w-[800px] h-[600px] -translate-x-1/4 rounded-full bg-blue-500/[0.04] blur-[120px] pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px] pointer-events-none" />
        {/* 面包屑坐标 */}
        {activeSection !== 'overview' && (() => {
          const breadcrumbMap: Record<string, { tier: string; tierEn: string; page: string; pageEn: string; color: string }> = {
            mapping:     { tier: '战略原点', tierEn: 'Genesis', page: '全球竞争格局', pageEn: 'Global Landscape', color: 'blue' },
            strategy:    { tier: '战略原点', tierEn: 'Genesis', page: '核心战略推演', pageEn: 'Strategic Reasoning', color: 'blue' },
            algorithm:   { tier: '产品内核', tierEn: 'Core', page: '算法架构思考', pageEn: 'Engine + Orchestration', color: 'blue' },
            workflow:    { tier: '产品内核', tierEn: 'Core', page: '深度Workflow沉淀', pageEn: 'Logic Factory', color: 'blue' },
            interaction: { tier: '产品内核', tierEn: 'Core', page: '关键交互设计', pageEn: 'Trust Sandbox', color: 'blue' },
            enterprise:  { tier: '生态与商业', tierEn: 'Ecosystem', page: '商业模式拓展', pageEn: 'to Enterprise', color: 'blue' },
            plugin:      { tier: '生态与商业', tierEn: 'Ecosystem', page: '插件生态思考', pageEn: 'Build or Buy', color: 'blue' },
            summary:     { tier: '总结', tierEn: 'Summary', page: 'Summary', pageEn: 'Summary', color: 'blue' },
          };
          const b = breadcrumbMap[activeSection];
          if (!b) return null;
          return (
            <div className="mb-8 flex items-center gap-2 text-sm">
              <button onClick={() => setActiveSection('overview')} className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">总览</button>
              <span className="text-zinc-600">/</span>
              <span className={`text-${b.color}-400 font-semibold`}>{b.tier}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">{b.page}</span>
              <span className="text-zinc-600 text-xs ml-1">({b.pageEn})</span>
            </div>
          );
        })()}

        <AnimatePresence mode="wait">

          {/* 【总览】全局架构图 */}
          {activeSection === 'overview' && (
            <ArchitectureMap onNavigate={setActiveSection} />
          )}
          
          {/* 【2】核心战略推演 */}
          {activeSection === 'strategy' && (
            <motion.div
              key="strategy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              <header>
                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3">建立独家壁垒需要优化"数据"</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  参考 AlphaSense 的垂直搜索引擎模式，AlphaPai 的战略值得更进一步：从基础的情报引擎到可以真的替分析师/基金经理做分析，需要沉淀"人"的分析方法。
                  <br /><br />
                  所以第一步，在数据和算法层面要把 AI 算账的过程完全透明化，让用户敢信敢用；
                  <br />
                  第二步，要把资深研究员看数据的"逻辑和步骤"在系统里记录下来，变成大家都能复用的模板。
                  <br /><br />
                  即从数据工具升级为"共享和交易研究逻辑"，这是未来的核心壁垒。以下是实施方案：
                </p>
              </header>

              {/* 产品内核透视分解 */}
              <section>
                <CorePyramidExploded />
              </section>

              {/* 分隔线 */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">战略蓝图 → 具体实施</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
              </div>

              {/* 逻辑工厂 */}
              <section>
                <LogicFactoryDemo />
              </section>

              {/* 分隔线 */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">标准化的经验 → 多方共赢的生态</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
              </div>

              {/* 第三屏：价值飞轮 */}
              <section>
                <EcosystemFlywheelDemo />
              </section>
            </motion.div>
          )}

          {/* 【6】商业模式拓展思考 */}
          {activeSection === 'enterprise' && (
            <motion.div
              key="enterprise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <header>
                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3">商业模式拓展思考：从现有业务到新增长曲线</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  前面五个板块聚焦于讯兔现有二级市场金融工具的深度优化。这个板块跳出来看更远——
                  同一个技术底座，如何向一级市场、企业战略部、跨境市场延伸，打开全新的增长空间。
                </p>
              </header>

              <div className="space-y-8">

                {/* 产品版图全景 */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30">
                  <h3 className="text-lg font-medium text-zinc-100 mb-2 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-blue-400" /> 讯兔产品版图全景
                  </h3>
                  <p className="text-xs text-zinc-500 mb-6">底层统一的 AI 搜索 + 语义分析 + Multi-Agent 引擎，上层按客群差异化包装</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-zinc-900/50 border border-blue-500/30 relative">
                      <div className="absolute top-3 right-3"><span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">已上线</span></div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-blue-400" /></div>
                        <div><h4 className="text-blue-400 font-semibold">Alpha派 · 二级市场平台</h4><p className="text-xs text-zinc-500">对标 AlphaSense Financial Services</p></div>
                      </div>
                      <div className="space-y-2 text-sm text-zinc-400">
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>面向公募/私募/券商研究所的二级市场投研</span></p>
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>会议纪要智能摘要、财报语义搜索、情绪漂移追踪</span></p>
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>A股全覆盖，已积累核心客户群</span></p>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <p className="text-xs text-blue-400 font-semibold mb-1">当前状态</p>
                        <p className="text-xs text-zinc-500">产品已上线运营，是讯兔的核心收入来源和技术验证场。后续板块中的交互设计（板块5）和 Workflow 沉淀（板块4）均基于此平台的实战经验。</p>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-zinc-900/50 border border-blue-500/30 relative">
                      <div className="absolute top-3 right-3"><span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">规划中</span></div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"><Search className="w-5 h-5 text-blue-400" /></div>
                        <div><h4 className="text-blue-400 font-semibold">Alpha派 · 一级市场平台</h4><p className="text-xs text-zinc-500">PE/VC 投研场景</p></div>
                      </div>
                      <div className="space-y-2 text-sm text-zinc-400">
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>面向 PE/VC 的项目尽调、行业扫描、投后管理</span></p>
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>非上市公司信息聚合：工商数据、专利、招投标、新闻舆情</span></p>
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>专家访谈纪要的语义检索与交叉验证</span></p>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <p className="text-xs text-blue-400 font-semibold mb-1">差异化机会</p>
                        <p className="text-xs text-zinc-500">国内一级市场缺乏 AlphaSense 级别的 AI 工具。现有工具（烯牛数据、IT桔子）偏数据库查询，缺少语义理解和 Agent 能力。讯兔可以直接复用二级市场验证过的 AI 引擎快速进入。</p>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/5 border-2 border-amber-500/50 relative shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20">
                      <div className="absolute top-3 right-3"><span className="text-xs px-2.5 py-1 rounded-full bg-amber-500 text-white font-semibold shadow-lg shadow-amber-500/30">★ 重点拓展</span></div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/20"><Briefcase className="w-5 h-5 text-amber-300" /></div>
                        <div><h4 className="text-amber-300 font-bold text-lg">Alpha派 · Enterprise 平台</h4><p className="text-xs text-zinc-400">对标 AlphaSense Corporations</p></div>
                      </div>
                      <div className="space-y-2 text-sm text-zinc-400">
                        <p className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">▸</span><span>面向大型实体企业的战略投资部、竞争情报部门</span></p>
                        <p className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">▸</span><span>医药/科技/制造/消费等行业的竞对监控与市场洞察</span></p>
                        <p className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">▸</span><span>用客户的行业黑话重新包装底层 AI 能力</span></p>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <p className="text-xs text-amber-400 font-semibold mb-1">为什么是关键增量</p>
                        <p className="text-xs text-zinc-500">这是 AlphaSense 从 $1B 到 $4B 估值的核心增长引擎。企业战投部的痛点与金融机构高度重叠，但合规容忍度更高、付费意愿更强。详见下方展开分析。</p>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-zinc-900/50 border border-blue-500/30 relative">
                      <div className="absolute top-3 right-3"><span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">第二曲线</span></div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"><Globe className="w-5 h-5 text-blue-400" /></div>
                        <div><h4 className="text-blue-400 font-semibold">Alpha派 · 跨境市场扩展</h4><p className="text-xs text-zinc-500">港股 · 日本市场</p></div>
                      </div>
                      <div className="space-y-2 text-sm text-zinc-400">
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>港股：中资出海+南向资金，天然的 A 股能力延伸</span></p>
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>日本：企业治理改革催生投研需求，AlphaSense 尚未深耕亚洲本地语言</span></p>
                        <p className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><span>核心优势：中文/日文语义理解是欧美工具的盲区</span></p>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <p className="text-xs text-blue-400 font-semibold mb-1">扩展逻辑</p>
                        <p className="text-xs text-zinc-500">港股是 A 股能力的自然溢出（同一批分析师、同一套中文语料）。日本市场则是"东京证交所改革 + 巴菲特效应"带来的结构性机会，且日语 NLP 是 AlphaSense 的弱项。</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enterprise 平台深度展开 - PLACEHOLDER_ENTERPRISE_START */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400"/> Enterprise 平台深度展开：AlphaSense 的增长密码
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed -mt-2">
                    AlphaSense 针对底层同一套 AI 搜索技术，为不同行业定制了差异化的 Landing Page、Demo 场景和价值主张。关键不是技术本身，而是用客户的语言描述问题。
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20">
                      <div className="flex items-start justify-between mb-3">
                        <div><h4 className="text-blue-400 font-semibold mb-1 flex items-center gap-2"><Cpu className="w-4 h-4"/> Tech, Media & Telecom</h4><p className="text-xs text-zinc-500">客户案例：Salesforce 竞争情报团队</p></div>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">科技行业</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left: text content */}
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-1 gap-4">
                            <div><p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">业务黑话</p><ul className="space-y-1 text-zinc-400"><li>• Product Launch Signal (产品发布信号)</li><li>• Customer Choice Tracking (客户选择追踪)</li><li>• Churn Rate Disclosure (客户流失率披露)</li></ul></div>
                            <div><p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">实操痛点</p><ul className="space-y-1 text-zinc-400"><li>• 竞对在专家访谈中透露新功能，散落在数百份Transcript中</li><li>• 无法实时追踪关键词在行业内的提及趋势</li></ul></div>
                          </div>
                          <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800"><p className="text-xs text-zinc-500 mb-1">AlphaSense 解决方案包装</p><p className="text-sm text-zinc-300">"整合Expert Transcript Library与公开研报，Document Trend可视化展示竞对话题热度变化。"</p></div>
                        </div>
                        {/* Right: video */}
                        <div className="rounded-lg overflow-hidden border border-zinc-700/50 self-center">
                          <video
                            ref={(el) => {
                              if (el && !el.dataset.hlsInit) {
                                el.dataset.hlsInit = 'true';
                                const src = 'https://customer-ur581uw93wj6s66c.cloudflarestream.com/e2dabd8bd9eaedad4ed4b7940958bf71/manifest/video.m3u8?clientBandwidthHint=10';
                                if (Hls.isSupported()) {
                                  const hls = new Hls();
                                  hls.loadSource(src);
                                  hls.attachMedia(el);
                                } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
                                  el.src = src;
                                }
                              }
                            }}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-auto"
                            style={{ objectFit: 'contain', background: '#000' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20">
                      <div className="flex items-start justify-between mb-3">
                        <div><h4 className="text-blue-400 font-semibold mb-1 flex items-center gap-2"><Database className="w-4 h-4"/> Life Sciences & Pharma</h4><p className="text-xs text-zinc-500">客户案例：Royalty Pharma, Merz Aesthetics</p></div>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">医疗健康</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left: text content */}
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-1 gap-4">
                            <div><p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">业务黑话</p><ul className="space-y-1 text-zinc-400"><li>• Pipeline Tracking (治疗管线追踪)</li><li>• Clinical Trial Readout (临床试验结果)</li><li>• Loss of Exclusivity (专利到期监控)</li></ul></div>
                            <div><p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">实操痛点</p><ul className="space-y-1 text-zinc-400"><li>• 需手动监控FDA、EMA、PubMed等多个数据源</li><li>• 竞品药物临床数据散落在海量医疗索赔数据中</li></ul></div>
                          </div>
                          <div className="p-3 bg-zinc-900/50 rounded border border-zinc-800"><p className="text-xs text-zinc-500 mb-1">AlphaSense 解决方案包装</p><p className="text-sm text-zinc-300">"聚合监管内容+专家访谈，自动追踪竞品管线进展，提前6个月预警专利到期风险。"</p></div>
                        </div>
                        {/* Right: video */}
                        <div className="rounded-lg overflow-hidden border border-zinc-700/50 self-center">
                          <video
                            ref={(el) => {
                              if (el && !el.dataset.hlsInit) {
                                el.dataset.hlsInit = 'true';
                                const src = 'https://customer-ur581uw93wj6s66c.cloudflarestream.com/8e8fd737c546f9c153fe2d5237410f20/manifest/video.m3u8?clientBandwidthHint=10';
                                if (Hls.isSupported()) {
                                  const hls = new Hls();
                                  hls.loadSource(src);
                                  hls.attachMedia(el);
                                } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
                                  el.src = src;
                                }
                              }
                            }}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-auto"
                            style={{ objectFit: 'contain', background: '#000' }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Industrial */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20">
                      <div className="flex items-start justify-between mb-3">
                        <div><h4 className="text-blue-400 font-semibold mb-1 flex items-center gap-2"><Activity className="w-4 h-4"/> Industrial (工业制造)</h4><p className="text-xs text-zinc-500">典型客户：工业集团战略部、供应链风控团队</p></div>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">工业制造</span>
                      </div>
                      <div className="space-y-4 text-sm">
                        <p className="text-zinc-400 leading-relaxed">
                          在复杂的工业市场，AlphaSense 帮客户搜到风险，算清风险对利润的影响。
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                            <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">竞对战略动向实时监测</p>
                            <p className="text-xs text-zinc-400 leading-relaxed">利用 AI Agent 穿透噪音，追踪竞争对手的产能扩张、技术专利及市场准入动态。不仅告诉你"发生了什么"，更通过逻辑关联揭示其背后的战略意图。</p>
                          </div>
                          <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                            <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">供应链风险因果监控</p>
                            <p className="text-xs text-zinc-400 leading-relaxed">建立从"原材料波动"到"终端毛利"的因果连线。实时监控全球供应链干扰（政策变动、物流瓶颈），自动预测对生产成本和交付周期的影响。</p>
                          </div>
                        </div>
                        {/* Supply Chain Visualization */}
                        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 font-semibold">供应链脉络图 · 点击上游原材料查看传导路径</p>
                          <SupplyChainDemo />
                        </div>
                        {/* Video */}
                        <div className="rounded-lg overflow-hidden border border-zinc-700/50">
                          <video
                            ref={(el) => {
                              if (el && !el.dataset.hlsInit) {
                                el.dataset.hlsInit = 'true';
                                const src = 'https://customer-ur581uw93wj6s66c.cloudflarestream.com/f707797e4f2ba645e8b44a485ca40721/manifest/video.m3u8?clientBandwidthHint=10';
                                if (Hls.isSupported()) {
                                  const hls = new Hls();
                                  hls.loadSource(src);
                                  hls.attachMedia(el);
                                } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
                                  el.src = src;
                                }
                              }
                            }}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-auto"
                            style={{ objectFit: 'contain', background: '#000' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20">
                      <div className="flex items-start justify-between mb-3">
                        <div><h4 className="text-blue-400 font-semibold mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Consumer Goods & Retail</h4><p className="text-xs text-zinc-500">典型客户：快消品牌战略部、零售商竞争情报团队</p></div>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">消费零售</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">业务黑话</p><ul className="space-y-1 text-zinc-400"><li>• Pricing Strategy Shift (定价策略变化)</li><li>• Supply Chain Disruption (供应链中断)</li><li>• Private Label Threat (自有品牌威胁)</li></ul></div>
                        <div><p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider font-semibold">实操痛点</p><ul className="space-y-1 text-zinc-400"><li>• 竞品财报中提及"原材料成本上涨"，无法快速定位品类</li><li>• 需人工对比多季度电话会议，寻找管理层语气变化</li></ul></div>
                      </div>
                      <div className="mt-4 p-3 bg-zinc-900/50 rounded border border-zinc-800"><p className="text-xs text-zinc-500 mb-1">AlphaSense 解决方案包装</p><p className="text-sm text-zinc-300">"实时监控竞品财报中的定价信号，用Sentiment Analysis捕捉管理层从'乐观'到'谨慎'的微妙转变。"</p></div>
                      <div className="mt-4 rounded-lg overflow-hidden border border-zinc-700/50" style={{ height: 280 }}>
                        <iframe
                          src="https://www.alpha-sense.com/industries/consumer-cpg/"
                          title="AlphaSense Consumer CPG"
                          className="w-full h-full border-0"
                          sandbox="allow-scripts allow-same-origin"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* 【4】关键交互设计 */}
          {activeSection === 'interaction' && (
            <motion.div
              key="interaction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <header>
                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3">关键交互设计思考：让用户100%信任AI的输出</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  AlphaSense 在金融垂直场景上的核心竞争力：让用户对 AI 生成的内容<strong className="text-zinc-200 font-medium">完全信任</strong>。
                  在金融投研中，用户的注意力极其宝贵，一旦跳转页面，专注状态就被打断了。
                </p>
              </header>

              {/* 核心理念 */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30">
                <h3 className="text-xl font-medium text-zinc-100 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400"/> 数据的基础是要建立"用户信任"，这对金融AI至关重要
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-blue-400 font-semibold text-sm">传统产品/通用产品解决不了的部分</h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✗</span>
                        <span>AI生成的摘要不透明，用户不敢直接引用到研报中</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✗</span>
                        <span>溯源链路太长，点击来源后需要在几十页PDF中重新寻找</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✗</span>
                        <span>文字无法传递语气的微妙变化（迟疑、坚定、回避）</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-blue-400 font-semibold text-sm">AlphaSense 的解决方案</h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span><strong className="text-zinc-300">Sentence-level Citations:</strong> 每一句话都有精确的溯源标号</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span><strong className="text-zinc-300">Hover to Preview:</strong> 悬停即可预览原文，无需跳转</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span><strong className="text-zinc-300">Sentiment Drift:</strong> 可视化展示管理层语气的时序变化</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 交互优化1：伴随式的听&阅面板 */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-zinc-100 flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">1</span>
                      伴随式听阅面板
                    </h3>
                    <p className="text-zinc-400 text-sm mb-2">
                      <span className="text-blue-400 font-semibold">AlphaSense 原版：</span>
                      Hover to Preview - 悬停在引用标号上，侧边栏滑出抽屉显示原文上下文
                    </p>
                    <p className="text-zinc-400 text-sm">
                      <span className="text-blue-400 font-semibold">讯兔优化方案：</span>
                      增加<strong className="text-zinc-200">切片式音频试听</strong>。
                      由于语气的微妙变化（迟疑、咳嗽、坚定程度）是文字无法体现的，
                      悬停时不仅浮现文字上下文，还自动弹出迷你音频播放器，截取那句话前后的 15 秒原音。
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 whitespace-nowrap ml-4">
                    交互式演示
                  </span>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    <span className="text-blue-400 font-semibold">💡 演示说明：</span>
                    将鼠标悬停在左侧会议摘要中的高亮引用标号上，右侧会自动弹出伴随式听阅面板，
                    显示原文上下文、说话人信息、情绪标签，以及一个可播放的 15 秒音频片段。
                    点击播放按钮可以听到音频波形动画效果。
                  </p>
                </div>

                <div className="glass-card p-6">
                  <HoverPreviewDemo />
                </div>
              </div>

              {/* 交互优化2：核心变量红绿灯追踪 */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-zinc-100 flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">2</span>
                      核心变量的红绿灯追踪
                    </h3>
                    <p className="text-zinc-400 text-sm mb-2">
                      <span className="text-blue-400 font-semibold">AlphaSense 原版：</span>
                      Sentiment Drift - 利用 NLP 提取高管在同一主题下从 Q1 到 Q4 的语气词变化，画出折线图
                    </p>
                    <p className="text-zinc-400 text-sm">
                      <span className="text-blue-400 font-semibold">讯兔优化方案：</span>
                      针对特定公司梳理出核心跟踪变量（如"海外扩产"、"价格战"），
                      用<strong className="text-zinc-200">微缩热力图 (Sparklines)</strong> 展示过去四个季度的情绪变化。
                      颜色由绿（极其乐观）渐变到黄（谨慎）再到红（悲观）。
                      点击方块可对比不同季度高管关于该话题的原话。
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 whitespace-nowrap ml-4">
                    交互式演示
                  </span>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    <span className="text-blue-400 font-semibold">💡 演示说明：</span>
                    点击"海外扩产"或"价格战"卡片，查看该话题在过去四个季度的情绪演变。
                    右上角的四个小方块代表 Q1-Q4，颜色变化一目了然。
                    点击具体季度可以查看管理层当时的原话和关键词。
                  </p>
                </div>

                <div className="glass-card p-6">
                  <SentimentDriftDemo />
                </div>
              </div>

              {/* 交互优化3：深度信任验证 */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-zinc-100 flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">3</span>
                      深度信任验证
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">
                      整合三大信任机制：<strong className="text-blue-400">多重证据堆栈</strong>（Stacked Evidence Cards）、
                      <strong className="text-blue-400">确定性计算沙箱</strong>（Deterministic Calculation）、
                      <strong className="text-blue-400">可信度红绿灯系统</strong>（Traffic Light System）。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-blue-400 font-semibold mb-1">🟢 多重证据堆栈</p>
                        <p className="text-zinc-500">官方财报 + 券商研报 + 新闻快讯，三层交叉验证，信源权重可视化</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-blue-400 font-semibold mb-1">🔵 确定性计算沙箱</p>
                        <p className="text-zinc-500">公式透明化、数据溯源、Python 引擎隔离，消除 AI 幻觉</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-blue-400 font-semibold mb-1">🟡 可信度红绿灯</p>
                        <p className="text-zinc-500">主动暴露观点冲突，诚实告诉你"这个结论不确定"，让用户自己做判断</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 whitespace-nowrap ml-4">
                    综合演示
                  </span>
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/5 via-blue-500/5 to-blue-500/5 border border-zinc-700">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    <span className="text-blue-400 font-semibold">💡 演示说明：</span>
                    点击"启动深度分析"，左侧会逐字生成带有可信度信号灯（🟢/🟡）的分析文本。
                    点击 <span className="text-blue-400">[1]</span> 查看证据堆栈（三张卡片扇形展开），
                    点击 <span className="text-blue-400">[2]</span> 查看计算沙箱（推理→公式→结果的完整推导）。
                    注意底部的 🟡 黄灯冲突检测——点击"查看矛盾点"可以看到两份信源的原话对比。
                  </p>
                </div>

                <div className="glass-card p-6">
                  <TrustDepthDemo />
                </div>
              </div>

              {/* Case 4: 隐性任务拆解 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-medium text-zinc-100 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">4</span>
                    隐性任务自动拆解
                  </h3>
                  <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
                    用户输入一个分析意图，系统自动识别显性任务和隐性任务，生长出技能调用树。
                  </p>
                </div>

                <DemoC_ImpliedTasks />
              </div>

              {/* 产品价值总结 */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium text-zinc-200 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-zinc-400"/> 以上交互优化的产品价值
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-zinc-300 font-semibold mb-3 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      建立完全信任
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>用户可以直接引用 AI 摘要到研报中，无需二次验证</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>音频原声让用户确认没有曲解原意</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-zinc-300 font-semibold mb-3 text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      不打断用户的专注状态
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>悬停即可验证，无需跳转页面</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>15 秒音频片段刚好够验证关键信息</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-zinc-300 font-semibold mb-3 text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      发现隐藏的信号
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>管理层话术从"不计代价"到"审慎评估"的转变</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">▸</span>
                        <span>提前 3 个月预警战略调整</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 【1】全球竞争格局 */}
          {activeSection === 'mapping' && (
            <motion.div
              key="mapping"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10 h-full flex flex-col"
            >
              <header>
                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3">先看全局：全球金融AI竞争格局</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  以下是在持续维护的全球金融AI赛道Mapping和每日行业动态，
                  它们是后续对alphapai的战略和产品（逻辑/交互/算法）思考的事实基础。
                </p>
              </header>

              {/* Mapping 表格 */}
              <div className="flex-1 min-h-[600px] rounded-2xl bg-zinc-900/30 border border-zinc-800/50 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/80">
                  <h3 className="text-lg font-medium text-zinc-200 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" /> 全球金融AI赛道 Mapping
                  </h3>
                  <a 
                    href="https://docs.google.com/spreadsheets/d/1orVVawpB4WsB2Etovds5jDMAkXuaD5a2/edit?usp=sharing&ouid=104445013146604215195&rtpof=true&sd=true" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    在 Google Sheets 中打开 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex-1 bg-zinc-950 relative">
                  <iframe 
                    src="https://docs.google.com/spreadsheets/d/1orVVawpB4WsB2Etovds5jDMAkXuaD5a2/preview" 
                    className="absolute inset-0 w-full h-full border-0"
                    title="全球金融AI赛道 Mapping"
                  />
                </div>
              </div>

              {/* FinAI Pulse Daily */}
              <div className="flex-1 min-h-[500px] rounded-2xl bg-zinc-900/30 border border-zinc-800/50 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/80">
                  <h3 className="text-lg font-medium text-zinc-200 flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-blue-400" /> FinAI Pulse Daily (每日要闻)
                  </h3>
                  <a 
                    href="https://erlingerwu0718.github.io/FinAI-Pulse-Daily/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    在新窗口打开 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex-1 bg-zinc-950 relative">
                  <iframe 
                    src="https://erlingerwu0718.github.io/FinAI-Pulse-Daily/" 
                    className="absolute inset-0 w-full h-full border-0"
                    title="FinAI Pulse Daily"
                  />
                </div>
              </div>

              {/* 三层战略分析 */}
              <div className="space-y-8 mt-4">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-zinc-100 mb-2">全球 AI 投研赛道：三层战略拆解</h3>
                  <p className="text-sm text-zinc-500">从演进规律、行业痛点到 AlphaPai 的破局思路</p>
                </div>

                {/* 第一层：演进路线 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">1</div>
                    <h4 className="text-lg font-semibold text-zinc-100">全球 AI 投研赛道的底层逻辑与演进路线</h4>
                  </div>
                  <p className="text-sm text-zinc-400 mb-6">
                    全球赛道的发展本质上是"机器如何越来越深地替代人类投研动作"的过程。可以划分为三个时代：
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Data 时代 */}
                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                          <h5 className="text-sm text-zinc-200 font-semibold">Data 时代</h5>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-700/50 text-zinc-500 border border-zinc-600/30 flex-shrink-0">已成熟</span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">数据垄断</p>
                      <p className="text-xs text-blue-400 mb-3">Bloomberg、Capital IQ、万得 (Wind)</p>
                      <div className="space-y-2 text-xs text-zinc-400">
                        <p><span className="text-zinc-300">核心逻辑：</span>解决"哪里有数据"的问题。壁垒是专有网络和终端硬件。</p>
                        <p><span className="text-blue-400">局限：</span>给人海量数据，但人依然要自己去读、去算、去写。</p>
                      </div>
                    </div>

                    {/* Search & Summarize 时代 */}
                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <h5 className="text-sm text-zinc-200 font-semibold">Search & Summarize</h5>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 flex-shrink-0">去年主流</span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">信息提效</p>
                      <p className="text-xs text-blue-400 mb-3">AlphaSense、Perplexity、各种 AI 纪要工具</p>
                      <div className="space-y-2 text-xs text-zinc-400">
                        <p><span className="text-zinc-300">核心逻辑：</span>解决"看不过来"的问题。利用大模型做自然语言搜索和长文本摘要。</p>
                        <p><span className="text-blue-400">局限：</span>全球 90% 的 AI 投研创业公司都卡在这里。AI 被当成"高级阅读理解机"，总结变成了廉价的标准品——当所有人都能一秒提炼特斯拉财报重点时，这份提炼就不再产生超额收益。</p>
                      </div>
                    </div>

                    {/* Agentic Workflow 时代 */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/10 border border-amber-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <h5 className="text-sm text-zinc-200 font-semibold">Agentic Workflow</h5>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">正在跨越</span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">逻辑执行</p>
                      <p className="text-xs text-amber-400 mb-3">目前全球正在跨越的门槛</p>
                      <div className="space-y-2 text-xs text-zinc-400">
                        <p><span className="text-zinc-300">核心逻辑：</span>解决"如何决策"的问题。不仅要懂字面意思，还要能执行复杂的金融计算和逻辑推理。</p>
                        <p><span className="text-amber-400">机会：</span>这是 AlphaPai 的目标定位——从"读懂"到"算对"再到"帮用户做任务 甚至决策"。</p>
                      </div>
                    </div>
                  </div>

                  {/* 演进箭头 */}
                  <div className="flex items-center justify-center gap-2 mt-5 text-xs text-zinc-600">
                    <span className="px-3 py-1 rounded bg-zinc-800/50">有数据</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-3 py-1 rounded bg-zinc-800/50">看得完</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">能决策</span>
                  </div>
                </div>

                {/* 第二层：当前痛点 */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">2</div>
                    <h4 className="text-lg font-semibold text-zinc-100">当前 vendor 面临的困境</h4>
                  </div>
                  <p className="text-sm text-zinc-400 mb-6">
                    当前 vendor（包括 AlphaSense）解决不了的痛点。这是新的机会切入点：
                  </p>

                  <div className="space-y-4">
                    {/* 问题一 */}
                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-zinc-200 font-semibold mb-2">问题一："阅读理解"强，"计算能力"强，但融合力不够——用户不信</h5>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            现有工具大多无法提供 100% 确定性的溯源和计算，导致专业分析师不敢真正将核心业务交给 AI。
                          </p>
                          <div className="mt-3 px-3 py-2 rounded bg-blue-500/10 border border-blue-500/20">
                            <p className="text-xs text-blue-400">核心矛盾：信任危机——能力够了，但用户不敢用</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 问题二 */}
                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-zinc-200 font-semibold mb-2">问题二："标准摘要"泛滥，但"专属逻辑"缺失</h5>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            同样的研报，初级研究员看的是营收涨跌，顶级基金经理看的是"应收账款周转率与高管离职率的交叉验证"。全球的工具都在给用户提供标准的、同质化的摘要，却无法学习和模拟某个资深分析师特有的"看盘逻辑"。
                          </p>
                          <div className="mt-3 px-3 py-2 rounded bg-blue-500/10 border border-blue-500/20">
                            <p className="text-xs text-blue-400">核心矛盾：没有差异化——每个人拿到的分析结果都一样</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 问题三 */}
                    <div className="p-5 rounded-xl bg-zinc-900/60 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-zinc-200 font-semibold mb-2">问题三："买断数据"模式在全球有效，在国内的壁垒建立方式难以直接复制</h5>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            AlphaSense 可以花钱收购 Tegus 获取独家访谈数据。但在中国，底层金融数据封闭，数据采购的合规成本和获取难度高，所以数据质量更重要。
                          </p>
                          <div className="mt-3 px-3 py-2 rounded bg-blue-500/10 border border-blue-500/20">
                            <p className="text-xs text-blue-400">核心矛盾：数据合规与数据成本问题--需要数据质量建立壁垒</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 【5】算法架构思考 */}
          {activeSection === 'algorithm' && (
            <motion.div
              key="algorithm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <header>
                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3">算法架构思考：从底层引擎到技能编排</h2>
                <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
                  <p>算法上有两个思考：</p>
                  <p>（1）从产品体验的角度，与 LLM 的核心区别应该是在于对"思考逻辑"与"数据准确性"的 balance：即要求算法架构将"财报数字（定量）"和"高管表态（定性）"建立因果联系，这是支撑能面向金融用户的 Workflow 的产品能力的底层引擎。</p>
                  <p>（2）Anthropic 刚刚开放了 financial-analysis 插件（DCF、LBO、三表建模），意味着基础的 model/research 等能力渐渐成为"水电煤"一样的基础设施。对 AlphaPai 来说，已经不能再去卷"AI 自动算 DCF"或者"AI 写财报点评"，要把基础金融技能（DCF、LBO 等）视为可调用组件、由 Master Controller 编排非标分析逻辑的技能编排层。</p>
                  <p>具体方式如下：</p>
                </div>
                {/* 板块导航 */}
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setAlgoTab('dual-engine')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      algoTab === 'dual-engine'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 hover:text-zinc-300'
                    }`}
                  >
                    板块一：双引擎模式
                  </button>
                  <button
                    onClick={() => setAlgoTab('orchestration')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      algoTab === 'orchestration'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 hover:text-zinc-300'
                    }`}
                  >
                    板块二：技能编排层
                  </button>
                </div>
              </header>

              {algoTab === 'dual-engine' && (
              <div className="space-y-8">
                {/* AlphaSense 的技术洞察 */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30">
                  <h3 className="text-xl font-medium text-zinc-100 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400"/> AlphaSense 的做法
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-blue-400 font-semibold text-sm">why？</h4>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span><strong className="text-zinc-300">单看数字不够：</strong>营收增长30%，但不知道是因为价格上涨还是销量增加</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span><strong className="text-zinc-300">单听表态不够：</strong>CEO说"市场需求强劲"，但没有数据支撑无法验证</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span><strong className="text-zinc-300">融合带来洞察：</strong>当"unprecedented demand"出现时，同步看到能源业务收入暴涨148%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-blue-400 font-semibold text-sm">Generative Search 的技术实现</h4>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span><strong className="text-zinc-300">语义理解：</strong>识别"unprecedented"等情绪强烈的词汇</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span><strong className="text-zinc-300">时序对齐：</strong>将Q3电话会议的发言与Q3财报数据精确匹配</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span><strong className="text-zinc-300">因果推理：</strong>自动发现"管理层语气变化"与"业务数据异动"的关联</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 组合技术方案 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-400"/> 可以尝试的技术方案
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <h4 className="text-blue-400 font-semibold">RAG 检索增强</h4>
                      </div>
                      <p className="text-sm text-zinc-400 mb-3">处理"定性"数据</p>
                      <ul className="space-y-2 text-xs text-zinc-500">
                        <li>• 向量化存储财报、电话会议、研报</li>
                        <li>• 语义搜索定位关键表态</li>
                        <li>• 情绪分析识别语气变化</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Database className="w-5 h-5 text-blue-400" />
                        </div>
                        <h4 className="text-blue-400 font-semibold">Text-to-SQL</h4>
                      </div>
                      <p className="text-sm text-zinc-400 mb-3">处理"定量"数据</p>
                      <ul className="space-y-2 text-xs text-zinc-500">
                        <li>• 自然语言转SQL查询</li>
                        <li>• 自动抓取财务指标</li>
                        <li>• 计算环比/同比增速</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <h4 className="text-blue-400 font-semibold">Multi-Agent 主控路由</h4>
                      </div>
                      <p className="text-sm text-zinc-400 mb-3">把定性和定量结果整合起来（核心）</p>
                      <ul className="space-y-2 text-xs text-zinc-500">
                        <li>• 协调Agent 1和Agent 2并行工作</li>
                        <li>• 建立定性与定量的因果推理链</li>
                        <li>• 生成综合投资建议报告</li>
                        <li>• 主动发现数据异动与表态的关联</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 双引擎架构演示 */}
                <section>
                  <SovereignTrustDemo />
                </section>

                {/* 交互式Demo */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-400"/> 交互式演示：Multi-Agent 协作分析
                    </h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      前端 Mock 演示
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-blue-400 font-semibold">演示场景：</span>
                      用户提问"比亚迪最近的降价策略（定性）对其单车毛利（定量）有什么影响？"
                      <br/>
                      <span className="text-blue-400">Agent 1</span> 去RAG库检索"比亚迪降价"、"策略"、"高管会议"的文本段落；
                      <span className="text-blue-400">Agent 2</span> 写SQL拉取近四个季度的"单车毛利"和"销量"数据；
                      <span className="text-blue-400">Agent 3</span> 将定性故事与定量数据整合，生成最终深度分析报告。
                    </p>
                  </div>
                  
                  <div className="glass-card p-6">
                    <QualQuantAnalysis />
                  </div>
                </div>

                {/* 技术实现细节 */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-medium text-zinc-200 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-zinc-400"/> 技术实现路径
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-zinc-300 font-semibold mb-3 text-sm">数据层</h4>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span><strong className="text-zinc-300">向量数据库：</strong>Pinecone/Weaviate存储文本Embedding</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span><strong className="text-zinc-300">关系数据库：</strong>PostgreSQL存储结构化财务数据</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span><strong className="text-zinc-300">时序对齐：</strong>通过时间戳将定性与定量数据关联</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-zinc-300 font-semibold mb-3 text-sm">Agent层</h4>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span><strong className="text-zinc-300">RAG Agent：</strong>负责检索相关文本并提取关键表态</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span><strong className="text-zinc-300">SQL Agent：</strong>将用户问题转为SQL并执行查询</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span><strong className="text-zinc-300">Synthesizer：</strong>协调两个Agent，建立因果推理链</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {algoTab === 'orchestration' && (
              <div className="space-y-8">
                {/* 战略修正 */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                  <h3 className="text-xl font-medium text-zinc-100 mb-4 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-blue-400"/> 战略定位：核心价值在沉淀和复用skills（沉淀方式在【4.workflow】会展开）
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    DCF、LBO、三表建模这些基础技能应被视为 AlphaPai 的<span className="text-amber-400 font-semibold">「内置组件」</span>而非卖点。我们的核心价值必须上移到<span className="text-blue-400 font-semibold">「非标逻辑的编排」（Orchestration）</span>。重心从"AI 能算数"转向"AI 能学习用户的分析范式"。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                      <p className="text-xs text-zinc-500 mb-1">❌ 旧定位</p>
                      <p className="text-sm text-zinc-400">"我们能用 AI 算 DCF、写财报点评"</p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <p className="text-xs text-blue-400 mb-1">✓ 新定位</p>
                      <p className="text-sm text-zinc-300">"我们能编排用户的分析逻辑，调度一切工具为用户所用"</p>
                    </div>
                  </div>
                </div>

                {/* Master Controller 架构图 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-400"/> Skill Orchestration 架构
                  </h3>

                  {/* 三层架构 */}
                  <div className="space-y-3">
                    {/* 顶层：Master Controller */}
                    <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/15 to-blue-400/10 border border-blue-500/40 relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-blue-400 font-semibold">Master Controller</h4>
                          <p className="text-[10px] text-zinc-500">AlphaPai 的核心竞争力</p>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        理解用户的分析意图，将非标准化的投研逻辑拆解为可执行的技能调用序列。不是简单的 API 串联，而是基于 Playbook 模板的<span className="text-blue-400">智能编排</span>。
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">意图理解</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">逻辑拆解</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">结果校验</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Playbook 驱动</span>
                      </div>
                    </div>

                    {/* 调度箭头 */}
                    <div className="flex items-center justify-center gap-2 text-xs text-zinc-600 py-1">
                      <span className="text-zinc-600">▼ 调度 & 编排</span>
                    </div>

                    {/* 中层：技能插件层 */}
                    <div className="p-5 rounded-xl bg-zinc-800/30 border border-zinc-700/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                          <Plug className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div>
                          <h4 className="text-zinc-300 font-semibold">技能插件层（Skill Plugins）</h4>
                          <p className="text-[10px] text-zinc-600">标准化金融技能 — 内置组件，非卖点</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['DCF 估值', 'LBO 分析', '三表建模', '财报点评', '同业对比', '敏感性分析', '情景模拟', '指标计算'].map((skill) => (
                          <div key={skill} className="px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/30 text-center">
                            <p className="text-xs text-zinc-500">{skill}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-zinc-600 mt-3 text-center italic">
                        这些能力来自大模型平台插件或自研模块 — 像调用 API 一样即插即用
                      </p>
                    </div>

                    {/* 调度箭头 */}
                    <div className="flex items-center justify-center gap-2 text-xs text-zinc-600 py-1">
                      <span className="text-zinc-600">▼ 数据 & 结果</span>
                    </div>

                    {/* 底层：双引擎 */}
                    <div className="p-5 rounded-xl bg-zinc-800/20 border border-zinc-700/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-zinc-700/30 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div>
                          <h4 className="text-zinc-400 font-semibold">底层双引擎</h4>
                          <p className="text-[10px] text-zinc-600">定性 RAG + 定量 Text-to-SQL（详见板块一）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 示例场景 */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20">
                  <h3 className="text-lg font-medium text-zinc-200 mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-400"/> 示例：Master Controller 如何工作
                  </h3>
                  <p className="text-sm text-zinc-500 mb-4">用户指令："帮我分析比亚迪是否值得在当前价位建仓，参考我上次做宁德时代的分析框架"</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 font-bold text-[10px]">1</span>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300">Master Controller 解析意图，加载用户的"宁德时代 Playbook"模板</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 font-bold text-[10px]">2</span>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300">并行调度：<span className="text-zinc-500">DCF 插件 → 估值 ｜ 三表建模插件 → 财务健康 ｜ RAG → 高管表态 ｜ 同业对比 → 行业位置</span></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 font-bold text-[10px]">3</span>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-300">交叉校验各插件结果，按 Playbook 逻辑链组装最终分析报告</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-400 font-bold text-[10px]">★</span>
                      </div>
                      <div>
                        <p className="text-sm text-amber-400/80">关键差异：别人调用 DCF 插件只能得到一个数字；AlphaPai 知道<span className="text-amber-400 font-semibold">何时调用、如何组合、怎样校验</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 核心信息 */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-amber-500/10 border border-blue-500/20">
                  <p className="text-center text-zinc-300 text-sm leading-relaxed">
                    <span className="text-blue-400 font-semibold">AlphaPai 不是在重新造轮子</span>
                    <span className="text-zinc-600 mx-2">—</span>
                    <span className="text-amber-400 font-semibold">要制造驱动轮子的引擎</span>
                  </p>
                  <p className="text-center text-zinc-600 text-xs mt-2">
                    这验证了 Module 4（Workflow 沉淀）的前瞻性：重心从"AI 能算数"转向"AI 能学习用户的分析范式"
                  </p>
                </div>
              </div>
              )}
            </motion.div>
          )}

          {/* 【3】深度Workflow沉淀 */}
          {activeSection === 'workflow' && (
            <motion.div
              key="workflow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <header>
                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3">深度Workflow沉淀：把分析师的经验变成可复用的流程</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  不再拼数据量，而是把顶级分析师的分析经验，变成平台上可复用、可传承的标准流程。这是定义下一代金融AI工具的核心能力。
                </p>
              </header>

              {/* Skills vs Orchestration 对比 */}
              <OrchestrationCompare />

              <div className="space-y-8">

                {/* 四大功能模块 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-400"/> 几种可尝试的方式（和交互体验）
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 模块1 */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <LinkIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-blue-400 font-semibold">1. 逻辑关系连线</h4>
                          <p className="text-xs text-zinc-500">Relational Highlighting</p>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm text-zinc-400">
                        <p><strong className="text-zinc-300">核心功能：</strong>从"单点高亮"升级到"连线建立因果关系"</p>
                        <p><strong className="text-zinc-300">用户行为：</strong>划选"加大经销商补贴" → 拖拽连线 → 连接到"Q4销售费用率"指标 → 打标签[正相关/增加压力]</p>
                        <p><strong className="text-zinc-300">产出：</strong>形成由人类构建的"行业知识图谱"，每条连线都是一段真实的分析推理</p>
                      </div>
                    </div>

                    {/* 模块2 */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-blue-400 font-semibold">2. 可复制的分析模板</h4>
                          <p className="text-xs text-zinc-500">Analysis Playbooks</p>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm text-zinc-400">
                        <p><strong className="text-zinc-300">核心功能：</strong>将零散的Prompt变成可复用的标准分析流程</p>
                        <p><strong className="text-zinc-300">用户行为：</strong>记录分析路径 → 拉取毛利率 → 对比原材料价格 → 计算利润吸收率 → 保存为模板</p>
                        <p><strong className="text-zinc-300">产出：</strong>初级研究员一键运行资深分析师的模板，直接获得顶级分析逻辑</p>
                      </div>
                    </div>

                    {/* 模块3 */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <GitBranch className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-blue-400 font-semibold">3. GitHub模式</h4>
                          <p className="text-xs text-zinc-500">Fork & Iteration</p>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm text-zinc-400">
                        <p><strong className="text-zinc-300">核心功能：</strong>分析流程的版本管理与团队协作</p>
                        <p><strong className="text-zinc-300">用户行为：</strong>明星分析师发布"识别产能延期风险"Prompt → 其他人Fork并加入"出海关税变量"</p>
                        <p><strong className="text-zinc-300">产出：</strong>平台变成"分析逻辑的开源社区"，好的分析流程不断被改进和传播</p>
                      </div>
                    </div>

                    {/* 模块4 */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Eye className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-blue-400 font-semibold">4. AI行为观察</h4>
                          <p className="text-xs text-zinc-500">Shadow AI Copilot</p>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm text-zinc-400">
                        <p><strong className="text-zinc-300">核心功能：</strong>自动发现用户的操作习惯</p>
                        <p><strong className="text-zinc-300">用户行为：</strong>系统观察到用户看"宁德时代"前总是先打开"欧洲新能源车渗透率"</p>
                        <p><strong className="text-zinc-300">产出：</strong>AI主动提示生成"宁德时代专属数据面板"，把无意识的习惯变成自动化流程</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 交互式Demo - 模块1：双向实体连线 */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-blue-400"/> 模块1：逻辑关系连线
                    </h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      交互式演示
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-blue-400 font-semibold">演示说明：</span>
                      请用鼠标划选左侧电话会议纪要中的任意段落，系统将自动识别关键信息并建立与右侧财务指标的逻辑连接。
                      每一次划选都会在底部生成一条日志，记录分析师的判断逻辑。
                    </p>
                  </div>
                  
                  <div className="glass-card p-6">
                    <AnalystBrainCapture />
                  </div>
                </div>

                {/* 交互式Demo - 模块2：分析模板 */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-400"/> 模块2：分析模板构建器
                    </h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      交互式演示
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-blue-400 font-semibold">演示说明：</span>
                      点击"开始记录分析路径"，然后从左侧选择操作步骤（拉取数据、对比数据、AI分析）添加到右侧流程面板。
                      完成后保存为模板，其他研究员可以一键运行你的分析逻辑。
                    </p>
                  </div>
                  
                  <div className="glass-card p-6">
                    <PlaybookBuilder />
                  </div>
                </div>

                {/* 交互式Demo - 模块3：GitHub模式 */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-blue-400"/> 模块3：策略共享 - Fork & Iteration
                    </h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      交互式演示
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-blue-400 font-semibold">演示说明：</span>
                      浏览明星分析师分享的顶级 Prompt，点击"Fork"按钮可以复制并改进他们的分析逻辑。
                      就像 GitHub 一样，好的分析流程会不断被改进和传播。
                    </p>
                  </div>
                  
                  <div className="glass-card p-6">
                    <PromptForkDemo />
                  </div>
                </div>

                {/* 交互式Demo - 模块4：AI行为观察 */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-zinc-100 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-400"/> 模块4：AI行为观察
                    </h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      交互式演示
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-blue-400 font-semibold">演示说明：</span>
                      点击"模拟观察"按钮，AI 会在后台观察你的操作习惯（打开哪些文档、查看哪些数据）。
                      当发现规律后，AI 会主动建议为你创建个性化的数据面板。
                    </p>
                  </div>
                  
                  <div className="glass-card p-6">
                    <ShadowAIDemo />
                  </div>
                </div>

                {/* 商业价值 */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-medium text-zinc-200 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-zinc-400"/> 商业价值与竞争优势
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-zinc-300 font-semibold mb-3 text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        对机构的价值
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>新人培养周期从3年缩短至3个月</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>顶级分析师的分析逻辑永久保留</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>团队协作效率提升10倍</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-zinc-300 font-semibold mb-3 text-sm flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        对产品的价值
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>形成独有的"分析模板资产库"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>用户粘性极高，难以迁移</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>网络效应：用的人越多越智能</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-zinc-300 font-semibold mb-3 text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        竞争优势
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>数据优势：人类标注的分析逻辑无法被爬取</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>时间优势：需要长期积累才能形成</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>标准优势：定义了行业新的分析方式</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 【7】插件生态思考 */}
          {activeSection === 'plugin' && (
            <motion.div
              key="plugin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <header>
                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3">插件生态思考：要不要自己做插件？</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  AlphaSense 是操作系统逻辑，不是做附加功能。
                  <br /><br />
                  但在这个过程中，大量插件公司（如 Rogo、Hebbia、BamSEC）选择只做工作流中的一个环节（切入）。
                  <br />
                  对 AlphaPai 来说，如果2026年能持续构建插件生态，将有利于整个平台布局。
                </p>
              </header>

              {/* 插件公司的生存逻辑 */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium text-zinc-100 mb-2 flex items-center gap-2">
                  <Plug className="w-5 h-5 text-blue-400" /> 插件公司的生存逻辑
                </h3>
                <p className="text-xs text-zinc-500 mb-6">在巨头的工作流缝隙中，一批插件公司正在快速生长</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm text-zinc-200 font-semibold">Rogo</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">投行研究</span>
                      </div>
                      <p className="text-xs text-zinc-400 mb-2">专注投行级别的金融问答和数据提取，对接 SEC 文件、财报、研报。</p>
                      <p className="text-[10px] text-zinc-500 mb-3">定位：工作流中"快速问答"这一个环节</p>
                      <div className="rounded-lg border border-zinc-700/50 overflow-hidden bg-zinc-950">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/80 border-b border-zinc-800/50">
                          <span className="text-[10px] text-zinc-500">Rogo 深度研究笔记</span>
                          <a href="https://www.notion.so/Rogo-2a2ea08fc2a7804ea87ac39e65fc5b36?source=copy_link" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1"><span>新窗口打开</span><ExternalLink className="w-2.5 h-2.5" /></a>
                        </div>
                        <iframe src="https://www.notion.so/Rogo-2a2ea08fc2a7804ea87ac39e65fc5b36" className="w-full h-[280px] border-0" title="Rogo 深度研究" />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm text-zinc-200 font-semibold">Hebbia</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">文档分析</span>
                      </div>
                      <p className="text-xs text-zinc-400 mb-2">用 AI 矩阵批量处理数百份文档，提取结构化信息填入表格。</p>
                      <p className="text-[10px] text-zinc-500">定位：工作流中"批量文档处理"这一个环节</p>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm text-zinc-200 font-semibold">BamSEC</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">SEC 文件</span>
                      </div>
                      <p className="text-xs text-zinc-400 mb-2">让 SEC 文件变得可搜索、可对比，已被 AlphaSense 收购。</p>
                      <p className="text-[10px] text-zinc-500">定位：工作流中"监管文件检索"这一个环节</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-sm text-zinc-300">
                      共同特征：这些公司都只做工作流中的一小段，做到极致，然后要么被平台收购（BamSEC → AlphaSense），要么成为平台的标准插件。
                    </p>
                  </div>
                </div>
              </div>

              {/* 针对不同模块功能的具体策略 */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium text-zinc-100 mb-2 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-400" /> 建议：针对不同模块功能的具体策略
                </h3>
                <p className="text-xs text-zinc-500 mb-6">插件功能是否值得自己做，取决于它在价值链中的位置</p>

                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 font-bold text-sm">A</span>
                      </div>
                      <div>
                        <h5 className="text-blue-400 font-semibold mb-2">可以开放接口——生态合作层</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="p-2 rounded bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-400">
                            <p className="text-blue-400 font-semibold mb-1">报告输出格式</p>
                            <p>对接 Word/PPT/邮件等下游工具</p>
                          </div>
                          <div className="p-2 rounded bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-400">
                            <p className="text-blue-400 font-semibold mb-1">行业垂直模块</p>
                            <p>医药管线、新能源产业链等专业数据模块</p>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-500">理由：这些功能重要但不构成核心差异化。开放接口让第三方来做，专注"加工引擎"本身。</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 font-bold text-sm">B</span>
                      </div>
                      <div>
                        <h5 className="text-blue-400 font-semibold mb-2">先观察再决定——潜在收购层</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <div className="p-2 rounded bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-400">
                            <p className="text-blue-400 font-semibold mb-1">类 Rogo 的问答插件</p>
                            <p>如果用户高频使用且数据开始沉淀，考虑收购或自建</p>
                          </div>
                          <div className="p-2 rounded bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-400">
                            <p className="text-blue-400 font-semibold mb-1">类 Hebbia 的批量处理</p>
                            <p>如果成为用户核心工作流的一部分，不能让第三方掐住</p>
                          </div>
                          <div className="p-2 rounded bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-400">
                            <p className="text-blue-400 font-semibold mb-1">专家网络对接</p>
                            <p>类似 Tegus 的访谈数据，如果能获取独家内容则价值极高</p>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-500">理由：参考 AlphaSense 收购 BamSEC 和 Tegus 的逻辑——当插件开始触及核心数据资产时，就是收购的时机。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* ═══ 三种视觉方案 ═══ */}
              <div className="space-y-8 mt-4 p-8 rounded-2xl backdrop-blur-md bg-white/[0.08] border border-white/[0.12] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-zinc-100 mb-2">与插件提供商的合作关系</h3>
                </div>

                <DemoB_LogicAssembly />
              </div>

            </motion.div>
          )}

          {/* 【Summary】总结 */}
          {activeSection === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Summary</h2>
              </div>

              <p className="text-zinc-400 text-base leading-relaxed text-center max-w-2xl mx-auto">
                以上，正好对应我对这张图的理解：
              </p>

              <div className="rounded-xl overflow-hidden border border-zinc-800/50 bg-white/[0.03] max-w-xl mx-auto">
                <img
                  src={`${import.meta.env.BASE_URL}research-value.png.jpg`}
                  alt="研究的核心价值？高质信息、非共识认知、市场参与主体的关系管理"
                  className="w-full h-auto"
                />
              </div>

              {/* 三大支柱深度解读 */}
              <div className="max-w-5xl mx-auto space-y-4 pt-4">
                <p className="text-center text-xs text-zinc-600 tracking-widest uppercase mb-6">深度对齐</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pillar 1 */}
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] overflow-hidden">
                    <div className="px-5 py-4 border-b border-blue-500/10">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">1</span>
                        <h3 className="text-sm font-semibold text-zinc-100">高质信息</h3>
                      </div>
                      <p className="text-[10px] text-blue-400/70 mt-1">从"搜得到"到"能确权" · Deterministic Information</p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        图中的"高质信息"是研究的基础。在 AI 时代，单纯的"量大"还不够。
                      </p>
                      <div className="p-3 rounded-lg bg-blue-500/[0.06] border border-blue-500/10">
                        <p className="text-[10px] text-blue-300 font-semibold mb-1 flex items-center gap-1.5">
                          <Cpu className="w-3 h-3" />  → Module 3：算法架构（双引擎）
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          通过 Deterministic Core（确定性引擎）对信息进行"提纯"和"验证"。
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                        <p className="text-[10px] text-zinc-500 font-semibold mb-1">战略价值</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          高质信息 = <span className="text-blue-400">"经过逻辑验证、可放进决策漏斗的真实变量"</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2 — Red theme */}
                  <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] overflow-hidden">
                    <div className="px-5 py-4 border-b border-red-500/10">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs shrink-0">2</span>
                        <h3 className="text-sm font-semibold text-zinc-100">非共识认知</h3>
                      </div>
                      <p className="text-[10px] text-red-400/70 mt-1">"非标逻辑"的银行 · Proprietary Alpha</p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        共识不赚钱，只有<span className="text-red-400 font-medium">非共识且正确的认知</span>才能产生 Alpha。
                      </p>
                      <div className="p-3 rounded-lg bg-red-500/[0.06] border border-red-500/10">
                        <p className="text-[10px] text-red-300 font-semibold mb-1 flex items-center gap-1.5">
                          <Target className="w-3 h-3" />  → Module 4 & 5：Workflow 与交互设计
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          通过 Analysis Playbooks 记录分析师<span className="text-red-300">"与众不同的思维链"</span>，为每位顶级分析师建立"逻辑数字孪生"。
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                        <p className="text-[10px] text-zinc-500 font-semibold mb-1">战略视角</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          <span className="text-red-400">"非标的、独家的逻辑编排"</span>才是用户愿意付费的资产。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] overflow-hidden">
                    <div className="px-5 py-4 border-b border-blue-500/10">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">3</span>
                        <h3 className="text-sm font-semibold text-zinc-100">关系管理</h3>
                      </div>
                      <p className="text-[10px] text-blue-400/70 mt-1">投研的"协同操作系统" · Relationship & Value Delivery</p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        研究不是孤立的，它发生在"分析员"、"交易员"和"基金经理"之间。
                      </p>
                      <div className="p-3 rounded-lg bg-blue-500/[0.06] border border-blue-500/10">
                        <p className="text-[10px] text-blue-300 font-semibold mb-1 flex items-center gap-1.5">
                          <Share2 className="w-3 h-3" />  → Module 6 & 7：商业模式与插件生态
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          交付<span className="text-blue-300">"可交互的逻辑沙箱"</span>，基金经理可以自己跑一遍数据验证。
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                        <p className="text-[10px] text-zinc-500 font-semibold mb-1">战略地位</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          AlphaPai = <span className="text-blue-400">"人与人、机构与机构"之间逻辑交换的协议栈</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
