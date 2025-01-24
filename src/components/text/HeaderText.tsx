// import React from "react";

// interface HeaderTextProps {
//     size?: "small" | "medium" | "large";
//     children: React.ReactNode;
//     className?: string; // Allow additional Tailwind classes
// }

// const HeaderText: React.FC<HeaderTextProps> = ({size = "medium", children, className}) => {
//     const sizeClasses = {
//         small: "text-2xl md:text-3xl lg:text-4xl", // Mobile: 2xl, Tablet: 3xl, Desktop: 4xl
//         medium: "text-3xl md:text-4xl lg:text-5xl", // Mobile: 3xl, Tablet: 4xl, Desktop: 5xl
//         large: "text-4xl md:text-5xl lg:text-6xl", // Mobile: 4xl, Tablet: 5xl, Desktop: 6xl
//     };

//     return (
//         <h1 className={`${sizeClasses[size]} font-heading font-normal leading-snug md:leading-loose ${className}`}>
//             {children}
//         </h1>
//     );
// };

// export default HeaderText;


import React from "react";

interface HeaderTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
    className?: string; // Allow additional Tailwind classes
}

const HeaderText: React.FC<HeaderTextProps> = ({
    size = "medium",
    children,
    className,
    ...props // Capture all other props
}) => {
    const sizeClasses = {
        small: "text-2xl md:text-3xl lg:text-4x font-normall", // Mobile: 2xl, Tablet: 3xl, Desktop: 4xl
        medium: "text-3xl md:text-4xl lg:text-5xl font-normal", // Mobile: 3xl, Tablet: 4xl, Desktop: 5xl
        large: "text-4xl md:text-5xl lg:text-6xl font-semibold", // Mobile: 4xl, Tablet: 5xl, Desktop: 6xl
    };

    return (
        <h1
            className={`${sizeClasses[size]} font-heading  leading-snug md:leading-loose ${className}`}
            {...props} // Spread all other props
        >
            {children}
        </h1>
    );
};

export default HeaderText;
