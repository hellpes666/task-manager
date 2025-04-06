import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Layout } from './ui';
import { MainPage, TaskManagmentPage } from './pages';

function App() {
    return (
        <Layout>
            <Header />

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/task-managment" element={<TaskManagmentPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
