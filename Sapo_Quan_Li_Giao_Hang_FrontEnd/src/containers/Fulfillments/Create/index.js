import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader/CardHeader.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { addFulfillmentThunk } from "../../../redux/actions/fulfillment";
import SearchShippingTo from "../CardShippingTo";
import CardCustomer from "../CardCustomer";
import SearchProduct from "../CardProduct";
import SearchShipper from "../SearchShipper";
import Stepper from "./../../../components/Stepper";
import * as types from "./styles";
import { clearProductItem } from "../../../redux/actions/product.js";
const ListStepper = [
  "Tạo phiếu",
  "Chờ lấy hàng",
  "Đã ở trong kho",
  "Đang giao hàng",
  "Hoàn thành",
];
function Create(props) {
  const { miniActive, addFulfillment, clearProductItem } = props;
  const CusTextField = types.CusTextField;
  const CusDatePicker = types.CusDatePicker;
  const [activeStep] = useState(0);
  const classes = types.useStyles();
  const [cartProduct, setCartProduct] = React.useState([]);
  const [sateSubmitted, setSateSubmitted] = useState(false);
  const [isShowInfoCustomer, setIsShowInfoCustomer] = React.useState(false);
  const [btnFoot, setBtnFoot] = useState(false);
  const [stateFulfillment, setStateFulfillment] = useState({
    code: null,
    totalMoney: 0,
    codMoney: 0,
    description: "",
    deliveryDate: null,
    shippingStatus: 1,
    paymentStatus: 0,
    shippingMethod: "0",
    shippingPaymentObject: "0",
    transportFee: 0,
    shippingPaymentMethod: "0",
    shipper_id: null,
    customer_id: null,
    userName:localStorage.getItem('username')?localStorage.getItem('username'):'',
    user_id: localStorage.getItem('userId')?localStorage.getItem('userId'):'',
    shippingFrom: null,
    shippingTo: null,
    fulfillmentDetailReqs: [],
  });
  const handleChange = (event) => {
    let name = "";
    let value = "";
    if (event.target) {
      name = event.target.name;
      value = event.target.value;
    } else {
      name = "deliveryDate";
      value = event;
    }

    setStateFulfillment({ ...stateFulfillment, [name]: value });
  };
  // const handleChangeShippingMethod = (event) => {
  //   let name = "";
  //   let value = "";
  //   let status=1;
  //   if (event.target) {
  //     name = event.target.name;
  //     value = event.target.value;
  //     if(value==="1"){
  //       status=3
  //     }
  //   }
  //   setStateFulfillment({ ...stateFulfillment, [name]: value,shippingStatus:status });
  // };
  console.log(stateFulfillment);
  const [codeFail, setCodeFail] = useState(false);
  const onSaveFulfillment = () => {
    setSateSubmitted(true);
    if (
      stateFulfillment.deliveryDate &&
      stateFulfillment.customer_id &&
      stateFulfillment.shippingTo &&
      stateFulfillment.shippingFrom &&
      stateFulfillment.user_id &&
      stateFulfillment.fulfillmentDetailReqs.length!==0 &&
      stateFulfillment.shipper_id
    ) {
      if (stateFulfillment.code == null) {
        addFulfillment(stateFulfillment);
      } else if (stateFulfillment.code.indexOf("FUL") > -1) {
        setCodeFail(true);
      } else {
        setCodeFail(false);
        addFulfillment(stateFulfillment);
      }
    }
  };

  useEffect(() => {
    return () => {
      clearProductItem();
    };
  });
  useEffect(() => {
    setBtnFoot(
      window.innerHeight + document.documentElement.scrollTop >=
        document.scrollingElement.scrollHeight - 40
    );
    window.onscroll = () => {
      setBtnFoot(
        window.innerHeight + document.documentElement.scrollTop >=
          document.scrollingElement.scrollHeight - 50
      );
    };
  }, []);
  return (
    <div>
      <div
        className={`header-add-product ${miniActive ? "w-80" : "w-260"}`}
        style={{ transition: "width 300ms" }}
      >
        <div
          className={`button-header ${
            btnFoot ? "d-none-custom" : "d-block-custom"
          }`}
        >
          <Grid style={{ paddingRight: 15 }}>
            <Grid className={classes.jss11}>
              <Button
                onClick={() => onSaveFulfillment()}
                className={classes.save}
              >
                Tạo phiếu
              </Button>

              <NavLink
                to={"/admin/orders-list"}
                className={classes.cancle}
                style={{ lineHeight: 1, padding: "9px 14px" }}
              >
                Hủy
              </NavLink>
            </Grid>
          </Grid>
        </div>
      </div>
      <Grid className={classes.root}>
        <Grid container className={classes.jss9}>
          <Grid item md={4} lg={4}>
            <NavLink to={"/admin/orders-list"}>
              <ChevronLeftIcon />
              Danh sách phiếu giao hàng
            </NavLink>
            <Grid>
              <h3 className={classes.title}>Tạo phiếu giao hàng</h3>
            </Grid>
          </Grid>
          <Grid item md={1} lg={2}>
            {" "}
          </Grid>
          <Grid item md={7} lg={6}>
            <Stepper listLabel={ListStepper} activeStep={activeStep}></Stepper>
          </Grid>
        </Grid>
        <GridContainer>
          <GridItem md={8} lg={8}>
            <Grid container spacing={3}>
              <Grid md={6} item>
                <CardCustomer
                  stateFulfillment={stateFulfillment}
                  setStateFulfillment={setStateFulfillment}
                  isShowInfoCustomer={isShowInfoCustomer}
                  setIsShowInfoCustomer={setIsShowInfoCustomer}
                  sateSubmitted={sateSubmitted}
                ></CardCustomer>
              </Grid>
              <Grid md={6} item>
                <SearchShippingTo
                  stateFulfillment={stateFulfillment}
                  setStateFulfillment={setStateFulfillment}
                  sateSubmitted={sateSubmitted}
                ></SearchShippingTo>
              </Grid>
            </Grid>

            <SearchProduct
              stateFulfillment={stateFulfillment}
              setStateFulfillment={setStateFulfillment}
              sateSubmitted={sateSubmitted}
              cartProduct={cartProduct}
              setCartProduct={setCartProduct}
            ></SearchProduct>
          </GridItem>
          <GridItem md={4} lg={4}>
            <Card>
              <CardHeader>
                <h4 className={classes.title}>Thông tin phiếu giao </h4>
              </CardHeader>
              <Grid
                className={classes.cardContent}
                style={{ paddingBottom: 10 }}
              >
                <CusTextField
                  id="outlined-basic"
                  className={`${classes.jss8}`}
                  label={<p className={classes.name}>Mã phiếu giao</p>}
                  name="code"
                  onChange={handleChange}
                  value={stateFulfillment.code}
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: 0 }}
                />
                {codeFail && (
                  <div
                    className="help-block"
                    style={{ color: "red", margin: "3px 0px 5px 5px" }}
                  >
                    Mã đơn hàng không được chứa tiền tố hệ thống{" "}
                    <strong>FUL</strong>!
                  </div>
                )}
                <CusTextField
                  id="outlined-basic"
                  className={classes.jss8}
                  InputProps={{
                    readOnly: true,
                  }}
                  label={<p className={classes.name}>Người tạo đơn</p>}
                  value={localStorage.getItem('username')?localStorage.getItem('username'):''}
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: "4px" }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
                  <CusDatePicker
                    variant="inline"
                    fullWidth
                    error={sateSubmitted && !stateFulfillment.deliveryDate}
                    name="deliveryDate"
                    inputVariant="outlined"
                    minDate={new Date()}
                  
                    format="MM/dd/yyyy"
                    margin="normal"
                    autoOk
                    id="date-picker-inline"
                    label={<p className={classes.name}>Ngày dự kiến giao hàng   <span style={{ color: "red" }}> *</span></p>}
                    value={stateFulfillment.deliveryDate}
                    minDateMessage="Vui lòng nhập lại ngày giao"
                    invalidDateMessage="không đúng định dạng"
                    onChange={handleChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                {sateSubmitted && !stateFulfillment.deliveryDate && (
                  <div
                    className="help-block"
                    style={{ color: "red", margin: "5px 0px" }}
                  >
                    Vui lòng nhập ngày dự kiến giao !
                  </div>
                )}
                <CusTextField
                  multiline
                  label="Ghi chú"
                  name="description"
                  rows={4}
                  className={classes.jss8}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Card>
            <Card>
              <CardHeader>
                <h4 className={classes.title}>Nhân viên giao <span style={{ color: "red" }}> *</span>{" "} </h4>
              </CardHeader>
              <SearchShipper
                stateFulfillment={stateFulfillment}
                setStateFulfillment={setStateFulfillment}
                sateSubmitted={sateSubmitted}
              ></SearchShipper>
            </Card>
            <Card>
              <CardHeader style={{ paddingBottom: 0 }}>
                <h4 className={classes.title} style={{ paddingBottom: 0 }}>
                  Bên thanh toán phí vẫn chuyển
                </h4>
              </CardHeader>
              <Grid
                className={classes.cardContent}
                style={{ paddingBottom: 0 }}
              >
                <RadioGroup
                  aria-label="quiz"
                  name="shippingPaymentObject"
                  value={stateFulfillment.shippingPaymentObject}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Người nhận hàng"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Khách hàng"
                  />
                </RadioGroup>
              </Grid>
            </Card>
            <Card>
              <CardHeader style={{ paddingBottom: 0 }}>
                <h4 className={classes.title} style={{ paddingBottom: 0 }}>
                  Hình thức giao hàng
                </h4>
              </CardHeader>
              <Grid
                className={classes.cardContent}
                style={{ paddingBottom: 0 }}
              >
                <RadioGroup
                  aria-label="quiz"
                  name="shippingMethod"
                  value={stateFulfillment.shippingMethod}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Chuyển sản phẩm về kho rồi đi giao"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Đi giao luôn"
                  />
                </RadioGroup>
              </Grid>
            </Card>
           
          </GridItem>

          <hr
            style={{
              borderTop: "1px solid",
              width: "97%",
              borderColor: "rgba(0, 0, 0, 0.23)",
            }}
          ></hr>
          <Grid className={classes.jss11}>
            <Button
              onClick={() => onSaveFulfillment()}
              className={classes.save}
            >
              Tạo phiếu
            </Button>

            <NavLink to={"/admin/orders-list"} className={classes.cancle}>
              Hủy
            </NavLink>
          </Grid>
        </GridContainer>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    miniActive: state.ui.miniActive,
    listCustomer: state.customer.listCustomer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addFulfillment: (data) => {
      dispatch(addFulfillmentThunk(data));
    },
    clearProductItem: () => {
      dispatch(clearProductItem());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);
