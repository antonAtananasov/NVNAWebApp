import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import DocumentEditor from './components/DocumentEditor';
import LoginSignup from './components/LoginSignup';
import EditUser from './components/EditUser';
import Home from './components/Home';
import NotFound from './components/NotFound';
import FileManager from './components/FileManager';
import Footer from './components/Footer'; // Импортиране на футъра
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Main />
            </Router>
            <Footer /> {/* Добавяне на футъра */}
        </>
    );
};

const Main: React.FC = () => {
    return (
        <>
            {true && <NavBar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<DocumentEditor />} />
                <Route path="/login-signup" element={<LoginSignup />} />
                <Route path="/edit-user" element={<EditUser onClose={undefined} />} />
                <Route path="/documents" element={<FileManager />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
