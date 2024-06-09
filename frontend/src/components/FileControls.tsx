import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileControls = () => {

    return (
        <>
            <div className={"d-flex flex-column "}>
                <Button className={"button-primary m-2"}>
                    Share
                </Button>
                <Button onClick={ () => {fetch("http://localhost:3000/", {method: "DELETE", body: JSON.stringify({username:"anton", permission:"read"})}).then(response => console.log(response.text()) )}} className={"button-danger m-2"} variant={"danger"}>
                    Delete
                </Button>
                <Button onClick={ () => {fetch("http://localhost:3000/", {method: "GET", /*body: JSON.stringify({username:"anton", permission:"read"})*/}).then(response => console.log(response.text()) )}} className={"button-info m-2"} variant={"info"}>
                    Download
                </Button>

            </div>
            {/* share, delete, download a file, buttons... */}
        </>
    )
}

export default FileControls