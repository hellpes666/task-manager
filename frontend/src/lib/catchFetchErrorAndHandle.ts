import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const isError = (err: unknown): err is AxiosError => {
    return err instanceof AxiosError;
};

export const catchBlock = (err: unknown, errPlace?: string): void => {
    if (isError(err)) {
        console.log(`Ошибка ${errPlace ? `в ${errPlace}` : ''}: `, err.message);
		
        toast.error(err.response?.data?.message || 'Неизвестная ошибка');
    } else {
        console.log(
            `Неизвестная ошибка ${errPlace ? `в ${errPlace}` : ''}: `,
            err
        );
    }
};
