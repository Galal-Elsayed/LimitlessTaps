'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is a FAQ and why is it important?",
        answer: "A FAQ (Frequently Asked Questions) section is a collection of commonly asked questions and their answers. It is important because it provides quick information to users, reduces the support workload, and improves the overall user experience."
    },
    {
        question: "Why should I use a FAQ on my website or app?",
        answer: "Using a FAQ section helps build trust with your users, improves SEO by providing relevant content, and helps users find answers to their questions without needing to contact support directly."
    },
    {
        question: "How do I effectively create a FAQ section?",
        answer: "To create an effective FAQ section, identify the most common questions your users ask, keep the answers concise and easy to understand, and organize the questions into logical categories."
    },
    {
        question: "What are the benefits of having a well-maintained FAQ section?",
        answer: "A well-maintained FAQ section can lead to higher customer satisfaction, better conversion rates, and a reduction in repeat inquiries to your support team."
    },
    {
        question: "How can I update my FAQ section as my platform grows?",
        answer: "Regularly review your support tickets and user feedback to identify new questions. Update your FAQ section periodically to ensure the information remains accurate and relevant to your evolving platform."
    }
];

export default function FAQ() {
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
                    FAQ
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                >
                    Common Questions & Answers
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl"
                >
                    Find out all the essential details about our platform and how it can serve your needs.
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
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">Need Help?</h3>
                    <h4 className="text-3xl md:text-4xl font-bold text-gray-500 mb-8">We&apos;re here to assist.</h4>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-md">
                        Still have questions? Feel free to contact our friendly <span className="underline decoration-gray-500 underline-offset-8 cursor-pointer hover:text-white transition-colors">support team</span> specialists.
                    </p>
                    <div>
                        <button className="px-8 py-4 rounded-xl bg-[#101217] border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all duration-300 shadow-2xl active:scale-95">
                            View all FAQs
                        </button>
                    </div>
                </motion.div>

                {/* Right Side: Accordion */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full flex flex-col h-full justify-center"
                >
                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-white/5">
                                <AccordionTrigger className="text-base md:text-lg font-bold text-white py-6 hover:no-underline transition-all group">
                                    <span className="group-hover:translate-x-1 transition-transform">{faq.question}</span>
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
