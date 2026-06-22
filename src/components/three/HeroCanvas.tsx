"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Living automation network rendered in WebGL.
 *
 * A field of glowing nodes drifts through space; nearby nodes link with light
 * trails whose opacity falls off with distance — a visual metaphor for AI agents
 * routing work between connected tools. The network gently parallaxes toward the
 * cursor. Everything is created lazily on mount, capped for performance, paused
 * when offscreen/hidden, and fully disposed on unmount. Reduced-motion users get
 * a single static frame with no animation loop.
 */
export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ---- Renderer / scene / camera -------------------------------------
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 18;

    mount.appendChild(renderer.domElement);

    // ---- Node field -----------------------------------------------------
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 46 : 80;
    const SPREAD_X = 34;
    const SPREAD_Y = 20;
    const SPREAD_Z = 14;
    const LINK_DIST = isMobile ? 6.5 : 6.0;

    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const colorA = new THREE.Color(0x7c3aed);
    const colorB = new THREE.Color(0xd946ef);

    const nodeColors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z;
      velocities[i * 3] = (Math.random() - 0.5) * 0.012;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.012;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
      const mix = Math.random();
      const c = colorA.clone().lerp(colorB, mix);
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
    }

    // Soft circular sprite for the glowing nodes.
    const makeGlowTexture = () => {
      const s = 64;
      const cvs = document.createElement("canvas");
      cvs.width = cvs.height = s;
      const ctx = cvs.getContext("2d")!;
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(232,121,249,0.9)");
      g.addColorStop(0.6, "rgba(147,51,234,0.35)");
      g.addColorStop(1, "rgba(147,51,234,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };
    const glowTex = makeGlowTexture();

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: isMobile ? 1.1 : 0.9,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(nodeGeo, nodeMat);
    scene.add(points);

    // ---- Connection lines (rebuilt each frame) -------------------------
    const maxLines = COUNT * 6;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineColors = new Float32Array(maxLines * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ---- Ambient dust ---------------------------------------------------
    const DUST = isMobile ? 140 : 260;
    const dustPos = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 60;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.5,
      map: glowTex,
      color: 0x9333ea,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const group = new THREE.Group();
    group.add(points, lines, dust);
    scene.add(group);

    // ---- Interaction / resize ------------------------------------------
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Frame update ---------------------------------------------------
    const linkColor = new THREE.Color();

    const updateLinks = () => {
      let v = 0;
      for (let i = 0; i < COUNT; i++) {
        const ix = positions[i * 3];
        const iy = positions[i * 3 + 1];
        const iz = positions[i * 3 + 2];
        for (let j = i + 1; j < COUNT; j++) {
          const dx = ix - positions[j * 3];
          const dy = iy - positions[j * 3 + 1];
          const dz = iz - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < LINK_DIST && v < maxLines) {
            const a = 1 - dist / LINK_DIST;
            linePositions[v * 6] = ix;
            linePositions[v * 6 + 1] = iy;
            linePositions[v * 6 + 2] = iz;
            linePositions[v * 6 + 3] = positions[j * 3];
            linePositions[v * 6 + 4] = positions[j * 3 + 1];
            linePositions[v * 6 + 5] = positions[j * 3 + 2];
            linkColor
              .setRGB(nodeColors[i * 3], nodeColors[i * 3 + 1], nodeColors[i * 3 + 2])
              .multiplyScalar(a);
            lineColors[v * 6] = linkColor.r;
            lineColors[v * 6 + 1] = linkColor.g;
            lineColors[v * 6 + 2] = linkColor.b;
            lineColors[v * 6 + 3] = linkColor.r;
            lineColors[v * 6 + 4] = linkColor.g;
            lineColors[v * 6 + 5] = linkColor.b;
            v++;
          }
        }
      }
      lineGeo.setDrawRange(0, v * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
    };

    const stepNodes = () => {
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        // wrap within bounds
        if (Math.abs(positions[i * 3]) > SPREAD_X / 2) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > SPREAD_Y / 2)
          velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > SPREAD_Z / 2)
          velocities[i * 3 + 2] *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;
    };

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const render = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const t = clock.getElapsedTime();

      stepNodes();
      updateLinks();

      group.rotation.y = pointer.x * 0.25 + t * 0.02;
      group.rotation.x = pointer.y * 0.15;
      dust.rotation.y = -t * 0.01;
      camera.position.x += (pointer.x * 2 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 1.4 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      render();
      raf = requestAnimationFrame(loop);
    };

    // Pause when the hero leaves the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (prefersReduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          loop();
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const onVisibility = () => {
      if (prefersReduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (prefersReduced) {
      // One static, composed frame.
      stepNodes();
      updateLinks();
      renderer.render(scene, camera);
    } else {
      loop();
    }

    // ---- Cleanup --------------------------------------------------------
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      nodeGeo.dispose();
      lineGeo.dispose();
      dustGeo.dispose();
      nodeMat.dispose();
      lineMat.dispose();
      dustMat.dispose();
      glowTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
