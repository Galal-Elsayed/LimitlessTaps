'use client';

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

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
}

export function NavDropdown({ isOpen, items, isRTL, onClose, className = '' }: NavDropdownProps) {
    const router = useRouter();

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
                    absolute left-1/2 -translate-x-1/2 z-50 pt-2 w-screen max-w-sm px-4
                    ${isRTL ? 'right-0 translate-x-0' : ''}
                    ${className}
                `}
                onMouseEnter={() => { }} // Keep open on hover
                onMouseLeave={onClose} // Close on leave (if handled by parent's delay, this might be redundant but safe)
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
                                        <p className="block font-semibold text-sm text-gray-100 group-hover:text-white transition-colors">
                                            {link.title}
                                        </p>
                                        {link.description && (
                                            <p className="mt-1 text-xs text-gray-400 group-hover:text-gray-300">
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
