/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Grid, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader/CardHeader.js';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { toastError } from '../../../helper/ToastHelper.js';
import {
  deleteAccountingRequest,
  getAllCustomerRequest,
  getHistoryRequest,
  getOneAccountingRequest,
  getTotalDebtToPayRequest,
  updateAccountingRequest,
} from '../../../redux/actions/Accounting.js';
import {
  setSttAfterCreate,
  setSttCreateSuccess,
  setSttFailSave,
} from '../../../redux/actions/SetSttCheckBox.js';
import Page from '../../page/Page.js';
import CancelModal from '../../PopUpConfirm/CancelModal';
import FulfillmentItem from '../AccountingCreate/FulfillmentItem.js';
import { showDate } from '../AccountingItem/AccountingItem.js';
import ModalHistoryAccounting from './HistoryModal.js';
import ModalAccounting from './ModalAccounting.js';
import * as types from './styles';
function AccountingUpdate(props) {
  const [customerSelected, setCustomerSelected] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
  });
  const [updateAccStt, setUpdateAccStt] = useState(false);
  const { customer, accounting, debtToPay, history } = props;
  const classes = types.useStyles();
  const [modalShow, setModalShow] = useState(false);
  const [modalHistoryShow, setModalHistoryShow] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [shopFee, setShopFee] = useState(0);
  const [receiverFee, setReceiverFee] = useState(0);
  const [totalCOD, setTotalCOD] = useState(0);

  const handleSubmit = () => {
    if (accounting.status) {
      setModalShow(true);
    } else {
      props.setCreated(false);
      props.setFailSave(false);
      props.setAfterCreate(false);
      props.updateAccounting(accounting.id, 1, {
        userName: localStorage.getItem('username'),
      });
    }
  };
  let shopF = 0;
  let receiverF = 0;
  let totalC = 0;
  const handleChangePage = (e) => {};
  const showFulfillment = (fulfillment) => {
    let rs = null;

    if (fulfillment !== undefined) {
      rs = fulfillment.map((f, index) => {
        if (f.personPayShip === 1) {
          shopF += f.transportFee;
        } else {
          receiverF += f.transportFee;
        }
        totalC += f.codMoney;
        return <FulfillmentItem fulfillment={f} />;
      });
    }
    console.log(shopF);
    return rs;
  };
  useEffect(() => {
    if (debtToPay.totalDebtToPay !== undefined) {
    }
    setShopFee(shopF);
    setReceiverFee(receiverF);
    setTotalCOD(totalC);
  }, [debtToPay]);
  useEffect(() => {
    if (customer.id !== undefined) {
      props.getTotalDebtPay(customer.id);
      setCustomerSelected({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
      });
      setDescription(accounting.description);
    }
  }, [accounting]);
  useEffect(() => {
    props.getOneAccounting(props.match.params.id, 1);
    props.getHistory(props.match.params.id);
  }, []);
  const clickCloseModal = (stt) => {
    setModalShow(stt);
    setModalHistoryShow(stt);
  };
  const clickAccounting = (data) => {
    props.updateAccounting(accounting.id, 2, data);
  };
  useEffect(() => {
    setModalShow(false);
    props.getTotalDebtPay(customer.id);
  }, [accounting.moneyPaid]);
  const showHistoryModal = () => {
    props.getHistory(props.match.params.id);
    setModalHistoryShow(true);
  };
  const toCreate = () => {
    window.location.replace('/admin/accounting-add');
  };
  const showToastSave = () => {
    let result = null;
    if (props.item.id !== undefined) {
      result = (
        <div
          className={`${
            props.createSuccess === false ? 'd-none-custom ' : 'd-block-custom '
          }`}
        >
          <div className={`created d-flex col-lg-12 col-md-12 col-12`}>
            <i className='fa fa-check-circle ' />
            <h2>{`${
              props.item.id !== undefined ? '' : props.item.code
            } đã được tạo.`}</h2>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <button className='btna' onClick={toCreate}>
              <span>Tạo phiếu đối soát mới</span>
            </button>
          </div>
        </div>
      );
    }
    return result;
  };
  const cancelAccounting = () => {
    setModalCancel(true);
  };
  const conFfirmCancel = () => {
    if (accounting.status === true) {
      toastError('Phiếu đối soát mã ' + accounting.code + ' đã đối soát');
    } else {
      props.cancelAccounting(props.match.params.id);
    }
  };
  const closeModalCancel = (data) => {
    setModalCancel(data);
  };
  const [description, setDescription] = useState('');
  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  const updateAcc = () => {
    setUpdateAccStt(true);
  };
  const CusTimelineItem = withStyles((theme) => ({
    missingOppositeContent: {
      '&::before': {
        display: 'none',
      },
    },
  }))(TimelineItem);

  return (
    <React.Fragment>
      <div className={`header-add-product ${props.ui ? 'w-80' : 'w-260'}`}>
        <div className='button-header' id='x'>
          <div className='col-lg-12 col-sm-12 col-md-12'>
            <div className='col-lg-12 col-sm-12 col-md-12 text-right'>
              {accounting.paymentStatus !== 2 && accounting.isActive ? (
                <button
                  className='btn btn-primary'
                  onClick={() => handleSubmit()}
                >
                  {accounting.status ? 'Thanh toán' : 'Đối soát'}
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <Grid className={`${classes.root} mt-3`}>
        <NavLink to={'/admin/accounting'} style={{ color: '#637381' }}>
          <ChevronLeftIcon />
          Danh sách phiếu đối soát
        </NavLink>
        <Grid className='d-flex'>
          <h3 className={classes.title}>{accounting.code}</h3>
          <h5
            style={{
              height: 25,
              marginTop: 30,
              marginLeft: 5,
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            {showDate(accounting.createdOn)}
          </h5>
        </Grid>
        {updateAccStt ? (
          ''
        ) : (
          <Grid>
            <div
              className={
                accounting.isActive ? 'btn-group float-right' : 'd-none'
              }
            >
              <button
                type='button'
                class='btn btn-white'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                style={{ borderRadius: 3 }}
                onClick={updateAcc}
              >
                Sửa
              </button>
              <button
                type='button'
                class='btn btn-white'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                style={{ margin: 0, borderRadius: 3 }}
                onClick={cancelAccounting}
              >
                Hủy
              </button>
            </div>
          </Grid>
        )}
        {showToastSave()}
        <GridContainer>
          <GridItem md={8} lg={8}>
            <Card>
              <CardHeader>
                <h4 className={classes.product_title}>Khách hàng</h4>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <div className={`infor-customer-selected`}>
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
                        {(props.debtToPay.totalDebtToPay - 0)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                        {' đ'}
                      </b>
                    </span>
                  </div>
                </div>
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
                    onFocus={() => {}}
                    onChange={() => {}}
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
                    <th>COD</th>
                    <th>Phí vận chuyển (shop)</th>
                    <th style={{ width: 200 }}>Phí vận chuyển (người nhận)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Tổng</td>
                    <td>
                      {(totalCOD - 0)
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </td>
                    <td>
                      {(shopFee - 0)
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </td>
                    <td>
                      {(receiverFee - 0)
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </td>
                  </tr>
                  {showFulfillment(props.fulfillment)}
                </tbody>
              </table>
              <div
                style={{
                  paddingTop: 15,
                  paddingRight: 15,
                }}
              >
                <Page
                  item={5}
                  totalItems={accounting.numberOfFulfillment}
                  changePage={handleChangePage}
                />
              </div>
            </Card>
            <Card>
              <CardHeader>
                <h4 className={classes.title}>
                  Lịch sử thao tác phiếu đối soát
                </h4>
              </CardHeader>
              <Grid className={classes.cardContent}>
                {history?.map((row, index) => (
                  <CusTimelineItem style={{ minHeight: 50 }}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {index === history?.length - 1 ? (
                        <span></span>
                      ) : (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent
                      style={{ display: 'flex', fontWeight: 400 }}
                    >
                      <div style={{ width: '40%' }}>
                        <span>
                          <b>Thao tác </b>: {row.action}
                        </span>
                      </div>
                      <div style={{ width: '40%' }}>
                        <span>
                          <b>Nhân viên thao tác</b> : {row.operator}
                        </span>
                      </div>

                      <div style={{ width: '30%' }}>
                        <span className='float-right'>
                          {showDate(row.createdOn)}
                        </span>
                      </div>

                      <span style={{ paddingLeft: 20 }}></span>
                    </TimelineContent>
                  </CusTimelineItem>
                ))}
              </Grid>
              {/* <div className='border-header'></div>
              <div className='payment-body'>
                <div className='body'>Body</div>
              </div> */}
            </Card>
          </GridItem>
          <GridItem md={4} lg={4}>
            <Card>
              <CardHeader className='d-flex'>
                <h4 className={classes.product_title}>Thông tin phiếu </h4>
                <p
                  className={
                    accounting.isActive
                      ? accounting.status
                        ? 'status-accounting'
                        : 'non-status-accounting'
                      : 'can-bg'
                  }
                >
                  {accounting.isActive
                    ? accounting.status
                      ? 'Đã Đối soát'
                      : 'Đang Đối soát'
                    : 'Đã hủy'}
                </p>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <Grid className='category'>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Tổng cần Đối soát</p>
                    <span>
                      {': ' +
                        (accounting.moneyForCustomers - 0)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
                        ' đ'}
                    </span>
                  </div>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Đã thanh toán</p>{' '}
                    <span>
                      {': ' +
                        (accounting.moneyPaid - 0)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
                        ' đ'}
                    </span>
                  </div>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Nhân viên tạo</p>{' '}
                    <span>{': ' + accounting.maker}</span>
                  </div>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Số phiếu giao </p>{' '}
                    <span>
                      : <b>{accounting.numberOfFulfillment} phiếu</b>
                    </span>
                  </div>

                  {accounting.status ? (
                    <div className='d-flex'>
                      <p style={{ width: '50%' }}>Ngày Đối soát </p>{' '}
                      <span>
                        : <b>{showDate(accounting.updatedOn)}</b>
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                  {/* <label>Mã phiếu</label>
                  <div className='input-group mb-2'>
                    <input
                      type='text'
                      className='form-control'
                      name='code'
                      id='code'
                      placeholder=''
                      onChange={handleChange}
                    />
                  </div> */}
                </Grid>
                <hr
                  style={{
                    borderTop: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  }}
                ></hr>
                <Grid className='brand'>
                  <label style={{ fontWeight: 500 }}>Ghi chú</label>
                  <div className='input-group mb-2' style={{ fontWeight: 400 }}>
                    {updateAccStt === false ? (
                      accounting.description === null ||
                      accounting.description === '' ? (
                        'Chưa có ghi chú'
                      ) : (
                        accounting.description
                      )
                    ) : (
                      <React.Fragment>
                        <div className='w-100'>
                          <textarea
                            type='text'
                            id='description'
                            className='form-control'
                            name='description'
                            placeholder=''
                            value={description}
                            onChange={handleChange}
                          />
                        </div>
                        <div className='w-100'>
                          <hr
                            style={{
                              borderTop: '1px solid',
                              borderColor: 'rgba(0, 0, 0, 0.23)',
                            }}
                          ></hr>
                        </div>
                        <div className='w-100 text-right'>
                          <button
                            className='btn btn-white'
                            onClick={() => {
                              setUpdateAccStt(false);
                            }}
                          >
                            Thoát
                          </button>
                          <button
                            className='btn btn-primary'
                            onClick={() => {
                              props.updateAccounting(accounting.id, 3, {
                                description: description,
                              });
                              setUpdateAccStt(false);
                            }}
                          >
                            Lưu
                          </button>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Card>
            <Card>
              <a onClick={showHistoryModal} className='history'>
                Lịch sử thao tác phiếu Đối soát
              </a>
            </Card>
          </GridItem>

          <hr
            id='test'
            style={{
              borderTop: '1px solid',
              width: '97%',
              borderColor: 'rgba(0, 0, 0, 0.23)',
            }}
          ></hr>
          {accounting.paymentStatus !== 2 && accounting.isActive ? (
            <div
              id='buttonx'
              className='col-lg-12 col-sm-12 col-md-12 button-footer text-right'
            >
              <button
                className='btn btn-primary'
                onClick={handleSubmit}
                data-toggle='modal'
                data-target='#exampleModal'
              >
                {accounting.status ? 'Thanh toán' : 'Đối soát'}
              </button>
            </div>
          ) : (
            ''
          )}

          <ModalAccounting
            show={modalShow}
            closeModal={clickCloseModal}
            accounting={clickAccounting}
            debt={accounting.moneyForCustomers}
            moneyPaid={accounting.moneyPaid}
          />
          <ModalHistoryAccounting
            show={modalHistoryShow}
            closeModal={clickCloseModal}
            histories={props.history}
          />
          <CancelModal
            show={modalCancel}
            confirm={conFfirmCancel}
            code={accounting.code}
            closeModal={closeModalCancel}
          />
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
    brand: state.productReducer.brand,
    cate: state.productReducer.cate.category,
    tag: state.productReducer.tag,
    customers: state.calReducer.customers.customers,
    totalItem: state.calReducer.customers.total,
    debtToPay: state.calReducer.debtToPay,
    customer: state.calReducer.itemEdit.customer,
    fulfillment: state.calReducer.itemEdit.fulfillment,
    accounting: state.calReducer.itemEdit.accounting,
    history: state.calReducer.history,
    item: state.calReducer.item,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllCustomer: (value, page) => {
      dispatch(getAllCustomerRequest(value, page));
    },
    getTotalDebtPay: (id) => {
      dispatch(getTotalDebtToPayRequest(id));
    },
    getOneAccounting: (id, page) => {
      dispatch(getOneAccountingRequest(id, page));
    },
    updateAccounting: (id, status, data) => {
      dispatch(updateAccountingRequest(id, status, data));
    },
    getHistory: (id) => {
      dispatch(getHistoryRequest(id));
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
    cancelAccounting: (id) => {
      dispatch(deleteAccountingRequest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountingUpdate);
