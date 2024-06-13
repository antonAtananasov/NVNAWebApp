import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IUserCredentials } from '../dtos/dtos';
import { Spinner } from 'react-bootstrap';
import Notification, { NotificationVariant } from './Notification'


const LoginSignup = () => {
    const [action, setAction] = useState<string>('Login');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isWaitingResponse, setIsWaitingResponse] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleActionChange = (newAction: string) => {
        setAction(newAction);
        // setName('');
        setPassword('');
        setRepeatPassword('');
    };

    const handleSignUp = async () => {
        if (name.length >= 4 && password.length >= 6 && password === repeatPassword) {
            // if (!users.has(name)) {
            //     users.set(name, password);
            //     setIsRegistered(true);
            //     setAction('Login');
            // } else {
            //     navigate('/notfound');
            // }
            const user: IUserCredentials = {
                username: name,
                password: repeatPassword
            }
            setIsWaitingResponse(true)
            setTimeout(() => {
                fetch('http://localhost:3001/api/users', {
                    method: 'post', body: JSON.stringify(user), headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((res: Response) => {
                    setIsWaitingResponse(false)
                    if (res.status === 200) {
                        navigate('/documents')
                    }
                    else {

                    }
                })

            }, 1500);
        }
        else {
            console.log('passwords dont match')
        }
    };

    const handleLogin = () => {
        if (name.length >= 4 && password.length >= 6) {
            // if (users.has(name) && users.get(name) === password) {
            //     navigate('/');
            // } else {
            //     navigate('/notfound');
            // }
        } else {
            navigate('/notfound');
        }
    };

    return (
        <>
            <div className='position-absolute start-50 translate-middle'>
                <Notification title={'res.statusText'} subtitle={String('res.status')} message={JSON.stringify('res.body')} variant={NotificationVariant.warning} />
            </div>
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
                    className='toggle-action my-2 mx-4'
                    onClick={() => handleActionChange(action === 'Sign Up' ? 'Login' : 'Sign Up')}
                >
                    {action === 'Sign Up' ? 'Log-in' : 'New user? - Sign Up'}
                </div>
            </div>

        </>

    );
};

export default LoginSignup;
