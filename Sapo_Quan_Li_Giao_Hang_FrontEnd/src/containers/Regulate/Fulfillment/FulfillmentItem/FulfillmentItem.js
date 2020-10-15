import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Checkbox } from "pretty-checkbox-react";
import "pretty-checkbox";
import { connect } from "react-redux";
import history from "../../../../utils/history";
const FulfillmentItem = (props) => {
  const [checked, setChecked] = useState(props.stt);
  const { fulfillment } = props;
  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (checked !== e.target.checked) {
      props.getItemChecked(
        fulfillment.id,
        e.target.checked,
        fulfillment.active
      );
    }
  };

  const statuss = [
    { id: "Đang hoạt động", color: "#1e88e5" },
    { id: "Không hoạt động", color: "#f44336" },
  ];
  const status = [
    { content: "Tạo phiếu", color: "#f9a825" },
    { content: "Chờ lấy hàng", color: "#f9a825" },
    { content: "Đã ở trong kho", color: "orange" },
    { content: "Đang giao hàng", color: "#1e88e5" },
    { content: "Hoàn thành", color: "#4caf50" },
    { content: "Giao lại", color: "orange" },
    { content: "Hủy đơn", color: "#f44336" },
  ];
  useEffect(() => {
    console.log(fulfillment, "done");
    if (props.stt && !checked) {
      setChecked(true);
      props.getItemChecked(fulfillment.id, true, fulfillment.active);
    }
    if (!props.stt && checked) {
      setChecked(false);
      props.getItemChecked(fulfillment.id, false);
    }
    if (props.stt === 0) {
      setChecked(false);
      props.getItemChecked(fulfillment.id, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.stt]);

  function formatMoney(money) {
    money = money.toLocaleString("vi", { style: "currency", currency: "VND" });
    return money;
  }
  return (
    <tr className="cateItem-h" style={{ lineHeight: "50px" }}>
      <th scope="col">
        <Checkbox
          className="pretty-checkbox"
          shape="curve"
          color="info-o"
          onChange={handleChange}
          checked={checked}
          icon={<i className={`fa fa-check`} />}
        ></Checkbox>
      </th>
      <td>
        <NavLink to={`/admin/fulfillDetail/${fulfillment.id}`}>
          {fulfillment.code}
        </NavLink>
      </td>
      <td>
        {fulfillment.shippingStatus === 2 ? (
          <span
            style={{
              color: status[2].color,
              border: "1px solid",
              padding: "5px",
            }}
          >
            {status[2].content}
          </span>
        ) : fulfillment.shippingStatus === 1 ? (
          <span
            style={{
              color: status[1].color,
              border: "1px solid",
              padding: "5px",
            }}
          >
            {status[1].content}
          </span>
        ) : (
          ""
        )}
      </td>
      <td>
        {fulfillment?.shippingFromEntity?.address
          ? fulfillment.shippingFromEntity.address + " "
          : ""}
        {fulfillment?.shippingFromEntity?.ward
          ? fulfillment.shippingFromEntity.ward + " "
          : ""}
        {fulfillment?.shippingFromEntity?.district
          ? fulfillment.shippingFromEntity.district + " "
          : ""}
        {fulfillment?.shippingFromEntity?.province
          ? fulfillment.shippingFromEntity.province + " "
          : ""}
      </td>
      <td style={{ textAlign: "right" }}>
        {formatMoney(fulfillment.transportFee)}
      </td>
      <td style={{ textAlign: "right" }}>
        {formatMoney(fulfillment.totalMoney)}
      </td>
    </tr>
  );
};
FulfillmentItem.propTypes = {
  category: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    stt: state.statusReducer.sttCheckBox,
  };
};

export default connect(mapStateToProps)(FulfillmentItem);
