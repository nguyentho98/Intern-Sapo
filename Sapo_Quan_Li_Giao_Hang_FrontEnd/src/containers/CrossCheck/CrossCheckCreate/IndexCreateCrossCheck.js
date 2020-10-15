/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { ClickAwayListener, Grid } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader/CardHeader.js';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { toastError } from '../../../helper/ToastHelper.js';
import {
  addCrossCheckRequest,
  clearFulfillment,
  getAllShipperRequest,
  getDebtOfShipperRequest,
  getFulfillmentOfShipperRequest,
} from '../../../redux/actions/CrossCheck.js';
import Page from '../../page/Page.js';
import CustomerItem from './CustomerItem.js';
import FulfillmentItem from './FulfillmentItem.js';
import NonFulfillment from './NonFulfillment.js';
import * as types from './styles';

function IndexCreateCrossCheck(props) {
  const [customerSelected, setCustomerSelected] = useState({
    id: '',
    name: '',
    phone: '',
  });

  const { shippers } = props;
  const classes = types.useStyles();
  const [modalShow, setModalShow] = useState(false);
  const [showSelected, setShowSelected] = useState(false);
  const [fulfillmentNull, setFulfillmentNull] = useState(true);
  const [itemSave, setItemSave] = useState({});
  const [btnFoot, setBtnFoot] = useState(false);

  const handleSubmit = () => {
    if (customerSelected.id === '') {
      toastError('Mời chọn một nhân viên');
    } else if (props.fulfillment.length === 0) {
      toastError('Nhân viên không có phiếu giao nào cần đối soát');
    } else {
      props.addCrossCheck(itemSave);
      console.log(itemSave);
    }
  };
  const getCustomer = (e) => {
    setModalShow(true);
    props.getAllShipper(e.target.value, 1);
  };
  const changeInputCustomer = (e) => {
    props.getAllShipper(e.target.value, 1);
  };
  const clickAway = () => {
    setModalShow(false);
  };
  const showCustomerSelected = (id) => {
    const index = shippers.findIndex((cus) => cus.id === id);
    console.log('abcd');
    props.getTotalDebtPay(id);
    const cus = shippers[index];
    props.getFulfillment(id, '', 1);
    setItemSave({
      ...itemSave,
      shipper: cus.id,
      userName: localStorage.getItem('username'),
    });
    setCustomerSelected({
      id: cus.id,
      name: cus.name,
      phone: cus.phone,
    });
    setShowSelected(true);
    setModalShow(false);
  };
  const handleChangePage = (e) => {
    setTimeout(() => {
      props.getFulfillment(customerSelected.id, '', e);
    }, 400);
  };
  const showCustomer = () => {
    let rs = null;
    if (shippers !== undefined) {
      if (shippers.length === 0) {
        rs = (
          <div className='text-center' style={{ padding: 15 }}>
            Không có dữ liệu
          </div>
        );
      } else {
        rs = shippers.map((customer, index) => {
          return (
            <div
              className='show-customer'
              onClick={() => showCustomerSelected(customer.id)}
            >
              <CustomerItem customer={customer} />
            </div>
          );
        });
      }
    }

    return rs;
  };
  const removeCustomer = () => {
    setCustomerSelected({
      id: '',
      name: '',
      phone: '',
    });
    document.getElementById('fulfillment').value = '';
    props.clear();
    setShowSelected(false);
  };
  const showFulfillment = (fulfillment) => {
    let rs = null;
    if (fulfillment !== undefined) {
      rs = fulfillment.map((f, index) => {
        return <FulfillmentItem fulfillment={f} />;
      });
    }
    return rs;
  };

  useEffect(() => {
    if (props.fulfillment !== undefined) {
      if (props.fulfillment.length > 0) {
        setFulfillmentNull(false);
      } else {
        setFulfillmentNull(true);
      }
    } else {
      setFulfillmentNull(true);
    }
  }, [props.fulfillment]);
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setItemSave({
      ...itemSave,
      [name]: value,
    });
  };
  const searchFulfillment = (e) => {
    let value = e.target.value;
    setTimeout(() => {
      props.getFulfillment(customerSelected.id, value, 1);
    }, 500);
  };
  const focusFul = () => {
    if (customerSelected.id === '') {
      toastError('Vui lòng chọn nhân viên');
      document.getElementById('fulfillment').blur();
    }
  };
  useEffect(() => {
    if (props.id !== undefined) {
      props.history.push(`/admin/cross-update/${props.id}`);
    }
  }, [props.id]);
  useEffect(() => {
    setBtnFoot(
      window.innerHeight + document.documentElement.scrollTop >=
        document.scrollingElement.scrollHeight - 40
    );
    window.onscroll = () => {
      setBtnFoot(
        window.innerHeight + document.documentElement.scrollTop >=
          document.scrollingElement.scrollHeight - 50
      );
    };
  }, []);

  return (
    <React.Fragment>
      <div className={`header-add-product ${props.ui ? 'w-80' : 'w-260'}`}>
        <div
          className={`button-header ${
            btnFoot ? 'd-none-custom' : 'd-block-custom'
          }`}
          id='x'
        >
          <div className='col-lg-12 col-sm-12 col-md-12'>
            <div className='col-lg-12 col-sm-12 col-md-12 text-right'>
              <NavLink to={'/admin/cross-check'} className='btn btn-white'>
                Hủy
              </NavLink>
              <button
                className='btn btn-primary'
                onClick={() => handleSubmit()}
              >
                Tạo phiếu đối soát
              </button>
            </div>
          </div>
        </div>
      </div>
      <Grid className={`${classes.root} mt-3`}>
        <NavLink
          to={'/admin/cross-check'}
          style={{ color: '#637381' }}
          onClick={() => props.clear()}
        >
          <ChevronLeftIcon />
          Danh sách phiếu đối soát nhân viên
        </NavLink>
        <Grid>
          <h3 className={classes.title}>{'Tạo phiếu đối soát nhân viên'}</h3>
        </Grid>
        {/* {showToastSave()} */}
        <GridContainer>
          <GridItem md={8} lg={8}>
            <Card>
              <CardHeader>
                <h4 className={classes.product_title}>Nhân viên</h4>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <div
                  className={`infor-customer-selected ${
                    showSelected ? 'd-block-custom' : 'd-none-custom'
                  }`}
                >
                  <div style={{ width: '50%' }}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z' />
                    </svg>
                    <div className='text-infor'>
                      <div className='text-name'>
                        <NavLink
                          to={`/admin/partnerDetail/${customerSelected.id}`}
                        >
                          {customerSelected.name}
                        </NavLink>
                        <span
                          onClick={removeCustomer}
                          style={{
                            color: '#000000',
                            fontWeight: 400,
                            paddingLeft: 5,
                            cursor: 'pointer',
                          }}
                        >
                          <i className='fa fa-remove' />
                        </span>
                      </div>
                      <p className='text-phone'>{customerSelected.phone}</p>
                      <p className='text-phone'>{customerSelected.address}</p>
                    </div>
                  </div>
                  <div
                    className='text-right'
                    style={{ width: '50%', float: 'right' }}
                  >
                    <span className='w-100'>
                      Công nợ hiện tại:{' '}
                      <b>
                        {props.debt
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                        {' đ'}
                      </b>
                    </span>
                  </div>
                </div>
                <ClickAwayListener onClickAway={clickAway}>
                  <div
                    className={`input-customer ${
                      !showSelected ? 'd-block-custom' : 'd-none-custom'
                    }`}
                  >
                    <span className='search-span'>
                      <i className='fa fa-search' />
                    </span>
                    <input
                      autoComplete='off'
                      type='text'
                      className={`form-control`}
                      id='name'
                      name='prductName'
                      onFocus={getCustomer}
                      onChange={changeInputCustomer}
                      placeholder='Tìm kiếm nhân viên...'
                      data-tip
                      data-for='err-name'
                    />
                    <div
                      className={`card bordershadowC ${
                        modalShow ? 'd-block-custom' : 'd-none-custom'
                      }`}
                    >
                      <div className='card-body'>{showCustomer()}</div>
                      <div className='card-footer'>
                        <div
                          className='change-page'
                          style={{ width: 'fit-content', float: 'right' }}
                        >
                          <a
                            className={`prev-filter text-center `}
                            style={{ marginRight: '5px' }}
                          >
                            <span>
                              <i className='fa fa-arrow-left' />
                            </span>
                          </a>
                          <a className={`prev-filter text-center `}>
                            <span>
                              <i className='fa fa-arrow-right' />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </ClickAwayListener>
              </Grid>
            </Card>
            <Card>
              <CardHeader>
                <h4 className={classes.product_title}>Thông tin phiếu giao</h4>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <div className={`input-customer`}>
                  <span className='search-span'>
                    <i className='fa fa-search' />
                  </span>
                  <input
                    autoComplete='off'
                    type='text'
                    className={`form-control`}
                    id='fulfillment'
                    name='fulfillment'
                    onFocus={focusFul}
                    onChange={searchFulfillment}
                    placeholder='Tìm kiếm phiếu giao'
                    data-tip
                    data-for='err-name'
                  />
                </div>
              </Grid>
              <table className='table-ful'>
                <thead>
                  <tr>
                    <th>Mã phiếu giao</th>
                    <th>Khách hàng</th>
                    <th>Tiền thu hộ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={fulfillmentNull ? 'd-none-custom' : ''}>
                    <td style={{ fontWeight: 500 }}>Tổng</td>
                    <td></td>
                    <td>
                      {' '}
                      {(props.debt - 0)
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </td>
                  </tr>
                  {showFulfillment(props.fulfillment)}
                </tbody>
              </table>
              <div
                className={`page-accounting ${
                  fulfillmentNull ? 'd-none-custom' : 'd-block-custom'
                }`}
              >
                <Page
                  item={5}
                  totalItems={props.totalFulfillment}
                  changePage={handleChangePage}
                />
              </div>
              <NonFulfillment status={fulfillmentNull} />
            </Card>
          </GridItem>
          <GridItem md={4} lg={4}>
            <Card>
              <CardHeader>
                <h4 className={classes.product_title}>Thông tin</h4>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <Grid className='category'>
                  <label>Mã phiếu</label>
                  <div className='input-group mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      name='code'
                      id='code'
                      placeholder=''
                      onChange={handleChange}
                    />
                  </div>
                </Grid>
                <hr
                  style={{
                    borderTop: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  }}
                ></hr>
                <Grid className='brand'>
                  <label>Ghi chú</label>
                  <div className='input-group mb-2'>
                    <textarea
                      style={{ minHeight: 125 }}
                      type='text'
                      id='description'
                      className='form-control'
                      name='description'
                      placeholder=''
                      onChange={handleChange}
                    />
                  </div>
                </Grid>
                {/* <Grid className='brand'>
                  <label>Tag</label>
                  <div className='input-group mb-2'>
                    <textarea
                      type='text'
                      id='brand'
                      className='form-control'
                      name='brand'
                      placeholder=''
                    />
                  </div>
                </Grid> */}
              </Grid>
            </Card>
          </GridItem>

          <hr
            id='test'
            style={{
              width: '97%',
              borderTop: '1px solid',
              borderColor: 'rgba(0, 0, 0, 0.23)',
            }}
          ></hr>
          <div
            id='buttonx'
            className='col-lg-12 col-sm-12 col-md-12 button-footer text-right'
          >
            <NavLink to={'/admin/product-list'} className='btn btn-white'>
              Hủy
            </NavLink>
            <button className='btn btn-primary' onClick={handleSubmit}>
              Tạo phiếu đối soát
            </button>
          </div>
        </GridContainer>
      </Grid>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    ui: state.ui.miniActive,
    productDetail: state.productReducer.productItem,
    createSuccess: state.statusReducer.stateAdd.createSuccess,
    faildSave: state.statusReducer.stateAdd.faildSave,
    afterCreate: state.statusReducer.stateAdd.afterCreate,
    shippers: state.crossCheck.shippers.shippers,
    totalShipper: state.crossCheck.shippers.total,
    debt: state.crossCheck.debt,
    fulfillment: state.crossCheck.fulfillment.fulfillment,
    totalFulfillment: state.crossCheck.fulfillment.total,
    id: state.crossCheck.itemEdit.id,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllShipper: (value, page) => {
      dispatch(getAllShipperRequest(value, page));
    },
    getFulfillment: (id, value, page) => {
      dispatch(getFulfillmentOfShipperRequest(id, value, page));
    },
    getTotalDebtPay: (id) => {
      dispatch(getDebtOfShipperRequest(id));
    },
    clear: () => {
      dispatch(clearFulfillment());
    },
    addCrossCheck: (data) => {
      dispatch(addCrossCheckRequest(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexCreateCrossCheck);
