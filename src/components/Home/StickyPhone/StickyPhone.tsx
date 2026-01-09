'use client';

import React from 'react';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ScrollCarousel = () => {
    const t = useTranslations('home');

    // Build sticky scroll content with translations
    const stickyContent = [
        {
            title: t('sticky_title_1'),
            description: (
                <span className='text-xl md:text-2xl font-semibold text-[#86868b]'>
                    {t.raw('sticky_desc_1').split('{highlight}')[0]}
                    <span className="text-white font-bold">{t('sticky_highlight_1')}</span>
                    {t.raw('sticky_desc_1').split('{highlight}')[1]}
                </span>
            ),
            content: (
                <div className="h-full w-full flex items-center justify-center text-white relative">
                    <Image
                        src="/Home/StickyPhone/mopImg1.jpg"
                        alt={t('sticky_title_1')}
                        width={1200}
                        height={800}
                        className="md:h-[80%] w-full object-contain"
                        quality={75}
                    />
                </div>
            ),
        },
        {
            title: t('sticky_title_2'),
            description: (
                <span className='text-xl md:text-2xl font-semibold text-[#86868b]'>
                    {t.raw('sticky_desc_2').split('{highlight}')[0]}
                    <span className="text-white font-bold">{t('sticky_highlight_2')}</span>
                    {t.raw('sticky_desc_2').split('{highlight}')[1]}
                </span>
            ),
            content: (
                <div className="h-full w-full flex items-center justify-center text-white relative">
                    <Image
                        src="/Home/StickyPhone/mopImg2.jpg"
                        alt={t('sticky_title_2')}
                        width={1200}
                        height={800}
                        className="h-[80%] w-full object-contain"
                        quality={75}
                    />
                </div>
            ),
        },
        {
            title: t('sticky_title_3'),
            description: (
                <span className='text-xl md:text-2xl font-semibold text-[#86868b]'>
                    {t.raw('sticky_desc_3').split('{highlight}')[0]}
                    <span className="text-white font-bold">{t('sticky_highlight_3')}</span>
                    {t.raw('sticky_desc_3').split('{highlight}')[1]}
                </span>
            ),
            content: (
                <div className="h-full w-full flex items-center justify-center text-white relative">
                    <Image
                        src="/Home/StickyPhone/mopimg3.jpg"
                        alt={t('sticky_title_3')}
                        width={1200}
                        height={800}
                        className="h-[80%] w-full object-contain"
                        quality={75}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="bg-[#0a0a0a] text-white">
            {/* Sticky Scroll Reveal Section */}
            <section className="md:py-20 bg-[#0a0a0a] w-full md:max-w-[1340px] mx-auto">
                <StickyScroll content={stickyContent} />
            </section>
        </div>
    );
};

export default ScrollCarousel;
