import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const DARK = {
  bg:        [6,   6,  16],
  line:      [0, 195, 255],
  dot:       [0, 215, 255],
  highlight: [180, 240, 255],
};

const LIGHT = {
  bg:        [252, 253, 254],
  line:      [0,  110, 200],
  dot:       [0,  130, 220],
  highlight: [0, 74, 173],
};

const isMobile   = () => window.innerWidth < 768;
const LINK_DIST  = 170;
const MOUSE_DIST = 200;

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const palette = resolvedTheme === "light" ? LIGHT : DARK;

    let raf;
    let W = 0;
    let H = 0;
    let pts = [];
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      const total = isMobile() ? 50 : 110;
      pts = Array.from({ length: total }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r:  Math.random() * 2 + 1.5,
      }));
    };

    const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

    const tick = () => {
      const [br, bg, bb] = palette.bg;
      ctx.fillStyle = `rgb(${br},${bg},${bb})`;
      ctx.fillRect(0, 0, W, H);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)  { p.x = 0;  p.vx *= -1; }
        if (p.x > W)  { p.x = W;  p.vx *= -1; }
        if (p.y < 0)  { p.y = 0;  p.vy *= -1; }
        if (p.y > H)  { p.y = H;  p.vy *= -1; }
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const a = (1 - d / LINK_DIST) * 0.65;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = rgba(palette.line, a);
            ctx.lineWidth = (1 - d / LINK_DIST) * 1.8;
            ctx.stroke();
          }
        }

        const mdx = pts[i].x - mouse.x;
        const mdy = pts[i].y - mouse.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_DIST) {
          const a = (1 - md / MOUSE_DIST) * 0.9;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = rgba(palette.line, a);
          ctx.lineWidth = a * 1.5;
          ctx.stroke();
        }
      }

      pts.forEach((p) => {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        const near = md < MOUSE_DIST;

        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r * 1.8 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(near ? palette.highlight : palette.dot, 0.85);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, (near ? p.r * 1.8 : p.r) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = rgba(palette.highlight, 0.95);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };

    const onMouseMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = ()    => { mouse.x = -9999;    mouse.y = -9999; };
    const onTouchMove  = (e)   => {
      const t = e.touches[0];
      if (t) { mouse.x = t.clientX; mouse.y = t.clientY; }
    };
    const onTouchEnd   = ()    => { mouse.x = -9999; mouse.y = -9999; };
    const onResize     = ()    => init();

    init();
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove",  onTouchMove, { passive: true });
    window.addEventListener("touchend",   onTouchEnd);
    window.addEventListener("resize",     onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize",     onResize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        top:           0,
        left:          0,
        width:         "100%",
        height:        "100%",
        zIndex:        0,
        display:       "block",
        pointerEvents: "none",
      }}
    />
  );
}