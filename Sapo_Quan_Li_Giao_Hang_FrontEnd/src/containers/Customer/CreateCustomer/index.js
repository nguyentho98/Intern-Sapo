import React, { useState, useEffect } from "react";
import "./style.css";
import {
  createCustomer,
  apifetchGetCustomerById,
  updateCustomer,
  checkPhoneCustomer,
} from "../../../apis/customers";
import { province, ward, district } from "../../../utils/data";
import { Grid } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import history from "../../../utils/history";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import * as types from "../../Fulfillments/Create/styles";
import ReactTooltip from "react-tooltip";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
const CreateCustomer = (props) => {
  const { miniActive, addFulfillment } = props;
  const classes = types.useStyles();
  const [stateSubmit, setStateSubmit] = useState(false);
  const [stateSubmitPhone, setStateSubmitPhone] = useState(false);
  const [stateSubmitCode, setStateSubmitCode] = useState(false);
  const [stateCheck, setStateCheck] = useState(false);
  const [stateCheckPhone, setStateCheckPhone] = useState(1);
  const [valideSuccess, setValideSuccess] = useState(false);
  const [checkCode, setCheckCode] = useState(false);
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [wardName, setWardName] = useState("");
  const [stateSelectP, setStateSelectP] = useState(false);
  const [stateSelectD, setStateSelectD] = useState(true);
  const [stateSelectW, setStateSelectW] = useState(false);
  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    code: "",
    address: "",
    ward: "",
    district: "",
    province: "",
    phone: "",
    email: "",
    active: "",
  });
  const [address, setAddress] = useState({
    address: "",
    ward: "",
    district: "",
    province: "",
  });
  function selectActive(e) {
    var active = e.target.value;
    setCustomer({ ...customer, active: active });
  }

  function selectProvince(e) {
    var code = e.target.value;
    setStateSelectP(!stateSelectP);
    if (code === "select1") {
    } else {
      let result = province.find((item) => item.code === code);
      setProvinceCode(code);
      setProvinceName(result.name);
      setCustomer({ ...customer, province: result.name });
      setStateSelectP(!stateSelectP);
    }
  }

  function selectDistrict(e) {
    var code = e.target.value;
    if (code === "select2") {
    } else {
      let result = district.find((item) => item.code === code);
      setDistrictCode(code);
      setDistrictName(result.name);
      setCustomer({ ...customer, district: result.name });
      setStateSelectD(!stateSelectD);
    }
  }

  function selectWard(e) {
    var code = e.target.value;
    if (code === "select3") {
    } else {
      let result = ward.find((item) => item.code === code);
      setWardName(result.name);
      setCustomer({ ...customer, ward: result.name });
      setStateSelectW(!stateSelectW);
    }
  }
  const fillProvince = () => {
    let result = province.map((item, index) => (
      <option value={item.code}>{item.name}</option>
    ));
    return result;
  };
  const fillDistrict = (codeP) => {
    // stateSelectP != stateSelectD =>
    // if (stateSelectW === true) {
    //   let r = district.map((item, index) => (
    //     <option value={item.code}>{item.name}</option>
    //   ));
    //   return r;
    // } else {
    let result1 = district.filter((item) => item.codeP === codeP);
    let result = result1.map((item, index) => (
      <option value={item.code}>{item.name}</option>
    ));
    return result;
    // }
  };
  const fillWard = (codeD) => {
    let result1 = ward.filter((item) => item.codeD === codeD);
    let result = result1.map((item, index) => (
      <option value={item.code}>{item.name}</option>
    ));
    return result;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };
  const handleChangeAddress = (e) => {
    let addr = e.target.value;
    setAddress({ ...address, address: addr });
    // setCustomerAddress(addr);
    setCustomer({ ...customer, address: addr });
  };
  const handleClick = async (e) => {
    if (valideSuccess === true) {
      if (customer.name !== "" && customer.id === "") {
        if (customer.code.indexOf("CUS") > -1) {
          console.log("Mã khách hàng không được chưa tiền tố của hệ thống");
        } else {
          await createCustomer(customer).then((res)=>{
            setTimeout(() => {
              history.push("/admin/customer");
            }, 500);
          }).catch((e)=>{
            console.log(e.response.data.message);
            setCheckCode(true)
          });
        }
      } else if (customer.name !== "" && customer.id !== null) {
        await updateCustomer(customer);
      } else {
        setStateSubmit(true);
      }
    }
  };
  useEffect(() => {
    var id = props.match.params.id;
    if (id > 0) {
      apifetchGetCustomerById(id).then((res) => {
        setCustomer(res.data);
        setAddress(res.data.addressEntity);
        setStateCheck(true);
      });
    } else {
      setStateSelectP(true);
    }
  }, []);
  const forcusName = () => {
    setStateSubmit(false);
  };
  const blurName = () => {
    if (customer.name === "") {
      setStateSubmit(true);
    } else {
      setValideSuccess(true);
    }
  };
  const forcusSDT = () => {
    setStateSubmitPhone(false);
  };
  const blurSDT = () => {
    var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    console.log(regex.test(customer.phone));
    if(customer.phone === ""){
      setStateSubmitPhone(true);
      setStateCheckPhone(1);
    }
    if (regex.test(customer.phone) === false && customer.phone !== '') {
      setStateSubmitPhone(true);
      setStateCheckPhone(2);
    }
    if(regex.test(customer.phone) === true){
      console.log('đúng');
    checkPhoneCustomer(customer.phone).then((res) => {
      if (res.data !== props.match.params.id*1) {
        setStateSubmitPhone(true);
        setStateCheckPhone(3);
        setValideSuccess(false);
      } 
      if(res.data === true || res.data === props.match.params.id*1) {
        setStateSubmitPhone(false);
        setValideSuccess(true);
      }
    });}
  };
  const forcusCode = () => {
    setStateSubmitCode(false);
    setCheckCode(false)
  };
  const blurCode = () => {
    let code = customer.code.toUpperCase();
    if (code.indexOf("CUS") > -1) {
      setStateSubmitCode(true);
      setCheckCode(true)
    } else {
      setValideSuccess(true);
    }
  };
  const exit = () => {
    if (props.match.params.id > 0) {
      history.push(`/admin/customerDetail/${props.match.params.id}`);
    } else {
      history.push(`/admin/customer`);
    }
  };
  return (
    <div className="cus">
      {/* <div
        className={`header-add-product ${props.ui ? "w-80" : "w-260"}`}
        style={{ transition: "width 300ms" }}
      >
        <div className="button-header" id="x">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="col-lg-12 col-sm-12 col-md-12 text-right">
              <button
                type="button"
                class="btn btn-md"
                style={{
                  margin: "10px",
                  backgroundColor: "white",
                  border:'1px solid rgba(224,224,224,1)'
                }}
                onClick={exit}
              >
                Hủy
              </button>
              <button className="btn btn-primary" onClick={() => handleClick()}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <Grid className={classes.root}>
        <Grid container className={classes.jss9}>
          <Grid item md={4} lg={4}>
            <NavLink to={"/admin/customer"}>
              <ChevronLeftIcon />
              Danh sách khách hàng
            </NavLink>
            <Grid>
              {props.match.params.id > 0 ? (<h3 className={classes.title}>Cập nhật khách hàng</h3>):
              (<h3 className={classes.title}>Thêm mới khách hàng</h3>)}
            </Grid>
          </Grid>
          <Grid item md={1} lg={2}>
            {" "}
          </Grid>
        </Grid>
      </Grid>
      <div className="row">
        <div className="col-lg-7">
          <div className="cus-info-base">
            <div class={`form-group`}>
              <label for="usr">
                <p style={{ color: "red", float: "left" }}>* </p>
                <p style={{ float: "left" }}>Tên khách hàng</p>
              </label>
              <input
                autoComplete="off"
                type="text"
                className={`form-control ${
                  stateSubmit === true ? "input-error" : ""
                }`}
                id="usr"
                name="name"
                value={customer.name}
                onChange={handleChange}
                onFocus={forcusName}
                onBlur={blurName}
                data-tip
                data-for="err-name"
              />
              {/* Hiển thị thông báo khi lỗi */}
              {stateSubmit === true ? (
                // <ReactTooltip
                //   id="err-name"
                //   place="top"
                //   className="datatooltip"
                //   effect="solid"
                // >
                  <p style={{color:'red'}}>Tên khách hàng không được trống</p>
                // </ReactTooltip>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="sdt">Số điện thoại</label>
                  <input
                    type="text"
                    className={`form-control ${
                      stateSubmitPhone === true ? "input-error" : ""
                    }`}
                    id="sdt"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    onFocus={forcusSDT}
                    onBlur={blurSDT}
                    data-tip
                    data-for="err-phone"
                  />
                  {/* Hiển thị thông báo khi lỗi */}
                  {stateSubmitPhone === true ? (
                    // <ReactTooltip
                    //   id="err-phone"
                    //   place="top"
                    //   className="datatooltip"
                    //   effect="solid"
                    // >
                      stateCheckPhone === 1
                        ? <p style={{color:'red'}}>Số điện thoại không được để trống</p>
                        : stateCheckPhone === 2 ? <p style={{color:'red'}}>Số điện thoại không hợp lệ</p>
                        : stateCheckPhone === 3 ? <p style={{color:'red'}}>Số điện thoại đã tồn tại</p>:""
                      
                    // </ReactTooltip>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="usr"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Mã khách hàng</label>
                  {stateCheck === true ? (
                    <input
                      type="text"
                      className={`form-control ${
                        stateSubmitCode === true ? "input-error" : ""
                      }`}
                      id="usr"
                      name="code"
                      value={customer.code}
                      readOnly
                    />
                  ) : (
                    <input
                      type="text"
                      className={`form-control ${
                        stateSubmitCode === true ? "input-error" : checkCode === true ?"input-error":""
                      }`}
                      id="usr"
                      name="code"
                      value={customer.code}
                      onChange={handleChange}
                      onFocus={forcusCode}
                      onBlur={blurCode}
                      data-tip
                      data-for="err-code"
                    />
                  )}
                  {stateSubmitCode === true ? (
                    // <ReactTooltip
                    //   id="err-code"
                    //   place="top"
                    //   className="datatooltip"
                    //   effect="solid"
                    // >
                    <p style={{color:'red'}}>Mã khách hàng không được chứa tiền tố của hệ thống</p>
                    // </ReactTooltip>
                  ) : (
                    ""
                  )}
                  {checkCode===true?(<p style={{color:'red'}}>Mã khách hàng đã tồn tại</p>):''}
                </div>
              </div>
            </div>
          </div>
          <div className="cus-info-address">
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Segoe UI",
                marginBottom: "30px",
              }}
            >
              Thông tin địa chỉ
            </p>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Địa chỉ</label>
                  <input
                    type="text"
                    class="form-control"
                    id="usr"
                    name="address"
                    value={address.address}
                    onChange={handleChangeAddress}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="sel1">Tỉnh thành</label>
                  <select
                    class="form-control"
                    id="selP"
                    onChange={selectProvince}
                    // onClick={clickProvince}
                  >
                    <option value="select1">
                      {address?.province
                        ? address?.province
                        : "Chọn Tỉnh thành"}
                    </option>
                    {fillProvince()}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="selD">Quận huyện</label>
                  <select
                    class="form-control"
                    id="sel1"
                    onChange={selectDistrict}
                  >
                    <option selected value="select2">
                      {address?.district
                        ? address?.district
                        : "Chọn Quận huyện"}
                    </option>
                    {fillDistrict(provinceCode)}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="selW">Phường xã</label>
                  <select class="form-control" id="sel1" onChange={selectWard}>
                    <option value="select3">
                      {address.ward ? address.ward : "Chọn Phường xã"}
                    </option>
                    {stateSelectP === stateSelectD
                      ? fillWard(districtCode)
                      : ""}
                    {/* {/ *{fillWard(districtCode)} /} */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="cus-info-additional">
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Segoe UI",
                marginBottom: "30px",
              }}
            >
              Thông tin bổ sung
            </p>
            <div className="row">
              <div className="col-lg-6">
                <form
                  className={classes.container}
                  noValidate
                  style={{ textAlign: "center" }}
                >
                  <TextField
                    id="date"
                    label="Ngày sinh"
                    type="date"
                    defaultValue=""
                    className={classes.textField}
                    style={{ width: "280px", marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="sel1">Giới tính</label>
                  <select class="form-control" id="sel1">
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Trạng thái</label>
                  {customer.active === "" ? (
                    <select
                      class="form-control"
                      id="sel1"
                      onChange={selectActive}
                      disabled
                    >
                      <option>Trạng thái</option>
                      <option value="true">Đang hoạt động</option>
                      <option value="false">Không hoạt động</option>
                    </select>
                  ) : (
                    <select
                      class="form-control"
                      id="sel1"
                      onChange={selectActive}
                    >
                      <option>Trạng thái</option>
                      <option value="true">Đang hoạt động</option>
                      <option value="false">Không hoạt động</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Website</label>
                  <input
                    type="text"
                    class="form-control"
                    id="usr"
                    name="username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          class="btn btn-primary btn-md"
          style={{ margin: "10px", float: "right" }}
          onClick={handleClick}
        >
          {/* <NavLink
            to={`/admin/customerDetail/${props.match.params.id}`}
            className="btn btn-white"
          >
            Hủy
          </NavLink> */}
          Lưu
        </button>

        <button
          type="button"
          class="btn btn-md"
          style={{ margin: "10px", backgroundColor: "white", float: "right",border:'1px solid rgba(224,224,224,1)' }}
          onClick={exit}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ui: state.ui.miniActive,
  };
};
export default connect(mapStateToProps, null)(CreateCustomer);
