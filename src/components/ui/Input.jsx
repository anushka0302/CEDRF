import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function Input({ className, type = 'text', ...props }) {
  const [visible, setVisible] = useState(false);
  const radius = 100;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      style={{
        background: useMotionTemplate`radial-gradient(${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px, #3b82f6, transparent 80%)`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <input
        type={type}
        className={cn(
          'shadow-input flex h-10 w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </motion.div>
  );
}
