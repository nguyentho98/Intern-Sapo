import React, { useState, useEffect } from "react";
import {
    getShipper
} from "../../../apis/shipper";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import * as types from "../../Fulfillments/Create/styles";
import ReactTooltip from "react-tooltip";
import TextField from "@material-ui/core/TextField";
const ShipperDetail = (props) => {
  const { miniActive, addFulfillment } = props;
  const classes = types.useStyles();
  const [shipper, setShipper] = useState({
    id: "",
    name: "",
    code: "",
    address: "",
    changeArea: "",
    phone: "",
    email: "",
    isActive: "",
  });

  useEffect(() => {
    var id = props.match.params.id;
    if (id > 0) {
        getShipper(id).then((res) => {
        console.log(res.data);
        setShipper(res.data);
      });
    } else {
    }
  }, []);
  return (
    <div className="cus">
      <div
        className={`header-add-product ${miniActive ? "w-80" : "w-260"}`}
        style={{ transition: "width 300ms" }}
      >
      </div>
      <Grid className={classes.root}>
        <Grid container className={classes.jss9}>
          <Grid item md={4} lg={4}>
            <NavLink to={`/admin/customerDetail/${props.match.params.idC}`}>
              <ChevronLeftIcon />
              Danh sách phiếu giao
            </NavLink>
            <Grid>
              <h3 className={classes.title}>Thông tin nhân viên giao hàng</h3>
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
                <p style={{ float: "left" }}>Tên nhân viên</p>
              </label>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                id="usr"
                name="name"
                value={shipper?.userEntity?.fullName ? shipper.userEntity.fullName:''}
                readOnly
                style={{backgroundColor:'white'}}
              />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Mã nhân viên</label>
                  <input
                    type="text"
                    class="form-control"
                    id="usr"
                    name="code"
                    value={shipper.code}
                    readOnly
                    style={{backgroundColor:'white'}}
                  />
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
                    value={shipper?.userEntity?.email ? shipper.userEntity.email:''}
                    readOnly
                    style={{backgroundColor:'white'}}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    id="usr"
                    name="phoneNumber"
                    value={shipper.phone}
                    readOnly
                    style={{backgroundColor:'white'}}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Địa chỉ</label>
                  <input
                    type="text"
                    class="form-control"
                    id="usr"
                    name="address"
                    value={shipper.address}
                    readOnly
                    style={{backgroundColor:'white'}}
                  />
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
              Thông tin khác
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
                    readOnly
                    className={classes.textField}
                    style={{ width: "400px", marginTop: "15px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label for="sel1">Giới tính</label>
                  <select class="form-control" id="sel1" disabled style={{backgroundColor:'white'}}>
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
                    <select class="form-control" id="sel1" disabled  style={{backgroundColor:'white'}}>
                <option>{shipper.isActive === '1' ?'Đang hoạt động':'Không hoạt động'}</option>
                <option>KHD</option>
                    </select>
                </div>
              </div>
              {/* <div className="col-lg-6">
                <div class="form-group">
                  <label for="usr">Website</label>
                  <input
                    type="text"
                    class="form-control"
                    id="usr"
                    name="username"
                    readOnly
                    style={{backgroundColor:'white'}}
                  />
                </div>
              </div> */}
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
              Ảnh
            </p>
            <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10" style={{marginBottom:'30px'}}>
              <img src="https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg" style={{height:'370px'}}/>
            </div>
            <div className="col-lg-1"></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ShipperDetail;
