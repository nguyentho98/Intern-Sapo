import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader/CardHeader.js";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import * as types from "./Styles";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Stepper from "../../../components/Stepper";
import imgCustomer from "./../../../assets/image/customper-noavatar.png";
import { connect } from "react-redux";
import { fetchFulfillmentById, shipperUpdateStatus, shipperUpdateStatusReturn } from "../../../redux/actions/fulfillment";
import CurrencyFormat from "react-currency-format";
import ConfirmModal from "./ConfirmModal";
import NumberFormat from "react-number-format";

var ListStepper = ["Tạo phiếu", "Chờ lấy hàng", "Đã ở trong kho", "Đang giao hàng", "Hoàn thành"];
const status = [
  { content: "Tạo phiếu", color: '#f9a825' },
  { content: 'Chờ lấy hàng', color: '#f9a825' },
  { content: 'Đã ở trong kho', color: 'orange' },
  { content: 'Đang giao hàng', color: '#1e88e5' },
  { content: 'Hoàn thành', color: '#4caf50' },
  { content: 'Giao lại', color: 'orange' },
  { content: 'Hủy đơn', color: '#f44336' },
];


function Update(props) {
  const {
    match,
    fetchFulfillmentById,
    detailFulfillment,
    shipperUpdateStatus,
    shipperUpdateStatusReturn,
  } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = types.useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [buttonColor, setButtonColor] = useState()
  const [stepError] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false);
  const [statusConfirm, setStatusConfirm] = useState(3);
  const [handOver, setHandOver] = useState(false)

  useEffect(() => {
    if (detailFulfillment.shippingStatus !== undefined) {
      setStep(detailFulfillment.shippingStatus)
      setSelectedIndex(detailFulfillment?.shippingStatus)
      setButtonColor(status[detailFulfillment?.shippingStatus].color)
      trackingFilter()
    }
  }, [detailFulfillment])

  const trackingFilter = () => {
    let handOver = detailFulfillment.fulfillmentTrackingEntities.filter(item => item.name === 'Giao lại')
    if (handOver.length > 0) {
      setHandOver(true)
    } else {
      setHandOver(false)
    }
  }

  const setStep = (index) => {
    if (index === 4) {
      ListStepper[4] = status[index].content
      setActiveStep(5)
    } else if (index === 5) {
      setActiveStep(2)
      setButtonColor(status[2].color)
    } else if (index === 6) {
      setActiveStep(4)
      ListStepper[4] = status[index].content
    } else {
      setActiveStep(index)
    }
  }

  const handleMenuItemClick = (event, index) => {
    if (index < 4) {
      confirmSuccess(index, "Cập nhật")
    } else {
      setOpenConfirm(true)
      setStatusConfirm(index)
      setOpen(false);
    }
  };

  const confirmSuccess = (index, note) => {
    setOpenConfirm(false)
    setButtonColor(status[index].color)
    setSelectedIndex(index);
    if (index === 5) {
      shipperUpdateStatusReturn(match.params.id, 1, index, note === undefined ? "" : note)
    }
    else {
      shipperUpdateStatus(match.params.id, index, note === undefined ? "" : note)
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    fetchFulfillmentById(match.params.id);
  }, [match.params.id, fetchFulfillmentById]);

  function convertMilisecondToDate(time) {
    let d = new Date(time);

    let day
    if (d.getDate() < 10) {
      day = '0' + d.getDate();
    } else {
      day = d.getDate();
    }

    let mon
    if ((d.getMonth() + 1) < 10) {
      mon = '0' + (d.getMonth() + 1);
    } else {
      mon = (d.getMonth() + 1);
    }
    let year = d.getFullYear()
    return `${day}/${mon}/${year}`;
  }

  return (
    <div>
      <Grid className={classes.root}>
        <ConfirmModal successConfirm={(index, note) => confirmSuccess(index, note)} status={statusConfirm} openModal={openConfirm} closeModal={() => setOpenConfirm(false)} />
        <Grid container>
          <Grid item md={4} lg={4}>
            <NavLink to={"/shipper/shipper"}>
              <ChevronLeftIcon />
            Danh sách đơn hàng
          </NavLink>
            <Grid>
              <h3 className={classes.title}>{detailFulfillment.code}</h3>
            </Grid>
          </Grid>
          <Grid item md={1} lg={2}>
            {" "}
          </Grid>
          <Grid item md={7} lg={6}>
            <Stepper listLabel={ListStepper} error={stepError} activeStep={activeStep}></Stepper>
          </Grid>
        </Grid>
        <GridContainer>
          <GridItem md={8} lg={8}>
            <Grid>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.title}>Thông tin người gửi</h4>
                    </CardHeader>
                    <Grid>
                      {detailFulfillment?.shippingFrom ?
                        (
                          < Grid className={classes.cardContent}>
                            <Grid style={{ display: "flex" }}>
                              <img
                                src={imgCustomer}
                                alt=""
                                height="40"
                                width="40"
                                style={{ marginRight: 15 }}
                              ></img>
                              <Grid className={classes.jss2}>
                                <Typography variant="body1">{detailFulfillment?.shippingFrom.name}</Typography>
                                <Typography variant="body1">{detailFulfillment?.shippingFrom.phone}</Typography>
                              </Grid>
                              <Grid className={classes.jss3}></Grid>
                            </Grid>
                            <Grid className={classes.jss1}>
                              <Typography variant="body1">Địa chỉ giao hàng</Typography>
                              <Typography variant="body1">{detailFulfillment?.shippingFrom?.phone}</Typography>
                              <Typography variant="body1">
                                {
                                  `${detailFulfillment?.shippingFrom.address}, ${detailFulfillment?.shippingFrom.ward}, ${detailFulfillment?.shippingFrom.district}, ${detailFulfillment?.shippingFrom.province}`
                                }
                              </Typography>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid className={classes.cardContent}>
                            <Grid style={{ display: "flex" }}>
                              <img
                                src={imgCustomer}
                                alt=""
                                height="40"
                                width="40"
                                style={{ marginRight: 15 }}
                              ></img>
                              <Grid className={classes.jss2}>
                                <Typography variant="body1">
                                  {detailFulfillment?.customerDTO?.name}
                                </Typography>
                                <Typography variant="body1">
                                  {detailFulfillment?.customerDTO?.phone}
                                </Typography>
                              </Grid>
                              <Grid className={classes.jss3}></Grid>
                            </Grid>
                            <Grid className={classes.jss1}>
                              <Typography variant="body1">Địa chỉ giao hàng</Typography>
                              <Typography variant="body1">{detailFulfillment?.shippingFrom?.phone}</Typography>
                              <Typography variant="body1">
                                {detailFulfillment?.customerDTO?.address + ' '}
                                {detailFulfillment?.customerDTO?.ward + ' '}
                                {detailFulfillment?.customerDTO?.district + ' '}
                                {detailFulfillment?.customerDTO?.province}
                              </Typography>
                            </Grid>
                          </Grid>
                        )
                      }
                    </Grid>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.title}>Thông tin người nhận hàng</h4>
                    </CardHeader>
                    <Grid>
                      {detailFulfillment.shippingTo === undefined ? <></> :
                        < Grid className={classes.cardContent}>
                          <Grid style={{ display: "flex" }}>
                            <img
                              src={imgCustomer}
                              alt=""
                              height="40"
                              width="40"
                              style={{ marginRight: 15 }}
                            ></img>
                            <Grid className={classes.jss2}>
                              <Typography variant="body1">{detailFulfillment?.shippingTo.name}</Typography>
                              <Typography variant="body1">{detailFulfillment?.shippingTo.phone}</Typography>
                            </Grid>
                            <Grid className={classes.jss3}></Grid>
                          </Grid>
                          <Grid className={classes.jss1}>
                            <Typography variant="body1">Địa chỉ giao hàng</Typography>
                            <Typography variant="body1">{detailFulfillment?.shippingTo?.phone}</Typography>
                            <Typography variant="body1">
                              {
                                `${detailFulfillment?.shippingTo.address}, ${detailFulfillment?.shippingTo.ward}, ${detailFulfillment?.shippingTo.district}, ${detailFulfillment?.shippingTo.province}`
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                  <h4 className={classes.title}>Thông tin sản phẩm</h4>
                </CardHeader>

                <Grid className={classes.cardContent}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Mã sẩn phẩm</TableCell>
                        <TableCell align="left">Tên sản phẩm</TableCell>
                        <TableCell align="center">Khối lượng</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Đơn giá</TableCell>
                        <TableCell align="right">Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailFulfillment?.fulfillmentDetailDTOList?.map((row) => (
                        <TableRow key={row}>
                          <TableCell component="th" scope="row">
                            {row?.productDTO?.code}
                          </TableCell>
                          <TableCell align="left">
                            {row?.productDTO?.name}
                          </TableCell>
                          <TableCell align="center">
                            <NumberFormat
                              value={row?.productDTO?.mass + " g"}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <NumberFormat
                              value={row?.quantity}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </TableCell>
                          <TableCell align="center">

                            <NumberFormat
                              value={row?.price + " đ"}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <NumberFormat
                              value={row?.price * row?.quantity + " đ"}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Grid container className={classes.jss7}>
                    <Grid item md={7}></Grid>
                    <Grid item md={5}>
                      <Grid className={classes.jss5}>
                        <Typography variant="body1">Giá trị đơn hàng</Typography>
                        <Typography variant="body1">
                          <NumberFormat
                            value={detailFulfillment.totalMoney}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" đ"}
                          />
                        </Typography>
                      </Grid>{" "}
                      <Grid className={classes.jss5}>
                        <Typography variant="body1">Phí giao</Typography>

                        <Typography variant="body1">
                          <NumberFormat
                            value={detailFulfillment.transportFee}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" đ"}
                          />
                        </Typography>
                      </Grid>
                      <Grid className={classes.jss5}>
                        <Typography variant="body1">Tiền thu hộ</Typography>
                        <Typography variant="body1">
                          <NumberFormat
                            value={detailFulfillment.codMoney}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" đ"}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </GridItem>
          <GridItem md={4} lg={4} style={{ width: '100%' }}>
            <Card item md={12}>
              <CardHeader>
                <h4 className={classes.title}>Thông tin phiếu giao</h4>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <p><label>Mã phiếu giao: </label><span className={classes.spanDetailFulfillment}>{detailFulfillment.code}</span></p>
                <p><label>Người tạo phiếu: </label><span className={classes.spanDetailFulfillment}>{detailFulfillment?.userResDTO?.fullName}</span></p>
                <p><label>Ngày tạo phiếu: </label><span className={classes.spanDetailFulfillment}>{convertMilisecondToDate(detailFulfillment.createdOn)}</span></p>
                <p><label>Giao hàng dự kiến: </label><span className={classes.spanDetailFulfillment}>{convertMilisecondToDate(detailFulfillment.deliveryDate)}</span></p>
                <p style={{ overflow: 'overlay', minHeight: 100 }}><label>Ghi chú: </label>
                  <span className={classes.spanDetailFulfillment} style={{ maxWidth: '60%', textAlign: 'justify' }} >{detailFulfillment?.description ? detailFulfillment?.description : '(Không có)'}</span>
                </p>
                <hr style={{ borderTop: '1px solid #000000', margin: '10px 0 40px 0' }} />
                <p><label><strong>Tổng thu khách hàng: </strong></label><span style={{ fontSize: 16, fontWeight: 500, float: "right" }}>
                  <CurrencyFormat
                    value={detailFulfillment.shippingPaymentObject === 0 ? (detailFulfillment.codMoney + detailFulfillment.transportFee) : detailFulfillment.transportFee}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </span></p>
              </Grid>

            </Card>
          </GridItem>

        </GridContainer>
      </Grid >
      <hr
        style={{
          borderTop: "1px solid",
          width: "97%",
          borderColor: "rgba(0, 0, 0, 0.23)",
        }}
      ></hr>
      <div className="">
        <Grid xs={12}>
          <ButtonGroup variant="contained" style={{ float: 'right', marginRight: 20, marginBottom: 20 }} ref={anchorRef} aria-label="split button">
            <Button style={{ backgroundColor: buttonColor, color: "white", minWidth: 150 }}>{status[selectedIndex].content}</Button>
            <Button
              style={{ backgroundColor: buttonColor, color: "white", }}
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper style={{ width: 200 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      {status.map((option, index) => (
                        <MenuItem
                          key={option.content}
                          selected={index === selectedIndex}
                          hidden={(index < selectedIndex) || (detailFulfillment.shippingMethod === 1 ? (selectedIndex !== 2 ? (index < 1 || index === 2):(true)) : (selectedIndex < 3)) || selectedIndex === 4 || selectedIndex === 5 || index === selectedIndex || (index === 5 && handOver === true) ? true : false}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option.content}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    detailFulfillment: state.order.detailFulfillment,
    miniActive: state.ui.miniActive,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFulfillmentById: (id) => {
      dispatch(fetchFulfillmentById(id));
    },
    shipperUpdateStatus: (id, stt, note) => {
      dispatch(shipperUpdateStatus(stt, id, note));
    },
    shipperUpdateStatusReturn: (idFulfillment, idShipper, status, note) => {
      dispatch(shipperUpdateStatusReturn(idFulfillment, idShipper, status, note));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Update);
