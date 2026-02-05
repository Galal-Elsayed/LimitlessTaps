'use client';

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter, usePathname } from '@/i18n/routing';

export interface DropdownItem {
    key: string;
    title: string;
    description?: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface NavDropdownProps {
    isOpen: boolean;
    items: DropdownItem[];
    isRTL: boolean;
    onClose: () => void;
    className?: string;
    align?: 'center' | 'start' | 'end';
    viewAllLink?: {
        href: string;
        title: string;
        description?: string;
    };
}

export function NavDropdown({ isOpen, items, isRTL, onClose, className = '', align = 'center', viewAllLink }: NavDropdownProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Positioning classes based on alignment
    const positionClasses = {
        center: 'left-1/2 -translate-x-1/2', // Always physically center relative to parent
        start: isRTL ? 'right-0' : 'left-0',
        end: isRTL ? 'left-0' : 'right-0',
    };

    // Fix: Simple centering or edge alignment
    let alignmentClass = positionClasses.center;
    if (align === 'start') alignmentClass = positionClasses.start;
    if (align === 'end') alignmentClass = positionClasses.end;

    // RTL override for language switcher specifically handles its own logic via 'align' prop now.

    return (
        <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
        >
            <div
                className={`
                    absolute z-50 pt-2 px-4
                    ${alignmentClass}
                    ${className}
                `}
                onMouseEnter={() => { }} // Keep open on hover
                onMouseLeave={onClose} // Close on leave
            >
                {/* 
                  Dropdown Panel 
                  Style: Dark gray background with subtle radial glow in the middle.
                  Based on: "gray with light glowing in the middle"
                */}
                <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-[#0a0a0a] relative">

                    {/* Radial Glow Background Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)'
                        }}
                    />

                    {/* Glassmorphism / Blur layer */}
                    <div className="relative bg-white/5 backdrop-blur-xl p-2">
                        <div className="flex flex-col gap-1">
                            {/* View All Link - Top Item (styled like other items) */}
                            {viewAllLink && (
                                <a
                                    onClick={() => {
                                        router.push(viewAllLink.href);
                                        onClose();
                                    }}
                                    className={`
                                        group flex items-start gap-4 rounded-lg p-3 
                                        transition-colors duration-200 cursor-pointer
                                        ${pathname === viewAllLink.href
                                            ? 'bg-white/15'
                                            : 'hover:bg-white/10'}
                                    `}
                                >
                                    <div className="flex-auto">
                                        <p className={`block font-semibold text-md transition-colors ${pathname === viewAllLink.href ? 'text-white' : 'text-gray-100 group-hover:text-white'}`}>
                                            {viewAllLink.title}
                                        </p>
                                        {viewAllLink.description && (
                                            <p className="mt-1 text-sm text-gray-400 group-hover:text-gray-300">
                                                {viewAllLink.description}
                                            </p>
                                        )}
                                    </div>
                                </a>
                            )}

                            {items.map((link) => (
                                <a
                                    key={link.key}
                                    onClick={() => {
                                        router.push(link.href);
                                        onClose();
                                    }}
                                    className="group flex items-start gap-4 rounded-lg p-3 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                                >
                                    {/* Icon Placeholder */}
                                    {link.icon && (
                                        <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 group-hover:ring-white/20 transition-all">
                                            <link.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                                        </div>
                                    )}

                                    <div className="flex-auto">
                                        <p className="block font-semibold text-md text-gray-100 group-hover:text-white transition-colors">
                                            {link.title}
                                        </p>
                                        {link.description && (
                                            <p className="mt-1 text-sm text-gray-400 group-hover:text-gray-300">
                                                {link.description}
                                            </p>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
