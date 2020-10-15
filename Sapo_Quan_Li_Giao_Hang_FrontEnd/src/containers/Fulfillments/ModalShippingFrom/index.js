import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Button from "../../../components/CustomButtons/Button";
import { useForm } from "react-hook-form";
import styles from "./styles";
import { Grid, Link, TextField, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { addShippingFromThunk } from "../../../redux/actions/address";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { province, ward, district } from "./../../../utils/data";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const CusTextField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "13.5px 14px",
    },
    "& .MuiInputLabel-formControl": {
      top: -4,
      left: -4,
    },
    "& .PrivateNotchedOutline-root-142": {
      top: -5,
    },
    "& .MuiFormLabel-root": {
      fontSize: 16,
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -3px) scale(0.85) !important",
    },
    "& .MuiInputBase-root": {
      fontSize: 16,
      fontWeight: "inherit",
    },
    "& .makeStyles-test-124 .MuiInputBase-input": {
      textAlign: "right",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: 0,
    },
  },
}))(TextField);
const CusAutocomplete = withStyles((theme) => ({
  root: {
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input": {
      padding: "4px 4px",
    },
  },
}))(Autocomplete);
function Modal(props) {
  const classes = useStyles();
  const { addShippingFrom, modal, setModal ,idCustomer} = props;
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const formShippingFrom = useRef(null);
  const [stateShippingFrom, setSateShippingFrom] = useState({
    address: null,
    phone: null,
    name: null,
    province: null,
    district: null,
    ward: null,
  });
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSateShippingFrom({ ...stateShippingFrom, [name]: value });
  };
  const onClose = () => {
    clearErrors();
    formShippingFrom.current.reset();
    setModal(false);
  };
  const onSubmit = (data) => {
    setModal(false);
    console.log(data);
    addShippingFrom(data);
    formShippingFrom.current.reset();
  };
  const findDistrict = (code) => {
    let result = district.filter((item) => item.codeP === code);
    setDistricts(result);
  };
  const findWard = (code) => {
    let result = ward.filter((item) => item.codeD === code);
    setWards(result);
  };

  return (
    <div>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={modal}
        transition={Transition}
        disableBackdropClick
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <form
          name="form"
          ref={formShippingFrom}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
              onClick={() => onClose()}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>
              Thêm thông tin địa chỉ nhận hàng{" "}
            </h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
              <CusTextField
                  fullWidth
                  hidden
                  inputRef={register()}
                  name="customer_id"
                  type="text"
                  value={idCustomer}
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                />
                <CusTextField
                  fullWidth
                  label={
                    <p className={classes.name}>
                      Họ và tên
                      <span style={{ color: "red" }}>*</span>
                    </p>
                  }
                  inputRef={register({
                    required: true,
                    minLength: 5,
                    maxLength: 255,
                  })}
                  name="name"
                  type="text"
                  variant="outlined"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>
                    {errors.name.type === "required"
                      ? "Họ và Tên không để trống!"
                      : errors.name.type === "minLength"
                      ? "Họ và Tên quá ngắn!"
                      : "Họ và Tên quá dài!"}
                  </span>
                )}
              </Grid>
              <Grid item lg={6}>
                <CusTextField
                  fullWidth
                  variant="outlined"
                  label={
                    <p className={classes.name}>
                      Số điện thoại<span style={{ color: "red" }}>*</span>
                    </p>
                  }
                  name="phone"
                  inputRef={register({
                    required: true,
                    pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                    minLength: 10,
                    maxLength: 15,
                  })}
                  value={stateShippingFrom.phone}
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
                {errors.phone && (
                  <span style={{ color: "red" }}>
                    {errors.phone.type === "required"
                      ? "Số điện thoại không để trống!"
                      : errors.phone.type === "pattern"
                      ? "Số điện thoại không đúng định dạng!"
                      : errors.phone.type === "minLength"
                      ? "Số điện thoại quá ngắn!"
                      : "Số điện thoại quá dài!"}
                  </span>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
                <CusTextField
                  label={
                    <p className={classes.name}>
                     Địa chỉ
                      <span style={{ color: "red" }}> *</span>
                    </p>
                  }
                  variant="outlined"
                  name="address"
                  inputRef={register({
                    required: true,
                    minLength: 5,
                    maxLength: 255,
                  })}
                  value={stateShippingFrom.address}
                  type="text"
                  fullWidth
                  onChange={(e) => handleChange(e)}
                />
                {errors.address && (
                  <span style={{ color: "red" }}>
                    {errors.address.type === "required"
                      ? "Địa chỉ không để trống!"
                      : errors.address.type === "minLength"
                      ? "Địa chỉ quá ngắn!"
                      : "Địa chỉ quá dài!"}
                  </span>
                )}
              </Grid>
              <Grid item lg={6}>
                <CusAutocomplete
                  options={province}
                  getOptionLabel={(option) => option.name}
                  noOptionsText="Không tìm thấy kết quả"
                  onChange={(event, newValue) => {
                    if (newValue) {
                      findDistrict(newValue.code);
                      setSateShippingFrom({
                        ...stateShippingFrom,
                        provinces: newValue,
                      });
                    } else {
                      setDistricts([]);
                      setSateShippingFrom({ ...stateShippingFrom, provinces: {} });
                      setSateShippingFrom({ ...stateShippingFrom, district: {} });
                    }
                  }}
                  renderInput={(params) => (
                    <CusTextField
                      {...params}
                      label={
                        <p className={classes.name}>
                         Tỉnh, thành phố
                          <span style={{ color: "red" }}> *</span>
                        </p>
                      }
                      name="province"
                      inputRef={register({
                        required: true,
                      })}
                      variant="outlined"
                    />
                  )}
                />
                {errors.province && (
                  <span style={{ color: "red" }}>
                    {errors.province.type === "required"
                      ? "Tỉnh, Thành phố không để trống!"
                      : ""}
                  </span>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
                <CusAutocomplete
                  options={districts}
                  value={stateShippingFrom.district}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                  
                    if (newValue !== null) {
                      findWard(newValue.code);
                      setSateShippingFrom({
                        ...stateShippingFrom,
                        district: newValue,
                      });
                    } else {
                      
                      setWards([]);
                      setSateShippingFrom({ ...stateShippingFrom, district: null });
                      setSateShippingFrom({ ...stateShippingFrom, ward: null });
                      console.log(stateShippingFrom);
                    }
                  
                  }}
                  renderInput={(params) => (
                    <CusTextField
                      {...params}
                      inputRef={register({
                        required: true,
                      })}
                      name="district"
                      label={
                        <p className={classes.name}>
                         Quận, Huyện
                          <span style={{ color: "red" }}> *</span>
                        </p>
                      }
                      variant="outlined"
                    />
                  )}
                />
                {errors.district && (
                  <span style={{ color: "red" }}>
                    {errors.district.type === "required"
                      ? "Quận huyện không để trống!"
                      : ""}
                  </span>
                )}
              </Grid>
              <Grid item lg={6}>
                <CusAutocomplete
                  options={wards}
                  value={stateShippingFrom.ward}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                   
                    if (newValue !== null) {
                      setSateShippingFrom({ ...stateShippingFrom, ward: newValue });
                    } else {
                    
                      setSateShippingFrom({ ...stateShippingFrom, ward: null });
                      console.log(stateShippingFrom);
                    }
                    console.log(stateShippingFrom);
                  }}
                  renderInput={(params) => (
                    <CusTextField
                      {...params}
                      inputRef={register({
                        required: true,
                      })}
                      name="ward"
                      label={
                        <p className={classes.name}>
                        Phường xã, Thị trấn
                          <span style={{ color: "red" }}> *</span>
                        </p>
                      }
                      variant="outlined"
                    />
                  )}
                />
                 {errors.ward && (
                  <span style={{ color: "red" }}>
                    {errors.ward.type === "required"
                      ? "Phường xã, Thị Trấn không để trống!"
                      : ""}
                  </span>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Link className={classes.cancel} onClick={() => onClose()}>
              Thoát
            </Link>
            <Button className={classes.create_customer} type="submit">
              {" "}
              Thêm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addShippingFrom: (data) => {
      dispatch(addShippingFromThunk(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
