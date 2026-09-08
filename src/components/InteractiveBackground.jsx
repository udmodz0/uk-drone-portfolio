import React from 'react';

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep atmospheric studio vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-aviation-900/10 via-transparent to-transparent blur-[140px] opacity-70" />
      <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-studio-800/20 rounded-full blur-[160px] opacity-40" />
    </div>
  );
}