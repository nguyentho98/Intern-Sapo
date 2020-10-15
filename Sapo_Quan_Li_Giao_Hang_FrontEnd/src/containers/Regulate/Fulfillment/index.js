/* eslint-disable jsx-a11y/anchor-is-valid */
import { Tooltip } from '@material-ui/core';
import 'pretty-checkbox';
import { Checkbox } from 'pretty-checkbox-react';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSttCheckBox } from '../../../redux/actions/SetSttCheckBox';
import Page from '../../page/Page';
import FulfillmentItem from './FulfillmentItem/FulfillmentItem';
import { regulateFulfillment } from '../../../apis/fulfillment';
import ReactTooltip from 'react-tooltip';

const Fulfillment = (props) => {
  const [checked, setChecked] = useState(false);
  const [iconClass, setIconClass] = useState('');
  const [length, setLength] = useState(0);
  const [categories, setCategories] = useState([]);
  const [disable, setDisable] = useState(false);
  const [action, setAction] = useState(false);
  const [fulfillment, setFulfillment] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [totalItem, setTotalItem] = useState(0);
  const [status, setStatus] = useState(null);
  const [status1, setStatus1] = useState(2);
  const [state, setState] = useState(false);

  const showFulfillmentItem = () => {
    let result = null;
    if (fulfillment.length >= 1) {
      localStorage.setItem('length', fulfillment.length);
      result = fulfillment.map((fulfillment, index) => {
        return (
          <FulfillmentItem
            fulfillment={fulfillment}
            key={index}
            getItemChecked={getItemChecked}
            stt={checked}
          />
        );
      });
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

  useEffect(() => {
    setTimeout(() => {
      regulateFulfillment(page, limit)
        .then((res) => {
          console.log(res.data);
          if (res.data != null) {
            setFulfillment(res.data.fulfillmentDTOS);
            setTotalItem(res.data.totalElement);
            setState(true);
          }
        })
        .catch((er) => console.log(er));
    }, 300);
  }, [page, limit]);

  const getItemChecked = (id, status, active) => {
    let activeU = !active;
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

  const handleChangePage = (page) => {
    setPage(page - 1);
  };

  const handleChange = (e) => {
    console.log(e.target.checked, 'đây là trạng thái');
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
  };

  return (
    <div className='product-list' style={{ fontSize: '14px' }}>
      <div className='row m-header' style={{ marginBottom: '20px' }}>
        <div className='d-flex'>
          <div className='' style={{ marginBottom: '0px', float: 'left' }}>
            <h2>Phiếu giao</h2>
          </div>
        </div>
        <div className='action-category'>
          {/* <button
            type='button'
            className='btn btn-primary add-btn'
            data-tip
            data-for='dp'
          >
            Điều phối nhanh
          </button> */}
          <ReactTooltip
            id='dp'
            place='top'
            className='datatooltip'
            effect='solid'
          >
            Hệ thống sẽ điều phối phiếu giao có khoảng cách gần với khu vực phụ
            trách cho nhân viên nhất
          </ReactTooltip>
        </div>
      </div>
      <div className='row'>
        <div className='card bordershadow' style={{ width: '100%' }}>
          <div className='card-header bg-white'>
            <div className='table-header'>
              <p
                style={{ color: 'black', fontWeight: 'bold', fontSize: '15px' }}
              >
                Danh sách các phiếu giao
              </p>
            </div>
          </div>
          <div className='card-body'>
            {state === false ? (
              <div
                className='spinners'
                style={{
                  textAlign: 'center',
                  marginTop: '40px',
                  marginBottom: '40px',
                }}
              >
                <div class='spinner-border text-primary'></div>
              </div>
            ) : (
              <div className='col-lg-12 col-12 col-md-12 bg-white'>
                <div
                  className={
                    categories.length === 0
                      ? ' d-none-custom '
                      : ' d-block-custom checked-actions'
                  }
                >
                  <div className='apap' style={{ marginTop: '3px' }}>
                    <a
                      className='btn btn-sm border'
                      style={{ background: '#f5f5f5' }}
                    >
                      <span>(đã chọn {length} danh mục)</span>
                    </a>
                    <a
                      className='btn btn-sm border dropdown-toggle'
                      style={{
                        background: 'linear-gradient(180deg,#fff,#f9fafb)',
                      }}
                      onClick={setActionChecked}
                    >
                      Chọn thao tác
                    </a>
                  </div>
                  <div>
                    <div
                      className={`_action_checked bordershadowC ${
                        action === false ? 'd-none-custom' : 'd-block-custom'
                      }`}
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
                        <li onClick={''}>
                          <a>Xóa khách hàng</a>
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
                        <th scope='col'>Mã phiếu giao</th>
                        <th scope='col'>Trạng thái giao hàng</th>                        
                        <th scope='col'>Địa chỉ giao</th>
                        <th scope='col' style={{textAlign:'right'}}>Phí vận chuyển</th>
                        <th scope='col' style={{textAlign:'right'}}>Giá trị đơn hàng</th>
                      </tr>
                    </thead>

                    <tbody>{showFulfillmentItem(fulfillment)}</tbody>
                  </table>
                </div>
                <Page
                  item={limit}
                  totalItems={totalItem}
                  changePage={handleChangePage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setStt: (data) => {
      dispatch(setSttCheckBox(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fulfillment);
