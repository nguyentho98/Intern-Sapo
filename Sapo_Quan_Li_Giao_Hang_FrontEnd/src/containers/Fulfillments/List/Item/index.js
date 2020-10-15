import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Checkbox } from "pretty-checkbox-react";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { Typography } from "@material-ui/core";
const OrderItem = (props) => {
  const [checked, setChecked] = useState(props.stt);
  const { fulfillment } = props;
  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (checked !== e.target.checked) {
      props.getItemChecked(fulfillment.id, e.target.checked);
    }
  };

  useEffect(() => {
    if (props.stt && !checked) {
      setChecked(true);
      props.getItemChecked(fulfillment.id, true);
    }
    if (!props.stt && checked) {
      setChecked(false);
      props.getItemChecked(fulfillment.id, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.stt]);

  const status = [
    { content: "Tạo phiếu", color: '#f9a825' },
    { content: 'Chờ lấy hàng', color: '#f9a825' },
    { content: 'Đã ở trong kho', color: '#FFB464' },
    { content: 'Đang giao hàng', color: '#1e88e5' },
    { content: 'Hoàn thành', color: '#4caf50' },
    { content: 'Giao lại', color: 'orange' },
    { content: 'Hủy giao', color: '#f44336' },
  ];
  function showDateTime(time) {
    let d = new Date(time);

    let day;
    if (d.getDate() < 10) {
      day = "0" + d.getDate();
    } else {
      day = d.getDate();
    }

    let mon;
    if (d.getMonth() + 1 < 10) {
      mon = "0" + (d.getMonth() + 1);
    } else {
      mon = d.getMonth() + 1;
    }
    let year = d.getFullYear();

    let h;
    if (d.getHours() < 10) {
      h = "0" + d.getHours();
    } else {
      h = d.getHours();
    }

    let m;
    if (d.getMinutes() < 10) {
      m = "0" + d.getMinutes();
    } else {
      m = d.getMinutes();
    }
    return `${day}-${mon}-${year} ${h}:${m}`;
  }
  function showDate(time) {
    let d = new Date(time);

    let day;
    if (d.getDate() < 10) {
      day = "0" + d.getDate();
    } else {
      day = d.getDate();
    }

    let mon;
    if (d.getMonth() + 1 < 10) {
      mon = "0" + (d.getMonth() + 1);
    } else {
      mon = d.getMonth() + 1;
    }
    let year = d.getFullYear();

    return `${day}-${mon}-${year}`;
  }
  return (
    <tr className="cateItem-h" style={{ lineHeight: "50px" }}>
      {/* <th scope="col">
        <Checkbox
          className="pretty-checkbox"
          shape="curve"
          color="info-o"
          onChange={handleChange}
          checked={checked}
          icon={<i className={`fa fa-check`} />}
        ></Checkbox>
      </th> */}
      <td>{showDateTime(fulfillment.createdOn)}</td>
      <td>
        <NavLink to={`/admin/orders-update/${fulfillment?.id}`}>
          {fulfillment?.code}
        </NavLink>
      </td>
      <td>
        {fulfillment.shippingToOB !== undefined ? (
          <ul
            style={{
              paddingInlineStart: 10,
              lineHeight: 1,
              marginBottom: 0,
              listStyleType: "disc",
            }}
          >
            <li style={{ paddingTop: 5 }}>
              <Typography>Tên: {fulfillment?.shippingToOB.name}</Typography>
            </li>
            <li style={{ paddingTop: 5 }}>
              SDT: {fulfillment?.shippingToOB.phone}
            </li>
            <li style={{ paddingTop: 5}}>
              <p style={{maxWidth: 300, whiteSpace:'break-spaces'}}>
                Địa chỉ:{" "}
                {fulfillment.shippingToOB?.address
                  ? fulfillment.shippingToOB?.address + " ,"
                  : ""}
                {fulfillment.shippingToOB?.ward
                  ? fulfillment.shippingToOB?.ward + " ,"
                  : ""}
                {fulfillment.shippingToOB?.district
                  ? fulfillment.shippingToOB?.district + " ,"
                  : ""}
                {fulfillment.shippingToOB?.province
                  ? fulfillment.shippingToOB?.province
                  : ""}
              </p>
            </li>
          </ul>
        ) : (
          <ul
            style={{
              paddingInlineStart: 10,
              lineHeight: 1,
              marginBottom: 0,
              listStyleType: "disc",
            }}
          >
            <li style={{ paddingTop: 5 }}>
            Tên: {fulfillment?.shippingTo.name}        
            </li>
            <li style={{ paddingTop: 5 }}>
             SDT: {fulfillment?.shippingTo.phone}
            </li>
            <li style={{ paddingTop: 5}}>
              <p  style={{maxWidth: 300, whiteSpace:'break-spaces'}}>
                Địa chỉ:{" "}
                {fulfillment.shippingTo?.address
                  ? fulfillment.shippingTo?.address + " ,"
                  : ""}
                {fulfillment.shippingTo?.ward
                  ? fulfillment.shippingTo?.ward + " ,"
                  : ""}
                {fulfillment.shippingTo?.district
                  ? fulfillment.shippingTo?.district + " ,"
                  : ""}
                {fulfillment.shippingTo?.province
                  ? fulfillment.shippingTo?.province
                  : ""}
              </p>
            </li>
          </ul>
        )}
      </td>
      <td style={{ textAlign: "center" }}>
        <CurrencyFormat
          value={
            fulfillment.shippingPaymentObject === 0
              ? fulfillment.codMoney + fulfillment.transportFee
              : fulfillment.transportFee
          }
          displayType={"text"}
          thousandSeparator={true}
        />
      </td>
      <td style={{ textAlign: "center" }}>
        <CurrencyFormat
          value={fulfillment.transportFee}
          displayType={"text"}
          thousandSeparator={true}
        />
      </td>
      <td style={{ textAlign: "center" }}>
        
         <p style={{ width:'130px', textAlign:'center',height:25,margin:'0 auto',
    lineHeight: 1, borderRadius: 2, color: status[fulfillment.shippingStatus].color, padding: 2 }}>
                      {status[fulfillment.shippingStatus].content}
                    </p>
      </td>
      <td>{showDate(fulfillment.deliveryDate)}</td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    stt: state.statusReducer.sttCheckBox,
  };
};
export default connect(mapStateToProps, null)(OrderItem);
