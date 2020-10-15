import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';

const ProgressDelete = (props) => {
  const [progress, setProgress] = useState(0);
  const [t, setT] = useState(0);
  const { show, handleClose, totalProgress, pro } = props;

  useEffect(() => {
    let a = 100 / totalProgress;
    setTimeout(() => {
      setProgress(progress + a);
    }, 1000);
  }, [props]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa sản phẩm</Modal.Title>
      </Modal.Header>

      <Modal.Body className='modal-w600'>
        <Row>
          <Col xs={12} md={12}>
            <LoadingBar color='#08f' height='3px' progress={progress} />
          </Col>
          <Col xs={12} md={12} className='text-center'>
            {progress < 100 ? (
              <h1>Đang xóa dữ liệu</h1>
            ) : (
              <React.Fragment>
                <h1>Xóa hoàn tất</h1>
                <h3>{totalProgress + ' sản phẩm đã xóa'}</h3>
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            props.close(false);
          }}
        >
          Xác Nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProgressDelete;
