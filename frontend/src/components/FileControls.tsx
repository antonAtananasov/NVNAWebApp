import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Row } from 'react-bootstrap'; // Добавени липсващи импорти

export const ShareButton: React.FC = () => (
    <Button className="m-2" variant="primary">
        Share
    </Button>
);

export const DeleteButton: React.FC = () => (
    <Button className="m-2" variant="danger">
        Delete
    </Button>
);

export const DownloadButton: React.FC = () => (
    <Button className="m-2" variant="info">
        Download
    </Button>
);

export const SaveButton: React.FC = () => (
    <Button className="m-2" variant="success">
        Save
    </Button>
);

export const SearchBar: React.FC = () => (
    <InputGroup className="search-bar m-2">
        <FormControl
            placeholder="Search..."
            aria-label="Search"
            className="form-control"
        />
        <Button variant="outline-secondary" className="btn">
            Search
        </Button>
    </InputGroup>
);

export const CustomDropdown: React.FC = () => (
    <DropdownButton className="m-2 me-auto" id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
);

const FileControls: React.FC = () => {
    return (
        <div className="d-flex flex-column">
            <Container>
                <Row>
                    <Col md="auto">
                        <ShareButton />
                    </Col>
                    <Col md="auto">
                        <DeleteButton />
                    </Col>
                    <Col md="auto">
                        <DownloadButton />
                    </Col>
                    <Col md="auto">
                        <SaveButton />
                    </Col>
                    <Col md="auto">
                        <SearchBar />
                    </Col>
                    <Col md="auto">
                        <CustomDropdown />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FileControls;



