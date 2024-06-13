import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/banner1.png';
import reactLogo from '../assets/react-logo.png';
import typescriptLogo from '../assets/typescript-logo.png';
import sqlLogo from '../assets/sql-logo.png';
import webAppPage1 from '../assets/WebApp_page_1.png';
import webAppPage2 from '../assets/WebApp_page_2.png';
import webAppPage3 from '../assets/WebApp_page_3.png';
import webAppPage4 from '../assets/WebApp_page_4.png';
import editUserImage from '../assets/EditUser.png';
import documentsImage from '../assets/Documents.png';
import editorImage from '../assets/Editor.png';
import './Home.css';
import { IUser } from '../dtos/dtos';

const images = [webAppPage1, webAppPage2, webAppPage3, webAppPage4];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loggedUser, setLoggedUser] = useState<IUser | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Container fluid className="home-banner" style={{ padding: '30px 20px', backgroundColor: '#fff' }}>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-left text-black" style={{ padding: '20px' }}>
                        <h1 className="h1 font-weight-bold">
                            Document Server with <span style={{ fontWeight: '500', color: 'blue' }}>React and TypeScript</span>
                        </h1>
                        <p className="lead h4">
                            The project aims to create a seamless and user-friendly platform for document editing and file management, enabling users to efficiently handle their documents and files with an intuitive interface and robust features.
                        </p>
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                            <Link to={loggedUser ? "/editor" : '/login-signup'} className="mb-2 mb-md-0">
                                <Button variant="primary" size="lg" className="btn-lg" style={{ height: '60px', margin: '20px', width: '100%' }}>Editor</Button>
                            </Link>
                            <Link to={loggedUser ? "/documents" : '/login-signup'}>
                                <Button variant="secondary" size="lg" className="btn-lg" style={{ height: '60px', margin: '20px', width: '100%', borderStyle: '1px solid' }}>Documents</Button>
                            </Link>
                        </div>
                    </Col>
                    <Col md={6} className="text-center">
                        <img src={bannerImage} alt="Banner" className="img-fluid" />
                    </Col>
                </Row>
            </Container>

            <Container fluid className='primary mt-2' style={{ padding: '30px 20px', backgroundColor: '#0d6efd' }}>
                <Row className="align-items-center">
                    <Col className="text-center m-5">
                        <h2 className="h2 font-weight-bold" style={{ color: "white", fontWeight: '600', fontSize: '40pt' }}>USED LANGUAGES</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={6} md={4} className="text-center">
                        <img src={reactLogo} alt="React Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
                        <p className="h4 m-2 " style={{ color: "white", fontWeight: '500' }}>React</p>
                    </Col>
                    <Col xs={6} md={4} className="text-center">
                        <img src={typescriptLogo} alt="TypeScript Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
                        <p className="h4 m-2" style={{ color: "white", fontWeight: '500' }}>TypeScript</p>
                    </Col>
                    <Col xs={6} md={4} className="text-center">
                        <img src={sqlLogo} alt="SQL Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
                        <p className="h4 m-2" style={{ color: "white", fontWeight: '500' }}>SQL</p>
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ padding: '30px 20px', backgroundColor: '#fff' }}>
                <Row className="align-items-center">
                    <Col xs={1} className="text-center d-md-none">
                        <Button variant="link" onClick={handlePrevious} className="arrow-btn">
                            <i className="bi bi-arrow-left-circle"></i>
                        </Button>
                    </Col>
                    <Col md={1} className="text-center d-none d-md-block">
                        <Button variant="link" onClick={handlePrevious} style={{ fontSize: '2rem', color: '#000' }}>
                            <i className="bi bi-arrow-left-circle"></i>
                        </Button>
                    </Col>
                    <Col xs={10} md={6} className="text-center" style={{ padding: '20px' }}>
                        <div className="gallery">
                            <img
                                src={images[currentImageIndex]}
                                alt="Web App Page"
                                className="img-fluid m-2"
                                style={{ cursor: 'pointer', width: '70%' }}
                                onClick={handleImageClick}
                            />
                        </div>
                    </Col>
                    <Col xs={1} className="text-center d-md-none">
                        <Button variant="link" onClick={handleNext} className="arrow-btn">
                            <i className="bi bi-arrow-right-circle"></i>
                        </Button>
                    </Col>
                    <Col md={1} className="text-center d-none d-md-block">
                        <Button variant="link" onClick={handleNext} style={{ fontSize: '2rem', color: '#000' }}>
                            <i className="bi bi-arrow-right-circle"></i>
                        </Button>
                    </Col>
                    <Col md={4} className="text-md-left text-black" style={{ padding: '20px' }}>
                        <h2 className="h2 font-weight-bold text-center text-md-left text-black m-5" >Project's Architecture</h2>
                        <p className="lead text-justify text-md-left text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            Praesent libero. Sed cursus ante dapibus diam.</p><br />
                        <p className="lead text-justify text-md-left text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            Praesent libero. Sed cursus ante dapibus diam.</p><br />
                        <p className="lead text-justify text-md-left text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            Praesent libero. Sed cursus ante dapibus diam.</p><br />
                        <p className="lead text-justify text-md-left text-black">Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Integer nec odio.
                            Praesent libero. Sed cursus ante dapibus diam.</p><br />
                        <p className="lead text-justify text-md-left text-black">Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit. Integer nec odio.
                            Praesent libero. Sed cursus ante dapibus diam.</p><br />
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ padding: '30px 20px', backgroundColor: '#f8f9fa' }}>
                <Row>
                    <Col style={{ backgroundColor: '#0d6efd', height: '200px' }}>
                        <h2 className="text-center font-weight-bold p-5" style={{ color: "white", fontWeight: '600', fontSize: '40pt' }}>Pages & Functionalities</h2>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={6} className="p-4">
                        <h3>Header</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>
                    </Col>
                    <Col md={6} className="p-4 text-center">
                        <img src={editUserImage} alt="Edit User" className="img-fluid" style={{ width: '70%' }} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={6} className="p-4 text-center">
                        <img src={documentsImage} alt="Documents" className="img-fluid" style={{ width: '70%' }} />
                    </Col>
                    <Col md={6} className="p-4">
                        <h3>Header</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={6} className="p-4">
                        <h3>Header</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</p>
                    </Col>
                    <Col md={6} className="p-4 text-center">
                        <img src={editorImage} alt="Editor" className="img-fluid" style={{ width: '70%' }} />
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className="text-center position-relative">
                    <Button variant="link" onClick={handlePrevious} className="modal-arrow left-arrow">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </Button>
                    <img src={images[currentImageIndex]} alt="Web App Page Full Size" className="img-fluid" />
                    <Button variant="link" onClick={handleNext} className="modal-arrow right-arrow">
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Home;
