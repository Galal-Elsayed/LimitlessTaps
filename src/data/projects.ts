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
    playStoreLink?: string;
    appStoreLink?: string;
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
        title: "Shop and Ship",
        description:
            "Global shipping and shopping platform by Aramex. Shop from US, UK, and more with convenient delivery to your doorstep.",
        category: "mobile_apps",
        tags: ["Shipping", "E-commerce"],
        highlight: "Shipping",
        status: "Live",
        image: "/Projects/mobile/shop&ship1.webp",
        playStoreLink: "https://play.google.com/store/apps/details?id=net.aramex.sas&hl=en",
        appStoreLink: "https://apps.apple.com/eg/app/shop-and-ship/id530961000",
    },
    {
        id: "m2",
        title: "Bluworks",
        description:
            "Modern workforce management platform. Connect employers with blue-collar workers for seamless job matching.",
        category: "mobile_apps",
        tags: ["HR", "Jobs"],
        highlight: "Workforce",
        status: "Live",
        image: "/Projects/mobile/bluworks1.webp",
        playStoreLink: "https://play.google.com/store/apps/details?id=com.bluworks&hl=en",
        appStoreLink: "https://apps.apple.com/eg/app/bluworks/id6449738685",
    },
    {
        id: "m3",
        title: "Tecfy POS",
        description:
            "Point of sale and market operation management. Streamline your retail business with powerful inventory and sales tracking.",
        category: "mobile_apps",
        tags: ["POS", "Retail"],
        highlight: "POS",
        status: "Live",
        image: "/Projects/mobile/tecfy.webp",
        playStoreLink: "https://play.google.com/store/apps/details?id=co.tecfy.market.operation.android&hl=en",
        appStoreLink: "https://apps.apple.com/eg/app/tecfy-pos-operation/id1555474350",
    },

    // Dashboards
    {
        id: "d1",
        title: "Isomorphic",
        description: "A comprehensive admin dashboard template featuring Next.js, React, and Tailwind CSS. Clean, modern, and highly customizable.",
        category: "dashboards",
        tags: ["NextJS", "React", "TailwindCSS", "Admin"],
        highlight: "Admin Template",
        status: "Live",
        image: "/Projects/dashboard/dashboard.png",
        link: "https://isomorphic-furyroad.vercel.app/",
    },
];
