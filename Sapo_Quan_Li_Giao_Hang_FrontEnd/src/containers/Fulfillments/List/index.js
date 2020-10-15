/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable array-callback-return /
// eslint-disable jsx-a11y/anchor-is-valid /
import {
  ClickAwayListener,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Checkbox } from "pretty-checkbox-react";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { clearFilter, setStatusFilter } from "../../../redux/actions/Filter";
import {
  clearList,
  clearProductItem,
  deleteProductRequest,
  getAllProductRequest,
} from "../../../redux/actions/product";
import {
  setSttAfterCreate,
  setSttCheckBox,
  setSttCreateSuccess,
  setSttFailSave,
} from "../../../redux/actions/SetSttCheckBox";
import Page from "../../page/Page";
import FilterShipper from "./Filter/FilterShipper";
import FilterCustomer from "./Filter/FilterCustomer";
import FilterStatus from "./Filter/FilterStatus";
import FilterCreatedDate from "./Filter/FilterCreatedDate";
import useOutsideClick from "./Filter/OutSiteClick";
import Item from "./Item";
import * as types from "./styles";
import ReactHtmlParser from "react-html-parser";
import FilterComponent from "./Filter";
import {  filterListFulfillmentThunk } from "../../../redux/actions/fulfillment";
import FilterShippingMethod from "./Filter/FilterShippingMethod";
import FilterAccounting from "./Filter/FilterAccounting";

const valueOptionCheck = [
  {
    text: "Chọn điều kiện lọc",
    key: "none",
  },
  {
    text: "Trạng thái",
    key: "status",
  },
  {
    text: "Khách hàng",
    key: "customer",
  },
  {
    text: "Ngày tạo",
    key: "date",
  },
  {
    text: "Nhân viên giao",
    key: "shipper",
  },
  {
    text: "Hình thức giao hàng",
    key: "shippingMethod",
  },
  {
    text: "Đối soát",
    key: "accountingStatus",
  },
  {
    text: "",
    key: "hidden",
  },
];
const Fulfillments = (props) => {
  const {
    fulfillments,
    setStt,
    filterListFulfillmentThunk,
  } = props;
  const [checked, setChecked] = useState(false);
  const [iconClass, setIconClass] = useState("");
  const [length, setLength] = useState(0);
  const [categories, setCategories] = useState([]);
  const [disable, setDisable] = useState(false);
  const [action, setAction] = useState(false);
  const [actionFilter, setActionFilter] = useState(false);
  const [filterValue, setFilterValue] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [valueInputSreach, setValueInputSreach] = useState("");
  const [noItemFulfillment, setNoItemFulfillment] = useState(false);
  const [nameFilter, setNameFilter] = useState({
    nameCustomer:'',
    nameShipper:''
  });
  const [search,setSearch]=useState({
    status: -1,
    customer: "",
    shipper: "",
    code:'',
    shippingMethod:-1,
    accountingStatus:-1,
    fromDate: null,
    toDate: null,
  })
  const [stateDefault,setStateDefault]=useState({
    status: -1,
    customer: "",
    shipper: "",
    code:'',
    shippingMethod:-1,
    accountingStatus:-1,
    fromDate: null,
    toDate: null,
  })
  // const [valueOftion, setValueOption] = useState([]);
  // const [valueOptionSelected, setValueOptionSelected] = useState([]);
  const ref = useRef();
 

  const classes = types.useStyles();
  useOutsideClick(ref, () => {
    setAction(false);
  });
  const showFilterTagList = () => {
    var rs = '';
    if (search.status !== -1) {
      rs += `<li className="filter-tag">
          <span>
            ${search.status === 1 ? 'Chờ lấy hàng':''}
            ${search.status === 2 ? 'Đã ở trong kho':''}
            ${search.status === 3 ? 'Đang đi giao':''}
            ${search.status === 4 ? 'Hoàn thành':''}
            ${search.status === 6 ? 'Đã hủy':''}
          </span>
        </li>`;
    }
    if (search.customer !== '') {
      rs += `<li className="filter-tag">
          <span>
          Khách hàng : 
            ${nameFilter.nameCustomer}
          </span>
        </li>`;
    }
    if (search.shipper !== '') {
      rs += `<li className="filter-tag">
          <span>
           Nhân viên giao : 
          ${nameFilter.nameShipper}
          </span>
        </li>`;
    }
    if (search.shippingMethod !== -1) {
      rs += `<li className="filter-tag">
          <span>
          Hình thức giao hàng : 
          ${search.shippingMethod===0?'Chuyển sản phẩm về kho rồi đi giao':''}
          ${search.shippingMethod===1?'Đi giao luôn':''}
          </span>
        </li>`;
    }
    if (search.accountingStatus !== -1) {
      rs += `<li className="filter-tag">
          <span>
         Đối soát : 
          ${search.accountingStatus===0?'Chưa đối soát':''}
          ${search.accountingStatus===1?'Đã đối soát':''}
          </span>
        </li>`;
    }
    if (search.fromDate > 0 && (search.toDate === null || search.toDate === 0)) {
      rs += `<li className="filter-tag">
          <span>
         Từ ${showDate(search.fromDate)} đến nay
          </span>
        </li>`;
    } else if ((search.fromDate === null || search.fromDate === 0) && search.toDate > 0) {
      rs += `<li className="filter-tag">
          <span>
         Từ trước đến ${showDate(search.toDate)}
          </span>
        </li>`;
    } else if (search.fromDate > 0 && search.toDate > 0) {
      rs += `<li className="filter-tag">
          <span>
         Từ ${showDate(search.fromDate)} đến ${showDate(search.toDate)}
          </span>
        </li>`;
    }
    return rs;
  };
  const filterComponents = [
    { key: "status", component: <FilterStatus setStateDefault={setStateDefault} stateDefault={stateDefault} /> },
    { key: "shippingMethod", component: <FilterShippingMethod setStateDefault={setStateDefault} stateDefault={stateDefault} /> },
    { key: "accountingStatus", component: <FilterAccounting setStateDefault={setStateDefault} stateDefault={stateDefault} /> },
    { key: "customer", component: <FilterCustomer nameFilter={nameFilter} setNameFilter={setNameFilter} setStateDefault={setStateDefault} stateDefault={stateDefault} /> },
    { key: "shipper", component: <FilterShipper  nameFilter={nameFilter} setNameFilter={setNameFilter} setStateDefault={setStateDefault} stateDefault={stateDefault}/> },
    { key: "date", component: <FilterCreatedDate  setStateDefault={setStateDefault}  stateDefault={stateDefault}/> },
  ];
  function showDate(time) {
    let d = new Date(time);

    let day;
    if (d.getDate() < 10) {
      day = "0" + d.getDate();
    } else {
      day = d.getDate();
    }

    let mon;
    if (d.getMonth() + 1 < 10) {
      mon = "0" + (d.getMonth() + 1);
    } else {
      mon = d.getMonth() + 1;
    }
    let year = d.getFullYear();

    return `${day}-${mon}-${year}`;
  }
  const showCategoryItem = (fulfillments) => {
    let result = null;
    if (fulfillments) {
      localStorage.setItem("length", fulfillments.length);
      result = fulfillments.map((fulfillment, index) => {
        return (
          <Item
            fulfillment={fulfillment}
            key={index}
            getItemChecked={getItemChecked}
            stt={checked}
          />
        );
      });
    } else {
      result = (
        <div
          className="justify-content-center d-flex"
          style={{ position: "sticky", left: "58%", marginTop: 25 }}
        >
          <div class="spinner-border text-primary"></div>
        </div>
      );
    }
    return result;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDisable(
      categories.length !== 0 &&
        categories.length < parseInt(localStorage.getItem("length"))
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
      if (categories.length === parseInt(localStorage.getItem("length"))) {
        setIconClass(" fa fa-check");
        setStt(true);
        setChecked(true);
      } else {
        setChecked(true);
        setIconClass(" fa fa-minus");
      }
    } else {
      setStt(false);
    }
  };
  const filterFulfillments  = () => {
    setSearch(stateDefault)
    setFilterValue(true)
    setActive(5)
  }
  useEffect(() => {
    clearFilter();
    setTimeout(() => {
      filterListFulfillmentThunk(0,10,search)
    }, 500);
    setStt(false);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  useEffect(() => {
    if (fulfillments.totalElement === 0) {
      setNoItemFulfillment(true);
    } else {
      setNoItemFulfillment(false);
    }
  }, [fulfillments]);
  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (checked) setStt(false);
    if (!checked) setStt(true);
  };
  const setCategoryDisable = () => {
    if (disable) {
      setStt(-1);
    }
  };
  const setActionChecked = () => {
    setAction(!action);
    setActionFilter(false);
  };
  const handleChangePage = (e) => {
    filterListFulfillmentThunk(e - 1,10,search)
  };

  useEffect(() => {
    if (progress === 70) {
      setProgress(progress + 30);
    }
  }, [fulfillments]);
  const getAllFulfillmentonFilter = () => {
    setProgress(progress + 70);
    setFilterValue(false);
    clearFilter();
    setActive(0)
    setSearch({status: -1,
      customer: "",
      shipper: "",
      code:'',
      shippingMethod:-1,
      accountingStatus:-1,
      fromDate: null,
      toDate: null,})
  };
  const setProG = (data) => {
    setProgress(progress + data);
  };
  const onClickFilter = (status) => {
    setSearch({status: status,
      customer: "",
      shipper: "",
      code:'',
      shippingMethod:-1,
      accountingStatus:-1,
      fromDate: null,
      toDate: null,})
    setStateDefault({...stateDefault,status:status})
    setProgress(progress + 70);
    setActive(status);
    setFilterValue(false)
    setStt(false);
  };
  
  const renderTable = () => {
    if (fulfillments.totalElement === undefined) {
      return (
        <div
          className="spinners"
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <div class="spinner-border text-primary"></div>
        </div>
      );
    } else if (fulfillments.totalElement === 0) {
      return (
        <Grid className={classes.jss4}>
          <svg
            id="next-search-reverse"
            width="100%"
            height="100%"
            style={{ fill: " #c3cfd8" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z" />
            </svg>
          </svg>
          <Typography
            variant="body1"
            align="center"
            style={{
              fontSize: 19,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Không tìm thấy phiếu giao hàng phù hợp với điều kiện tìm kiếm
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ color: "#637381" }}
          >
            Thử thay đổi điều kiện lọc hoặc từ khóa tìm kiếm
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <div className="table-reponsive-sm">
            <table
              className="table"
              cellPadding="1"
              cellSpacing="0"
              style={{ fontSize: 15 }}
            >
              <thead>
                <tr>
                  {/* <th scope='col' style={{ width: 40 }}>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={setCategoryDisable}
                    >
                      <Tooltip
                        title={length === 0 ? 'Chọn tất cả phiếu giao' : ''}
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
                  </th> */}

                  <th
                    scope="col"
                    style={{
                      maxWidth: 150,
                      width: 150,
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    Ngày tạo{" "}
                  </th>
                  <th
                    scope="col"
                    style={{
                      maxWidth: 150,
                      width: 150,
                      textAlign: "left",
                    }}
                  >
                    Mã phiếu giao
                  </th>
                  <th
                    scope="col"
                    style={{
                      minWidth: 220,
                      width: 300,
                      textAlign: "left",
                    }}
                  >
                    Người nhận
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Tổng tiền thu
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Phí vận chuyển
                  </th>

                  <th scope="col"  style={{
                      minWidth: 150,
                      width: 150,
                      textAlign: "center"
                    }}>
                    Trạng thái
                  </th>
                  <th scope="col">Ngày dự kiến giao</th>
                </tr>
              </thead>

              <tbody>{showCategoryItem(fulfillments.fulfillmentDTOS)}</tbody>
            </table>
          </div>
          <div className="col-lg-12 col-md-12 col-12 mt-3">
            <Page
              item={10}
              totalItems={fulfillments.totalElement}
              changePage={handleChangePage}
            />
          </div>
        </Grid>
      );
    }
  };
  return (
    <Grid className={classes.root}>
      <div
        className="product-list"
        style={{ fontSize: "14px", marginTop: -35 }}
      >
        <LoadingBar
          color="#08f"
          height="3px"
          progress={progress}
          onLoaderFinished={() => {
            setProgress(0);
          }}
        />
        <div className="row m-header">
          <div className="d-flex">
            <div className="">
              <h2>Danh sách phiếu giao </h2>
            </div>
            <div className="action-category">
              <NavLink to={"/admin/orders-create"}>
                <button type="button" className="btn btn-primary add-btn">
                  Thêm phiếu giao
                </button>
              </NavLink>
            </div>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="card bordershadow" style={{ width: "100%" }}>
            <div className="card-header bg-white">
              <div className="table-header">
                <a
                  className={
                    active === 0
                      ? "active-header-card"
                      : "non-active-header-card"
                  }
                  onClick={getAllFulfillmentonFilter}
                  style={{ cursor: "pointer" }}
                >
                  Tất cả phiếu giao
                </a>

                <a
                  className={
                    active === 1
                      ? "active-header-card"
                      : "non-active-header-card"
                  }
                  onClick={() => onClickFilter(1)}
                  style={{ left: "170px", cursor: "pointer" }}
                >
                  Chờ lấy hàng
                </a>
                <a
                  className={
                    active === 2
                      ? "active-header-card"
                      : "non-active-header-card"
                  }
                  onClick={() => onClickFilter(2)}
                  style={{ left: "280px", cursor: "pointer" }}
                >
                  Đang trong kho
                </a>
                <a
                  className={
                    active === 3
                      ? "active-header-card"
                      : "non-active-header-card"
                  }
                  onClick={() => onClickFilter(3)}
                  style={{ left: "410px", cursor: "pointer" }}
                >
                  Đang giao hàng
                </a>
                <a
                  className={
                    active === 4
                      ? "active-header-card"
                      : "non-active-header-card"
                  }
                  onClick={() => onClickFilter(4)}
                  style={{ left: "550px", cursor: "pointer" }}
                >
                  Hoàn thành
                </a>
                <a
                  className={
                    active === 6
                      ? "active-header-card"
                      : "non-active-header-card"
                  }
                  onClick={() => onClickFilter(6)}
                  style={{ left: "650px", cursor: "pointer" }}
                >
                  Đã hủy
                </a>

                {active === 5 ? (
                  <a
                    className={
                      active === 5
                        ? "active-header-card"
                        : "non-active-header-card"
                    }
                    style={{ left: "725px" }}
                  >
                    Tìm kiếm...
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
            <FilterComponent
              valueOptionCheck={valueOptionCheck}
              filterComponents={filterComponents}
              setProgress={setProG}
              setStateDefault={setStateDefault} 
              stateDefault={stateDefault}
              search={search}
              setSearch={setSearch}
              filterFulfillments={filterFulfillments}
              setValueInputSreach={setValueInputSreach}
              // valueOftion={valueOftion}
              // setValueOption={setValueOption}
              // valueOptionSelected={valueOptionSelected}
              // setValueOptionSelected={setValueOptionSelected}
            />
            <ul className={`filter-list-tag  ${filterValue ? "" : "d-none"}`}>
              {ReactHtmlParser(showFilterTagList())}
            </ul>
            <div className="card-body">
              <div className={`col-lg-12 col-12 col-md-12 ${fulfillments.totalElement === 0?'': "bg-white"}`}>
                <div
                  className={
                    categories.length === 0
                      ? " d-none-custom "
                      : " d-block-custom checked-actions"
                  }
                >
                  <div className="apap">
                    <a
                      className="btn btn-sm border"
                      style={{ background: "#f5f5f5" }}
                    >
                      <span>(đã chọn {length} phiếu giao)</span>
                    </a>
                    <a
                      className="btn btn-sm border dropdown-toggle action-oncheck"
                      style={{
                        background: "linear-gradient(180deg,#fff,#f9fafb)",
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
                        action === false ? "d-none-custom" : "d-block-custom"
                      }`}
                      style={{ marginTop: 8 }}
                    >
                      <div className="arrow"></div>
                      <ul
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: 24,
                          fontFamily: "Segoe UI",
                        }}
                      >
                        {/* <li>
                          <a>Xoá phiếu giao</a>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                {renderTable()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    fulfillments: state.order.fulfillments,
    fulfillmentSearch: state.fulfillmentSearch,
    filter: state.filter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterListFulfillmentThunk: (page, limit, data) => {
      dispatch(filterListFulfillmentThunk(page, limit, data));
    },
    setStt: (data) => {
      dispatch(setSttCheckBox(data));
    },
    clearFilter: () => {
      dispatch(clearFilter());
    },
    setSttFilter: (data) => {
      dispatch(setStatusFilter(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fulfillments);
