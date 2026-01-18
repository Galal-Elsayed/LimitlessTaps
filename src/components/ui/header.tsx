import { cn } from "@/lib/utils";
import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
    title?: string;
    className?: string; // Allow overriding styles
}

export const Header = ({
    title = "EVERY SCREEN. EVERY PIXEL.",
    className,
    ...props
}: HeaderProps) => {
    return (
        <h2
            className={cn(
                // Base styles
                "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase",
                // Gradient Text Effect
                "text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40",
                // Shadow for depth (optional but often in these designs)
                "drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]",
                className
            )}
            {...props}
        >
            {title}
        </h2>
    );
};

export default Header;
