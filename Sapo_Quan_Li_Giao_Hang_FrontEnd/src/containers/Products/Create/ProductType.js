/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, CardHeader, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import {
  getBrandRequest,
  getCateRequest,
  getTagsRequest,
} from '../../../redux/actions/product';
import { connect } from 'react-redux';
const ProductType = (props) => {
  const [statusLayoutCate, setStatusLayoutCate] = useState('');
  const [statusLayout, setStatusLayout] = useState('');
  const [statusLayoutTag, setStatusLayoutTag] = useState('');
  const [tagCP, setTagCP] = useState('');

  const { classes, productState, setCate, categoryChange } = props;
  const showCate = (categories) => {
    let rs = null;
    if (categories !== undefined) {
      if (categories.length > 0) {
        rs = categories.map((cate) => {
          return (
            <div className='brand-i' onClick={() => setCate(cate)}>
              <a> {cate}</a>
            </div>
          );
        });
      } else {
        rs = (
          <div
            className='brand-i'
            onClick={() => setCate(productState.category)}
          >
            <a>
              <b>Thêm</b> {productState.category}
            </a>
          </div>
        );
      }
    }
    return rs;
  };
  const forcusCate = (e) => {
    setStatusLayoutCate('cate');
    let value = e.target.value;
    props.getCate(value, 1);
  };
  const showAllCate = () => {
    props.getCate(productState.category, 1);
    setStatusLayoutCate('cate');
    document.getElementById('category').focus();
  };
  const blurCate = (e) => {
    setTimeout(() => {
      setStatusLayoutCate('');
    }, 150);
  };
  const forcusBrand = (e) => {
    setStatusLayout('brand');
    props.getBrand(e.target.value, 1);
  };
  const blurBrand = () => {
    setTimeout(() => {
      setStatusLayout('');
    }, 150);
  };
  const getAllBrand = () => {
    props.getBrand(productState.brand, 1);
    setStatusLayout('brand');
    document.getElementById('brand').focus();
  };
  const showBrand = (brands) => {
    let rs = null;
    if (brands !== undefined) {
      if (brands.length > 0) {
        rs = brands.map((brand) => {
          return (
            <div className='brand-i' onClick={() => props.setBrand(brand)}>
              <a> {brand}</a>
            </div>
          );
        });
      } else {
        rs = (
          <div
            className='brand-i'
            onClick={() => props.setBrand(productState.brand)}
          >
            <a>
              <b>Thêm</b> {productState.brand}
            </a>
          </div>
        );
      }
    }
    return rs;
  };
  const showTags = () => {
    let rs = null;
    if (productState.tags.length > 0) {
      rs = productState.tags.map((tag, index) => {
        return (
          <span className='tag label label-primary' key={index}>
            <span>{tag} </span>
            <a onClick={() => props.removeTag(tag)} className='remove'></a>
          </span>
        );
      });
    }
    return rs;
  };
  const handleKey = (e) => {
    let tagList = [...productState.tags];
    const value = e.target.value.trim();
    if (e.key === 'Enter') {
      if (!tagList.includes(e.target.value)) {
        if (value !== '') {
          tagList.push(e.target.value);
        }
      }
      document.getElementById('tag').value = '';
      setStatusLayoutTag('');
    }
    props.handleKey(tagList);
  };
  const onBlurTags = (e) => {
    let tagList = [...productState.tags];
    const value = e.target.value.trim();
    if (!tagList.includes(e.target.value)) {
      if (value !== '') {
        tagList.push(e.target.value);
      }
    }
    props.onBlurTags(tagList);
    document.getElementById('tag').value = '';
    setTimeout(() => {
      setStatusLayoutTag('');
    }, 200);
  };
  const tagChange = (e) => {
    let value = e.target.value;
    setTagCP(value);
    setStatusLayoutTag('tag');
    setTimeout(() => {
      props.getTag(value.trim());
    }, 200);
  };
  const tagFocus = (e) => {
    props.getTag(e.target.value.trim());
    setStatusLayoutTag('tag');
  };
  const showTag = (tags) => {
    let rs = null;
    if (tags.length > 0) {
      rs = tags.map((tag) => {
        return (
          <div className='brand-i' onClick={() => setTags(tag)}>
            <a> {tag}</a>
          </div>
        );
      });
    } else {
      if (tagCP.trim() !== '') {
        rs = (
          <div className='brand-i' onClick={() => setTags(tagCP)}>
            <a>
              <b>Thêm</b> {tagCP}
            </a>
          </div>
        );
      } else {
        rs = (
          <div className='brand-i'>
            <span>Khong co du lieu</span>
          </div>
        );
      }
    }
    return rs;
  };
  const setTags = (tag) => {
    setTagCP('');
    let tagList = [...productState.tags];
    if (!tagList.includes(tag)) {
      tagList.push(tag.trim());
    }

    props.setTags(tagList);
    setStatusLayoutTag('');
  };
  const getTagsProduct = () => {
    props.getTag(tagCP.trim());
    setStatusLayoutTag('tag');
    document.getElementById('tag').focus();
  };
  return (
    <Card>
      <CardHeader>
        <h4 className={classes.product_title}>Phân loại</h4>
      </CardHeader>
      <Grid className={classes.cardContent}>
        <Grid className='category' style={{ position: 'relative' }}>
          <label>Loại sản phẩm</label>
          <div className='input-group mb-2'>
            <input
              autoComplete='off'
              style={{ borderRight: 'none' }}
              type='text'
              className='form-control'
              name='category'
              id='category'
              placeholder=''
              onFocus={forcusCate}
              onBlur={blurCate}
              value={productState.category}
              onChange={(e) => {
                categoryChange(e.target.value);
              }}
            />
            <div className='input-group-prepend'>
              <div className='input-group-text' onClick={showAllCate}>
                <i className='fa fa-sort' />
              </div>
            </div>
          </div>
          <div
            className={`brand-item ${
              statusLayoutCate !== 'cate' ? 'd-none-custom' : 'd-block-custom'
            }`}
          >
            {showCate(props.cate)}
          </div>
        </Grid>
        <Grid className='brand' style={{ position: 'relative' }}>
          <label>Nhãn hiệu</label>
          <div className='input-group mb-2'>
            <input
              autoComplete='off'
              style={{ borderRight: 'none' }}
              type='text'
              id='brand'
              value={productState.brand}
              className='form-control'
              name='brand'
              placeholder=''
              onFocus={forcusBrand}
              onBlur={blurBrand}
              onChange={(e) => {
                props.handleChangeBrand(e.target.value);
              }}
            />
            <div className='input-group-prepend'>
              <div className='input-group-text' onClick={getAllBrand}>
                <i className='fa fa-sort' />
              </div>
            </div>
          </div>
          <div
            className={`brand-item ${
              statusLayout !== 'brand' ? 'd-none-custom' : 'd-block-custom'
            }`}
          >
            {showBrand(props.brand.brand)}
          </div>
        </Grid>
        <Grid className='brand'>
          <label>Tags</label>
          <div className='tag-form'>{showTags()}</div>
          <div className='input-group mb-2 tag'>
            <input
              id='tag'
              type='text'
              className='form-control'
              name='Tags'
              placeholder=''
              size={1}
              onKeyDown={handleKey}
              onBlur={onBlurTags}
              onChange={tagChange}
              onFocus={tagFocus}
              auto
              autoComplete='off'
              maxLength={10}
            />
            <div className='input-group-prepend'>
              <div className='input-group-text' onClick={getTagsProduct}>
                <i className='fa fa-sort' />
              </div>
            </div>
          </div>
          <div
            style={{ width: '27%' }}
            className={`brand-item ${
              statusLayoutTag !== 'tag' ? 'd-none-custom' : 'd-block-custom'
            }`}
          >
            {showTag(props.tag)}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    brand: state.productReducer.brand,
    cate: state.productReducer.cate.category,
    tag: state.productReducer.tag,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBrand: (value, page) => {
      dispatch(getBrandRequest(value, page));
    },
    getCate: (value, page) => {
      dispatch(getCateRequest(value, page));
    },
    getTag: (value) => {
      dispatch(getTagsRequest(value));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductType);
