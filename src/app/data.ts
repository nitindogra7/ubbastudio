export const services = [
  {
    "title": "Websites that look the part. And work even harder.",
    "list": [
      "Strategy and thoughtful UI/UX",
      "Responsive, custom development",
      "Performance and technical SEO",
      "CMS and third-party integrations"
    ],
    "foot": "From your first landing page to your next big chapter.",
    "photo": "photo-1499951360447-b19be8fe80f5",
    "alt": "Website development workspace",
    "label": "Website development"
  },
  {
    "title": "From a bright idea to an app people reach for.",
    "list": [
      "User journeys and interactive prototypes",
      "Mobile and web app development",
      "APIs, authentication and integrations",
      "Testing, release and iteration"
    ],
    "foot": "Useful experiences, made for real people.",
    "photo": "photo-1512941937669-90a1b58e7e9c",
    "alt": "Mobile application on a smartphone",
    "label": "App development"
  },
  {
    "title": "Less repetitive work. More room for what matters.",
    "list": [
      "Workflow discovery and mapping",
      "AI-assisted document and data processing",
      "CRM and business tool integrations",
      "Human review and clear controls"
    ],
    "foot": "Practical automation, built around your business.",
    "photo": "photo-1454165804606-c3d57bc86b40",
    "alt": "Reviewing business processes for automation",
    "label": "AI automations"
  },
  {
    "title": "Your next big idea, built from the inside out.",
    "list": [
      "Discovery, scope and product strategy",
      "MVP design and full-stack development",
      "Dashboards, platforms and internal tools",
      "A roadmap for your next release"
    ],
    "foot": "From a first prototype to a product you can grow.",
    "photo": "photo-1555066931-4365d14bab8c",
    "alt": "Software product code on a laptop",
    "label": "Product development"
  },
  {
    "title": "Launch day is only the beginning.",
    "list": [
      "Ongoing maintenance and improvements",
      "New features and integrations",
      "Performance reviews and fixes",
      "Documentation and technical handover"
    ],
    "foot": "Keep moving, with a team that knows your product.",
    "photo": "photo-1522071820081-009f0129c71c",
    "alt": "Team collaborating on software improvements",
    "label": "Ongoing support"
  }
];
export const articles = [
  {
    "category": "Process",
    "title": "Plan the product before writing the first line of code",
    "body": "<p>A good brief starts with the change you want to make. Who is the product for? What are they trying to do? What is getting in their way today?</p><h3>Start with the journey</h3><p>Write down the shortest useful path from someone arriving to completing their task. For a website, that might be understanding your service and making an enquiry. For an app, it could be creating an account and completing one essential action.</p><h3>Agree what success looks like</h3><p>Pick a small set of outcomes you can observe. Make sure the team agrees which features are essential for those outcomes and which can wait. A focused scope makes trade-offs easier throughout the build.</p><h3>Make decisions visible</h3><p>Use simple wireframes, a written feature list and a shared milestone plan. Review the risky assumptions first. The aim is to create enough clarity to build confidently, while leaving room to learn.</p>",
    "image": "photo-1586717791821-3f44a563fa4c",
    "alt": "Planning user interfaces and wireframes"
  },
  {
    "category": "Product",
    "title": "What your first version actually needs to do",
    "body": "<p>Your first version does not need to contain every idea on the roadmap. It needs to help a specific person solve a specific problem, from beginning to end.</p><h3>Choose one complete experience</h3><p>Focus on one useful workflow. A small experience that works all the way through is easier to understand and evaluate than several features that stop halfway.</p><h3>Keep the fundamentals</h3><p>A smaller scope still needs clear navigation, sensible error messages, accessibility and appropriate data protection. These are part of the experience, not decorative extras.</p><h3>Leave space to learn</h3><p>Plan how you will collect feedback and decide what to build next. Speak with people who use the product, watch where they get stuck and distinguish repeated problems from one-off requests.</p><p>The first release is a way to begin a useful conversation with your users.</p>",
    "image": "photo-1558655146-d09347e92766",
    "alt": "Colourful design work and visual exploration"
  },
  {
    "category": "Automation",
    "title": "Start with the busywork. Then think about AI.",
    "body": "<p>The best place to start an automation project is a repeated task that someone already understands. Map what happens, which tools are involved and where the work gets stuck.</p><h3>Make the workflow explicit</h3><p>Describe the trigger, the information needed and the expected result. Straightforward rules may be enough. AI becomes useful when a task involves unstructured information, such as extracting details from an enquiry or suggesting a category.</p><h3>Decide where people stay involved</h3><p>Choose what can happen automatically and what needs review. Give the team a way to inspect results, handle exceptions and recover when a step fails.</p><h3>Start small and measure</h3><p>Try one bounded workflow with representative examples before expanding it. Compare the time saved with the effort needed to review results and maintain the integration.</p><p>The goal is dependable assistance that makes the working day easier.</p>",
    "image": "photo-1454165804606-c3d57bc86b40",
    "alt": "Team reviewing business workflows"
  }
];
export const imageUrl = (id: string, width = 1000, quality = 85) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
