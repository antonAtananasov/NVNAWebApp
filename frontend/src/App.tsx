import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import RegisterAccountForm from './components/RegisterAccountForm';
import LoginForm from './components/RegisterAccountForm';
import SignupForm from './components/RegisterAccountForm';




const testGet = async (setter: React.Dispatch<React.SetStateAction<string>>) => {
    const result = await fetch('http://localhost:3000/')
    const text = await result.text()
    setter(text)
}


const App = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Container fluid className="custom-container">
            <Row className="justify-content-md-center">
                <Col md="4">
                    {isLogin ? <LoginForm /> : <SignupForm />}
                    <div className="d-grid gap-2 mt-3">
                        <Button
                            variant={isLogin ? "primary" : "light"}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </Button>
                        <Button
                            variant={!isLogin ? "primary" : "light"}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
