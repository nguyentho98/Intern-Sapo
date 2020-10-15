/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Grid, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader/CardHeader.js';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import {
  getDebtOfShipperRequest,
  getFulfillmentOfCrossRequest,
  getHistoryRequest,
  getOneCrossCheckRequest,
  updateCrossCheckRequest,
} from '../../../redux/actions/CrossCheck.js';
import Page from '../../page/Page.js';
import FulfillmentItem from '../CrossCheckCreate/FulfillmentItem.js';
import { showDate } from '../CrossCheckItem/CrossItem.js';
import ModalHistoryCrossCheck from './ModalHistoryCrossCheck.js';
import ModalPaymentCrossCheck from './ModalPaymentCrossCheck.js';
import * as types from './styles';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
function CrossUpdate(props) {
  const id = props.match.params.id;
  const [customerSelected, setCustomerSelected] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
  });
  const { crossCheck, history } = props;
  const classes = types.useStyles();
  const [modalShow, setModalShow] = useState(false);
  const [modalHistoryShow, setModalHistoryShow] = useState(false);
  const handleSubmit = () => {
    if (crossCheck.status) {
      setModalShow(true);
    } else {
      props.updateCrossCheck(
        { userName: localStorage.getItem('username') },
        id,
        1
      );
    }
  };
  const handleChangePage = (e) => {};
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
    props.getOneCross(id);
    props.getFulfillmentOfCross(id, '', 1);
    props.getHistory(id);
  }, []);
  useEffect(() => {
    if (crossCheck.shipperEntity !== undefined) {
      props.getTotalDebtPay(crossCheck.shipperEntity.id);
      setCustomerSelected({
        id: crossCheck.shipperEntity.id,
        name: crossCheck.shipperEntity.userEntity.fullName,
        phone: crossCheck.shipperEntity.phone,
      });
    }
  }, [crossCheck]);
  const searchFulfillment = (e) => {
    let value = e.target.value;
    setTimeout(() => {
      props.getFulfillmentOfCross(id, value, 1);
    }, 500);
  };
  useEffect(() => {}, []);
  const clickCloseModal = (stt) => {
    setModalShow(stt);
    setModalHistoryShow(stt);
  };
  const clickAccounting = (data) => {
    props.updateCrossCheck(data, id, 2);
    setTimeout(() => {
      props.getOneCross(crossCheck.id);
    }, 300);
  };
  useEffect(() => {
    setModalShow(false);
  }, [crossCheck.moneyPaid]);
  const showHistoryModal = () => {
    props.getHistory(id);
    setModalHistoryShow(true);
  };
  const CusTimelineItem = withStyles((theme) => ({
    missingOppositeContent: {
      '&::before': {
        display: 'none',
      },
    },
  }))(TimelineItem);
  const [btnFoot, setBtnFoot] = useState(false);
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
  const cancelCrossCheck = () => {};
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
              {crossCheck.paymentStatus !== 2 ? (
                <button
                  className='btn btn-primary'
                  onClick={() => handleSubmit()}
                >
                  {crossCheck.status ? 'Thanh toán' : 'Đối soát'}
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <Grid className={`${classes.root} mt-3`}>
        <NavLink to={'/admin/cross-check'} style={{ color: '#637381' }}>
          <ChevronLeftIcon />
          Danh sách phiếu đối soát nhân viên
        </NavLink>
        <Grid className='d-flex'>
          <h3 className={classes.title}>{crossCheck.code}</h3>
          <h5
            style={{
              height: 25,
              marginTop: 30,
              marginLeft: 10,
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            {showDate(crossCheck.createdOn)}
          </h5>
        </Grid>
        <Grid>
          <div
            className={
              crossCheck.status !== -1 ? 'btn-group float-right' : 'd-none'
            }
          >
            <button
              type='button'
              class='btn btn-white'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
              style={{ margin: 0, borderRadius: 3 }}
              onClick={cancelCrossCheck}
            >
              Hủy
            </button>
          </div>
        </Grid>
        {/* {showToastSave()} */}
        <GridContainer>
          <GridItem md={8} lg={8}>
            <Card>
              <CardHeader>
                <h4 className={classes.product_title}>Nhân viên</h4>
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
                    </div>
                  </div>
                  <div
                    className='text-right'
                    style={{ width: '50%', float: 'right' }}
                  >
                    <span className='w-100'>
                      Công nợ hiện tại:{' '}
                      <b>
                        {(props.debt - 0)
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
                    // onFocus={focusFul}
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
                  <tr>
                    <td style={{ fontWeight: 500 }}>Tổng</td>
                    <td></td>
                    <td>
                      {(crossCheck.totalMoney - 0)
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
                  totalItems={props.totalFulfillment}
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
                  <CusTimelineItem style={{ minHeight: 50, marginBottom: 10 }}>
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
                          <span style={{ color: '#637382' }}>Thao tác </span>
                          <br />
                          {row.action}
                        </span>
                      </div>
                      <div style={{ width: '40%' }}>
                        <span>
                          <span style={{ color: '#637382' }}>
                            Nhân viên thao tác
                          </span>{' '}
                          <br />
                          {row.operator}
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
                    crossCheck.status
                      ? 'status-accounting'
                      : 'non-status-accounting'
                  }
                >
                  {crossCheck.status ? 'Đã đối soát' : 'Đang đối soát'}
                </p>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <Grid className='category'>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Tổng cần đối soát</p>
                    <span>
                      {': ' +
                        (crossCheck.totalMoney - 0)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
                        ' đ'}
                    </span>
                  </div>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Đã thanh toán</p>
                    <span>
                      {': ' +
                        (crossCheck.moneyPaid - 0)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
                        ' đ'}
                    </span>
                  </div>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Nhân viên tạo</p>{' '}
                    <span>{': ' + crossCheck.maker}</span>
                  </div>
                  <div className='d-flex'>
                    <p style={{ width: '50%' }}>Số phiếu giao </p>{' '}
                    <span>
                      : <b>{crossCheck.numberOfFulfillment} phiếu</b>
                    </span>
                  </div>

                  {crossCheck.status ? (
                    <div className='d-flex'>
                      <p style={{ width: '50%' }}>Ngày đối soát </p>{' '}
                      <span>
                        : <b>{showDate(crossCheck.updatedOn)}</b>
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
                <Grid className='brand' style={{ fontWeight: 400 }}>
                  <label>
                    <b>Ghi chú</b>
                  </label>
                  <div className='input-group mb-2'>
                    {crossCheck.description === null
                      ? 'Chưa có ghi chú'
                      : crossCheck.description}
                    {/* <textarea
                      type='text'
                      id='description'
                      className='form-control'
                      name='description'
                      placeholder=''
                      onChange={handleChange}
                    /> */}
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

            <Card>
              <a onClick={showHistoryModal} className='history'>
                Chi tiết lịch sử thao tác phiếu đối soát
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
          {crossCheck.paymentStatus !== 2 ? (
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
                {crossCheck.status ? 'Thanh toán' : 'Đối soát'}
              </button>
            </div>
          ) : (
            ''
          )}

          <ModalPaymentCrossCheck
            show={modalShow}
            closeModal={clickCloseModal}
            payCrossCheck={clickAccounting}
            debt={crossCheck.totalMoney}
            moneyPaid={crossCheck.moneyPaid}
          />
          <ModalHistoryCrossCheck
            show={modalHistoryShow}
            closeModal={clickCloseModal}
            histories={props.history}
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
    crossCheck: state.crossCheck.itemEdit,
    debt: state.crossCheck.debt,
    customer: state.crossCheck.itemEdit.shipperEntity,
    fulfillment: state.crossCheck.fulfillment.fulfillment,
    totalFulfillment: state.crossCheck.fulfillment.total,
    history: state.crossCheck.history,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getOneCross: (id) => {
      dispatch(getOneCrossCheckRequest(id));
    },
    getTotalDebtPay: (id) => {
      dispatch(getDebtOfShipperRequest(id));
    },
    getFulfillmentOfCross: (id, value, page) => {
      dispatch(getFulfillmentOfCrossRequest(id, value, page));
    },
    updateCrossCheck: (data, id, status) => {
      dispatch(updateCrossCheckRequest(data, id, status));
    },
    getHistory: (id) => {
      dispatch(getHistoryRequest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CrossUpdate);
