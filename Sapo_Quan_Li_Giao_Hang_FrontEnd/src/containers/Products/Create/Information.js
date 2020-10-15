/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, CardHeader, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import CKEditor from 'react-ckeditor-component';

const Information = (props) => {
  const { classes, productState } = props;
  const [editorStatus, setEditorStatus] = useState(false);
  const handleChange = (e) => {
    props.handleChange(e);
  };
  return (
    <Card>
      <CardHeader>
        <h4 className={classes.product_title}>Thông tin thêm</h4>
      </CardHeader>
      <Grid className={classes.cardContent}>
        <Grid container spacing={4}>
          <Grid item md={6} lg={6} className='brand'>
            <label>Giá sản phẩm</label>
            <div className='input-group mb-2'>
              <input
                type='number'
                className='form-control'
                value={productState.productPrice}
                name='productPrice'
                placeholder=''
                onChange={handleChange}
              />
              <div className='input-group-prepend'>
                <div className='input-group-text'>
                  <span className='currency-input'>₫</span>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item md={6} lg={6} className='brand'>
            <label>Khối lượng</label>
            <div className='input-group mb-2'>
              <input
                style={{ borderRight: 'none' }}
                type='number'
                value={productState.mass}
                className='form-control'
                name='mass'
                placeholder=''
                onChange={handleChange}
              />
              <div className='input-group-prepend'>
                <div className='input-group-text'>g</div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid className={classes.editor}>
          <a
            onClick={() => {
              setEditorStatus(!editorStatus);
            }}
            className={classes.description}
          >
            {!editorStatus ? 'Thêm mô tả' : 'Ẩn mô tả'}
          </a>
          {editorStatus ? (
            <CKEditor
              activeClass='p10'
              content={productState.description}
              events={{
                change: (e) => handleChange(e),
              }}
            />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default Information;
