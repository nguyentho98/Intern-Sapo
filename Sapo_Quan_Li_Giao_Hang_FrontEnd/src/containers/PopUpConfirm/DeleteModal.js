import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

const DeleteModal = (props) => {
  const { show } = props;
  const handleClose = () => {
    props.closeModal(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-w600'>
        <Row>
          <Col xs={12} md={12}>
            <div className='a'>
              <label>
                Bạn có chắc muốn xóa sản phẩm này? Hành động này không thể khôi
                phục.
              </label>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-white' onClick={handleClose}>
          Hủy
        </button>
        <Button
          variant='danger'
          onClick={() => {
            props.confirm();
          }}
        >
          Xác Nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
