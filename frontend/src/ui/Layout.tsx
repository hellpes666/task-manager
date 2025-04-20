import React from 'react';

interface ILayout {
    children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col items-center gap-6 overflow-hidden px-6 pt-20 md:px-18 xl:px-24">
            {children}
        </div>
    );
};
