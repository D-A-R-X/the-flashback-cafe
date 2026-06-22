"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "#story", label: "01 · Story" },
  { href: "#menu", label: "02 · Menu" },
  { href: "#vibe", label: "03 · The Room" },
  { href: "#visit", label: "04 · Visit" },
];

/* the real menu, in the cafe's own tanglish voice */
const CATEGORIES = [
  {
    id: "hot",
    kicker: "Course One",
    title: "The Hot Pour",
    caption: "filter coffee, monsoon morning",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&q=80",
    items: [
      { ta: "Our TEA sollu machi!", en: "House Tea" },
      { ta: "Beshaa oru COFFEE!", en: "Filter Coffee" },
      { ta: "HERBAL TEA Healthukku!", en: "Herbal Teas" },
    ],
  },
  {
    id: "mains",
    kicker: "Course Two",
    title: "The Big Bites",
    caption: "the late-night burger order",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&q=80",
    items: [
      { ta: "Semaiyaa oru SANDWICH!", en: "Pressed Sandwiches" },
      { ta: "Bayangarama oru BURGER!", en: "House Burgers" },
      { ta: "Waare waa WRAPS!", en: "Stuffed Wraps" },
      { ta: "Tharamaana TACOS!", en: "Soft-shell Tacos" },
    ],
  },
  {
    id: "bites",
    kicker: "Course Three",
    title: "The Street Side",
    caption: "shared plates, no rules",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&auto=format&q=80",
    items: [
      { ta: "Chattnam oru CHAAT!", en: "Chennai-style Chaat" },
      { ta: "Sodaa oru SOUP!", en: "Soups of the Day" },
      { ta: "Narukku Narukkunnu NACHOS!", en: "Loaded Nachos" },
      { ta: "Mochuk Mochuknu MOMOS!", en: "Steamed & Fried Momos" },
      { ta: "FRIES mela eyes!", en: "House Fries" },
    ],
  },
  {
    id: "cold",
    kicker: "Course Four",
    title: "The Cold Glass",
    caption: "for the long afternoons",
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&auto=format&q=80",
    items: [
      { ta: "Jillunnu oru JUICE!", en: "Fresh Juices" },
      { ta: "Maazaa oru MOJITO!", en: "Virgin Mojitos" },
      { ta: "Thangathukku THICKSHAKES!", en: "Thickshakes" },
      { ta: "ICE CREAM Amazing!", en: "Scoops & Sundaes" },
    ],
  },
  {
    id: "sweet",
    kicker: "Course Five",
    title: "The Sweet End",
    caption: "the dessert nobody splits",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&auto=format&q=80",
    items: [
      { ta: "COOKIES nam! Biscuit idaiyaam!", en: "Bakery Cookies" },
      { ta: "BROWNIE irukka bayamen?!", en: "Chocolate Brownies" },
      { ta: "CHOCOLATES Cutie Pie!", en: "Truffles & Bars" },
      { ta: "Sondha oru SNACKS!", en: "House Snack Plate" },
    ],
  },
  {
    id: "specials",
    kicker: "House Edition",
    title: "Flashback Specials",
    caption: "paatti veettu theeni",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900&auto=format&q=80",
    items: [
      { ta: "Paatti Veettu Theeni!", en: "Grandmother's Kitchen — a rotating plate" },
      { ta: "Taste of the Past", en: "Chef's flashback platter, only on weekends" },
    ],
  },
];

const HIGHLIGHTS = [
  { label: "Great Coffee", note: "house roast №7" },
  { label: "Great Tea", note: "twelve loose-leaf tins" },
  { label: "Great Dessert", note: "baked every morning" },
  { label: "Sport on TV", note: "weekend matches" },
];

const VIBE = [
  {
    head: "The Room",
    chips: ["Casual", "Cozy", "Romantic", "Trendy", "Good for working on laptop", "Solo dining welcome"],
  },
  {
    head: "The Crowd",
    chips: ["Groups", "University students", "Late-night regulars"],
  },
  {
    head: "How We Serve",
    chips: ["Dine-in", "Takeaway", "Delivery", "Drive-through", "Kerbside pickup", "Outdoor seating", "Table service"],
  },
  {
    head: "Good to Know",
    chips: [
      "Wheelchair-accessible entrance",
      "Free parking lot",
      "Free street parking",
      "Reservations accepted",
      "Dogs allowed",
      "Kid-friendly · High chairs",
      "Credit · Debit · NFC mobile",
    ],
  },
];

const HOURS = [
  { day: "Mon — Wed", time: "08:00 — 22:30" },
  { day: "Thu (open mic)", time: "08:00 — 23:30" },
  { day: "Fri — Sat", time: "08:00 — 23:00" },
  { day: "Sun (vinyl day)", time: "09:30 — 22:00" },
];

function FlashbackLogo() {
  return (
    <svg
      className="fb-logo"
      viewBox="0 0 340 340"
      role="img"
      aria-label="The FlashBack Café — Taste of the Past"
    >
      <defs>
        <path id="fb-curve" d="M 56 286 Q 170 326 284 286" fill="none" />
        <filter id="fb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* outer yellow squircle */}
      <rect x="4" y="4" width="332" height="332" rx="72" fill="#f3c81c" />
      {/* black inner */}
      <rect x="22" y="22" width="296" height="252" rx="48" fill="#0b0a08" />
      {/* yellow inner ring */}
      <rect
        x="34"
        y="34"
        width="272"
        height="228"
        rx="40"
        fill="none"
        stroke="#f3c81c"
        strokeWidth="3"
      />

      <g filter="url(#fb-glow)">
        <text
          x="170"
          y="74"
          textAnchor="middle"
          fontFamily="var(--font-anton)"
          fontSize="22"
          fill="#f3c81c"
          letterSpacing="3"
        >
          THE
        </text>
        <text
          x="170"
          y="132"
          textAnchor="middle"
          fontFamily="var(--font-anton)"
          fontSize="58"
          fill="#f3c81c"
          letterSpacing="-1"
        >
          FLASH
        </text>
        <text
          x="150"
          y="188"
          textAnchor="middle"
          fontFamily="var(--font-anton)"
          fontSize="58"
          fill="#f3c81c"
          letterSpacing="-1"
        >
          BACK
        </text>

        <g transform="translate(78 218)">
          <path d="M0 0 L16 -8 L16 8 Z" fill="#3aa84e" />
        </g>
        <g transform="translate(100 218)">
          <path d="M0 0 L16 -8 L16 8 Z" fill="#e23737" />
        </g>

        <text
          x="240"
          y="220"
          textAnchor="middle"
          fontFamily="var(--font-anton)"
          fontSize="26"
          fill="#f3c81c"
        >
          CAFÉ
        </text>
      </g>

      {/* curved bottom — BLACK text on the YELLOW outer ring */}
      <text
        fontFamily="var(--font-anton)"
        fontSize="22"
        fill="#0b0a08"
        letterSpacing="4"
      >
        <textPath href="#fb-curve" startOffset="50%" textAnchor="middle">
          TASTE OF THE PAST
        </textPath>
      </text>
    </svg>
  );
}

function Preloader({ visible }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const markLoaded = () => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("is-loaded");
        const stage = img.closest(".pre__logo-stage");
        const frame = img.closest(".pre__logo-frame");
        if (frame) frame.classList.add("has-img");
        if (stage) stage.classList.add("has-img");
      }
    };
    markLoaded();
    img.addEventListener("load", markLoaded);
    return () => img.removeEventListener("load", markLoaded);
  }, []);

  return (
    <div
      className={`pre ${visible ? "" : "pre--out"}`}
      aria-hidden={!visible}
    >
      <div className="pre__panel pre__panel--top" />
      <div className="pre__panel pre__panel--bot" />
      <div className="pre__scan" />
      <div className="pre__content">
        <p className="pre__top mono">
          <span className="pre__bullet" />
          REEL №7 · NOW PLAYING
        </p>
        <div className="pre__logo">
          <div className="pre__logo-stage">
            <div className="pre__logo-line" aria-hidden="true" />
            <div className="pre__logo-frame">
              <FlashbackLogo />
              <img
                ref={imgRef}
                src="/flashback-logo.png"
                alt=""
                className="pre__logo-img"
              />
              <span className="pre__logo-flash" aria-hidden="true" />
            </div>
            <div className="pre__logo-scan" aria-hidden="true" />
          </div>
        </div>
        <p className="pre__tag">Taste of the past, one cup at a time.</p>
        <p className="pre__count mono">
          <span>EST.</span>
          <em>Sept &apos;23</em>
          <span>·</span>
          <em>Ashok Nagar, Chennai</em>
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  const fillRef = useRef(null);
  const sprocketsRef = useRef(null);
  const heroPolyRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* intro animation */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoading(false);
    }, 2100);
    const unlock = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2900);
    return () => {
      clearTimeout(t);
      clearTimeout(unlock);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (fillRef.current) fillRef.current.style.width = pct + "%";
      if (sprocketsRef.current) {
        const x = (window.scrollY * 0.25) % 28;
        sprocketsRef.current.style.transform = `translateX(${-x}px)`;
      }
      if (heroPolyRef.current && window.scrollY < 900) {
        const y = window.scrollY;
        heroPolyRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) rotate(${-y * 0.02}deg)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 5) * 70 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <Preloader visible={loading} />
      <div className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div className="reel" aria-hidden="true">
        <div className="reel__fill" ref={fillRef} />
        <div className="reel__sprockets" ref={sprocketsRef}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      {/* NAV */}
      <header className="nav">
        <a className="nav__brand" href="#top">
          <img
            className="nav__mark"
            src="/flashback-logo.png"
            alt="The FlashBack Café"
          />
          <span className="nav__name">
            <em>the</em> FlashBack
            <small>Café · Taste of the Past</small>
          </span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {NAV_ITEMS.map((it) => (
            <a key={it.href} href={it.href}>
              {it.label}
            </a>
          ))}
        </nav>
        <a className="nav__cta" href="#visit">
          <span>Reserve a Table</span>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <button className="nav__toggle" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span />
        </button>
      </header>

      {/* MOBILE SHEET */}
      <div className={`nav__sheet ${menuOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <button className="nav__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        {NAV_ITEMS.map((it) => (
          <a key={it.href} href={it.href}>
            <em>{it.label.split(" · ")[0]}</em>
            {it.label.split(" · ")[1]}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero__meta hero__meta--tl">
          <span className="tape">REEL — 042</span>
          <p>Ashok Nagar, Chennai</p>
        </div>
        <div className="hero__meta hero__meta--tr">
          <p>EST. <strong>18·09·2023</strong> · ROAST №7</p>
        </div>

        <h1 className="hero__logo">
          <span className="hero__logo-float">
            <img
              src="/flashback-logo.png"
              alt="The FlashBack Café — Taste of the Past"
              className="hero__logo-img"
            />
          </span>
          <span className="hero__logo-sub">Café &mdash; Taste of the Past</span>
        </h1>

        <div className="hero__polaroid" ref={heroPolyRef}>
          <div className="polaroid polaroid--hero">
            <div className="polaroid__photo">
              <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <radialGradient id="g1" cx="50%" cy="40%" r="70%">
                    <stop offset="0%" stopColor="#f3c98a" />
                    <stop offset="60%" stopColor="#b8682d" />
                    <stop offset="100%" stopColor="#3b1a0c" />
                  </radialGradient>
                </defs>
                <rect width="200" height="160" fill="url(#g1)" />
                <g fill="#1a0e08" opacity="0.85">
                  <path d="M70 78h60a4 4 0 0 1 4 4v18a22 22 0 0 1-22 22H88a22 22 0 0 1-22-22V82a4 4 0 0 1 4-4z" />
                  <path d="M134 86h8a10 10 0 0 1 10 10v6a10 10 0 0 1-10 10h-8" fill="none" stroke="#1a0e08" strokeWidth="4" />
                  <path d="M86 64c-2-6 4-8 4-14M100 60c-2-6 4-8 4-14M114 64c-2-6 4-8 4-14" fill="none" stroke="#1a0e08" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <p className="polaroid__caption">
              beshaa oru coffee, monsoon morning <span>&apos;97</span>
            </p>
          </div>
        </div>

        <div className="hero__bottom">
          <p className="hero__lead">
            A small room in Ashok Nagar where the records skip on purpose, the
            chai is loud, the burgers arrive late, and someone is always
            telling a story about something that happened{" "}
            <em>before the wifi was invented</em>.
          </p>
          <a className="scroll-hint" href="#story">
            <span>scroll</span>
            <svg viewBox="0 0 20 40" width="14" height="28" aria-hidden="true">
              <rect x="3" y="3" width="14" height="34" rx="7" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <circle cx="10" cy="12" r="2" fill="currentColor" />
            </svg>
          </a>
        </div>
      </section>

      {/* MARQUEE — now in the cafe's own voice */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 2 }).flatMap((_, k) => [
            <span key={`a-${k}`}>Beshaa oru COFFEE</span>,
            <span key={`b-${k}`}>·</span>,
            <span key={`c-${k}`}>Bayangarama oru BURGER</span>,
            <span key={`d-${k}`}>·</span>,
            <span key={`e-${k}`}>FRIES mela eyes</span>,
            <span key={`f-${k}`}>·</span>,
            <span key={`g-${k}`}>Thangathukku THICKSHAKES</span>,
            <span key={`h-${k}`}>·</span>,
            <span key={`i-${k}`}>Paatti Veettu Theeni</span>,
            <span key={`j-${k}`}>·</span>,
          ])}
        </div>
      </div>

      {/* STORY */}
      <section className="story" id="story">
        <p className="kicker" data-reveal>Chapter 01 — the back room</p>
        <div className="story__grid">
          <div className="story__copy" data-reveal>
            <h2>
              We opened on a Monday
              <br />
              with a borrowed espresso machine
              <br />
              <em>and a cassette player that ate one tape.</em>
            </h2>
            <p>
              The Flashback Café began as a love letter to the rooms our
              parents argued politics in — the filter-coffee stalls, the
              biscuit jars, the loud Sundays. We kept the wooden chairs and the
              terrazzo floor, and added a kitchen that takes burgers, momos,
              and brownies a little too seriously.
            </p>
            <p>
              Today the room still hums. The records still skip. Someone is
              always reading a book they have already read.
            </p>

            <ul className="story__stats">
              <li><strong>17,402</strong><span>cups poured / year</span></li>
              <li><strong>308</strong><span>records in the crate</span></li>
              <li><strong>Sept &apos;23</strong><span>and counting</span></li>
            </ul>
          </div>

          <aside className="story__aside">
            <div className="polaroid polaroid--rot" data-reveal>
              <div className="polaroid__photo">
                <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#dfb681" />
                      <stop offset="100%" stopColor="#5a3b22" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="160" fill="url(#g2)" />
                  <g transform="translate(100 80)">
                    <circle r="55" fill="#1a0e08" />
                    <circle r="45" fill="none" stroke="#3b2516" strokeWidth="0.6" />
                    <circle r="36" fill="none" stroke="#3b2516" strokeWidth="0.6" />
                    <circle r="27" fill="none" stroke="#3b2516" strokeWidth="0.6" />
                    <circle r="14" fill="#c1733b" />
                    <circle r="2" fill="#1a0e08" />
                  </g>
                </svg>
              </div>
              <p className="polaroid__caption">side B, side B again</p>
            </div>

            <div className="polaroid polaroid--rot polaroid--sm" data-reveal>
              <div className="polaroid__photo">
                <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <defs>
                    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f0d8a2" />
                      <stop offset="100%" stopColor="#7a4a1f" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="160" fill="url(#g3)" />
                  <rect x="40" y="30" width="120" height="80" fill="none" stroke="#1a0e08" strokeWidth="3" />
                  <line x1="100" y1="30" x2="100" y2="110" stroke="#1a0e08" strokeWidth="3" />
                  <line x1="40" y1="70" x2="160" y2="70" stroke="#1a0e08" strokeWidth="3" />
                  <path d="M70 130h60v6h-60z M82 110v20 M118 110v20" stroke="#1a0e08" strokeWidth="2.5" fill="#1a0e08" />
                </svg>
              </div>
              <p className="polaroid__caption">corner seat, 4 PM</p>
            </div>
          </aside>
        </div>
      </section>

      {/* HIGHLIGHTS — vintage rubber stamps */}
      <section className="stamps" id="stamps">
        <p className="kicker" data-reveal>Intermission — house notes</p>
        <h2 data-reveal>
          What we have <em>quietly</em> become known for.
        </h2>
        <ul className="stamps__row">
          {HIGHLIGHTS.map((h, i) => (
            <li key={h.label} className="stamp" data-reveal style={{ "--i": i }}>
              <div className="stamp__inner">
                <span className="stamp__rule"></span>
                <span className="stamp__label">{h.label}</span>
                <span className="stamp__rule"></span>
                <span className="stamp__note">{h.note}</span>
                <span className="stamp__star">★</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* MENU — categorised, with real food photos and the cafe's tanglish voice */}
      <section className="menu menu--new" id="menu">
        <header className="menu__head">
          <p className="kicker" data-reveal>Chapter 02 — from the vault</p>
          <h2 data-reveal>
            The menu, <em>course by course</em>.
          </h2>
          <p className="menu__note" data-reveal>
            Roasted in-house every Monday. Plated by someone who used to be a
            poet. Read aloud, ideally.
          </p>
        </header>

        <div className="cats">
          {CATEGORIES.map((c, idx) => (
            <article className={`cat ${idx % 2 ? "cat--flip" : ""}`} key={c.id} data-reveal>
              <div className="cat__photo polaroid">
                <div className="polaroid__photo cat__img">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="polaroid__caption">{c.caption}</p>
              </div>

              <div className="cat__body">
                <p className="cat__kicker">{c.kicker}</p>
                <h3 className="cat__title">{c.title}</h3>
                <ul className="cat__items">
                  {c.items.map((it) => (
                    <li className="cat__item" key={it.ta}>
                      <h4>{it.ta}</h4>
                      <p className="cat__en">{it.en}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY — keep the SVG polaroid wall, charming */}
      <section className="gallery" id="gallery">
        <p className="kicker" data-reveal>Chapter 03 — the wall</p>
        <h2 data-reveal>
          Polaroids people forgot <em>on purpose</em>.
        </h2>

        <div className="gallery__stack">
          <article className="polaroid polaroid--lg" data-reveal>
            <div className="polaroid__photo">
              <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f1ce8a" />
                    <stop offset="100%" stopColor="#7a2b1a" />
                  </linearGradient>
                </defs>
                <rect width="200" height="160" fill="url(#g4)" />
                <g fill="#1a0e08">
                  <ellipse cx="60" cy="80" rx="22" ry="8" />
                  <rect x="58" y="60" width="4" height="20" />
                  <circle cx="60" cy="60" r="10" fill="#f6e4b8" stroke="#1a0e08" strokeWidth="2" />
                  <ellipse cx="135" cy="100" rx="28" ry="10" />
                  <rect x="130" y="78" width="10" height="22" />
                  <ellipse cx="135" cy="78" rx="14" ry="5" fill="#f6e4b8" stroke="#1a0e08" strokeWidth="2" />
                </g>
              </svg>
            </div>
            <p className="polaroid__caption">two cups, no answers</p>
          </article>

          <article className="polaroid" data-reveal>
            <div className="polaroid__photo">
              <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id="g5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#cdb47d" />
                    <stop offset="100%" stopColor="#2f3a26" />
                  </linearGradient>
                </defs>
                <rect width="200" height="160" fill="url(#g5)" />
                <g fill="#1a0e08">
                  <path d="M100 130c0-20-10-30-10-50s5-30 10-40c5 10 10 20 10 40s-10 30-10 50z" />
                  <path d="M80 130c-2-12-12-18-18-30s-8-22-4-30c8 4 16 10 20 22s5 24 2 38z" />
                  <path d="M120 130c2-12 12-18 18-30s8-22 4-30c-8 4-16 10-20 22s-5 24-2 38z" />
                </g>
              </svg>
            </div>
            <p className="polaroid__caption">the back garden</p>
          </article>

          <article className="polaroid polaroid--md" data-reveal>
            <div className="polaroid__photo">
              <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <radialGradient id="g6" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#f3d488" />
                    <stop offset="100%" stopColor="#5a3210" />
                  </radialGradient>
                </defs>
                <rect width="200" height="160" fill="url(#g6)" />
                <g fill="#1a0e08">
                  <rect x="50" y="60" width="100" height="50" rx="4" />
                  <rect x="60" y="50" width="80" height="14" />
                  <rect x="55" y="110" width="90" height="8" />
                  <g fill="#f6e4b8">
                    <circle cx="68" cy="80" r="2.5" />
                    <circle cx="78" cy="80" r="2.5" />
                    <circle cx="88" cy="80" r="2.5" />
                    <circle cx="98" cy="80" r="2.5" />
                    <circle cx="108" cy="80" r="2.5" />
                    <circle cx="118" cy="80" r="2.5" />
                    <circle cx="128" cy="80" r="2.5" />
                    <circle cx="73" cy="92" r="2.5" />
                    <circle cx="83" cy="92" r="2.5" />
                    <circle cx="93" cy="92" r="2.5" />
                    <circle cx="103" cy="92" r="2.5" />
                    <circle cx="113" cy="92" r="2.5" />
                    <circle cx="123" cy="92" r="2.5" />
                  </g>
                </g>
              </svg>
            </div>
            <p className="polaroid__caption">draft № 4, again</p>
          </article>

          <article className="polaroid" data-reveal>
            <div className="polaroid__photo">
              <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id="g7" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e8b56b" />
                    <stop offset="100%" stopColor="#7a1b1b" />
                  </linearGradient>
                </defs>
                <rect width="200" height="160" fill="url(#g7)" />
                <g fill="#1a0e08">
                  <circle cx="40" cy="80" r="14" />
                  <rect x="26" y="92" width="28" height="40" rx="6" />
                  <circle cx="80" cy="76" r="14" />
                  <rect x="66" y="88" width="28" height="44" rx="6" />
                  <circle cx="120" cy="80" r="14" />
                  <rect x="106" y="92" width="28" height="40" rx="6" />
                  <circle cx="160" cy="76" r="14" />
                  <rect x="146" y="88" width="28" height="44" rx="6" />
                </g>
              </svg>
            </div>
            <p className="polaroid__caption">open mic, full house</p>
          </article>

          <article className="polaroid polaroid--md" data-reveal>
            <div className="polaroid__photo">
              <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id="g8" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b88a52" />
                    <stop offset="100%" stopColor="#1f1014" />
                  </linearGradient>
                </defs>
                <rect width="200" height="160" fill="url(#g8)" />
                <g stroke="#1a0e08" fill="#1a0e08">
                  <line x1="100" y1="0" x2="100" y2="40" strokeWidth="2" />
                  <path d="M70 40h60l-10 30H80z" />
                  <ellipse cx="100" cy="80" rx="38" ry="10" fill="#f3c98a" opacity="0.6" />
                </g>
              </svg>
            </div>
            <p className="polaroid__caption">the bulb that flickers</p>
          </article>
        </div>
      </section>

      {/* VIBE — atmosphere, services, amenities */}
      <section className="vibe" id="vibe">
        <p className="kicker" data-reveal>Chapter 04 — the room, the people</p>
        <h2 data-reveal>
          The room, the people, <em>the rest of it</em>.
        </h2>

        <div className="vibe__grid">
          {VIBE.map((g) => (
            <div className="vibe__group" data-reveal key={g.head}>
              <h3>{g.head}</h3>
              <ul>
                {g.chips.map((c) => (
                  <li className="chip" key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* VISIT */}
      <section className="visit" id="visit">
        <p className="kicker" data-reveal>Chapter 05 — come over</p>

        <div className="visit__grid">
          <div className="visit__address" data-reveal>
            <h2>
              Find us tucked into Ashok Nagar,<br />
              <em>behind a bright yellow door.</em>
            </h2>
            <p className="visit__one">
              <span>★</span> the only Flashback in town &mdash; no branches, no copies <span>★</span>
            </p>

            <div className="card">
              <div className="card__corner card__corner--tl" aria-hidden="true" />
              <div className="card__corner card__corner--tr" aria-hidden="true" />
              <div className="card__corner card__corner--bl" aria-hidden="true" />
              <div className="card__corner card__corner--br" aria-hidden="true" />
              <p className="card__heading">The FlashBack Café</p>
              <p className="card__rule" aria-hidden="true">·   ·   ·</p>
              <address>
                New No 13, Old No 53, 1st Street<br />
                Jawaharlal Nehru Salai<br />
                <span className="visit__sub">near RBL Bank · Sarvamangala Colony</span><br />
                Ashok Nagar, Chennai &mdash; 600083
              </address>
            </div>

            <a className="btn" href="https://maps.app.goo.gl/rey41Te4S22HGDkA6" target="_blank" rel="noopener noreferrer">
              <span>Open in Google Maps</span>
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="visit__hours" data-reveal>
            <p className="kicker">Open hours, mostly</p>
            <ul>
              {HOURS.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <i />
                  <em>{h.time}</em>
                </li>
              ))}
            </ul>
            <p className="visit__small">
              Kitchen closes 30 minutes before the room does.<br />
              Walk-ins always welcome. We will find a chair.
            </p>
          </div>

          <div className="visit__compass" aria-hidden="true">
            <svg viewBox="0 0 220 220">
              <defs>
                <radialGradient id="compass" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#efe1c0" />
                  <stop offset="100%" stopColor="#d8c193" />
                </radialGradient>
              </defs>
              <circle cx="110" cy="110" r="100" fill="url(#compass)" stroke="#1a0e08" strokeWidth="1.2" />
              <circle cx="110" cy="110" r="86" fill="none" stroke="#1a0e08" strokeWidth="0.6" strokeDasharray="2 4" />

              <text x="110" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#1a0e08">N</text>
              <text x="110" y="206" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#1a0e08">S</text>
              <text x="14" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#1a0e08">W</text>
              <text x="206" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#1a0e08">E</text>

              {/* Rotating compass rose — keep translate on outer <g>, rotate the inner one */}
              <g transform="translate(110 110)">
                <g className="compass__rose">
                  {/* N — long red arrow */}
                  <path d="M0 -82 L11 -10 L0 0 L-11 -10 Z" fill="#8b2920" />
                  {/* S — shorter ink counterweight */}
                  <path d="M0 0 L11 10 L0 82 L-11 10 Z" fill="#1a0e08" />
                  {/* E — mustard wing */}
                  <path d="M82 0 L11 10 L0 0 L11 -10 Z" fill="#d4a437" />
                  {/* W — ink wing */}
                  <path d="M0 0 L-11 -10 L-82 0 L-11 10 Z" fill="#1a0e08" />
                  {/* pivot */}
                  <circle r="7" fill="#fbf4df" stroke="#1a0e08" strokeWidth="1.2" />
                  <circle r="2.5" fill="#8b2920" />
                </g>
              </g>

              {/* keep label in front of the rotating rose, but offset below center */}
              <text x="110" y="186" textAnchor="middle" fontFamily="var(--font-fraunces)" fontStyle="italic" fontSize="10" fill="#1a0e08" opacity="0.55">flashback</text>
            </svg>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="foot__marquee" aria-hidden="true">
          <div className="foot__track">
            {Array.from({ length: 6 }).flatMap((_, k) => [
              <span key={`s-${k}`}>See you on Sunday</span>,
              <i key={`i-${k}`}>✦</i>,
            ])}
          </div>
        </div>
        <div className="foot__row">
          <div>
            <p className="mono">© Flashback Café · MMXXVI</p>
            <p>brewed with chicory &amp; a little nostalgia</p>
          </div>
          <div className="foot__social">
            <a
              href="https://www.instagram.com/the_flashback_cafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://maps.app.goo.gl/rey41Te4S22HGDkA6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Maps"
            >
              On the Map
            </a>
            <a href="#menu" aria-label="Menu">The Menu</a>
          </div>
          <div className="foot__small mono">
            <p>made for the slow ones</p>
            <p>v.2 · roast №7</p>
          </div>
        </div>
      </footer>
    </>
  );
}
