/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  clearFulfillment,
  clearItemEdit,
  getAllCrossCheckRequest,
} from '../../redux/actions/CrossCheck';
import FilterComponent from '../Filter/FilterComponent';
import Page from '../page/Page';
import CrossItem from './CrossCheckItem/CrossItem';
import './style.css';
const valueOptionCheck = [
  {
    text: 'Chọn điều kiện lọc',
    key: 'none',
  },
  {
    text: 'Trạng thái',
    key: 'status',
  },
  {
    text: 'Nhân viên',
    key: 'staff',
  },
  {
    text: 'Ngày tạo',
    key: 'createdDate',
  },
  {
    text: 'Ngày đối soát',
    key: 'updatedDate',
  },
];
const CrossCheck = (props) => {
  const { history } = props;
  const handleChangePage = (page) => {
    // setPageNumber(page - 1);
  };
  useEffect(() => {
    props.getAllCrossCheck(1, 10);
    props.clear();
    props.clearItem();
  }, []);
  const showCrossCheck = (crossChecks) => {
    let rs = null;
    if (crossChecks !== undefined) {
      if (crossChecks.length > 0) {
        rs = crossChecks.map((cross, index) => {
          return <CrossItem product={cross} history={history} />;
        });
      }
    }

    return rs;
  };

  return (
    <div className='product-list' style={{ fontSize: '14px', marginTop: -55 }}>
      <div className='row m-header'>
        <div className='d-flex'>
          <div className=''>
            <h2>Đối soát nhân viên</h2>
          </div>
          <div className='action-category'>
            <NavLink to='/admin/cross-check-add'>
              <button type='button' className='btn btn-primary add-btn'>
                Tạo phiếu đối soát
              </button>
            </NavLink>
          </div>
          <br />
        </div>
      </div>
      <div className='row'>
        <div className='card bordershadow' style={{ width: '100%' }}>
          <div className='card-header bg-white'>
            <div className='table-header'>
              <a class='active-header-card' style={{ cursor: 'pointer' }}>
                Danh sách phiếu
              </a>
            </div>
          </div>
          <div className='card-body'>
            <div className='col-lg-12 col-12 col-md-12 bg-white'>
              <div className='table-reponsive-sm'>
                <table className='table' cellPadding='1' cellSpacing='0'>
                  <thead>
                    <tr
                      style={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <th scope='col'>Mã phiếu</th>
                      <th scope='col' style={{ width: 150 }}>
                        Tên nhân viên
                      </th>
                      <th scope='col'>Trạng thái</th>
                      <th scope='col'>Thanh toán</th>
                      <th scope='col' style={{ width: 150 }}>
                        Tổng tiền đối soát
                      </th>
                      <th scope='col'>Số đơn hàng</th>
                      <th scope='col' style={{ width: 120 }}>
                        Ngày tạo
                      </th>
                      <th scope='col' style={{ width: 120 }}>
                        Ngày đối soát
                      </th>
                    </tr>
                  </thead>

                  <tbody>{showCrossCheck(props.crossChecks)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='col-lg-12 col-md-12 col-12 mt-3'>
            <Page
              item={5}
              totalItems={props.total}
              changePage={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    crossChecks: state.crossCheck.crossChecks.crossChecks,
    total: state.crossCheck.crossChecks.total,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCrossCheck: (page, limit) => {
      dispatch(getAllCrossCheckRequest(page, limit));
    },
    clear: () => {
      dispatch(clearFulfillment());
    },
    clearItem: () => {
      dispatch(clearItemEdit());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CrossCheck);
