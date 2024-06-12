import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph } from 'docx';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { ButtonGroup, Dropdown, DropdownButton, Container, Row, Col } from 'react-bootstrap';
import './DocumentEditor.css';
import { ShareButton, DeleteButton, DownloadButton, SaveButton } from './FileControls';

const CustomToolbar: React.FC<{
    handleSaveDoc: () => void,
    handleSavePDF: () => void,
    handleImportDoc: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleImportPDF: (event: React.ChangeEvent<HTMLInputElement>) => void,
}> = ({ handleSaveDoc, handleSavePDF, handleImportDoc, handleImportPDF }) => {
    return (
        <div id="toolbar" className="d-flex flex-wrap align-items-center gap-10">
            {/* Quill Toolbar */}
            <select className="ql-header" defaultValue="" onChange={e => e.persist()}>
                <option value="1">Header 1</option>
                <option value="2">Header 2</option>
                <option value="3">Header 3</option>
                <option value="4">Header 4</option>
                <option value="5">Header 5</option>
                <option value="6">Header 6</option>
                <option value="">Normal</option>
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
            <ButtonGroup className="ml-2">
                <DropdownButton as={ButtonGroup} title="Save" variant="primary" className="ql-custom-button">
                    <Dropdown.Item onClick={handleSaveDoc}>AS DOCX</Dropdown.Item>
                    <Dropdown.Item onClick={handleSavePDF}>AS PDF</Dropdown.Item>
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Import" variant="primary" className="ql-custom-button">
                    <Dropdown.Item>
                        <input type="file" accept=".doc,.docx" onChange={handleImportDoc} className="form-control-file" />
                        AS DOCX
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="file" accept=".pdf" onChange={handleImportPDF} className="form-control-file" />
                        AS PDF
                    </Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>

            {/* Import buttons from FileControls */}
            <ShareButton />
            <DeleteButton />
            <DownloadButton />
            <SaveButton />
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
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSaveDoc = async () => {
        const doc = new Document({
            sections: pages.map(page => ({
                children: [new Paragraph(page)]
            }))
        });
        const blob = await Packer.toBlob(doc);
        saveAs(blob, 'document.docx');
    };

    const handleSavePDF = async () => {
        const doc = new jsPDF();
        pages.forEach((page, index) => {
            if (index > 0) {
                doc.addPage();
            }
            doc.text(page, 10, 10);
        });
        doc.save('document.pdf');
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

    const handlePageChange = (content: string, index: number) => {
        const newPages = [...pages];
        newPages[index] = content;
        if (content.length > 2000 && index === pages.length - 1) { // Adjust the length check as needed
            newPages.push('');
        }
        setPages(newPages);
    };

    useEffect(() => {
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
    }, [pages]);

    return (
        <Container fluid className="p-3">
            <Row>
                <Col xs={12} className="mb-2">
                    <CustomToolbar
                        handleSaveDoc={handleSaveDoc}
                        handleSavePDF={handleSavePDF}
                        handleImportDoc={handleImportDoc}
                        handleImportPDF={handleImportPDF}
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
                            onChange={(content) => handlePageChange(content, index)}
                            className={`editor-input ${index === 0 ? 'first-page' : ''}`}
                            modules={modules}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default DocumentEditor;
