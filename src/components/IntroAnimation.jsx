import React, { useState, useEffect, useRef } from 'react';

export const IntroAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('playing'); // 'playing' -> 'unveiling' -> 'finished'
  const videoRef = useRef(null);
  const hasFinishedRef = useRef(false);

  const startFadeOut = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setStage('unveiling');
    // Smooth 1.0s cinematic dissolve into the website
    setTimeout(() => {
      setStage('finished');
      if (onComplete) onComplete();
    }, 1000);
  };

  const quickSkip = (e) => {
    if (e) e.stopPropagation();
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setStage('unveiling');
    // Quickly skip into the website
    setTimeout(() => {
      setStage('finished');
      if (onComplete) onComplete();
    }, 280);
  };

  useEffect(() => {
    // Ensure smooth playback starts immediately
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Intro video autoplay notice:', err);
      });
    }

    // Generous fallback safety timeout in case browser strictly blocks media
    const tSafety = setTimeout(() => {
      startFadeOut();
    }, 25000);

    return () => clearTimeout(tSafety);
  }, []);

  if (stage === 'finished') return null;

  return (
    <div className={`cinematic-intro-root ${stage}`}>
      <div className="desktop-video-stage">
        <video
          ref={videoRef}
          src="/videos/intro-walking.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onEnded={startFadeOut}
          onError={startFadeOut}
          className="cinematic-walking-video"
        />
      </div>

      {/* Official JYREN Logo Watermark: Click on logo quickly skips to website */}
      <div 
        className="intro-corner-logo-badge"
        onClick={quickSkip}
        role="button"
        tabIndex={0}
        aria-label="Enter Website"
        title="Click to enter website"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            quickSkip();
          }
        }}
      >
        <div className="intro-corner-logo-frame">
          <img 
            src="/jyren-logo.jpg" 
            alt="JYREN Official Logo - Click to Enter Website" 
            className="intro-corner-logo-img" 
          />
          <div className="intro-corner-logo-glow" />
        </div>
      </div>
    </div>
  );
};
