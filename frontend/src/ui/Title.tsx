import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ITitle {
    title: string;
    reveal: boolean; // Reveal Animation
    className?: string;
}

export const Title: React.FC<ITitle> = ({ title, reveal, className }) => {
    console.log(reveal);
    return (
        <h2
            className={twMerge(
                'text-secondary-content text-lg font-extrabold md:text-xl xl:text-3xl',
                className
            )}
        >
            {title}
        </h2>
    );
};
