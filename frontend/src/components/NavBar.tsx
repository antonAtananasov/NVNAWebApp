import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavBar.css';
import EditUser from './EditUser';
import { Button } from 'react-bootstrap';
import { IUser } from '../dtos/dtos';

const NavBar = () => {
    const userName = "User";
    const [showEditUser, setShowEditUser] = useState(false);
    const [loggedUser, setLoggedUser] = useState<IUser | undefined>(undefined);

    const handleEditUserClick = () => {
        setShowEditUser(true);
    };

    const handleCloseEditUser = () => {
        setShowEditUser(false);
    };
    const location = useLocation();
    const isOnLogin = location.pathname === '/login-signup';



    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">NVNAWebApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>{
                                loggedUser && <>
                                    <Nav.Link as={Link} to="/editor">Editor</Nav.Link>
                                    <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
                                </>
                            }
                        </Nav>
                        {!isOnLogin && <>
                            {!loggedUser ? <Link to={'/login-signup'} className='text-decoration-none text-light'><Button className='btn-light'>Sign in</Button></Link> :
                                <Nav className="ms-auto d-flex align-items-center user-dropdown-container">
                                    <span className="text-white me-2">Hello, {userName}</span>
                                    <NavDropdown title={<i className="bi bi-person-circle"></i>} id="user-dropdown" align="end">
                                        <NavDropdown.Item onClick={handleEditUserClick}>Edit User</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/login-signup">Exit</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>}
                        </>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showEditUser && <EditUser onClose={handleCloseEditUser} />}
        </>
    );
}

export default NavBar;
