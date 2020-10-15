import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Shipper from '../containers/Shipper';
import FulfillmentDetail from '../containers/Shipper/FulfillmentDetail';
var shipperRoutes = [
  {
    path: '/shipper',
    name: 'Giao hàng',
    rtlName: 'Giao hàng',
    icon: LocalShippingIcon,
    component: Shipper,
    layout: '/shipper',
  },
  {
    path: '/order-detail/:id',
    name: 'Chi tiết giao hàng',
    rtlName: 'Chi tiết giao hàng',
    status: true,
    component: FulfillmentDetail,
    layout: '/shipper',
  },
];
export default shipperRoutes;
