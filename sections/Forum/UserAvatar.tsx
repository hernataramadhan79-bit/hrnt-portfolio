'use client';

import React, { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, className = "w-10 h-10" }) => {
  const [imgError, setImgError] = useState(false);
  const initial = (name || 'U').charAt(0).toUpperCase();
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=0891b2&color=fff&bold=true`;
  const effectiveSrc = (!src || imgError) ? fallbackUrl : src;

  return (
    <div className={`${className} rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0`}>
      {!imgError ? (
        <img src={effectiveSrc} alt={name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      ) : (
        <span className="text-cyan-400 font-bold text-sm">{initial}</span>
      )}
    </div>
  );
};

export default UserAvatar;