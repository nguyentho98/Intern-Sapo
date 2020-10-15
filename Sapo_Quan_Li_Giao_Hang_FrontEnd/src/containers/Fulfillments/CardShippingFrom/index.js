import { CircularProgress, Grid, InputAdornment, Link, Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader/CardHeader.js";
import { fetchListShippingFrom } from "../../../redux/actions/address";
import imgShippingFrom from "./../../../assets/image/customper-noavatar.png";
import ModalShippingFrom from "./../ModalShippingFrom";
import * as types from "./styles";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function SearchShippingFrom(props) {
  const {
    fetchListShippingFrom,
    listShippingFrom,
    setStateFulfillment,
    stateFulfillment,
    sateSubmitted
  } = props;
  const CusTextField = types.CusTextField;
  const classes = types.useStyles();
  const [isShowInfoShippingFrom, setIsShowInfoShippingFrom] = React.useState(false);
  const [valueInfoShippingFrom, setValueInfoShippingFrom] = React.useState({});
  const [modal, setModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const loading = open && listShippingFrom.totalElement === undefined;
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(500);
      if (active) {
        fetchListShippingFrom(1);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);
  const onClose  = () => {
    setValueInfoShippingFrom({})
    setIsShowInfoShippingFrom(false)
    setStateFulfillment({ ...stateFulfillment, addressShippingFrom: null });
  }
  
  return (
    <Card>
      <ModalShippingFrom
        modal={modal}
        setModal={setModal}
      ></ModalShippingFrom>
      <CardHeader>
        <h4 className={classes.title}>
          Địa chỉ lấy hàng{" "}
          <Tooltip title="Thêm mới" placement="right-start">
            <AddLocationIcon
              className={classes.jss10}
              onClick={() => setModal(true)}
            ></AddLocationIcon>
          </Tooltip>
        </h4>
      </CardHeader>
      <Grid className={classes.cardContent}>
        {!isShowInfoShippingFrom && (
          <div>
          <Autocomplete
            disableClearable
            size="small"
            noOptionsText={
              <p style={{ textAlign: "center" }}>không có kết quả phù hợp</p>
            }
            onChange={(event, newValue) => {
              if (newValue.name !== "") {
                setValueInfoShippingFrom(newValue);
                setIsShowInfoShippingFrom(true);
                console.log(newValue);
                setStateFulfillment({ ...stateFulfillment, addressShippingFrom: newValue.id });
              }  else {
                setStateFulfillment({ ...stateFulfillment, addressShippingFrom: null });
              }
            }}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                {option.name ? (
                  <img
                    src={imgShippingFrom}
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
                  <span style={{ fontSize: 20 }}>{option.noShippingFrom}</span>
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
            options={listShippingFrom.addressDTOList}
            filterSelectedOptions
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <CusTextField
                {...params}
                fullWidth
                
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
                placeholder="Tìm kiếm đối tác..."
              />
            )}
          />
           {sateSubmitted && !stateFulfillment.addressShippingFrom && (
                  <div
                    className="help-block"
                    style={{ color: "#a94442", margin: "5px 0px" }}
                  >
                    Vui lòng chọn địa chỉ lấy hàng !
                  </div>
                )}
          </div>
        )}
        {isShowInfoShippingFrom && (
          <Grid>
            <Grid style={{ display: "flex" }}>
              <img
                src={imgShippingFrom}
                alt=""
                height="40"
                width="40"
                style={{ marginRight: 15 }}
              ></img>
              <Grid className={classes.jss2}>
                <Typography variant="body1">
                  {valueInfoShippingFrom.name}
                </Typography>
                <Typography variant="body1">{valueInfoShippingFrom.phone}</Typography>
              </Grid>
              <Grid className={classes.jss3}>
                <CloseIcon
                  onClick={() => onClose()}
                ></CloseIcon>
              </Grid>
            </Grid>
            <Grid className={classes.jss1}>
              <Typography variant="body1">
                Xã Đình Tổ, Huyện Thuận Thành, Tỉnh Bắc Ninh
              </Typography>
              <Link>Thay đổi địa chỉ giao hàng</Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    itemCreateShippingFrom: state.address.itemCreateShippingFrom,
    listShippingFrom: state.address.listShippingFrom,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchListShippingFrom: (page, limit, name) => {
      dispatch(fetchListShippingFrom(page, limit, name));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchShippingFrom);
