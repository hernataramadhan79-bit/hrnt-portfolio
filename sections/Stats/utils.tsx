export const timeAgo = (dateStr: string): string => {
    if (!dateStr) return 'N/A';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const months = Math.floor(days / 30);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return `${months}mo ago`;
};

export const SkeletonPulse = ({ className = '' }: { className?: string }) => (
    <div className={`bg-white/5 rounded animate-pulse ${className}`} />
);

export const getLevelColor = (count: number) => {
    if (count === 0) return 'rgba(255,255,255,0.05)';
    if (count <= 2) return '#083344';
    if (count <= 5) return '#155e75';
    if (count <= 9) return '#0891b2';
    return '#22d3ee';
};