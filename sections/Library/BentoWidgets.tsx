import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, GitCommit, Users, BookOpen, GitMerge } from 'lucide-react';
import { fetchGithubData, fetchWakaTimeData } from '../../lib/clientDataCache';

const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-white/10 rounded-md ${className || ''}`} />
);

export const WakaTimeWidget = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWakaTimeData()
      .then(res => {
        if (res && (res.isLoaded || res.totalTime)) {
          setData(res);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-full w-full bg-[#0a0a12] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <Clock size={13} className="text-cyan-400" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider">Coding Activity</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">WAKATIME</span>
      </div>

      <div className="mb-2 sm:mb-3 relative z-10">
        {loading ? (
          <div className="space-y-1.5 py-0.5">
            <SkeletonPulse className="h-6 w-28" />
            <SkeletonPulse className="h-2.5 w-20" />
          </div>
        ) : (
          <>
            <h4 className="text-xl sm:text-2xl font-black text-white leading-none mb-1">{data?.totalTime || '0 hrs 0 mins'}</h4>
            <p className="text-[9px] sm:text-[10px] text-cyan-400 uppercase tracking-widest font-mono">Total Time Logged</p>
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        {loading ? (
          <div className="space-y-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonPulse className="w-2 h-2 rounded-full" />
                <SkeletonPulse className="h-2.5 flex-1" />
                <SkeletonPulse className="w-16 h-1.5 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1.5">
            {(data?.languages || []).slice(0, 4).map((lang: any, idx: number) => (
              <div key={lang.name} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300 font-medium">{lang.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{lang.percent}%</span>
                </div>
                <div className="w-16 sm:w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const GithubWidget = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubData()
      .then(res => {
        if (res && res.profile) setData(res.profile);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-full w-full bg-[#0a0a12] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <GitMerge size={13} className="text-purple-400" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider">Open Source</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">GITHUB</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10 flex-1">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col justify-center space-y-1.5">
              <SkeletonPulse className="h-6 w-12" />
              <SkeletonPulse className="h-2 w-16" />
            </div>
          ))
        ) : (
          <>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5">{data?.totalContributions ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-purple-400 uppercase tracking-widest font-mono flex items-center gap-1">
                <GitCommit size={10} /> Contributions
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5">{data?.repos ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
                <BookOpen size={10} /> Repositories
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5">{data?.stars ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
                <Star size={10} /> Stars Earned
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5">{data?.followers ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
                <Users size={10} /> Followers
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
