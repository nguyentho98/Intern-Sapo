import { GridOn } from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CustomerList from '../containers/Customer';
import CreateCustomer from '../containers/Customer/CreateCustomer';
import CustomerDetail from '../containers/Customer/CustomerDetail';
import Dashboard from '../containers/Dashboard';
import Fulfillments from '../containers/Fulfillments';
import ListFulfillments from '../containers/Fulfillments/List';
import CreateOrders from '../containers/Fulfillments/Create';
import UpdateOrders from '../containers/Fulfillments/Update';
import Products from '../containers/Products/index';
import ShipperDetail from '../containers/Shipper/ShipperDetail';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Acounting from './../containers/Acounting/IndexAccounting.js';
import IndexCreate from '../containers/Acounting/AccountingCreate/IndexCreate';
import CrossCheck from '../containers/CrossCheck/IndexCrossCheck';
import IndexCreateCrossCheck from '../containers/CrossCheck/CrossCheckCreate/IndexCreateCrossCheck';
import Fulfillment from '../containers/Regulate/Fulfillment';
import RFulfillmentDetail from '../containers/Regulate/Fulfillment/FulfillmentDetail/FulfillmentDetail';
import SettingsIcon from '@material-ui/icons/Settings';
import Setting from '../containers/Setting/Setting';
var dashRoutes = [
  {
    path: '/dashboard',
    name: 'Trang chủ',
    rtlName: 'Trang chủ',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin',
  },
  {
    collapse: true,
    name: 'Phiếu giao hàng',
    rtlName: 'Phiếu giao hàng',
    icon: GridOn,
    state: 'tablesCollapse',
    views: [
      {
        path: '/orders-create',
        name: 'Tạo phiếu và giao hàng',
        rtlName: 'Tạo phiếu và giao hàng',
        mini: 'TM',
        component: CreateOrders,
        layout: '/admin',
      },
      {
        path: '/orders-list',
        name: 'Danh sách phiếu giao',
        rtlName: 'Danh sách phiếu giao',
        mini: 'DS',
        component: ListFulfillments,
        layout: '/admin',
      },
      {
        path: '/orders-update/:id',
        name: 'Danh sách ',
        rtlName: 'Danh sách',
        status: true,
        mini: 'UD',
        component: UpdateOrders,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Sản Phẩm',
    rtlName: 'Sản Phẩm',
    icon: FastfoodIcon,
    views: [
      {
        path: '/product-list',
        name: 'Danh sách sản phẩm',
        isShow: false,
        component: Products,
        layout: '/admin',
        mini: 'LIST',
      },
    ],
  },
  // {
  //   path: '/fulfillmentItem',
  //   name: 'Điều phối phiếu giao',
  //   rtlName: 'Điều phối phiếu giao',
  //   status: false,
  //   icon: DirectionsRunIcon,
  //   component: Fulfillment,
  //   layout: '/admin',
  // },
  {
    path: '/fulfillDetail/:id',
    name: 'Điều phối',
    rtlName: 'Điều phối',
    status: true,
    icon: DirectionsRunIcon,
    component: RFulfillmentDetail,
    layout: '/admin',
  },
  {
    collapse: true,
    name: 'Đối soát',
    rtlName: 'Đối soát',
    icon: AccountBalanceIcon,
    state: 'ds',
    views: [
      {
        path: '/accounting',
        name: 'Khách hàng',
        isShow: false,
        component: Acounting,
        layout: '/admin',
        mini: 'KH',
      },
      {
        path: '/cross-check',
        name: 'Nhân viên',
        isShow: false,
        component: CrossCheck,
        layout: '/admin',
        mini: 'NV',
      },
    ],
  },
  {
    path: '/customer',
    name: 'Khách hàng',
    rtlName: 'Khách hàng',
    icon: PeopleAltIcon,
    component: CustomerList,
    layout: '/admin',
  },
  {
    path: '/customerDetail/:id',
    name: 'Chi tiết khách hàng',
    rtlName: 'Chi tiết khách hàng',
    status: true,
    icon: PeopleAltIcon,
    component: CustomerDetail,
    layout: '/admin',
  },
  {
    path: '/shipperDetail/:id/:idC',
    name: 'Chi tiết nhân viên giao hàng',
    rtlName: 'Chi tiết nhân viên giao hàng',
    status: true,
    icon: PeopleAltIcon,
    component: ShipperDetail,
    layout: '/admin',
  },
  {
    path: '/ordersUpdate/:id/:idC',
    name: 'Danh sách ',
    rtlName: 'Danh sách',
    status: true,
    icon: PeopleAltIcon,
    component: UpdateOrders,
    layout: '/admin',
  },
  {
    path: '/createCustomer',
    name: 'Thêm mới hách hàng',
    rtlName: 'Thêm mới Khách hàng',
    status: true,
    icon: PeopleAltIcon,
    component: CreateCustomer,
    layout: '/admin',
  },
  {
    path: '/accounting-add',
    name: 'Thêm mới hạch toán',
    rtlName: 'Thêm mới hạch toán',
    status: true,
    icon: PeopleAltIcon,
    component: IndexCreate,
    layout: '/admin',
  },
  {
    path: '/cross-check-add',
    name: 'Thêm mới đôi soát nhân viên',
    rtlName: 'Thêm mới đôi soát nhân viên',
    status: true,
    icon: PeopleAltIcon,
    component: IndexCreateCrossCheck,
    layout: '/admin',
  },
  {
    path: '/updateCustomer/:id',
    name: 'Cập nhật khách hàng',
    rtlName: 'Cập nhật Khách hàng',
    status: true,
    icon: PeopleAltIcon,
    component: CreateCustomer,
    layout: '/admin',
  },
];
export default dashRoutes;
