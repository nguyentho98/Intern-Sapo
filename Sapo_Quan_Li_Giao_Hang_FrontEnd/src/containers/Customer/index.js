/* eslint-disable jsx-a11y/anchor-is-valid */
import { Tooltip } from "@material-ui/core";
import "pretty-checkbox";
import * as styles from "../Shipper/style";
import { Checkbox } from "pretty-checkbox-react";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSttCheckBox } from "../../redux/actions/SetSttCheckBox";
import AxiosService from "../../utils/axoisService";
import Page from "../page/Page";
import CustomerItem from "./CustomerItem/CustomerItem";
import { IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  apifetchListCustomers,
  removeListCustomers,
  searchCustomer,
} from "../../apis/customers";

const CustomerList = (props) => {
  const [checked, setChecked] = useState(false);
  const [iconClass, setIconClass] = useState("");
  const [length, setLength] = useState(0);
  const [categories, setCategories] = useState([]);
  const [disable, setDisable] = useState(false);
  const [action, setAction] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemNumber, setItemNumber] = useState(5);
  const [totalItem, setTotalItem] = useState(0);
  const [status, setStatus] = useState(null);
  const [status1, setStatus1] = useState(2);
  const [state, setState] = useState(false);
  const [update, setUpdate] = useState([]);
  const [active, setActive] = useState("all");
  const classes = styles.useStyles();
  const [name, setname] = useState("");
  const inputSearch = useRef();
  const CusTextField = styles.CusTextField;

  const showCategoryItem = () => {
    let result = null;
    if (customer.length >= 1) {
      localStorage.setItem("length", customer.length);
      result = customer.map((customer, index) => {
        return (
          <CustomerItem
            customer={customer}
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
        categories.length < parseInt(localStorage.getItem("length"))
        ? true
        : false
    );
  });

  const loadData = () => {
    let result = searchCustomer(status, name, pageNumber, itemNumber)
      .then((res) => {
        setTimeout(() => {
          setState(true);
          setCustomer(res.data.dataListCUS);
          setTotalItem(res.data.totalItem);
        }, 200);
      })
      .catch((er) => console.log(er));
    return result;
  };

  useEffect(() => {
    searchCustomer(status, name, pageNumber, itemNumber)
      .then((res) => {
        setTimeout(() => {
          setState(true);
          setCustomer(res.data.dataListCUS);
          setTotalItem(res.data.totalItem);
        }, 200);
      }).catch((er) => console.log(er));
  }, [pageNumber, itemNumber, status, name]);

  const getItemChecked = (id, status, active) => {
    let activeU = !active;
    if (status) {
      categories.push(id);
      setIcon();
      setCategories(categories);
      setLength(categories.length);
      update.push({ activeU, id });
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
        props.setStt(true);
        setChecked(true);
      } else {
        setChecked(true);
        setIconClass(" fa fa-minus");
      }
    } else {
      props.setStt(false);
    }
  };

  const handleChangePage = (page) => {
    setPageNumber(page - 1);
  };

  const handleChangeStatusAll = () => {
    setStatus(null);
    // setStatus1(2);
    setState(!state);
    setPageNumber(0);
    setActive("all");
    loadData();
  };
  const handleChangeStatus1 = () => {
    setItemNumber(5);
    setStatus(1);
    // setStatus1(1);
    setState(false);
    setPageNumber(0);
    setActive("on");
    loadData();
  };
  const handleChangeStatus0 = () => {
    setItemNumber(5);
    // setStatus1(0);
    setStatus(0);
    setState(false);
    setPageNumber(0);
    setActive("of");
    loadData();
  };
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
  };
  const deleteCategory = () => {
    removeListCustomers(update);
    props.setStt(0);
    setTimeout(() => {
      apifetchListCustomers(pageNumber, itemNumber, status)
        .then((res) => {
          setState(true);
          setCustomer(res.data);
        })
        .catch((er) => console.log(er));
    }, 150);
  };

  const onSearch = () => {
    let value = inputSearch.current.value;
    setname(value);
    setPageNumber(0)
    setItemNumber(5);
    handleChangePage(1)
  };

  return (
    <div className="product-list" style={{ fontSize: "14px" }}>
      <div className="row m-header" style={{ marginBottom: "5px" }}>
        <div className="d-flex">
          <div className="">
            <h3 style={{ color: "#3C4858",fontWeight:'500' }}>Khách hàng</h3>
          </div>
          <div className="action-category">
            <NavLink to="/admin/createCustomer">
              <button
                type="button"
                className="btn btn-primary add-btn"
                style={{ marginTop: "13px" }}
              >
                Thêm khách hàng
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
              <h6>Danh sách các danh mục</h6>
            </div>
          </div>
          <div className="menu">
            <ul className="ul_tab">
              {active === "all" ? (
                <li className="li_tab active1" onClick={handleChangeStatusAll}>
                  Tất cả
                </li>
              ) : (
                <li className="li_tab" onClick={handleChangeStatusAll}>
                  Tất cả
                </li>
              )}
              {active === "on" ? (
                <li className="li_tab active1" onClick={handleChangeStatus1}>
                  Đang hoạt động
                </li>
              ) : (
                <li className="li_tab" onClick={handleChangeStatus1}>
                  Đang hoạt động
                </li>
              )}
              {active === "of" ? (
                <li className="li_tab active1" onClick={handleChangeStatus0}>
                  Không hoạt động
                </li>
              ) : (
                <li className="li_tab" onClick={handleChangeStatus0}>
                  Không hoạt động
                </li>
              )}
            </ul>
          </div>
          <div style={{ borderBottom: "1px solid rgba(224,224,224,1)" }}>
            <form action="/action_page.php" className="formSearch">
              <CusTextField
                style={{ marginTop: "0px", width: "98%", marginBottom: "10px" }}
                name="searchInput"
                onChange={() => onSearch()}
                inputRef={inputSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        type="submit"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <SearchIcon onClick={() => onSearch()} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                placeholder="Tìm kiếm tên khách hàng ..."
              />
            </form>
          </div>
          <div className="card-body">
            {state === false ? (
              <div
                className="spinners"
                style={{
                  textAlign: "center",
                  marginTop: "40px",
                  marginBottom: "40px",
                  setTimeout: "300",
                }}
              >
                <div class="spinner-border text-primary"></div>
              </div>
            ) : (
              <div className="col-lg-12 col-12 col-md-12 bg-white">
                <div
                  className={
                    categories.length === 0
                      ? " d-none-custom "
                      : " d-block-custom checked-actions"
                  }
                >
                  <div className="apap" style={{ marginTop: "0px" }}>
                    <a
                      className="btn btn-sm border"
                      style={{ background: "#f5f5f5" }}
                    >
                      <span>(đã chọn {length} danh mục)</span>
                    </a>
                    <a
                      className="btn btn-sm border dropdown-toggle"
                      style={{
                        background: "linear-gradient(180deg,#fff,#f9fafb)",
                      }}
                      onClick={setActionChecked}
                    >
                      Chọn thao tác
                    </a>
                  </div>
                  <div>
                    <div
                      className={`_action_checked bordershadowC ${
                        action === false ? "d-none-custom" : "d-block-custom"
                      }`}
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
                        <li onClick={deleteCategory}>
                          <a>Thay đổi trạng thái hoạt động</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="table-reponsive-sm">
                  <table className="table" cellPadding="1" cellSpacing="0">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: 40 }}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={setCategoryDisable}
                          >
                            <Tooltip
                              title={length === 0 ? "Chọn tất cả sản phẩm" : ""}
                              placement="right"
                            >
                              <Checkbox
                                locked={disable}
                                className="pretty-checkbox"
                                color="info-o"
                                shape="curve"
                                animation="pulse"
                                onChange={handleChange}
                                checked={checked}
                                icon={<i className={iconClass} />}
                                data-tip
                                data-for="_select_all"
                              ></Checkbox>
                            </Tooltip>
                          </div>
                        </th>
                        <th scope="col">Mã khách hàng</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Email</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Số điện thoại
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Tổng đơn hàng
                        </th>
                        <th scope="col">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>{showCategoryItem(customer)}</tbody>
                  </table>
                </div>
                <Page
                  item={itemNumber}
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
