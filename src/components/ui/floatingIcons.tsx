"use client";

import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function FloatingIcons() {
    return (
        <div className="fixed bottom-28 md:bottom-48 right-0 w-40 md:w-60 z-50 flex items-end justify-between px-2 md:px-8 pointer-events-none pb-4">
            {/* WhatsApp Action - Left Shoulder */}
            <motion.a
                href="https://wa.me/201050038476"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -5, 0] // Floating animation
                }}
                transition={{
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-10 h-10 md:w-12 md:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg border border-white/10 pointer-events-auto cursor-pointer"
                title="WhatsApp"
            >
                <IconBrandWhatsapp size={24} stroke={1.5} />
                {/* Tooltip Tail */}
                <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#25D366]" />
            </motion.a>

            {/* Email Action - Right Shoulder */}
            <motion.a
                href="mailto:info@limitlesstaps.com"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -5, 0] // Floating animation
                }}
                transition={{
                    y: {
                        duration: 3.5, // Slightly different duration for organic feel
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                    }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-10 h-10 md:w-12 md:h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white shadow-lg border border-white/10 hover:bg-neutral-800 transition-colors duration-300 pointer-events-auto cursor-pointer"
                title="Email"
            >
                <IconMail size={24} stroke={1.5} />
                {/* Tooltip Tail */}
                <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-neutral-900 group-hover:border-t-neutral-800 transition-colors duration-300" />
            </motion.a>
        </div>
    );
}
