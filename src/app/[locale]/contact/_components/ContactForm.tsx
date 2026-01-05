'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        // Add subject manually since Shadcn Select doesn't use standard hidden input by default in some versions
        formData.set("subject", subject);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formspree.io/f/xgovralw", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast.success("Message sent successfully! We'll get back to you soon.", {
                    duration: 4000,
                });
                router.push('/');
            } else {
                toast.error("Failed to send message. Please try again later.");
            }
        } catch (error) {
            toast.error("An error occurred. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full p-8 rounded-[2rem] bg-[#101217]/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col text-white"
        >
            <h2 className="text-3xl font-bold mb-8 text-white">Send us a Message</h2>

            <form className="space-y-6 flex-1 flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="name" className="text-sm font-bold text-gray-300">Full Name</label>
                            <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">Enter full name</span>
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            disabled={isSubmitting}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 h-14"
                            placeholder=""
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="email" className="text-sm font-bold text-gray-300">Email Address</label>
                            <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">We'll reply here</span>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={isSubmitting}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 h-14"
                            placeholder=""
                        />
                    </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-gray-300">Subject</label>
                        <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">Choose a topic</span>
                    </div>
                    <Select onValueChange={setSubject} required disabled={isSubmitting}>
                        <SelectTrigger className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-white focus:ring-white/20 uppercase font-bold tracking-tight">
                            <SelectValue placeholder="INQUIRY" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#101217] border-white/10 text-white rounded-2xl">
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="project">Project Proposal</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Message Field */}
                <div className="space-y-2 flex-1 flex flex-col">
                    <div className="flex justify-between items-center">
                        <label htmlFor="message" className="text-sm font-bold text-gray-300">Message</label>
                        <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">Write details here</span>
                    </div>
                    <div className="relative flex-1 flex flex-col">
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            disabled={isSubmitting}
                            value={message}
                            onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                            className="w-full h-full min-h-[150px] bg-white/5 border border-white/10 rounded-3xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none disabled:opacity-50"
                            placeholder=""
                        ></textarea>
                        <div className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-500">
                            {message.length}/1000
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            w-full px-4 py-4 rounded-lg 
                            bg-white/10 hover:bg-white/20 
                            border border-white/20 hover:border-white/40
                            transition-all duration-300
                            flex items-center justify-center
                            backdrop-blur-sm
                            shadow-[0_4px_0_0_rgba(255,255,255,0.2)]
                            hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(255,255,255,0.2)]
                            active:translate-y-[4px] active:shadow-none
                            disabled:opacity-50 disabled:cursor-not-allowed
                            group
                        `}
                    >
                        <span className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-3">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    SEND MESSAGE
                                    <SendHorizontal className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:-rotate-30 transition-all duration-300" />
                                </>
                            )}
                        </span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
