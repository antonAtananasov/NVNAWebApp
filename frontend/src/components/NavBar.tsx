import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavBar.css';
import EditUser from './EditUser';
import { Button } from 'react-bootstrap';
import { ISessionContext, SessionContext } from '../dtos/extras';


const NavBar = () => {
    const { session, setSession } = useContext(SessionContext) as ISessionContext
    const [showEditUser, setShowEditUser] = useState(false);

    const handleEditUserClick = () => {
        setShowEditUser(true);
    };

    const handleCloseEditUser = () => {
        setShowEditUser(false);
    };
    const location = useLocation();
    const navigator = useNavigate()

    const isOnLogin = location.pathname === '/';



    return (
        <>
            <Navbar bg="primary ps-4" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">NVNAWebApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            {
                                session &&
                                <>
                                    <Nav.Link as={Link} to="/editor">Editor</Nav.Link>
                                    <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
                                </>
                            }
                        </Nav>
                        {!isOnLogin && <>
                            {!session ? <Link to={'/'} className='text-decoration-none text-light'><Button className='btn-light'>Sign in</Button></Link> :
                                <Nav className="ms-auto d-flex align-items-center user-dropdown-container">
                                    <>
                                        {session ? (
                                            <>
                                                <span className="text-white me-2">Hello, {session.username}</span>
                                                <>
                                                    {showEditUser &&
                                                        <>
                                                            <EditUser hidden={showEditUser} onClose={handleCloseEditUser} />

                                                            <NavDropdown title={<i className="bi bi-person-circle"></i>} id="user-dropdown" align="end">
                                                                <NavDropdown.Item onClick={handleEditUserClick}>Edit User</NavDropdown.Item>
                                                                <NavDropdown.Item as={Link} to="/" onClick={handleCloseEditUser}>Exit</NavDropdown.Item>
                                                            </NavDropdown>
                                                        </>
                                                    }
                                                </>
                                            </>) : <Button onClick={() => navigator('/')}>Sign in</Button>
                                        }
                                    </>
                                    <NavDropdown title={<i className="bi bi-person-circle"></i>} id="user-dropdown" align="end">
                                        <NavDropdown.Item onClick={handleEditUserClick}>Edit User</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/" onClick={() => { setSession(undefined); }}>Exit</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>}
                        </>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
