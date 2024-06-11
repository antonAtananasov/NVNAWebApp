import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

const NavBar: React.FC = () => {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="navbar-gradient">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-auto" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="nav-bold mx-auto mx-lg-0">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`nav-item ${location.pathname === '/' ? 'active-link' : ''}`}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/editor"
                            className={`nav-item ${location.pathname === '/editor' ? 'active-link' : ''}`}
                        >
                            Editor
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={<FaUserCircle size={24} />} id="basic-nav-dropdown" className="nav-item">
                            <NavDropdown.Item
                                as={Link}
                                to="/login-signup"
                                className={`nav-item ${location.pathname === '/login-signup' ? 'active-link' : ''}`}
                            >
                                Exit
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
