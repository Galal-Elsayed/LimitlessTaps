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
        title: "Power Axes International",
        description:
            "A leading industrial company in UAE, Abu Dhabi, specializing in the production of power axes and other industrial equipment.",
        category: "websites",
        tags: ["Industrial", "Corporate"],
        highlight: "Industrial",
        status: "Live",
        link: "https://poweraxes.vercel.app",
        image: "/Home/Carousel/poweraxes-en.png", // Using English fallback
    },
    {
        id: "w2",
        title: "Rayed",
        description:
            "All-in-one platform for shopping, selling & delivery. Connecting customers, sellers, and drivers in a single mobile ecosystem.",
        category: "websites",
        tags: ["E-commerce", "Marketplace"],
        highlight: "Shop",
        status: "Live",
        link: "https://rayed-landing.vercel.app/ar",
        image: "/Home/Carousel/rayed-en.png",
    },
    {
        id: "w3",
        title: "CRAI",
        description:
            "VIP platform for content creators with subscription access, secure auth, integrated payments, and audience management.",
        category: "websites",
        tags: ["SaaS", "Creators"],
        highlight: "SaaS",
        status: "Live",
        link: "https://crai-ksa.netlify.app/en",
        image: "/Home/Carousel/crai-ksa-en.png",
    },
    {
        id: "w4",
        title: "AirSpeak",
        description:
            "AI-powered aviation communication training platform using generative audio and customizable scenarios for pilots.",
        category: "websites",
        tags: ["AI", "EdTech"],
        highlight: "AI Platform",
        status: "Beta",
        link: "http://dev.vectoratc.com/home",
        image: "/Home/Carousel/flight.png",
    },
    {
        id: "w5",
        title: "PSU Platform",
        description:
            "Full-stack education SaaS built with React and Django featuring course creation, real-time updates, and user auth.",
        category: "websites",
        tags: ["Education", "LMS"],
        highlight: "SaaS",
        status: "Live",
        link: "https://psu-platform.vercel.app/",
        image: "/Home/Carousel/psu-platform.png",
    },
    {
        id: "w6",
        title: "Kframe Agency",
        description:
            "Flagship digital presence for Kframe Agency showcasing creative portfolios with high-performance animations.",
        category: "websites",
        tags: ["Agency", "Portfolio"],
        highlight: "Agency",
        status: "Live",
        link: "https://www.kframeagency.com/",
        image: "/Home/Carousel/kframe.png",
    },
    {
        id: "w7",
        title: "Zoom Store",
        description:
            "Modern e-commerce platform built with Rust and React for high-performance shopping and store management.",
        category: "websites",
        tags: ["E-commerce", "High Performance"],
        highlight: "Shop",
        status: "Live",
        link: "https://zoom-store-rust.vercel.app/",
        image: "/Home/Carousel/zoom-store.png",
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
