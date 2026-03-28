export const siteData = {
  name: "Parth Kumar",
  role: "Software Engineer",
  company: "MOYA Analytics",
  location: "Based in Singapore",
  bio: "Adapting to any and all codebases.",
  shortBio: "software engineer who loves building things that work.",

  links: {
    github: "https://github.com/Eqedos",
    linkedin: "https://www.linkedin.com/in/parth-kumar-j117/",
    email: "parthkumarj117@gmail.com",
  },

  skills: {
    languages: ["TypeScript", "Python", "Go", "SQL", "HTML/CSS"],
    frontend: ["React", "Next.js", "Tailwind CSS", "ReactFlow", "Zod", "Framer Motion", "Radix UI", "Zustand"],
    backend: ["Node.js", "PostgreSQL", "Drizzle ORM", "Redis", "Supabase", "pgvector", "REST APIs", "CVXPY"],
    infra: ["Docker", "AWS", "Vercel", "Railway", "GitHub Actions", "Git", "CI/CD"],
    testing: ["Jest", "Playwright", "pytest"],
  },

  experience: [
    {
      company: "MOYA Analytics",
      logo: "/logos/moya-icon.svg",
      duration: "9 mos",
      location: "On-site",
      roles: [
        {
          title: "Software Engineer",
          type: "Full-time",
          period: "Jul 2025 - Present",
          bullets: [
            "Built the full application in Next.js 16 with React 19, Tailwind CSS, and Vercel Analytics, including marketing pages, auth flows, and the core workspace",
            "Built an interactive drag-and-drop canvas editor using ReactFlow, data-heavy forms, dashboards with charts, and agentic AI features",
            "Implemented SSR authentication with MFA enforcement, role-based access control interfaces, and Zod form validation",
            "Designed and implemented 60+ REST API routes in a layered architecture with PostgreSQL (Drizzle ORM), Row-Level Security, and a three-tier authorization model",
            "Built a containerized Python optimization worker using CVXPY (linear programming) with PostgreSQL-based job queuing",
            "Set up Supabase Auth with MFA, CSRF protection, security headers, and rate limiting with Upstash Redis",
            "Hosted the app on Vercel, the optimization worker on Railway, and the database and storage on Supabase, with staging/production environments and CI/CD via GitHub Actions",
            "Wrote unit tests (Jest), E2E tests (Playwright), Python tests (pytest), and authored 17 technical documents",
            "Implemented vector embedding/search using PG vector and embedding algorithms",
          ],
          tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Python", "Supabase", "Docker", "Redis", "Drizzle ORM", "ReactFlow"],
        },
      ],
    },
    {
      company: "A*STAR",
      companyFull: "Agency for Science, Technology and Research",
      logo: "/logos/astar.png",
      duration: "4 mos",
      location: "Singapore · On-site",
      roles: [
        {
          title: "Software Engineer Intern",
          type: "Internship",
          period: "May 2024 - Aug 2024",
          bullets: [
            "Built STEVFNs 2.0, a framework formulating CO\u2082 and waste management problems as linear/convex programs using CVXPY, solving over tens of thousands of variables",
            "Built the frontend in React for model configuration, scenario management, and results visualization",
            "Designed backend with SQS job queuing and containerized solver workers on ECS Fargate",
          ],
          tech: ["React", "Python", "CVXPY", "AWS", "Docker"],
        },
      ],
    },
    {
      company: "Climate Analytics",
      logo: "/logos/climate-analytics.png",
      duration: "7 mos",
      location: "Remote",
      roles: [
        {
          title: "Software Consultant",
          type: "Part-time",
          period: "Jun 2023 - Dec 2023",
          bullets: [
            "Automated workflows with Python and Snakemake, adapted energy modeling tools for optimization solvers",
            "Contributed to the UN COP28 showcase through detailed data visualizations",
          ],
          tech: ["Python", "Snakemake", "Data Visualization"],
        },
      ],
    },
  ],

  projects: [
    {
      name: "BootDevMulti",
      description:
        "A multiplayer game engine built with TypeScript. Features real-time player interaction and game state management.",
      tech: ["TypeScript", "WebSockets"],
      url: "https://github.com/Eqedos/BootDevMulti",
      stars: 61,
    },
    {
      name: "fallacy-scope",
      description:
        "A tool for detecting logical fallacies in text using AI-powered analysis.",
      tech: ["TypeScript", "AI/ML"],
      url: "https://github.com/Eqedos/fallacy-scope",
    },
    {
      name: "chirpy",
      description:
        "A lightweight HTTP server built from scratch in Go. Handles routing, middleware, and JSON responses.",
      tech: ["Go", "REST API"],
      url: "https://github.com/Eqedos/chirpy",
    },
    {
      name: "rss",
      description:
        "An RSS feed aggregator CLI tool written in Go. Fetches, parses, and displays feeds from multiple sources.",
      tech: ["Go", "CLI"],
      url: "https://github.com/Eqedos/rss",
    },
    {
      name: "aiagent",
      description:
        "An AI agent framework in Python for building autonomous task-completing agents.",
      tech: ["Python", "AI/ML"],
      url: "https://github.com/Eqedos/aiagent",
    },
  ],

  terminalCommands: {
    help: "Available commands: about, projects, skills, links, contact, clear, history",
    about:
      "Hey! I'm Parth Kumar, a Software Engineer at MOYA Analytics. I love building clean, efficient software and exploring new technologies. When I'm not coding, you can find me tinkering with side projects or learning something new.",
    skills: [
      "Languages:  TypeScript | Python | Go | SQL | HTML/CSS",
      "Frontend:   React | Next.js | Tailwind CSS | ReactFlow | Zod | Framer Motion | Radix UI | Zustand",
      "Backend:    Node.js | PostgreSQL | Drizzle ORM | Redis | Supabase | pgvector | REST APIs | CVXPY",
      "Infra:      Docker | AWS | Vercel | Railway | GitHub Actions | Git | CI/CD",
      "Testing:    Jest | Playwright | pytest",
    ].join("\n"),
    contact: "Email: parthkumarj117@gmail.com",
    welcome:
      'Welcome to parth.dev terminal v1.0.0\nType "help" to see available commands.\n',
  },
};

export type Project = (typeof siteData.projects)[number];
export type Experience = (typeof siteData.experience)[number];
export type Role = Experience["roles"][number];
