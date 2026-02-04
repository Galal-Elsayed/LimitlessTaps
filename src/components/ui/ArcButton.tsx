"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArcButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "light" | "dark";
    size?: "sm" | "md" | "lg";
    radius?: string;
    href?: string;
    className?: string;
    children: React.ReactNode;
}

export function ArcButton({
    variant = "light",
    size = "lg",
    radius = "rounded-full",
    href,
    className,
    children,
    ...props
}: ArcButtonProps) {
    const baseStyles =
        "group relative inline-flex items-center justify-center overflow-hidden font-extrabold tracking-widest uppercase transition-all duration-100 ease-out hover:translate-y-0.5 active:shadow-none active:translate-y-1 border border-white/10";

    const variants = {
        light:
            "bg-[#eeeeee] text-black shadow-[0_5px_0_0_#bebebe] hover:bg-white hover:shadow-[0_2px_0_0_#bebebe,0_0_20px_rgba(255,255,255,0.4)]",
        dark:
            "bg-neutral-900 text-white shadow-[0_5px_0_0_#262626] hover:bg-neutral-900/80 hover:shadow-[0_2px_0_0_#262626]",
    };

    const sizes = {
        sm: "h-10 px-5 text-xs",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
    };

    const combinedClassName = cn(
        baseStyles,
        variants[variant],
        radius,
        className
    );

    const content = (
        <>
            <div className={cn("absolute inset-0 bg-linear-to-tr from-zinc-100 via-white to-zinc-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100", variant !== "light" && "hidden")} />
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <div className={cn("absolute inset-0 -z-10 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:animate-shine", variant !== "light" && "hidden")} />
        </>
    );

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {content}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {content}
        </button>
    );
}
