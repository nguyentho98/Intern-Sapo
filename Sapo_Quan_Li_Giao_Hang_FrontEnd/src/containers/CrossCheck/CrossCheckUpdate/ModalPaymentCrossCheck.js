import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { toastError } from '../../../helper/ToastHelper';

const ModalPaymentCrossCheck = (props) => {
  const { show } = props;
  const [money, setMoney] = useState(0);
  const [option, setOption] = useState(0);
  const handleClose = () => {
    props.closeModal(false);
  };
  const changeMoney = (e) => {
    setMoney(e.target.value);
  };
  useEffect(() => {
    setMoney(props.debt);
  }, [props.debt]);
  const handleChange = (e) => {
    let value = e.target.value;
    setOption(value);
  };
  const clickPay = () => {
    if (option === -1) {
      toastError('Mời chọn phương thức thanh toán');
    } else {
      const data = {
        moneyPaid: money,
        paymentMethod: option,
        userName: localStorage.getItem('username'),
      };
      props.payCrossCheck(data);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán công nợ</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-w600'>
        <Row>
          <Col xs={6} md={6}>
            <div className='a'>
              <label>Phương thức thanh toán</label>
              <select
                className='form form-control'
                value={option}
                onChange={handleChange}
              >
                <option value={-1}>Chọn thanh toán</option>
                <option value={0}>Tiền mặt</option>
                <option value={1}>Chuyển khoản</option>
              </select>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className='a'>
              <span
                style={{
                  position: 'absolute',
                  top: 37,
                  left: 30,
                  fontSize: 15,
                }}
              >
                đ
              </span>
              <label>Giá trị thanh toán</label>
              <NumberFormat
                className={`form form-control text-right`}
                allowNegative={false}
                thousandSeparator=','
                decimalScale={3}
                name='onHand'
                value={money}
                onValueChange={(values) => {
                  const { value } = values;
                  if (value > props.debt - props.moneyPaid) {
                    // setMoney(props.debt - props.moneyPaid);
                    setMoney(value);
                  } else {
                    setMoney(value);
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='btn-whites' onClick={handleClose}>
          Thoát
        </Button>
        <Button variant='primary' onClick={clickPay}>
          Thanh toán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPaymentCrossCheck;
