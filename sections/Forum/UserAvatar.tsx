'use client';

import React, { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, className = 'w-9 h-9' }) => {
  const [imgError, setImgError] = useState(false);
  const initial = (name || 'U').charAt(0).toUpperCase();
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=262B38&color=A8C7FA&bold=true`;
  const isSafeSrc = typeof src === 'string' && (src.startsWith('https://') || src.startsWith('/'));
  const effectiveSrc = !isSafeSrc || imgError ? fallbackUrl : src;

  return (
    <div
      className={`${className} rounded-full overflow-hidden bg-[var(--surface-pill)] flex items-center justify-center text-[var(--accent-pixel)] font-bold shrink-0`}
    >
      {!imgError ? (
        <img
          src={effectiveSrc}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-[var(--accent-pixel)] font-bold text-xs">{initial}</span>
      )}
    </div>
  );
};

export default UserAvatar;
