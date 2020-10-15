import { combineReducers } from 'redux';

import orderReducer from './fulfillment';
import uiReducer from './ui';
import shipperReducer from './shipper';
import customerReducer from './customer';
import addressReducer from './address';
import statusReducer from './StatusCheckBox';
import productReducer from './ProductReducer';
import filterProductReducer from './ProductSearch';
import fulfillmentSearchReducer from './fulfillmentSearch';
import calReducer from './Accounting';
import statisticReducer from './statistic';
import crossCheckReducer from './CrossCheckReducer';
const rootReducer = () =>
  combineReducers({
    address: addressReducer,
    customer: customerReducer,
    order: orderReducer,
    shipper: shipperReducer,
    ui: uiReducer,
    statusReducer,
    productReducer,
    filter: filterProductReducer,
    fulfillmentSearch: fulfillmentSearchReducer,
    calReducer: calReducer,
    statistic: statisticReducer,
    crossCheck: crossCheckReducer,
  });
export default rootReducer;
