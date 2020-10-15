import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./style.css";
import { Grid } from "@material-ui/core";
import Page from "../../page/Page";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  apifetchGetCustomerById,
  apifetchOrderByCustomerId,
  removeListCustomers
} from "../../../apis/customers";
import { NavLink } from "react-router-dom";
import history from "../../../utils/history";

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
const paymentMethod = [
  { id: "Trực tiếp", color: "black" },
  { id: "Thẻ", color: "black" },
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
export default function CustomerDetail(props) {
  const classes = useStyles();
  const [customerDetail, setCustomerDeatil] = useState({});
  const [order, setOrder] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [state, setState] = useState(false);
  const [address, setAddress] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const [totalItem, setTotalItem] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    var id = props.match.params.id;
    apifetchGetCustomerById(id)
      .then((res) => {
        setCustomerDeatil(res.data);
        setAddress(res.data.addressEntity);
      })
      .catch((er) => console.log(er));
  }, [props.match.params.id]);

  useEffect(() => {
    var id = props.match.params.id;
    apifetchOrderByCustomerId(id, page, limit)
      .then((res) => {
        setTimeout(() => {
          setOrder(res.data.fulfillmentCustomerDTOList);
          setTotalMoney(res.data.totalMoney);
          setTotalItem(res.data.totalItem);
          setState(true);
        }, 100);
      })
      .catch((er) => {
        console.log(er);
        setTimeout(async () => {
          await setState(true);
        }, 500);
      });
  }, [props.match.params.id, page, limit]);

  const handleChangePage = (page) => {
    setPage(page - 1);
  };

  function formatMoney(money) {
    money = money.toLocaleString("vi", { style: "currency", currency: "VND" });
    return money;
  }

  const handleClick = () =>{
    history.push(`/admin/updateCustomer/${customerDetail.id}`)
  }

  const removeCUS = async() => {
    let data=[{"activeU":!customerDetail.active,"id":customerDetail.id}]
    await removeListCustomers(data)
    history.push('/admin/customer')
  }

  function listOrder() {
    let result = order.map((item, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          <NavLink to={`/admin/ordersUpdate/${item.id}/${customerDetail.id}`}>{item.code}</NavLink>
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          {item.shippingStatus === 0 ? (
            <span
              style={{
                color: status[0].color,
                border: "1px solid",
                padding: "5px",
              }}
            >
              {status[0].content}
            </span>
          ) : item.shippingStatus === 1 ? (
            <span
              style={{
                color: status[1].color,
                border: "1px solid",
                padding: "5px",
              }}
            >
              {status[1].content}
            </span>
          ) : item.shippingStatus === 2 ? (
            <span
              style={{
                color: status[2].color,
                border: "1px solid",
                padding: "5px",
              }}
            >
              {status[2].content}
            </span>
          ) : item.shippingStatus === 3 ? (
            <span
              style={{
                color: status[3].color,
                border: "1px solid",
                padding: "5px",
              }}
            >
              {status[3].content}
            </span>
          ) : item.shippingStatus === 4 ? (
            <span
              style={{
                color: status[4].color,
                border: "1px solid",
                padding: "5px",
              }}
            >
              {status[4].content}
            </span>
          ) : (
            <span
              style={{
                color: status[5].color,
                border: "1px solid",
                padding: "5px",
              }}
            >
              {status[5].content}
            </span>
          )}
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          {item.paymentStatus ? (
            <span style={{ color: paymentStatus[0].color }}>
              {paymentStatus[0].id}
            </span>
          ) : (
            <span style={{ color: paymentStatus[1].color }}>
              {paymentStatus[1].id}
            </span>
          )}
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          {/* {item.paymentMethod === 0 ? (
            <span style={{ color: paymentMethod[0].color }}>
              {paymentMethod[0].id}
            </span>
          ) : (
            <span style={{ color: paymentMethod[1].color }}>
              {paymentMethod[1].id}
            </span>
          )} */}
        </TableCell>

        <TableCell align="left" style={{ fontSize: "14px" }}>
          {item?.shippingFrom?.address ? (item.shippingFrom.address + " " ): ""}
          {item?.shippingFrom?.ward ? (item.shippingFrom.ward + " " ): ""}
          {item?.shippingFrom?.district ? (item.shippingFrom.district + " " ) : ""}
          {item?.shippingFrom?.province ? (item.shippingFrom.province + " " ) : ""}
        </TableCell>
        <TableCell align="left" style={{ fontSize: "14px" }}>
          <NavLink to={`/admin/shipperDetail/${item.shipperId}/${customerDetail.id}`}>
            {item.shipperName ? (
              item.shipperName
            ) : (
              <p style={{ color: "red" }}>Chưa điều phối</p>
            )}
          </NavLink>
        </TableCell>
        <TableCell align="right" style={{ fontSize: "14px" }}>
          {formatMoney(item.transportFee)}
        </TableCell>
        <TableCell
          align="right"
          style={{ fontSize: "14px", textAlign: "right" }}
        >
          {formatMoney(item.totalMoney)}
        </TableCell>
      </TableRow>
    ));
    return result;
  }

  return (
    <div className="partnerDetail">
      <Grid className={classes.root} style={{float:'left',width:'50%'}}>
        <Grid container className={classes.jss9}>
          <Grid item md={4} lg={4}>
            <NavLink to={"/admin/customer"}>
              <ChevronLeftIcon />
              Danh sách khách hàng
            </NavLink>
            <Grid>
              <h3 className={classes.title} style={{fontWeight:'500'}}>Chi tiết khách hàng</h3>
            </Grid>
          </Grid>
          <Grid item md={1} lg={2}>
            {" "}
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="button-header" id="x"> */}
            <div className="" style={{marginTop:'30px',float:'right'}}>
            <button className="btn btn-primary" onClick={() => handleClick()}>
                Cập nhật
              </button>
              <button
                type="button"
                class="btn btn-md"
                style={{
                  margin: "10px",
                  backgroundColor: "red",
                  border:'1px solid rgba(224,224,224,1)',
                  color:'white'
                }}
                onClick={removeCUS}
              >
                Xóa
              </button>
            </div>
      <div className="thongtin">
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow style={{ height: "60px" }}>
                <TableCell align="left">
                  <p style={{ marginRight: "10px", float: "left",marginTop:'10px' }}>
                    Thông tin cá nhân
                  </p>
                  {/* <NavLink to={`/admin/updateCustomer/${customerDetail.id}`}>
                    <p style={{ color: "red",marginTop:'10px' }}>Cập nhật</p>
                  </NavLink> */}
                </TableCell>
                <TableCell align="left">
                  Trạng thái :{" "}
                  {customerDetail.active ? (
                    <span style={{ color: statuss[0].color }}>
                      {statuss[0].id}
                    </span>
                  ) : (
                    <span style={{ color: statuss[1].color }}>
                      {statuss[1].id}
                    </span>
                  )}
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" style={{ borderBottom: "0px" }}>
                  <div style={{marginTop:'10px'}}>
                    <p style={{ float: "left", width: "135px" }}>
                      Mã Khách Hàng
                    </p>
                    <p style={{ float: "left", marginRight: "10px" }}>:</p>
                    <p>{customerDetail.code}</p>
                  </div>
                </TableCell>
                <TableCell align="left" style={{ borderBottom: "0px" }}>
                  <div style={{marginTop:'10px'}}>
                  <p style={{ float: "left", width: "135px" }}>Email</p>
                  <p style={{ float: "left", marginRight: "10px" }}>:</p>
                  <p>{customerDetail.email}</p>
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  style={{ borderBottom: "0px" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" style={{ borderBottom: "0px" }}>
                  <p style={{ float: "left", width: "135px" }}>
                    Tên Khách Hàng
                  </p>
                  <p style={{ float: "left", marginRight: "10px" }}>:</p>
                  <p>{customerDetail.name}</p>
                </TableCell>
                <TableCell align="left" style={{ borderBottom: "0px" }}>
                  <p style={{ float: "left", width: "135px" }}>Địa chỉ</p>
                  <p style={{ float: "left", marginRight: "10px" }}>:</p>
                  <p>
                    {address?.address ? (address.address + " ") : ""} 
                    {address?.ward ? (address.ward + " "): "" }
                    {address?.district ? (address.district + " "): ""}
                    {address?.province ? (address.province + " ") : ""}
                  </p>
                </TableCell>
                <TableCell
                  align="left"
                  style={{ borderBottom: "0px" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" style={{ borderBottom: "0px" }}>
                  <p style={{ float: "left", width: "135px" }}>Số điện thoại</p>
                  <p style={{ float: "left", marginRight: "10px" }}>:</p>
                  <p>{customerDetail.phone}</p>
                </TableCell>
                <TableCell align="left" style={{ borderBottom: "0px" }}>
                  <p style={{ float: "left", width: "135px" }}>Tổng đơn hàng</p>
                  <p style={{ float: "left", marginRight: "10px" }}>:</p>
                  <p>{customerDetail.totalOrder}</p>
                </TableCell>
                <TableCell
                  align="left"
                  style={{ borderBottom: "0px" }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="chitiet" style={{ marginTop: "25px" }}>
        <TableContainer component={Paper}>
          <div className="menu">
            <ul className="ul_tab">
              <li className="li_tab">Danh sách phiếu giao hàng</li>
              {/* <li className="li_tab">Công nợ</li>
              <li className="li_tab">Liên hệ</li>
              <li className="li_tab">Ghi chú</li> */}
            </ul>
          </div>

          <Table
            className={classes.table}
            aria-label="caption table"
            style={{ marginBottom: "15px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontSize: "14px" }}>
                  Mã phiếu giao
                </TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>
                  Trạng thái giao hàng
                </TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>
                  Trạng thái thanh toán
                </TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>
                  {/* Phương thức thanh toán */}
                </TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>
                  Địa chỉ giao
                </TableCell>
                <TableCell align="left" style={{ fontSize: "14px" }}>
                  Người giao hàng
                </TableCell>
                <TableCell align="right" style={{ fontSize: "14px" }}>
                  Phí vận chuyển
                </TableCell>
                <TableCell align="right" style={{ fontSize: "14px" }}>
                  Tổng tiền
                </TableCell>
              </TableRow>
            </TableHead>
            {state === false ? (
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {listOrder()}

                <TableRow>
                  <TableCell>
                    <p
                      style={{
                        textAlign: "left",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Tổng tiền
                    </p>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <p
                      style={{
                        textAlign: "right",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatMoney(totalMoney)}
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>

          {customerDetail.totalOrder > 0 ? (
            <p
              style={{
                float: "left",
                fontSize: "14px",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Hiển thị kết quả 1 - {customerDetail.totalOrder} trên tổng{" "}
              {customerDetail.totalOrder}
            </p>
          ) : (
            <p
              style={{
                float: "left",
                fontSize: "14px",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Hiển thị kết quả 0 - {customerDetail.totalOrder} trên tổng{" "}
              {customerDetail.totalOrder}
            </p>
          )}
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
