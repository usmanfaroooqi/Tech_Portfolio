import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaBars
} from "react-icons/fa";

export default function Portfolio() {
  const roles = ["Freelancer", "Web Scraper", "Data Analyst"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showNotification, setShowNotification] = useState(false);
  const canvasRef = useRef(null);

  const projects = [
    {
      title: "Perfume Price Monitoring from E-Commerce Sites",
      tools: "Python, BeautifulSoup, Pandas, Requests",
      description:
        "Developed a system to monitor and track perfume prices from multiple e-commerce websites in near real-time.",
      link: "https://github.com/usmanfaroooqi"
    },
    {
      title: "Fetching News Regularly from Official Sources",
      tools: "Python, BeautifulSoup, Cron Jobs, Public APIs",
      description:
        "Automated fetching of verified news articles from official sources with scheduled jobs and summary generation.",
      link: "https://github.com/usmanfaroooqi"
    }
  ];

  // typing effect
  useEffect(() => {
    const full = roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < full.length) {
      timeout = setTimeout(() => setCharIndex((i) => i + 1), 100);
    } else if (!isDeleting && charIndex === full.length) {
      timeout = setTimeout(() => setIsDeleting(true), 900);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((i) => i - 1), 45);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // particle animation background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const COUNT = 80;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({ x: rand(0, w), y: rand(0, h), r: rand(1, 3), vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25) });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(94,234,212,0.4)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            const alpha = ((120 - dist) / 120) * 0.35;
            ctx.strokeStyle = 'rgba(94,234,212,' + alpha + ')';
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    let raf;
    function step() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
      draw();
      raf = requestAnimationFrame(step);
    }

    init();
    step();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleNavClick = (key) => {
    setActiveSection(key);
    setMenuOpen(false);
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowNotification(true);
        form.reset();
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Mobile menu items list
  const MENU_ITEMS = ["home", "about", "education", "skills", "projects", "contact"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100 relative overflow-x-hidden font-sans">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] bg-gradient-to-r from-teal-500 to-teal-400 text-white px-8 py-4 rounded-full shadow-2xl font-semibold text-lg"
          >
            ✓ Sent
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-teal-400/10" style={{ zIndex: 50 }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-teal-300 text-2xl font-bold tracking-wide">Portfolio.</div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {MENU_ITEMS.map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="relative text-lg font-medium text-slate-200 hover:text-teal-300 after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bg-teal-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen((s) => !s)} className="md:hidden text-2xl text-teal-300 focus:outline-none">
            <FaBars />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-slate-950 to-slate-900 text-white flex flex-col items-center justify-start pt-24 space-y-6"
          >
            {MENU_ITEMS.map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`relative text-2xl tracking-wide transition duration-200 ${
                  activeSection === id ? 'text-teal-300' : 'text-white hover:text-teal-300'
                } w-full text-center py-3`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}

                {/* Underline shown for active item */}
                <span
                  className={`block h-[3px] mt-2 mx-auto rounded-full bg-teal-400 transition-all duration-200 ${
                    activeSection === id ? 'w-20' : 'w-0'
                  }`}
                />
              </button>
            ))}

            <button onClick={() => setMenuOpen(false)} className="mt-6 text-white/60 hover:text-white text-lg">
              ✕ Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20 text-center md:text-left pt-28"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg shadow-teal-500/30 border-4 border-teal-400 flex-shrink-0"
          style={{ position: "relative", zIndex: 20 }}
        >
          <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <p className="text-xl text-slate-300">Hello, my name is</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-white">Usman Farooqi</h1>
          <p className="mt-4 text-2xl text-slate-300">
            And I'm a <span className="text-teal-300">{roles[roleIndex].substring(0, charIndex)}</span>
            <span className="inline-block ml-2 text-teal-300 animate-pulse">|</span>
          </p>

          <div className="mt-6 flex flex-col items-center md:items-start gap-4">
            <a href="#contact" onClick={() => handleNavClick("contact")} className="bg-teal-300 text-slate-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-200 transition text-lg">
              Hire Me
            </a>

            <div className="flex items-center gap-6 mt-2 text-3xl text-teal-300">
              <a href="https://www.linkedin.com/in/usman-faroooqi" target="_blank" rel="noreferrer"><FaLinkedin className="hover:text-teal-200" /></a>
              <a href="https://github.com/usmanfaroooqi" target="_blank" rel="noreferrer"><FaGithub className="hover:text-teal-200" /></a>
              <a href="mailto:osmanfaroooqi@gmail.com"><FaEnvelope className="hover:text-teal-200" /></a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 md:px-20 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          <p className="text-teal-300 mt-2">Who am I?</p>
          <p className="mt-6 text-slate-300 text-lg leading-relaxed">I am a passionate web scraper and data analyst focused on automating data collection, cleaning, and turning information into actionable insights. I build reliable scraping pipelines and dashboards using Python and modern web stacks.</p>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="py-20 px-6 md:px-20 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Education</h2>
          <p className="text-teal-300 mt-2">My Journey</p>
          <div className="mt-6 bg-slate-800 p-6 rounded-2xl shadow-lg border-l-4 border-teal-400">
            <h3 className="text-xl font-semibold text-white">HSSC in Computer Science</h3>
            <p className="text-slate-400 mt-1">Aga Khan University Examination Board</p>
            <h4 className="mt-4 text-teal-300 font-semibold">Relevant Courses</h4>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-slate-300 md:grid-cols-3">
              <li className="bg-slate-700 px-3 py-1 rounded-full">Python</li>
              <li className="bg-slate-700 px-3 py-1 rounded-full">Data Analysis</li>
              <li className="bg-slate-700 px-3 py-1 rounded-full">Data Scraping</li>
              <li className="bg-slate-700 px-3 py-1 rounded-full">R+</li>
              <li className="bg-slate-700 px-3 py-1 rounded-full">React</li>
              <li className="bg-slate-700 px-3 py-1 rounded-full">Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 px-6 md:px-20 bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
          <p className="text-teal-300 mt-2">What I Excel At</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
            {["Python", "Web Scraping", "Data Analysis", "Automation", "React", "Tailwind CSS"].map((s) => (
              <div key={s} className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-teal-500/10 shadow-md text-center">
                <div className="text-teal-300 font-semibold text-lg">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 px-6 md:px-20 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">My Projects</h2>
          <p className="text-teal-300 mt-2">Recent Work</p>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div key={p.title} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg border-l-4 border-teal-400">
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                <p className="text-slate-400 mt-2">Tools: <span className="text-teal-300">{p.tools}</span></p>
                <p className="text-slate-300 mt-3">{p.description}</p>
                <div className="mt-4">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-teal-400 text-slate-900 px-4 py-2 rounded-full font-semibold hover:bg-teal-300 transition">View on GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
  id="contact"
  className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-white"
>
  <h2 className="text-4xl font-bold mb-10 text-teal-400 text-center">
    Message Me
  </h2>

  <form
    action="https://formspree.io/f/xldopzby"
    method="POST"
    onSubmit={handleSubmit}
    className="w-full max-w-lg bg-slate-800 p-8 rounded-2xl shadow-lg space-y-6"
  >
    <div>
      <label htmlFor="name" className="block text-slate-300 mb-2">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        required
        className="w-full p-3 rounded-lg bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter your name"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-slate-300 mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="w-full p-3 rounded-lg bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter your email"
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-slate-300 mb-2">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        rows="5"
        className="w-full p-3 rounded-lg bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Write your message"
      ></textarea>
    </div>

    <button
      type="submit"
      className="w-full bg-teal-500 hover:bg-teal-400 text-white py-3 rounded-lg font-semibold transition duration-200"
    >
      Send Message
    </button>
  </form>
</section>


      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-center border-t border-teal-400/12 mt-8">
        <div className="text-sm mt-2">
          Created by <span className="text-teal-300 font-semibold">Usman Farooqi</span> | © 2025 All rights reserved.
        </div>
      </footer>
    </div>
  );
}
