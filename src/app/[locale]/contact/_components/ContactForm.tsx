'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Lottie from 'lottie-react';

export default function ContactForm() {
    const t = useTranslations('contact');
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
                toast.success(t('form.success'), {
                    duration: 4000,
                });
                router.push('/');
            } else {
                toast.error(t('form.error'));
            }
        } catch (error) {
            toast.error(t('form.connectionError'));
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
            <h2 className="text-3xl font-bold mb-8 text-white">{t('form.title')}</h2>

            <form className="space-y-6 flex-1 flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="name" className="text-sm font-bold text-gray-300">{t('form.name.label')}</label>
                            <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">{t('form.name.hint')}</span>
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
                            <label htmlFor="email" className="text-sm font-bold text-gray-300">{t('form.email.label')}</label>
                            <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">{t('form.email.hint')}</span>
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
                        <label className="text-sm font-bold text-gray-300">{t('form.subject.label')}</label>
                        <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">{t('form.subject.hint')}</span>
                    </div>
                    <Select onValueChange={setSubject} required disabled={isSubmitting}>
                        <SelectTrigger className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-white focus:ring-white/20 uppercase font-bold tracking-tight">
                            <SelectValue placeholder={t('form.subject.placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#101217] border-white/10 text-white rounded-2xl">
                            <SelectItem value="general">{t('form.subject.options.general')}</SelectItem>
                            <SelectItem value="project">{t('form.subject.options.project')}</SelectItem>
                            <SelectItem value="support">{t('form.subject.options.support')}</SelectItem>
                            <SelectItem value="feedback">{t('form.subject.options.feedback')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Message Field */}
                <div className="space-y-2 flex-1 flex flex-col">
                    <div className="flex justify-between items-center">
                        <label htmlFor="message" className="text-sm font-bold text-gray-300">{t('form.message.label')}</label>
                        <span className="text-[10px] bg-white/5 text-gray-500 px-3 py-1 rounded-full font-medium border border-white/5">{t('form.message.hint')}</span>
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
                            bg-[#eeeeee] hover:bg-white 
                            border border-white/10
                            text-black font-extrabold text-sm tracking-wider uppercase
                            shadow-[0_5px_0_0_#bebebe]
                            hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#bebebe]
                            active:translate-y-1 active:shadow-none
                            transition-all duration-100 ease-out
                            flex items-center justify-center
                            disabled:opacity-50 disabled:cursor-not-allowed
                            group
                        `}
                    >
                        <span className="text-sm relative font-bold uppercase tracking-widest text-black flex items-center justify-center gap-3">
                            {isSubmitting ? (
                                <>
                                    {t('form.sending')}
                                    <Image src="/Home/infinity.apng" alt="Infinity" width={24} height={24} className='object-contain w-6 h-6' unoptimized />
                                </>
                            ) : (
                                <>
                                    {t('form.submit')}
                                    <Image src="/Home/infinity.apng" alt="Infinity" width={24} height={24} className='object-contain w-6 h-6' unoptimized />
                                </>
                            )}
                        </span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
