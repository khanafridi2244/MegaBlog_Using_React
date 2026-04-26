import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "",
    textColor = "text-white",
    className = "",
    ...props
}) {
    const baseClasses = "px-5 py-2.5 rounded-xl font-medium btn-press shadow-md hover:shadow-lg transition-all duration-200";
    const colorClasses = bgColor
        ? `${bgColor} ${textColor}`
        : `gradient-primary text-white hover:opacity-90`;

    return (
        <button
            type={type}
            className={`${baseClasses} ${colorClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
