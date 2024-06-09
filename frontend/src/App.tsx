import { useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar } from 'react-bootstrap'
import { Container, Row, Col } from "react-bootstrap";

// const testGet = async (setter: React.Dispatch<React.SetStateAction<string>>) => {
//     const result = await fetch('http://localhost:3000/')
//     const text = await result.text()
//     setter(text)
// }


function App() {
    // const [count, setCount] = useState(0)
    // const [text, setText] = useState('loading...')
    // useEffect(() => {
    //     testGet(setText)
    // })

    return (
        <>
            {/* put the BrowserRouter and Route tags here */}
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>


            <Container data-bs-theme="light position" fluid className="w-100">
                <Row className="w-100 mt-4 mb-4">
                    <Col className='col-2 border-end'>Left panel</Col>
                    <Col className='col-8'>
                        <Row className='w-100 p-3 d-flex text-start'>
                            <div>
                                <h1>Title</h1>
                                <h2>Subtitle</h2>
                                <br></br>
                                <section>Content</section>
                            </div>
                        </Row>
                    </Col>
                    <Col className='col-2 border-start'>Right panel</Col>
                </Row>
                <Row className='w-100 p-3 border-top'>Footer</Row>

            </Container>       {/* 
 */}
            {/*  */}
        </>
    )
}

export default App
