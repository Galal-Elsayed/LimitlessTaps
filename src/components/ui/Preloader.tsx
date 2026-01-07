"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "./spinner";

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        if (isLoading) {
            document.body.style.overflow = "hidden";
        }

        // Simulate core loading / wait for initial render
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 2000); // reduced duration

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, [isLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
                >
                    {/* Ambient Center Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,143,152,0.15)_0%,transparent_60%)] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-[70vw] max-w-[1000px] aspect-[2/1] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
                    >
                        <Spinner
                            width="100%"
                            height="100%"
                            color="#ffffff"
                            duration={2.5}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
