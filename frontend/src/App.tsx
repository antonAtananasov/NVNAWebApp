import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import DocumentEditor from './components/DocumentEditor';
import LoginSignup from './components/LoginSignup';
import EditUser from './components/EditUser';
import Home from './components/Home';
import NotFound from './components/NotFound';
import FileManager from './components/FileManager';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IUserSession } from './dtos/dtos';
import { SessionContext } from './dtos/extras';
import Cookies from 'js-cookie'

const App: React.FC = () => {
    const [session, setSession] = useState<IUserSession | undefined>(undefined)
    useEffect(() => {
        setSession(() => JSON.parse(Cookies.get('session')!) as IUserSession)
    }, [])
    return (
        <>
            <SessionContext.Provider value={{ session, setSession }}>
                <Router>
                    <NavBar />
                    <Main />
                    <Footer />
                </Router>
            </SessionContext.Provider>
        </>
    );
};


const Main: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/edit" element={<DocumentEditor />} />
                <Route path="/edit/*" element={<DocumentEditor />} />
                <Route path="/" element={<LoginSignup />} />
                <Route path="/edit-user" element={<EditUser />} />
                <Route path="/documents" element={<FileManager />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
