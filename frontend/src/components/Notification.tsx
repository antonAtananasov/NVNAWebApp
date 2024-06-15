import { Toast } from "react-bootstrap";
import { NotificationVariant } from "../dtos/extras";
// import { Variant } from "react-bootstrap/esm/types";

interface Props { title: string, subtitle: string, message: string, variant?: NotificationVariant }
const Notification = (props: Props) => {
    return (
        <Toast bg={String(props.variant)} className='position-absolute start-50 translate-middle' style={{ zIndex: 100, top: '50px' }}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{props.title}</strong>
                <small>{props.subtitle}</small>
            </Toast.Header>
            <Toast.Body className={props.variant === NotificationVariant.dark ? 'text-white' : ''}>{props.message}</Toast.Body>
        </Toast>
    );
}

export default Notification
