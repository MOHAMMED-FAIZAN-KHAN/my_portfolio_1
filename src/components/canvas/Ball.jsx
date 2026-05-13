import React, { useRef, useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   Utility: polar coordinate helper
───────────────────────────────────────────── */
function polar(cx, cy, angleDeg, r) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, innerR, outerR, from, to) {
  const s1 = polar(cx, cy, from, outerR);
  const e1 = polar(cx, cy, to, outerR);
  const s2 = polar(cx, cy, to, innerR);
  const e2 = polar(cx, cy, from, innerR);
  const large = to - from > 180 ? 1 : 0;
  return `M${s1.x},${s1.y} A${outerR},${outerR},0,${large},1,${e1.x},${e1.y} L${s2.x},${s2.y} A${innerR},${innerR},0,${large},0,${e2.x},${e2.y} Z`;
}

/* ─────────────────────────────────────────────
   SpeedometerSVG — pure SVG, no canvas/WebGL
───────────────────────────────────────────── */
const SpeedometerSVG = ({ score, uid }) => {
  const W = 160, H = 90, cx = 80, cy = 84;
  const startA = 210, totalA = 270;
  const fillDeg = (score / 100) * totalA;
  const fillEnd = startA + fillDeg;

  const bgPath  = arcPath(cx, cy, 52, 65, startA, startA + totalA);
  const fillArc = score > 0
    ? arcPath(cx, cy, 52, 65, startA, Math.min(fillEnd, startA + totalA))
    : null;

  const ticks = Array.from({ length: 11 }, (_, i) => {
    const ang   = startA + (i / 10) * totalA;
    const inner = polar(cx, cy, ang, 48);
    const outer = polar(cx, cy, ang, i % 5 === 0 ? 38 : 43);
    const lit   = (i / 10) * 100 <= score;
    return (
      <line
        key={i}
        x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y}
        stroke={lit ? "#ff6a00" : "#252525"}
        strokeWidth={i % 5 === 0 ? 2.2 : 1.4}
        strokeLinecap="round"
      />
    );
  });

  const labels = [0, 20, 40, 60, 80, 100].map(v => {
    const ang = startA + (v / 100) * totalA;
    const p   = polar(cx, cy, ang, 30);
    return (
      <text
        key={v}
        x={p.x} y={p.y}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="6.5"
        fill={v <= score ? "#999" : "#2e2e2e"}
        fontFamily="Rajdhani, sans-serif"
        fontWeight="600"
      >{v}</text>
    );
  });

  const needleRad = ((startA + fillDeg) - 90) * Math.PI / 180;
  const nx1 = cx + 50 * Math.cos(needleRad), ny1 = cy + 50 * Math.sin(needleRad);
  const nx2 = cx -  9 * Math.cos(needleRad), ny2 = cy -  9 * Math.sin(needleRad);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id={`glow_${uid}`}>
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`ag_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ff7a00" />
          <stop offset="55%"  stopColor="#ff3300" />
          <stop offset="100%" stopColor="#bb0000" />
        </linearGradient>
      </defs>

      {/* Background arc */}
      <path d={bgPath} fill="#161616" />

      {/* Filled arc */}
      {fillArc && (
        <path d={fillArc} fill={`url(#ag_${uid})`} filter={`url(#glow_${uid})`} />
      )}

      {/* Ticks & labels */}
      {ticks}
      {labels}

      {/* Needle glow */}
      <line x1={nx2} y1={ny2} x2={nx1} y2={ny1}
        stroke="rgba(255,80,0,0.22)" strokeWidth="5.5" strokeLinecap="round" />

      {/* Needle */}
      <line x1={nx2} y1={ny2} x2={nx1} y2={ny1}
        stroke="#ff4500" strokeWidth="2.2" strokeLinecap="round" />

      {/* Center cap */}
      <circle cx={cx} cy={cy} r="5.5" fill="#0d0d0d" stroke="#ff4500" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="2.5" fill="#ff4500" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   SkillCard — single racing card with throttle
───────────────────────────────────────────── */
const SkillCard = ({ icon, name, score, level, desc, index }) => {
  const [liveScore, setLiveScore] = useState(score);
  const rafRef      = useRef(null);
  const currentRef  = useRef(score);
  const hoverRef    = useRef(false);
  const uid         = `skill_${index}`;

  const levelColor = level === "EXPERT"
    ? "#ff2200" : level === "ADVANCED"
    ? "#ff4500" : "#ff6a00";

  const animateTo = useCallback((target) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const step = () => {
      const diff = target - currentRef.current;
      if (Math.abs(diff) < 0.6) {
        currentRef.current = target;
        setLiveScore(Math.round(target));
        return;
      }
      currentRef.current += diff * 0.09;
      setLiveScore(Math.round(currentRef.current));
      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  const handleEnter = () => {
    hoverRef.current = true;
    animateTo(100);
    setTimeout(() => { if (hoverRef.current) animateTo(score); }, 650);
  };

  const handleLeave = () => {
    hoverRef.current = false;
    animateTo(score);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: "linear-gradient(160deg, #111 0%, #0d0d0d 100%)",
        border: "1px solid #1c1c1c",
        borderRadius: "16px",
        padding: "24px 16px 20px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className="racing-card"
    >
      {/* Top-left corner accent */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 38, height: 38,
        borderTop: "2px solid rgba(255,69,0,0.5)",
        borderLeft: "2px solid rgba(255,69,0,0.5)",
        borderRadius: "14px 0 0 0",
        pointerEvents: "none",
      }} />

      {/* Bottom-right corner accent */}
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        width: 28, height: 28,
        borderBottom: "2px solid rgba(255,69,0,0.25)",
        borderRight: "2px solid rgba(255,69,0,0.25)",
        borderRadius: "0 0 14px 0",
        pointerEvents: "none",
      }} />

      {/* Tech icon */}
      <div style={{
        width: 70, height: 70,
        borderRadius: "50%",
        border: "2px solid #1e1e1e",
        background: "radial-gradient(circle at 40% 35%, #1a1a1a, #0d0d0d)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
        boxShadow: "0 0 0 rgba(255,69,0,0)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}>
        <img
          src={icon}
          alt={name}
          style={{
            width: 38, height: 38,
            objectFit: "contain",
            filter: "drop-shadow(0 0 4px rgba(255,80,0,0.25))",
            transition: "transform 0.3s, filter 0.3s",
          }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
      </div>

      {/* Tech name */}
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 13, fontWeight: 700,
        color: "#fff", letterSpacing: 2,
        textAlign: "center", marginBottom: 18,
      }}>
        {name}
      </div>

      {/* Speedometer */}
      <div style={{ width: 160, height: 90, margin: "0 auto 12px" }}>
        <SpeedometerSVG score={liveScore} uid={`${uid}_${liveScore}`} />
      </div>

      {/* Score */}
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1,
        }}>
          {liveScore}
        </span>
        <span style={{ fontSize: 13, color: "#444" }}> /100</span>
      </div>

      {/* Level badge */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 7, borderTop: "1px solid #1a1a1a",
        paddingTop: 13, width: "100%",
      }}>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, color: "#ff4500" }}>&lt;/&gt;</span>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: 10,
          fontWeight: 700, letterSpacing: 2,
          color: levelColor,
          textShadow: `0 0 10px ${levelColor}60`,
        }}>
          {level}
        </span>
        <span style={{ color: "#2a2a2a", fontSize: 11, letterSpacing: 1 }}>////</span>
      </div>

      {/* Description */}
      <div style={{
        color: "#555", fontSize: 12, lineHeight: 1.5,
        textAlign: "center", marginTop: 12,
      }}>
        {desc}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   BallCanvas — main export, replaces original.
   Pass `icon` (image URL) as prop.
   Internally maps to a SkillCard.
   
   USAGE (same as before):
     <BallCanvas icon={technology.icon} />

   For the full Skills section with 4 per row,
   use <SkillsSection skills={technologies} />
───────────────────────────────────────────── */

// Default skill data — replace / extend with your technologies array
const DEFAULT_SKILLS = [
  {
    name: "REACT",
    score: 10,
    level: "beginner",
    desc: "Building dynamic UIs with hooks, context and component architecture.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "THREE.JS",
    score: 75,
    level: "ADVANCED",
    desc: "3D scenes, shaders, and WebGL-powered interactive experiences.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  {
    name: "NODE.JS",
    score: 70,
    level: "ADVANCED",
    desc: "Server-side JS, REST APIs, and real-time backend services.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "TAILWIND",
    score: 80,
    level: "EXPERT",
    desc: "Utility-first CSS for rapid, consistent, and beautiful UI design.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
];

/* Full Skills Section — drop this into your Skills page */
export const SkillsSection = ({ skills = DEFAULT_SKILLS }) => {
  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .racing-card:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(255,80,0,0.45) !important;
          box-shadow: 0 0 35px rgba(255,60,0,0.18), 0 22px 44px rgba(0,0,0,0.55) !important;
        }
        .racing-card:hover img {
          transform: scale(1.12);
          filter: drop-shadow(0 0 8px rgba(255,80,0,0.6)) !important;
        }
      `}</style>

      <section style={{
        background: "#0a0a0a",
        padding: "60px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background streaks */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 10% 50%, rgba(255,60,0,0.06) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 50%, rgba(255,60,0,0.06) 0%, transparent 55%)
          `,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#ff4500", fontSize: 11,
              letterSpacing: 5, textTransform: "uppercase", marginBottom: 10,
            }}>
              MY EXPERTISE
            </p>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(26px, 4.5vw, 50px)",
              fontWeight: 900, color: "#fff", letterSpacing: 2,
            }}>
              SKILLS <span style={{ color: "#ff4500", fontStyle: "italic" }}>OVERVIEW</span>
            </h2>
            <p style={{ color: "#666", marginTop: 12, fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: "12px auto 0" }}>
              Here's my proficiency level in technologies I work with. Every skill represents my dedication and experience.
            </p>
          </div>

          {/* 4-per-row grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}>
            {skills.map((sk, i) => (
              <SkillCard
                key={sk.name}
                index={i}
                icon={sk.icon}
                name={sk.name}
                score={sk.score}
                level={sk.level}
                desc={sk.desc}
              />
            ))}
          </div>

          {/* Footer strip */}
          <div style={{
            textAlign: "center", marginTop: 44,
            paddingTop: 24, borderTop: "1px solid #181818",
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>⚡</div>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 12, fontWeight: 700,
              letterSpacing: 3, color: "#fff",
            }}>
              CONTINUOUS LEARNING.{" "}
              <span style={{ color: "#ff4500", fontStyle: "italic" }}>LIMITLESS GROWTH.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ─── BallCanvas (backward-compatible drop-in) ───
   Still accepts `icon` prop like your original.
   Wraps into a single card with sensible defaults.
   You can delete this if you switch fully to SkillsSection.
*/
const BallCanvas = ({ icon, name = "SKILL", score = 75, level = "ADVANCED", desc = "" }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .racing-card:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(255,80,0,0.45) !important;
          box-shadow: 0 0 35px rgba(255,60,0,0.18), 0 22px 44px rgba(0,0,0,0.55) !important;
        }
      `}</style>
      <SkillCard icon={icon} name={name} score={score} level={level} desc={desc} index={0} />
    </>
  );
};

export default BallCanvas;
