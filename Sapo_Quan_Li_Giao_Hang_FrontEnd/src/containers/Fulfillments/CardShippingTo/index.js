import { CircularProgress, Grid, InputAdornment, Link, Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import imgCustomer from "./../../../assets/image/customper-noavatar.png";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader/CardHeader.js";
import { fetchListShippingTo } from "../../../redux/actions/address";
import ModalShippingTo from "../ModalShippingTo";
import imgShippingTo from "./../../../assets/image/customper-noavatar.png";
import * as types from "./styles";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function SearchShippingTo(props) {
  const {
    fetchListShippingTo,
    listShippingTo,
    setStateFulfillment,
    stateFulfillment,
    itemCreateShippingTo,
    sateSubmitted
  } = props;
  const CusTextField = types.CusTextField;
  const [open, setOpen] = React.useState(false);
  const loading = open && listShippingTo.totalElement === undefined;
  const classes = types.useStyles();
  const [
    isShowInfoShippingTo,
    setIsShowInfoShippingTo,
  ] = React.useState(false);
  const [
    valueInfoShippingTo,
    setValueInfoShippingTo,
  ] = React.useState({});
  const [modal, setModal] = React.useState(false);
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(500);

      if (active) {
        fetchListShippingTo();
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    setValueInfoShippingTo(itemCreateShippingTo)
    setStateFulfillment({
      ...stateFulfillment,
      shippingTo:itemCreateShippingTo,
    });
  }, [itemCreateShippingTo])

  const onCloseShippingTo  = () => {
    setValueInfoShippingTo({})
    setStateFulfillment({ ...stateFulfillment, shippingTo: null });
    setIsShowInfoShippingTo(false)
    
  }
  console.log("123");
  console.log(stateFulfillment.shippingTo);
  return (
    <Card style={{marginBottom:0}}>
      <ModalShippingTo
        modal={modal}
        setIsShowInfoShippingTo={setIsShowInfoShippingTo}
        setModal={setModal}
      ></ModalShippingTo>
      <CardHeader>
        <h4 className={classes.title}>
         Thông tin người nhận hàng <span style={{ color: "red" }}> *</span>{" "} 
          <Tooltip title="Thêm mới" placement="right-start">
            <AddCircleOutlineIcon
              onClick={() => setModal(true)}
              className={classes.jss10}
            ></AddCircleOutlineIcon>
          </Tooltip>
        </h4>
      </CardHeader>
      <Grid className={classes.cardContent}>
        {!isShowInfoShippingTo && (
          <div>
          <Autocomplete
            disableClearable
            size="small"
            noOptionsText={
              <p style={{ textAlign: "center" }}>không có kết quả phù hợp</p>
            }
            onChange={(event, newValue) => {
              if (newValue.name !== "") {
                setValueInfoShippingTo(newValue);
                setIsShowInfoShippingTo(true);
                console.log(newValue);
                setStateFulfillment({
                  ...stateFulfillment,
                  shippingTo:newValue,
                });
              }
             
            }}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                    <img
                      src={imgCustomer}
                      alt=""
                      height="40"
                      width="40"
                      style={{ marginRight: 15 }}
                    ></img>
                <div className={classes.text}>
                  {option.name}
                  {option.name ? <br /> : ""}
                  {option.phone}
                </div>
              </React.Fragment>
            )}
            loading={loading}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={listShippingTo?.addressDTOList}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <CusTextField
                {...params}
                fullWidth
                error={sateSubmitted && !stateFulfillment.shippingTo}
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
                placeholder="Tìm kiếm người nhận..."
              />
            )}
          />
           {sateSubmitted && !stateFulfillment.shippingTo && (
                  <div
                    className="help-block"
                    style={{ color: "red", margin: "5px 0px" }}
                  >
                    Vui lòng chọn người nhận hàng !
                  </div>
                )}
          </div>
        )}
        {isShowInfoShippingTo && (
          <Grid>
            <Grid style={{ display: "flex" }}>
              <img
                src={imgShippingTo}
                alt=""
                height="40"
                width="40"
                style={{ marginRight: 15 }}
              ></img>
              <Grid className={classes.jss2}>
                <Typography variant="body1">
                  {valueInfoShippingTo?.name}
                </Typography>
                <Typography variant="body1">
                  {valueInfoShippingTo?.phone}
                </Typography>
              </Grid>
              <Grid className={classes.jss3}>
                <CloseIcon
                  onClick={() => onCloseShippingTo()}
                ></CloseIcon>
              </Grid>
            </Grid>
            <Grid className={classes.jss1}>
               <Typography variant="body1">Địa chỉ giao hàng</Typography>
              <Typography variant="body1">{valueInfoShippingTo?.phone}</Typography>
              <Typography variant="body1">
                        {valueInfoShippingTo?.address?valueInfoShippingTo?.address + ", ":"" }
                        {valueInfoShippingTo?.ward?valueInfoShippingTo?.ward + ", ":"" }
                        {valueInfoShippingTo?.district?valueInfoShippingTo?.district + ", ":"" }
                        {valueInfoShippingTo?.province?valueInfoShippingTo?.province:""}
              </Typography>
              <Link style={{display:'none'}}>Sửa địa chỉ giao hàng</Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemCreateShippingTo: state.address.itemCreateShippingTo,
    listShippingTo: state.address.listShippingTo,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchListShippingTo: () => {
      dispatch(fetchListShippingTo());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchShippingTo);
