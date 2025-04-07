import { useCallback, useEffect, useState } from 'react';

export const useOpenModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const toggleModal = useCallback(() => {
        setIsOpenModal((prev) => !prev);
    }, []);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') toggleModal();
        },
        [toggleModal]
    );

    useEffect(() => {
        if (isOpenModal) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpenModal, handleKeyDown]);

    return {
        isOpenModal,
        toggleModal,
    };
};
