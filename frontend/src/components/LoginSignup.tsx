import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const users = new Map(); // Using a Map to store users

const LoginSignup = () => {
    const [action, setAction] = useState<string>('Sign Up');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleActionChange = (newAction: string) => {
        setAction(newAction);
        setName('');
        setPassword('');
        setRepeatPassword('');
    };

    const handleSignUp = () => {
        if (name.length > 6 && password.length > 6 && password === repeatPassword) {
            if (!users.has(name)) {
                users.set(name, password);
                setIsRegistered(true);
                setAction('Login'); // Switch to login after successful registration
            } else {
                navigate('/notfound');
            }
        } else {
            navigate('/notfound');
        }
    };

    const handleLogin = () => {
        if (name.length > 6 && password.length > 6) {
            if (users.has(name) && users.get(name) === password) {
                navigate('/home');
            } else {
                navigate('/notfound');
            }
        } else {
            navigate('/notfound');
        }
    };

    return (
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
                        Sign Up
                    </div>
                ) : (
                    <div className='submit' onClick={handleLogin}>
                        Login
                    </div>
                )}
            </div>
            <div
                className='toggle-action'
                onClick={() => handleActionChange(action === 'Sign Up' ? 'Login' : 'Sign Up')}
            >
                {action === 'Sign Up' ? 'Switch to Login' : 'Switch to Sign Up'}
            </div>
        </div>
    );
};

export default LoginSignup;
