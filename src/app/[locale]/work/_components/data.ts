export type Project = {
    id: string;
    category: string;
    title: string;
    details: string;
    tutorialLink: string;
    mainImage: string;
    gallery: string[];
    technologies: string[];
    client: string;
    year: string;
    description: string;
    displayUrl?: string;
  };
  
  export type TabConfig = {
    id: string;
    label: string;
    projects: Project[];
  };
  
  // Mock data for mobile projects
  export const mobileProjects: Project[] = [
    {
      id: "mobile-1",
      category: "E-Commerce App",
      title: "Shop & Ship Mobile",
      details:
        "A seamless shopping experience with intuitive navigation, personalized recommendations, and secure checkout process.",
      tutorialLink: "#",
      mainImage: "/Work/mobile/shop&ship1.webp",
      gallery: [
        "/Work/mobile/shop&ship1.webp",
        "/Work/mobile/shop&ship2.webp",
        "/Work/mobile/shop&ship3.webp",
        "/Work/mobile/shop&ship4.webp",
      ],
      technologies: ["React Native", "TypeScript", "Redux", "Firebase"],
      client: "RetailCo",
      year: "2024",
      description:
        "A comprehensive mobile shopping platform that revolutionizes the retail experience with AI-powered recommendations and seamless payment integration.",
    },
    {
      id: "mobile-2",
      category: "Logistics",
      title: "Blueworks",
      details:
        "Track your fitness goals, monitor health metrics, and get personalized workout plans tailored to your lifestyle.",
      tutorialLink: "#",
      mainImage: "/Work/mobile/bluworks1.webp",
      gallery: [
        "/Work/mobile/bluworks1.webp",
        "/Work/mobile/bluworks2.webp",
        "/Work/mobile/bluworks3.webp",
        "/Work/mobile/bluworks4.webp",
      ],
      technologies: ["Flutter", "Dart", "HealthKit", "Google Fit"],
      client: "FitLife Inc",
      year: "2024",
      description:
        "An all-in-one fitness tracking application that helps users achieve their health goals through personalized insights and community support.",
    },
    {
      id: "mobile-3",
      category: "Fintech",
      title: "Tecfy",
      details:
        "Stay connected with friends and family through instant messaging, photo sharing, and real-time updates.",
      tutorialLink: "#",
      mainImage: "/Work/mobile/Tecfy1.webp",
      gallery: [
        "/Work/mobile/Tecfy1.webp",
        "/Work/mobile/Tecfy2.webp",
      ],
      technologies: ["Swift", "SwiftUI", "Firebase", "WebRTC"],
      client: "SocialHub",
      year: "2023",
      description:
        "A modern social networking platform that emphasizes privacy and meaningful connections through innovative features.",
    },
    {
      id: "mobile-4",
      category: "Lifestyle",
      title: "Vibe Messenger",
      details: "Universal communication platform for teams and personal connections.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["React Native", "Node.js", "Socket.io"],
      client: "VibeTech",
      year: "2024",
      description: "A secure and fast messaging application designed for large-scale enterprise communication and social interaction.",
    },
  ];
  
  // Mock data for web projects
  export const webProjects: Project[] = [
    {
      id: "web-1",
      category: "E-Commerce",
      title: "KFrame Store",
      details:
        "Modern e-commerce platform with seamless shopping experience and secure payment integration.",
      tutorialLink: "#",
      mainImage: "/Work/web/kframe long.jpg",
      gallery: [
        "/Work/web/kframe1.png",
        "/Work/web/kframe2.png",
        "/Work/web/kframe3.png",
      ],
      technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
      client: "KFrame",
      year: "2024",
      description:
        "A comprehensive e-commerce solution featuring advanced product filtering, real-time inventory management, and seamless checkout experience.",
      displayUrl: "kframeagency.com",
    },
    {
      id: "web-2",
      category: "E-Commerce",
      title: "SOGC Store",
      details:
        "Premium online shopping destination with curated collections and personalized recommendations.",
      tutorialLink: "#",
      mainImage: "/Work/web/sogc long.jpg",
      gallery: [
        "/Work/web/sogc1.png",
        "/Work/web/sogc2.png",
        "/Work/web/sogc3.png",
        "/Work/web/sogc4.png",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Redux"],
      client: "SOGC",
      year: "2024",
      description:
        "An innovative e-commerce platform that delivers exceptional shopping experiences through AI-powered recommendations and intuitive design.",
      displayUrl: "sogc-construction.com",
    },
    {
      id: "web-3",
      category: "E-Commerce",
      title: "Power Store",
      details: "High-performance e-commerce platform for sports and energy products.",
      tutorialLink: "#",
      mainImage: "/Work/web/power long.jpg",
      gallery: [
        "/Work/web/power1.png",
        "/Work/web/power2.png",
        "/Work/web/power3.png",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify"],
      client: "Power Energy",
      year: "2024",
      description: "A robust and scalable e-commerce solution designed for high-traffic energy drink and fitness supplement sales.",
      displayUrl: "power-energy.com",
    },
    {
      id: "web-4",
      category: "Dashboard",
      title: "OmniAnalytics",
      details: "Universal data visualization platform for enterprise metrics.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["Vue.js", "D3.js", "Firebase"],
      client: "DataCorp",
      year: "2024",
      description: "A centralized dashboard that aggregates data from multiple sources to provide real-time business intelligence.",
      displayUrl: "omnianalytics.ai",
    },
  ];
  
  // Mock data for Costume Solutions projects
  export const costumeSolutionsProjects: Project[] = [
    {
      id: "costume-1",
      category: "Fashion Tech",
      title: "TailorMade AI",
      details: "AI-powered body measurement and suit customization platform for bespoke tailoring.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1594932224010-75b2a77afca0?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1594932224010-75b2a77afca0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["React", "Python", "Computer Vision", "AWS"],
      client: "Bespoke World",
      year: "2024",
      description: "A revolutionary platform that uses computer vision to take accurate body measurements from photos, allowing users to order perfectly fitted suits online.",
    },
    {
      id: "costume-2",
      category: "E-Commerce",
      title: "FabricSync",
      details: "B2B marketplace for connecting fashion designers with sustainable fabric manufacturers.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["Next.js", "Node.js", "GraphQL", "Stripe"],
      client: "EcoFashion Global",
      year: "2023",
      description: "FabricSync simplifies the sourcing process for independent designers, focusing on sustainable and ethically produced textiles with real-time inventory tracking.",
    },
    {
      id: "costume-3",
      category: "Costume Design",
      title: "Virtual Fitting Room",
      details: "AR-based fitting room for trying on virtual costumes in real-time.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["ARCore", "Unity", "React"],
      client: "V-Style",
      year: "2024",
      description: "An innovative mobile application that allows users to try on digital assets and costumes using augmented reality.",
    },
    {
      id: "costume-4",
      category: "Supply Chain",
      title: "ThreadTrack",
      details: "Blockchain-based supply chain management for the textile industry.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["Ethereum", "Solidity", "Node.js"],
      client: "TextileHub",
      year: "2024",
      description: "Ensuring transparency and traceability in the fashion supply chain using distributed ledger technology.",
    },
  ];
  
  // Mock data for CMS projects
  export const CMSProjects: Project[] = [
    {
      id: "CMS-1",
      category: "SaaS",
      title: "Pulse CMS Dashboard",
      details: "Next-gen customer relationship management with integrated real-time communication.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["React", "Go", "Socket.io", "PostgreSQL"],
      client: "GrowthStream",
      year: "2024",
      description: "Pulse CMS centralizes user interactions, featuring a real-time dashboard that tracks customer health and provides AI-driven sentiment analysis.",
    },
    {
      id: "CMS-2",
      category: "Enterprise",
      title: "OmniLink Support Hub",
      details: "Unified support platform that connects email, social media, and chat in one interface.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1556761175-4b46a572b776?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1556761175-4b46a572b776?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["Vue.js", "NestJS", "Redis", "ElasticSearch"],
      client: "GlobalConnect",
      year: "2023",
      description: "A large-scale support solution for multi-national corporations, enabling support agents to manage thousands of cross-channel tickets efficiently.",
    },
    {
      id: "CMS-3",
      category: "Publishing",
      title: "NewsFlow CMS",
      details: "High-traffic content management for digital news outlets.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["Next.js", "Supabase", "Vercel"],
      client: "NewsWorld",
      year: "2024",
      description: "A headless CMS architecture designed for lightning-fast content delivery and seamless editorial workflows.",
    },
    {
      id: "CMS-4",
      category: "Education",
      title: "EduLink Portal",
      details: "Centralized learning management system for universities.",
      tutorialLink: "#",
      mainImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      ],
      technologies: ["React", "Express", "PostgreSQL"],
      client: "UniTech",
      year: "2024",
      description: "A comprehensive platform for course management, student engagement, and academic tracking.",
    },
  ];
  
  // Tab configuration - easily extensible
  export const tabs: TabConfig[] = [
    { id: "web", label: "Web", projects: webProjects },
    { id: "mobile", label: "Mobile", projects: mobileProjects },
    { id: "costume-solutions", label: "Costume Solutions", projects: costumeSolutionsProjects },
    { id: "CMS", label: "CMS", projects: [] }, // CMS tab renders dashboards specially
  ];
