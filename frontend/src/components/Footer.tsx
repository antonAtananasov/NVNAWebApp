import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white text-center text-lg-start">
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 Copyright:
                <a className="text-white"> NVNAWEBApp</a>
            </div>
        </footer>
    );
};

export default Footer;
