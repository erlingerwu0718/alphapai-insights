import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, Sparkles, CheckCircle2, X, TrendingUp, Globe, FileText
} from 'lucide-react';

interface Observation {
  id: number;
  action: string;
  insight: string;
  suggestion: string;
}

export const ShadowAIDemo = () => {
  const [isObserving, setIsObserving] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const simulateObservation = () => {
    setIsObserving(true);
    setCurrentStep(0);
    setObservations([]);
    setShowSuggestion(false);

    // 模拟观察过程
    const steps = [
      {
        action: '打开"宁德时代"财报',
        insight: '检测到用户正在分析宁德时代...',
      },
      {
        action: '切换到"欧洲新能源车渗透率"数据页',
        insight: '用户习惯性地查看欧洲市场数据',
      },
      {
        action: '打开"国内储能装机量"统计',
        insight: '用户总是同时关注储能业务',
      },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
        setObservations(prev => [...prev, {
          id: Date.now() + index,
          action: step.action,
          insight: step.insight,
          suggestion: ''
        }]);

        if (index === steps.length - 1) {
          setTimeout(() => {
            setShowSuggestion(true);
            setIsObserving(false);
          }, 1000);
        }
      }, (index + 1) * 1500);
    });
  };

  const acceptSuggestion = () => {
    alert('✓ 已为您创建"宁德时代专属数据面板"\n\n包含以下预置指标：\n• 欧洲新能源车渗透率\n• 国内储能装机量\n• 动力电池出货量\n\n下次打开宁德时代财报时，这些数据会自动加载到右侧面板。');
    setShowSuggestion(false);
    setObservations([]);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isObserving ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
          <span className="text-sm text-zinc-400">
            {isObserving ? 'AI 正在观察你的操作习惯...' : 'AI 观察待命中'}
          </span>
        </div>
        <button
          onClick={simulateObservation}
          disabled={isObserving}
          className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold text-sm hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          模拟观察
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：用户操作模拟 */}
        <div className="glass-card p-6">
          <h4 className="text-zinc-300 font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            用户操作序列
          </h4>
          <div className="space-y-3">
            {[
              { icon: <FileText className="w-4 h-4" />, label: '宁德时代 Q3 财报', active: currentStep >= 1 },
              { icon: <Globe className="w-4 h-4" />, label: '欧洲新能源车渗透率', active: currentStep >= 2 },
              { icon: <TrendingUp className="w-4 h-4" />, label: '国内储能装机量', active: currentStep >= 3 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: item.active ? 1 : 0.3,
                  scale: item.active ? 1 : 0.95
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  item.active 
                    ? 'border-emerald-500/50 bg-emerald-500/10' 
                    : 'border-zinc-800 bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-600'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${
                      item.active ? 'text-zinc-200' : 'text-zinc-500'
                    }`}>
                      {item.label}
                    </p>
                  </div>
                  {item.active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 右侧：AI 观察日志 */}
        <div className="glass-card p-6">
          <h4 className="text-zinc-300 font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            AI 观察日志
          </h4>
          <div className="space-y-3 min-h-[200px]">
            {observations.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-zinc-600 text-sm">等待观察数据...</p>
              </div>
            ) : (
              observations.map((obs, index) => (
                <motion.div
                  key={obs.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-lg bg-zinc-950 border border-zinc-800"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono">
                      Step {index + 1}
                    </span>
                    <p className="text-xs text-zinc-400 flex-1">{obs.action}</p>
                  </div>
                  <p className="text-sm text-zinc-300 ml-2">{obs.insight}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* AI 建议弹窗 */}
      <AnimatePresence>
        {showSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                  💡 AI 发现了你的习惯
                </h4>
                <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
                  检测到你在分析<span className="text-purple-400 font-semibold">宁德时代</span>前，总是习惯性地先查看
                  <span className="text-emerald-400 font-semibold">欧洲新能源车渗透率</span>和
                  <span className="text-emerald-400 font-semibold">国内储能装机量</span>这两个外部指标。
                </p>
                <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 mb-4">
                  <p className="text-sm text-zinc-400 mb-2">
                    <span className="text-indigo-400 font-semibold">建议：</span>
                    为你自动生成一个<span className="text-indigo-400 font-semibold">「宁德时代专属数据面板」</span>
                  </p>
                  <p className="text-xs text-zinc-500">
                    下次打开宁德时代财报时，这些前置指标会自动加载到右侧面板，并在摘要中重点关联这些数据。
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSuggestion(false)}
                    className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    暂不需要
                  </button>
                  <button
                    onClick={acceptSuggestion}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    立即创建
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
