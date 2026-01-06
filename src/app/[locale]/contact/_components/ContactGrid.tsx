'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    Linkedin,
    Instagram,
    Mail,
    ExternalLink,
    Facebook
} from 'lucide-react';

const WhatsAppSVG = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor" />
    </svg>
);

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    href: string;
    color: string;
    iconColor: string;
    delay: number;
    className?: string;
    isLarge?: boolean;
}

const ContactCard = ({ icon, title, description, href, color, iconColor, delay, className = "", isLarge = false }: ContactCardProps) => (
    <motion.a
        href={href}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{
            y: -5,
            transition: { duration: 0.2 }
        }}
        className={`relative group overflow-hidden mx-4 ${isLarge ? 'p-8' : 'p-4 md:p-6'} rounded-[1.5rem] md:rounded-[2.5rem] bg-[#101217]/50 border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center text-center gap-2 md:gap-4 hover:border-white/20 transition-all duration-500 shadow-xl ${className}`}
    >
        {/* Animated Glow Background */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-linear-to-br ${color} blur-3xl -z-10`} />

        <div className={`relative z-10 p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 transition-all duration-500 group-hover:scale-110 ${iconColor}`}>
            {React.cloneElement(icon as React.ReactElement<any>, { className: isLarge ? "w-10 h-10 md:w-12 md:h-12" : "w-7 h-7 md:w-10 md:h-10" })}
        </div>

        <div className="relative z-10">
            <h3 className={`font-bold text-white tracking-tight transition-colors ${isLarge ? 'text-xl md:text-2xl' : 'text-sm md:text-lg'}`}>{title}</h3>
            {description && (
                <p className="text-gray-400 mt-1 md:mt-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-wrap text-[10px] md:text-sm">
                    {description}
                </p>
            )}
        </div>

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500">
            <ExternalLink className="w-5 h-5 text-white/40" />
        </div>
    </motion.a>
);

export default function ContactGrid() {
    const t = useTranslations('contact');

    const mainCards = [
        {
            icon: <Linkedin />,
            title: "LinkedIn",
            href: "https://linkedin.com/limitlesstaps",
            color: "from-blue-600/50 to-blue-800/50",
            iconColor: "text-[#0077b5]",
        },
        {
            icon: <Instagram />,
            title: "Instagram",
            href: "https://instagram.com/limitlesstaps",
            color: "from-pink-500/50 to-rose-500/50",
            iconColor: "text-[#e4405f]",
        },
        {
            icon: <Facebook />,
            title: "Facebook",
            href: "https://facebook.com/limitlesstaps",
            color: "from-blue-500/50 to-blue-700/50",
            iconColor: "text-[#1877f2]",
        },

        {
            icon: <WhatsAppSVG />,
            title: "WhatsApp",
            description: t('grid.whatsApp.description'),
            href: "https://wa.me/yournumber",
            color: "from-green-500/50 to-green-700/50",
            iconColor: "text-[#25d366]",
        },
    ];

    const emailSection = [
        {
            icon: <Mail />,
            title: t('grid.proposals.title'),
            description: "info@limitlesstaps.com",
            href: "mailto:info@limitlesstaps.com",
            color: "from-orange-500/50 to-amber-500/50",
            iconColor: "text-[#f59e0b]",
        },
        {
            icon: <Mail />,
            title: t('grid.inquiries.title'),
            description: "support@limitlesstaps.com",
            href: "mailto:support@limitlesstaps.com",
            color: "from-purple-500/50 to-indigo-500/50",
            iconColor: "text-[#a855f7]",
        }
    ];

    return (
        <div className="flex flex-col gap-4 w-full h-full justify-between">
            {/* Main Grid: 2-2-1 layout */}
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    {mainCards.slice(0, 2).map((card, idx) => (
                        <ContactCard key={idx} {...card} delay={0.2 + idx * 0.1} />
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {mainCards.slice(2, 4).map((card, idx) => (
                        <ContactCard key={idx + 2} {...card} delay={0.4 + idx * 0.1} />
                    ))}
                </div>
                <div className="w-full ">
                    {mainCards.slice(4, 5).map((card, idx) => (
                        <ContactCard key={idx + 4} {...card} delay={0.6} className=" " />
                    ))}
                </div>
            </div>

            {/* Separator Line */}
            <div className="relative ">
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                <div className="relative flex justify-center">
                    <span className="bg-[#0a0a0a] px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">{t('grid.separator')}</span>
                </div>
            </div>

            {/* Email Section: 2 columns */}
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    {emailSection.map((card, idx) => (
                        <ContactCard key={idx} {...card} delay={0.7 + idx * 0.1} iconColor={card.iconColor} />
                    ))}
                </div>
            </div>
        </div>
    );
}

