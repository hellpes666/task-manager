import { ReactNode } from 'react';
import { Title } from '../../../ui';

interface IModalLayoutProps {
    title: string;
    children: ReactNode;
    toggleModal: () => void;
    onSubmit: () => void;
}

export const ModalLayout = ({
    title,
    children,
    toggleModal,
    onSubmit,
}: IModalLayoutProps) => (
    <div className="modal modal-open sm:modal-middle">
        <div className="modal-box max-h-[90vh] overflow-y-auto">
            <div className="modal-header mb-4 flex items-center justify-between">
                <Title
                    title={title}
                    reveal={false}
                    className="text-xl font-bold"
                />
                <button className="btn btn-circle btn-sm" onClick={toggleModal}>
                    ✕
                </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                {children}

                <div className="modal-action flex justify-end gap-2">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={toggleModal}
                    >
                        Отмена
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Создать
                    </button>
                </div>
            </form>
        </div>
    </div>
);
