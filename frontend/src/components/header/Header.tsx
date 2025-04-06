import { CircleUserRound, Menu } from 'lucide-react';
import { Title } from '../../ui';
import { Link } from 'react-router-dom';

export const Header = () => {
    const TITLE_PROP = {
        title: 'Manager',
        reveal: false,
    };
    return (
        <div className="bg-primary fixed top-0 flex w-full items-center justify-between px-6 py-2 xl:py-3">
            <Link to="/">
                <Title {...TITLE_PROP} />
            </Link>
            <div className="hidden items-center gap-3 md:flex">
                <Link
                    to="/task-managment"
                    className="text-secondary-content font-bold"
                >
                    TASKS
                </Link>

                <Link to="/profile" className="ml-5">
                    <CircleUserRound size={32} className="text-secondary" />
                </Link>
            </div>
            <Menu className="block md:hidden" />
        </div>
    );
};
