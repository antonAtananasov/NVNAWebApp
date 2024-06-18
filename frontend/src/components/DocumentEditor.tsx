import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph } from 'docx';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import './DocumentEditor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { ICreateDocumentRequest, IDocument, IRenameDocumentRequest, IUpdateDocumentContentRequest } from '../dtos/dtos';
import { INotification, ISessionContext, NotificationContext, SessionContext } from '../dtos/extras';

interface IBooleanContext {
    isWaitingResponse: boolean | undefined,
    setIsWaitingResponse: React.Dispatch<React.SetStateAction<boolean>>
}
const IsWaitingResponseContext = createContext<IBooleanContext>({} as IBooleanContext)

const CustomToolbar: React.FC<{
    handleSaveDoc: () => void,
    handleSavePDF: () => void,
    handleImportDoc: (event?: React.ChangeEvent<HTMLInputElement>) => void,
    handleImportPDF: (event?: React.ChangeEvent<HTMLInputElement>) => void,
}> = ({ handleSaveDoc, handleSavePDF }) => {
    const { isWaitingResponse } = useContext(IsWaitingResponseContext)
    const resetStyle = {
        all: 'revert'
    } as React.CSSProperties
    return (
        <div id="toolbar" className="d-flex flex-wrap align-items-start gap-10 w-100 justify-content-start">
            {/* Quill Toolbar */}
            <select className="ql-header" defaultValue={0} onChange={e => e.persist()}>
                <option value="1">Header 1</option>
                <option value="2">Header 2</option>
                <option value="3">Header 3</option>
                <option value="4">Header 4</option>
                <option value="5">Header 5</option>
                <option value='6'>Header 6</option>
                <option value="0">Normal</option>
            </select>
            <select className="ql-font"></select>
            <select className="ql-size"></select>
            <button className="ql-bold" aria-label="Bold">B</button>
            <button className="ql-italic" aria-label="Italic">I</button>
            <button className="ql-underline" aria-label="Underline">U</button>
            <button className="ql-strike" aria-label="Strike">S</button>
            <select className="ql-color"></select>
            <select className="ql-background"></select>
            <button className="ql-script" value="sub" aria-label="Subscript">Sub</button>
            <button className="ql-script" value="super" aria-label="Superscript">Sup</button>
            <button className="ql-header" value="1" aria-label="Header 1">H1</button>
            <button className="ql-header" value="2" aria-label="Header 2">H2</button>
            <button className="ql-blockquote" aria-label="Blockquote">“</button>
            <button className="ql-code-block" aria-label="Code">Code</button>
            <button className="ql-list" value="ordered" aria-label="Ordered List">OL</button>
            <button className="ql-list" value="bullet" aria-label="Bullet List">UL</button>
            <button className="ql-indent" value="-1" aria-label="Indent -1">Indent -</button>
            <button className="ql-indent" value="+1" aria-label="Indent +">Indent +</button>
            <select className="ql-align"></select>
            <button className="ql-direction" value="rtl" aria-label="Right to Left">RTL</button>
            <button className="ql-link" aria-label="Link">Link</button>
            <button className="ql-image" aria-label="Image">Image</button>
            <button className="ql-video" aria-label="Video">Video</button>
            <button className="ql-clean" aria-label="Clean">Clean</button>

            {/* Custom Buttons */}
            <div style={resetStyle} className='row ml-auto'>
                <div style={resetStyle} className='col-4 gap-2 d-flex' >
                    <Button style={resetStyle} className={'p-2 rounded bg-primary border-0 text-white'} variant='primary' onClick={handleSavePDF}>Save PDF</Button>
                    <Button style={resetStyle} className={'p-2 rounded bg-primary border-0 text-white'} variant='primary' onClick={handleSaveDoc}>Save DOCX</Button>
                    {isWaitingResponse && <Spinner variant='secondary' />}

                </div>

            </div>
        </div>
    );
};

const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            save: () => {
                document.getElementById('saveDropdown')?.click();
            }
        }
    },
};

const DocumentEditor: React.FC = () => {
    const [pages, setPages] = useState<string[]>(['']);
    const [documentName, setDocumentName] = useState<string>(''); // State for document name
    const containerRef = useRef<HTMLDivElement>(null);
    const { setNotification } = useContext(NotificationContext)!
    const [isWaitingResponse, setIsWaitingResponse] = useState<boolean>(false)
    const { session } = useContext(SessionContext) as ISessionContext

    const handleSaveDoc = async () => {
        const doc = new Document({
            sections: pages.map(page => ({
                children: [new Paragraph(page)]
            }))
        });
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${documentName || 'document'}.docx`);
    };

    const handleSavePDF = async () => {
        const doc = new jsPDF();
        pages.forEach((page, index) => {
            if (index > 0) {
                doc.addPage();
            }
            doc.text(page, 10, 10);
        });
        doc.save(`${documentName || 'document'}.pdf`);
    };

    const handleImportDoc = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setPages([result.value]);
        }
    };

    const handleImportPDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            let extractedText = '';
            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                extractedText += pageText + '\n';
            }
            setPages([extractedText]);
        }
    };

    const handlePageChange = async (content: string, index?: number) => {
        index//
        setIsWaitingResponse(true)
        const newPages = [content];
        setPages(newPages);
        const locationParts = location.pathname.split('/')
        const documentUUID = locationParts[locationParts.length - 1]
        const req: IUpdateDocumentContentRequest = {
            uuid: documentUUID,
            content: newPages.join('\n')
        }

        fetch('http://localhost:3001/api/documents/' + documentUUID, {
            method: 'PUT', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'include', body: JSON.stringify(req)
        }).then((res: Response) => {
            setIsWaitingResponse(false)
            if (res.status === 200) {
                // res.json().then((docs: any) => { docs && setDocuments(docs) })
            }
            else {
                res.text().then(t => {
                    setNotification({ title: res.statusText, subtitle: String(res.status), message: t } as INotification)

                })
            }

        })
        // setIsWaitingResponse(false)

    };
    const handleDocumentNameChange = async (newName: string) => {
        setIsWaitingResponse(true)

        setDocumentName(newName);
        const locationParts = location.pathname.split('/')
        const documentUUID = locationParts[locationParts.length - 1]
        const req: IRenameDocumentRequest = {
            uuid: documentUUID,
            newName: newName
        }
        fetch('http://localhost:3001/api/documents/' + documentUUID, {
            method: 'put', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'include', body: JSON.stringify(req)
        }).then((res: Response) => {
            if (res.status === 200) {
                // res.json().then((docs: any) => { docs && setDocuments(docs) })
            }
            else {
                res.text().then(t => {
                    setNotification({ title: res.statusText, subtitle: String(res.status), message: t } as INotification)

                })
            }
            setIsWaitingResponse(false)

        }).catch(() => {
            setIsWaitingResponse(false)
        })

    };
    const location = useLocation()
    useEffect(() => {
        setIsWaitingResponse(true)
        const container = containerRef.current;
        if (container) {
            const quills = container.querySelectorAll('.editor-input .ql-editor');
            quills.forEach((quill: any) => {
                quill.addEventListener('input', () => {
                    if (quill.scrollHeight > quill.clientHeight) {
                        setPages((prevPages) => {
                            const newPages = [...prevPages];
                            if (newPages[newPages.length - 1] !== '') {
                                newPages.push('');
                            }
                            return newPages;
                        });
                    }
                });
            });
        }
        const pathArr = location.pathname.split('/')
        const docId = pathArr[pathArr.length - 1]
        if (location.pathname.endsWith('/editor')) {
            const newDoc: ICreateDocumentRequest = {
                name: 'New Document.txt',
                ownerUUID: session?.uuid!
            }
            fetch('http://localhost:3001/api/documents/' + session?.uuid, {
                method: 'post', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }, credentials: 'include', body: JSON.stringify(newDoc)
            }).then(async (res: Response) => {
                if (res.status === 200) {
                    res.json().then((doc: any) => {
                        if (doc) {
                            navigate('/edit/' + doc.uuid)
                        }
                    })
                } else {
                    setNotification({ title: res.statusText, subtitle: String(res.status), message: 'Try logging in again' } as INotification)

                }
                setIsWaitingResponse(false)
            }).catch()
        }
        else
            fetch('http://localhost:3001/api/documents/document/' + docId, {
                method: 'get', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }, credentials: 'include',
            }).then(async (res: Response) => {
                if (res.status === 200) {
                    res.json().then((doc: any) => {
                        if (doc) {
                            const d: IDocument = doc as IDocument
                            if (!d.content) {
                                d.content = ''
                            }
                            setPages([d.content!])
                            setDocumentName(d.name)
                        }
                    })
                } else {
                    setNotification({ title: res.statusText, subtitle: String(res.status), message: 'Try logging in again' } as INotification)

                }
                setIsWaitingResponse(false)
            }).catch()
    }, []);
    const navigate = useNavigate()

    return (
        <IsWaitingResponseContext.Provider value={{ isWaitingResponse, setIsWaitingResponse }}>

            <Container fluid className="p-3">
                <Row>
                    <Col xs={12} className="mb-2">
                        <Row className='d-flex'>
                            <input
                                type="text"
                                placeholder="Document Name"
                                value={documentName}
                                onChange={(e) => handleDocumentNameChange(e.target.value)}
                                className="form-control mb-2"
                            />
                        </Row>

                        <CustomToolbar
                            handleSaveDoc={handleSaveDoc}
                            handleSavePDF={handleSavePDF}
                            handleImportDoc={(e) => { handleImportDoc(e!) }}
                            handleImportPDF={(e) => { handleImportPDF(e!) }}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6} className="mb-2 editor-container" ref={containerRef}>
                        {pages.map((page, index) => (
                            <ReactQuill
                                key={index}
                                theme='snow'
                                value={page}
                                onChange={(content: string) => handlePageChange(content, index)}
                                className={`editor-input ${index === 0 ? 'first-page' : ''}`}
                                modules={modules}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </IsWaitingResponseContext.Provider>

    );
}

export default DocumentEditor;
