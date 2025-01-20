import React from "react";

interface SecondaryTextProps {
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
    className?: string; // Allow additional Tailwind classes
}

const SecondaryText: React.FC<SecondaryTextProps> = ({size = "medium", children, className}) => {
    const sizeClasses = {
        small: "text-sm md:text-base lg:text-lg font-body", // Mobile: sm, Tablet: base, Desktop: lg
        medium: "text-base md:text-lg lg:text-xl font-body", // Mobile: base, Tablet: lg, Desktop: xl
        large: "text-lg md:text-xl lg:text-2xl font-secHeading", // Mobile: lg, Tablet: xl, Desktop: 2xl
    };

    return (
        <p className={`${sizeClasses[size]} font-light text-gray-600 ${className}`}>
            {children}
        </p>
    );
};

export default SecondaryText;
