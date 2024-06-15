import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FileManager.css';
import { IDocument } from '../dtos/dtos'
import { useNavigate } from 'react-router-dom';
import { NotificationContext, INotificationContext, INotification } from '../dtos/extras';

const FileManager: React.FC = () => {
    const newDoc: IDocument = {
        size: 0,
        name: 'Create new',
        uuid: '',
        ownerUUID: '',
        format: '+',
    }
    const [documents, setDocuments] = useState<IDocument[]>([newDoc]);
    const { setNotification } = useContext(NotificationContext) as INotificationContext
    useEffect(() => {
        fetch('http://localhost:3001/api/documents/gallery', {
            method: 'get', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'include',
        }).then((res: Response) => {
            if (res.status === 200) {
                res.json().then((docs: any) => { docs && setDocuments(docs); console.log(docs) })
            }
            else {
                setNotification({ title: res.statusText, subtitle: String(res.status), message: String(res.body) } as INotification)
            }
        }).catch()
    }, [])
    const navigate = useNavigate()

    return (
        <>
            <Row className={'justify-content-center'}>
                <Col md={8} className='px-5'>
                    <Row className="file-manager-header mt-5">
                        <h2>My Documents</h2>
                    </Row>
                    <Row>
                        {documents.map((doc) => (
                            <Col key={doc.uuid} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Card className="text-center h-100">
                                    <Card.Img variant="top" src={`/src/assets/${doc.format ? doc.format : "unknown"}.png`} alt={doc.name.split('.')[1]} className='h-100' />
                                    <Card.Body>
                                        <Card.Title className='mb-0'>{doc.name}</Card.Title>
                                        {/* <Card.Text>Created by: {doc.createdBy}</Card.Text> */}
                                        <Card.Text className='mb-0'>Size: {doc.size}</Card.Text>
                                        <div className="justify-content-around">
                                            <Button variant="primary" className="btn-sm" onClick={() => { navigate('/edit/' + doc.uuid) }}>Edit</Button>
                                            <Button variant="info" className="btn-sm m-1">Download</Button>
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
        </>
    );
};

export default FileManager;
