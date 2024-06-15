import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IUserCredentials, IUserSession } from '../dtos/dtos';
import { Spinner } from 'react-bootstrap';
import { INotification, INotificationContext, ISessionContext, NotificationContext, NotificationVariant, SessionContext } from '../dtos/extras';


const LoginSignup = () => {
    const { setSession } = useContext(SessionContext) as ISessionContext
    const [action, setAction] = useState<string>('Login');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [isWaitingResponse, setIsWaitingResponse] = useState<boolean>(false)
    const navigate = useNavigate();
    const { setNotification } = useContext(NotificationContext) as INotificationContext


    const handleActionChange = (newAction: string) => {
        setAction(newAction);
        setRepeatPassword('');
    };

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
                        setNotification({ title: 'Register', subtitle: String(res.status), message: "Registered successfully", variant: NotificationVariant.info } as INotification)
                        handleLogin()
                    }
                    else {
                        const t = await res.text()
                        setNotification({ title: res.statusText, subtitle: String(res.status), message: t } as INotification)
                    }
                }).catch()

            }, 1500);
            setIsWaitingResponse(false)
        }
        else {
            setNotification({ title: '', subtitle: '', message: 'Passwords dont match' } as INotification)
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
                    setNotification({ title: 'Login', subtitle: String(res.status), message: 'Successfully logged in' } as INotification)
                }
                else {
                    const t = await res.text()

                    setNotification({ title: res.statusText, subtitle: String(res.status), message: t } as INotification)
                }
            }).catch()
            setIsWaitingResponse(false)

        } else {
            setNotification({ title: 'Login / Register', subtitle: String('warning'), message: 'Invalid username or password' } as INotification)
        }
    };

    return (
        <>
            <div className='container bg-primary text-white'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
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
