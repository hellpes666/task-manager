import React from 'react';

interface IDrawerProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export const Drawer: React.FC<IDrawerProps> = ({
    isOpen,
    children,
    onClose,
}) => {
    return (
        <div className="">
            <div className="" onClick={onClose}>
                X
            </div>
            <div className="">{children}</div>
        </div>
    );
};
