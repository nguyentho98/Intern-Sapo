import React from 'react';
import { Modal } from 'react-bootstrap';
import { showDate } from '../CrossCheckItem/CrossItem';

const ModalHistoryCrossCheck = (props) => {
  const { show } = props;
  const handleClose = () => {
    props.closeModal(false);
  };
  const showHistory = (histories) => {
    let rs = null;
    if (histories.length > 0) {
      rs = histories.map((history, index) => {
        return (
          <tr key={index}>
            <td>{history.operator}</td>
            <td>{history.functions}</td>
            <td>{history.action}</td>
            <td>{showDate(history.createdOn)}</td>
          </tr>
        );
      });
    }
    return rs;
  };
  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Lịch sử thao tác</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='table-history'>
          <table className='table'>
            <thead>
              <tr>
                <th>Người thao tác</th>
                <th>Chức Năng</th>
                <th>Thao tác</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>{showHistory(props.histories)}</tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalHistoryCrossCheck;
