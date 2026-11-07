import Image from "next/image";
import {
  Journal,
  PrivacyButton,
  ProjectForm,
  ServiceTabs,
  StudioDialogs,
} from "./interactions";
import { SiteHeader } from "./site-header";
import { ProjectCarousel } from "./project-carousel";
import { Icon } from "./ui";
import { imageUrl } from "@/app/data";

const steps = [
  [
    "Discover",
    "First, the right questions.",
    "Your goals, your audience, and the problem worth solving.",
    "compass",
  ],
  [
    "Define",
    "A plan we believe in.",
    "A focused scope, shared milestones, and no surprises in the middle.",
    "list-checks",
  ],
  [
    "Design",
    "Make the idea tangible.",
    "User journeys, visual direction, and prototypes you can put to the test.",
    "pen-tool",
  ],
  [
    "Develop",
    "Build. Share. Refine.",
    "Working software, regular reviews, and design carried through to the details.",
    "code-2",
  ],
  [
    "Test",
    "Care in every corner.",
    "Real devices, key journeys, accessibility, and performance.",
    "scan-check",
  ],
  [
    "Launch",
    "Ready for what's next.",
    "A thoughtful handover and a clear path to the next release.",
    "rocket",
  ],
] as const;
const questions = [
  [
    "How long does a project take?",
    "A website, a mobile app, and a software platform need different timelines. After discovery, we agree a scope and map the milestones together before development begins.",
  ],
  [
    "How much does a project cost?",
    "We quote around your requirements, integrations, and timeline. Tell us what you have in mind and your budget range, and we'll help define a practical scope.",
  ],
  [
    "Do you work with teams outside Delhi?",
    "Yes. We're based in Delhi and collaborate remotely. Calls, shared documents, and regular reviews keep everyone aligned, wherever your team works.",
  ],
  [
    "Can you build an MVP from an idea?",
    "Yes. We can shape the core features, design the experience, and build a first version, with a roadmap informed by what you learn from real users.",
  ],
  [
    "What can you automate with AI?",
    "We explore workflows such as organising enquiries, processing documents, internal search, and connecting business tools. We define the data access and human review needed for each use case.",
  ],
  [
    "Can you support us after launch?",
    "We can scope ongoing maintenance, improvements, and new features alongside your project. Support responsibilities and response expectations are agreed before launch.",
  ],
];
const projects = [
  {
    id: "forma",
    title: "Forma",
    category: "Website & product",
    description: "A clear, confident home for a software product.",
    tags: ["UI/UX design", "Development"],
  },
  {
    id: "offbeat",
    title: "Offbeat",
    category: "Mobile experience",
    description: "A little less planning. A lot more exploring.",
    tags: ["App design", "Mobile development"],
  },
  {
    id: "autopilot",
    title: "On autopilot.",
    category: "AI & operations",
    description: "A smarter route from enquiry to follow-up.",
    tags: ["AI automation", "Integrations"],
  },
];

function ProjectVisual({ id }: { id: string }) {
  if (id === "forma")
    return (
      <div className="project-visual forma-visual">
        <span className="visual-label">Web experience / Concept 001</span>
        <div className="mock-browser">
          <div className="browser-bar">
            <span>
              <i />
              <i />
              <i />
            </span>
            <small>forma.studio / concept</small>
            <Icon name="arrow-up-right" />
          </div>
          <div className="mock-inner">
            <div className="mock-nav">
              <b>forma</b>
              <span>One space. More possibility.</span>
            </div>
            <div className="forma-body">
              <div>
                <span className="mock-eyebrow">A little room to think.</span>
                <h3>
                  Less busywork.
                  <br />
                  More possibility.
                </h3>
                <p>One calm place for your team to turn plans into progress.</p>
                <span className="mock-button">
                  Find your focus <Icon name="arrow-up-right" />
                </span>
              </div>
              <Image
                sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 800px"
                src={imageUrl("photo-1497366811353-6870744d04b2", 700, 80)}
                alt="Sunlit architectural space in the Forma concept website"
                width={700}
                height={800}
                loading="lazy"
              />
            </div>
            <div className="mock-bottom">
              <span>Make space for good work.</span>
              <span>01 — Focus / 02 — Create / 03 — Grow</span>
            </div>
          </div>
        </div>
        <span className="visual-bottom">
          Strategy meets a quieter kind of software.
        </span>
      </div>
    );
  if (id === "offbeat")
    return (
      <div className="project-visual offbeat-visual">
        <Image
          sizes="(max-width: 1000px) 100vw, 88vw"
          className="landscape"
          src={imageUrl("photo-1464822759023-fed622ff2c3b", 1400, 80)}
          alt="Mountain landscape behind the Offbeat travel app concept"
          width={1400}
          height={900}
          loading="lazy"
        />
        <span className="visual-label">Mobile experience / Concept 002</span>
        <div className="offbeat-type" aria-hidden="true">
          Take the
          <br />
          <em>scenic route.</em>
        </div>
        <div className="mock-phone">
          <div className="phone-head">
            <b>9:41</b>
            <span>
              <Icon name="signal" />
              <Icon name="battery-full" />
            </span>
          </div>
          <div className="phone-body">
            <span className="mock-eyebrow">OFFBEAT / FIND YOUR AWAY</span>
            <h3>
              Somewhere
              <br />a little wilder.
            </h3>
            <Image
              sizes="(max-width: 540px) 120px, 220px"
              src={imageUrl("photo-1472396961693-142e6e269027", 400, 80)}
              alt="A quiet forest destination in the travel app concept"
              width={400}
              height={430}
              loading="lazy"
            />
            <b>
              A weekend in the wild <Icon name="arrow-up-right" />
            </b>
            <small>Fresh air. New perspectives.</small>
            <span className="mock-button">
              Explore destinations <Icon name="arrow-right" />
            </span>
          </div>
        </div>
        <span className="visual-bottom">
          Less planning. More getting lost in the right places.
        </span>
      </div>
    );
  return (
    <div className="project-visual automation-visual">
      <span className="visual-label">Connected systems / Concept 003</span>
      <div className="automation-heading">
        <span className="mock-eyebrow">LESS FRICTION. MORE FORWARD.</span>
        <h3>
          On
          <br />
          <em>autopilot.</em>
        </h3>
      </div>
      <div className="automation-ui">
        <div className="automation-top">
          <i className="live-dot" /> Your workflow, connected{" "}
          <Icon name="workflow" />
        </div>
        {[
          ["inbox", "New enquiry", "The right details, in one place."],
          ["sparkles", "AI organises", "Useful context. Less busywork."],
          [
            "circle-check",
            "People stay in control",
            "Your team reviews and replies.",
          ],
        ].map(([icon, title, body], index) => (
          <div key={title}>
            {index > 0 && <div className="flow-line" />}
            <div className="flow-node">
              <span>
                <Icon name={icon as "inbox" | "sparkles" | "circle-check"} />
              </span>
              <div>
                <b>{title}</b>
                <small>{body}</small>
              </div>
              <span className="node-number">0{index + 1}</span>
            </div>
          </div>
        ))}
        <div className="automation-foot">
          A considered workflow, from enquiry to action.
        </div>
      </div>
      <span className="visual-bottom">
        Built around people. Connected by technology.
      </span>
    </div>
  );
}

export function Site() {
  return (
    <StudioDialogs>
      <SiteHeader />
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="wrap hero-inner">
            <div className="hero-top hero-enter">
              <span>
                <i className="live-dot" /> Independent minds. Shared ambition.
              </span>
              <span>Delhi, India / Working everywhere</span>
            </div>
            <div className="hero-stage">
              <h1 id="hero-heading">
                <span className="line-mask">
                  <span className="hero-line">
                    <span className="hero-word">Good</span>{" "}
                    <span className="hero-word">ideas.</span>
                  </span>
                </span>
                <span className="line-mask">
                  <span className="hero-line">
                    <span className="hero-word">Great</span>{" "}
                    <span className="hero-word">digital.</span>
                  </span>
                </span>
                <span className="line-mask">
                  <span className="hero-line orange-text">
                    <span className="hero-word">Built</span>{" "}
                    <span className="hero-word">together.</span>
                  </span>
                </span>
              </h1>
              <div className="hero-art" aria-hidden="true">
                <svg viewBox="0 0 420 460" fill="none">
                  <path
                    d="M30 30H390V430H30Z"
                    stroke="currentColor"
                    strokeOpacity=".18"
                  />
                  <path
                    d="M0 230H420M210 0V460"
                    stroke="currentColor"
                    strokeOpacity=".18"
                    strokeDasharray="3 6"
                  />
                  <circle
                    cx="210"
                    cy="230"
                    r="170"
                    stroke="currentColor"
                    strokeOpacity=".18"
                  />
                  <circle
                    cx="210"
                    cy="230"
                    r="124"
                    stroke="currentColor"
                    strokeOpacity=".18"
                  />
                  <path
                    className="art-stroke"
                    pathLength={1}
                    d="M115 130V245C115 298 154 333 210 333C266 333 305 298 305 245V130"
                    stroke="#ff6333"
                    strokeWidth="65"
                  />
                  <circle className="art-dot" cx="305" cy="76" r="20" fill="#ff6333" />
                  <path
                    d="M20 30H40M30 20V40M380 430H400M390 420V440"
                    stroke="currentColor"
                  />
                </svg>
                <span className="art-caption">
                  Design + engineering
                  <br />
                  Connected from day one.
                </span>
              </div>
            </div>
            <div className="hero-bottom">
              <p className="hero-enter">
                We turn ambitious ideas into thoughtful websites, apps, and AI
                automations. One independent studio, from first sketch to what
                comes next.
              </p>
              <div className="hero-actions hero-enter">
                <a className="btn primary" href="#contact">
                  Start a project{" "}
                  <span className="arrow">
                    <Icon name="arrow-up-right" />
                  </span>
                </a>
                <a className="text-link" href="#work">
                  Explore our work <Icon name="arrow-right" />
                </a>
              </div>
              <a className="hero-scroll hero-enter" href="#work">
                <span>Scroll to explore</span>
                <Icon name="arrow-down-to-line" />
              </a>
            </div>
          </div>
        </section>
        <div className="capabilities wrap" aria-label="Studio capabilities">
          <span className="section-kicker">
            Thought through.
            <br />
            Built to work.
          </span>
          <span>
            <Icon name="panels-top-left" />
            Websites
          </span>
          <span>
            <Icon name="smartphone" />
            Applications
          </span>
          <span>
            <Icon name="workflow" />
            AI automations
          </span>
          <span>
            <Icon name="layers-3" />
            Digital products
          </span>
        </div>

        <section
          className="work section"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <span className="section-kicker">
                  <span className="index">01 /</span> Ideas in action
                </span>
                <h2 className="section-title" id="work-heading">
                  A taste of
                  <br />
                  <span className="muted">what&apos;s possible.</span>
                </h2>
              </div>
              <div className="work-intro">
                <p>
                  Three studio explorations across web, mobile, and automation.
                  Concept projects, made to show how we think.
                </p>
              </div>
            </div>
            <ProjectCarousel labels={projects.map((project) => project.title)}>
              {projects.map((project, index) => (
                <article className="project" id={project.id} key={project.id}>
                  <ProjectVisual id={project.id} />
                  <div className="project-info">
                    <div>
                      <span className="section-kicker">
                        0{index + 1} / {project.category}
                      </span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <div className="project-detail">
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <a className="text-link" href="#contact">
                        Discuss a similar project <Icon name="arrow-up-right" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </ProjectCarousel>
          </div>
        </section>

        <ServiceTabs />
        <section
          className="about section wrap"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="about-label">
            <span className="section-kicker">
              <span className="index">03 /</span> The studio
            </span>
            <span className="studio-location">
              <i className="live-dot" /> Delhi, India
            </span>
          </div>
          <div className="about-body">
            <h2 className="manifesto reveal" id="about-heading">
              Small studio.
              <br />
              Big on <span className="orange-text">the details.</span>
            </h2>
            <div className="about-copy reveal">
              <p className="intro">
                Designers, developers, and problem-solvers. Different
                perspectives, at the same table.
              </p>
              <p>
                We help founders and growing teams turn a good idea into
                something people can actually use. Strategy, design, and
                engineering stay connected, so the thinking carries all the way
                through to the finished product.
              </p>
              <p>Based in Delhi. Curious about everywhere.</p>
              <a href="#process" className="text-link">
                Get to know our process <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
          <div className="studio-image" data-image-reveal>
            <Image
              sizes="100vw"
              data-parallax
              src={imageUrl("photo-1497366754035-f200968a6e72", 1800, 80)}
              alt="Light-filled collaborative workspace, an editorial image of studio life"
              width={1800}
              height={800}
              loading="lazy"
            />
            <div className="image-note">
              <span>
                Good ideas deserve
                <br />a thoughtful build.
              </span>
              <span>
                Design. Develop. Automate. <Icon name="arrow-up-right" />
              </span>
            </div>
          </div>
        </section>

        <section
          className="process section"
          id="process"
          aria-labelledby="process-heading"
        >
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <span className="section-kicker">
                  <span className="index">04 /</span> How we get there
                </span>
                <h2 className="section-title" id="process-heading">
                  Clarity at every step.
                  <br />
                  <span className="muted">Care at every turn.</span>
                </h2>
              </div>
              <p>
                You&apos;re part of every milestone. We agree the scope and
                timeline together, then keep you close to the work.
              </p>
            </div>
            <ol className="process-list">
              {steps.map(([title, heading, body, icon], index) => (
                <li className="process-step" key={title}>
                  <span className="step-number">0{index + 1}</span>
                  <div className="step-title">
                    <Icon name={icon} />
                    <span>{title}</span>
                  </div>
                  <h3>{heading}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="approach section wrap"
          id="approach"
          aria-labelledby="approach-heading"
        >
          <div className="section-head reveal">
            <div>
              <span className="section-kicker">
                <span className="index">05 /</span> A good way to work
              </span>
              <h2 className="section-title" id="approach-heading">
                Good people.
                <br />
                Shared standards.
              </h2>
            </div>
            <p>
              No mystery in the middle. Just thoughtful people building useful
              things.
            </p>
          </div>
          <div className="principles">
            <article className="principle reveal">
              <Icon name="handshake" />
              <span className="section-kicker">01 / Built together</span>
              <h3>
                Your ambition.
                <br />
                Our shared obsession.
              </h3>
              <p>
                We work through the important questions with you, so the product
                makes sense for your business and the people using it.
              </p>
            </article>
            <article className="principle reveal">
              <Icon name="messages-square" />
              <span className="section-kicker">02 / Open by default</span>
              <h3>
                Clear scope.
                <br />
                Honest conversations.
              </h3>
              <p>
                Regular reviews make decisions visible and progress easy to
                follow. You&apos;ll always know what we&apos;re working towards.
              </p>
            </article>
            <article className="principle reveal">
              <Icon name="blocks" />
              <span className="section-kicker">03 / Made to keep going</span>
              <h3>
                The right tools.
                <br />A thoughtful handover.
              </h3>
              <p>
                Maintainable code, practical technology, and a clear plan for
                the next chapter. Launch day is just the beginning.
              </p>
            </article>
          </div>
        </section>

        <section
          className="faq section wrap"
          id="faq"
          aria-labelledby="faq-heading"
        >
          <div className="faq-shell">
            <div className="faq-intro reveal">
              <span className="section-kicker">
                <span className="index">06 /</span> Good questions
              </span>
              <h2 className="section-title" id="faq-heading">
                Good questions.
                <br />
                <span className="muted">Straight answers.</span>
              </h2>
              <p className="muted">A few things you might be wondering.</p>
              <a className="text-link" href="#contact">
                Ask us something else <Icon name="arrow-up-right" />
              </a>
              <span className="faq-intro-mark" aria-hidden="true">
                <Icon name="messages-square" />
              </span>
            </div>
            <div className="accordion reveal">
              {questions.map(([question, answer], index) => (
                <details name="studio-faq" key={question} open={index === 0}>
                  <summary>
                    <span className="question-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="faq-question">{question}</span>
                    <span className="faq-icon-wrap">
                      <Icon name="plus" className="faq-icon" />
                    </span>
                  </summary>
                  <div className="faq-answer">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <Journal />

        <section
          className="contact"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="wrap">
            <div className="contact-top">
              <span className="section-kicker">
                <span className="index">08 /</span> Make the first move
              </span>
              <span>A good conversation is a good beginning.</span>
            </div>
            <div className="contact-heading-row">
              <h2 id="contact-heading">
                <span className="line-mask">
                  <span className="closing-line">Your next</span>
                </span>
                <span className="line-mask">
                  <span className="closing-line">
                    big <span className="orange-text">thing.</span>
                  </span>
                </span>
              </h2>
              <a
                className="closing-arrow"
                href="#project-form"
                aria-label="Prepare your project brief"
              >
                <Icon name="arrow-up-right" />
              </a>
            </div>
            <div className="contact-grid">
              <div className="contact-intro reveal">
                <h3>Let&apos;s give it a good start.</h3>
                <p>
                  A new idea, a better website, or a workflow that needs a
                  rethink. Tell us what you&apos;re building.
                </p>
                <div className="contact-info">
                  <span>Based in</span>
                  <p>Delhi, India.</p>
                </div>
                <div className="contact-info">
                  <span>Working with</span>
                  <p>Ambitious people, everywhere.</p>
                </div>
                <div className="brief-note">
                  <Icon name="arrow-down-to-line" />
                  <p>
                    Start by preparing your brief. It downloads to your device
                    so you can review and share it. This form doesn&apos;t send
                    an enquiry.
                  </p>
                </div>
              </div>
              <ProjectForm />
            </div>
            <footer className="footer">
              <div className="footer-grid">
                <div>
                  <a
                    href="#home"
                    className="brand"
                    aria-label="ubbastudio home"
                  >
                    <span className="brand-icon" />
                    ubbastudio
                  </a>
                  <p>
                    Independent minds.
                    <br />
                    Thoughtful digital experiences.
                  </p>
                </div>
                <div>
                  <h3>Explore</h3>
                  <div className="footer-links">
                    <a href="#work">Selected work</a>
                    <a href="#services">Services</a>
                    <a href="#about">The studio</a>
                  </div>
                </div>
                <div>
                  <h3>A little more</h3>
                  <div className="footer-links">
                    <a href="#process">Our process</a>
                    <a href="#faq">Questions</a>
                    <a href="#journal">Journal</a>
                  </div>
                </div>
                <div className="footer-signoff">
                  <span>
                    From Delhi,
                    <br />
                    with intention.
                  </span>
                  <Icon name="arrow-up-right" />
                </div>
              </div>
              <div className="footer-bottom">
                <span>
                  © <span id="year">2026</span> ubbastudio
                </span>
                <PrivacyButton />
                <a href="#home">
                  Back to top <Icon name="arrow-up" />
                </a>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </StudioDialogs>
  );
}
