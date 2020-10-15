import React from 'react';
import { Link } from 'react-router-dom';

const FulfillmentItem = (props) => {
  const { fulfillment } = props;
  const showCod = () => {
    if (fulfillment.personPayShip === 0) {
      return fulfillment.transportFee + fulfillment.codMoney;
    } else {
      return fulfillment.codMoney;
    }
  };
  return (
    <tr>
      <td>
        <Link
          onClick={() => {
            window.open(`/admin/orders-update/${fulfillment.id}`);
          }}
        >
          {fulfillment.code}
        </Link>
      </td>
      <td>{fulfillment.name}</td>
      <td>
        {showCod()
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
      </td>
    </tr>
  );
};

export default FulfillmentItem;
