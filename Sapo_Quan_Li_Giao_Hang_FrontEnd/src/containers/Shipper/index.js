import React, { useEffect, useRef, useState } from 'react';
import * as styles from './style';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {
  fetchListFulfillment
} from "../../redux/actions/fulfillment";
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import history from '../../utils/history';

const columns = [
  { id: 'code', label: 'Mã đơn hàng', minWidth: 120, align: 'left' },
  { id: 'from', label: 'Người gửi', minWidth: 300, align: 'left' },
  { id: 'to', label: 'Người nhận', minWidth: 300, align: 'left' },
  // { id: 'cod', label: 'Tiền COD', minWidth: 170, align: 'left' },
  // { id: 'transportFee', label: 'Phí vận chuyển', minWidth: 170, align: 'left' },
  { id: 'price', label: 'Tổng tiền thu (VND)', minWidth: 170, align: 'left' },
  { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'left' },
  { id: 'shippingMethod', label: 'Phương thức giao', minWidth: 150, align: 'left' },
  { id: 'deliveryDate', label: 'Giao hàng dự kiến', minWidth: 150, align: 'left' },
  // { id: 'cancelationDate', label: 'Ngày hủy', minWidth: 150, align: 'left' },
  // { id: 'successDeliveryDate', label: 'Giao thành công', minWidth: 150, align: 'left' },
  { id: 'note', label: 'Ghi chú', minWidth: 220, align: 'left' },
];

function createData(id, code, from, to, cod, transportFee, price, status, shippingMethod, deliveryDate, cancelationDate, successDeliveryDate, note) {
  return { id, code, from, to, cod, transportFee, price, status, shippingMethod, deliveryDate, cancelationDate, successDeliveryDate, note };
}
const status = [
  { content: "Tạo phiếu", color: '#f9a825' },
  { content: 'Chờ lấy hàng', color: '#f9a825' },
  { content: 'Đã ở trong kho', color: '#A2A6B0' },
  { content: 'Đang giao hàng', color: '#1e88e5' },
  { content: 'Hoàn thành', color: '#4caf50' },
  { content: 'Giao lại', color: 'orange' },
  { content: 'Hủy giao', color: '#f44336' },
];


function Fulfillment(props) {
  const classes = styles.useStyles();
  const { fulfillments, fetchListFulfillment } = props
  const CusBottomNavigation = styles.CusBottomNavigation
  const CusTextField = styles.CusTextField
  const [page, setPage] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowContent, setRowContent] = useState();
  const [value, setValue] = React.useState('all');
  const [noFulfillment, setNoFulfillment] = React.useState(true);
  const inputSearch = useRef();
  const inputSearchMini = useRef();
  const cRows = useRef([]);
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    callApi(0, 10);
  }, []);

  useEffect(() => {
    setRowValue(fulfillments)
  }, [fulfillments])

  async function callApi(page, limit, status, name) {
    let shipperId
    if (localStorage.getItem('shipperID')) {
      shipperId = localStorage.getItem('shipperID')
    } else {
      shipperId = 0
    }
    await fetchListFulfillment(page, limit, status === undefined ? '' : status, shipperId, name === undefined ? "" : name)
    setTimeout(() => {
      setSpinner(false)
    }, 600)
  }
  function convertMilisecondToDate(time) {
    let d = new Date(time);

    let day
    if (d.getDate() < 10) {
      day = '0' + d.getDate();
    } else {
      day = d.getDate();
    }

    let mon
    if ((d.getMonth() + 1) < 10) {
      mon = '0' + (d.getMonth() + 1);
    } else {
      mon = (d.getMonth() + 1);
    }
    let year = d.getFullYear()

    let h
    if (d.getHours() < 10) {
      h = '0' + d.getHours();
    } else {
      h = d.getHours();
    }

    let m
    if (d.getMinutes() < 10) {
      m = '0' + d.getMinutes();
    } else {
      m = d.getMinutes();
    }
    return `${day}/${mon}/${year}`;
  }
  async function setRowValue(data) {
    cRows.current = [];
    if (data.fulfillmentDTOS.length === 0) {
      setNoFulfillment(false)
    } else {
      setNoFulfillment(true)
    }
    setOrderTotal(data.totalElement);
    await data.fulfillmentDTOS.forEach((data) => {
      // { id, code, from, to, cod, transportFee, price, status, deliveryDate, cancelationDate, successDeliveryDate, note };
      let from = data.shippingFrom
      let to = data.shippingTo
      cRows.current.push(
        createData(
          data.id,
          data.code,
          data.shippingFrom !== null ?
            <ul style={{ padding: 0 }}>
              <li>Tên: {from.name}</li>
              <li>SDT: {from.phone}</li>
              <li style={{ maxWidth: 300, whiteSpace: 'break-spaces' }}>Địa chỉ: {`${from.address}, ${from.ward}, ${from.district}, ${from.province}`}</li>
            </ul> :
            <ul style={{ padding: 0 }}>
              <li>Tên: {data.customerDTO.name}</li>
              <li>SDT: {data.customerDTO.phoneNumber}</li>
              <li>Địa chỉ: {data.customerDTO.address}</li>
            </ul>,
          <ul style={{ padding: 0 }}>
            <li>Tên: {to.name}</li>
            <li>SDT: {to.phone}</li>
            <li style={{ maxWidth: 300, whiteSpace: 'break-spaces' }}>Địa chỉ: {`${to.address}, ${to.ward}, ${to.district}, ${to.province}`}</li>
          </ul>,
          <CurrencyFormat
            value={data.shippingPaymentObject === 0 ? data.codMoney : 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={" đ"}
          />,
          <CurrencyFormat
            value={data.transportFee}
            displayType={'text'}
            thousandSeparator={true}
            suffix={" đ"}
          />,
          <CurrencyFormat
            value={data.shippingPaymentObject === 0 ? (data.codMoney + data.transportFee) : data.transportFee}
            displayType={'text'}
            thousandSeparator={true}
            suffix={" đ"}
          />,
          data.shippingStatus,
          data.shippingMethod === 0 ? "Chuyển về kho" : "Đi giao ngay",
          convertMilisecondToDate(data.deliveryDate),
          convertMilisecondToDate(data.cancelationDate),
          convertMilisecondToDate(data.successDeliveryDate),
        <span style={{whiteSpace: 'break-spaces'}}>{data.description}</span>
        )
      );
    });
    renderRow(cRows.current);
  }
  function renderRow(r) {
    setRowContent(
      r.map((row) => {
        return (
          <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align} onClick={() => history.push(`/shipper/order-detail/${row.id}`)} style={{ cursor: 'pointer' }}>
                  {column.id === 'code' ? (
                    <Link to={`/shipper/order-detail/${row.id}`}>{row.code}</Link>
                  ) : column.id === 'status' ? (
                    <p style={{ width: '100%', textAlign: 'center', borderRadius: 2, color: status[value].color, border: `solid 1px ${status[value].color}`, padding: 2 }}>
                      {status[value].content}
                    </p>
                  ) : (value)}
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
    setSpinner(true);
    callApi(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSpinner(true)
    callApi(0, event.target.value);
    setValue('all');
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilter(newValue);
    setPage(0);
  };

  const rowFilter = (status) => {
    setSpinner(true)
    if (status !== 'all') {
      callApi(0, rowsPerPage, status);
    } else {
      callApi(0, rowsPerPage);
    }
  };
  const onSubmit = () => {
    setSpinner(true)
    callApi(page, rowsPerPage, value === 'all' ? undefined : parseInt(value), inputSearch.current.value);
  };
  const onSearch = () => {
    setSpinner(true)
    setTimeout(() => {
      callApi(page, rowsPerPage, value === 'all' ? undefined : parseInt(value), inputSearch.current.value);
    }, 350)
  };
  const onSubmitMini = () => {
    setSpinner(true)
    callApi(page, rowsPerPage, value === 'all' ? undefined : parseInt(value), inputSearchMini.current.value);
  };

  const [filter, setFilter] = React.useState('all');
  const [open, setOpen] = React.useState(false);

  const handleChangeSelect = (event) => {
    setFilter(event.target.value);
    setValue(event.target.value);
    rowFilter(event.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Grid className={classes.jss2}>
        <h3 className={classes.title}>Danh sách phiếu giao hàng</h3>
        <div style={{ clear: "both" }}></div>
      </Grid>
      <Paper className={classes.root}>
        <MediaQuery minDeviceWidth={1024}>
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
              value={'all'}
            />
            <BottomNavigationAction
              onClick={() => rowFilter(1)}
              label="Chờ lấy hàng"
              value={1}
            />
            <BottomNavigationAction
              onClick={() => rowFilter(2)}
              label="Đang trong kho"
              value={2}
            />
            <BottomNavigationAction
              onClick={() => rowFilter(3)}
              label="Đang giao hàng"
              value={3}
            />
            <BottomNavigationAction
              onClick={() => rowFilter(4)}
              label="Hoàn thành"
              value={4}
            />
            <BottomNavigationAction
              onClick={() => rowFilter(6)}
              label="Đã hủy"
              value={6}
            />
          </CusBottomNavigation>
          <Grid style={{ backgroundColor: "#fcfcfc", display: 'flex', justifyContent: 'center' }}>
            <CusTextField
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
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              placeholder="Tìm kiếm tên người nhận..."
            />
          </Grid>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={1000}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Lọc</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={filter}
              onChange={handleChangeSelect}
            >
              <MenuItem value={'all'}>Tất cả</MenuItem>
              <MenuItem value={1}>Chờ lấy hàng</MenuItem>
              <MenuItem value={2}>Đang trong kho</MenuItem>
              <MenuItem value={3}>Đang giao hàng</MenuItem>
              <MenuItem value={4}>Đã giao hàng</MenuItem>
              <MenuItem value={6}>Đã hủy</MenuItem>
            </Select>
          </FormControl>
          <Grid style={{ backgroundColor: "#fcfcfc", display: 'flex', justifyContent: 'center' }}>
            <CusTextField
              name="searchInput"
              onChange={() => onSubmitMini()}
              inputRef={inputSearchMini}
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
              placeholder="Tìm kiếm tên người nhận..."
            />
          </Grid>

        </MediaQuery>

        {noFulfillment ? (
          <Grid>
            {spinner ? <LinearProgress /> : <></>}
            <TableContainer className={classes.container}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, position: 'sticky', top: 0, backgroundColor: '#fcfcfc' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!spinner ? rowContent : <></>}
                </TableBody>
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
              <Typography variant="body1" align="center" style={{ fontSize: 19, paddingTop: 10, paddingBottom: 10 }}>
                Không tìm thấy phiếu giao hàng phù hợp với điều kiện tìm kiếm
            </Typography>
              <Typography variant="body1" align="center" style={{ color: '#637381' }}>
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
    fetchListFulfillment: (page, limit, status, shipperID, name) => {
      dispatch(fetchListFulfillment(page, limit, status, shipperID, name));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fulfillment);