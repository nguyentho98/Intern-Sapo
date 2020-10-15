/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  clearFulfillmentAccounting,
  clearItem,
  getAllAccountingRequest,
} from '../../redux/actions/Accounting';
import {
  setSttAfterCreate,
  setSttCreateSuccess,
  setSttFailSave,
} from '../../redux/actions/SetSttCheckBox';
import Page from '../page/Page';
import CustomerItem from './AccountingItem/AccountingItem';
import './style.css';
const Accounting = (props) => {
  const [itemNumber, setItemNumber] = useState(5);
  const { history } = props;
  const showItem = (accountingEntities) => {
    let result = null;
    if (accountingEntities !== undefined) {
      if (accountingEntities.length > 0) {
        result = accountingEntities.map((product, index) => {
          return (
            <CustomerItem product={product} key={index} history={history} />
          );
        });
      }
    }

    return result;
  };
  const { setCreated, setFailSave, setAfterCreate } = props;
  useEffect(() => {
    props.getAllAccount(1, 10);
    props.clearItem();
    setCreated(false);
    setFailSave(false);
    setAfterCreate(false);
  }, []);

  const handleChangePage = (page) => {
    // setPageNumber(page - 1);
  };
  return (
    <div className='product-list' style={{ fontSize: '14px', marginTop: -55 }}>
      <div className='row m-header'>
        <div className='d-flex'>
          <div className=''>
            <h2>Đối soát khách hàng</h2>
          </div>
          <div className='action-category'>
            <NavLink to='/admin/accounting-add'>
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
                <table
                  className='table'
                  cellPadding='1'
                  cellSpacing='0'
                  style={{ tableLayout: 'unset' }}
                >
                  <thead>
                    <tr
                      style={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <th scope='col'>Mã phiếu</th>
                      <th scope='col' style={{ width: 150 }}>
                        Tên khách hàng
                      </th>
                      <th scope='col'>Trạng thái</th>
                      <th scope='col'>Thanh toán</th>
                      <th scope='col' style={{ width: 150 }}>
                        Tiền cần thanh toán
                      </th>
                      <th scope='col'>Số đơn hàng</th>
                      <th scope='col' style={{ width: 120 }}>
                        Ngày tạo
                      </th>
                      <th scope='col' style={{ width: 120 }}>
                        Ngày hạch toán
                      </th>
                    </tr>
                  </thead>

                  <tbody>{showItem(props.accounting)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='col-lg-12 col-md-12 col-12 mt-3'>
            <Page
              item={itemNumber}
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
    products: state.productReducer.products.products,
    accounting: state.calReducer.accounting.accountingEntities,
    total: state.calReducer.accounting.total,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllAccount: (page, limit) => {
      dispatch(getAllAccountingRequest(page, limit));
    },
    setCreated: (data) => {
      dispatch(setSttCreateSuccess(data));
    },
    setFailSave: (data) => {
      dispatch(setSttFailSave(data));
    },
    setAfterCreate: (data) => {
      dispatch(setSttAfterCreate(data));
    },
    clearItem: () => {
      dispatch(clearItem());
    },
    clearFulfillment: () => {
      dispatch(clearFulfillmentAccounting());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accounting);
