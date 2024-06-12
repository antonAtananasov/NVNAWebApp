import './NotFound.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Row, Col, Card, Button } from 'react-bootstrap'

const NotFound = () => {

    return (
        <>
            <Row className={'justify-content-center'}>
                <Col md={8}>
                    <Row className="file-manager-header mt-5">
                        <h1>
                            404 Not Found
                        </h1>
                    </Row>
                </Col>
            </Row>
            {/* 404 but pretty... */}
        </>
    )
}
export default NotFound