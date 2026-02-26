import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch, Star, Copy, Edit, Users, TrendingUp, Eye
} from 'lucide-react';

interface Prompt {
  id: number;
  author: string;
  title: string;
  description: string;
  forks: number;
  stars: number;
  content: string;
  tags: string[];
}

export const PromptForkDemo = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showForkDialog, setShowForkDialog] = useState(false);
  const [forkContent, setForkContent] = useState('');
  const [forkNote, setForkNote] = useState('');

  const prompts: Prompt[] = [
    {
      id: 1,
      author: '张明（明星分析师）',
      title: '识别高管话术中的产能延期风险',
      description: '通过分析电话会议中的措辞变化，提前3个月预警产能延期',
      forks: 23,
      stars: 156,
      content: '分析以下电话会议纪要，重点关注：\n1. 管理层对"产能爬坡"的描述是否从"顺利"变为"稳步"\n2. 是否出现"优化"、"调整"等委婉词汇\n3. 对时间节点的表述是否从具体日期变为"预计"、"计划"\n4. 将发现的风险信号与历史案例对比',
      tags: ['产能分析', '风险预警', '文本挖掘']
    },
    {
      id: 2,
      author: '李华（资深研究员）',
      title: '新能源车企毛利率拆解模型',
      description: '将毛利率变化归因到电池成本、规模效应、产品结构三个维度',
      forks: 45,
      stars: 289,
      content: '基于财报数据，执行以下分析：\n1. 计算单车电池成本变化（电池采购价 × 单车带电量）\n2. 计算规模效应贡献（固定成本摊薄）\n3. 计算产品结构影响（高端车型占比变化）\n4. 生成瀑布图展示各因素贡献度',
      tags: ['毛利率分析', '成本拆解', '新能源']
    }
  ];

  const handleFork = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setForkContent(prompt.content);
    setForkNote('');
    setShowForkDialog(true);
  };

  const saveFork = () => {
    if (forkNote.trim()) {
      setShowForkDialog(false);
      setTimeout(() => {
        alert(`成功 Fork！\n\n你的改进：${forkNote}\n\n新版本已保存到你的工作区，其他人也可以继续 Fork 你的版本。`);
        setSelectedPrompt(null);
        setForkContent('');
        setForkNote('');
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 策略共享 */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-purple-400" />
          <h4 className="text-purple-400 font-semibold">策略共享</h4>
          <span className="ml-auto text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">
            {prompts.length} 个公开策略
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          明星分析师分享的顶级 Prompt，你可以 Fork 并在此基础上改进
        </p>
      </div>

      {/* Prompt 列表 */}
      <div className="grid grid-cols-1 gap-4">
        {prompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 hover:border-white/[0.25] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-zinc-200 font-semibold mb-1">{prompt.title}</h4>
                <p className="text-xs text-zinc-500 mb-2">by {prompt.author}</p>
                <p className="text-sm text-zinc-400">{prompt.description}</p>
              </div>
              <button
                onClick={() => handleFork(prompt)}
                className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all flex items-center gap-2 text-sm font-semibold"
              >
                <GitBranch className="w-4 h-4" />
                Fork
              </button>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-3">
              {prompt.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* 统计 */}
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                <span>{prompt.forks} Forks</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                <span>{prompt.stars} Stars</span>
              </div>
              <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                <Eye className="w-3.5 h-3.5" />
                <span>查看详情</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fork 对话框 */}
      <AnimatePresence>
        {showForkDialog && selectedPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowForkDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-semibold text-zinc-100">Fork 并改进</h3>
              </div>

              <div className="space-y-4">
                {/* 原始 Prompt */}
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">原始 Prompt</label>
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">
                      {selectedPrompt.content}
                    </p>
                  </div>
                </div>

                {/* 你的改进 */}
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">
                    你的改进 <span className="text-emerald-400">(例如：加入出海关税变量)</span>
                  </label>
                  <textarea
                    value={forkNote}
                    onChange={(e) => setForkNote(e.target.value)}
                    placeholder="描述你的改进思路..."
                    className="w-full h-24 px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 resize-none"
                    autoFocus
                  />
                </div>

                {/* 改进后的 Prompt */}
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">改进后的 Prompt（可编辑）</label>
                  <textarea
                    value={forkContent}
                    onChange={(e) => setForkContent(e.target.value)}
                    className="w-full h-32 px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowForkDialog(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={saveFork}
                  disabled={!forkNote.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  保存 Fork
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
