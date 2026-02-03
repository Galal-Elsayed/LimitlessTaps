"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FloatingIcons() {
    return (
        <div className="fixed bottom-24 md:bottom-40 right-0 w-32 md:w-48 z-50 flex items-end justify-between px-2 md:px-6 pointer-events-none pb-4">
            {/* WhatsApp Action - Left Shoulder */}
            <motion.a
                href="https://wa.me/201050038476"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -5, 0], // Floating animation
                }}
                transition={{
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-7 h-7 md:w-9 md:h-9 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg border border-white/10 pointer-events-auto cursor-pointer"
                title="WhatsApp"
            >
                <Image
                    src="/FloatingRobot/whatsapp.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5 md:w-6 md:h-6"
                />
                {/* Tooltip Tail */}
                <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-[#25D366]" />
            </motion.a>

            {/* Messenger Action - Right Shoulder */}
            <motion.a
                href="https://www.messenger.com/t/901227719742650"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -5, 0], // Floating animation
                }}
                transition={{
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-7 h-7 md:w-9 md:h-9 bg-[#0060cd] rounded-full flex items-center justify-center text-white shadow-lg border border-white/10 pointer-events-auto cursor-pointer"
                title="Messenger"
            >
                <Image
                    src="/FloatingRobot/messenger.svg"
                    alt="Messenger"
                    width={20}
                    height={20}
                    className="w-5 h-5 md:w-6 md:h-6"
                />
                {/* Tooltip Tail */}
                <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-[#0060cd]" />
            </motion.a>
        </div>
    );
}
