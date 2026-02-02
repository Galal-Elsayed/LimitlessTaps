export type Category = "websites" | "mobile_apps" | "dashboards";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  image?: string;
  highlight?: string; // Quick highlight text like "Database" in the example
  status?: string; // "Live", "In Progress"
  link?: string;
}

export const PROJECTS: Project[] = [
  // Websites
  {
    id: "w1",
    title: "Zenith Portfolio",
    description:
      "A minimal, high-performance portfolio template built with React 19.",
    category: "websites",
    tags: ["Portfolio", "Minimal"],
    highlight: "Portfolio",
    status: "Live",
  },
  {
    id: "w2",
    title: "Aura Wellness",
    description:
      "Serene landing page with fluid animations and calming aesthetics.",
    category: "websites",
    tags: ["Wellness", "Animation"],
    highlight: "Wellness",
    status: "Live",
  },
  {
    id: "w3",
    title: "Flow Commerce",
    description:
      "Modern e-commerce interface optimized for conversion and speed.",
    category: "websites",
    tags: ["E-commerce", "Shopify"],
    highlight: "Shop",
    status: "Live",
  },
  {
    id: "w4",
    title: "Horizon Land",
    description: "Corporate landing page for a fictional real estate agency.",
    category: "websites",
    tags: ["Corporate", "Real Estate"],
    highlight: "Agency",
    status: "Beta",
  },
  {
    id: "w5",
    title: "Neon Blog",
    description: "Dark-mode focused blog template for developers.",
    category: "websites",
    tags: ["Blog", "Content"],
    highlight: "Content",
    status: "Live",
  },
  {
    id: "w6",
    title: "Stellar Doc",
    description: "Beautiful documentation site generator theme.",
    category: "websites",
    tags: ["Docs", "Technical"],
    highlight: "Docs",
    status: "Live",
  },

  // Mobile Apps
  {
    id: "m1",
    title: "Pulse Fitness",
    description:
      "Activity tracking app with social features and workout plans.",
    category: "mobile_apps",
    tags: ["Health", "iOS"],
    highlight: "Health",
    status: "Live",
  },
  {
    id: "m2",
    title: "Echo Chat",
    description: "End-to-end encrypted messaging application.",
    category: "mobile_apps",
    tags: ["Social", "Security"],
    highlight: "Chat",
    status: "Beta",
  },
  {
    id: "m3",
    title: "Swift Pay",
    description: "Contactless payment solution for local markets.",
    category: "mobile_apps",
    tags: ["Finance", "Fintech"],
    highlight: "Fintech",
    status: "Live",
  },
  {
    id: "m4",
    title: "Lumina Cam",
    description: "AI-powered photography assistant app.",
    category: "mobile_apps",
    tags: ["Photo", "AI"],
    highlight: "Camera",
    status: "Alpha",
  },
  {
    id: "m5",
    title: "Orbit Note",
    description: "Spatial note-taking app for creative thinkers.",
    category: "mobile_apps",
    tags: ["Productivity", "3D"],
    highlight: "Notes",
    status: "Live",
  },
  {
    id: "m6",
    title: "Vortex Game",
    description: "Casual puzzle game with neon aesthetics.",
    category: "mobile_apps",
    tags: ["Game", "Casual"],
    highlight: "Game",
    status: "Live",
  },

  // Dashboards
  {
    id: "d1",
    title: "Nexus Analytics",
    description: "Comprehensive data visualization for enterprise metrics.",
    category: "dashboards",
    tags: ["Analytics", "SaaS"],
    highlight: "Data",
    status: "Live",
  },
  {
    id: "d2",
    title: "Quantum Admin",
    description: "Futuristic admin panel with real-time updates.",
    category: "dashboards",
    tags: ["Admin", "Real-time"],
    highlight: "Admin",
    status: "Live",
  },
  {
    id: "d3",
    title: "Flux CRM",
    description: "Customer relationship management with visual pipelines.",
    category: "dashboards",
    tags: ["CRM", "Business"],
    highlight: "CRM",
    status: "Live",
  },
  {
    id: "d4",
    title: "Titan Logs",
    description: "Server log monitoring and error tracking dashboard.",
    category: "dashboards",
    tags: ["DevOps", "Monitoring"],
    highlight: "DevOps",
    status: "Beta",
  },
  {
    id: "d5",
    title: "Aether Finance",
    description: "Crypto portfolio tracking and trading interface.",
    category: "dashboards",
    tags: ["Finance", "Crypto"],
    highlight: "Crypto",
    status: "Live",
  },
  {
    id: "d6",
    title: "Core System",
    description: "Operating system level resource monitor visualization.",
    category: "dashboards",
    tags: ["System", "IoT"],
    highlight: "System",
    status: "Live",
  },
];
