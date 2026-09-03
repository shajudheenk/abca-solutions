"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero scene: business bills drifting in depth and settling around a single
 * audit report. Built directly on three.js — roughly a dozen textured planes,
 * no physics, no post-processing.
 *
 * Guards: skipped entirely for prefers-reduced-motion and for pointer-coarse
 * devices under 640px (the CSS fallback shows instead); paused when the canvas
 * scrolls out of view or the tab is hidden; DPR capped at 1.75.
 */

type Doc = {
  label: string;
  accent: string;
  rows: number;
  highlight: number;
};

const DOCS: Doc[] = [
  { label: "MERCHANT STATEMENT", accent: "#12a594", rows: 9, highlight: 4 },
  { label: "ELECTRICITY", accent: "#ff6b4a", rows: 8, highlight: 2 },
  { label: "GAS", accent: "#12a594", rows: 7, highlight: 5 },
  { label: "TELECOMS", accent: "#3a7d8c", rows: 10, highlight: 6 },
  { label: "BANK CHARGES", accent: "#12a594", rows: 8, highlight: 3 },
  { label: "EPOS LICENCE", accent: "#ff6b4a", rows: 6, highlight: 1 },
  { label: "BROADBAND", accent: "#3a7d8c", rows: 9, highlight: 7 },
  { label: "INSURANCE", accent: "#12a594", rows: 7, highlight: 2 },
];

function billTexture(doc: Doc, dpr: number) {
  const W = 420;
  const H = 560;
  const c = document.createElement("canvas");
  c.width = W * dpr;
  c.height = H * dpr;
  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);

  g.fillStyle = "#fcfbf8";
  g.fillRect(0, 0, W, H);

  // header band
  g.fillStyle = "#0b1f26";
  g.fillRect(0, 0, W, 74);
  g.fillStyle = doc.accent;
  g.fillRect(28, 28, 18, 18);
  g.fillStyle = "rgba(255,255,255,0.92)";
  g.font = "600 15px ui-sans-serif, system-ui, sans-serif";
  g.letterSpacing = "1.6px";
  g.fillText(doc.label, 58, 41);
  g.fillStyle = "rgba(255,255,255,0.4)";
  g.font = "400 11px ui-sans-serif, system-ui, sans-serif";
  g.fillText("PERIOD SUMMARY", 58, 57);

  // line items
  let y = 116;
  for (let i = 0; i < doc.rows; i++) {
    const isHi = i === doc.highlight;
    if (isHi) {
      g.fillStyle = "rgba(18,165,148,0.10)";
      g.fillRect(20, y - 13, W - 40, 30);
    }
    g.fillStyle = isHi ? doc.accent : "#c9d0d2";
    g.fillRect(28, y, 110 + ((i * 37) % 120), 6);
    g.fillStyle = isHi ? "#0b1f26" : "#dfe4e5";
    const wNum = 44 + ((i * 23) % 34);
    g.fillRect(W - 28 - wNum, y, wNum, 6);
    y += 40;
  }

  // rule + total
  g.strokeStyle = "#e6e1d8";
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(28, H - 96);
  g.lineTo(W - 28, H - 96);
  g.stroke();

  g.fillStyle = "#0b1f26";
  g.fillRect(28, H - 74, 78, 9);
  g.fillStyle = doc.accent;
  g.fillRect(W - 28 - 116, H - 76, 116, 13);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function reportTexture(dpr: number) {
  const W = 420;
  const H = 560;
  const c = document.createElement("canvas");
  c.width = W * dpr;
  c.height = H * dpr;
  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);

  const grad = g.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#0f2a33");
  grad.addColorStop(1, "#0b1f26");
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);

  g.strokeStyle = "rgba(18,165,148,0.5)";
  g.lineWidth = 2;
  g.strokeRect(1, 1, W - 2, H - 2);

  g.fillStyle = "#12a594";
  g.fillRect(34, 40, 22, 22);
  g.fillStyle = "#ffffff";
  g.font = "600 18px ui-sans-serif, system-ui, sans-serif";
  g.letterSpacing = "1px";
  g.fillText("COST AUDIT", 68, 56);
  g.fillStyle = "rgba(255,255,255,0.42)";
  g.font = "400 11px ui-sans-serif, system-ui, sans-serif";
  g.fillText("ABCA SOLUTIONS LTD", 68, 72);

  let y = 128;
  const labels = ["CARD PAYMENTS", "ELECTRICITY", "GAS", "TELECOMS", "BANKING", "EPOS"];
  for (let i = 0; i < labels.length; i++) {
    g.fillStyle = "rgba(255,255,255,0.55)";
    g.font = "500 12px ui-sans-serif, system-ui, sans-serif";
    g.fillText(labels[i], 34, y);
    g.fillStyle = "rgba(255,255,255,0.16)";
    g.fillRect(34, y + 12, W - 68, 1);
    g.fillStyle = "#12a594";
    g.fillRect(W - 34 - (58 + ((i * 29) % 40)), y - 11, 58 + ((i * 29) % 40), 12);
    y += 52;
  }

  g.fillStyle = "rgba(18,165,148,0.14)";
  g.fillRect(24, H - 118, W - 48, 84);
  g.fillStyle = "rgba(255,255,255,0.5)";
  g.font = "500 11px ui-sans-serif, system-ui, sans-serif";
  g.letterSpacing = "1.4px";
  g.fillText("IDENTIFIED PER YEAR", 40, H - 92);
  g.fillStyle = "#ffffff";
  g.font = "600 40px ui-sans-serif, system-ui, sans-serif";
  g.letterSpacing = "-1px";
  g.fillText("£ — — — —", 40, H - 54);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// three is only pulled in on the client, after the guards below pass.
let THREE: typeof import("three");

export default function HeroScene({ fallback }: { fallback: React.ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallTouch = window.matchMedia("(max-width: 639px), (pointer: coarse) and (max-width: 900px)").matches;
    if (reduced || smallTouch) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((mod) => {
      if (disposed) return;
      THREE = mod;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 11.4);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

      scene.add(new THREE.AmbientLight(0xffffff, 1.6));
      const key = new THREE.DirectionalLight(0xffffff, 1.5);
      key.position.set(-4, 6, 8);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x12a594, 1.1);
      rim.position.set(6, -3, 4);
      scene.add(rim);

      const group = new THREE.Group();
      scene.add(group);

      const geom = new THREE.PlaneGeometry(2.1, 2.8, 1, 1);
      const textures: import("three").Texture[] = [];
      const cards: {
        mesh: import("three").Mesh;
        base: import("three").Vector3;
        spin: number;
        floatAmp: number;
        floatSpeed: number;
        phase: number;
        depth: number;
      }[] = [];

      // Orbiting bills
      const radiusX = 4.55;
      const radiusY = 2.35;
      DOCS.forEach((doc, i) => {
        const tex = billTexture(doc, dpr);
        textures.push(tex);
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.72,
          metalness: 0.02,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geom, mat);
        const a = (i / DOCS.length) * Math.PI * 2 + 0.4;
        const depth = -2.2 - (i % 3) * 1.15;
        const base = new THREE.Vector3(Math.cos(a) * radiusX, Math.sin(a) * radiusY, depth);
        mesh.position.copy(base);
        mesh.rotation.set(0.06 * Math.sin(a), -base.x * 0.09, Math.sin(a * 1.7) * 0.14);
        const s = 0.86 + (i % 3) * 0.07;
        mesh.scale.setScalar(s);
        (mat as unknown as { opacity: number }).opacity = 0.92;
        group.add(mesh);
        cards.push({
          mesh,
          base,
          spin: (i % 2 === 0 ? 1 : -1) * 0.035,
          floatAmp: 0.24 + (i % 4) * 0.06,
          floatSpeed: 0.22 + (i % 5) * 0.045,
          phase: i * 0.83,
          depth,
        });
      });

      // The report, front and centre
      const rTex = reportTexture(dpr);
      textures.push(rTex);
      const report = new THREE.Mesh(
        geom,
        new THREE.MeshStandardMaterial({ map: rTex, roughness: 0.5, metalness: 0.08, side: THREE.DoubleSide }),
      );
      report.position.set(0.15, -0.1, 1.2);
      report.scale.setScalar(1.62);
      group.add(report);

      // Soft teal glow behind the report
      const glowGeom = new THREE.PlaneGeometry(9, 9);
      const glowMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: new THREE.Color(0x12a594) } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `
          varying vec2 vUv; uniform vec3 uColor;
          void main(){
            float d = distance(vUv, vec2(0.5));
            float a = smoothstep(0.5, 0.02, d) * 0.30;
            gl_FragColor = vec4(uColor, a);
          }`,
      });
      const glow = new THREE.Mesh(glowGeom, glowMat);
      glow.position.set(0.15, -0.1, -1.4);
      group.add(glow);

      // Pointer parallax
      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      resize();

      // Entrance: cards ease in from depth
      const start = performance.now();
      let raf = 0;
      let running = true;

      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        if (!running) return;

        const t = (now - start) / 1000;
        const intro = Math.min(1, t / 1.6);
        const eased = 1 - Math.pow(1 - intro, 3);

        pointer.x += (target.x - pointer.x) * 0.045;
        pointer.y += (target.y - pointer.y) * 0.045;

        group.rotation.y = pointer.x * 0.16;
        group.rotation.x = -pointer.y * 0.1;

        for (const c of cards) {
          const m = c.mesh;
          m.position.x = c.base.x * eased;
          m.position.y = c.base.y * eased + Math.sin(t * c.floatSpeed * Math.PI + c.phase) * c.floatAmp;
          m.position.z = c.depth + (1 - eased) * -6;
          m.rotation.z += c.spin * 0.012;
          m.rotation.y = -c.base.x * 0.09 + pointer.x * 0.06;
          (m.material as import("three").MeshStandardMaterial).opacity = 0.92 * eased;
        }

        report.position.y = -0.1 + Math.sin(t * 0.5) * 0.13;
        report.rotation.y = pointer.x * 0.1 + Math.sin(t * 0.22) * 0.045;
        report.rotation.x = -pointer.y * 0.06;
        report.scale.setScalar(1.62 * (0.88 + 0.12 * eased));
        glow.position.y = report.position.y;

        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);

      const io = new IntersectionObserver(([e]) => (running = e.isIntersecting), { threshold: 0 });
      io.observe(host);
      const onVis = () => (running = !document.hidden);
      document.addEventListener("visibilitychange", onVis);

      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("pointermove", onPointer);
        textures.forEach((t) => t.dispose());
        geom.dispose();
        glowGeom.dispose();
        glowMat.dispose();
        group.traverse((o) => {
          const mesh = o as import("three").Mesh;
          if (mesh.material) {
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => m.dispose());
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: ready ? 0 : 1, pointerEvents: "none" }}
        aria-hidden="true"
      >
        {fallback}
      </div>
    </>
  );
}
