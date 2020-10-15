import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring/web.cjs';
import { CusTextField } from '../Styles';

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export default function ConfirmModal(props) {
    const [open, setOpen] = React.useState(false);
    const note = useRef("")

    useEffect(() => {
        setOpen(props.openModal);
    }, [props]);

    const handleSucess = () => {
        setOpen(false);
        props.successConfirm(props.status, note.current.value)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.closeModal()
    };
    return (
        <Modal show={open} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận trạng thái</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-w600'>
                {props.status === 5 ?
                    <CusTextField
                        multiline
                        label="Lý do giao lại"
                        name="note"
                        rows={4}
                        fullWidth
                        variant="outlined"
                        inputRef={note}
                    /> : props.status === 4 ?
                        <h5 className="text-success" id="spring-modal-description">Bạn đã giao hàng thành công?</h5>
                        : props.status === 6 ?
                            <h5 className="text-danger" id="spring-modal-description">Bạn muốn hủy đơn hàng?</h5> : <></>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='btn btn-white' onClick={handleClose}>Đóng</Button>
                <Button variant='primary' onClick={handleSucess}>Xác nhận</Button>
            </Modal.Footer>
        </Modal>
    )
}