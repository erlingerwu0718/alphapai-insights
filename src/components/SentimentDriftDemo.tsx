import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface QuarterData {
  quarter: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  quote: string;
  speaker: string;
  keywords: string[];
}

export const SentimentDriftDemo = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);

  const topics = [
    {
      id: 'overseas',
      name: '海外扩产',
      quarters: [
        { quarter: 'Q1', sentiment: 'positive' as const, quote: '我们将不计代价地推进海外产能建设，欧洲工厂预计Q2投产。', speaker: 'CEO', keywords: ['不计代价', '加速推进', '全面出击'] },
        { quarter: 'Q2', sentiment: 'positive' as const, quote: '海外扩产进展顺利，匈牙利工厂已经开始试生产。', speaker: 'CEO', keywords: ['进展顺利', '按计划', '积极推进'] },
        { quarter: 'Q3', sentiment: 'neutral' as const, quote: '我们会根据市场需求，稳健地推进海外产能布局。', speaker: 'CEO', keywords: ['稳健推进', '根据需求', '优化节奏'] },
        { quarter: 'Q4', sentiment: 'negative' as const, quote: '考虑到当前的市场环境，我们会更加审慎地评估海外投资。', speaker: 'CEO', keywords: ['审慎评估', '降本增效', '优化投入'] }
      ]
    },
    {
      id: 'pricewar',
      name: '价格战',
      quarters: [
        { quarter: 'Q1', sentiment: 'positive' as const, quote: '我们有信心在价格竞争中保持优势，规模效应会持续显现。', speaker: 'CFO', keywords: ['有信心', '保持优势', '规模效应'] },
        { quarter: 'Q2', sentiment: 'neutral' as const, quote: '市场竞争确实激烈，但我们的成本控制能力在行业内领先。', speaker: 'CFO', keywords: ['竞争激烈', '成本控制', '行业领先'] },
        { quarter: 'Q3', sentiment: 'neutral' as const, quote: '价格压力依然存在，我们会通过技术创新来维持毛利率。', speaker: 'CFO', keywords: ['价格压力', '技术创新', '维持毛利'] },
        { quarter: 'Q4', sentiment: 'negative' as const, quote: '行业价格战比预期更加激烈，短期内毛利率会承受一定压力。', speaker: 'CFO', keywords: ['超预期', '承受压力', '短期承压'] }
      ]
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-emerald-500';
      case 'neutral': return 'bg-amber-500';
      case 'negative': return 'bg-rose-500';
      default: return 'bg-zinc-500';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-3 h-3" />;
      case 'neutral': return <Minus className="w-3 h-3" />;
      case 'negative': return <TrendingDown className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedQuarter(null);
  };

  const handleQuarterClick = (quarter: string) => {
    setSelectedQuarter(selectedQuarter === quarter ? null : quarter);
  };

  return (
    <div className="space-y-6">
      {/* 核心变量追踪卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTopicClick(topic.id)}
            className={`p-5 rounded-xl cursor-pointer transition-all ${
              selectedTopic === topic.id
                ? 'bg-indigo-500/20 border-2 border-indigo-500'
                : 'glass-card hover:border-white/[0.25]'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-zinc-200 font-semibold text-lg">{topic.name}</h4>
              <div className="flex gap-1">
                {topic.quarters.map((q) => (
                  <div
                    key={q.quarter}
                    className={`w-3 h-3 rounded-sm ${getSentimentColor(q.sentiment)} ${
                      q.sentiment === 'positive' ? 'opacity-100' :
                      q.sentiment === 'neutral' ? 'opacity-70' : 'opacity-50'
                    }`}
                    title={`${q.quarter}: ${q.sentiment}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-400">情绪趋势:</span>
              <div className="flex items-center gap-1">
                {topic.quarters[0].sentiment === 'positive' && (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    乐观
                  </span>
                )}
                <span className="text-zinc-600">→</span>
                {topic.quarters[3].sentiment === 'negative' && (
                  <span className="text-rose-400 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    谨慎
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 详细时间轴对比 */}
      <AnimatePresence mode="wait">
        {selectedTopic && (
          <motion.div
            key={selectedTopic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6"
          >
            <h4 className="text-zinc-200 font-semibold mb-6 flex items-center gap-2">
              <span className="text-lg">
                {topics.find(t => t.id === selectedTopic)?.name}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
                跨季度对比
              </span>
            </h4>

            <div className="grid grid-cols-4 gap-4">
              {topics.find(t => t.id === selectedTopic)?.quarters.map((q, index) => (
                <motion.div
                  key={q.quarter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuarterClick(q.quarter)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedQuarter === q.quarter
                      ? 'bg-indigo-500/20 border-2 border-indigo-500'
                      : 'bg-zinc-950 border border-zinc-800 hover:border-zinc-700'
                  }`}
                >

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-zinc-300">{q.quarter}</span>
                    <div className={`w-8 h-8 rounded-lg ${getSentimentColor(q.sentiment)} flex items-center justify-center text-white`}>
                      {getSentimentIcon(q.sentiment)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500">{q.speaker}</p>
                    <div className="flex flex-wrap gap-1">
                      {q.keywords.slice(0, 2).map((keyword, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 原话对比 */}
            <AnimatePresence>
              {selectedQuarter && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-5 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 overflow-hidden"
                >
                  <p className="text-xs text-indigo-400 font-semibold mb-3 uppercase tracking-wider">
                    {selectedQuarter} 原话
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    "{topics.find(t => t.id === selectedTopic)?.quarters.find(q => q.quarter === selectedQuarter)?.quote}"
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topics.find(t => t.id === selectedTopic)?.quarters.find(q => q.quarter === selectedQuarter)?.keywords.map((keyword, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
