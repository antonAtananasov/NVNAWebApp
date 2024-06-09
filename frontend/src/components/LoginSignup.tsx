import { useState } from 'react';
import './LoginSignup.css';

import password_icon from '../assets/password.png';
import user_icon from '../assets/person.png';

const LoginSignup = () => {
    const [action, setAction] = useState <string>('Sign Up');

    const handleActionChange = (newAction:string) => {
        setAction(newAction);
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt='User icon'/>
                    <input type='text' placeholder='Name'/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt='Password icon'/>
                    <input type='password' placeholder='Password'/>
                </div>
                {action === 'Sign Up' ? (
                    <div className='input'>
                        <img src={password_icon} alt='Password icon'/>
                        <input type='password' placeholder='Repeat Password'/>
                    </div>
                ) : null}
            </div>
            <div className='submit-container'>
                <div
                    className={action === 'Login' ? 'submit gray' : 'submit'}
                    onClick={() => handleActionChange('Sign Up')}
                >
                    Sign Up
                </div>
                <div
                    className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                    onClick={() => handleActionChange('Login')}
                >
                    Login
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
