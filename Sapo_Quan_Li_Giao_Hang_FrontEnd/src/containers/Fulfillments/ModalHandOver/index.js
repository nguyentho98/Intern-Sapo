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
import { handOverFulfillmentThunk, handOverShippingNowThunk } from "../../../redux/actions/fulfillment";

const useStyles = makeStyles(types.modalStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Modal({ modal, setModal,idFulfillment,idShipper,handOverFulfillmentThunk,handOverShippingNowThunk,status }) {
  const classes = useStyles();
  const CusTextField = types.CusTextField; 
  const { register, handleSubmit,errors, clearErrors } = useForm();
  const formProduct = useRef();


  const onClose = () => {
    clearErrors();
    setModal(false);
  };

  const onSubmit = (note) => {
    setModal(false);
    if(status===0){
      handOverFulfillmentThunk(idFulfillment,idShipper,5,note.note)
    }else{
      console.log("shippingnow");
      handOverShippingNowThunk(idFulfillment,note.note)
    }
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
            <h4 className={classes.modalTitle}>Giao lai phiếu giao hàng </h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <CusTextField
              multiline
              label="Ghi chú"
              name="note"
              rows={4}
              className={classes.jss8}
              inputRef={register({
                required: true,
                minLength: 5,
                maxLength: 1000,
              })}
              fullWidth
              variant="outlined"
            />
              {errors.note && (
                  <span style={{ color: "red" }}>
                    {errors.note.type === "required"
                      ? "Ghi chú không để trống!"
                      : errors.note.type === "minLength"
                      ? "Ghi chú quá ngắn!"
                      : "Ghi chú quá dài!"}
                  </span>
                )}
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Link className={classes.cancel} onClick={() => setModal()}>
              Thoát
            </Link>
            <Button className={classes.create_customer} type="submit">
              {" "}
              Giao lại
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handOverFulfillmentThunk: (idFulfillment,idShipper,status,note) => {
      dispatch(handOverFulfillmentThunk(idFulfillment,idShipper,status,note));
    },
    handOverShippingNowThunk: (idFulfillment,note) => {
      dispatch(handOverShippingNowThunk(idFulfillment,note));
    },
  };
};
export default connect(null, mapDispatchToProps)(Modal);
