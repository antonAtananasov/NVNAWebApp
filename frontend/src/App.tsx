
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
// import RegisterAccountForm from './components/RegisterAccountForm';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NotFound from "./components/NotFound.tsx";
// import FileControls from "./components/FileControls.tsx";

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

//export default App;
//


//
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Home from './components/Home';
// import Gallery from './components/FileControl';
// import Editor from './components/DocumentEditor';
// import LoginSignup from './components/LoginSignup';
//
// const App: React.FC = () => {
//     return (
//         <Router>
//             <NavBar />
//             <Switch>
//                 <Route exact path="/" component={Home} />
//                 <Route path="/gallery" component={Gallery} />
//                 <Route path="/editor" component={Editor} />
//                 <Route path="/login-signup" component={LoginSignup} />
//             </Switch>
//         </Router>
//     );
// };
//
// export default App;

// import React from 'react';
// import NavBar from './components/NavBar';

// const App: React.FC = () => {
//     return (
//         <div>
//             <NavBar />
//             {/* Your other components go here */}
//         </div>
//     );
// };

// export default App;

// const App: React.FC = () => {
//
//     return <>
//         <Navbar bg="dark" data-bs-theme="dark">
//             <Container>
//                 <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//                 <Nav className="me-auto">
//                     <Nav.Link href="#home">Home</Nav.Link>
//                     <Nav.Link href="#features">Features</Nav.Link>
//                     <Nav.Link href="#pricing">Pricing</Nav.Link>
//                 </Nav>
//             </Container>
//         </Navbar>
//
//         <Container data-bs-theme="light position" fluid className="w-100">
//             <Row className="w-100 mt-4 mb-4">
//                 <Col className='col-2 border-end'>Left panel</Col>
//                 <Col className='col-8'>
//                     <Row className='w-100 p-3'>
//                         <BrowserRouter>
//                             <Routes>
//                                 <Route path={"/login"} element={<RegisterAccountForm isLogin={false}></RegisterAccountForm>} />
//                                 <Route path={"/"} element={<br />} />
//                                 <Route path={"*"} element={<NotFound />} />
//                                 <Route path={"/filecontrols"} element={<FileControls />} />
//                             </Routes>
//                         </BrowserRouter>
//                     </Row>
//                 </Col>
//                 <Col className='col-2 border-start'>Right panel</Col>
//             </Row>
//             <Row className='w-100 p-3 border-top'>Footer</Row>
//
//         </Container>
//     </>
//
// }
//
// export default App


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import DocumentEditor from './components/DocumentEditor';
// import FileControls from './components/FileControls';
// import LoginSignup from './components/LoginSignup';
// import NotFound from './components/NotFound';
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// const App: React.FC = () => {
//     return (
//         <Router>
//             <NavBar />
//             <Routes>
//                 <Route path="/" element={<FileControls />} />
//                 <Route path="/editor" element={<DocumentEditor />} />
//                 <Route path="/login-signup" element={<LoginSignup />} />
//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import DocumentEditor from './components/DocumentEditor';
import FileControls from './components/FileControls';
import LoginSignup from './components/LoginSignup';
import Home from './components/Home';
import NotFound from './components/NotFound';
import FileManager from './components/FileManager'; // Импортиране на новия компонент
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<FileControls />} />
                <Route path="/editor/:documentId" element={<DocumentEditor />} />
                <Route path="/login-signup" element={<LoginSignup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/my-doc" element={<FileManager />} /> {/* Нов маршрут */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;






