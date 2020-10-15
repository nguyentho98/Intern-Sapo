import React from 'react';
import { Link } from 'react-router-dom';

const FulfillmentItem = (props) => {
  const { fulfillment } = props;
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
      <td>
        {fulfillment.codMoney
          ?.toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
      </td>
      <td>
        {fulfillment.personPayShip === 1
          ? fulfillment.transportFee
              ?.toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          : 0}
      </td>
      <td>
        {fulfillment.personPayShip === 0
          ? fulfillment.transportFee
              ?.toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          : 0}
      </td>
    </tr>
  );
};

export default FulfillmentItem;
