import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDroneScene({ scrollProgress = 0, onIntroComplete, onDroneClick, onHotspotClick }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const droneGroupRef = useRef(null);
  const cameraRef = useRef(null);
  const propellersRef = useRef([]);
  const shadowMeshRef = useRef(null);
  const isMobileRef = useRef(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const onIntroCompleteRef = useRef(onIntroComplete);
  const onDroneClickRef = useRef(onDroneClick);
  const onHotspotClickRef = useRef(onHotspotClick);

  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  useEffect(() => {
    onDroneClickRef.current = onDroneClick;
  }, [onDroneClick]);

  useEffect(() => {
    onHotspotClickRef.current = onHotspotClick;
  }, [onHotspotClick]);

  useEffect(() => {
    targetProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    isMobileRef.current = window.innerWidth < 768;

    // ---------- Procedural Texture & Environment Generators ----------

    // Studio environment map for realistic PBR metallic reflections
    function buildEnvMap() {
      const size = 256;
      const faces = [
        { top: '#475569', bottom: '#0f172a' },
        { top: '#334155', bottom: '#0f172a' },
        { top: '#94a3b8', bottom: '#475569' }, // sky reflection
        { top: '#1e293b', bottom: '#020617' }, // ground
        { top: '#475569', bottom: '#0f172a' },
        { top: '#334155', bottom: '#0f172a' },
      ];
      const canvases = faces.map((f) => {
        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const ctx = c.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, f.top);
        grad.addColorStop(1, f.bottom);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
        return c;
      });
      const cubeTex = new THREE.CubeTexture(canvases);
      cubeTex.needsUpdate = true;
      return cubeTex;
    }

    // Procedural 2x2 Twill Carbon Fiber Weave Texture
    function buildCarbonTexture() {
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0f131a';
      ctx.fillRect(0, 0, size, size);
      
      const s = 16;
      for (let y = 0; y < size; y += s) {
        for (let x = 0; x < size; x += s) {
          const isCheck = (x / s + y / s) % 2 === 0;
          ctx.fillStyle = isCheck ? '#1c2330' : '#121722';
          ctx.fillRect(x, y, s, s);
          // Highlight diagonal weave fibers
          ctx.fillStyle = 'rgba(255,255,255,0.06)';
          if (isCheck) {
            ctx.fillRect(x, y, s, 4);
          } else {
            ctx.fillRect(x, y + 4, 4, s - 4);
          }
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.needsUpdate = true;
      return tex;
    }

    // Radial falloff texture for propeller blur discs
    function buildBlurDiscTexture() {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const cx = size / 2;
      const cy = size / 2;
      const grad = ctx.createRadialGradient(cx, cy, size * 0.15, cx, cy, size * 0.5);
      grad.addColorStop(0, 'rgba(226,232,240,0)');
      grad.addColorStop(0.55, 'rgba(226,232,240,0.12)');
      grad.addColorStop(0.82, 'rgba(226,232,240,0.32)');
      grad.addColorStop(0.94, 'rgba(249,115,22,0.22)'); // orange tip blur outer halo
      grad.addColorStop(1, 'rgba(226,232,240,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    // Soft glow sprite texture for LED navigation strobes & spotlights
    function buildGlowTexture() {
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const cx = size / 2;
      const cy = size / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
      grad.addColorStop(0, 'rgba(255,255,255,1.0)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.45)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    function makeGlowSprite(color, scale) {
      const mat = new THREE.SpriteMaterial({
        map: buildGlowTexture(),
        color,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(scale, scale, 1);
      return sprite;
    }

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0B0D11, 0.022);

    const envMap = buildEnvMap();
    scene.environment = envMap;

    // 2. CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = isMobileRef.current;
    const camera = new THREE.PerspectiveCamera(isMobile ? 48 : 40, width / height, 0.1, 200);
    camera.position.set(0, isMobile ? 0.2 : 0.45, isMobile ? 7.6 : 8.2);
    camera.lookAt(0, isMobile ? -0.4 : 0, 0);
    cameraRef.current = camera;

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. LIGHTING SETUP (Studio Cinema Lighting)
    const ambientLight = new THREE.AmbientLight(0xF1F5F9, 1.25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 3.2);
    sunLight.position.set(6, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38BDF8, 1.8);
    rimLight.position.set(-6, -1, -5);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0x64748B, 0x090D16, 0.85);
    scene.add(fillLight);

    // 5. PHOTOREALISTIC PBR MATERIALS (Refined Authentic DJI Air 3S Palette)
    const carbonTex = buildCarbonTexture();

    // Matte Titanium Graphite Body Finish (Authentic Air 3S dark slate/graphite tone)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x222834,
      roughness: 0.28,
      metalness: 0.65,
      envMap,
      envMapIntensity: 1.4,
    });

    const bodyDarkMat = new THREE.MeshStandardMaterial({
      color: 0x0F131C,
      roughness: 0.45,
      metalness: 0.35,
      envMap,
      envMapIntensity: 0.8,
    });

    // Carbon Fiber Arm Boom Material (Authentic 2x2 matte twill carbon weave)
    const carbonArmMat = new THREE.MeshStandardMaterial({
      map: carbonTex,
      color: 0x1A212D,
      roughness: 0.22,
      metalness: 0.75,
      envMap,
      envMapIntensity: 1.6,
    });

    // CNC Machined Anodized Aluminum Motors
    const motorMat = new THREE.MeshStandardMaterial({
      color: 0x64748B,
      roughness: 0.12,
      metalness: 0.95,
      envMap,
      envMapIntensity: 2.2,
    });

    const copperStatorMat = new THREE.MeshStandardMaterial({
      color: 0xD97706,
      roughness: 0.25,
      metalness: 0.88,
    });

    const metalBezelMat = new THREE.MeshStandardMaterial({
      color: 0x94A3B8,
      roughness: 0.08,
      metalness: 0.98,
      envMap,
      envMapIntensity: 2.6,
    });

    const rubberJointMat = new THREE.MeshStandardMaterial({
      color: 0x080A0E,
      roughness: 0.85,
      metalness: 0.05,
    });

    // Propeller Blade Materials (Dark translucent polycarbonate)
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.18,
      metalness: 0.35,
      transparent: true,
      opacity: 0.92,
      envMap,
      envMapIntensity: 1.1,
    });

    // Signature DJI Low-Noise Orange Tip Material (Bright vibrant safety tip)
    const orangeTipMat = new THREE.MeshStandardMaterial({
      color: 0xFF6B00,
      roughness: 0.25,
      metalness: 0.1,
      emissive: 0xFF5500,
      emissiveIntensity: 0.35,
    });

    const blurDiscTex = buildBlurDiscTexture();
    const blurDiscMat = new THREE.MeshBasicMaterial({
      map: blurDiscTex,
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Camera Glass Lenses with Multi-Coated Optical Glint
    const wideLensGlassMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.02,
      metalness: 0.98,
      envMap,
      envMapIntensity: 3.5,
    });

    const blueCoatingMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.85,
    });

    const violetCoatingMat = new THREE.MeshBasicMaterial({
      color: 0xC084FC,
      transparent: true,
      opacity: 0.85,
    });

    // 6. BUILD PHOTOREALISTIC 3D DJI AIR 3S MODEL
    const droneGroup = new THREE.Group();
    droneGroupRef.current = droneGroup;

    // --- Main Aerodynamic Sculpted Fuselage ---
    const bodyGroup = new THREE.Group();

    // Sculpted Main Lower Hull (Smooth tapered contour)
    const hullPoints = [
      new THREE.Vector2(0.01, -0.92),
      new THREE.Vector2(0.28, -0.85),
      new THREE.Vector2(0.48, -0.55),
      new THREE.Vector2(0.54, 0.0),
      new THREE.Vector2(0.50, 0.55),
      new THREE.Vector2(0.38, 0.88),
      new THREE.Vector2(0.01, 0.96),
    ];
    const hullGeom = new THREE.LatheGeometry(hullPoints, 32);
    hullGeom.rotateX(Math.PI / 2);
    hullGeom.scale(1.0, 0.52, 1.0);
    const mainHull = new THREE.Mesh(hullGeom, bodyMat);
    mainHull.castShadow = true;
    mainHull.receiveShadow = true;
    bodyGroup.add(mainHull);

    // Upper Battery Bay Canopy Panel
    const canopyGeom = new THREE.BoxGeometry(0.58, 0.24, 1.12, 4, 4, 4);
    const canopy = new THREE.Mesh(canopyGeom, bodyMat);
    canopy.position.set(0, 0.16, 0.04);
    canopy.castShadow = true;
    bodyGroup.add(canopy);

    // Battery Bay Power Button & 4 LED Status Ring
    const powerBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.03, 24),
      bodyDarkMat
    );
    powerBtn.position.set(0, 0.285, 0.25);
    bodyGroup.add(powerBtn);

    const powerLightRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.065, 0.012, 12, 24),
      new THREE.MeshBasicMaterial({ color: 0x34D399 })
    );
    powerLightRing.rotation.x = Math.PI / 2;
    powerLightRing.position.set(0, 0.29, 0.25);
    bodyGroup.add(powerLightRing);

    // Side Cooling Air Intakes (Left & Right)
    [-0.3, 0.3].forEach((x) => {
      const intake = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.1, 0.5),
        bodyDarkMat
      );
      intake.position.set(x, 0.06, -0.2);
      bodyGroup.add(intake);
    });

    // Aerodynamic Nose Canopy Sloping down to Gimbal Bay
    const noseGeom = new THREE.SphereGeometry(0.42, 32, 24);
    const nose = new THREE.Mesh(noseGeom, bodyMat);
    nose.position.set(0, -0.02, -0.86);
    nose.scale.set(0.98, 0.52, 0.88);
    bodyGroup.add(nose);

    // Top Omnidirectional Nightscape LiDAR Sensor Pod
    const lidarDome = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.15, 0.09, 24),
      new THREE.MeshStandardMaterial({ color: 0x0A0D14, roughness: 0.1, metalness: 0.9, envMap, envMapIntensity: 1.5 })
    );
    lidarDome.position.set(0, 0.29, -0.22);
    bodyGroup.add(lidarDome);

    const lidarGlass = new THREE.Mesh(
      new THREE.SphereGeometry(0.10, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.05, metalness: 0.95, envMap, envMapIntensity: 2.2 })
    );
    lidarGlass.position.set(0, 0.34, -0.22);
    lidarGlass.scale.set(1.0, 0.4, 1.0);
    bodyGroup.add(lidarGlass);

    // Stereoscopic Front Binocular Vision Sensors (Left & Right Lenses)
    [-0.18, 0.18].forEach((x) => {
      const visionEye = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16),
        metalBezelMat
      );
      visionEye.rotateX(Math.PI / 2);
      visionEye.position.set(x, 0.1, -0.96);
      bodyGroup.add(visionEye);

      const eyeGlass = new THREE.Mesh(
        new THREE.CircleGeometry(0.035, 16),
        blueCoatingMat
      );
      eyeGlass.position.set(x, 0.1, -0.976);
      bodyGroup.add(eyeGlass);
    });

    // Downward Auxiliary Landing LED Spotlight (Belly)
    const bellySpotlight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.02, 16),
      metalBezelMat
    );
    bellySpotlight.position.set(0, -0.28, 0.1);
    bodyGroup.add(bellySpotlight);

    const spotGlow = makeGlowSprite(0xFFFFFF, 0.45);
    spotGlow.position.set(0, -0.32, 0.1);
    bodyGroup.add(spotGlow);

    // AIR 3S Silver Embossed Branding Wordmark
    const wordmarkBg = new THREE.Mesh(
      new THREE.PlaneGeometry(0.28, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.4 })
    );
    wordmarkBg.rotation.x = -Math.PI / 2;
    wordmarkBg.position.set(0, 0.282, -0.55);
    bodyGroup.add(wordmarkBg);

    droneGroup.add(bodyGroup);

    // --- 3-Axis Dual Camera Gimbal Assembly ---
    const gimbalGroup = new THREE.Group();
    gimbalGroup.position.set(0, -0.21, -0.94);

    // Anti-Vibration Rubber Dampener Mounts (4 rubber isolation balls)
    [
      { x: -0.2, z: 0.1 }, { x: 0.2, z: 0.1 },
      { x: -0.2, z: -0.1 }, { x: 0.2, z: -0.1 }
    ].forEach((p) => {
      const dampener = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 12),
        rubberJointMat
      );
      dampener.position.set(p.x, 0.14, p.z);
      gimbalGroup.add(dampener);
    });

    // Gimbal Recess Pocket (AO shadow pocket)
    const gimbalRecess = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.38, 0.12),
      rubberJointMat
    );
    gimbalRecess.position.set(0, 0.02, 0.12);
    gimbalGroup.add(gimbalRecess);

    // Mechanical Pitch Arm Brackets
    const pitchArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.08, 0.34),
      metalBezelMat
    );
    pitchArm.position.set(0, 0.1, -0.02);
    gimbalGroup.add(pitchArm);

    // Sculpted Dual-Camera Payload Pod
    const payloadPod = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.32, 0.38, 2, 2, 2),
      new THREE.MeshStandardMaterial({ color: 0x111520, roughness: 0.22, metalness: 0.8, envMap, envMapIntensity: 1.4 })
    );
    payloadPod.position.set(0, -0.05, -0.04);
    gimbalGroup.add(payloadPod);

    // 1. Primary 1-inch CMOS 50MP Wide Lens Assembly (Left Lens)
    const wideBezel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.125, 0.125, 0.09, 24),
      metalBezelMat
    );
    wideBezel.rotateX(Math.PI / 2);
    wideBezel.position.set(-0.105, -0.05, -0.24);
    gimbalGroup.add(wideBezel);

    const wideGlass = new THREE.Mesh(
      new THREE.CircleGeometry(0.095, 24),
      wideLensGlassMat
    );
    wideGlass.position.set(-0.105, -0.05, -0.286);
    gimbalGroup.add(wideGlass);

    const wideCoating = new THREE.Mesh(
      new THREE.CircleGeometry(0.075, 24),
      blueCoatingMat
    );
    wideCoating.position.set(-0.105, -0.05, -0.287);
    gimbalGroup.add(wideCoating);

    // 2. Secondary 70mm 48MP Telephoto Lens Assembly (Right Lens)
    const teleBezel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.095, 0.095, 0.07, 24),
      metalBezelMat
    );
    teleBezel.rotateX(Math.PI / 2);
    teleBezel.position.set(0.11, -0.05, -0.24);
    gimbalGroup.add(teleBezel);

    const teleGlass = new THREE.Mesh(
      new THREE.CircleGeometry(0.072, 24),
      wideLensGlassMat
    );
    teleGlass.position.set(0.11, -0.05, -0.276);
    gimbalGroup.add(teleGlass);

    const teleCoating = new THREE.Mesh(
      new THREE.CircleGeometry(0.055, 24),
      violetCoatingMat
    );
    teleCoating.position.set(0.11, -0.05, -0.277);
    gimbalGroup.add(teleCoating);

    droneGroup.add(gimbalGroup);

    // --- 4 Carbon Fiber Boom Arms, Hinge Knuckles & Motors ---
    const armPositions = [
      { name: 'FL', x: -1.35, y: 0.08, z: -0.95, angle: 0.62 },
      { name: 'FR', x: 1.35, y: 0.08, z: -0.95, angle: -0.62 },
      { name: 'RL', x: -1.45, y: -0.05, z: 0.95, angle: 2.45 },
      { name: 'RR', x: 1.45, y: -0.05, z: 0.95, angle: -2.45 },
    ];

    const propellerGroups = [];
    const ledGlowSprites = [];

    armPositions.forEach((pos, idx) => {
      // Hinge Knuckle Joint where arm attaches to fuselage
      const hinge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.18, 16),
        metalBezelMat
      );
      hinge.position.set(pos.x * 0.22, pos.y, pos.z * 0.22);
      droneGroup.add(hinge);

      // Structural Carbon Fiber Boom Arm
      const armLength = Math.sqrt(pos.x * pos.x + pos.z * pos.z) * 0.90;
      const armGeom = new THREE.CylinderGeometry(0.07, 0.08, armLength, 16);
      const arm = new THREE.Mesh(armGeom, carbonArmMat);
      arm.position.set(pos.x * 0.52, pos.y, pos.z * 0.52);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = pos.angle;
      arm.castShadow = true;
      droneGroup.add(arm);

      // Foldable Landing Legs under Front Motor Mounts
      if (pos.name === 'FL' || pos.name === 'FR') {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.02, 0.32, 12),
          bodyDarkMat
        );
        leg.position.set(pos.x, pos.y - 0.16, pos.z - 0.04);
        leg.rotation.x = 0.25;
        droneGroup.add(leg);
      }

      // CNC Machined Brushless Motor Base & Stator Coil Ring
      const motorBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.24, 0.08, 24),
        motorMat
      );
      motorBase.position.set(pos.x, pos.y + 0.02, pos.z);
      droneGroup.add(motorBase);

      const statorCoil = new THREE.Mesh(
        new THREE.CylinderGeometry(0.19, 0.19, 0.06, 24),
        copperStatorMat
      );
      statorCoil.position.set(pos.x, pos.y + 0.08, pos.z);
      droneGroup.add(statorCoil);

      // CNC Motor Bell Cap with Specular Lip Ring
      const motorBell = new THREE.Mesh(
        new THREE.CylinderGeometry(0.21, 0.21, 0.16, 24),
        motorMat
      );
      motorBell.position.set(pos.x, pos.y + 0.14, pos.z);
      motorBell.castShadow = true;
      droneGroup.add(motorBell);

      const motorRimHighlight = new THREE.Mesh(
        new THREE.TorusGeometry(0.205, 0.012, 12, 24),
        metalBezelMat
      );
      motorRimHighlight.rotation.x = Math.PI / 2;
      motorRimHighlight.position.set(pos.x, pos.y + 0.22, pos.z);
      droneGroup.add(motorRimHighlight);

      // Quick-Release Propeller Lock Post (Central silver post)
      const propLockPost = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.1, 16),
        metalBezelMat
      );
      propLockPost.position.set(pos.x, pos.y + 0.26, pos.z);
      droneGroup.add(propLockPost);

      // --- Rotating Low-Noise Propeller Assembly ---
      const propGroup = new THREE.Group();
      propGroup.position.set(pos.x, pos.y + 0.24, pos.z);

      // Central Propeller Hub Cap
      const hubCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.11, 0.05, 16),
        bodyDarkMat
      );
      propGroup.add(hubCap);

      // Aerodynamic Airfoil Blade Shape
      const bladeShape = new THREE.Shape();
      bladeShape.moveTo(0, 0.12);
      bladeShape.quadraticCurveTo(0.35, 0.095, 0.65, 0.04);
      bladeShape.lineTo(0.65, -0.04);
      bladeShape.quadraticCurveTo(0.35, -0.085, 0, -0.12);
      bladeShape.lineTo(0, 0.12);

      const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
        depth: 0.012,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.003,
        bevelSegments: 1,
        curveSegments: 8,
      });
      bladeGeom.center();
      bladeGeom.rotateX(Math.PI / 2);

      // Blade 1 (Dark Charcoal Body + Signature DJI Orange Tip)
      const blade1Group = new THREE.Group();
      const blade1Mesh = new THREE.Mesh(bladeGeom, bladeMat);
      blade1Mesh.position.x = 0.32;
      blade1Group.add(blade1Mesh);

      // Signature Orange/Gold Tip Accent (Blade 1)
      const tip1Mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.016, 0.07),
        orangeTipMat
      );
      tip1Mesh.position.x = 0.61;
      blade1Group.add(tip1Mesh);
      propGroup.add(blade1Group);

      // Blade 2 (180 degrees opposite)
      const blade2Group = new THREE.Group();
      const blade2Mesh = new THREE.Mesh(bladeGeom.clone(), bladeMat);
      blade2Mesh.position.x = -0.32;
      blade2Mesh.rotation.y = Math.PI;
      blade2Group.add(blade2Mesh);

      const tip2Mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.016, 0.07),
        orangeTipMat
      );
      tip2Mesh.position.x = -0.61;
      blade2Group.add(tip2Mesh);
      propGroup.add(blade2Group);

      // High-Speed Translucent Blur Disc
      const blurDisc = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.76, 32), blurDiscMat);
      blurDisc.rotation.x = -Math.PI / 2;
      propGroup.add(blurDisc);

      droneGroup.add(propGroup);
      propellerGroups.push({ group: propGroup, clockwise: idx % 2 === 0 });

      // Navigation LED Strobes with Glow Bloom
      if (pos.name === 'FL') {
        const redLed = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xEF4444 })
        );
        redLed.position.set(pos.x - 0.08, pos.y - 0.09, pos.z);
        droneGroup.add(redLed);
        const glow = makeGlowSprite(0xEF4444, 0.35);
        glow.position.copy(redLed.position);
        droneGroup.add(glow);
        ledGlowSprites.push({ sprite: glow, phase: 0 });
      } else if (pos.name === 'FR') {
        const greenLed = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x10B981 })
        );
        greenLed.position.set(pos.x + 0.08, pos.y - 0.09, pos.z);
        droneGroup.add(greenLed);
        const glow = makeGlowSprite(0x10B981, 0.35);
        glow.position.copy(greenLed.position);
        droneGroup.add(glow);
        ledGlowSprites.push({ sprite: glow, phase: Math.PI * 0.4 });
      } else {
        const whiteLed = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
        );
        whiteLed.position.set(pos.x, pos.y - 0.09, pos.z + 0.08);
        droneGroup.add(whiteLed);
        const glow = makeGlowSprite(0xFFFFFF, 0.25);
        glow.position.copy(whiteLed.position);
        droneGroup.add(glow);
        ledGlowSprites.push({ sprite: glow, phase: Math.PI * (pos.name === 'RL' ? 0.9 : 1.3) });
      }
    });

    propellersRef.current = propellerGroups;

    // --- Dynamic Ground Contact Shadow Planes ---
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0,0,0,0.72)');
    grad.addColorStop(0.35, 'rgba(0,0,0,0.35)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 3.0), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -2.2, 0);
    droneGroup.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    const catcherMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowCatcher = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), catcherMat);
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.set(0, -2.19, 0);
    shadowCatcher.receiveShadow = true;
    droneGroup.add(shadowCatcher);

    // Initial 3D placement
    if (isMobileRef.current) {
      droneGroup.position.set(0, -1.65, 1.4);
      droneGroup.scale.set(0.68, 0.68, 0.68);
    } else {
      droneGroup.position.set(2.5, 0.82, 1.9);
      droneGroup.scale.set(0.92, 0.92, 0.92);
    }

    // Interactive 3D Hotspots Group (Pins)
    const hotspotsGroup = new THREE.Group();
    const hotspots = [
      {
        id: 0,
        name: '50MP Dual Optics',
        position: new THREE.Vector3(0, -0.28, 1.05),
        color: 0x34D399,
      },
      {
        id: 1,
        name: 'Omni LiDAR Pod',
        position: new THREE.Vector3(0, 0.42, 0.25),
        color: 0x38BDF8,
      },
      {
        id: 2,
        name: 'O4 Propulsion',
        position: new THREE.Vector3(1.5, 0.22, 1.15),
        color: 0xFBBF24,
      },
    ];

    const hotspotMeshes = [];
    hotspots.forEach((item) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.copy(item.position);
      pinGroup.userData = { id: item.id, isHotspot: true, name: item.name };

      const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.95,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { id: item.id, isHotspot: true };
      pinGroup.add(sphereMesh);

      const glow = makeGlowSprite(item.color, 0.45);
      glow.userData = { id: item.id, isHotspot: true };
      pinGroup.add(glow);

      const ringGeo = new THREE.RingGeometry(0.09, 0.12, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.userData = { id: item.id, isHotspot: true };
      pinGroup.add(ringMesh);

      hotspotsGroup.add(pinGroup);
      hotspotMeshes.push({ group: pinGroup, ring: ringMesh, glow: glow });
    });
    droneGroup.add(hotspotsGroup);

    scene.add(droneGroup);

    // 7. ANIMATION & FLIGHT LOOP
    let animationFrameId;
    let clock = new THREE.Clock();
    let introElapsed = 0;
    const INTRO_DURATION = 2.4;
    let introCompleted = false;

    let isDragging = false;
    let dragPointerStartX = 0;
    let dragPointerStartY = 0;
    let targetOrbitYaw = 0;
    let targetOrbitPitch = 0;
    let currentOrbitYaw = 0;
    let currentOrbitPitch = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      let introInv = 0;
      if (!introCompleted) {
        introElapsed += delta;
        const rawIntro = Math.min(1, introElapsed / INTRO_DURATION);
        const introEase = 1 - Math.pow(1 - rawIntro, 4);
        introInv = 1 - introEase;

        if (rawIntro >= 1) {
          introCompleted = true;
          if (onIntroCompleteRef.current) {
            onIntroCompleteRef.current();
          }
        }
      }

      const target = targetProgressRef.current;
      const prev = currentProgressRef.current;
      currentProgressRef.current += (target - prev) * 0.085;
      const p = currentProgressRef.current;

      // Realistic Propeller Spin RPM
      const rpm = 26 + p * 20 + introInv * 14;
      propellerGroups.forEach((item) => {
        const dir = item.clockwise ? 1 : -1;
        item.group.rotation.y += rpm * delta * dir;
      });

      // Strobe Light LED Bloom Flicker
      ledGlowSprites.forEach((item) => {
        const pulse = Math.pow(Math.max(0, Math.sin(elapsedTime * 2.5 + item.phase)), 5);
        item.sprite.material.opacity = 0.25 + pulse * 0.75;
      });

      // Hotspots Pulse & Camera Face
      hotspotMeshes.forEach((h, i) => {
        const pulse = 1 + Math.sin(elapsedTime * 3.5 + i * 1.5) * 0.25;
        h.ring.scale.set(pulse, pulse, pulse);
        h.ring.lookAt(camera.position);
        h.glow.material.opacity = 0.4 + Math.sin(elapsedTime * 3.5 + i * 1.5) * 0.35;
        h.group.visible = p < 0.25 && introInv < 0.2;
      });

      // Smooth Orbit Damping
      currentOrbitYaw += (targetOrbitYaw - currentOrbitYaw) * 0.08;
      currentOrbitPitch += (targetOrbitPitch - currentOrbitPitch) * 0.08;
      if (!isDragging) {
        targetOrbitYaw *= 0.985;
        targetOrbitPitch *= 0.985;
      }

      // Hover Motion Physics
      const idleWeight = Math.max(0, (1 - p * 2.5) * (1 - introInv));
      const hoverY = Math.sin(elapsedTime * 1.7) * 0.08 * idleWeight;
      const hoverX = Math.cos(elapsedTime * 1.2) * 0.04 * idleWeight;
      const hoverPitch = Math.sin(elapsedTime * 1.5) * 0.02 * idleWeight;
      const hoverRoll = Math.cos(elapsedTime * 1.3) * 0.015 * idleWeight;

      if (droneGroupRef.current) {
        const drone = droneGroupRef.current;

        const startX = isMobileRef.current ? 0 : 2.5;
        const startY = isMobileRef.current ? -1.65 : 0.82;
        const startZ = isMobileRef.current ? 1.4 : 1.9;

        const introOffsetX = (isMobileRef.current ? 1.2 : 3.6) * introInv;
        const introOffsetY = (isMobileRef.current ? 1.0 : 1.4) * introInv;
        const introOffsetZ = -22.0 * introInv;
        const introFlarePitch = Math.sin(introInv * Math.PI) * -0.15;
        const introBankRoll = Math.sin(introInv * Math.PI) * 0.14;
        const introYaw = introInv * 0.26;

        const flightDepth = -p * 68.0;

        const currentBaseX = startX + introOffsetX;
        const currentBaseY = startY + introOffsetY;
        const currentBaseZ = startZ + introOffsetZ;

        const targetX = currentBaseX + (0 - startX) * Math.pow(p, 1.2) * 0.75 + hoverX;
        const targetY = currentBaseY + (isMobileRef.current ? -0.8 : 0.4 - startY) * p * 0.6 + hoverY;
        const targetZ = currentBaseZ + flightDepth;

        drone.position.set(targetX, targetY, targetZ);

        let forwardPitch = 0;
        if (p < 0.35) {
          forwardPitch = Math.sin((p / 0.35) * (Math.PI / 2)) * 0.26;
        } else {
          const settle = (p - 0.35) / 0.65;
          forwardPitch = 0.26 - settle * 0.18;
        }

        const flightRoll = Math.sin(p * Math.PI) * -0.06;

        drone.rotation.x = forwardPitch + hoverPitch + introFlarePitch + currentOrbitPitch + mouseParallaxY;
        drone.rotation.y = ((isMobileRef.current ? 0 : -0.15) + introYaw + currentOrbitYaw + mouseParallaxX) * (1 - p);
        drone.rotation.z = flightRoll + hoverRoll + introBankRoll - currentOrbitYaw * 0.12;

        if (shadowMeshRef.current) {
          const shadow = shadowMeshRef.current;
          const introShadowMult = 1 - introInv * 0.85;
          const shadowScale = Math.max(0.05, (1 - p * 0.9) * introShadowMult);
          shadow.scale.set(shadowScale, shadowScale, shadowScale);
          shadow.material.opacity = Math.max(0, (1 - p * 1.25) * 0.55 * introShadowMult);
        }

        drone.visible = p < 0.99;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. WINDOW RESIZE HANDLER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      isMobileRef.current = newWidth < 768;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);

      if (droneGroupRef.current) {
        if (isMobileRef.current) {
          droneGroupRef.current.scale.set(0.65, 0.65, 0.65);
        } else {
          droneGroupRef.current.scale.set(0.92, 0.92, 0.92);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    // 9. RAYCASTING & 360° DRAG ORBIT INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const checkDroneIntersect = (clientX, clientY) => {
      if (!container || !camera || !droneGroupRef.current) return null;
      const rect = container.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(droneGroupRef.current.children, true);
      const droneHits = hits.filter(
        (h) => h.object !== shadowMeshRef.current && !(h.object.material instanceof THREE.ShadowMaterial)
      );
      return droneHits.length > 0 ? droneHits[0] : null;
    };

    const handlePointerDown = (e) => {
      if (e.target.closest('button, a, input, textarea, select, [role="button"]')) return;
      const hit = checkDroneIntersect(e.clientX, e.clientY);
      if (hit) {
        if (hit.object.userData?.isHotspot) {
          if (onHotspotClickRef.current) {
            onHotspotClickRef.current(hit.object.userData.id);
          }
          return;
        }

        isDragging = true;
        dragPointerStartX = e.clientX;
        dragPointerStartY = e.clientY;
      }
    };

    const handlePointerMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - dragPointerStartX;
        const deltaY = e.clientY - dragPointerStartY;
        dragPointerStartX = e.clientX;
        dragPointerStartY = e.clientY;

        targetOrbitYaw += deltaX * 0.007;
        targetOrbitPitch = Math.max(-0.4, Math.min(0.4, targetOrbitPitch + deltaY * 0.005));
        document.body.style.cursor = 'grabbing';
        return;
      }

      mouseParallaxX = ((e.clientX / window.innerWidth) - 0.5) * 0.12;
      mouseParallaxY = ((e.clientY / window.innerHeight) - 0.5) * 0.08;

      const hit = checkDroneIntersect(e.clientX, e.clientY);
      if (hit) {
        document.body.style.cursor = hit.object.userData?.isHotspot ? 'pointer' : 'grab';
      } else if (document.body.style.cursor === 'grab' || document.body.style.cursor === 'pointer') {
        document.body.style.cursor = '';
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 w-full h-full pointer-events-auto select-none"
    />
  );
}