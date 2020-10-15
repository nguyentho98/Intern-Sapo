import {
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import NumberFormatCustom from "../../../utils/numberFormat";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader/CardHeader.js";
import { clearProductItem, getAllProductRequest } from "../../../redux/actions/product";
import noImage from "./../../../assets/image/no-image.png";
import noProduct from "./../../../assets/image/no-product.svg";
import ModalProduct from "./../ModalProduct";
import * as types from "./styles";
import NumberFormat from "react-number-format";
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function SearchProduct(props) {
  const {
    getAllProduct,
    products,
    stateFulfillment,
    setStateFulfillment,
    cartProduct,
    setCartProduct,
    sateSubmitted,
    productItem,
    clearProductItem
  } = props;
  const CusTextField = types.CusTextField;
  const CusTextFieldCenter = types.CusTextFieldCenter;
  const CusTextFieldRight = types.CusTextFieldRight;
  const classes = types.useStyles();
  const [open, setOpen] = React.useState(false);
  const loading = open && products.length === 0;
  const [modal, setModal] = React.useState(false);
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(500);

      if (active) {
        getAllProduct(1, 10, {});
      }
    })();
    return () => {
      active = false;
      clearProductItem()
    };
  }, [loading]);
  useEffect(() => {
    if(productItem.id !==undefined ){
      addCartProduct(productItem)
    }    
    
  }, [productItem])

  const NoProduct = () => {
    if (cartProduct.length === 0) {
      return (
        <Grid className={classes.jss6}>
          <img src={noProduct} alt="" className={classes.jss4}></img>
          <Typography variant="body1" style={{color:"#afafaf",marginTop:30}}>
            Phiếu giao của bạn chưa có sản phẩm nào
          </Typography>
        </Grid>
      );
    } else {
      return <></>;
    }
  };
  const findProductInCart = (cart, product) => {
    var index = -1;
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product.id === product.id) {
          index = i;
          break;
        }
      }
    }
    return index;
  };
  const addCartProduct = (product) => {
    let newArr = [...cartProduct];
    let index = findProductInCart(newArr, product);
    if (index !== -1) {
      newArr[index].quantity =parseInt(newArr[index].quantity,10) + 1;
    } else {
      newArr.push({ product: product, quantity: 1,price:product.productPrice });
    }
    setCartProduct(newArr);
    setTotalMoneyandFulfillmentDetailReqs(newArr);
  };
  const handleChangeQuantity = (e) => {
    const { value, name } = e.target;
    if (value > 0) {
      let newArr = [...cartProduct];
      let targetIndex = newArr.findIndex((datum) => {
        return datum.product.id === name;
      });
      if (targetIndex !== -1) {
        newArr[targetIndex].quantity = value;
        setCartProduct(newArr);
        setTotalMoneyandFulfillmentDetailReqs(newArr);
      }
    }
  };
  const handleChangePrice = (e) => {
    const { value, name } = e.target;
    if (value > 0) {
      let newArr = [...cartProduct];
      let targetIndex = newArr.findIndex((datum) => {
        return datum.product.id === name;
      });
      if (targetIndex !== -1) {
        newArr[targetIndex].price = value;
        setCartProduct(newArr);
        setTotalMoneyandFulfillmentDetailReqs(newArr);
      }
    }
  };
  const deleteProductItem = (id) => {
    const newArr = cartProduct.filter((item) => item.product.id !== id);
    setCartProduct(newArr);
    setTotalMoneyandFulfillmentDetailReqs(newArr);
  };
  const totalMoneyProductItem = (quantity, price) => {
    return quantity * price;
  };
  const setTotalMoneyandFulfillmentDetailReqs = (newArr) => {
    const arrProduct = [];
    var totalMoney = 0;
    for (let i = 0; i < newArr.length; i++) {
      let objectProduct = {};
      objectProduct.quantity = newArr[i].quantity;
      objectProduct.price = newArr[i].price;
      objectProduct.product_id = newArr[i].product.id;
      arrProduct.push(objectProduct);

      totalMoney += newArr[i].price * newArr[i].quantity;
     
    }
    setStateFulfillment({
      ...stateFulfillment,
      fulfillmentDetailReqs: arrProduct,
      totalMoney: totalMoney,
      codMoney:totalMoney,
    });
  };
  const showTotalAmount = (cart) => {
    var total = 0;
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
      }
    }
    return total;
  };

  const handleChangeCodMoney = (e) => {
    let { value } = e.target;
    value = value.replace(/,/g, '');
    console.log(value);
    if (value >= 0 && value <= stateFulfillment.totalMoney) {
      setStateFulfillment({
        ...stateFulfillment,
        codMoney: value,
      });
    }
  };
  const handleChangeTransportFee=(e)=>{
    let { value } = e.target;

    value = value.replace(/,/g, '');
    
    if(value===''){
      console.log(1);
      setStateFulfillment({
        ...stateFulfillment,
        transportFee: 0,
      });
    }else 
    if (value >= 0) {
      console.log(2);
      setStateFulfillment({
        ...stateFulfillment,
        transportFee: value,
      });
    }else{
      console.log(3);
      setStateFulfillment({
        ...stateFulfillment,
        transportFee: 0,
      });
    }
  }
 const showTotal  = () => {
   var total=0;
   if(stateFulfillment.shippingPaymentObject==="0"){
      total=parseInt(stateFulfillment.codMoney,10) + parseInt(stateFulfillment.transportFee,10);
      return total
   }else{
      total=stateFulfillment.codMoney
    return total
   }
 }
  return (
    <Card>
      
      <ModalProduct modal={modal} setModal={setModal}></ModalProduct>
      <CardHeader>
        <h4 className={classes.title}>
          Thông tin sản phẩm <span style={{ color: "red" }}> *</span>{" "}
          <Tooltip title="Thêm mới" placement="right-start">
            <AddCircleOutlineIcon
              onClick={() => setModal(true)}
              className={classes.jss10}
            ></AddCircleOutlineIcon>
          </Tooltip>
        </h4>
      </CardHeader>

      <Grid className={classes.cardContent}>
        <Autocomplete
          disableClearable
          size="small"
          noOptionsText={
            <p style={{ textAlign: "center" }}>không có kết quả phù hợp</p>
          }
          renderOption={(option) => (
            <React.Fragment>
              <img
                src={noImage}
                alt=""
                style={{ width: 60, height: 60, marginRight: 15 }}
              ></img>
              <Grid className={classes.jss5} style={{ width: "100%" }}>
                <Grid>
                  {option.name}
                  <br />
                  {option.code}
                  <span style={{ fontSize: 20 }}>{option.noProduct}</span>
                </Grid>
                <Grid style={{ textAlign: "right" }}>
                  {option.productPrice}
                  <br />
                  {option.quantity ? "số lượng: " + option.quantity : ""}
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          value={{}}
          clearOnBlur
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          options={products}
          onChange={(event, newValue) => {
            if (newValue.name !== "") {
              addCartProduct(newValue);
            }
          }}
          getOptionLabel={() => ""}
          renderInput={(params) => (
            <CusTextField
              {...params}
              fullWidth
              error={sateSubmitted && stateFulfillment.fulfillmentDetailReqs.length === 0}
              InputProps={{
                ...params.InputProps,

                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      style={{ color: "#637381", cursor: "pointer" }}
                    />
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
              placeholder="Tìm kiếm sản phẩm..."
            />
          )}
        />
        {sateSubmitted && stateFulfillment.fulfillmentDetailReqs.length === 0 && (
          <div
            className="help-block"
            style={{ color: "red", margin: "5px 0px" }}
          >
            Vui lòng chọn sản phẩm !
          </div>
        )}
      </Grid>
      <Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  align="left">Mã sản phẩm</TableCell>
              <TableCell align="left">Tên sản phẩm</TableCell>
              <TableCell align="center">Khối lượng</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Đơn giá</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
              <TableCell align="right" ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProduct?.map((row) => (
              <TableRow key={row.product.id}>
                <TableCell component="th" scope="row">
                  {row.product.code}
                </TableCell>
                <TableCell align="left">{row.product.name}</TableCell>
                <TableCell align="center">
                  <NumberFormat
                    value={row.product.mass * row.quantity}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" g"}
                  />
                </TableCell>
                <TableCell align="center" style={{ width: 150 }}>
                  <CusTextFieldCenter
                    value={row.quantity}
                    autoFocus
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    onChange={handleChangeQuantity}
                    name={row.product.id}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="center" style={{ width: 150 }}>
                  <CusTextFieldCenter
                    value={row.price}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    onChange={handleChangePrice}
                    name={row.product.id}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={totalMoneyProductItem(
                      row.quantity,
                      row.price
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </TableCell>
                <TableCell align="right">
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteProductItem(row.product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <NoProduct />
        <Grid container className={classes.jss7} style={{marginTop:30}}>
          <Grid item md={7}></Grid>
          <Grid item md={5}>
            <Grid className={classes.jss5}>
              <Typography variant="body1">Giá trị đơn hàng</Typography>
              <Typography variant="body1">
                <NumberFormat
                  value={showTotalAmount(cartProduct)}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                />
              </Typography>
            </Grid>{" "}
            <Grid className={classes.jss5} >
              <Typography variant="body1">Phí giao</Typography>
            
              <Grid style={{width:130}}>
                <CusTextFieldRight
                  
                 InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                  onChange={(e) => handleChangeTransportFee(e)}
                  value={stateFulfillment.transportFee +" đ"}
                  variant="standard"
                  name="transportFee"
                />
              </Grid>
            </Grid>
            <Grid className={classes.jss5}>
              <Typography variant="body1">Tiền thu hộ</Typography>
              <Grid style={{width:130}}>
                <CusTextFieldRight
                   InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  onBlur={(e) => handleChangeCodMoney(e)}
                  value={stateFulfillment.codMoney + " đ"}
                  variant="standard"
                  name="codMoney"
                />
              </Grid>
            </Grid>
            <Grid className={classes.jss5} style={{paddingBottom:20}}>
              <Typography variant="body1">Tổng COD thu</Typography>
              <Typography variant="body1">
                <NumberFormat
                  value={showTotal()}
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
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.productReducer.searchProduct,
    productItem: state.productReducer.productItem,
    total: state.productReducer.products.totalProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: (page, limit, data) => {
      dispatch(getAllProductRequest(page, limit, data));
    },
    clearProductItem:()=>{
      dispatch(clearProductItem())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
