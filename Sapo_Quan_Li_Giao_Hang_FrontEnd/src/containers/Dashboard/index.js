import React, { useEffect, useState } from "react";

// @material-ui/core components
// @material-ui/icons
// import InfoOutline from "@material-ui/icons/InfoOutline";
import DateRange from "@material-ui/icons/DateRange";
import StorageIcon from '@material-ui/icons/Storage';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ChartistGraph from "react-chartist";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { MyResponsivePie } from '../../components/Chart/ChartPie'
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon/CardIcon.js";
import CardFooter from "../../components/Card/CardFooter/CardFooter.js";
import CardBody from "../../components/Card/CardBody/CardBody.js";
import useStyles from "./styles";
import { connect } from "react-redux";
import { fetchStatistic } from "../../redux/actions/statistic";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import {apifetchStatisticReport} from "../../apis/statistic"

var Chartist = require("chartist");
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

const emailsSubscriptionChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 20,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

const completedTasksChart = {
  data: {
    labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
    series: [[230, 750, 450, 300, 280, 240, 200, 190]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};
const dailySalesChart = {
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    series: [[12, 17, 7, 17, 23, 18, 38]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 70, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

const dataPie = [
  {
    "id": "stylus",
    "label": "stylus",
    "value": 324,
    "color": "hsl(268, 70%, 50%)"
  },
  {
    "id": "php",
    "label": "php",
    "value": 19,
    "color": "hsl(291, 70%, 50%)"
  },
  {
    "id": "sass",
    "label": "sass",
    "value": 413,
    "color": "hsl(10, 70%, 50%)"
  },
  {
    "id": "javascript",
    "label": "javascript",
    "value": 567,
    "color": "hsl(176, 70%, 50%)"
  },
  {
    "id": "scala",
    "label": "scala",
    "value": 94,
    "color": "hsl(288, 70%, 50%)"
  }
]
const Dashboard = (props) => {
  const { statistic, fetchStatistic } = props
  const classes = useStyles();
  const [report,setReport] = useState({});

  function createData(id,name, total) {
    return {id, name, total };
  }

  const rows = [
    createData(1,'Tổng đơn đã giao', 12000),
    createData(2,'Tổng đơn đã bị hủy', 120),
    createData(3,'Tổng số khách hàng', 262),
    createData(4,'Tổng tiền thu về', 200000000),
  ];
  useEffect(() => {
    fetchStatistic()
  }, [])
  useEffect(()=>{
    apifetchStatisticReport().then((res)=>{
      setReport(res.data)
    })
  },[])

  function formatMoney(money) {
    money = money.toLocaleString("vi", { style: "currency", currency: "VND" });
    return money;
  }

  return (
    <div>
      <Grid>
        <div className={classes.stats}>
          <DateRange />
                Ngày hôm nay
       </div>
      </Grid>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <StorageIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Đơn trong kho</p>
              <h3 className={classes.cardTitle}>
                {statistic.storage} <small>Đơn</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <CheckBoxIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Đã giao</p>
              <h3 className={classes.cardTitle}> {statistic.delivered} <small>Đơn</small></h3>
            </CardHeader>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <LocalShippingIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Đang giao</p>
              <h3 className={classes.cardTitle}> {statistic.delivering} <small>Đơn</small></h3>
            </CardHeader>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <CancelPresentationIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Đã hủy</p>
              <h3 className={classes.cardTitle}> {statistic.cancel} <small>Đơn</small></h3>
            </CardHeader>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell align="right">Giá trị</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tổng đơn hàng đã giao
                    </TableCell>
                    <TableCell align="right">
                    {report?.totalFULSuccess ?report.totalFULSuccess:''}
                      </TableCell>
                  </TableRow>
                
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tổng đơn hàng đã bị hủy
                    </TableCell>
                    <TableCell align="right">
                    {report?.totalFULCancel ?report.totalFULCancel:''}
                      </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tổng số khách hàng
                    </TableCell>
                    <TableCell align="right">
                    {report?.totalCUS ?report.totalCUS:''}
                      </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Tổng tiền thu về
                    </TableCell>
                    <TableCell align="right">
                    {report?.totalMoney ? formatMoney(report.totalMoney):''}
                      </TableCell>
                  </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="white">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
                style={{ backgroundColor: 'white' }}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily shipping</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                Đơn hàng giao được trong tuần này
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="white">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
                style={{ backgroundColor: 'white' }}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Shipping cancel</h4>
              <p className={classes.cardCategory}>Số đơn hàng không hoàn thành trong tuần này</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="white">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
                style={{ backgroundColor: 'white' }}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
          </Card>
        </GridItem>
        {/* <GridItem style={{height: 350, width: 400}}>
          {MyResponsivePie(dataPie)}
        </GridItem> */}
      </GridContainer>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  return {
    statistic: state.statistic.statistic,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStatistic: () => {
      dispatch(fetchStatistic());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
