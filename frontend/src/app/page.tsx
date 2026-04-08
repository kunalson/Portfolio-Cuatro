"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

type Message = {
  type: "user" | "ai";
  text: string;
};

// Fade-in hook using IntersectionObserver (uses global "fade-section" + "visible" classes)
function useFadeIn() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const projects = [
  {
    title: "City Fiber Bot",
    desc: "AI chatbot for handling customer queries and service flows for a UK fiber broadband provider. Reduced support tickets by 40%.",
    tags: ["LivePerson", "NLP", "Node.js"],
  },
  {
    title: "FAQ Bots",
    desc: "Automated FAQ systems for multiple enterprise clients using Dialogflow CX, supporting 10+ languages.",
    tags: ["Dialogflow", "Python", "API" , "LivePerson"],
  },
  {
    title: "WhatsApp Chatbot Suite",
    desc: "End-to-end WhatsApp automation for e-commerce brands — order tracking, returns, and live handoff.",
    tags: ["WhatsApp API", "Node.js", "Webhook" , "LivePerson"],
  },
  {
    title: "RAG Portfolio Assistant",
    desc: "This very assistant — a retrieval-augmented AI trained on portfolio data, streaming responses via FastAPI.",
    tags: ["LangChain", "FastAPI", "FAISS"],
  },
  {
    title: "Watson HR Bot",
    desc: "IBM Watson-powered internal HR bot handling leave requests, policy queries, and onboarding flows.",
    tags: ["Watson", "IBM Cloud", "REST"],
  },
  {
    title: "Digital Services Landing Platform",
    desc: "A responsive landing page showcasing mobile & web apps, high-performance websites, and cloud services with a focus on UI/UX and scalability.",
    tags: ["Responsive Design", "UI/UX", "Frontend", "Cloud", "Web Development"],
    link: "https://kunalsonz.github.io/A-Company-Landing-Page/",
  },
  {
    title: "Pet Care Landing Page",
    desc: "A visually appealing landing page with gradient UI, navigation, and a functional contact form designed for user engagement and lead capture.",
    tags: ["HTML", "CSS", "Forms", "UI Design", "Frontend"],
    link: "https://kunalsonz.github.io/GlassMorphism-UI-website/",
  },
  {
    title: "Travel Landing Page - Wanderlust",
    desc: "A visually immersive travel landing page with a hero section, navigation, and inspirational content designed for high user engagement.",
    tags: ["Landing Page", "UI/UX", "Frontend", "Design"],
    link: "https://kunalsonz.github.io/Parallax-example-website-2/",
  },
  {
    title: "Coffee Shop Website - My Coffe Cup",
    desc: "A responsive coffee shop website featuring menu showcase, testimonials, gallery, and contact sections with a focus on user experience and visual storytelling.",
    tags: ["Landing Page", "Responsive Design", "UI/UX", "Frontend", "Web Development"],
    link: "https://kunalsonz.github.io/Parallax-Example-Website/",
  },
  {
    title: "Corporate Business Website",
    desc: "A responsive corporate website presenting business services, structured navigation, and professional UI, designed for clarity, scalability, and user engagement.",
    tags: ["Frontend", "Responsive Design", "UI/UX", "Web Development", "Landing Page"],
    link: "https://kunalsonz.github.io/Company-Website/",
  },
];

const skills = [
  { category: "AI & NLP", items: ["LangChain", "Dialogflow CX", "IBM Watson", "Rasa", "OpenAI API", "LivePerson", "Sierra.ai"] },
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "Node.js","Next.js", "HTML", "CSS", "React.js"] },
  { category: "Platforms", items: ["Google Cloud", "WhatsApp Business API", "Twilio", "AWS" , "Github" , "Figma" , "Visio"] },
  { category: "Tools", items: ["FastAPI", "FAISS", "Docker", "Git", "PostgreSQL", "Render"] },
];

const experiences = [
  {
    role: "Assistant Manager - Cognitive Developer",
    company: "EXL Service",
    period: "2025 – Present",
    points: [
      "Developed a proof of concept for an insurance domain voice and chat bot using Google Agent Development Kit and Dialogflow CX, designing conversational flows for seamless user interaction.",
      "Integrated gemini-2.0-flash to enable dynamic understanding, summarization, and context-aware responses, enhancing conversational intelligence and user experience.",
      "Implemented API integration to retrieve policy, claims, and customer details from backend systems, and utilized Cloud Functions/Webhooks for executing backend logic efficiently.",
      "Created a middleware system between Amelia.ai and Blujay for automation testing using AI agents, enabling seamless integration and intelligent test orchestration."
    ],
  },
  {
    role: "Software Engineer",
    company: "Tech Mahindra",
    period: "2023 – 2025",
    points: [
      "Engineered a Function-as-a-Service (FaaS) solution integrating APIs to automate data retrieval, improving operational efficiency and accessibility",
      "Developed an Auth0-based OTP verification function, achieving 99.9% accuracy and boosting data retrieval speed by 40%.",
      "Built an agent availability function via API, ensuring seamless customer transfers.",
      "Integrated SDE data to enhance chat accuracy by 40% and user task completion by 25%.",
      "Delivered 60+ intent-based chatbots on LivePerson across Web, WhatsApp, SMS, Apple Business Chat, and Mobile App, increasing engagement by 45% and support efficiency by 30%.",
      "Implemented scalable chatbot solutions using JavaScript, Node.js, and MongoDB, reducing response times by 40% and earning performance recognition.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Tech Mahindra",
    period: "2022 – 2023",
    points: [
      "Enhanced NLU on LivePerson by integrating APIs with GCAA’s chatbots, improving response accuracy by 30% and reducing resolution time by 20%.",
      "Leveraged advanced NLP tools to optimize intent recognition and context handling",
      "Implemented integrations using JavaScript, Node.js, MongoDB, and Express.js, boosting chatbot performance by 50% and reducing response times by 60%",
      "Deployed ChatGPT models for personalized conversations, increasing engagement by 50% and relevance by 40%",
      "Optimized algorithms to deliver accurate, context-aware responses, improving customer satisfaction by 35%"
    ],
  },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);



  // Hero uses a plain ref — triggered on mount
  const heroRef = useRef<HTMLElement | null>(null);

  // All other sections use the fade-in hook (IntersectionObserver)
  const aboutRef = useFadeIn();
  const projectsRef = useFadeIn();
  const skillsRef = useFadeIn();
  const expRef = useFadeIn();
  const chatRef = useFadeIn();
  const contactRef = useFadeIn();

  // Scroll terminal to bottom on new message
  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 100;

    if (isNearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  // Hero fade-in on mount
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("visible"));
  }, []);

  // Stagger observer for about stats box
  function attachStaggerObserver(el: HTMLDivElement | null) {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  }

  const typeText = async (text: string, updateFn: (t: string) => void) => {
    let current = "";
    for (let i = 0; i < text.length; i++) {
      current += text[i];
      updateFn(current);
      await new Promise((res) => setTimeout(res, 10));
    }
  };

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const userMessage = input.trim();
    if (!userMessage) return;

    const normalized = userMessage.toLowerCase();

    if (normalized === "clear") {
      setHistory([]);
      setInput("");
      inputRef.current?.focus();
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: "user", text: userMessage },
      { type: "ai", text: "Thinking..." },
    ]);

    setInput("");
    inputRef.current?.focus();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      const fullText = data.response || "⚠️ Empty response";

      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { type: "ai", text: "" };
        return newHistory;
      });

      let tempText = "";
      await typeText(fullText, (t) => {
        tempText = t;
        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { type: "ai", text: tempText };
          return newHistory;
        });
      });
    } catch {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = {
          type: "ai",
          text: "⚠️ Backend not reachable. Please try again later.",
        };
        return newHistory;
      });
    }
  };

  return (
    <>
      {/* NAV */}
      <nav className={styles.nav}>
        <a href="#home" className={styles.navLogo}>KS</a>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#chat">Chat</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Hamburger button */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer — outside <nav>, inside the fragment */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#chat" onClick={closeMenu}>Chat</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </div>

      {/* HERO
          "fade-section" is a global class — JS adds "visible" to trigger the animation.
          styles.hero holds all the visual styles for the section itself. */}
      <section id="home" ref={heroRef} className="fade-section">
        <div className={styles.hero}>
          <p className={styles.heroEyebrow}>Available for projects</p>
          <h1 className={styles.heroH1}>
            Kunal<br />Sonawane
          </h1>
          <p className={styles.heroSub}>
            I craft intelligent conversational systems — chatbots, voice assistants, and AI pipelines that deliver real impact. Alongside this, I engineer full-stack web applications and scalable middleware, bridging AI with beautifully designed, high-performance digital experiences.
          </p>
          <a href="#chat" className={styles.heroCta}>Ask my AI assistant</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div
          ref={aboutRef as React.RefObject<HTMLDivElement>}
          className={`${styles.section} fade-section`}
        >
          <p className={styles.sectionLabel}>About</p>
          <div className={styles.divider} />
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p>
                {"I am a Conversational AI Developer, Generative AI Engineer, and Full-Stack Developer specializing in building intelligent, production-ready systems across platforms like LivePerson, Dialogflow, and OpenAI APIs."}
              </p>
              <br />
              <p>
                My work spans <strong>NLP pipelines</strong>,{" "}
                <strong>LLM integrations</strong>, and end-to-end bot deployments on
                platforms like LivePerson, Dialogflow, and WhatsApp Business API. I
                focus on systems that are fast, reliable, and genuinely useful to the
                people using them.
              </p>
            </div>
            {/* "stagger" is a global class — JS adds "visible" to stagger children */}
            <div
              className={`${styles.aboutStats} stagger`}
              ref={attachStaggerObserver}
            >
              <div className={styles.statBox}>
                <div className={styles.statNumber}>4+</div>
                <div className={styles.statLabel}>Years experience</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>18+</div>
                <div className={styles.statLabel}>Projects delivered</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>50k</div>
                <div className={styles.statLabel}>Monthly conversations</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>8</div>
                <div className={styles.statLabel}>Continents served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={styles.projectsBg}>
        <div
          ref={projectsRef as React.RefObject<HTMLDivElement>}
          className={`${styles.section} fade-section`}
        >
          <p className={styles.sectionLabel}>Work</p>
          <div className={styles.divider} />
          <h2 className={styles.sectionH2}>Selected projects</h2>
          <div className={styles.projectsGrid}>
            {projects.map((p, i) => (
              <div className={styles.projectCard} key={i}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className={styles.tagRow}>
                  {p.tags.map((t) => (
                    <span className={styles.tag} key={t}>{t}</span>
                  ))}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.projectLink}
                  >
                    View project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div
          ref={skillsRef as React.RefObject<HTMLDivElement>}
          className={`${styles.section} fade-section`}
        >
          <p className={styles.sectionLabel}>Expertise</p>
          <div className={styles.divider} />
          <h2 className={styles.sectionH2}>Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map((s) => (
              <div className={styles.skillGroup} key={s.category}>
                <h3>{s.category}</h3>
                <ul className={styles.skillList}>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={styles.expBg}>
        <div
          ref={expRef as React.RefObject<HTMLDivElement>}
          className={`${styles.section} fade-section`}
        >
          <p className={styles.sectionLabel}>History</p>
          <div className={styles.divider} />
          <h2 className={styles.sectionH2}>Experience</h2>
          <div className={styles.expList}>
            {experiences.map((exp, i) => (
              <div className={styles.expItem} key={i}>
                <div className={styles.expMeta}>
                  <div className={styles.expPeriod}>{exp.period}</div>
                  <div className={styles.expCompany}>{exp.company}</div>
                </div>
                <div className={styles.expBody}>
                  <h3>{exp.role}</h3>
                  <ul className={styles.expPoints}>
                    {exp.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAT */}
      <section id="chat">
        <div
          ref={chatRef as React.RefObject<HTMLDivElement>}
          className={`${styles.section} fade-section`}
        >
          <p className={styles.sectionLabel}>Interactive</p>
          <div className={styles.divider} />
          <h2 className={styles.sectionH2}>Ask my AI assistant</h2>
          <div className={styles.terminalWrap}>
            <div className={styles.terminalBar}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
              <span className={styles.terminalTitle}>kunal-portfolio — zsh</span>
            </div>
            <div ref={terminalRef} className={styles.terminalBody}>
              <div className={styles.tWelcome}>
                {"Welcome. Ask me anything about Kunal's work, skills, or experience."}
                <br />
                Type <span className={styles.tUser}>clear</span> to reset.
              </div>
              {history.map((item, index) => (
                <div key={index} style={{ marginBottom: "6px" }}>
                  {item.type === "user" ? (
                    <span className={styles.tUser}>
                      <span className={styles.tPrompt}>❯ </span>
                      {item.text}
                    </span>
                  ) : (
                    <span className={styles.tAi}>{item.text}</span>
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className={styles.terminalInputRow}>
              <span>❯</span>
              <input
                ref={inputRef}
                autoFocus
                aria-label="Chat input"
                className={styles.terminalInput}
                placeholder="Ask something…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.projectsBg}>
        <div
          ref={contactRef as React.RefObject<HTMLDivElement>}
          className={`${styles.section} fade-section`}
        >
          <p className={styles.sectionLabel}>Contact</p>
          <div className={styles.divider} />
          <div className={styles.contactInner}>
            <div>
              <h2 className={styles.sectionH2}>{"Let's build something together"}</h2>
              <p className={styles.contactText}>
                {"Open to freelance projects, contract work, and full-time roles. If you're building something with AI and need a specialist, let's talk."}
              </p>
            </div>
            <div className={styles.contactLinks}>
              <a href="mailto:kukusonz98@gmail.com" className={styles.contactLink}>
                <div>
                  <span className={styles.contactLinkLabel}>Email</span>
                  kukusonz98@gmail.com
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/kunal-sonawane-41546b1b2/"
                target="_blank"
                rel="noreferrer"
                className={styles.contactLink}
              >
                <div>
                  <span className={styles.contactLinkLabel}>LinkedIn</span>
                  linkedin.com/in/kunalsonawane
                </div>
              </a>
              <a
                href="https://github.com/KunalSonz"
                target="_blank"
                rel="noreferrer"
                className={styles.contactLink}
              >
                <div>
                  <span className={styles.contactLinkLabel}>GitHub</span>
                  github.com/KunalSonz
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span>© 2025 Kunal Sonawane</span>
        <span>Built with Next.js · Powered by FastAPI And GROQ</span>
      </footer>
    </>
  );
}