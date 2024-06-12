import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { SearchBar } from './FileControls'; // Импортиране на SearchBar

const NavBar: React.FC = () => {
    const location = useLocation();
    const leftm70 = {
        left: '-70%'
    }
    return (
        <Navbar bg="primary" expand="lg" className="navbar-gradient">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-auto" />
                <Navbar.Collapse id="basic-navbar-nav" className="mx-2 justify-content-between w-100">
                    <Nav className="nav-bold">
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
                        <Nav.Link
                            as={Link}
                            to="/my-doc"
                            className={`nav-item ${location.pathname === '/my-doc' ? 'active-link' : ''}`}
                        >
                            Documents
                        </Nav.Link>
                    </Nav>
                    {/* <SearchBar /> Добавяне на SearchBar тук */}
                    <Nav>
                        <NavDropdown title={<FaUserCircle size={24} style={leftm70} />} id="leftm70 basic-nav-dropdown" className="nav-item">
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
