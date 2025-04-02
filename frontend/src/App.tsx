import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Layout } from './ui';
import { MainPage } from './pages';

function App() {
    return (
        <Layout>
            <Header />

            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
