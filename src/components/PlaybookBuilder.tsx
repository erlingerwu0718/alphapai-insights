import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Plus, Trash2, Save, Copy, FileText, Database, 
  TrendingUp, CheckCircle2, Sparkles
} from 'lucide-react';

interface Step {
  id: number;
  type: 'data' | 'analysis' | 'prompt';
  content: string;
  icon: React.ReactNode;
}

export const PlaybookBuilder = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [playbookName, setPlaybookName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const availableSteps = [
    { 
      type: 'data' as const, 
      label: '拉取数据', 
      icon: <Database className="w-4 h-4" />,
      content: '拉取比亚迪近三年毛利率数据'
    },
    { 
      type: 'data' as const, 
      label: '对比数据', 
      icon: <TrendingUp className="w-4 h-4" />,
      content: '对比同期碳酸锂价格走势'
    },
    { 
      type: 'prompt' as const, 
      label: 'AI分析', 
      icon: <Sparkles className="w-4 h-4" />,
      content: '结合以上数据，计算比亚迪对上游原材料降价的利润吸收率，并排除汇率影响'
    },
  ];

  const addStep = (step: typeof availableSteps[0]) => {
    const newStep: Step = {
      id: Date.now(),
      type: step.type,
      content: step.content,
      icon: step.icon,
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: number) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const savePlaybook = () => {
    if (playbookName.trim()) {
      setShowSaveDialog(false);
      // 模拟保存成功
      setTimeout(() => {
        alert(`分析模板 "${playbookName}" 已保存！\n\n其他研究员现在可以一键运行这个模板。`);
        setSteps([]);
        setPlaybookName('');
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              isRecording 
                ? 'bg-rose-500 text-white animate-pulse' 
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {isRecording ? '⏺ 记录中...' : '▶ 开始记录分析路径'}
          </button>
          {steps.length > 0 && (
            <span className="text-sm text-zinc-400">
              已添加 {steps.length} 个步骤
            </span>
          )}
        </div>
        {steps.length > 0 && (
          <button
            onClick={() => setShowSaveDialog(true)}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            保存为模板
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：可用步骤 */}
        <div className="glass-card p-6">
          <h4 className="text-zinc-300 font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            可用操作步骤
          </h4>
          <div className="space-y-3">
            {availableSteps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => isRecording && addStep(step)}
                disabled={!isRecording}
                whileHover={isRecording ? { scale: 1.02 } : {}}
                whileTap={isRecording ? { scale: 0.98 } : {}}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  isRecording
                    ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer'
                    : 'border-zinc-800 bg-zinc-900/50 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    step.type === 'data' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-300">{step.label}</p>
                    <p className="text-xs text-zinc-500 mt-1">{step.content}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 右侧：流程面板 */}
        <div className="glass-card p-6">
          <h4 className="text-zinc-300 font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            分析流程
          </h4>
          <div className="min-h-[300px]">
            {steps.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-zinc-600 text-sm">点击左侧步骤开始构建...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.type === 'data' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-0.5 h-8 bg-zinc-700 my-1" />
                        )}
                      </div>
                      <div className="flex-1 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                        <p className="text-sm text-zinc-300">{step.content}</p>
                      </div>
                      <button
                        onClick={() => removeStep(step.id)}
                        className="p-2 rounded-lg hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 保存对话框 */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowSaveDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">保存分析模板</h3>
              <input
                type="text"
                value={playbookName}
                onChange={(e) => setPlaybookName(e.target.value)}
                placeholder="例如：新能源整车-原材料降价红利测试模型"
                className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={savePlaybook}
                  disabled={!playbookName.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
