import {
  CircularProgress,
  Grid,
  InputAdornment,
  Link,
  Typography,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader/CardHeader.js";
import {
  fetchListCustomer,
  getOneCustomerThunk,
  setStatusCreate,
} from "../../../redux/actions/customer";
import imgCustomer from "./../../../assets/image/customper-noavatar.png";
import ModalCustomer from "./../ModalCustomer";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import * as types from "./styles";
import UpdateCustomer from "../UpdateCustomer/index.js";
import ModalShippingFrom from "../ModalShippingFrom/index.js";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function SearchCustomer(props) {
  const {
    fetchListCustomer,
    listCustomer,
    setStateFulfillment,
    stateFulfillment,
    sateSubmitted,
    itemCreateCustomer,
    detailCustomer,
    getOneCustomerThunk,
    itemCreateShippingFrom,
    statusCreateSuccess,
    setStatusCreate,isShowInfoCustomer,setIsShowInfoCustomer
  } = props;
  const CusTextField = types.CusTextField;
  const classes = types.useStyles();
  // const [isShowInfoCustomer, setIsShowInfoCustomer] = React.useState(false);
  const [valueInfoCustomer, setValueInfoCustomer] = React.useState({});
  const [updateCustomer, setUpdateCustomer] = React.useState({});
  const [modal, setModal] = React.useState(false);
  const [modalShippingFrom, setModalShippingFrom] = React.useState(false);
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const loading = open &&  listCustomer.totalItem === undefined;
  const [openPopper, setOpenPopper] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenPopper((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenPopper(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenPopper(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openPopper);
  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
   
    (async () => {
      await sleep(500);
      if (active) {
        fetchListCustomer(0, 10, '');
      }
    })();
    return () => {
      active = false;
    };
  }, [loading,inputValue, fetchListCustomer]);
  useEffect(() => {
    setValueInfoCustomer(itemCreateCustomer);
    setStateFulfillment({
      ...stateFulfillment,
      customer_id: itemCreateCustomer.id,
      shippingFrom: itemCreateCustomer.addressEntity,
    });
  }, [itemCreateCustomer]);
  useEffect(() => {
    setValueInfoCustomer({
      ...valueInfoCustomer,
      addressEntity: itemCreateShippingFrom,
    });
    setStateFulfillment({
      ...stateFulfillment,
      shippingFrom: itemCreateCustomer.itemCreateShippingFrom,
    });
  }, [itemCreateShippingFrom]);
  useEffect(() => {
    if(statusCreateSuccess===true){
      setModal(false);
      setIsShowInfoCustomer(true)
    }
  }, [statusCreateSuccess])

  const onCloseCustomer = () => {
    setValueInfoCustomer({});
    setStateFulfillment({
      ...stateFulfillment,
      customer_id: null,
      shippingFrom: null,
    });
    setIsShowInfoCustomer(false);
  };
  const onClickAddress = (id) => {
    getOneCustomerThunk(id);
    handleToggle();
  };
  const onChangeShippingFrom = (e, value) => {
    handleClose(e);
    setValueInfoCustomer({ ...valueInfoCustomer, addressEntity: value });
    setStateFulfillment({
      ...stateFulfillment,
      shippingFrom: value,
    });
  };
  const onUpdateAddress = (value) => {
    console.log(value);
    setUpdateCustomer(value);
    setModalUpdate(true);
  };
  const onClickModalCreate  = () => {
    setStatusCreate()
    setModal(true)
  }

  return (
    <Card style={{ marginBottom: 0 }}>
      <ModalCustomer
        modal={modal}
        setModal={setModal}
        setIsShowInfoCustomer={setIsShowInfoCustomer}
      ></ModalCustomer>
      <ModalShippingFrom
        modal={modalShippingFrom}
        idCustomer={detailCustomer?.id}
        setModal={setModalShippingFrom}
      ></ModalShippingFrom>
      <UpdateCustomer
        modal={modalUpdate}
        setModal={setModalUpdate}
        setIsShowInfoCustomer={setIsShowInfoCustomer}
        updateCustomer={updateCustomer}
        setUpdateCustomer={setUpdateCustomer}
      ></UpdateCustomer>
      <div style={{ position: "absolute", left: "40px", top: 9 }} id="popper">
        <Popper
          open={openPopper}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ zIndex: 100, width: 600 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper style={{ transform: "inherit !important" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    <Grid className={classes.jss11}>
                      Thay đổi địa chỉ
                      <Link
                        style={{
                          float: "right",
                          cursor: "pointer",
                          color: "#007bff",
                        }}
                        onClick={() => setModalShippingFrom(true)}
                      >
                        Thêm mới địa chỉ
                      </Link>
                    </Grid>
                    <MenuList
                      autoFocusItem={openPopper}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                     
                      <MenuItem
                        onClick={(e) =>
                          onChangeShippingFrom(e, detailCustomer.addressEntity)
                        }
                      >
                        <div>
                          <p style={{ width: "100%" }}>
                            {detailCustomer.addressEntity?.phone}
                          </p>

                          <p style={{ width: "100%" }}>
                            {detailCustomer.addressEntity?.address
                              ? detailCustomer.addressEntity.address + ", "
                              : ""}
                            {detailCustomer.addressEntity?.ward
                              ? detailCustomer.addressEntity?.ward + ", "
                              : ""}
                            {detailCustomer.addressEntity?.district
                              ? detailCustomer.addressEntity?.district + ", "
                              : ""}
                            {detailCustomer.addressEntity?.province
                              ? detailCustomer.addressEntity?.province
                              : ""}
                          </p>
                          {/* <Link
                            style={{ cursor: "pointer", color: "#007bff" }}
                            onClick={() => onUpdateAddress(detailCustomer.addressEntity)}
                          >
                            Sửa
                          </Link> */}
                        </div>
                      </MenuItem>
                      {detailCustomer?.addressEntityList?.map((row, index) => (
                        <MenuItem onClick={(e) => onChangeShippingFrom(e, row)}>
                          <div>
                            <p style={{ width: "100%" }}>{row.phone}</p>

                            <p style={{ width: "100%" }}>
                              {row.address ? row.address + ", " : ""}
                              {row.ward ? row?.ward + ", " : ""}
                              {row.district ? row.district + ", " : ""}
                              {row.province ? row.province : ""}
                            </p>
                            {/* <Link
                              style={{ cursor: "pointer",color: "#007bff" }}
                              onClick={() => onUpdateAddress(row)}
                            >
                              Sửa
                            </Link> */}
                          </div>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <CardHeader>
        <h4 className={classes.title}>
          Thông tin khách hàng <span style={{ color: "red" }}> *</span>{" "}
          <Tooltip title="Thêm mới" placement="right-start">
            <AddCircleOutlineIcon
              onClick={() => onClickModalCreate()}
              className={classes.jss10}
            ></AddCircleOutlineIcon>
          </Tooltip>
        </h4>
      </CardHeader>
      <Grid className={classes.cardContent}>
        {!isShowInfoCustomer && (
          <div>
            <Autocomplete
              disableClearable
              size="small"
              noOptionsText={
                <p style={{ textAlign: "center" }}>không có kết quả phù hợp</p>
              }
              onChange={(event, newValue) => {
                if (newValue.code !== "") {
                  setValueInfoCustomer(newValue);
                  setIsShowInfoCustomer(true);
                  setStateFulfillment({
                    ...stateFulfillment,
                    customer_id: newValue.id,
                    shippingFrom: newValue.addressEntity,
                  });
                }
              }}
              
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  {option.code ? (
                    <img
                      src={imgCustomer}
                      alt=""
                      height="40"
                      width="40"
                      style={{ marginRight: 15 }}
                    ></img>
                  ) : (
                    <Grid
                      style={{
                        marginRight: 15,
                        height: 40,
                        width: 40,
                        textAlign: "center",
                      }}
                    >
                      <AddIcon style={{ fontSize: 31, marginTop: 6 }}></AddIcon>
                    </Grid>
                  )}
                  <div className={classes.text}>
                    {option.name}
                    {option.name ? <br /> : ""}
                    {option.phone}
                    <span style={{ fontSize: 20 }}>{option.noCustomer}</span>
                  </div>
                </React.Fragment>
              )}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              loading={loading}
              options={listCustomer?.dataListCUS}
              // filterOptions={(x) => x}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <CusTextField
                  {...params}
                  fullWidth
                  error={sateSubmitted && !stateFulfillment.customer_id}
                  // autoFocus
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "#637381" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  
                  variant="outlined"
                  placeholder="Tìm kiếm khách hàng..."
                />
              )}
            />
            {sateSubmitted && !stateFulfillment.customer_id && (
              <div
                className="help-block"
                style={{ color: "red", margin: "5px 0px" }}
              >
                Vui lòng chọn khách hàng !
              </div>
            )}
          </div>
        )}
        {isShowInfoCustomer && (
          <Grid>
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
                  {valueInfoCustomer.name}
                </Typography>
                <Typography variant="body1">
                  {valueInfoCustomer.phone}
                </Typography>
              </Grid>
              <Grid className={classes.jss3}>
                <CloseIcon onClick={() => onCloseCustomer()}></CloseIcon>
              </Grid>
            </Grid>
            <Grid className={classes.jss1}>
              <Typography variant="body1">Địa chỉ lấy hàng</Typography>
              <Typography variant="body1">{valueInfoCustomer.phone}</Typography>
              <Typography variant="body1">
                <Typography variant="body1">
                  {valueInfoCustomer.addressEntity?.address
                    ? valueInfoCustomer.addressEntity.address + ", "
                    : ""}
                  {valueInfoCustomer.addressEntity?.ward
                    ? valueInfoCustomer.addressEntity?.ward + ", "
                    : ""}
                  {valueInfoCustomer.addressEntity?.district
                    ? valueInfoCustomer.addressEntity?.district + ", "
                    : ""}
                  {valueInfoCustomer.addressEntity?.province
                    ? valueInfoCustomer.addressEntity?.province
                    : ""}
                </Typography>
              </Typography>

              <Link
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={() => onClickAddress(valueInfoCustomer.id)}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                Thay đổi địa chỉ nhận hàng
              </Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    listCustomer: state.customer.listCustomer,
    itemCreateCustomer: state.customer.itemCreateCustomer,
    detailCustomer: state.customer.detailCustomer,
    itemCreateShippingFrom: state.address.itemCreateShippingFrom,
    statusCreateSuccess: state.customer.statusCreateSuccess
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchListCustomer: (page, limit, name) => {
      dispatch(fetchListCustomer(page, limit, name));
    },
    getOneCustomerThunk: (id) => {
      dispatch(getOneCustomerThunk(id));
    },
    setStatusCreate: () => {
      dispatch(setStatusCreate());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchCustomer);
