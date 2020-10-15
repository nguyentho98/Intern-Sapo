/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { getCateRequest } from '../../../redux/actions/product';
import { connect } from 'react-redux';
import { ClickAwayListener } from '@material-ui/core';
import { setCategoryFilter } from '../../../redux/actions/Filter';
const FilterCategory = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [valueCate, setValueCate] = useState('');
  const [valueSearchCate, setValueSearchCate] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const handleClickShowModal = () => {
    setShowModal(!showModal);
    setActivePage(1);
    setTimeout(() => {
      props.getCate('', 1);
    }, 500);
  };
  const setCate = (cate) => {
    setValueCate(cate);
    props.setCategoryFilter(cate);
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (props.cate.total !== undefined) {
      setTotalPage(Math.ceil(props.cate.total / 5));
    }
  });
  const clickNext = () => {
    console.log(activePage, 'and', totalPage);
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
      props.getCate(valueSearchCate, activePage + 1);
    }
  };
  const clickPrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
      props.getCate(valueSearchCate, activePage - 1);
    }
  };
  const showCate = (category) => {
    let rs = null;

    if (category !== undefined) {
      rs = category.map((cate, index) => {
        return (
          <div className='cate-item' key={index} onClick={() => setCate(cate)}>
            <span>{cate}</span>
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
      props.getCate(value, 1);
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
              {valueCate === '' ? 'Chọn loại sản phẩm' : valueCate}
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
            {showCate(props.cate.category)}
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
    cate: state.productReducer.cate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCate: (value, page) => {
      dispatch(getCateRequest(value, page));
    },
    setCategoryFilter: (data) => {
      dispatch(setCategoryFilter(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);
