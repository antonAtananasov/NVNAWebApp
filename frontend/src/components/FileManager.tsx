import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FileManager.css';
import { DeleteButton, DownloadButton } from './FileControls';

interface Document {
    id: string;
    name: string;
    createdBy: string;
    size: string;
    thumbnail: string;
}

const FileManager: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: '1',
            name: 'test.docx',
            createdBy: 'Knotek, Jake',
            size: '15 KB',
            thumbnail: 'https://via.placeholder.com/150'
        },
        {
            id: '2',
            name: 'Test 2.docx',
            createdBy: 'Knotek, Jake',
            size: '20 KB',
            thumbnail: 'https://via.placeholder.com/150'
        },
        {
            id: '3',
            name: 'Test 3.docx',
            createdBy: 'Knotek, Jake',
            size: '25 KB',
            thumbnail: 'https://via.placeholder.com/150'
        },
        {
            id: '4',
            name: 'Test 4.docx',
            createdBy: 'Knotek, Jake',
            size: '30 KB',
            thumbnail: 'https://via.placeholder.com/150'
        }
    ]);

    // Uncomment the following useEffect block to fetch data from an API
    /*
    useEffect(() => {
      // Fetch documents from database
      fetch('/api/documents') // Примерна URL за взимане на данни от API
        .then(response => response.json())
        .then(data => setDocuments(data))
        .catch(error => console.error('Error fetching documents:', error));
    }, []);
    */

    return (
        <Row className={'justify-content-center'}>
            <Col md={8}>
                <Row className="file-manager-header mt-5">
                    <h2>My Documents</h2>
                </Row>
                <Row>
                    {documents.map((doc) => (
                        <Col key={doc.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="text-center h-100">
                                <Card.Img variant="top" src={doc.thumbnail} alt={doc.name} />
                                <Card.Body>
                                    <Card.Title>{doc.name}</Card.Title>
                                    <Card.Text>Created by: {doc.createdBy}</Card.Text>
                                    <Card.Text>Size: {doc.size}</Card.Text>
                                    <div className="d-flex justify-content-around">
                                        <Button variant="primary" className="btn-sm">Edit</Button>
                                        <Button variant="info" className="btn-sm">Download</Button>
                                        <Button variant="danger" className="btn-sm">Delete</Button>
                                        {/* <DownloadButton /> */}
                                        {/* <DeleteButton /> */}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default FileManager;
