import React, { useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';
import './EditUser.css'; // Import the CSS file

const EditUser = ({ onClose }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        // Handle save logic here
        console.log('User Name:', userName);
        console.log('Password:', password);
        onClose();
    };

    return (
        <Offcanvas show onHide={onClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit User</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your user name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="custom-input" // Add custom CSS class
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="custom-input" // Add custom CSS class
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EditUser;
