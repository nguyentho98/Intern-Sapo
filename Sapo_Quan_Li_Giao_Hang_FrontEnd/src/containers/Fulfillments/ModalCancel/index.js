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

import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { updateStatusFulfillmentThunk } from "../../../redux/actions/fulfillment";
import { Link } from "react-router-dom";

const useStyles = makeStyles(types.modalStyle);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Modal({ modal, setModal,updateStatusFulfillmentThunk,id }) {
  const classes = useStyles();
  const {  handleSubmit, clearErrors } = useForm();
  const formProduct = useRef();


  const onClose = () => {
    clearErrors();
    setModal(false);
  };

  const onSubmit = () => {
    setModal(false);
    updateStatusFulfillmentThunk(6,id)
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
            <h4 className={classes.modalTitle}>Hủy phiếu giao hàng </h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            Thao tác này sẽ hủy phiếu giao hàng bạn đã chọn. Thao tác này không thể
            khôi phục.
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Link className={classes.cancel} onClick={() => setModal()}>
              Thoát
            </Link>
            <Button className={classes.create_customer} onClick={()=>onSubmit()}>
              {" "}
              Xác nhận
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateStatusFulfillmentThunk: (status,id) => {
      dispatch(updateStatusFulfillmentThunk(status,id));
    },
    
  };
};
export default connect(null, mapDispatchToProps)(Modal);
