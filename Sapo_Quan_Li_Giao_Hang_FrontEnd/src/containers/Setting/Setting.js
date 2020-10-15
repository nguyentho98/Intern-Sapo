import { Card, CardHeader, Grid } from '@material-ui/core';
import * as types from './styles';
import React, { useState } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import NumberFormat from 'react-number-format';

const Setting = (props) => {
  const [customerT, setCustomerT] = useState(
    localStorage.getItem('customer-accounting')
  );
  const classes = types.useStyles();
  return (
    <React.Fragment>
      {/* <div className={`header-add-product ${props.ui ? 'w-80' : 'w-260'}`}>
        <div className='button-header' id='x'>
          <div className='col-lg-12 col-sm-12 col-md-12'>
            <div className='col-lg-12 col-sm-12 col-md-12 text-right'>
              <button className='btn btn-primary' onClick={() => {}}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <GridContainer>
        <GridItem md={6} lg={6}>
          <Card>
            <h4 className={classes.product_title} style={{ paddingLeft: 15 }}>
              Tự động tạo phiếu đối soát
            </h4>
            <div className={classes.cardContent}>
              <div className='d-flex'>
                <span style={{ width: '25%', lineHeight: '38px' }}>
                  Với khách hàng
                </span>
                <NumberFormat
                  style={{ width: '50%' }}
                  className={`form form-control`}
                  allowNegative={false}
                  thousandSeparator=','
                  decimalScale={3}
                  name='onHand'
                  value={customerT}
                  onValueChange={(values) => {
                    const { value } = values;
                    if (value > 99) {
                      setCustomerT(99);
                    } else {
                      setCustomerT(value);
                      localStorage.setItem('customer-accounting', value);
                    }
                  }}
                />
              </div>
            </div>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default Setting;
