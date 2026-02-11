import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    label: string;
    color?: string;
    size?: 'sm' | 'md' | 'lg'
}


export const button = ({
    label,
    color = 'bg-blue-500',
    size = 'md',
    className = '',
    ...rest
}:ButtonProps) => {
    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`${color} text-white rounded-md font-medium hover:brightness-90 transition ${sizeClasses[size]} ${classname}`}
            {...rest}
        >
            {label}
        </button>
    );
};