import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Document {
    id: number;
    name: string;
    creator: string;
    size: string;
    icon: string; // URL или път към иконата
}

const documents: Document[] = [
    {
        id: 1,
        name: 'Document 1',
        creator: 'User A',
        size: '2 MB',
        icon: '/path/to/icon1.png',
    },
    {
        id: 2,
        name: 'Document 2',
        creator: 'User B',
        size: '1.5 MB',
        icon: '/path/to/icon2.png',
    },
    // Добавете още документи тук
];

const FileManager: React.FC = () => {
    const navigate = useNavigate();

    const handleOpen = (documentId: number) => {
        navigate(`/editor/${documentId}`);
    };

    return (
        <Container>
            <Row>
                {documents.map((document) => (
                    <Col key={document.id} md={4} lg={3} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={document.icon} alt={document.name} />
                            <Card.Body>
                                <Card.Title>{document.name}</Card.Title>
                                <Card.Text>
                                    <strong>Created by:</strong> {document.creator}
                                    <br />
                                    <strong>Size:</strong> {document.size}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleOpen(document.id)}>Open</Button>
                                <Button variant="secondary" className="mx-2">Save</Button>
                                <Button variant="info">Import</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FileManager;
