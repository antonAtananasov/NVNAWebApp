import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useState } from 'react';

interface Props {
    isLogin: boolean
}

const RegisterAccountForm = ({ isLogin }: Props) => {
    return isLogin ? LoginForm() : SignupForm()
}

const LoginForm = () => {

    return (
        <Form className="custom-form">
            <h3>Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" className="d-grid gap-2">
                Submit
            </Button>
        </Form>
    );
};

const SignupForm = () => {
    const [username, setUsername] = useState <string> ('');
    const [password, setPassword] = useState <string> ('');
    const [repeatPassword, setRepeatPassword] = useState <string> ('');
    return (
        <Form className="custom-form">
            <h3>Sign Up</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => {
                    setUsername(e.target.value)
                }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat Password" onChange={(e) => setRepeatPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" className="d-grid gap-2" onClick={() => {
               createUser(username, password, repeatPassword)
            }}>
                Submit
            </Button>
        </Form>
    );
};


function createUser (username:string, password:string, repeatPassword:string ){
    console.log('test')
    if (password==repeatPassword && password.length>=6 && username.length>0){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:username, password:password })};
        fetch('http://localhost:3000/api/users', requestOptions)
            .then(response => console.log(response.json()))
    }
}


export default RegisterAccountForm;