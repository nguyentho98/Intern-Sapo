import React, { useEffect, useState } from 'react';
import { setStatusFilter } from '../../../redux/actions/Filter';
import { connect } from 'react-redux';
const FilterStatus = (props) => {
  const [stateBtn, setStateBtn] = useState({
    dgd: false,
    ngd: false,
  });
  useEffect(() => {
    const { dgd, ngd } = stateBtn;
    if (dgd === true && ngd === false) {
      props.setStatusFilter(1);
    } else if (ngd === true && dgd === false) {
      props.setStatusFilter(0);
    } else if (ngd === true && dgd === true) {
      props.setStatusFilter(2);
    }
  });
  return (
    <div className='filter-status d-flex'>
      <button
        className={`btn btn-filter ${stateBtn.dgd === true ? 'active' : ''}`}
        type='button'
        onClick={() => {
          setStateBtn({ ...stateBtn, dgd: !stateBtn.dgd });
        }}
      >
        Đang giao dịch
      </button>

      <button
        className={`btn btn-filter ${stateBtn.ngd === true ? 'active' : ''}`}
        style={{ marginLeft: '10px' }}
        type='button'
        onClick={() => {
          setStateBtn({ ...stateBtn, ngd: !stateBtn.ngd });
        }}
      >
        Ngừng giao dịch
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setStatusFilter: (data) => {
      dispatch(setStatusFilter(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(FilterStatus);
