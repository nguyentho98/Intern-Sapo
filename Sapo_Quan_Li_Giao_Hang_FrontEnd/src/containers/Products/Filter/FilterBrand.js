/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ClickAwayListener } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setBrandFilter } from '../../../redux/actions/Filter';
import { getBrandRequest } from '../../../redux/actions/product';
const FilterBrand = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [valueBrand, setValueBrand] = useState('');
  const [valueSearchBrand, setValueSearchBrand] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const handleClickShowModal = () => {
    setShowModal(!showModal);
    setActivePage(1);
    setTimeout(() => {
      props.getBrand('', 1);
    }, 500);
  };
  const setCate = (brand) => {
    setValueBrand(brand);
    props.setBrandFilter(brand);
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (props.brand.total !== undefined) {
      setTotalPage(Math.ceil(props.brand.total / 5));
    }
  });
  const clickNext = () => {
    console.log(activePage, 'and', totalPage);
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
      props.getBrand(valueSearchBrand, activePage + 1);
    }
  };
  const clickPrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
      props.getBrand(valueSearchBrand, activePage - 1);
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
              onClick={() => setCate(cate)}
            >
              <span>{cate}</span>
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
      props.getBrand(value, 1);
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
              {valueBrand === '' ? 'Chọn nhãn hiệu' : valueBrand}
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
            {showBrand(props.brand.brand)}
          </div>
          <div className='card-footer'>
            <div
              className='change-page'
              style={{ width: 'fit-content', float: 'right' }}
            >
              <a
                className={`prev-filter text-center ${
                  activePage === 1 ? 'disable' : ''
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
                  activePage === totalPage || totalPage === 0 ? 'disable' : ''
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
    brand: state.productReducer.brand,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBrand: (value, page) => {
      dispatch(getBrandRequest(value, page));
    },
    setBrandFilter: (data) => {
      dispatch(setBrandFilter(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterBrand);
