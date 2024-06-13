// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useState } from 'react';
// import { Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Row } from 'react-bootstrap';
//
//
// const FileControls: React.FC = () => {
//     return (
//         <>
//             <div className={"d-flex flex-column "}>
//                 <Container>
//                     <Row>
//                         <Col md="auto">
//                             <Button /*onClick={ () => {fetch("http://localhost:3000/api/documents/share", {method:"POST", body: JSON.stringify( {documentUUID: .body.documentUUID, userUUID: .body.userUUID, permission: .body.permission}  )}  )}    }*/ className={"button-primary m-2"} >
//                                 Share
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <Button onClick={() => {
//                                 fetch("http://localhost:3000/", {
//                                     method: "DELETE",
//                                     body: JSON.stringify({ username: "anton", permission: "read" })
//                                 }).then(response => console.log(response.text()))
//                             }} className={"button-danger m-2"} variant={"danger"}>
//                                 Delete
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <Button onClick={() => {
//                                 fetch("http://localhost:3000/", { method: "GET", /*body: JSON.stringify({username:"anton", permission:"read"})*/ }).then(response => console.log(response.text()))
//                             }} className={"button-info m-2"} variant={"info"}>
//                                 Download
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <Button className={"button-info m-2"} variant="success">
//                                 Save
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <InputGroup>
//                                 <InputGroup.Text className={"m-2"}>@</InputGroup.Text>
//                                 <FormControl
//                                     className={"m-2"}
//                                     placeholder="Username"
//                                     aria-label="Username"
//                                 />
//                             </InputGroup>
//                         </Col>
//                         <Col md="auto">
//                             <button className={"m-2"}/*value={button} onClick={() => setButton()}*/>
//                                 Share
//                             </button>
//                         </Col>
//                         <Col md="auto">
//                             <DropdownButton className={"m-2 me-auto"} id="dropdown-basic-button" title="Dropdown button">
//                                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                             </DropdownButton>
//                         </Col>
//                     </Row>
//                 </Container>
//
//             </div>
//             {/* share, delete, download a file, buttons... */
//             }
//         </>
//     )
// }
//
// export default FileControls

//_________________

//БОТКО

// _____________________
// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Row } from 'react-bootstrap';
//
// const FileControls: React.FC = () => {
//     return (
//         <>
//             <div className={"d-flex flex-column "}>
//                 <Container>
//                     <Row>
//                         <Col md="auto">
//                             <Button className={"button-primary m-2"} >
//                                 Share
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <Button onClick={() => {
//                                 fetch("http://localhost:3000/", {
//                                     method: "DELETE",
//                                     body: JSON.stringify({ username: "anton", permission: "read" })
//                                 }).then(response => console.log(response.text()))
//                             }} className={"button-danger m-2"} variant={"danger"}>
//                                 Delete
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <Button onClick={() => {
//                                 fetch("http://localhost:3000/", { method: "GET" }).then(response => console.log(response.text()))
//                             }} className={"button-info m-2"} variant={"info"}>
//                                 Download
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <Button className={"button-info m-2"} variant="success">
//                                 Save
//                             </Button>
//                         </Col>
//                         <Col md="auto">
//                             <InputGroup>
//                                 <InputGroup.Text className={"m-2"}>@</InputGroup.Text>
//                                 <FormControl
//                                     className={"m-2"}
//                                     placeholder="Username"
//                                     aria-label="Username"
//                                 />
//                             </InputGroup>
//                         </Col>
//                         <Col md="auto">
//                             <button className={"m-2"}>
//                                 Share
//                             </button>
//                         </Col>
//                         <Col md="auto">
//                             <DropdownButton className={"m-2 me-auto"} id="dropdown-basic-button" title="Dropdown button">
//                                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                             </DropdownButton>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </>
//     )
// }
//
// export default FileControls;

//_________
//ХЕЛИ
//___________
//
//
// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// export const ShareButton: React.FC = () => (
//     <Button className="m-2" variant="primary">
//         Share
//     </Button>
// );
//
// export const DeleteButton: React.FC = () => (
//     <Button className="m-2" variant="danger">
//         Delete
//     </Button>
// );
//
// export const DownloadButton: React.FC = () => (
//     <Button className="m-2" variant="info">
//         Download
//     </Button>
// );
//
// export const SaveButton: React.FC = () => (
//     <Button className="m-2" variant="success">
//         Save
//     </Button>
// );
//
// const FileControls: React.FC = () => {
//     return (
//         <div className="d-flex flex-column">
//             <ShareButton />
//             <DeleteButton />
//             <DownloadButton />
//             <SaveButton />
//         </div>
//     );
// };
//
// export default FileControls;
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



