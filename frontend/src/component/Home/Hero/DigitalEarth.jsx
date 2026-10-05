import { useEffect, useRef } from "react";

import usePrefersReducedMotion from "../../../hooks/usePrefersReducedMotion";

/* ======================================================
   DIGITAL EARTH
   ------------------------------------------------------------
   A lightweight <canvas> globe: no WebGL, no 3D library, no
   asset download. Landmasses are drawn as a dot matrix, with a
   graticule, glowing nodes, great-circle arcs between the nodes
   and a slow orbiting ring.

   Everything is projected orthographically, so the maths is a
   handful of sine/cosine calls and the whole thing stays under
   a millisecond per frame on a laptop.

   Performance guards:
     - device pixel ratio capped at 2
     - one rAF loop, cancelled on unmount / hidden / off-screen
     - the dot matrix is rasterised once, not per frame
     - reduced motion renders exactly one static frame
   ====================================================== */

const DEG = Math.PI / 180;

/* Rotation speed, degrees per second. Slow enough to read, fast
   enough that every highlighted city comes round inside a minute. */
const SPIN = 5.5;

/* Starting rotation so Europe / Africa face the viewer. */
const START_ROTATION = -18;

/* Angle between the orbit ring and the equator, in radians. */
const ORBIT_TILT = -0.42;

/* Dot matrix resolution, in degrees. Finer = denser continents. */
const STEP_LON = 1.9;
const STEP_LAT = 2.2;


/* ======================================================
   LAND
   ------------------------------------------------------------
   Coarse continent outlines as [longitude, latitude] rings.
   Deliberately low detail: at dot-matrix resolution a rough
   coastline reads as a continent, and a detailed one would
   just cost frames.
   ====================================================== */

const LAND = [
  /* North America */
  [
    [-168, 65.5], [-162, 70], [-148, 70.5], [-130, 70], [-110, 68.5],
    [-95, 70], [-85, 73], [-76, 68], [-62, 60], [-55, 51], [-66, 45],
    [-70, 42], [-75, 35], [-81, 25], [-88, 30], [-95, 29], [-97, 26],
    [-105, 22], [-110, 24], [-114, 30], [-120, 34], [-124, 42],
    [-124, 48], [-131, 55], [-140, 60], [-150, 60], [-158, 57],
    [-165, 60], [-168, 65.5],
  ],
  /* Central America */
  [
    [-92, 18], [-88, 16], [-84, 10], [-79, 8], [-77, 9], [-83, 15],
    [-87, 13], [-92, 18],
  ],
  /* Greenland */
  [
    [-45, 60], [-50, 64], [-53, 68], [-55, 72], [-45, 78], [-30, 80],
    [-20, 76], [-22, 70], [-38, 65], [-45, 60],
  ],
  /* South America */
  [
    [-78, 8], [-72, 11], [-62, 10], [-52, 5], [-50, 0], [-44, -3],
    [-35, -6], [-38, -13], [-40, -20], [-48, -25], [-53, -34],
    [-58, -38], [-62, -40], [-65, -45], [-68, -52], [-70, -55],
    [-75, -50], [-73, -42], [-71, -33], [-70, -20], [-76, -14],
    [-81, -6], [-80, 0], [-78, 4], [-78, 8],
  ],
  /* Africa */
  [
    [-17, 15], [-16, 22], [-10, 28], [-5, 36], [3, 37], [11, 34],
    [20, 32], [32, 31], [35, 24], [38, 18], [43, 12], [51, 12],
    [48, 5], [41, -2], [40, -10], [35, -18], [33, -26], [27, -33],
    [20, -35], [16, -28], [13, -20], [12, -6], [9, 4], [3, 6],
    [-8, 5], [-13, 9], [-17, 15],
  ],
  /* Eurasia */
  [
    [-10, 36], [-9, 43], [-2, 48], [2, 51], [7, 53], [9, 55],
    [8, 57], [11, 58], [5, 59], [6, 63], [12, 66], [16, 69],
    [22, 71], [28, 71], [33, 70], [40, 68], [45, 67], [52, 69],
    [60, 70], [68, 71], [75, 73], [85, 74], [95, 76], [105, 77],
    [113, 74], [125, 73], [135, 72], [145, 70], [160, 70], [170, 67],
    [179, 65], [179, 60], [170, 60], [162, 58], [155, 55], [143, 54],
    [135, 50], [130, 43], [126, 40], [122, 38], [120, 33], [122, 30],
    [118, 25], [110, 20], [105, 10], [100, 6], [97, 16], [92, 21],
    [88, 22], [80, 15], [77, 8], [72, 20], [68, 24], [62, 25],
    [57, 25], [52, 29], [45, 30], [40, 32], [35, 36], [30, 36],
    [26, 38], [23, 38], [20, 40], [16, 42], [13, 44], [9, 44],
    [3, 43], [-2, 36],
  ],
  /* Australia */
  [
    [113, -22], [114, -34], [122, -34], [129, -32], [135, -35],
    [140, -38], [147, -38], [150, -35], [153, -28], [146, -19],
    [142, -11], [136, -12], [130, -12], [125, -14], [122, -17],
    [113, -22],
  ],
  /* Islands */
  [[-6, 50], [-2, 53], [-3, 58], [-6, 58], [-6, 50]],                       // UK
  [[130, 32], [136, 34], [141, 38], [142, 43], [145, 44], [141, 40],
    [137, 35], [132, 33], [130, 32]],                                     // Japan
  [[44, -16], [50, -15], [49, -25], [45, -25], [44, -16]],                 // Madagascar
  [[95, 5], [106, -6], [116, -8], [126, -8], [136, -3], [141, -3],
    [130, 0], [118, 0], [106, 0], [96, 3], [95, 5]],                       // Indonesia
  [[172, -41], [174, -37], [178, -38], [174, -46], [167, -46],
    [172, -41]],                                                           // New Zealand
  [[80, 6], [82, 9], [80, 9], [80, 6]],                                    // Sri Lanka
  [[120, 6], [126, 8], [126, 18], [120, 18], [120, 6]],                    // Philippines
  [[-85, 20], [-74, 20], [-77, 23], [-84, 23], [-85, 20]],                 // Cuba
  [[-24, 63], [-14, 64], [-14, 67], [-22, 67], [-24, 63]],                 // Iceland
  [[46, -25], [50, -17], [48, -13], [44, -16], [46, -25]],                 // Madagascar S
  [[7, 4], [9, 4], [9, 2], [7, 2], [7, 4]],                                // Bioko area
];


/* ======================================================
   HELPERS
   ====================================================== */

/* Ray-casting point-in-polygon. The rings above are nested
   [longitude, latitude] pairs, so they are indexed as pairs. */
function pointInRing(lon, lat, ring) {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];

    if (
      (yi > lat) !== (yj > lat) &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    ) {
      inside = !inside;
    }
  }

  return inside;
}

/*
  Rasterise the coastline rings into a flat list of
  [longitude, latitude] dot centres. Done once per module
  load, then reused for every frame.
*/
const LAND_DOTS = (() => {
  const dots = [];

  for (let lat = -84; lat <= 84; lat += STEP_LAT) {
    // Longitude steps stay constant, so the dots compress
    // towards the poles on their own — which is exactly what
    // an orthographic projection does.
    const squeeze = Math.max(Math.cos(lat * DEG), 0.18);
    const step = STEP_LON / squeeze;

    for (let lon = -180; lon < 180; lon += step) {
      let isLand = lat <= -72; // Antarctica strip

      if (!isLand) {
        for (const ring of LAND) {
          if (pointInRing(lon, lat, ring)) {
            isLand = true;
            break;
          }
        }
      }

      if (isLand) {
        dots.push(lon, lat);
      }
    }
  }

  return Float32Array.from(dots);
})();

/* Ambient dust, positioned once with a fixed sequence so the
   field never reshuffles between renders. */
const DUST = (() => {
  const points = new Float32Array(46 * 3);
  let seed = 20250114;

  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let i = 0; i < points.length; i += 3) {
    points[i] = random();
    points[i + 1] = random();
    points[i + 2] = 0.4 + random() * 1.4;
  }

  return points;
})();


/* ======================================================
   PROJECTION
   ------------------------------------------------------------
   Orthographic. Returns screen position plus a depth term:
   z = 1 at the centre of the disc, 0 at the limb, negative
   on the far side (which we skip).
   ====================================================== */

function project(lon, lat, rotation, cx, cy, radius) {
  const lambda = (lon + rotation) * DEG;
  const phi = lat * DEG;
  const cosPhi = Math.cos(phi);

  const z = cosPhi * Math.cos(lambda);

  return {
    x: cx + cosPhi * Math.sin(lambda) * radius,
    y: cy - Math.sin(phi) * radius,
    z,
  };
}

/* Draw a polyline on the sphere, breaking it wherever it goes
   round the back. */
function strokeArc(ctx, points, cx, cy, radius, rotation) {
  let drawing = false;

  ctx.beginPath();

  for (let i = 0; i < points.length; i += 2) {
    const p = project(points[i], points[i + 1], rotation, cx, cy, radius);

    if (p.z <= 0.02) {
      drawing = false;
      continue;
    }

    if (!drawing) {
      ctx.moveTo(p.x, p.y);
      drawing = true;
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }

  ctx.stroke();
}

/* Graticule sample lines. Fixed geometry, so they are built once
   at module load rather than inside every frame. */
const MERIDIANS = Float32Array.from(
  Array.from({ length: 18 }, (_, i) => -180 + i * 20).flatMap((lon) =>
    Array.from({ length: 61 }, (_, i) => [lon, -90 + i * 3])
  ).flat()
);

const PARALLELS = Float32Array.from(
  Array.from({ length: 9 }, (_, i) => -80 + i * 20).flatMap((lat) =>
    Array.from({ length: 61 }, (_, i) => [-180 + i * 6, lat])
  ).flat()
);

function graticule(ctx, cx, cy, radius, rotation, style) {
  ctx.strokeStyle = style;
  ctx.lineWidth = 1;

  for (const line of [MERIDIANS, PARALLELS]) {
    strokeArc(ctx, line, cx, cy, radius, rotation);
  }
}


/* ======================================================
   COMPONENT
   ====================================================== */

export default function DigitalEarth({ nodes = [], reduced = false }) {
  const canvasRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();
  const still = reduced || prefersReduced;

  /* Keep the nodes in a ref so the animation loop never has to
     be torn down and rebuilt when the slide changes. */
  const nodesRef = useRef(nodes);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  /* The effect below publishes its draw function and current
     elapsed time here, so a slide change can redraw the globe
     without restarting the loop — and without going through a
     React state update every frame. */
  const paintRef = useRef(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const host = canvas.parentElement;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!host) return;

      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = width / 2;
      cy = height / 2;
      radius = Math.min(width, height) * 0.38;
    };

    /* ---------- one frame ---------- */

    const draw = (elapsed) => {
      elapsedRef.current = elapsed;

      const rotation = START_ROTATION + elapsed * SPIN;

      ctx.clearRect(0, 0, width, height);

      /* ---- ambient dust ---- */
      ctx.fillStyle = "rgba(168, 166, 232, 0.55)";

      for (let i = 0; i < DUST.length; i += 3) {
        const drift = Math.sin(elapsed * 0.35 + DUST[i] * 12) * 6;
        const r = DUST[i + 2];

        ctx.globalAlpha = 0.14 + DUST[i + 1] * 0.3;
        ctx.beginPath();
        ctx.arc(
          DUST[i] * width,
          DUST[i + 1] * height + drift,
          r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      /* ---- halo behind the sphere ---- */
      const halo = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.72,
        cx,
        cy,
        radius * 1.5
      );

      halo.addColorStop(0, "rgba(94, 89, 201, 0.28)");
      halo.addColorStop(0.55, "rgba(41, 38, 99, 0.12)");
      halo.addColorStop(1, "rgba(17, 17, 22, 0)");

      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      /* ---- sphere body ---- */
      const body = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.4,
        radius * 0.1,
        cx,
        cy,
        radius
      );

      body.addColorStop(0, "rgba(58, 56, 122, 0.95)");
      body.addColorStop(0.6, "rgba(31, 29, 79, 0.92)");
      body.addColorStop(1, "rgba(11, 11, 14, 0.96)");

      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      /* Clip everything below to the sphere. */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      /* ---- graticule ---- */
      graticule(
        ctx,
        cx,
        cy,
        radius,
        rotation,
        "rgba(168, 166, 232, 0.16)"
      );

      /* ---- land dots ---- */
      const dot = Math.max(0.9, radius * 0.0055);

      ctx.fillStyle = "#a8a6e8";

      for (let i = 0; i < LAND_DOTS.length; i += 2) {
        const p = project(
          LAND_DOTS[i],
          LAND_DOTS[i + 1],
          rotation,
          cx,
          cy,
          radius
        );

        if (p.z <= 0.03) continue;

        // Fade towards the limb so the edge of the disc
        // dissolves instead of ending in a hard ring.
        ctx.globalAlpha = 0.16 + Math.pow(p.z, 0.55) * 0.62;

        ctx.fillRect(p.x - dot / 2, p.y - dot / 2, dot, dot);
      }

      ctx.globalAlpha = 1;

      /* ---- inner shading, for volume ---- */
      const shade = ctx.createRadialGradient(
        cx - radius * 0.4,
        cy - radius * 0.45,
        radius * 0.05,
        cx,
        cy,
        radius * 1.02
      );

      shade.addColorStop(0, "rgba(255, 255, 255, 0.10)");
      shade.addColorStop(0.45, "rgba(255, 255, 255, 0)");
      shade.addColorStop(1, "rgba(4, 4, 8, 0.55)");

      ctx.fillStyle = shade;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      ctx.restore();

      /* ---- limb ---- */
      ctx.strokeStyle = "rgba(168, 166, 232, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      /* ---- nodes and great-circle arcs ---- */
      const active = nodesRef.current;
      const points = [];

      for (let i = 0; i < active.length; i += 1) {
        const [lon, lat] = active[i];
        const p = project(lon, lat, rotation, cx, cy, radius);

        if (p.z <= 0.05) continue;

        points.push(p);
      }

      /* Arcs first, so the nodes sit on top. */
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = "rgba(168, 166, 232, 0.42)";

      for (let i = 1; i < points.length; i += 1) {
        const a = points[i - 1];
        const b = points[i];

        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;

        /* Lift the control point away from the sphere centre so
           the arc bows towards the viewer. */
        const lift = 1 + Math.min(radius * 0.0016, 0.12);
        const ctlX = cx + (midX - cx) * 2 * lift;
        const ctlY = cy + (midY - cy) * 2 * lift;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(ctlX, ctlY, b.x, b.y);
        ctx.stroke();

        /* A packet travelling the arc. */
        const t = (elapsed * 0.28 + i * 0.17) % 1;
        const mt = 1 - t;
        const px =
          mt * mt * a.x + 2 * mt * t * ctlX + t * t * b.x;
        const py =
          mt * mt * a.y + 2 * mt * t * ctlY + t * t * b.y;

        ctx.fillStyle = "rgba(224, 223, 255, 0.95)";
        ctx.beginPath();
        ctx.arc(px, py, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Node markers, each with a slow expanding ping. */
      points.forEach((p, index) => {
        const ping = (elapsed * 0.7 + index * 0.31) % 1;

        ctx.strokeStyle = `rgba(168, 166, 232, ${(1 - ping) * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 + ping * 15, 0, Math.PI * 2);
        ctx.stroke();

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
        glow.addColorStop(0, "rgba(224, 223, 255, 0.85)");
        glow.addColorStop(1, "rgba(94, 89, 201, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ---- orbit ring ---- */
      const orbitSpin = elapsed * 0.22;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ORBIT_TILT);
      ctx.scale(1, 0.34);
      ctx.rotate(orbitSpin);

      ctx.setLineDash([radius * 0.09, radius * 0.2]);
      ctx.lineDashOffset = -radius * 0.16;
      ctx.strokeStyle = "rgba(168, 166, 232, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.22, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.restore();
    };

    /* ---------- wiring ---------- */

    resize();

    let frame = 0;
    let start = 0;
    let visible = true;
    let onScreen = true;

    const loop = (now) => {
      if (!start) start = now;

      // Seconds, so the maths above never deals with
      // millisecond-per-frame arithmetic.
      draw((now - start) / 1000);

      frame = requestAnimationFrame(loop);
    };

    const renderOnce = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }

      // A fixed pose, so reduced-motion users get the
      // composition without any movement at all.
      draw(0);
    };

    /* Lets the slide-change effect repaint the globe without
       restarting the animation loop. */
    paintRef.current = draw;

    const play = () => {
      if (frame || still || !visible || !onScreen) return;

      start = 0;
      frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      if (!frame) return;

      cancelAnimationFrame(frame);
      frame = 0;
    };

    const sync = () => {
      if (still || !visible || !onScreen) {
        pause();
        renderOnce();
        return;
      }

      play();
    };

    const observer = new ResizeObserver(() => {
      resize();
      sync();
    });

    if (host) observer.observe(host);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 }
    );

    if (host) intersection.observe(host);

    const handleVisibility = () => {
      visible = document.visibilityState === "visible";
      sync();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    sync();

    return () => {
      pause();
      paintRef.current = null;
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [still]);

  /* A new slide means a new set of highlighted cities. With
     motion running, the next animation frame picks them up on
     its own; with reduced motion there is no next frame, so
     repaint by hand. */
  useEffect(() => {
    paintRef.current?.(elapsedRef.current);
  }, [nodes]);

  return (
    <div className="hero-earth" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-earth__canvas" />

      {/* Decorative glow behind the globe, so the canvas edge
          never cuts hard against the section background. */}
      <span className="hero-earth__glow" />
    </div>
  );
}