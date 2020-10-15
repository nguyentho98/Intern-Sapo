import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setClassifyFilter } from '../../../redux/actions/Filter';

const FilterClassify = (props) => {
  const [stateBtn, setStateBtn] = useState({
    normal: false,
    vip: false,
  });
  useEffect(() => {
    const { normal, vip } = stateBtn;
    if (normal === true && vip === false) {
      props.setClassifyFilter(0);
    } else if (vip === true && normal === false) {
      props.setClassifyFilter(1);
    } else if (vip === true && normal === true) {
      props.setClassifyFilter(2);
    }
  });
  return (
    <div className='filter-classify d-flex'>
      <button
        className={`btn btn-filter ${stateBtn.normal === true ? 'active' : ''}`}
        type='button'
        onClick={() => {
          setStateBtn({ ...stateBtn, normal: !stateBtn.normal });
        }}
      >
        Thường
      </button>

      <button
        className={`btn btn-filter ${stateBtn.vip === true ? 'active' : ''}`}
        style={{ marginLeft: '10px' }}
        type='button'
        onClick={() => {
          setStateBtn({ ...stateBtn, vip: !stateBtn.vip });
        }}
      >
        VIP
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setClassifyFilter: (data) => {
      dispatch(setClassifyFilter(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(FilterClassify);
