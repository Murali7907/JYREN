import { useEffect } from 'react';

/**
 * Custom hook to listen for Escape key presses and execute a handler.
 * @param {Function} onEscape - Callback function invoked on Escape keydown.
 * @param {boolean} active - Whether the listener is currently active (e.g. modal open).
 */
export const useEscapeKey = (onEscape, active = true) => {
  useEffect(() => {
    if (!active || typeof onEscape !== 'function') return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, active]);
};

export default useEscapeKey;
