import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FileManager.css';
import { ICreateDocumentRequest, IDocument } from '../dtos/dtos'
import { useNavigate } from 'react-router-dom';
import { NotificationContext, INotificationContext, INotification, SessionContext } from '../dtos/extras';
import { Document, Packer, Paragraph } from 'docx';
import saveAs from 'file-saver';

const FileManager: React.FC = () => {
    const [documents, setDocuments] = useState<IDocument[]>([]);
    const { session } = useContext(SessionContext)!
    const { setNotification } = useContext(NotificationContext) as INotificationContext
    useEffect(() => {
        fetch('http://localhost:3001/api/documents/gallery', {
            method: 'get', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'include',
        }).then((res: Response) => {
            if (res.status === 200) {
                res.json().then((docs: any) => {
                    setDocuments(docs.map((d: any) => d as IDocument)) //can be sorted
                })
            }
            else {
                setNotification({ title: res.statusText, subtitle: String(res.status), message: 'Try logging in again' } as INotification)
            }
        }).catch()
    }, [])
    const navigate = useNavigate()
    const handleDelete = (doc: IDocument) => {
        fetch('http://localhost:3001/api/documents/' + doc.uuid, {
            method: 'delete', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'include',
        }).then(async (res: Response) => {
            if (res.status === 200) {
                const doc: IDocument = await res.json() as IDocument
                setDocuments(documents.filter((d) => d.uuid != doc.uuid))
                setNotification({ title: res.statusText, subtitle: String(res.status), message: 'Successfully deleted ' + doc.name } as INotification)
            }
            else {
                const t = await res.text()
                setNotification({ title: res.statusText, subtitle: String(res.status), message: t } as INotification)
            }
        }).catch()
    }

    const handleCreateNewDoc = () => {
        const req: ICreateDocumentRequest = {
            ownerUUID: session?.uuid!,
            name: 'New Document.txt'
        }
        fetch('http://localhost:3001/api/documents/' + session?.uuid, {
            method: 'post', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'include', body: JSON.stringify(req)
        }).then(async (res: Response) => {
            if (res.status === 200) {
                const doc: IDocument = await res.json() as IDocument
                setNotification({ title: res.statusText, subtitle: String(res.status), message: 'Successfully created ' + doc.name } as INotification)
                navigate('/edit/' + doc.uuid)
            }
            else {
                const t = await res.text()
                setNotification({ title: res.statusText, subtitle: String(res.status), message: t } as INotification)
            }
        }).catch()
    }
    const handleDownload = async (idoc: IDocument) => {
        fetch('http://localhost:3001/api/documents/document/' + idoc.uuid, {
            method: 'get', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'include'
        }).then(async (res: Response) => {
            if (res.status === 200) {
                const idoc: IDocument = await res.json() as IDocument
                const doc = new Document({
                    sections: [idoc.content || ''].map(page => ({
                        children: [new Paragraph(page)]
                    }))
                });
                const blob = await Packer.toBlob(doc);
                saveAs(blob, `${idoc.name || 'document'}.docx`);

            }
            else {
                const t = await res.text()
                setNotification({ title: res.statusText, subtitle: String(res.status), message: t } as INotification)
            }
        }).catch()
    }

    return (
        <>
            <Row className={'justify-content-center'}>
                <Col md={8} className='px-5'>
                    <Row className="file-manager-header mt-5">
                        <h2>My Documents</h2>
                    </Row>
                    <Row className='align-items-center'>
                        {/* new dox */}
                        <Col key={String(new Date().getTime())} xs={12} sm={6} md={4} lg={3} className="mb-4 h-100">
                            <Card className="text-center h-auto">
                                <Card.Img onClick={handleCreateNewDoc} variant="top" src={`/src/assets/new.png`} alt={'NEW'} className='h-100' />
                                <Card.Body>
                                    <Button variant="primary" className="w-100 my-1" onClick={handleCreateNewDoc}>Create New Document</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        {documents.map((doc) => (
                            <Col key={doc.uuid} xs={12} sm={6} md={4} lg={3} className="mb-4 h-100">
                                <Card className="text-center h-100">
                                    <Card.Img onClick={() => { navigate('/edit/' + doc.uuid) }} variant="top" src={`/src/assets/${doc.format ? doc.format : "unknown"}.png`} alt={doc.name.includes('.') ? doc.name.split('.')[1].toUpperCase() : '???'} className='h-auto' />
                                    <Card.Body>
                                        <Card.Title className='m-0'>{doc.name}</Card.Title>
                                        <Card.Text className='m-0'>Last accessed: {new Date(doc.lastAccessedDate!).toLocaleDateString()}</Card.Text>
                                        <Card.Text className='m-0'>Last modified: {new Date(doc.lastModifiedDate!).toLocaleDateString()}</Card.Text>
                                        <Card.Text className='mb-0'>Size: {((doc.size ? doc.size : 0) / 1000).toFixed(2)} KB</Card.Text>
                                        <div className="justify-content-around">
                                            <Button variant="primary" className="btn-sm" onClick={() => { navigate('/edit/' + doc.uuid) }}>Edit</Button>
                                            <Button variant="info" className="btn-sm m-1" onClick={() => { handleDownload(doc) }}>Download</Button>
                                            <Button variant="danger" className="btn-sm" onClick={() => { handleDelete(doc) }}>Delete</Button>
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
