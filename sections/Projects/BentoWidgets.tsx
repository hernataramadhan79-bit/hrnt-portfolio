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
    <div className="h-full w-full bg-[#0a0a12] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(34,211,238,0.18)] transition-all duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-125 group-hover:bg-cyan-500/20 transition-all duration-700 pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between mb-2.5 sm:mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300">
              <Clock size={13} className="text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">Coding Activity</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono group-hover:text-cyan-400 transition-colors">WAKATIME</span>
        </div>

        <div className="mb-2 sm:mb-2.5 relative z-10">
          {loading ? (
            <div className="space-y-1.5 py-0.5">
              <SkeletonPulse className="h-6 w-28" />
              <SkeletonPulse className="h-2.5 w-20" />
            </div>
          ) : (
            <>
              <h4 className="text-xl sm:text-2xl font-black text-white leading-none mb-1 group-hover:text-cyan-200 transition-colors">{data?.totalTime || '0 hrs 0 mins'}</h4>
              <p className="text-[9px] sm:text-[10px] text-cyan-400 uppercase tracking-widest font-mono">Total Time Logged</p>
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-1">
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonPulse className="w-2 h-2 rounded-full" />
                <SkeletonPulse className="h-2.5 flex-1" />
                <SkeletonPulse className="w-16 h-1.5 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1.5 sm:space-y-1">
            {(data?.languages || []).slice(0, 4).map((lang: any, idx: number) => (
              <div key={lang.name} className="flex items-center gap-2.5 group/lang">
                <div className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover/lang:scale-150" style={{ backgroundColor: lang.color }} />
                <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-300 font-medium truncate group-hover/lang:text-white transition-colors">{lang.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0 group-hover/lang:text-cyan-400 transition-colors">{lang.percent}%</span>
                </div>
                <div className="w-14 sm:w-16 h-1 bg-white/5 rounded-full overflow-hidden shrink-0">
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
    <div className="h-full w-full bg-[#0a0a12] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.18)] transition-all duration-500">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 group-hover:scale-125 group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-2.5 sm:mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300">
            <GitMerge size={13} className="text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-purple-300 transition-colors">Open Source</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono group-hover:text-purple-400 transition-colors">GITHUB</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 relative z-10 flex-1 content-center">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col justify-center space-y-1.5 p-1">
              <SkeletonPulse className="h-6 w-12" />
              <SkeletonPulse className="h-2 w-16" />
            </div>
          ))
        ) : (
          <>
            <div className="flex flex-col justify-center p-1.5 sm:p-2 rounded-xl group-hover:bg-white/[0.02] transition-colors">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5 group-hover:text-purple-200 transition-colors leading-none">{data?.totalContributions ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-purple-400 uppercase tracking-widest font-mono flex items-center gap-1 mt-1">
                <GitCommit size={10} className="shrink-0" /> Contributions
              </span>
            </div>
            <div className="flex flex-col justify-center p-1.5 sm:p-2 rounded-xl group-hover:bg-white/[0.02] transition-colors">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5 group-hover:text-white transition-colors leading-none">{data?.repos ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1 group-hover:text-slate-300 mt-1">
                <BookOpen size={10} className="shrink-0" /> Repositories
              </span>
            </div>
            <div className="flex flex-col justify-center p-1.5 sm:p-2 rounded-xl group-hover:bg-white/[0.02] transition-colors">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5 group-hover:text-amber-300 transition-colors leading-none">{data?.stars ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1 group-hover:text-amber-400 mt-1">
                <Star size={10} className="shrink-0" /> Stars Earned
              </span>
            </div>
            <div className="flex flex-col justify-center p-1.5 sm:p-2 rounded-xl group-hover:bg-white/[0.02] transition-colors">
              <span className="text-xl sm:text-2xl font-black text-white mb-0.5 group-hover:text-white transition-colors leading-none">{data?.followers ?? 0}</span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1 group-hover:text-slate-300 mt-1">
                <Users size={10} className="shrink-0" /> Followers
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
