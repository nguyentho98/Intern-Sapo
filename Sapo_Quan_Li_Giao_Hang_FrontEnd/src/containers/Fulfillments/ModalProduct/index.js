import React, { useRef } from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Button from "../../../components/CustomButtons/Button";
import * as types from "./styles";
import { Grid, InputAdornment, Link } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { addProductRequest } from "../../../redux/actions/product";

const useStyles = makeStyles(types.modalStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Modal({ modal, setModal,addProductRequest }) {
  const classes = useStyles();
  const CusTextField = types.CusTextField;
  const CusRightTextField = types.CusRightTextField;

  const { register, handleSubmit, errors, clearErrors } = useForm();
  const formProduct = useRef();

  const onClose = () => {
    clearErrors();
    setModal(false);
  };

  const onSubmit = (data) => {
    setModal(false);
    addProductRequest(data)
    formProduct.current.reset();
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
        onClose={() => onClose()}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <form
          name="formProduct"
          ref={formProduct}
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
              onClick={() => setModal(false)}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Thêm thông tin sản phẩm </h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
                <CusTextField
                  variant="outlined"
                  fullWidth
                  label={
                    <p className={classes.name}>
                      Tên sản phẩm
                      <span style={{ color: "red" }}>*</span>
                    </p>
                  }
                  inputRef={register({
                    required: true,
                    minLength: 2,
                    maxLength: 255,
                  })}
                  name="name"
                
                />
                {errors.name && (
                  <span style={{ color: "red" }}>
                    {errors.name.type === "required"
                      ? "Tên sản phẩm không để trống!"
                      : errors.name.type === "minLength"
                      ? "Tên sản phẩm quá ngắn!"
                      : "Tên sản phẩm quá dài!"}
                  </span>
                )}
              </Grid>
              <Grid item lg={6}>
                <CusTextField
                  variant="outlined"
                  label={<p className={classes.name}>Mã sản phẩm</p>}
                  name="code"
                 
                  inputRef={register}
                  fullWidth
                 
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
                <CusTextField
                  id="outlined-select-currency"
                  label={<p className={classes.name}>Thể loại</p>}
                  fullWidth
                  inputRef={register}
                 
                  name="category"
                  variant="outlined"
                ></CusTextField>
              </Grid>
              <Grid item lg={6}>
                <CusTextField
                  id="outlined-select-currency"
                  label={<p className={classes.name}>Nhãn hiệu</p>}
                  name="brand"
                  fullWidth
                  inputRef={register}
                 
                  variant="outlined"
                ></CusTextField>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.jss01}>
              <Grid item lg={6}>
                <CusRightTextField
                  id="outlined-basic"
                  label={<p className={classes.name}>Giá bán <span style={{ color: "red" }}>*</span></p>}
                  type="number"
                  name="productPrice"
                  inputRef={register({
                    required: true,
                  })}
                 
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" style={{ fontSize: 14 }}>
                        ₫
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                {errors.productPrice && (
                  <span style={{ color: "red" }}>
                    {errors.productPrice.type === "required"
                      ? "Giá bán không để trống!"
                      
                      : ""}
                  </span>
                )}
              </Grid>
              <Grid item lg={6}>
                <CusRightTextField
                  id="outlined-basic"
                  label={<p className={classes.name}>Khối lượng <span style={{ color: "red" }}>*</span></p>}
                  type="number"
                  name="mass"
                  inputRef={register({
                    required: true,
                  })}
                
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" style={{ fontSize: 14 }}>
                        g
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                 {errors.mass && (
                  <span style={{ color: "red" }}>
                    {errors.mass.type === "required"
                      ? "Khối lượng không để trống!"
                      
                      : ""}
                  </span>
                )}
              </Grid>
            </Grid>
           
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Link className={classes.cancel} onClick={() => setModal()}>
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
    addProductRequest: (data) => {
      dispatch(addProductRequest(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
