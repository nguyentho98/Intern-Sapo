import React, { useEffect, useRef, useState } from "react";
import * as types from "./styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CurrencyFormat from "react-currency-format";
import { NavLink,Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  fetchListFulfillment
} from "../../redux/actions/fulfillment";

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
  withStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
export const CusBottomNavigation = withStyles((theme) => ({
  root: {
    "& .MuiBottomNavigationAction-root.Mui-selected": {
      borderBottom: "2px solid",
    },
  },
}))(BottomNavigation);
const columns = [
  { id: "createdOn", label: "Ngày tạo phiếu", minWidth: 150, align: "left" },
  { id: "code", label: "Mã đơn hàng", minWidth: 120, align: "left" },
  { id: "to", label: "Người nhận", minWidth: 150, align: "left" },
  { id: "value", label: "Giá trị đơn hàng", minWidth: 170, align: "left" },
  { id: "transportFee", label: "Phí vận chuyển", minWidth: 170, align: "left" },
  { id: "price", label: "Tổng tiền thu", minWidth: 170, align: "left" },
  { id: "status", label: "Trạng thái", minWidth: 100, align: "left" },
  { id: "deliveryDate", label: "Ngày giao hàng", minWidth: 200, align: "left" },
  { id: "cancelationDate", label: "Ngày hủy", minWidth: 200, align: "left" },
  {
    id: "successDeliveryDate",
    label: "Giao thành công",
    minWidth: 200,
    align: "left",
  },
  { id: "note", label: "Ghi chú", minWidth: 220, align: "left" },
];

function createData(
  id,
  createdOn,
  code,
  to,
  value,
  transportFee,
  price,
  status,
  deliveryDate,
  cancelationDate,
  successDeliveryDate,
  note
) {
  return {
    id,
    createdOn,
    code,
    to,
    value,
    transportFee,
    price,
    status,
    deliveryDate,
    cancelationDate,
    successDeliveryDate,
    note,
  };
}
const status = [
  { content: "Tạo phiếu", color: "#f9a825" },
  { content: "Chờ lấy hàng", color: "#f9a825" },
  { content: "Đang ở trong kho", color: "#f9a825" },
  { content: "Đang giao hàng", color: "#1e88e5" },
  { content: "Hoàn thành", color: "#4caf50" },
  { content: "Giao lại", color: "#4caf50" },
  { content: "Đã hủy", color: "#f44336" },
];

function Fulfillments(props) {
  const { fulfillments, fetchListFulfillment } = props
  const CusTextField = types.CusTextField;
  const classes = types.useStyles();
  const [page, setPage] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowContent, setRowContent] = useState();
  const [value, setValue] = React.useState("all");
  const [noFulfillment, setNoFulfillment] = React.useState(true);
  const [cRows, setcRows] = useState([]);
  const inputSearch = useRef();
  useEffect(() => {
    callApi(0, 5)
  }, []);
  useEffect(() => {
    setRowValue(fulfillments)
  }, [fulfillments])

  function callApi(page, limit, status, name) {
    fetchListFulfillment(page, limit, status === undefined ? '':status, name === undefined ? "": name)
  }

  function convertMilisecondToDate(time) {
    let d = new Date(time);

    let day;
    if (d.getDate() < 10) {
      day = "0" + d.getDate();
    } else {
      day = d.getDate();
    }

    let mon;
    if (d.getMonth() + 1 < 10) {
      mon = "0" + (d.getMonth() + 1);
    } else {
      mon = d.getMonth() + 1;
    }
    let year = d.getFullYear();

    let h;
    if (d.getHours() < 10) {
      h = "0" + d.getHours();
    } else {
      h = d.getHours();
    }

    let m;
    if (d.getMinutes() < 10) {
      m = "0" + d.getMinutes();
    } else {
      m = d.getMinutes();
    }
    return `${day}-${mon}-${year} ${h}:${m}`;
  }
  async function setRowValue(data) {
    setcRows([]);
    if (data.fulfillmentDTOS.length === 0) {
      setNoFulfillment(false);
    } else {
      setNoFulfillment(true);
    }
    setOrderTotal(data.totalElement);
    await data.fulfillmentDTOS.forEach((data) => {
      let from = data.shippingFrom
      
      cRows.push(
        createData(
          data.id,
          convertMilisecondToDate(data.createdOn),
          data.code,
          data.shippingFrom !== null ?
          <ul style={{ padding: 0 }}>
            <li>Tên: {from.name}</li>
            <li>SDT: {from.phone}</li>
            <li>Địa chỉ: {`${from.address}, ${from.ward}, ${from.district}, ${from.province}`}</li>
          </ul> :
          <ul style={{ padding: 0 }}>
            <li>Tên: {data.customerDTO.name}</li>
            <li>SDT: {data.customerDTO.phoneNumber}</li>
            <li>Địa chỉ: {data.customerDTO.address} ,</li>
          </ul>,
          <CurrencyFormat
            value={data.totalMoney}
            displayType={"text"}
            thousandSeparator={true}
          />,
          <CurrencyFormat
            value={data.transportFee}
            displayType={"text"}
            thousandSeparator={true}
          />,
          <CurrencyFormat
            value={data.transportFee + data.codMoney}
            displayType={"text"}
            thousandSeparator={true}
          />,
          data.shippingStatus,
          data.deliveryDate?convertMilisecondToDate(data.deliveryDate):'',
          data.cancelationDate?convertMilisecondToDate(data.cancelationDate):'',
          data.successDeliveryDate?convertMilisecondToDate(data.successDeliveryDate):'',
          data.description
        )
      );
    });
    renderRow(cRows);
  }
  function renderRow(r) {
    setRowContent(
      r.map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.id === "code" ? (
                    <Link to={`/admin/orders-update/${row.id}`}>
                      {row.code}
                    </Link>
                  ) : column.id === "status" ? (
                    <span style={{ color: status[value].color }}>
                      {status[value].content}
                    </span>
                  ) : (
                        value
                      )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })
    );
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    callApi(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    callApi(0, event.target.value);
    setValue("all");
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(0);
  };

  const rowFilter = (status) => {
    if (status !== "all") {
      callApi(0, rowsPerPage, status);
    } else {
      callApi(0, rowsPerPage);
    }
  };

  const onSubmit = () => {
    callApi(page, rowsPerPage, value === 'all' ? undefined : parseInt(value), inputSearch.current.value);
  };
  return (
    <>
      <Grid className={classes.jss2}>
        <h3 className={classes.title}>Danh sách phiếu giao hàng</h3>
        <NavLink to={"/admin/orders-create"}  className={classes.create}>
          Tạo phiếu giao
        </NavLink>
        <div style={{ clear: "both" }}></div>
      </Grid>

      <Paper className={classes.root}>
        <CusBottomNavigation
          value={value}
          showLabels
          onChange={handleChange}
          className={classes.navBtn}
        >
          <BottomNavigationAction
            onClick={() => rowFilter("all")}
            label="Tất cả phiếu giao"
            className={classes.jss1}
            value="all"
          />
          <BottomNavigationAction
            onClick={() => rowFilter(1)}
            label="Chờ lấy hàng"
            value="waiting"
          />
          <BottomNavigationAction
            onClick={() => rowFilter(2)}
            label="Đang trong kho"
            value="storage"
          />
          <BottomNavigationAction
            onClick={() => rowFilter(3)}
            label="Đang giao hàng"
            value="Delivering"
          />
          <BottomNavigationAction
            onClick={() => rowFilter(4)}
            label="Đã giao hàng"
            value="Delivered"
          />
          <BottomNavigationAction
            onClick={() => rowFilter(6)}
            label="Đã hủy"
            value="Cancelled"
          />
        </CusBottomNavigation>
        <Grid style={{
          backgroundColor: "#fcfcfc", display: 'flex', justifyContent: 'center', width: '90%',
          margin: '0 auto', marginTop: '15px',
        }}>
          <CusTextField
            name="searchInput"
            onChange={() => onSubmit()}
            fullWidth
            inputRef={inputSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Tìm kiếm người nhận..."
          />
        </Grid>

        {noFulfillment ? (
          <Grid>
            <TableContainer className={classes.container} id="tableborder">
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>{rowContent}</TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              component="div"
              count={orderTotal}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={"Hiển thị:"}
              page={page}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} tổng ${count !== -1 ? count : `nhiều hơn ${to}`}`
              }
              nextIconButtonText={"Trang sau"}
              backIconButtonText={"Trang trước"}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        ) : (
            <Grid className={classes.jss4}>
              <svg
                id="next-search-reverse"
                width="100%"
                height="100%"
                style={{ fill: " #c3cfd8" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z" />
                </svg>
              </svg>
              <Typography
                variant="body1"
                align="center"
                style={{ fontSize: 19, paddingTop: 10, paddingBottom: 10 }}
              >
                Không tìm thấy phiếu giao hàng phù hợp với điều kiện tìm kiếm
            </Typography>
              <Typography
                variant="body1"
                align="center"
                style={{ color: "#637381" }}
              >
                Thử thay đổi điều kiện lọc hoặc từ khóa tìm kiếm
            </Typography>
            </Grid>
          )}
      </Paper>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    fulfillments: state.order.fulfillments,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchListFulfillment: (page, limit, status, name) => {
      dispatch(fetchListFulfillment(page, limit, status, name));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fulfillments);