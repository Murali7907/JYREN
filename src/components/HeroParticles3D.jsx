import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const HeroParticles3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 240;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Particle System Geometry (Golden Celestial Dust)
    const particleCount = 240;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 480;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 220;
      scales[i] = Math.random() * 2.5 + 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Canvas Texture for soft glowing gold spark
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 235, 175, 1)');
    grad.addColorStop(0.35, 'rgba(229, 195, 136, 0.8)');
    grad.addColorStop(0.8, 'rgba(197, 155, 104, 0.2)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 7,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffe8ba,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // 4. Undulating 3D Golden Silk Ribbon in Hero Background
    const ribbonGeom = new THREE.PlaneGeometry(320, 38, 54, 16);
    const ribbonInitialPos = ribbonGeom.attributes.position.clone();
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9A223B'),
      emissive: new THREE.Color('#3A0914'),
      roughness: 0.28,
      metalness: 0.72,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.52,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
    ribbonMesh.position.set(20, -15, -40);
    ribbonMesh.rotation.x = 0.35;
    ribbonMesh.rotation.z = -0.08;
    scene.add(ribbonMesh);

    // Dynamic 3D Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xF5DC9F, 2.5);
    goldKeyLight.position.set(120, 100, 140);
    scene.add(goldKeyLight);

    const wineBackLight = new THREE.DirectionalLight(0x8C1D35, 2.0);
    wineBackLight.position.set(-100, -80, 50);
    scene.add(wineBackLight);

    // 5. Mouse Interactive Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 45;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth camera parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX;
      camera.position.y = -currentMouseY;
      camera.lookAt(scene.position);

      // Gentle continuous rotation of particles
      particlesMesh.rotation.y += 0.0012;
      particlesMesh.rotation.x += 0.0006;

      // 3D Silk Ribbon undulating physics
      const rPos = ribbonGeom.attributes.position;
      const initRPos = ribbonInitialPos;
      for (let i = 0; i < rPos.count; i++) {
        const u = initRPos.getX(i);
        const v = initRPos.getY(i);
        const wave = Math.sin(u * 0.025 + elapsed * 1.8) * 16 + Math.cos(v * 0.08 - elapsed * 1.2) * 8;
        rPos.setZ(i, wave);
      }
      rPos.needsUpdate = true;
      ribbonGeom.computeVertexNormals();

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="hero-3d-particles-canvas" 
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
    />
  );
};
