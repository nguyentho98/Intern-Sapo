import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../../Customer/CustomerDetail/style.css";
import { Grid } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { getListShipper } from "../../../../apis/shipper";
import { IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Page from "../../../page/Page";
import {
  apiUpdateFulfillment,
  getRegulateFulfillment,
} from "../../../../apis/fulfillment";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import history from "../../../../utils/history";
import * as styles from "../../../Shipper/style";
import "./style.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const statuss = [
  { id: "Đang hoạt động", color: "#4caf50" },
  { id: "Không hoạt động", color: "#f44336" },
];
const paymentStatus = [
  { id: "Đã thanh toán", color: "black" },
  { id: "Chưa thanh toán", color: "black" },
];
const status = [
  { content: "Tạo phiếu", color: "#f9a825" },
  { content: "Chờ lấy hàng", color: "#f9a825" },
  { content: "Đã ở trong kho", color: "orange" },
  { content: "Đang giao hàng", color: "#1e88e5" },
  { content: "Hoàn thành", color: "#4caf50" },
  { content: "Giao lại", color: "orange" },
  { content: "Hủy đơn", color: "#f44336" },
];
const paymentMethod = [
  { id: "Thanh toán khi nhận hàng", color: "black" },
  { id: "Thanh toán thẻ", color: "black" },
];

export default function RFulfillmentDetail(props) {
  // const classes = useStyles();
  const [fulfillmentDetail, setFulfillmentDeatil] = useState({});
  const [shipper, setShipper] = useState([]);
  const [address, setAddress] = useState({});
  const [totalMoney, setTotalMoney] = useState([]);
  const [state, setState] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const [totalItem, setTotalItem] = useState(0);
  const classes = styles.useStyles();
  const [name, setname] = useState("");
  const inputSearch = useRef();
  const CusTextField = styles.CusTextField;

  useEffect(() => {
    var id = props.match.params.id;
    console.log(id);
    getRegulateFulfillment(id)
      .then((res) => {
        setFulfillmentDeatil(res.data);
      })
      .catch((er) => {
        console.log(er);
        history.push("/admin/fulfillmentItem");
      });
  }, [props.match.params.id]);

  useEffect(() => {
    setTimeout(() => {
      getListShipper(page, limit)
        .then((res) => {
          console.log(res.data);
          if (res.data != null) {
            setShipper(res.data.shipperDTOList);
            setTotalItem(res.data.totalItem);
            setState(true);
          }
        })
        .catch((er) => console.log(er));
    }, 300);
  }, [page, limit]);

  const regulate = (id) => {
    apiUpdateFulfillment(props.match.params.id, id);
    history.push("/admin/fulfillmentItem");
  };

  function formatMoney(money) {
    money = money.toLocaleString("vi", { style: "currency", currency: "VND" });
    return money;
  }

  const onSearch = () => {
    let value = inputSearch.current.value;
    setname(value);
    // searchCustomer(status,value,pageNumber,itemNumber).then((res)=>{
    //   console.log(res.data);
    //     setTimeout(() => {
    //       setState(true);
    //       setCustomer(res.data.dataListCUS);
    //       setTotalItem(res.data.totalItem)
    //     }, 200);
    //   }).catch((er) => console.log(er));
  };

  function listOrder() {
    let result = shipper.map((item, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          <NavLink to={`/admin/shipperDetail/${item.id}`}>{item.code}</NavLink>
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          {item.name}
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          {item.email}
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          {item.phone}
        </TableCell>
        <TableCell align="center" style={{ fontSize: "14px" }}>
          {item.count}
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          {item.chargeArea}
        </TableCell>
        <TableCell align="center" style={{ fontSize: "14px" }}>
              <button className="btn btn-primary" onClick={() => regulate(item.id)}>
                Điều phối
              </button>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => regulate(item.id)}
          >
            Điều phối
          </Button> */}
        </TableCell>
      </TableRow>
    ));
    return result;
  }

  const handleChangePage = (page) => {
    setPage(page - 1);
  };

  return (
    <div className="partnerDetail">
      <Grid className={classes.root}>
        <Grid container className={classes.jss9}>
          <Grid item md={4} lg={4}>
            <NavLink to={"/admin/fulfillmentItem"}>
              <ChevronLeftIcon />
              Danh sách điều phối
            </NavLink>
            <Grid>
              <h3 className={classes.title}>Điếu phối nhân viên</h3>
            </Grid>
          </Grid>
          <Grid item md={1} lg={2}>
            {" "}
          </Grid>
        </Grid>
      </Grid>
      <div className="thongtin">
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
            style={{ tableLayout: "fixed" }}
          >
            <TableHead>
              <TableRow style={{ height: "60px" }}>
                <TableCell align="left">
                  <p
                    style={{
                      marginRight: "10px",
                      marginTop: "10px",
                      float: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Thông tin phiếu giao
                  </p>
                  {/* <NavLink to={`/admin/updateCustomer/${shipper.id}`}>
                    <p style={{ color: "red", marginTop: "10px" }}>Cập nhật</p>
                  </NavLink> */}
                </TableCell>
                <TableCell align="left">
                  <p
                    style={{
                      float: "left",
                      marginTop: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Trạng thái:
                  </p>
                  <p
                    style={{
                      marginLeft: "10px",
                      marginTop: "12px",
                      float: "left",
                    }}
                  >
                    {fulfillmentDetail.shippingStatus === 2 ? (
                      <span
                        style={{
                          color: status[2].color,
                          border: "1px solid",
                          padding: "5px",
                          marginTop: "10px",
                        }}
                      >
                        {status[2].content}
                      </span>
                    ) : fulfillmentDetail.shippingStatus === 1 ? (
                      <span
                        style={{
                          color: status[1].color,
                          border: "1px solid",
                          padding: "5px",
                        }}
                      >
                        {status[1].content}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
          </Table>
          {/* <TableBody> */}
          <div className="row" style={{ width: "1587px" }}>
            <div className="col-lg-4">
              <div
                className="content"
                style={{ display: "flex", margin: "15px" }}
              >
                <p
                  style={{
                    width: "135px",
                    marginBottom: "5px",
                    fontWeight: "400",
                    color: "#000000",
                  }}
                >
                  Mã phiếu giao
                </p>
                :<p style={{ marginLeft: "10px" }}>{fulfillmentDetail.code}</p>
              </div>
              <div
                className="content"
                style={{ display: "flex", margin: "15px" }}
              >
                <p
                  style={{
                    width: "135px",
                    marginBottom: "5px",
                    color: "#000000",
                    fontWeight: "400",
                  }}
                >
                  Giá trị đơn hàng
                </p>
                :
                <p style={{ marginLeft: "10px" }}>
                  {fulfillmentDetail?.totalMoney
                    ? formatMoney(fulfillmentDetail?.totalMoney)
                    : ""}
                </p>
              </div>
              <div
                className="content"
                style={{ display: "flex", margin: "15px" }}
              >
                <p
                  style={{
                    width: "135px",
                    marginBottom: "5px",
                    color: "#000000",
                    fontWeight: "400",
                  }}
                >
                  Phí vận chuyển
                </p>
                :
                <p style={{ marginLeft: "10px" }}>
                  {fulfillmentDetail?.transportFee
                    ? formatMoney(fulfillmentDetail?.transportFee)
                    : ""}
                </p>
              </div>
            </div>
            <div className="col-lg-8">
              <div
                className="content"
                style={{ display: "flex", margin: "15px" }}
              >
                <p
                  style={{
                    width: "160px",
                    marginBottom: "5px",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#000000",
                  }}
                >
                  Địa chỉ giao hàng
                </p>
                :
                <p style={{ marginLeft: "10px" }}>
                  {fulfillmentDetail?.shippingToEntity?.address
                    ? fulfillmentDetail.shippingToEntity.address + " "
                    : ""}
                  {fulfillmentDetail?.shippingToEntity?.ward
                    ? fulfillmentDetail.shippingToEntity.ward + " "
                    : ""}
                  {fulfillmentDetail?.shippingToEntity?.district
                    ? fulfillmentDetail.shippingToEntity.district
                    : ""}
                  {fulfillmentDetail?.shippingToEntity?.province
                    ? fulfillmentDetail.shippingToEntity.province
                    : ""}
                </p>
              </div>
              <div
                className="content"
                style={{ display: "flex", margin: "15px" }}
              >
                <p
                  style={{
                    width: "160px",
                    marginBottom: "5px",
                    color: "#000000",
                    fontWeight: "400",
                  }}
                >
                  Địa chỉ nhận hàng
                </p>
                :
                <p style={{ marginLeft: "10px" }}>
                  {fulfillmentDetail?.shippingFromEntity?.address
                    ? fulfillmentDetail.shippingFromEntity.address + " "
                    : ""}
                  {fulfillmentDetail?.shippingFromEntity?.ward
                    ? fulfillmentDetail.shippingFromEntity.ward + " "
                    : ""}
                  {fulfillmentDetail?.shippingFromEntity?.district
                    ? fulfillmentDetail.shippingFromEntity.district
                    : ""}
                  {fulfillmentDetail?.shippingFromEntity?.province
                    ? fulfillmentDetail.shippingFromEntity.province
                    : ""}
                </p>
              </div>
              <div
                className="content"
                style={{ display: "flex", margin: "15px" }}
              >
                <p
                  style={{
                    width: "160px",
                    marginBottom: "5px",
                    color: "#000000",
                    fontWeight: "400",
                  }}
                >
                  Phương thức thanh toán
                </p>
                :
                <p style={{ marginLeft: "10px" }}>
                  {fulfillmentDetail.paymentMethod === 0
                    ? paymentMethod[0].id
                    : paymentMethod[1].id}
                </p>
              </div>
            </div>
          </div>
        </TableContainer>
      </div>
      <div className="chitiet" style={{ marginTop: "25px" }}>
        <TableContainer component={Paper}>
          <div className="menu">
            <ul className="ul_tab">
              <li className="li_tab">Danh sách nhân viên giao hàng</li>
            </ul>
          </div>
          <div className="classSearch">
            <form action="/action_page.php" style={{ marginLeft: "4%" }}>
              <CusTextField
                style={{ marginTop: "0px", width: "95%", marginBottom: "10px" }}
                name="searchInput"
                onChange={() => onSearch()}
                inputRef={inputSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        type="submit"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <SearchIcon onClick={() => onSearch()} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                placeholder="Tìm kiếm tên nhân viên giao hàng ..."
              />
            </form>
          </div>
          {state === false ? (
            <div
              className="spinnerss"
              style={{
                textAlign: "center",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              <div class="spinner-border text-primary"></div>
            </div>
          ) : (
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ fontSize: "14px" }}>
                    Mã nhân viên
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: "14px" }}>
                    Họ tên nhân viên
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: "14px" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: "14px" }}>
                    Số điện thoại
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "14px" }}>
                    Tổng đơn hàng đã có
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: "14px" }}>
                    Khu vực phụ trách
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontSize: "14px" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>{listOrder()}</TableBody>
            </Table>
          )}
          <div style={{ color: "black", marginTop: "15px",marginLeft:'15px' }}>
                {shipper ? (
                  <p style={{ float: "left",fontSize:'14px',fontWeight:'400' }}>
                    Hiển thị kết quả 1 - {totalItem} trên tổng {totalItem}
                  </p>
                ) : (
                  <p style={{ float: "left",fontSize:'16px',fontWeight:'400' }}>
                    Hiển thị kết quả 0 - {totalItem} trên tổng {totalItem}
                  </p>
                )}
              </div>
          <Page
            item={limit}
            totalItems={totalItem}
            changePage={handleChangePage}
          />
        </TableContainer>
      </div>
    </div>
  );
}
