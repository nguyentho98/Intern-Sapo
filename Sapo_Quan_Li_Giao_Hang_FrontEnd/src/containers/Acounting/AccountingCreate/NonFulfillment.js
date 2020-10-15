import React from 'react';

const NonFulfillment = (props) => {
  return (
    <div
      class={`table-body-none ${
        props.status ? 'd-block-custom' : 'd-none-custom'
      }`}
    >
      <img src='/image/no-shipment.png' alt='' style={{ width: '14%' }} />
      <p>Phiếu hạch toán của bạn chưa có phiếu giao nào</p>
    </div>
  );
};

export default NonFulfillment;
