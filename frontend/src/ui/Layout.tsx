import React from 'react';

interface ILayout {
    children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col items-center gap-6 px-12 pt-16 md:px-18 md:pt-0 xl:px-24">
            {children}
        </div>
    );
};
