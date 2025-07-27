import React, { useRef } from 'react';

export default function BackgroundBoxes() {
  const ref = useRef(null);

  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    const xPercent = clientX / window.innerWidth;
    const yPercent = clientY / window.innerHeight;
    if (ref.current) {
      const posX = 20 * (xPercent - 0.5);
      const posY = 20 * (yPercent - 0.5);
      ref.current.style.backgroundPosition = `${20 + posX}px ${20 + posY}px`;
      ref.current.style.filter = 'brightness(1.08) contrast(1.15)';
    }
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.backgroundPosition = '';
      ref.current.style.filter = '';
    }
  }

  return (
    <div
      className="background-boxes-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="background-boxes" ref={ref} />
    </div>
  );
}