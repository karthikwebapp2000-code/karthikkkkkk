import {
  ArrowUpRight,
  Award,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const skills = [
  "SolidWorks (CSWA)",
  "ANSYS",
  "AutoCAD",
  "Creo",
  "HFSS",
  "FEA & CFD",
  "Additive manufacturing",
  "Python (Basic)",
];

const experience = [
  {
    role: "Production Officer Trainee",
    company: "Britannia Industries",
    period: "Jul 2026 — Aug 2026",
    points: [
      "Supported production-line operations while maintaining quality standards and production targets in a fast-paced FMCG environment.",
      "Monitored process parameters and coordinated with floor supervisors to sustain continuous, efficient production flow.",
    ],
  },
  {
    role: "Machine Operator Intern",
    company: "ATC Tires · Tirunelveli",
    period: "Dec 2024 — Jan 2025",
    points: [
      "Operated industrial curing machines and monitored temperature and pressure parameters in a high-volume tire manufacturing plant.",
      "Performed routine maintenance checks and assisted troubleshooting to reduce downtime and improve line efficiency.",
    ],
  },
];

const projects = [
  {
    title: "Composite Radome",
    subtitle: "Structural & HFSS electromagnetic performance evaluation",
    label: "Final year · 2025—2026",
    description:
      "Integrated ANSYS FEA, CFD aerodynamic analysis, and HFSS simulations to optimize radome design for structural integrity and RF signal transparency.",
  },
  {
    title: "Machinery Fault Diagnosis",
    subtitle: "Adaptive IMF filtering with machine learning",
    label: "Academic · 2024—2025",
    description:
      "Applied EMD and ML-based adaptive IMF filtering to denoise vibration signals and improve rotating machinery fault-detection accuracy.",
  },
  {
    title: "Saw Dust Purifier",
    subtitle: "Water filtration system",
    label: "Product development · 2023—2024",
    description:
      "Designed and prototyped a low-cost water-based saw-dust filtration system, then evaluated and refined it for scalability in woodworking units.",
  },
];

const certifications = [
  "SolidWorks Certified Associate (CSWA) — Dassault Systèmes",
  "Additive Manufacturing Certification — Dassault Systèmes",
  "Automation in Production Systems — NPTEL (Elite Grade)",
  "Product Design and Manufacturing — NPTEL",
  "Advanced Materials and Processes — NPTEL",
  "Google Cybersecurity Professional Certificate — Coursera",
];

const Index = () => (
  <main className="portfolio-shell">
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="#top">SP<span>.</span></a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
      </div>
      <a className="nav-contact" href="mailto:karthikpandian2003@gmail.com">Let's talk <ArrowUpRight size={16} /></a>
    </nav>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Mechanical engineer · CAD/CAE designer</p>
        <h1>Sendhur<br /><em>Pandian</em> M</h1>
        <p className="hero-intro">I turn engineering challenges into thoughtful, manufacturable solutions — from simulation to shop floor.</p>
        <div className="hero-actions">
          <a className="button-primary" href="#projects">View my work <ArrowUpRight size={18} /></a>
          <a className="text-link" href="mailto:karthikpandian2003@gmail.com">Get in touch <Mail size={16} /></a>
        </div>
      </div>
      <aside className="hero-card">
        <p>Based in</p>
        <strong>Tirunelveli,<br />Tamil Nadu</strong>
        <span className="card-rule" />
        <p>Available for</p>
        <strong>Design · Manufacturing<br />· R&amp;D roles</strong>
        <div className="availability"><i /> Open to relocation across India</div>
      </aside>
      <div className="hero-index">01 <span>/ 04</span></div>
    </section>

    <section className="about-section" id="about">
      <p className="section-number">01 — About me</p>
      <div>
        <h2>A curious engineer with a <em>practical</em> mindset.</h2>
        <p className="about-copy">Mechanical Engineering graduate with hands-on expertise in SolidWorks, ANSYS, AutoCAD, Creo, and HFSS. I enjoy working at the intersection of analysis, design, and manufacturing to create solutions that perform in the real world.</p>
        <div className="skills-wrap">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </div>
    </section>

    <section className="experience-section" id="experience">
      <div className="section-heading">
        <p className="section-number">02 — Experience</p>
        <h2>Learning by <em>doing.</em></h2>
      </div>
      <div className="timeline">
        {experience.map((item, index) => (
          <article className="experience-item" key={item.role}>
            <div className="experience-marker">0{index + 1}</div>
            <div className="experience-main"><h3>{item.role}</h3><p className="company">{item.company}</p></div>
            <p className="period">{item.period}</p>
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>

    <section className="projects-section" id="projects">
      <div className="section-heading"><p className="section-number">03 — Selected projects</p><h2>Ideas built to <em>perform.</em></h2></div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className={`project-card project-${index + 1}`} key={project.title}>
            <div className="project-top"><span>0{index + 1}</span><span>{project.label}</span></div>
            <div><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p></div>
            <span className="project-arrow"><ArrowUpRight size={22} /></span>
          </article>
        ))}
      </div>
    </section>

    <section className="credentials-section">
      <div><p className="section-number">04 — Credentials</p><h2>Prepared to<br /><em>contribute.</em></h2></div>
      <div className="credentials-content">
        <div className="education"><GraduationCap size={26} /><div><p className="detail-label">Education</p><h3>B.E. Mechanical Engineering</h3><p>National Engineering College, Kovilpatti</p><small>2022—2026 · CGPA: 6.92</small></div></div>
        <div className="certifications"><Award size={26} /><div><p className="detail-label">Certifications</p>{certifications.map((certification) => <p key={certification}>{certification}</p>)}</div></div>
      </div>
    </section>

    <footer className="site-footer">
      <div><p className="footer-kicker">Have a project in mind?</p><h2>Let's make it <em>real.</em></h2></div>
      <div className="footer-contact">
        <a href="mailto:karthikpandian2003@gmail.com"><Mail size={17} /> karthikpandian2003@gmail.com</a>
        <a href="tel:+916380772530"><Phone size={17} /> +91 63807 72530</a>
        <a href="https://www.linkedin.com/in/sendhur-pandian-ba450627a" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
      </div>
      <p className="footer-note"><MapPin size={14} /> Tamil (Native) · English (Professional)</p>
    </footer>
  </main>
);

export default Index;
