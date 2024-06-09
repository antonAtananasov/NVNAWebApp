<<<<<<< Updated upstream
=======
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import RegisterAccountForm from './components/RegisterAccountForm';


const testGet = async (setter: React.Dispatch<React.SetStateAction<string>>) => {
    const result = await fetch('http://localhost:3000/')
    const text = await result.text()
    setter(text)
}
>>>>>>> Stashed changes

import './App.css';
import LoginSignup from "./components/LoginSignup.tsx";
import Layout from "./pages/Layout.tsx";

function App() {
  return (


<<<<<<< Updated upstream
        <Layout>
            <LoginSignup/>
        </Layout>



  );
=======
            <Container data-bs-theme="light position" fluid className="w-100">
                <Row className="w-100 mt-4 mb-4">
                    <Col className='col-2 border-end'>Left panel</Col>
                    <Col className='col-8'>
                        <Row className='w-100 p-3 d-flex text-start'>
                            <RegisterAccountForm></RegisterAccountForm>
                        </Row>
                    </Col>
                    <Col className='col-2 border-start'>Right panel</Col>
                </Row>
                <Row className='w-100 p-3 border-top'>Footer</Row>

            </Container> {/*
 */}
            {/*  */}
        </>
    )
>>>>>>> Stashed changes
}

export default App;
