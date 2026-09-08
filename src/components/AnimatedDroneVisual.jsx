import React, { useEffect, useRef } from 'react';

export default function AnimatedDroneVisual() {
  const containerRef = useRef(null);
  const droneRef = useRef(null);
  const shadowRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isLoopRunningRef = useRef(false);
  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const timeAccumulatorRef = useRef(0);

  useEffect(() => {
    // Determine the short scroll range for the drone departure (15-25% of hero scroll)
    const calculateMaxScroll = () => {
      const heroEl = document.querySelector('section');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      // 18% to 22% of hero height, clamped between 140px and 220px
      return Math.max(130, Math.min(heroHeight * 0.2, 210));
    };

    let maxScroll = calculateMaxScroll();

    const handleResize = () => {
      maxScroll = calculateMaxScroll();
      handleScroll();
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      targetProgressRef.current = progress;

      // Wake up loop if it was idle and user scrolled back into view
      if (!isLoopRunningRef.current && progress < 1) {
        if (containerRef.current) {
          containerRef.current.style.visibility = 'visible';
        }
        startAnimationLoop();
      }
    };

    const startAnimationLoop = () => {
      if (isLoopRunningRef.current) return;
      isLoopRunningRef.current = true;
      lastTimeRef.current = performance.now();
      rafIdRef.current = requestAnimationFrame(renderFrame);
    };

    const renderFrame = (timestamp) => {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;
      timeAccumulatorRef.current += dt;

      // Smooth exponential damping interpolation (butter smooth 60fps, reversible)
      const target = targetProgressRef.current;
      const prev = currentProgressRef.current;
      const diff = target - prev;
      
      // Interpolation speed: fast and responsive yet cinematic
      currentProgressRef.current += diff * 0.095;

      const p = currentProgressRef.current;

      // Check if drone has completely disappeared and stabilized at departure point
      if (target >= 1 && (1 - p) < 0.002) {
        currentProgressRef.current = 1;
        applyTransforms(1, timeAccumulatorRef.current);
        if (containerRef.current) {
          containerRef.current.style.visibility = 'hidden';
        }
        isLoopRunningRef.current = false;
        return; // Stop animation loop to save 100% CPU/GPU performance while browsing
      }

      // Check if drone is resting at initial hover position
      if (target === 0 && Math.abs(p) < 0.0005) {
        currentProgressRef.current = 0;
      }

      applyTransforms(p, timeAccumulatorRef.current);
      rafIdRef.current = requestAnimationFrame(renderFrame);
    };

    const applyTransforms = (p, time) => {
      if (!droneRef.current) return;

      // 1. Natural idle hover motion (fades out as drone begins forward flight)
      const idleWeight = Math.max(0, 1 - p * 2.5);
      const hoverY = Math.sin(time * 1.6) * 4.2 * idleWeight;
      const hoverX = Math.cos(time * 1.1) * 2.4 * idleWeight;
      const hoverPitch = Math.sin(time * 1.4) * 0.9 * idleWeight;
      const hoverRoll = Math.cos(time * 1.2) * 0.7 * idleWeight;

      // 2. Realistic Forward Flight Departure Physics:
      // - First 15% scroll: moves only a LITTLE forward
      // - Accelerates smoothly away from viewer into the distance
      // - Natural pitch forward (nose dips down) during acceleration
      // - Gradually stabilizes orientation as it recedes into the background
      
      // Depth acceleration curve (slow start -> progressive distance acceleration)
      let zProgress;
      if (p < 0.15) {
        zProgress = Math.pow(p / 0.15, 2.2) * 0.045;
      } else {
        const t = (p - 0.15) / 0.85;
        zProgress = 0.045 + Math.pow(t, 1.75) * 0.955;
      }

      // 3D Translation away from camera
      const tz = -zProgress * 1150; // Deep into 3D z-plane
      const ty = (-zProgress * 48) + hoverY; // Subtle natural drift toward horizon
      const tx = (-zProgress * 42) + hoverX; // Subtle perspective convergence toward vanishing point

      // Pitch physics: pitches forward during initial acceleration, then levels out as it cruises away
      let pitch;
      if (p < 0.35) {
        pitch = Math.sin((p / 0.35) * (Math.PI / 2)) * 14.5;
      } else {
        const settle = (p - 0.35) / 0.65;
        pitch = 14.5 - (settle * 10.5); // Gently stabilizes to ~4 degrees cruise tilt
      }
      pitch += hoverPitch;

      // Subtle aerodynamic banking/roll
      const roll = (Math.sin(p * Math.PI) * -2.2) + hoverRoll;

      // Optical distance scale factor (reinforces perspective depth)
      const distanceScale = Math.max(0.05, 1 - (zProgress * 0.68));

      // Atmospheric fade: crisp until 65% distance, then softens naturally into haze
      let opacity = 1;
      if (p > 0.6) {
        opacity = Math.max(0, 1 - Math.pow((p - 0.6) / 0.4, 1.2));
      }

      // Atmospheric distance blur (soft depth-of-field effect in distance)
      const blurAmount = Math.max(0, (p - 0.45) * 3.5);

      // Apply 3D matrix transform to drone body
      droneRef.current.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(1)}px) rotateX(${pitch.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg) scale(${distanceScale.toFixed(3)})`;
      droneRef.current.style.opacity = opacity.toFixed(3);
      
      if (blurAmount > 0.2) {
        droneRef.current.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
      } else {
        droneRef.current.style.filter = 'none';
      }

      // Ground shadow diffusion & fade as drone departs
      if (shadowRef.current) {
        const shadowScale = Math.max(0.1, 1 - zProgress * 0.85);
        const shadowOpacity = Math.max(0, (1 - zProgress * 1.3) * 0.4);
        shadowRef.current.style.transform = `scale(${shadowScale.toFixed(3)}) translate3d(${tx.toFixed(1)}px, 0, 0)`;
        shadowRef.current.style.opacity = shadowOpacity.toFixed(3);
      }
    };

    // Initial listener attachments
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Start initial idle hover loop
    startAnimationLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none pointer-events-none w-full max-w-[290px] sm:max-w-[360px] lg:max-w-[440px]"
      style={{
        perspective: '1100px',
        perspectiveOrigin: '50% 45%',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Drone Transform Rig */}
      <div 
        ref={droneRef}
        className="relative z-10 w-full flex flex-col items-center"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="relative w-64 h-64 sm:w-76 sm:h-76 lg:w-84 lg:h-84 flex items-center justify-center">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full drop-shadow-[0_24px_38px_rgba(0,0,0,0.6)] filter"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Photorealistic Shell Gradients (Graphite/Matte Charcoal Finish) */}
              <linearGradient id="bodyShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2D3545" />
                <stop offset="42%" stopColor="#191E27" />
                <stop offset="100%" stopColor="#0B0D12" />
              </linearGradient>

              <radialGradient id="specularHighlight" cx="35%" cy="20%" r="60%">
                <stop offset="0%" stopColor="#556277" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#556277" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="armShellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3A4454" />
                <stop offset="50%" stopColor="#212731" />
                <stop offset="100%" stopColor="#0D0F14" />
              </linearGradient>

              <radialGradient id="motorPodGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#3E4759" />
                <stop offset="60%" stopColor="#1B2029" />
                <stop offset="100%" stopColor="#0A0C10" />
              </radialGradient>

              <radialGradient id="bladeBlurGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0" />
                <stop offset="60%" stopColor="#E2E8F0" stopOpacity="0.05" />
                <stop offset="82%" stopColor="#E2E8F0" stopOpacity="0.18" />
                <stop offset="94%" stopColor="#E2E8F0" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Drone Arms (Cylindrical Carbon Booms) */}
            <g stroke="url(#armShellGrad)" strokeWidth="15" strokeLinecap="round">
              <line x1="200" y1="200" x2="80" y2="80" />
              <line x1="200" y1="200" x2="320" y2="80" />
              <line x1="200" y1="200" x2="90" y2="300" />
              <line x1="200" y1="200" x2="310" y2="300" />
            </g>

            {/* Arm Specular Cylindrical Edges */}
            <g stroke="#566275" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
              <line x1="199" y1="198" x2="81" y2="79" />
              <line x1="201" y1="198" x2="319" y2="79" />
              <line x1="199" y1="202" x2="91" y2="298" />
              <line x1="201" y1="202" x2="309" y2="298" />
            </g>

            {/* Brushless Motor Mounts with Metallic Rims */}
            <circle cx="80" cy="80" r="22" fill="url(#motorPodGrad)" stroke="#4B5769" strokeWidth="2" />
            <circle cx="320" cy="80" r="22" fill="url(#motorPodGrad)" stroke="#4B5769" strokeWidth="2" />
            <circle cx="90" cy="300" r="22" fill="url(#motorPodGrad)" stroke="#4B5769" strokeWidth="2" />
            <circle cx="310" cy="300" r="22" fill="url(#motorPodGrad)" stroke="#4B5769" strokeWidth="2" />

            {/* Top-Left Specular Light Glint on Motor Bells */}
            <circle cx="74" cy="74" r="5.5" fill="#667489" opacity="0.55" />
            <circle cx="314" cy="74" r="5.5" fill="#667489" opacity="0.55" />
            <circle cx="84" cy="294" r="5.5" fill="#667489" opacity="0.55" />
            <circle cx="304" cy="294" r="5.5" fill="#667489" opacity="0.55" />

            {/* Aviation Navigation Strobe Lights */}
            {/* Front-Left Port: Red Navigation Beacon */}
            <circle cx="68" cy="70" r="4.5" fill="#EF4444" className="animate-strobe-red" />
            
            {/* Front-Right Starboard: Green Navigation Beacon */}
            <circle cx="332" cy="70" r="4.5" fill="#10B981" className="animate-strobe-green" />
            
            {/* Rear Orientation White Strobes */}
            <circle cx="90" cy="324" r="3.5" fill="#FFFFFF" className="animate-beacon-white" />
            <circle cx="310" cy="324" r="3.5" fill="#FFFFFF" className="animate-beacon-white" />

            {/* Rotor Motion-Blur Discs */}
            <circle cx="80" cy="80" r="56" fill="url(#bladeBlurGrad)" />
            <circle cx="320" cy="80" r="56" fill="url(#bladeBlurGrad)" />
            <circle cx="90" cy="300" r="56" fill="url(#bladeBlurGrad)" />
            <circle cx="310" cy="300" r="56" fill="url(#bladeBlurGrad)" />

            {/* Spinning Rotor Blades (4x Rotors with realistic blade streak) */}
            <g className="animate-rotor" style={{ transformOrigin: '80px 80px' }}>
              <ellipse cx="80" cy="80" rx="54" ry="2.8" fill="rgba(226,232,240,0.55)" />
              <ellipse cx="80" cy="80" rx="54" ry="1.2" fill="rgba(226,232,240,0.85)" />
              <circle cx="80" cy="80" r="5.5" fill="#8B96A8" />
            </g>
            <g className="animate-rotor-reverse" style={{ transformOrigin: '320px 80px' }}>
              <ellipse cx="320" cy="80" rx="54" ry="2.8" fill="rgba(226,232,240,0.55)" />
              <ellipse cx="320" cy="80" rx="54" ry="1.2" fill="rgba(226,232,240,0.85)" />
              <circle cx="320" cy="80" r="5.5" fill="#8B96A8" />
            </g>
            <g className="animate-rotor-reverse" style={{ transformOrigin: '90px 300px' }}>
              <ellipse cx="90" cy="300" rx="54" ry="2.8" fill="rgba(226,232,240,0.55)" />
              <ellipse cx="90" cy="300" rx="54" ry="1.2" fill="rgba(226,232,240,0.85)" />
              <circle cx="90" cy="300" r="5.5" fill="#8B96A8" />
            </g>
            <g className="animate-rotor" style={{ transformOrigin: '310px 300px' }}>
              <ellipse cx="310" cy="300" rx="54" ry="2.8" fill="rgba(226,232,240,0.55)" />
              <ellipse cx="310" cy="300" rx="54" ry="1.2" fill="rgba(226,232,240,0.85)" />
              <circle cx="310" cy="300" r="5.5" fill="#8B96A8" />
            </g>

            {/* Central Fuselage Shell */}
            <path
              d="M 175 105 C 185 85, 215 85, 225 105 L 245 190 C 248 230, 235 270, 222 290 C 215 300, 185 300, 178 290 C 165 270, 152 230, 155 190 Z"
              fill="url(#bodyShellGrad)"
              stroke="#3D485A"
              strokeWidth="2"
            />
            <path
              d="M 175 105 C 185 85, 215 85, 225 105 L 245 190 C 248 230, 235 270, 222 290 C 215 300, 185 300, 178 290 C 165 270, 152 230, 155 190 Z"
              fill="url(#specularHighlight)"
            />

            {/* Battery Bay Panel */}
            <rect x="180" y="210" width="40" height="60" rx="6" fill="#0F131A" stroke="#2B3340" strokeWidth="1.5" />
            <line x1="188" y1="225" x2="212" y2="225" stroke="#3A4454" strokeWidth="2" strokeLinecap="round" />
            <line x1="188" y1="240" x2="212" y2="240" stroke="#3A4454" strokeWidth="2" strokeLinecap="round" />
            <line x1="188" y1="255" x2="212" y2="255" stroke="#3A4454" strokeWidth="2" strokeLinecap="round" />

            {/* Omnidirectional LiDAR Dome */}
            <circle cx="200" cy="180" r="14" fill="#0C0E12" stroke="#4B5563" strokeWidth="2" />
            <circle cx="200" cy="180" r="6" fill="#1E293B" />
            <circle cx="196" cy="176" r="3" fill="#5B6B85" opacity="0.6" />

            {/* Front 3-Axis Gimbal & Dual Optics */}
            <g className="animate-gimbal">
              <rect x="182" y="80" width="36" height="26" rx="6" fill="#0D1016" stroke="#525F73" strokeWidth="2" />
              {/* Primary 1-inch Wide Lens with Optical Coating Glint */}
              <circle cx="193" cy="93" r="7" fill="#000000" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="191" cy="91" r="2" fill="#7DD3FC" opacity="0.7" />
              <circle cx="193" cy="93" r="3" fill="#1E40AF" />
              
              {/* 70mm Medium Telephoto Lens */}
              <circle cx="207" cy="93" r="5" fill="#000000" stroke="#A78BFA" strokeWidth="1.2" />
              <circle cx="205.5" cy="91.5" r="1.4" fill="#C4B5FD" opacity="0.7" />
              <circle cx="207" cy="93" r="2" fill="#5B21B6" />
            </g>

            {/* Model Wordmark */}
            <text x="200" y="145" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="2">
              AIR 3S
            </text>
          </svg>
        </div>
      </div>

      {/* Layered Ground Contact Shadow (drifts & diffuses in tandem with flight elevation) */}
      <div 
        ref={shadowRef}
        className="w-48 sm:w-56 h-8 rounded-[100%] bg-black/40 blur-xl mt-[-24px] pointer-events-none"
        style={{
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
