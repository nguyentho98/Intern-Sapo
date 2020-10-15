import React, { useState, useRef,useEffect } from "react";
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
import { Grid, Link, MenuItem, TextField, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { addCustomerThunk } from "../../../redux/actions/customer";
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
  const { addCustomer, modal, setModal,setIsShowInfoCustomer, statusCreateSuccess} = props;
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const formCustomer = useRef(null);
  const [sateCustomer, setSateCustomer] = useState({
    code: null,
    phone: null,
    name: null,
    email: null,
    address: null,
    ward: null,
    district: null,
    provinces: null,
  });
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setSateCustomer({ ...sateCustomer, [name]: value });
  // };
  useEffect(() => {
    if(statusCreateSuccess){
      setSateCustomer({...sateCustomer,ward: null,district: null,provinces: null,})
      formCustomer.current.reset();
      console.log("true");
    }
  },[statusCreateSuccess] );
  const onClose = () => {
    clearErrors();
    formCustomer.current.reset();
    setModal(false);
    setSateCustomer({...sateCustomer,ward: null,district: null,provinces: null,})
  };
  const onSubmit = (data) => {  
   
      addCustomer(data);
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
        <form name="form" ref={formCustomer} onSubmit={handleSubmit(onSubmit)}>
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
            <h4 className={classes.modalTitle}>Thêm thông tin khách hàng </h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
                <CusTextField
                  fullWidth
                  label={
                    <p className={classes.name}>
                      Họ và tên
                      <span style={{ color: "red" }}> *</span>
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
                  label="Mã khách hàng"
                  name="code"
                  variant="outlined"
                  inputRef={register()}
                  type="text"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
                <CusTextField
                  fullWidth
                  variant="outlined"
                  label={
                    <p className={classes.name}>
                      Số điện thoại<span style={{ color: "red" }}> *</span>
                    </p>
                  }
                  name="phone"
                  inputRef={register({
                    required: true,
                    pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    minLength: 10,
                    maxLength: 15,
                  })}
              
                  type="text"
                 
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
              <Grid item lg={6}>
                <CusTextField
                  fullWidth
                  variant="outlined"
                  label={<p className={classes.name}>Email</p>}
                  name="email"
                  type="text"
                  inputRef={register()} 
                />
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
                  type="text"
                  fullWidth
                 
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
                  value={sateCustomer.provinces}
                  getOptionLabel={(option) => option.name}
                  noOptionsText="Không tìm thấy kết quả"
                  onChange={(event, newValue) => {
                    if (newValue) {
                      findDistrict(newValue.code);
                      setSateCustomer({ ...sateCustomer, provinces: newValue });
                    } else {
                      setDistricts([]);
                      setSateCustomer({ ...sateCustomer, provinces: {} });
                      setSateCustomer({ ...sateCustomer, district: {} });
                      setSateCustomer({ ...sateCustomer, ward: {} });
                    }
                  }}
                  renderInput={(params) => (
                    <CusTextField
                      {...params}
                      inputRef={register({ required: true })}
                      name="province"
                      label={
                        <p className={classes.name}>
                         Tỉnh, thành phố
                          <span style={{ color: "red" }}> *</span>
                        </p>
                      }
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
                  value={sateCustomer.district}
                  getOptionLabel={(option) => option.name}
                 
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      findWard(newValue.code);
                      setSateCustomer({ ...sateCustomer, district: newValue });
                    } else {
                      setWards([]);
                      setSateCustomer({ ...sateCustomer, district: null });
                      setSateCustomer({ ...sateCustomer, ward: null });
                      console.log(sateCustomer);
                    }

                    console.log(newValue);
                  }}
                  renderInput={(params) => (
                    <CusTextField
                      {...params}
                      inputRef={register({ required: true })}
                      name="district"
                      label={
                        <p className={classes.name}>
                         Quận huyện
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
                  
                  value={sateCustomer.ward}
                 
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      setSateCustomer({ ...sateCustomer, ward: newValue });
                    } else {
                      setSateCustomer({ ...sateCustomer, ward: null });
                      console.log(sateCustomer);
                    }
                    console.log(sateCustomer);
                  }}
                  renderInput={(params) => (
                    <CusTextField
                      {...params}
                      label={
                        <p className={classes.name}>
                          Phường xã, Thị trấn
                          <span style={{ color: "red" }}> *</span>
                        </p>
                      }
                      inputRef={register({ required: true })}
                      name="ward"
                      variant="outlined"
                    />
                  )}
                />
                {errors.ward && (
                  <span style={{ color: "red" }}>
                    {errors.ward.type === "required"
                      ? "Phường xã, Thị trấn không để trống!"
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
const mapStateToProps = (state, ownProps) => {
  return {
    statusCreateSuccess: state.customer.statusCreateSuccess
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCustomer: (data) => {
      dispatch(addCustomerThunk(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
