/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ClickAwayListener } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setShipperFilter } from '../../../../redux/actions/fulfillmentSearch';
import { fetchListShipper } from '../../../../redux/actions/shipper';
const FilterShipper = (props) => {
  const {fetchListShipper,listShipper,stateDefault,setStateDefault,nameFilter, setNameFilter,}=props
  const [showModal, setShowModal] = useState(false);
  const [valueBrand, setValueBrand] = useState('');
  const [valueSearchBrand, setValueSearchBrand] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const handleClickShowModal = () => {
    setShowModal(!showModal);
    setActivePage(1);
    setTimeout(() => {
      fetchListShipper(0, 5);
    }, 500);
  };
  const setCate = (shipper,id) => {
    setValueBrand(shipper);
    setNameFilter({...nameFilter,nameShipper:shipper})
    setStateDefault({...stateDefault,shipper:id})
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (listShipper !== undefined) {
      setTotalPage(Math.ceil(listShipper.totalItem / 5));
    }
  });
  const clickNext = () => {
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
      fetchListShipper(activePage + 1, 5,'');
    }
  };
  const clickPrev = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
      fetchListShipper(activePage - 1, 5,'');
    }
  };
  const showBrand = (category) => {
    let rs = null;

    if (category !== undefined) {
      if (category.length === 0) {
        rs = <div>Không có dữ liệu</div>;
      } else {
        rs = category.map((cate, index) => {
          return (
            <div
              className='cate-item'
              key={index}
              onClick={() => setCate(cate.name,cate.id)}
            >
              <span>{cate.name}</span> <br></br>
              <span>{cate.phone}</span>
            </div>
          );
        });
      }
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
    setValueSearchBrand(value);
    setTimeout(() => {
      fetchListShipper(0, 5);
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
              {valueBrand === '' ? 'Chọn nhân viên giao' : valueBrand}
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
            {showBrand(listShipper.shipperDTOList)}
          </div>
          <div className='card-footer'>
            <div
              className='change-page'
              style={{ width: 'fit-content', float: 'right' }}
            >
              <a
                className={`prev-filter text-center ${
                  activePage !== 0 ? 'disable' : ''
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
                  activePage === totalPage ? 'disable' : ''
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
    listShipper: state.shipper.listShipper,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchListShipper: (page, limit) => {
      dispatch(fetchListShipper(page, limit));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterShipper);
