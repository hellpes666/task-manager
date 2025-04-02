import { Menu } from 'lucide-react';
import { Title } from '../../ui';

export const Header = () => {
    const TITLE_PROP = {
        title: 'Manager',
        reveal: false,
    };
    return (
        <div className="bg-primary fixed top-0 flex w-full items-center justify-between px-6 py-2 md:sticky md:flex md:justify-center md:rounded-b-2xl xl:py-3">
            <Title {...TITLE_PROP} />
			<div className="flex items-center gap-3">
				
			</div>
            <Menu className="block md:hidden" />
        </div>
    );
};
