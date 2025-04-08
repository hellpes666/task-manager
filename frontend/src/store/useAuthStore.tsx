import { create } from 'zustand';
import { IAuthUser, IUserData } from '../entity/User.entity';
import { axiosInstance } from '../lib';
import toast from 'react-hot-toast';

interface IAuthState {
    authUser: IAuthUser | null;

    isChekingAuth: boolean;
    isSingningUp: boolean;
    isLoggingIn: boolean;

    signup: (data: IUserData) => void;
    login: (data: Omit<IUserData, 'name' | 'lastName'>) => void;
    logout: () => void;
    checkAuth: () => void;
}

const AUTH_BASE_URL = '/auth';

const isError = (err: unknown): err is Error => {
    return err instanceof Error;
};

const catchBlock = (
    err: unknown,
    toastMessage: string,
    errPlace?: string
): void => {
    if (isError(err)) {
        console.log(`Ошибка ${errPlace ? `в ${errPlace}` : ''}: `, err.message);
    } else {
        console.log(
            `Неизвестная ошибка ${errPlace ? `в ${errPlace}` : ''}: `,
            err
        );
    }

    toast.error(toastMessage);
};

export const useAuthStore = create<IAuthState>((set) => ({
    authUser: null,
    isChekingAuth: true,
    isSingningUp: false,
    isLoggingIn: false,

    signup: async (data) => {
        const res = await axiosInstance.post(AUTH_BASE_URL + '/signup', data);
        set({ isSingningUp: true });

        try {
            set({ authUser: res.data });
            toast.success(res.data.message);
        } catch (error) {
            catchBlock(error, res.data.message, 'signup');
        } finally {
            set({ isSingningUp: false });
        }
    },

    login: async (data) => {
        const res = await axiosInstance.post(AUTH_BASE_URL + '/login', data);
        set({ isLoggingIn: true });
        try {
            set({ authUser: res.data });
            toast.success(res.data.message);
        } catch (error) {
            catchBlock(error, res.data.message, 'login');
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        const res = await axiosInstance.post(AUTH_BASE_URL + '/logout');
        try {
            set({ authUser: null });
            toast.success(res.data.message);
        } catch (error) {
            catchBlock(error, res.data.message, 'logout');
        }
    },
    checkAuth: async () => {
        const res = await axiosInstance.post(AUTH_BASE_URL + '/user');
        set({ isChekingAuth: true });

        try {
            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null });
            catchBlock(error, res.data.message, 'checkAuth');
        } finally {
            set({ isChekingAuth: false });
        }
    },
}));
