import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Checkbox } from 'pretty-checkbox-react';
import { connect } from 'react-redux';
import history from '../../../utils/history';

const CustomerItem = (props) => {
  const [checked, setChecked] = useState(props.stt);
  const { customer } = props;
  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (checked !== e.target.checked) {
      props.getItemChecked(customer.id, e.target.checked, customer.active);
    }
  };

  const statuss = [
    { id: 'Đang hoạt động', color: '#1e88e5' },
    { id: 'Không hoạt động', color: '#f44336' },
  ];

  useEffect(() => {
    if (props.stt && !checked) {
      setChecked(true);
      props.getItemChecked(customer.id, true, customer.active);
    }
    if (!props.stt && checked) {
      setChecked(false);
      props.getItemChecked(customer.id, false);
    }
    if (props.stt === 0) {
      setChecked(false);
      props.getItemChecked(customer.id, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.stt]);

  const detailCUS = (id) =>{
    history.push(`/admin/customerDetail/${id}`)
  }

  return (
    <tr className='cateItem-h' style={{ lineHeight: '50px' }}>
      <th scope='col'>
        <Checkbox
          className='pretty-checkbox'
          shape='curve'
          color='info-o'
          onChange={handleChange}
          checked={checked}
          icon={<i className={`fa fa-check`} />}
        ></Checkbox>
      </th>
      <td onClick={()=>detailCUS(customer.id)}>
        <NavLink to={`/admin/customerDetail/${customer.id}`}>
          {customer.code}
        </NavLink>
      </td>
      <td onClick={()=>detailCUS(customer.id)}>{customer.name}</td>
      <td onClick={()=>detailCUS(customer.id)}>{customer.email}</td>
      <td style={{textAlign:'center'}} onClick={()=>detailCUS(customer.id)}>{customer.phone}</td>
      <td style={{textAlign:'center'}} onClick={()=>detailCUS(customer.id)}>{customer.totalOrder}</td>
      <td onClick={()=>detailCUS(customer.id)}>
        {customer.active ? (
          <span style={{ color: statuss[0].color }}>{statuss[0].id}</span>
        ) : (
            <span style={{ color: statuss[1].color }}>{statuss[1].id}</span>
          )}</td>
    </tr>
  );
};
CustomerItem.propTypes = {
  customer: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    stt: state.statusReducer.sttCheckBox,
  };
};

export default connect(mapStateToProps)(CustomerItem);
