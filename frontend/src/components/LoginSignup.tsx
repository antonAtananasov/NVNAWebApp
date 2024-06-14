import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IUserCredentials, IUserSession } from '../dtos/dtos';
import { Spinner } from 'react-bootstrap';
import Notification, { Props as NotificationData } from './Notification'
import { ISessionContext, SessionContext } from '../dtos/extras';


const LoginSignup = () => {
    const { setSession } = useContext(SessionContext) as ISessionContext
    const [action, setAction] = useState<string>('Login');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isWaitingResponse, setIsWaitingResponse] = useState<boolean>(false)
    const navigate = useNavigate();
    const [notification, setNotification] = useState<NotificationData | undefined>(undefined)

    const handleActionChange = (newAction: string) => {
        setAction(newAction);
        setRepeatPassword('');
    };
    const showNotification = (data: NotificationData, timeout: number) => {
        setNotification(data)
        setTimeout(() =>
            setNotification(undefined), timeout)
    }

    const handleSignUp = async () => {
        if (name.length >= 4 && password.length >= 6 && password === repeatPassword) {
            const user: IUserCredentials = {
                username: name,
                password: password
            }
            setIsWaitingResponse(true)
            setTimeout(() => {
                fetch('http://localhost:3001/api/users', {
                    method: 'post', body: JSON.stringify(user), headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, credentials: 'same-origin',
                }).then(async (res: Response) => {
                    if (res.status === 200) {
                        setIsRegistered(true)
                        handleLogin()
                    }
                    else {
                        const t = await res.text()
                        showNotification({ title: res.statusText, subtitle: String(res.status), message: t }, 1500)
                    }
                }).catch()

            }, 1500);
            setIsWaitingResponse(false)
        }
        else {
            showNotification({ title: '', subtitle: '', message: 'Passwords dont match' }, 1500)
        }
    };

    const handleLogin = async () => {
        const user: IUserCredentials = {
            username: name,
            password: password
        }
        if (name.length >= 4 && password.length >= 6) {
            setIsWaitingResponse(true)
            await fetch('http://localhost:3001/api/users/login', {
                method: 'post', body: JSON.stringify(user), headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, credentials: 'include',
            }).then(async (res: Response) => {
                if (res.status === 200) {
                    res.json().then((json: any) => {
                        const sessionData = json as IUserSession;
                        setSession(() => sessionData)
                        document.cookie = 'session=' + JSON.stringify(json) + ';'
                    })

                    navigate('/home')

                }
                else {
                    const t = await res.text()

                    showNotification({ title: res.statusText, subtitle: String(res.status), message: t }, 1500)
                }
            }).catch()
            setIsWaitingResponse(false)

        } else {
            showNotification({ title: '', subtitle: String(''), message: 'Invalid username or password' }, 1500)
        }
    };

    return (
        <>
            {notification && <Notification title={notification.title} subtitle={String(notification.subtitle)} message={notification.message} variant={notification.variant} />}
            <div className='container bg-primary text-white'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                {isRegistered && (
                    <div className='confirmation'>
                        Registration successful! Please log in with your credentials.
                    </div>
                )}
                <div className='inputs'>
                    <div className='input'>
                        <img src={user_icon} alt='User icon' />
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt='Password icon' />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {action === 'Sign Up' && (
                        <div className='input'>
                            <img src={password_icon} alt='Password icon' />
                            <input
                                type='password'
                                placeholder='Repeat Password'
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>
                    )}
                </div>
                <div className='submit-container'>
                    {action === 'Sign Up' ? (
                        <div className='submit' onClick={handleSignUp}>
                            {isWaitingResponse ?
                                <Spinner animation='grow' /> : 'Sign Up'}
                        </div>
                    ) : (
                        <div className='submit' onClick={handleLogin}>
                            {isWaitingResponse ?
                                <Spinner animation='grow' /> : 'Login'}
                        </div>
                    )}
                </div>
                <div
                    className='toggle-action my-2 mx-4 text-decoration-underline'
                    onClick={() => handleActionChange(action === 'Sign Up' ? 'Login' : 'Sign Up')}
                >
                    {action === 'Sign Up' ? 'Log-in' : 'New user? - Sign Up'}
                </div>
            </div>

        </>

    );
};

export default LoginSignup;
