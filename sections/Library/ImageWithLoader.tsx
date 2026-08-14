'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  [key: string]: any;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className = '',
  fill = true,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // If explicit width & height are passed and fill is false
  if (!fill && width && height) {
    return (
      <div className="relative overflow-hidden inline-block">
        {!isLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg z-10" />
        )}
        <Image
          src={src}
          alt={alt || 'Visual item'}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[1px] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg z-10" />
      )}
      <Image
        src={src}
        alt={alt || 'Visual item'}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoader;