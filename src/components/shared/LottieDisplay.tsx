'use client';

import Lottie from 'lottie-react';
import animation1 from '../../../public/Lottie/Animation_2.json';
import animation2 from '../../../public/Lottie/data.json';
import { motion } from 'framer-motion';

export default function LottieDisplay() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20 px-4 md:px-0">
            {/* Animation 1 Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
            >
                <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-8 rounded-[2rem] bg-[#101217]/50 border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-full max-w-sm transform group-hover:scale-105 transition-transform duration-500">
                        <Lottie animationData={animation1} loop={true} />
                    </div>
                </div>
            </motion.div>

            {/* Animation 2 Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative"
            >
                <div className="absolute -inset-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-8 rounded-[2rem] bg-[#101217]/50 border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-full max-w-sm transform group-hover:scale-105 transition-transform duration-500">
                        <Lottie animationData={animation2} loop={true} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
