import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Layout } from './ui';
import { AuthPage, MainPage, ProfilePage, TaskManagmentPage } from './pages';
import { useAuthStore } from './store/useAuthStore';
import { JSX, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { IUserData } from './entity/User.entity';
import { Toaster } from 'react-hot-toast';

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log({ authUser });

    if (isCheckingAuth) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    const redirectNotAuthUser = (
        currentStateAuthUser: IUserData | null | boolean,
        component: JSX.Element,
        redirectTo: '/' | '/login'
    ): JSX.Element => {
        return currentStateAuthUser ? component : <Navigate to={redirectTo} />;
    };

    return (
        <Layout>
            <Header />
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={redirectNotAuthUser(
                        authUser,
                        <MainPage />,
                        '/login'
                    )}
                />
				
                <Route
                    path="/task-managment"
                    element={redirectNotAuthUser(
                        authUser,
                        <TaskManagmentPage />,
                        '/login'
                    )}
                />
                <Route
                    path="/profile"
                    element={redirectNotAuthUser(
                        authUser,
                        <ProfilePage />,
                        '/login'
                    )}
                />
                <Route
                    path="/login"
                    element={redirectNotAuthUser(!authUser, <AuthPage />, '/')}
                />
                <Route
                    path="/register"
                    element={redirectNotAuthUser(!authUser, <AuthPage />, '/')}
                />
            </Routes>
        </Layout>
    );
}

export default App;
