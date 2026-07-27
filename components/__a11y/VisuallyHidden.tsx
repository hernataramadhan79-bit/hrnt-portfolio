'use client';

import React from 'react';

const VisuallyHidden: React.FC<{ children: React.ReactNode; as?: 'span' | 'div' }> = ({ children, as: Tag = 'span' }) => (
  <Tag
    className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
    style={{ clip: 'rect(0, 0, 0, 0)', clipPath: 'inset(50%)' }}
  >
    {children}
  </Tag>
);

export default VisuallyHidden;