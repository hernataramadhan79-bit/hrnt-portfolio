'use client';

import React, { useState } from 'react';

const ImageWithLoader: React.FC<{ src: string; alt: string; className?: string; [key: string]: any }> = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative w-full h-full transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg" />
      )}
      <img src={src} alt={alt} onLoad={() => setIsLoaded(true)} className={className} {...props} />
    </div>
  );
};

export default ImageWithLoader;