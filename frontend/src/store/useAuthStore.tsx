import { create } from 'zustand';
import { IAuthUser, IUserData } from '../entity/User.entity';
import { axiosInstance, catchBlock } from '../lib';
import toast from 'react-hot-toast';

interface IAuthState {
    authUser: IAuthUser | null;

    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;

    signup: (data: IUserData) => void;
    login: (data: Omit<IUserData, 'name' | 'lastName'>) => void;
    logout: () => void;
    checkAuth: () => void;
}

const AUTH_BASE_URL = '/auth';

export const useAuthStore = create<IAuthState>((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post(
                AUTH_BASE_URL + '/signup',
                data
            );
            set({ authUser: res.data });
            toast.success(res.data.message);
        } catch (error) {
            catchBlock(error, 'signup');
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post(
                AUTH_BASE_URL + '/login',
                data
            );
            set({ authUser: res.data });
            toast.success(res.data.message);
        } catch (error) {
            catchBlock(error, 'login');
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post(AUTH_BASE_URL + '/logout');
            set({ authUser: null });
            toast.success(res.data.message);
        } catch (error) {
            catchBlock(error, 'logout');
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get(AUTH_BASE_URL + '/user');
            set({ isCheckingAuth: true });
            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null });

            catchBlock(error, 'check Auth');
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));
