/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable array-callback-return /
// eslint-disable jsx-a11y/anchor-is-valid /
import { Tooltip } from '@material-ui/core';
import { Checkbox } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import {
  clearFilter,
  setBrandFilter,
  setCategoryFilter,
  setFromDateFilter,
  setStatusFilter,
  setTagsFilter,
  setToDateFilter,
} from '../../redux/actions/Filter';
import {
  clearList,
  clearProductItem,
  deleteProductRequest,
  getAllProductRequest,
} from '../../redux/actions/product';
import {
  setSttAfterCreate,
  setSttCheckBox,
  setSttCreateSuccess,
  setSttFailSave,
} from '../../redux/actions/SetSttCheckBox';
import FilterComponent from '../Filter/FilterComponent';
import Page from '../page/Page';
import DeleteModal from '../PopUpConfirm/DeleteModal';
import ProgressDelete from '../PopUpConfirm/ProgressDelete';
import FilterBrand from './Filter/FilterBrand';
import FilterCategory from './Filter/FilterCategory';
import FilterClassify from './Filter/FilterClassify';
import FilterCreatedDate from './Filter/FilterCreatedDate';
import FilterStatus from './Filter/FilterStatus';
import FilterTags from './Filter/FilterTags';
import useOutsideClick from './OutSiteClick';
import ProductItem from './product-item/ProductItem';

const ProductList = (props) => {
  const valueOptionCheck = [
    {
      text: 'Chọn điều kiện lọc',
      key: 'none',
      defaultValue: 'none',
    },
    {
      text: 'Trạng thái',
      key: 'status',
      defaultValue: -1,
      clearF: () => {
        props.setSttFilter(-1);
      },
    },
    {
      text: 'Loại sản phẩm',
      key: 'cate',
      defaultValue: '',
      clearF: () => {
        props.setCategoryFilter('');
      },
    },
    {
      text: 'Nhãn hiệu',
      key: 'brand',
      defaultValue: '',
      clearF: () => {
        props.setBrandFilter('');
      },
    },
    {
      text: 'Ngày tạo',
      key: 'Date',
      defaultValue: null,
      clearF: () => {
        props.setFromDate(null);
        props.setToDate(null);
      },
    },
    {
      text: 'Tag',
      key: 'tag',
      defaultValue: [],
      clearF: () => {
        props.setTagsFilter([]);
      },
    },
  ];
  const [checked, setChecked] = useState(false);
  const [iconClass, setIconClass] = useState('');
  const [length, setLength] = useState(0);
  const [categories, setCategories] = useState([]);
  const [disable, setDisable] = useState(false);
  const [action, setAction] = useState(false);
  const [actionFilter, setActionFilter] = useState(false);
  const [seachingStatus, setSeachingStatus] = useState(false);
  const [filterValue, setFilterValue] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef();
  useOutsideClick(ref, () => {
    setAction(false);
  });
  const [pro, setPro] = useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const showCategoryItem = (products) => {
    let result = null;
    if (products) {
      localStorage.setItem('length', products.length);
      result = products.map((product, index) => {
        return (
          <ProductItem
            product={product}
            key={index}
            getItemChecked={getItemChecked}
            stt={checked}
          />
        );
      });
    } else {
      result = (
        <div
          className='justify-content-center d-flex'
          style={{ position: 'sticky', left: '58%', marginTop: 25 }}
        >
          <div class='spinner-border text-primary'></div>
        </div>
      );
    }
    return result;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDisable(
      categories.length !== 0 &&
        categories.length < parseInt(localStorage.getItem('length'))
        ? true
        : false
    );
  });
  const getItemChecked = (id, status) => {
    if (status) {
      categories.push(id);
      setIcon();
      setCategories(categories);
      setLength(categories.length);
    }
    if (!status) {
      categories.map((cate, index) => {
        if (id === cate) {
          categories.splice(index, 1);
          setCategories(categories);
          setIcon();
          setLength(categories.length);
        }
        if (categories.length === 0) {
          setChecked(false);
          setAction(false);
        }
        return null;
      });
    }
  };

  const setIcon = () => {
    if (categories.length > 0) {
      if (categories.length === parseInt(localStorage.getItem('length'))) {
        setIconClass(' fa fa-check');
        props.setStt(true);
        setChecked(true);
      } else {
        setChecked(true);
        setIconClass(' fa fa-minus');
      }
    } else {
      props.setStt(false);
    }
  };

  useEffect(() => {
    props.clearFilter();
    setTimeout(() => {
      props.getAllProduct(1, 10, {});
    }, 500);
    props.clear();
    props.setCreated(false);
    props.setFailSave(false);
    props.setAfterCreate(false);
    props.setStt(false);
    props.clearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (checked) props.setStt(false);
    if (!checked) props.setStt(true);
  };
  const setCategoryDisable = () => {
    if (disable) {
      props.setStt(-1);
    }
  };
  const setActionChecked = () => {
    setAction(!action);
    setActionFilter(false);
  };

  const deleteCategory = () => {
    setshowModalDelete(true);
  };
  const clickCloseModal = (data) => {
    setshowModalDelete(data);
  };
  const confircmDelete = () => {
    setshowModalDelete(false);
    props.setStt(false);
    setChecked(false);
    setCategories([]);
    setProgress(progress + 70);
    props.clearList();
    setAction(false);
    setTimeout(() => {
      props.getAllProduct(1, 10, {});
    }, 1000);
    if (categories.length > 0) {
      categories.map((ca) => {
        deleteProductRequest(ca)
          .then((res) => {})
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
        setPro(pro + 1);
      });
    }
  };
  const closeProgress = (data) => {
    setShowProgress(data);
  };
  const handleChangePage = (e) => {
    console.log(e + 'acs');
    props.getAllProduct(e, 10, props.filter);
    // console.log(props.filter);
  };

  const filterComponents = [
    { key: 'status', component: <FilterStatus /> },
    { key: 'cate', component: <FilterCategory /> },
    { key: 'brand', component: <FilterBrand /> },
    { key: 'tag', component: <FilterTags /> },
    { key: 'Date', component: <FilterCreatedDate /> },
  ];

  useEffect(() => {
    if (progress === 70) {
      setProgress(progress + 30);
    }
  }, [props.products]);
  const getAllProductNonFilter = () => {
    setProgress(progress + 70);
    setFilterValue(false);
    setSeachingStatus(false);
    // setValueOptionSelected([]);
    props.clearFilter();
    props.getAllProduct(1, 10, {});
  };
  const {
    status,
    category,
    brand,
    fromDate,
    toDate,
    tag,
    classify,
  } = props.filter;
  const showDate = (dateLong) => {
    const date = new Date(dateLong);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  };
  const showFilterTagList = () => {
    var rs = '';
    if (status !== -1) {
      rs += `<li className="filter-tag">
          <span>
            ${
              status === 1
                ? 'Đang giao dịch'
                : status === 0
                ? 'ngừng giao dịch'
                : 'Đang giao dịch,Ngừng giao dịch'
            }
          </span>
        </li>`;
    }
    if (category !== '') {
      rs += `<li className="filter-tag">
          <span>
          Loại sản phẩm : 
            ${category}
          </span>
        </li>`;
    }
    if (brand !== '') {
      rs += `<li className="filter-tag">
          <span>
          Nhãn hiệu : 
            ${brand}
          </span>
        </li>`;
    }
    if (fromDate > 0 && (toDate === null || toDate === 0)) {
      rs += `<li className="filter-tag">
          <span>
         Từ ${showDate(fromDate)} đến nay
          </span>
        </li>`;
    } else if ((fromDate === null || fromDate === 0) && toDate > 0) {
      rs += `<li className="filter-tag">
          <span>
         Từ trước đến ${showDate(toDate)}
          </span>
        </li>`;
    } else if (fromDate > 0 && toDate > 0) {
      rs += `<li className="filter-tag">
          <span>
         Từ ${showDate(fromDate)} đến ${showDate(toDate)}
          </span>
        </li>`;
    }
    return rs;
  };
  useEffect(() => {
    if (
      status !== -1 ||
      category !== '' ||
      brand !== '' ||
      (fromDate === null && fromDate === 0) ||
      (toDate === null && toDate === 0)
    ) {
      setFilterValue(true);
    }
  }, [props.products]);
  const setProG = (data) => {
    setProgress(progress + data);
  };
  const setSeachingStatusX = (data) => {
    setSeachingStatus(data);
  };
  return (
    <div className='product-list' style={{ fontSize: '14px', marginTop: -55 }}>
      <LoadingBar
        color='#08f'
        height='3px'
        progress={progress}
        onLoaderFinished={() => {
          setProgress(0);
        }}
      />
      <div className='row m-header'>
        <div className='d-flex'>
          <div className=''>
            <h2>Sản phẩm</h2>
          </div>
          <div className='action-category'>
            <NavLink to='/admin/product-add'>
              <button type='button' className='btn btn-primary add-btn'>
                Thêm sản phẩm
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
              <a
                className={
                  seachingStatus
                    ? 'non-active-header-card'
                    : 'active-header-card'
                }
                onClick={getAllProductNonFilter}
                style={{ cursor: 'pointer' }}
              >
                Tất cả sản phẩm
              </a>
              {seachingStatus ? (
                <a className='active-header-card' style={{ left: '150px' }}>
                  Tìm kiếm...
                </a>
              ) : (
                ''
              )}
            </div>
          </div>
          <FilterComponent
            valueOptionCheck={valueOptionCheck}
            filterComponents={filterComponents}
            setProgress={setProG}
            search={seachingStatus}
            setSeachingStatus={setSeachingStatusX}
            label={'sản phẩm'}
          />
          <ul className={`filter-list-tag  ${filterValue ? '' : 'd-none'}`}>
            {ReactHtmlParser(showFilterTagList())}
          </ul>
          <div className='card-body'>
            <div className='col-lg-12 col-12 col-md-12 bg-white'>
              <div
                className={
                  categories.length === 0
                    ? ' d-none-custom '
                    : ' d-block-custom checked-actions'
                }
              >
                <div className='apap'>
                  <a
                    className='btn btn-sm border'
                    style={{
                      background: '#f5f5f5',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <span>(đã chọn {length} sản phẩm)</span>
                  </a>
                  <a
                    className='btn btn-sm border dropdown-toggle action-oncheck'
                    style={{
                      background: 'linear-gradient(180deg,#fff,#f9fafb)',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: 'none !important',
                    }}
                    onClick={setActionChecked}
                  >
                    chọn thao tác
                  </a>
                </div>
                <div>
                  <div
                    ref={ref}
                    className={`_action_checked bordershadowC ${
                      action === false ? 'd-none-custom' : 'd-block-custom'
                    }`}
                    style={{ marginTop: 8 }}
                  >
                    <div className='arrow'></div>
                    <ul
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: 24,
                        fontFamily: 'Segoe UI',
                      }}
                    >
                      <li onClick={deleteCategory}>
                        <a>Xoá sản phẩm</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='table-reponsive-sm'>
                <table className='table' cellPadding='1' cellSpacing='0'>
                  <thead>
                    <tr>
                      <th scope='col' style={{ width: 40 }}>
                        <div
                          style={{ cursor: 'pointer' }}
                          onClick={setCategoryDisable}
                        >
                          <Tooltip
                            title={length === 0 ? 'Chọn tất cả sản phẩm' : ''}
                            placement='right'
                          >
                            <Checkbox
                              locked={disable}
                              className='pretty-checkbox'
                              color='info-o'
                              shape='curve'
                              animation='pulse'
                              onChange={handleChange}
                              checked={checked}
                              icon={<i className={iconClass} />}
                              data-tip
                              data-for='_select_all'
                            ></Checkbox>
                          </Tooltip>
                        </div>
                      </th>
                      <th scope='col' style={{ width: 75 }}></th>
                      <th scope='col' style={{ minWidth: 220, width: 234 }}>
                        Sản phẩm
                      </th>
                      <th scope='col'>Loại</th>
                      <th scope='col'>Nhãn hiệu</th>
                      <th scope='col' className='text-center'>
                        Số lượng
                      </th>
                      <th scope='col'>Trạng thái</th>
                      <th scope='col'>Ngày khởi tạo</th>
                    </tr>
                  </thead>

                  <tbody>{showCategoryItem(props.products)}</tbody>
                </table>
              </div>
            </div>
            <div className='col-lg-12 col-md-12 col-12 mt-3'>
              <Page
                item={10}
                totalItems={props.total}
                changePage={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        show={showModalDelete}
        closeModal={clickCloseModal}
        confirm={confircmDelete}
        debt={10}
      />
      <ProgressDelete
        show={showProgress}
        close={closeProgress}
        totalProgress={categories.length}
        pro={pro}
      />
    </div>
  );
};
ProductList.propTypes = {
  getAllCategory: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products.products,
    total: state.productReducer.products.totalProducts,
    filter: state.filter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: (page, limit, data) => {
      dispatch(getAllProductRequest(page, limit, data));
    },
    setBrandFilter: (data) => {
      dispatch(setBrandFilter(data));
    },
    setCategoryFilter: (data) => {
      dispatch(setCategoryFilter(data));
    },
    setFromDate: (data) => {
      dispatch(setFromDateFilter(data));
    },
    setToDate: (data) => {
      dispatch(setToDateFilter(data));
    },
    setTagsFilter: (data) => {
      dispatch(setTagsFilter(data));
    },
    setStt: (data) => {
      dispatch(setSttCheckBox(data));
    },
    clear: () => {
      dispatch(clearProductItem());
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
    clearFilter: () => {
      dispatch(clearFilter());
    },
    setSttFilter: (data) => {
      dispatch(setStatusFilter(data));
    },
    delete: (id) => {
      dispatch(deleteProductRequest(id));
    },
    clearList: () => {
      dispatch(clearList());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
