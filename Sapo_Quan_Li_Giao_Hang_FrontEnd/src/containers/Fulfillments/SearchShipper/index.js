import React, { useEffect } from "react";
import { CircularProgress, Grid, InputAdornment } from "@material-ui/core";
import * as types from "./styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import imgShipper from "./../../../assets/image/customper-noavatar.png";
import { addItemShipper, clearShipper, fetchListShipperThunk } from "../../../redux/actions/shipper";

import { connect } from "react-redux";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function SearchShipper(props) {
  const {
    fetchListShipper,
    listShipper,
    setStateFulfillment,
    stateFulfillment,
    sateSubmitted,
    addItemShipper,
    clearShipper
  } = props;
  const CusTextField = types.CusTextField;
  const classes = types.useStyles();
  const [open, setOpen] = React.useState(false);
  const loading = open && listShipper.totalItem ===undefined;
  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(300);

      if (active) {
        fetchListShipper(0, 10);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);
  console.log(listShipper);
  React.useEffect(() => {
    if (!open) {
      clearShipper()
    }
  }, [open]);
  return (
    <Grid className={classes.cardContent}>
      <Autocomplete
        size="small"
        noOptionsText={
          <p style={{ textAlign: "center" }}>không có kết quả phù hợp</p>
        }
        onChange={(event, newValue) => {
          if (newValue) {
            addItemShipper(newValue)
            setStateFulfillment({
              ...stateFulfillment,
              shipper_id: newValue.id,
            });
          } else {
            setStateFulfillment({ ...stateFulfillment, shipper_id: null });
          }
        }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
              <img
                src={imgShipper}
                alt=""
                height="40"
                width="40"
                style={{ marginRight: 15 }}
              ></img>
        
            <div className={classes.text}>
              {option.name}
              {option.name ? <br /> : ""}
              Số đơn hàng đang giao: {option.count}
              <span style={{ fontSize: 20 }}></span>
            </div>
          </React.Fragment>
        )}
        options={listShipper.shipperDTOList}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <CusTextField
            {...params}
            fullWidth
           
            error={(sateSubmitted && stateFulfillment.shipper_id===null)?true:false}
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
            placeholder="Tìm kiếm nhân viên giao hàng..."
          />
        )}
      />
      {sateSubmitted && stateFulfillment.shipper_id===null && (
            <div
              className="help-block"
              style={{ color: "red", margin: "5px 0px" }}
            >
              Vui lòng chọn nhân viên giao hàng !
            </div>
          )}
    </Grid>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    listShipper: state.shipper.listShipper,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchListShipper: (page, limit) => {
      dispatch(fetchListShipperThunk(page, limit));
    },
    addItemShipper:(data)=>{
      dispatch(addItemShipper(data))
    },
    clearShipper:()=>{
      dispatch(clearShipper())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchShipper);
