import { GridOn } from "@material-ui/icons";
import ListFulfillments from '../containers/Fulfillments/List';
import CreateOrders from '../containers/Fulfillments/Create';
import UpdateOrders from '../containers/Fulfillments/Update';
var coorRoutes = [
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
            layout: '/coor',
          },
          {
            path: '/orders-list',
            name: 'Danh sách phiếu giao',
            rtlName: 'Danh sách phiếu giao',
            mini: 'DS',
            component: ListFulfillments,
            layout: '/coor',
          },
          {
            path: '/orders-update/:id',
            name: 'Danh sách ',
            rtlName: 'Danh sách',
            status: true,
            mini: 'UD',
            component: UpdateOrders,
            layout: '/coor',
          },
        ],
      },
];
export default coorRoutes;
