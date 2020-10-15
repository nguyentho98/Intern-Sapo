import React from 'react';

const CustomerItem = (props) => {
  const { customer } = props;
  return (
    <div className='customer-item-index'>
      <div className='customer-item'>
        <img src='/image/noavatar.png' alt='' />
        <div className='infor'>
          <p className='customer-name'>{customer.name}</p>
          <p className='customer-name'>{customer.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerItem;
