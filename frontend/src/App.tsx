import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import DocumentEditor from './components/DocumentEditor';
import LoginSignup from './components/LoginSignup';
import Home from './components/Home';
import NotFound from './components/NotFound';
import FileManager from './components/FileManager';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IUserSession } from './dtos/dtos';
import { INotification, NotificationContext, SessionContext } from './dtos/extras';
import Cookies from 'js-cookie'
import Notification from './components/Notification'

const App: React.FC = () => {
    const [session, setSession] = useState<IUserSession | undefined>(undefined)
    const [notificationVisible, setNotificationVisible] = useState<boolean>(false)
    const [notification, setNotification] = useState<INotification | undefined>(undefined)

    useEffect(() => {
        setSession(() => JSON.parse(Cookies.get('session')!) as IUserSession)
    }, [document.cookie])


    useEffect(() => {
        if (!notification)
            setNotificationVisible(false)
        setNotificationVisible(true)
        setTimeout(() => {
            setNotificationVisible(false)
        }, 1000 + notification?.message.length! / 30 * 1000)
    }, [notification])

    return (
        <>
            <SessionContext.Provider value={{ session, setSession }}>
                <NotificationContext.Provider value={{ notification, setNotification }}>
                    {notificationVisible && notification && <Notification title={notification.title} subtitle={String(notification.subtitle)} message={notification.message} />}
                    <Router>
                        <NavBar />
                        <Main />
                        <Footer />
                    </Router>
                </NotificationContext.Provider>
            </SessionContext.Provider>
        </>
    );
};


const Main: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/editor" element={<DocumentEditor />} />
                <Route path="/edit/*" element={<DocumentEditor />} />
                <Route path="/" element={<LoginSignup />} />
                <Route path="/documents" element={<FileManager />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
