import { useContext, useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';
import './EditUser.css'; // Import the CSS file
import { INotification, INotificationContext, NotificationContext, SessionContext } from '../dtos/extras';
import { IUserChangeCredentialsRequest, IUserSession } from '../dtos/dtos';

interface Props {
    hidden?: boolean,
    onClose: () => void
}
const EditUser = (props: Props) => {
    const { session, setSession } = useContext(SessionContext)!
    const [userName, setUserName] = useState(session?.username);
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [oldPassword2, setOldPassword2] = useState('');
    const { setNotification } = useContext(NotificationContext) as INotificationContext

    const handleSave = () => {
        // Handle save logic here
        const req: IUserChangeCredentialsRequest = {
            password: oldPassword,
            username: session?.username!,
            newPassword: password.length >= 6 ? password : undefined,
            newUsername: userName != session?.username && userName!.length >= 4 ? userName : undefined
        }
        console.log(req)
        fetch('http://localhost:3001/api/users/' + session?.uuid, {
            method: 'put', body: JSON.stringify(req), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, credentials: 'include',
        }).then((res: Response) => {
            if (res.status === 200) {
                res.json().then((json: any) => {
                    const sessionData = json as IUserSession;
                    setSession(() => sessionData)
                    document.cookie = 'session=' + JSON.stringify(json) + ';'
                })

                setNotification({ title: 'Change account', subtitle: String(res.status), message: JSON.stringify('Successfully updated credentials') } as INotification)
                props.onClose()
            }
            else {
                setNotification({ title: res.statusText, subtitle: String(res.status), message: JSON.stringify(res.body) } as INotification)
            }
        }).catch()

    };

    return (
        <Offcanvas show onHide={props.onClose} placement="end">
            <Offcanvas.Header closeButton onClick={() => { props.onClose() }}>
                <Offcanvas.Title>Edit User</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your user name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="custom-input" // Add custom CSS class
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="custom-input" // Add custom CSS class
                        />
                    </Form.Group>
                    <br className='py-4'></br>
                    <hr className='py-3'></hr>
                    <Form.Group className="mb-3" controlId="formPassword1">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="custom-input" // Add custom CSS class
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword2">
                        <Form.Label>Repeat old Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your old password"
                            value={oldPassword2}
                            onChange={(e) => setOldPassword2(e.target.value)}
                            className="custom-input" // Add custom CSS class
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EditUser;
