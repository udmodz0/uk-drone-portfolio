import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDroneScene({ scrollProgress = 0, onIntroComplete, onDroneClick }) {
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

  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  useEffect(() => {
    onDroneClickRef.current = onDroneClick;
  }, [onDroneClick]);

  useEffect(() => {
    targetProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    isMobileRef.current = window.innerWidth < 768;

    // ---------- helpers: procedural textures (no external assets) ----------

    // Small studio-style environment map so metal actually reflects something
    // instead of reading as flat gray. Built as a 6-face gradient cube, cheap
    // and deterministic — no network fetch, no CDN dependency.
    function buildEnvMap() {
      const size = 128;
      const faces = [
        // +x, -x, +y, -y, +z, -z — soft studio gradient, brighter "top" face
        { top: '#3a4356', bottom: '#0c0e12' },
        { top: '#2e3648', bottom: '#0c0e12' },
        { top: '#8892a6', bottom: '#3a4356' }, // sky-ish top face (main reflection source)
        { top: '#14171d', bottom: '#050608' }, // ground face, dark
        { top: '#3a4356', bottom: '#0c0e12' },
        { top: '#2e3648', bottom: '#0c0e12' },
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

    // Radial falloff texture for propeller motion-blur discs: dense translucent
    // center fading to a soft feathered edge, instead of a flat-opacity ring.
    function buildBlurDiscTexture() {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const cx = size / 2;
      const cy = size / 2;
      const grad = ctx.createRadialGradient(cx, cy, size * 0.14, cx, cy, size * 0.5);
      grad.addColorStop(0, 'rgba(226,232,240,0)');
      grad.addColorStop(0.55, 'rgba(226,232,240,0.10)');
      grad.addColorStop(0.78, 'rgba(226,232,240,0.30)');
      grad.addColorStop(0.92, 'rgba(226,232,240,0.14)');
      grad.addColorStop(1, 'rgba(226,232,240,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    // Soft circular glow sprite for LED bloom (cheaper + more reliable than
    // full post-processing bloom for a small decorative hero element).
    function buildGlowTexture() {
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const cx = size / 2;
      const cy = size / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.35)');
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
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    camera.position.set(0, 0.4, 8);
    camera.lookAt(0, 0, 0);
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
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. LIGHTING SETUP (Soft cinema aerial lighting)
    const ambientLight = new THREE.AmbientLight(0xE2E8F0, 1.1);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 2.6);
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 20;
    sunLight.shadow.bias = -0.0015;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x60A5FA, 1.2);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    // Small fill light bounced up from "ground" to soften harsh AO on the belly
    const fillLight = new THREE.HemisphereLight(0x4a5568, 0x0a0c10, 0.5);
    scene.add(fillLight);

    // 5. PBR MATERIALS (Authentic DJI Air 3S palette, now env-mapped)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1A1F29,
      roughness: 0.42,
      metalness: 0.35,
      envMap,
      envMapIntensity: 0.6,
    });

    const carbonArmMat = new THREE.MeshStandardMaterial({
      color: 0x13171F,
      roughness: 0.32,
      metalness: 0.55,
      envMap,
      envMapIntensity: 0.8,
    });

    const motorMat = new THREE.MeshStandardMaterial({
      color: 0x4A5568,
      roughness: 0.22,
      metalness: 0.88,
      envMap,
      envMapIntensity: 1.4,
    });

    // Dedicated dark AO material for recessed joints (arm-to-body sockets,
    // gimbal recess) — cheap substitute for baked AO maps.
    const aoJointMat = new THREE.MeshStandardMaterial({
      color: 0x05060a,
      roughness: 0.7,
      metalness: 0.1,
    });

    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xCBD5E1,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.78,
      envMap,
      envMapIntensity: 0.4,
    });

    const blurDiscTex = buildBlurDiscTexture();
    const blurDiscMat = new THREE.MeshBasicMaterial({
      map: blurDiscTex,
      color: 0xE2E8F0,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x05070A,
      roughness: 0.08,
      metalness: 0.95,
      envMap,
      envMapIntensity: 1.6,
    });

    const lensCoatingMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.85,
    });

    // 6. BUILD HIGH-FIDELITY 3D DRONE MODEL
    const droneGroup = new THREE.Group();
    droneGroupRef.current = droneGroup;

    // --- Fuselage Core ---
    const fuselageGeom = new THREE.CylinderGeometry(0.38, 0.46, 1.6, 12);
    fuselageGeom.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeom, bodyMat);
    fuselage.scale.set(1.15, 0.58, 1);
    fuselage.castShadow = true;
    fuselage.receiveShadow = true;
    droneGroup.add(fuselage);

    // Top battery cowl
    const cowlGeom = new THREE.BoxGeometry(0.55, 0.22, 1.05);
    const cowl = new THREE.Mesh(cowlGeom, bodyMat);
    cowl.position.set(0, 0.16, 0.05);
    cowl.castShadow = true;
    droneGroup.add(cowl);

    // Aerodynamic Nose Cone
    const noseGeom = new THREE.SphereGeometry(0.38, 16, 12);
    const nose = new THREE.Mesh(noseGeom, bodyMat);
    nose.position.set(0, -0.02, -0.85);
    nose.scale.set(1.0, 0.55, 0.9);
    droneGroup.add(nose);

    // Top LiDAR Dome
    const lidarGeom = new THREE.CylinderGeometry(0.12, 0.14, 0.1, 16);
    const lidar = new THREE.Mesh(lidarGeom, new THREE.MeshStandardMaterial({ color: 0x0F131A, roughness: 0.2, envMap, envMapIntensity: 0.5 }));
    lidar.position.set(0, 0.28, -0.1);
    droneGroup.add(lidar);

    // --- 3-Axis Camera Gimbal Assembly ---
    const gimbalBase = new THREE.Group();
    gimbalBase.position.set(0, -0.22, -0.92);

    // AO recess behind the gimbal housing, sits slightly further back so it
    // reads as a shadowed pocket instead of the housing floating on nothing
    const gimbalRecess = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.36, 0.1),
      aoJointMat
    );
    gimbalRecess.position.set(0, 0, 0.1);
    gimbalBase.add(gimbalRecess);

    const gimbalHousing = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.3, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x0E1117, roughness: 0.3, metalness: 0.7, envMap, envMapIntensity: 0.9 })
    );
    gimbalBase.add(gimbalHousing);

    // Primary 1-inch Wide Camera Lens
    const lensRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2, envMap, envMapIntensity: 1.2 })
    );
    lensRing.rotateX(Math.PI / 2);
    lensRing.position.set(-0.1, 0, -0.16);
    gimbalBase.add(lensRing);

    const lensGlass = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), lensMat);
    lensGlass.position.set(-0.1, 0, -0.201);
    gimbalBase.add(lensGlass);

    // Telephoto Secondary Lens
    const teleRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2, envMap, envMapIntensity: 1.2 })
    );
    teleRing.rotateX(Math.PI / 2);
    teleRing.position.set(0.11, 0, -0.16);
    gimbalBase.add(teleRing);

    const teleGlass = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), lensCoatingMat);
    teleGlass.position.set(0.11, 0, -0.191);
    gimbalBase.add(teleGlass);

    droneGroup.add(gimbalBase);

    // --- 4 Carbon Fiber Arms & Motors ---
    const armPositions = [
      { name: 'FL', x: -1.35, y: 0.08, z: -0.95, angle: 0.62 },
      { name: 'FR', x: 1.35, y: 0.08, z: -0.95, angle: -0.62 },
      { name: 'RL', x: -1.45, y: -0.05, z: 0.95, angle: 2.45 },
      { name: 'RR', x: 1.45, y: -0.05, z: 0.95, angle: -2.45 },
    ];

    const propellerGroups = [];
    const ledGlowSprites = [];

    armPositions.forEach((pos, idx) => {
      // Structural Carbon Arm Boom
      const armLength = Math.sqrt(pos.x * pos.x + pos.z * pos.z) * 0.92;
      const armGeom = new THREE.CylinderGeometry(0.065, 0.075, armLength, 12);
      const arm = new THREE.Mesh(armGeom, carbonArmMat);
      arm.position.set(pos.x * 0.5, pos.y, pos.z * 0.5);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = pos.angle;
      arm.castShadow = true;
      droneGroup.add(arm);

      // AO joint where the arm socket meets the fuselage — small dark sphere
      // tucked at the root, invisible on its own but darkens the seam.
      const armRootAO = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), aoJointMat);
      armRootAO.position.set(pos.x * 0.12, pos.y - 0.02, pos.z * 0.12);
      droneGroup.add(armRootAO);

      // Brushless Motor Pod
      const motorGeom = new THREE.CylinderGeometry(0.2, 0.22, 0.22, 16);
      const motor = new THREE.Mesh(motorGeom, motorMat);
      motor.position.set(pos.x, pos.y + 0.06, pos.z);
      motor.castShadow = true;
      droneGroup.add(motor);

      // AO ring at the motor-to-arm joint
      const motorJointAO = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 16), aoJointMat);
      motorJointAO.rotation.x = Math.PI / 2;
      motorJointAO.position.set(pos.x, pos.y - 0.02, pos.z);
      droneGroup.add(motorJointAO);

      // Motor Spinner Hub
      const spinnerGeom = new THREE.ConeGeometry(0.08, 0.12, 16);
      const spinner = new THREE.Mesh(spinnerGeom, motorMat);
      spinner.position.set(pos.x, pos.y + 0.2, pos.z);
      droneGroup.add(spinner);

      // Rotating Propeller Group
      const propGroup = new THREE.Group();
      propGroup.position.set(pos.x, pos.y + 0.18, pos.z);

      // Tapered airfoil blade: thin twisted profile instead of a flat box.
      // Built from a shape (chord tapering toward the tip) extruded thin,
      // with a slight twist per segment to fake an airfoil silhouette.
      const bladeShape = new THREE.Shape();
      bladeShape.moveTo(-0.02, 0.13);
      bladeShape.quadraticCurveTo(0.35, 0.1, 0.7, 0.045);
      bladeShape.lineTo(0.7, -0.045);
      bladeShape.quadraticCurveTo(0.35, -0.09, -0.02, -0.13);
      bladeShape.lineTo(-0.02, 0.13);
      const bladeExtrude = new THREE.ExtrudeGeometry(bladeShape, {
        depth: 0.012,
        bevelEnabled: true,
        bevelThickness: 0.004,
        bevelSize: 0.004,
        bevelSegments: 1,
        curveSegments: 8,
      });
      bladeExtrude.center();
      bladeExtrude.rotateX(Math.PI / 2);

      const blade1 = new THREE.Mesh(bladeExtrude, bladeMat);
      blade1.position.x = 0.32;
      propGroup.add(blade1);

      const blade2 = new THREE.Mesh(bladeExtrude.clone(), bladeMat);
      blade2.position.x = -0.32;
      blade2.rotation.y = Math.PI;
      propGroup.add(blade2);

      // Translucent High-Speed Blur Disc, now with real radial falloff texture
      const blurDisc = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.74, 32), blurDiscMat);
      blurDisc.rotation.x = -Math.PI / 2;
      propGroup.add(blurDisc);

      droneGroup.add(propGroup);
      propellerGroups.push({ group: propGroup, clockwise: idx % 2 === 0, blade1, blade2 });

      // Navigation LED Beacons — now with an additive glow sprite for bloom
      if (pos.name === 'FL') {
        const redLed = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xEF4444 })
        );
        redLed.position.set(pos.x - 0.08, pos.y - 0.08, pos.z);
        droneGroup.add(redLed);
        const glow = makeGlowSprite(0xEF4444, 0.32);
        glow.position.copy(redLed.position);
        droneGroup.add(glow);
        ledGlowSprites.push({ sprite: glow, phase: 0 });
      } else if (pos.name === 'FR') {
        const greenLed = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x10B981 })
        );
        greenLed.position.set(pos.x + 0.08, pos.y - 0.08, pos.z);
        droneGroup.add(greenLed);
        const glow = makeGlowSprite(0x10B981, 0.32);
        glow.position.copy(greenLed.position);
        droneGroup.add(glow);
        ledGlowSprites.push({ sprite: glow, phase: Math.PI * 0.4 });
      } else {
        const whiteLed = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
        );
        whiteLed.position.set(pos.x, pos.y - 0.08, pos.z + 0.08);
        droneGroup.add(whiteLed);
        const glow = makeGlowSprite(0xFFFFFF, 0.22);
        glow.position.copy(whiteLed.position);
        droneGroup.add(glow);
        ledGlowSprites.push({ sprite: glow, phase: Math.PI * (pos.name === 'RL' ? 0.9 : 1.3) });
      }
    });

    propellersRef.current = propellerGroups;

    // --- Dynamic Ground / Atmospheric Shadow Plane ---
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0,0,0,0.65)');
    grad.addColorStop(0.4, 'rgba(0,0,0,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.8), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -2.2, 0);
    shadowMesh.receiveShadow = false; // fake shadow already; real shadow-map catcher optional below
    droneGroup.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // Real shadow-catcher plane (invisible material, only receives cast shadows)
    // layered under the fake canvas shadow for extra grounding contact detail.
    const catcherMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const shadowCatcher = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), catcherMat);
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.set(0, -2.19, 0);
    shadowCatcher.receiveShadow = true;
    droneGroup.add(shadowCatcher);

    // Initial 3D placement (Hovering gracefully on right side of hero)
    if (isMobileRef.current) {
      droneGroup.position.set(0, -0.55, 1.2);
      droneGroup.scale.set(0.65, 0.65, 0.65);
    } else {
      droneGroup.position.set(2.5, 0.82, 1.9);
      droneGroup.scale.set(0.92, 0.92, 0.92);
    }

    scene.add(droneGroup);

    // 7. ANIMATION & FLIGHT LOOP
    let animationFrameId;
    let clock = new THREE.Clock();
    let introElapsed = 0;
    const INTRO_DURATION = 2.4;
    let introCompleted = false;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1); // clamp delta against tab background pauses
      const elapsedTime = clock.getElapsedTime();

      // Cinematic Intro Progress (Flies in from depth on first load)
      let introInv = 0;
      if (!introCompleted) {
        introElapsed += delta;
        const rawIntro = Math.min(1, introElapsed / INTRO_DURATION);
        // Smooth quartic ease-out
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

      // 1. Continuous Realistic Propeller Rotation
      const rpm = 24 + p * 18 + introInv * 12;
      propellerGroups.forEach((item) => {
        const dir = item.clockwise ? 1 : -1;
        item.group.rotation.y += rpm * delta * dir;
      });

      // LED strobe pulse via emissive-style opacity flicker on the glow sprites
      ledGlowSprites.forEach((item) => {
        const pulse = Math.pow(Math.max(0, Math.sin(elapsedTime * 2.2 + item.phase)), 6);
        item.sprite.material.opacity = 0.25 + pulse * 0.75;
      });

      // 2. Idle Natural Hovering (Subtle aerodynamic float)
      const idleWeight = Math.max(0, (1 - p * 2.5) * (1 - introInv));
      const hoverY = Math.sin(elapsedTime * 1.7) * 0.08 * idleWeight;
      const hoverX = Math.cos(elapsedTime * 1.2) * 0.04 * idleWeight;
      const hoverPitch = Math.sin(elapsedTime * 1.5) * 0.02 * idleWeight;
      const hoverRoll = Math.cos(elapsedTime * 1.3) * 0.015 * idleWeight;

      if (droneGroupRef.current) {
        const drone = droneGroupRef.current;

        const startX = isMobileRef.current ? 0 : 2.5;
        const startY = isMobileRef.current ? -0.55 : 0.82;
        const startZ = isMobileRef.current ? 1.2 : 1.9;

        // Intro swoop offsets (starts in distance, descends and curves inwards)
        const introOffsetX = (isMobileRef.current ? 1.8 : 3.6) * introInv;
        const introOffsetY = 1.4 * introInv;
        const introOffsetZ = -22.0 * introInv;
        const introFlarePitch = Math.sin(introInv * Math.PI) * -0.15;
        const introBankRoll = Math.sin(introInv * Math.PI) * 0.14;
        const introYaw = introInv * 0.26;

        const flightDepth = -p * 68.0;

        const currentBaseX = startX + introOffsetX;
        const currentBaseY = startY + introOffsetY;
        const currentBaseZ = startZ + introOffsetZ;

        const targetX = currentBaseX + (0 - startX) * Math.pow(p, 1.2) * 0.75 + hoverX;
        const targetY = currentBaseY + (0.4 - startY) * p * 0.6 + hoverY;
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

        drone.rotation.x = forwardPitch + hoverPitch + introFlarePitch;
        drone.rotation.y = ((isMobileRef.current ? 0 : -0.15) + introYaw) * (1 - p);
        drone.rotation.z = flightRoll + hoverRoll + introBankRoll;

        if (shadowMeshRef.current) {
          const shadow = shadowMeshRef.current;
          const introShadowMult = 1 - introInv * 0.85;
          const shadowScale = Math.max(0.05, (1 - p * 0.9) * introShadowMult);
          shadow.scale.set(shadowScale, shadowScale, shadowScale);
          shadow.material.opacity = Math.max(0, (1 - p * 1.25) * 0.45 * introShadowMult);
        }

        if (p >= 0.99) {
          drone.visible = false;
        } else {
          drone.visible = true;
        }
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

    // 9. RAYCASTING INTERACTION: CLICK DRONE TO INSPECT DETAILS
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const checkDroneIntersect = (clientX, clientY) => {
      if (!container || !camera || !droneGroupRef.current) return false;
      const rect = container.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return false;
      }
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(droneGroupRef.current.children, true);
      const droneHits = hits.filter(
        (h) => h.object !== shadowMeshRef.current && !(h.object.material instanceof THREE.ShadowMaterial)
      );
      return droneHits.length > 0;
    };

    const handlePointerDown = (e) => {
      // Ignore if user clicked another interactive element (buttons, links, modal)
      if (e.target.closest('button, a, input, textarea, select, [role="button"]')) return;
      if (checkDroneIntersect(e.clientX, e.clientY)) {
        if (onDroneClickRef.current) {
          onDroneClickRef.current();
        }
      }
    };

    const handlePointerMove = (e) => {
      if (checkDroneIntersect(e.clientX, e.clientY)) {
        document.body.style.cursor = 'pointer';
      } else if (document.body.style.cursor === 'pointer') {
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);

    // 10. CLEANUP & RESOURCE DISPOSAL
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      if (document.body.style.cursor === 'pointer') {
        document.body.style.cursor = '';
      }

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          } else {
            if (obj.material.map) obj.material.map.dispose();
            obj.material.dispose();
          }
        }
      });

      envMap.dispose();
      blurDiscTex.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}