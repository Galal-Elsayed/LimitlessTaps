'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    const t = useTranslations('contact');

    const scrollToHero = () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const faqItems = [0, 1, 2, 3, 4].map((i) => ({
        question: t(`faq.items.${i}.question`),
        answer: t(`faq.items.${i}.answer`)
    }));

    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            {/* Part 1: Header */}
            <div className="flex flex-col items-center text-center mb-20">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 rounded-md bg-white text-black text-[10px] font-bold uppercase tracking-widest mb-6"
                >
                    {t('faq.badge')}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                >
                    {t('faq.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl"
                >
                    {t('faq.description')}
                </motion.p>
            </div>

            {/* Part 2: Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col h-full justify-center"
                >
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{t('faq.sidebar.title')}</h3>
                    <h4 className="text-3xl md:text-4xl font-bold text-gray-500 mb-8">{t('faq.sidebar.subtitle')}</h4>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-md">
                        {t.rich('faq.sidebar.description', {
                            supportTeam: (chunks) => (
                                <span
                                    onClick={scrollToHero}
                                    className="underline decoration-gray-500 underline-offset-8 cursor-pointer hover:text-white transition-colors"
                                >
                                    {chunks}
                                </span>
                            )
                        })}
                    </p>
                </motion.div>

                {/* Right Side: Accordion */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full flex flex-col h-full justify-center"
                >
                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {faqItems.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-white/5">
                                <AccordionTrigger className="text-base md:text-lg font-bold text-white py-6 hover:no-underline transition-all group">
                                    <span className="group-hover:translate-x-1 transition-transform text-left rtl:text-right">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-8">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}

