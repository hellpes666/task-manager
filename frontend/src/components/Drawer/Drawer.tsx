import React from 'react';

interface IDrawerProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export const Drawer: React.FC<IDrawerProps> = ({ children, onClose }) => {
    return (
        <div className="bg-base-300 fixed top-0 right-0 z-5 flex h-screen w-screen items-center justify-end overflow-hidden">
            <div className="bg-accent h-screen">{children}</div>
        </div>
    );
};
