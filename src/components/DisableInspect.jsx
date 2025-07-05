// src/components/DisableInspect.js
import { useEffect } from 'react';

export default function DisableInspect() {
  useEffect(() => {
    const preventInspect = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    const disableAll = (e) => e.preventDefault();

    document.addEventListener('keydown', preventInspect);
    document.addEventListener('contextmenu', disableAll);
    document.addEventListener('copy', disableAll);
    document.addEventListener('cut', disableAll);
    document.addEventListener('paste', disableAll);
    document.addEventListener('selectstart', disableAll);

    return () => {
      document.removeEventListener('keydown', preventInspect);
      document.removeEventListener('contextmenu', disableAll);
      document.removeEventListener('copy', disableAll);
      document.removeEventListener('cut', disableAll);
      document.removeEventListener('paste', disableAll);
      document.removeEventListener('selectstart', disableAll);
    };
  }, []);

  return null;
}
