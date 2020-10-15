/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ClickAwayListener } from '@material-ui/core';
import { setCustomerFilter } from '../../../../redux/actions/fulfillmentSearch';
import { fetchListCustomer } from '../../../../redux/actions/customer';
const FilterCustomer = (props) => {
  const {listCustomer,fetchListCustomer,stateDefault,
    nameFilter, setNameFilter,
    setStateDefault}=props
  const [showModal, setShowModal] = useState(false);
  const [valueCate, setValueCate] = useState('');
  const [valueSearchCate, setValueSearchCate] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const handleClickShowModal = () => {
    setShowModal(!showModal);
    setActivePage(0);
    setTimeout(() => {
      fetchListCustomer(0, 5,valueSearchCate);
    }, 500);
  };
  const setCate = (name,id) => {
    setValueCate(name);
    setNameFilter({...nameFilter,nameCustomer:name})
    setStateDefault({...stateDefault,customer:id});
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (listCustomer.totalItem !== undefined) {
      setTotalPage(Math.ceil(listCustomer.totalItem / 5));
    }
  });
  const clickNext = () => {
    console.log(activePage, 'and', totalPage);
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
      fetchListCustomer(activePage + 1,5,valueSearchCate);
    }
  };
  const clickPrev = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
      fetchListCustomer(activePage - 1,5,valueSearchCate);
    }
  };
  const showCate = (category) => {
    let rs = null;

    if (category !== undefined) {
      rs = category.map((cate, index) => {
        return (
          <div className='cate-item' key={index} onClick={() => setCate(cate.name,cate.id)}>
            <span>Tên: {cate.name}</span>   <br></br>
            <span>SĐT: {cate.phone}</span>
          </div>
        );
      });
    } else {
      return (
        <div
          className='justify-content-center d-flex'
          style={{ position: 'sticky', left: '58%', marginTop: 25 }}
        >
          <div class='spinner-border text-primary'></div>
        </div>
      );
    }
    return rs;
  };
  const handleChange = (e) => {
    let value = e.target.value;
    setValueSearchCate(value);
    setTimeout(() => {
      fetchListCustomer(0,5,value);
    }, 400);
  };
  const clickAway = () => {
    setShowModal(false);
  };
  return (
    <ClickAwayListener onClickAway={clickAway}>
      <div className='filter-item d-flex' style={{ position: 'relative' }}>
        <div className='filter-item-select'>
          <div
            className='filter-category'
            style={{ paddingLeft: 10, width: 176, position: 'relative' }}
          >
            <button
              className='btn btn-filter btn-filter-category'
              type='button'
              onClick={handleClickShowModal}
            >
              {valueCate === '' ? 'Chọn khách hàng' : valueCate}
            </button>
            <i
              className='fa fa-sort'
              style={{
                position: 'absolute',
                right: '11px',
                top: '1px',
              }}
            />
          </div>
        </div>
        <div
          className={`modal-filter card bordershadowC  ${
            showModal === false ? 'd-none-custom' : 'd-block-custom'
          }`}
        >
          <div className='arrow' style={{ left: 20 }}></div>
          <div className='card-body'>
            <div className='input-groupa d-flex'>
              <span className='input-group-span'>
                <i className='fa fa-search'></i>
              </span>
              <input
                autocomplete='off'
                type='text'
                bind='query'
                className='form form-control'
                placeholder='Tìm kiếm...'
                id='query-enter'
                onChange={handleChange}
              />
            </div>
            {showCate(listCustomer.dataListCUS)}
          </div>
          <div className='card-footer'>
            <div
              className='change-page'
              style={{ width: 'fit-content', float: 'right' }}
            >
              <a
                className={`prev-filter text-center ${
                  activePage === 0 ? 'disable' : ''
                }`}
                style={{ marginRight: '5px' }}
                onClick={clickPrev}
              >
                <span>
                  <i className='fa fa-arrow-left' />
                </span>
              </a>
              <a
                className={`prev-filter text-center ${
                  activePage === totalPage-1 ? 'disable' : ''
                }`}
                onClick={clickNext}
              >
                <span>
                  <i className='fa fa-arrow-right' />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    listCustomer: state.customer.listCustomer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListCustomer: (page, limit, name) => {
      dispatch(fetchListCustomer(page, limit, name));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterCustomer);
