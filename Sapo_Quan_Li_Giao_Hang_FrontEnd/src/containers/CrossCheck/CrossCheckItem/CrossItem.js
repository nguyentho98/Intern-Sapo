import 'pretty-checkbox';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import SockJsClient from 'react-stomp';
export const showDate = (dateLong) => {
  if (dateLong === null) {
    return '';
  } else {
    const dateShow = new Date(parseInt(dateLong));
    let date = dateShow.getDate();
    let month = dateShow.getMonth() + 1;
    let year = dateShow.getFullYear();
    let hours = dateShow.getHours();
    let minutes = dateShow.getMinutes();
    if (date < 10) date = '0' + date;
    if (month < 10) month = '0' + month;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return date + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
  }
};
const CustomerItem = (props) => {
  const { product } = props;

  const showCal = (cal) => {
    let rs = null;
    if (cal === 0) {
      rs = <i className='fa fa-circle-o' data-tip data-for='not' />;
    } else if (cal === 1) {
      rs = <i className='fa fa-aujust' data-tip data-for='non-full' />;
    } else if (cal === 2) {
      rs = <i className='fa fa-circle' data-tip data-for='full' />;
    }
    return rs;
  };
  const pathToDetail = () => {
    props.history.push(`/admin/cross-update/${product.id}`);
  };
  // const [messages, setMessages] = useState([]);
  // let onMessageReceived = (msg) => {
  //   console.log('New Message Received!!', msg);
  //   setMessages(messages.concat(msg));
  // };
  // const SOCKET_URL = 'http://localhost:8080/ws-chat/';
  return (
    <>
      {/* <SockJsClient
        url={SOCKET_URL}
        topics={['accounting']}
        onConnect={console.log('aaaa')}
        onDisconnect={console.log('Disconnected!')}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      /> */}
      <tr className='cateItem-h' onClick={pathToDetail}>
        <td>
          <NavLink to={`/admin/cross-update/${product.id}`}>
            {product.code}
          </NavLink>
        </td>
        <td>{product.shipperEntity.userEntity.fullName}</td>
        <td className={product.status ? 'suc' : 'not'}>
          {product.status ? 'Đã đối soát' : 'Chưa đối soát'}
        </td>
        <td style={{ paddingLeft: 39 }}>{showCal(product.paymentStatus)}</td>
        <td>
          {product.totalMoney
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
          {' đ'}
        </td>
        <td>{product.numberOfFulfillment}</td>
        <td>{showDate(product.createdOn)}</td>
        <td>{showDate(product.updatedOn)}</td>
      </tr>
      <ReactTooltip
        id='full'
        place='top'
        className='datatooltip'
        effect='solid'
      >
        Đã thanh toán
      </ReactTooltip>
      <ReactTooltip id='not' place='top' className='datatooltip' effect='solid'>
        Chưa Thanh toán
      </ReactTooltip>
    </>
  );
};
CustomerItem.propTypes = {
  category: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    stt: state.statusReducer.sttCheckBox,
  };
};
export default connect(mapStateToProps, null)(CustomerItem);
