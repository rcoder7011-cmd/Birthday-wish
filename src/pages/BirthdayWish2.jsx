import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/fullAnimi.css";
import { useNavigate } from "react-router-dom";

const BLOSSOM_COUNT = 190;

function heartPoint(t, scale = 1) {
  // Classic parametric heart, normalized for a compact canopy.
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: x * scale, y: -y * scale };
}

function makeBlossoms(count) {
  // Deterministic points inside a heart silhouette (no random jump on rerender).
  const points = [];
  let seed = 27;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  while (points.length < count) {
    const x = (rand() * 2 - 1) * 150;
    const y = (rand() * 2 - 1) * 135;
    const nx = x / 150;
    const ny = y / 135;
    // Implicit heart equation: inside when the expression is <= 0.
    const a = nx * nx + ny * ny - 1;
    const inside = a * a * a - nx * nx * ny * ny * ny <= 0;
    if (inside && y < 108) {
      points.push({
        x: 250 + x,
        y: 205 + y,
        size: 5 + rand() * 8,
        delay: rand() * 1.15,
        color: ["#ef7b9c", "#f6a5bb", "#d94f7b", "#ffbfd0", "#e96b91", "#f8d4de"][Math.floor(rand() * 6)],
        rotation: Math.round(rand() * 50 - 25),
        shape: rand() > 0.18 ? "heart" : "petal"
      });
    }
  }
  return points;
}

export default function BirthdayGift({ name }) {
  const navigate = useNavigate();


  // const handleSecret = () => {
  //  {for (let i=0; i<1000;i++){<p>I Love You {name} a lot</p>}} 
  // }
  const root = useRef(null);
  const timeline = useRef(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const blossoms = useMemo(() => makeBlossoms(BLOSSOM_COUNT), []);

  const playAnimation = () => {
    if (started) return;
    setStarted(true);
    setFinished(false);

    const ctx = gsap.context(() => {
      gsap.set(".intro-heart", { scale: 1, opacity: 1 });
      gsap.set(".intro-copy", { opacity: 1, y: 0 });
      gsap.set(".pink-transition", { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(".title-screen", { autoAlpha: 0, y: 18 });
      gsap.set(".tree-screen", { autoAlpha: 0 });
      gsap.set(".tree-trunk, .tree-branch", { strokeDashoffset: 1 });
      gsap.set(".blossom", { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(".birthday-script", { opacity: 0, y: 15 });
      gsap.set(".footer-note", { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setFinished(true)
      });
      timeline.current = tl;

      // 1. The heart reacts to the click.
      tl.to(".intro-heart", { scale: 1.22, duration: 0.22, ease: "back.out(2)" })
        .to(".intro-heart", { scale: 0.88, duration: 0.13 })
        .to(".intro-copy", { opacity: 0, y: -8, duration: 0.25 }, "<")
        // 2. Pink circle grows to cover the whole canvas.
        .to(".pink-transition", { opacity: 1, scale: 1, duration: 0.75, ease: "power3.in" }, "-=0.03")
        .set(".title-screen", { autoAlpha: 1 })
        .fromTo(".title-kicker", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 })
        .fromTo(".title-line", { opacity: 0, y: 32, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.16, ease: "power3.out" }, "-=0.12")
        .fromTo(".title-underline", { scaleX: 0 }, { scaleX: 1, duration: 0.45 }, "-=0.2")
        .to(".title-screen", { autoAlpha: 0, duration: 0.55, delay: 0.65 })
        .to(".pink-transition", { opacity: 0, scale: 1.15, duration: 0.55 }, "<")
        // 3. Tree illustration appears and draws itself.
        .set(".tree-screen", { autoAlpha: 1 })
        .fromTo(".tree-heading", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.45 })
        .to(".tree-trunk", { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut" }, "-=0.15")
        .to(".tree-branch", { strokeDashoffset: 0, duration: 0.72, stagger: 0.075, ease: "power1.inOut" }, "-=0.45")
        // 4. Blossoms grow into the heart canopy.
        .to(".blossom", {
          scale: 1,
          opacity: 1,
          duration: 0.36,
          stagger: { each: 0.009, from: "random" },
          ease: "back.out(1.7)"
        }, "-=0.1")
        .to(".birthday-script", { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, "-=0.7")
        .to(".footer-note", { opacity: 1, duration: 0.35 }, "-=0.15");
    }, root);
  };

  const replay = () => {
    timeline.current?.kill();
    setStarted(false);
    setFinished(false);
    // Reset immediately, then replay through the same click action.
    gsap.set(".intro-heart", { clearProps: "all" });
    gsap.set(".intro-copy", { clearProps: "all" });
    gsap.set(".pink-transition", { clearProps: "all" });
    gsap.set(".title-screen", { clearProps: "all" });
    gsap.set(".tree-screen", { clearProps: "all" });
    gsap.set(".tree-trunk, .tree-branch", { clearProps: "all" });
    gsap.set(".blossom", { clearProps: "all" });
    gsap.set(".birthday-script, .footer-note", { clearProps: "all" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".intro-heart", { y: -8, duration: 1.15, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".heart-glow", { scale: 1.16, opacity: 0.65, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.from(".intro-copy", { opacity: 0, y: 8, duration: 0.8, delay: 0.2 });
    }, root);
    return () => {
      ctx.revert();
      timeline.current?.kill();
    };
  }, []);

  const handleReplay = () => {
    // Restore initial state and let the intro heart invite another click.
    timeline.current?.kill();
    setStarted(false);
    setFinished(false);
    gsap.set(".intro-heart", { clearProps: "all", y: 0, scale: 1, opacity: 1 });
    gsap.set(".heart-glow", { clearProps: "all" });
    gsap.set(".intro-copy", { clearProps: "all", opacity: 1, y: 0 });
    gsap.set(".pink-transition", { clearProps: "all", scale: 0, opacity: 0 });
    gsap.set(".title-screen", { clearProps: "all", autoAlpha: 0 });
    gsap.set(".tree-screen", { clearProps: "all", autoAlpha: 0 });
    gsap.set(".tree-trunk, .tree-branch", { clearProps: "all", strokeDashoffset: 1 });
    gsap.set(".blossom", { clearProps: "all", scale: 0, opacity: 0 });
    gsap.set(".birthday-script, .footer-note", { clearProps: "all", opacity: 0 });
  };

  return (
    <main className="gift-app" ref={root}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="intro-screen" aria-label="Birthday gift intro">
        <div className="intro-copy">
          <span className="tiny-label">A LITTLE SOMETHING FOR YOU</span>
          <h1>Someone made<br />a wish for you.</h1>
          <p>Tap the heart to open your gift</p>
        </div>
        <button className="heart-button" onClick={playAnimation} disabled={started} aria-label="Open birthday gift">
          <span className="heart-glow" />
          <svg className="intro-heart" viewBox="0 0 100 100" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="heartFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffb6c8" />
                <stop offset="55%" stopColor="#f06a91" />
                <stop offset="100%" stopColor="#c82d61" />
              </linearGradient>
            </defs>
            <path d="M50 86 C42 77 12 57 12 34 C12 11 40 8 50 28 C61 8 88 12 88 34 C88 57 59 78 50 86Z" fill="url(#heartFill)" />
            <path d="M27 28 C30 20 39 20 43 26" fill="none" stroke="#fff1f5" strokeWidth="3" strokeLinecap="round" opacity=".8" />
          </svg>
        </button>
      </section>

      <div className="pink-transition" aria-hidden="true" />

      <section className="title-screen" aria-label="Happy Birthday title">
        <div className="title-content">
          <p className="title-kicker">TODAY IS ALL ABOUT YOU</p>
          <h2><span className="title-line">Happy</span><span className="title-line">Birthday</span></h2>
          <span className="title-underline" />
          <p className="title-small">May your day be full of little wonders</p>
        </div>
      </section>

      <section className="tree-screen" aria-label="Heart blossom tree birthday card">
        <p className="tree-heading">A wish, from the heart</p>
        <div className="tree-art">
          <svg className="tree-svg" viewBox="0 0 500 440" role="img" aria-label="Tree with heart-shaped pink blossom canopy">
            <defs>
              <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3e2929" />
                <stop offset="50%" stopColor="#674141" />
                <stop offset="100%" stopColor="#332222" />
              </linearGradient>
            </defs>
            <path className="tree-trunk draw-path" pathLength="1" d="M248 400 C245 352 252 319 247 281 C245 250 246 219 248 184 C250 153 244 131 239 111" stroke="url(#trunk)" />
            <path className="tree-branch draw-path" pathLength="1" d="M247 291 C221 270 205 250 190 221 C179 199 166 184 148 171" />
            <path className="tree-branch draw-path" pathLength="1" d="M247 258 C276 237 294 213 306 184 C315 163 333 147 352 135" />
            <path className="tree-branch draw-path" pathLength="1" d="M242 223 C218 207 205 184 201 160 C198 142 184 126 171 116" />
            <path className="tree-branch draw-path" pathLength="1" d="M249 196 C270 176 277 155 277 133 C277 114 291 97 304 88" />
            <path className="tree-branch draw-path" pathLength="1" d="M190 221 C173 221 159 210 151 195" />
            <path className="tree-branch draw-path" pathLength="1" d="M306 184 C326 187 340 179 352 162" />
            <path className="tree-branch draw-path" pathLength="1" d="M201 160 C184 160 171 150 166 136" />
            <path className="tree-branch draw-path" pathLength="1" d="M277 133 C294 131 307 120 313 106" />
            {blossoms.map((b, i) => (
              <g
                className="blossom"
                key={i}
                style={{ "--delay": `${b.delay}s` }}
                transform={`translate(${b.x} ${b.y}) rotate(${b.rotation})`}
              >
                {b.shape === "heart" ? (
                  <path d={`M0 ${b.size * .42} C${-b.size * .9} ${-b.size * .1} ${-b.size * .6} ${-b.size * .75} 0 ${-b.size * .28} C${b.size * .6} ${-b.size * .75} ${b.size * .9} ${-b.size * .1} 0 ${b.size * .42}Z`} fill={b.color} />
                ) : (
                  <ellipse cx="0" cy="0" rx={b.size * .42} ry={b.size * .75} fill={b.color} />
                )}
                <circle cx={-b.size * .1} cy={-b.size * .15} r={b.size * .12} fill="#fff0f4" opacity=".85" />
              </g>
            ))}
          </svg>
        </div>
        <div className="birthday-script">Happy Birthday My Queen! {name}</div>
        <p className="tree-subtitle">May love bloom around you, today and always.
          <br></br>Happy Birthday, my love! {name}❤️🎂<br></br>
          You make my world brighter just by being in it. 💖💗💗💗
          May all your dreams come true, and may your smile never fade. 🌸<br></br>
          You deserve all the happiness, love, and magic in the world. ✨<br></br>
          Today and always, you will have a special place in my heart. 💗
        </p>
        <p className="footer-note">RCodeX ♡</p>
        {finished && <button className="replay-button" onClick={handleReplay}>Replay your gift ↺</button>}
        <button style={{ fontSize: "0.5rem", margin: "5px", color: "black", cursor: "pointer", backgroundColor: "pink", borderRadius: "10px", padding: "4px" }} onClick={() =>
          navigate(`/BirthdayWish3?name=${encodeURIComponent(name || "")}`)
        } >i have a secret to tell u</button>

      </section>
    </main>
  );
}