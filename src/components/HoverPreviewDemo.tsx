import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Play, Pause } from 'lucide-react';

export const HoverPreviewDemo = () => {
  const [hoveredRef, setHoveredRef] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const references = [
    {
      id: 1,
      text: '出海毛利率将迎来拐点',
      timestamp: 'Q3-12:45',
      context: '我们在海外市场的布局已经进入收获期，特别是欧洲和东南亚市场。随着规模效应的显现，预计Q4出海业务的毛利率将从目前的18%提升至22%以上。',
      speaker: 'CFO 李明',
      sentiment: 'positive',
      audioWaveform: [0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.3, 0.6, 0.4, 0.9, 0.5, 0.7]
    },
    {
      id: 2,
      text: '原材料成本压力有所缓解',
      timestamp: 'Q3-18:22',
      context: '关于成本端，我们看到碳酸锂价格从年初的高点已经回落了约30%。虽然短期内还有一些波动，但整体趋势是向下的，这对我们的毛利率改善是一个积极信号。',
      speaker: 'CEO 王传福',
      sentiment: 'neutral',
      audioWaveform: [0.4, 0.5, 0.3, 0.6, 0.4, 0.5, 0.3, 0.4, 0.5, 0.6, 0.4, 0.5]
    },
    {
      id: 3,
      text: '下沉市场的渗透策略',
      timestamp: 'Q3-25:10',
      context: '我们将加大在三四线城市的经销商补贴力度。虽然这会在短期内对销售费用率造成一定压力，但我们认为这是必要的战略投入，长期来看会带来可观的市场份额提升。',
      speaker: 'COO 何龙',
      sentiment: 'cautious',
      audioWaveform: [0.5, 0.4, 0.6, 0.5, 0.7, 0.4, 0.6, 0.5, 0.4, 0.6, 0.5, 0.4]
    }
  ];

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 左侧：会议纪要摘要 */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-zinc-300 font-semibold">比亚迪 2024 Q3 电话会议摘要</h4>
          <span className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-400">AI 生成</span>
        </div>
        
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
          <p>
            本季度公司整体表现超出市场预期，营收同比增长28%。管理层重点强调了三个战略方向：
          </p>
          
          <ul className="space-y-3 ml-4">
            <li className="relative">
              <span className="text-zinc-400">1. </span>
              <span
                className="relative cursor-pointer hover:text-indigo-300 transition-colors"
                onMouseEnter={() => setHoveredRef(1)}
                onMouseLeave={() => setHoveredRef(null)}
              >
                {references[0].text}
                <sup className="ml-1 text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  [{references[0].timestamp}]
                </sup>
              </span>
              ，预计Q4海外业务毛利率将提升至22%以上。
            </li>
            
            <li className="relative">
              <span className="text-zinc-400">2. </span>
              <span
                className="relative cursor-pointer hover:text-emerald-300 transition-colors"
                onMouseEnter={() => setHoveredRef(2)}
                onMouseLeave={() => setHoveredRef(null)}
              >
                {references[1].text}
                <sup className="ml-1 text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  [{references[1].timestamp}]
                </sup>
              </span>
              ，碳酸锂价格已从高点回落30%。
            </li>
            
            <li className="relative">
              <span className="text-zinc-400">3. </span>
              <span
                className="relative cursor-pointer hover:text-amber-300 transition-colors"
                onMouseEnter={() => setHoveredRef(3)}
                onMouseLeave={() => setHoveredRef(null)}
              >
                {references[2].text}
                <sup className="ml-1 text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  [{references[2].timestamp}]
                </sup>
              </span>
              将持续推进，虽然短期内会增加销售费用。
            </li>
          </ul>
          
          <p className="pt-2 text-zinc-500 text-xs italic">
            💡 提示：将鼠标悬停在高亮文字上，查看原文上下文和音频片段
          </p>
        </div>
      </div>

      {/* 右侧：伴随式听阅面板 */}
      <div className="relative">
        <div className="sticky top-6">
          <div className="glass-card p-6 min-h-[400px]">
            <h4 className="text-zinc-300 font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-400" />
              伴随式听阅面板
            </h4>
            
            <AnimatePresence mode="wait">
              {hoveredRef === null ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-[320px]"
                >
                  <p className="text-zinc-600 text-sm text-center">
                    悬停在左侧引用标号上<br/>查看原文上下文和音频
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`ref-${hoveredRef}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* 说话人信息 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {references[hoveredRef - 1].speaker.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">
                          {references[hoveredRef - 1].speaker}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {references[hoveredRef - 1].timestamp}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      references[hoveredRef - 1].sentiment === 'positive' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : references[hoveredRef - 1].sentiment === 'neutral'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {references[hoveredRef - 1].sentiment === 'positive' ? '积极' : 
                       references[hoveredRef - 1].sentiment === 'neutral' ? '中性' : '谨慎'}
                    </span>
                  </div>

                  {/* 原文上下文 */}
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                    <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">原文上下文</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {references[hoveredRef - 1].context}
                    </p>
                  </div>

                  {/* 音频播放器 */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                        15秒音频片段
                      </p>
                      <button
                        onClick={handlePlayAudio}
                        className="w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center text-white"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                    </div>
                    
                    {/* 音频波形动画 */}
                    <div className="flex items-center justify-center gap-1 h-16">
                      {references[hoveredRef - 1].audioWaveform.map((height, index) => (
                        <motion.div
                          key={index}
                          className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                          initial={{ height: '20%' }}
                          animate={{
                            height: isPlaying ? `${height * 100}%` : '20%',
                          }}
                          transition={{
                            duration: 0.3,
                            delay: isPlaying ? index * 0.05 : 0,
                            repeat: isPlaying ? Infinity : 0,
                            repeatType: 'reverse',
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                      <span>00:00</span>
                      <span>00:15</span>
                    </div>
                  </div>

                  {/* 快捷操作 */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors">
                      查看完整会议
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs font-medium transition-colors border border-indigo-500/30">
                      添加到笔记
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
