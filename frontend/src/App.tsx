// import { useState } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Button, Nav, Navbar } from "react-bootstrap";
// import RegisterAccountForm from './components/RegisterAccountForm';
// import {BrowserRouter, Routes, Route} from "react-router-dom";
//
//
// const App = () => {
//     const [isLogin, setIsLogin] = useState(true);
//
//     return (
//         <>
//             {/* put the BrowserRouter and Route tags here */}
//             <Navbar bg="dark" data-bs-theme="dark">
//                 <Container>
//                     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//                     <Nav className="me-auto">
//                         <Nav.Link href="#home">Home</Nav.Link>
//                         <Nav.Link href="#features">Features</Nav.Link>
//                         <Nav.Link href="#pricing">Pricing</Nav.Link>
//                     </Nav>
//                 </Container>
//             </Navbar>
//
//             <Container data-bs-theme="light position" fluid className="w-100">
//                 <Row className="w-100 mt-4 mb-4">
//                     <Col className='col-2 border-end'>Left panel</Col>
//                     <Col className='col-8'>
//                         <Row className='w-100 p-3'>
//                             <Container fluid className="custom-container">
//                                 <Row className="justify-content-md-center">
//                                     <Col md="4">
//                                         <RegisterAccountForm isLogin={isLogin} />
//                                         <div className="d-grid gap-2 mt-3">
//                                             <BrowserRouter>
//                                                 <Routes>
//                                                     <Route path={"/DocumentEditor.tsx"}></Route>
//                                                 </Routes>
//                                             </BrowserRouter>
//                                             <Button
//                                                 variant={isLogin ? "primary" : "light"}
//                                                 onClick={() => setIsLogin(true)}>
//                                                 Login
//                                             </Button>
//                                             <Button
//                                                 variant={!isLogin ? "primary" : "light"}
//                                                 onClick={() => setIsLogin(false)}>
//                                                 Sign Up
//                                             </Button>
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </Container>
//                         </Row>
//                     </Col>
//                     <Col className='col-2 border-start'>Right panel</Col>
//                 </Row>
//                 <Row className='w-100 p-3 border-top'>Footer</Row>
//
//             </Container>
//             {/*  */}
//
//         </>
//     );
// };
//
// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentEditor from './components/DocumentEditor';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DocumentEditor />} />
            </Routes>
        </Router>
    );
};

export default App;
