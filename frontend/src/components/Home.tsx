import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
import arch1 from '../assets/arch1.png';
import arch2 from '../assets/arch2.png';
import arch4 from '../assets/arch4.png';
import './Home.css';

const images = [webAppPage1, webAppPage2, webAppPage3, webAppPage4];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                            <Link to="/editor" className="mb-2 mb-md-0">
                                <Button variant="primary" size="lg" className="btn-lg" style={{ height: '60px', margin: '20px', width: '100%' }}>Editor</Button>
                            </Link>
                            <Link to="/documents">
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
                    <Col md={4} className="text-md-left text-black" style={{ padding: '20px' }}>
                        <h2 className="h2 font-weight-bold text-center text-md-left text-black m-5">Document Server Architecture</h2>
                        <p className="lead text-justify text-md-left text-black">
                            <strong>1. Database Schema</strong>
                            <br />
                            Our database schema is the backbone of the Document Server, consisting of four primary tables:
                            <ul>
                                <li><strong>Users</strong>: Stores user information including UUID, username, hashed password, creation date, plan ID, and plan start date.</li>
                                <li><strong>Plans</strong>: Defines different user plans, specifying storage limits and cost.</li>
                                <li><strong>Documents</strong>: Contains document details such as UUID, owner UUID, name, format, content, root document UUID (for hierarchical structure), folder status, creation date, last modified date, last accessed date, and size.</li>
                                <li><strong>Shared Documents</strong>: Manages shared documents, linking document UUIDs to user UUIDs with specific permissions.</li>
                            </ul>
                            Each table is designed with primary keys (PK) and foreign keys (FK) to maintain referential integrity, and nullable fields are clearly marked for flexibility.
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ padding: '30px 20px', backgroundColor: '#f8f9fa' }}>
                <Row className="align-items-center">
                    <Col md={6} className="text-center">
                        <img src={arch1} alt="Architecture 1" className="img-fluid" style={{ width: '70%' }} />
                    </Col>
                    <Col md={6} className="text-md-left text-black" style={{ padding: '20px' }}>
                        <h2 className="h2 font-weight-bold text-center text-md-left text-black m-5">Frontend Components</h2>
                        <p className="lead text-justify text-md-left text-black">
                            The frontend is developed using Vite, React, and TypeScript with SASS for styling. It is organized into several key components and pages:
                            <ul>
                                <li><strong>Account Management</strong>:
                                    <ul>
                                        <li><strong>Register Account Form</strong>: For creating new accounts via a POST request.</li>
                                        <li><strong>Account Details</strong>: For reading, updating, and deleting account information using GET, PUT, and DELETE requests.</li>
                                    </ul>
                                </li>
                                <li><strong>Document Management</strong>:
                                    <ul>
                                        <li><strong>Document List</strong>: Displays user and shared documents.</li>
                                        <li><strong>Folder View</strong>: Shows folders and documents in a gallery format.</li>
                                        <li><strong>Document Viewer</strong>: Allows users to view document contents.</li>
                                        <li><strong>Document Editor</strong>: Provides a form to edit document name and content.</li>
                                        <li><strong>Document Controls</strong>: Includes buttons for downloading, deleting, and sharing documents.</li>
                                    </ul>
                                </li>
                            </ul>
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ padding: '30px 20px', backgroundColor: '#fff' }}>
                <Row className="align-items-center">
                    <Col md={6} className="text-md-left text-black" style={{ padding: '20px' }}>
                        <h2 className="h2 font-weight-bold text-center text-md-left text-black m-5">Backend Structure</h2>
                        <p className="lead text-justify text-md-left text-black">
                            The backend is built with Express and TypeScript, structured to separate concerns and enhance maintainability:
                            <ul>
                                <li><strong>Core</strong>:
                                    <ul>
                                        <li><strong>DB.ts</strong>: Manages database connections and interactions.</li>
                                    </ul>
                                </li>
                                <li><strong>Models</strong>: Define the structure and relationships of data objects:
                                    <ul>
                                        <li><strong>User Model</strong></li>
                                        <li><strong>Document Model</strong></li>
                                        <li><strong>Shared Document Model</strong></li>
                                    </ul>
                                </li>
                                <li><strong>Controllers</strong>: Implement business logic and handle requests:
                                    <ul>
                                        <li><strong>UserController</strong>: Manages user-related operations such as creating, retrieving, updating, and deleting users.</li>
                                        <li><strong>DocumentController</strong>: Handles document operations like creation, upload, retrieval, update, sharing, and deletion.</li>
                                    </ul>
                                </li>
                                <li><strong>Routers</strong>: Define API endpoints and link them to controllers:
                                    <ul>
                                        <li><strong>AccountRouter</strong>: Manages account-related endpoints.</li>
                                        <li><strong>DocumentRouter</strong>: Manages document-related endpoints.</li>
                                    </ul>
                                </li>
                                <li><strong>Index.ts</strong>: Initializes the Express app, applies middleware (JSON parsing, CORS), and sets up routes.</li>
                            </ul>
                        </p>
                    </Col>
                    <Col md={6} className="text-center">
                        <img src={arch2} alt="Architecture 2" className="img-fluid" style={{ width: '70%' }} />
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ padding: '30px 20px', backgroundColor: '#f8f9fa' }}>
                <Row className="align-items-center">
                    <Col md={6} className="text-center">
                        <img src={arch4} alt="Architecture 3" className="img-fluid" style={{ width: '70%' }} />
                    </Col>
                    <Col md={6} className="text-md-left text-black" style={{ padding: '20px' }}>
                        <h2 className="h2 font-weight-bold text-center text-md-left text-black m-5">API Endpoints</h2>
                        <p className="lead text-justify text-md-left text-black">
                            Our API endpoints are designed to handle CRUD operations efficiently:
                            <ul>
                                <li><strong>/account</strong>:
                                    <ul>
                                        <li><strong>POST</strong>: Create a new account.</li>
                                        <li><strong>GET</strong>: Retrieve account details.</li>
                                        <li><strong>PUT</strong>: Update account information.</li>
                                        <li><strong>DELETE</strong>: Delete an account.</li>
                                    </ul>
                                </li>
                                <li><strong>/documents</strong>:
                                    <ul>
                                        <li><strong>GET</strong>: Retrieve user or shared documents.</li>
                                        <li><strong>PUT</strong>: Update document details.</li>
                                        <li><strong>DELETE</strong>: Delete a document.</li>
                                    </ul>
                                </li>
                            </ul>
                            By integrating these components, our Document Server provides a comprehensive solution for document management, ensuring data integrity, efficient access control, and a user-friendly interface. Explore the features and manage your documents with ease!
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ padding: '30px 20px', backgroundColor: '#f8f9fa' }}>
                <Row>
                    <Col style={{ backgroundColor: '#0d6efd', height: '200px' }}>
<<<<<<< HEAD
                        <h2 className="text-center font-weight-bold p-5"
                            style={{ color: "white", fontWeight: '600', fontSize: '40pt' }}>Pages & Functionalities</h2>
=======
                        <h2 className="text-center font-weight-bold p-5" style={{ color: "white", fontWeight: '600', fontSize: '40pt' }}>Pages & Functionalities</h2>
>>>>>>> 39f2a27acf9a611f4cfdd220804b8ed4c65de739
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={6} className="text-md-left text-black" style={{padding: '20px'}}>
                        <div className="container mt-5">
                            <h2 className="h2 font-weight-bold text-center mb-4">Edit User</h2>

                            <h3 className="h3 font-weight-bold mt-4">Header Section:</h3>
                            <ul className="lead text-justify">
                                <li><strong>"Edit User"</strong> is the header text, styled with Bootstrap classes to
                                    ensure proper alignment and spacing.
                                </li>
                                <li>A close button (<strong>&times;</strong>) is included to allow users to close the
                                    sidebar.
                                </li>
                            </ul>

                            <h3 className="h3 font-weight-bold mt-4">Form Section:</h3>
                            <ul className="lead text-justify">
                                <li><strong>User Name</strong> and <strong>Password</strong> fields are created using
                                    Bootstrap's form classes for consistent styling.
                                </li>
                                <li>A <strong>"Save"</strong> button is styled using Bootstrap's button classes.</li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={6} className="p-4 text-center">
                        <img src={editUserImage} alt="Edit User" className="img-fluid" style={{width: '70%'}}/>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={6} className="p-4 text-center">
                        <img src={documentsImage} alt="Documents" className="img-fluid" style={{width: '70%'}}/>
                    </Col>
                    <Col md={6} className="p-4">
                        <div className="container mt-5">
                            <h2 className="h2 font-weight-bold text-center mb-4">Documents Page Description</h2>
                            <p className="lead text-justify">
                                The Documents page is your central hub for managing all your created and uploaded
                                documents. Designed for ease of use and efficiency, this page provides a comprehensive
                                view of your documents along with options to perform various actions on each document.
                                Here’s what you can do on the Documents page:
                            </p>


                            <h4 className="h4 mt-3">Document Details:</h4>
                            <ul className="lead text-justify">
                                <li><strong>Thumbnail:</strong> Each document card features a placeholder thumbnail (150
                                    x 150) which can be customized to display a preview or relevant icon of the
                                    document.
                                </li>
                                <li><strong>Title:</strong> The title of the document is prominently displayed below the
                                    thumbnail.
                                </li>
                                <li><strong>Author:</strong> Information about the creator of the document is displayed
                                    for quick reference.
                                </li>
                                <li><strong>Size:</strong> The size of the document is listed to help you manage your
                                    storage efficiently.
                                </li>
                            </ul>

                            <h4 className="h4 mt-3">Action Buttons:</h4>
                            <ul className="lead text-justify">
                                <li><strong>Edit:</strong> Opens the document in the editor for making changes. This
                                    button is styled in blue to indicate the primary action.
                                </li>
                                <li><strong>Download:</strong> Allows you to download the document to your local device.
                                    This button is styled in cyan for visibility.
                                </li>
                                <li><strong>Delete:</strong> Permanently deletes the document from your account. This
                                    button is styled in red to indicate a destructive action.
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={6} className="p-4">
                        <div className="container mt-5">
                            <h2 className="h2 font-weight-bold text-center mb-4">Edit Page Description</h2>


                            <h4 className="h4 mt-3">Text Formatting Toolbar:</h4>
                            <p className="lead text-justify">
                                The toolbar provides a variety of text formatting options that allow you to customize
                                the appearance of your text. These include:
                            </p>
                            <ul className="lead text-justify">
                                <li><strong>Font Style:</strong> Choose from different font styles to match your
                                    document’s needs.
                                </li>
                                <li><strong>Font Size:</strong> Adjust the size of your text for better readability.
                                </li>
                                <li><strong>Bold, Italic, Underline:</strong> Emphasize your text with bold, italic, or
                                    underline options.
                                </li>
                                <li><strong>Strikethrough:</strong> Strike through text that is no longer relevant or to
                                    mark deletions.
                                </li>
                                <li><strong>Text Color and Highlighting:</strong> Change the color of your text or
                                    highlight it to draw attention to important sections.
                                </li>
                                <li><strong>Subscript and Superscript:</strong> Use these for scientific formulas,
                                    footnotes, and more.
                                </li>
                                <li><strong>Headings:</strong> Format your text as different heading levels (H1, H2,
                                    etc.) for better structure.
                                </li>
                                <li><strong>Blockquote:</strong> Format a section of text as a blockquote for
                                    quotations.
                                </li>
                                <li><strong>Code Block:</strong> Format text as a code block for displaying code
                                    snippets.
                                </li>
                                <li><strong>Lists:</strong> Create ordered (numbered) and unordered (bullet) lists to
                                    organize information.
                                </li>
                                <li><strong>Text Alignment:</strong> Align your text to the left, center, right, or
                                    justify it.
                                </li>
                                <li><strong>Indentation:</strong> Increase or decrease the indentation of your
                                    paragraphs.
                                </li>
                            </ul>

                            <h4 className="h4 mt-3">Insert Options:</h4>
                            <ul className="lead text-justify">
                                <li><strong>Link:</strong> Insert hyperlinks into your document.</li>
                                <li><strong>Image:</strong> Add images to your document to make it more engaging.</li>
                                <li><strong>Table:</strong> Insert tables to organize data systematically.</li>
                                <li><strong>Special Characters:</strong> Insert special characters and symbols.</li>
                            </ul>

                            <h4 className="h4 mt-3">Document Area:</h4>
                            <p className="lead text-justify">
                                The main area of the page is dedicated to your document. Here you can type, format, and
                                edit your text in a WYSIWYG (What You See Is What You Get) editor, ensuring that what
                                you see on the screen is what will be printed or saved.
                            </p>

                            <h4 className="h4 mt-3">Save Options:</h4>
                            <ul className="lead text-justify">
                                <li><strong>Save PDF:</strong> Save your document as a PDF file, ensuring it is easily
                                    shareable and printable.
                                </li>
                                <li><strong>Save DOCX:</strong> Save your document in DOCX format for compatibility with
                                    Microsoft Word and other word processors.
                                </li>
                            </ul>



                        </div>
                    </Col>
                    <Col md={6} className="p-4 text-center">
                        <img src={editorImage} alt="Editor" className="img-fluid" style={{width: '100%'}}/>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body className="text-center position-relative">
                    <Button variant="link" onClick={handlePrevious} className="modal-arrow left-arrow">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </Button>
                    <img src={images[currentImageIndex]} alt="Web App Page Full Size" className="img-fluid"/>
                    <Button variant="link" onClick={handleNext} className="modal-arrow right-arrow">
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Home;
