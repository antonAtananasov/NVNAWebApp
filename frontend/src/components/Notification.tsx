import { Toast } from "react-bootstrap";
// import { Variant } from "react-bootstrap/esm/types";
export enum NotificationVariant {

    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    light = 'light',
    dark = 'dark',

}

export interface Props { title: string, subtitle: string, message: string, variant?: NotificationVariant }
const Notification = (props: Props) => {
    return (
        <Toast bg={String(props.variant)} className='position-absolute start-50 translate-middle'>
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
