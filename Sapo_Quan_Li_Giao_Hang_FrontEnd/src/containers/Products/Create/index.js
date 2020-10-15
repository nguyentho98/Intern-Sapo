/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Grid } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import LoadingBar from 'react-top-loading-bar';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader/CardHeader.js';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { toastSuccess } from '../../../helper/ToastHelper.js';
import { clearFilter } from '../../../redux/actions/Filter.js';
import {
  addProductRequest,
  clearList,
  deleteProductRequest,
  getBrandRequest,
  getCateRequest,
  getOneProductRequest,
  getTagsRequest,
  updateProductRequest,
} from '../../../redux/actions/product';
import {
  setSttAfterCreate,
  setSttCreateSuccess,
  setSttFailSave,
} from '../../../redux/actions/SetSttCheckBox.js';
import { storage } from '../../../utils/FireBase.js';
import DeleteModal from '../../PopUpConfirm/DeleteModal.js';
import ImageProduct from './ImageProduct.js';
import Information from './Information.js';
import ProductType from './ProductType.js';
import * as types from './styles';

function Create(props) {
  //-------------STATE---------------
  const classes = types.useStyles();
  const [sateSubmitted, setSateSubmitted] = useState(false);
  const [productState, setProductState] = useState({
    id: '',
    code: '',
    name: '',
    productPrice: '',
    description: '',
    brand: '',
    category: '',
    sttSetProduct: false,
    images: [],
    tags: [],
    mass: '',
  });
  const [statusLayout, setStatusLayout] = useState('');
  const [statusLayoutCate, setStatusLayoutCate] = useState('');
  const [pushStt, setPushStt] = useState(false);
  const [stt, setStt] = useState(false);
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [progress, setProgress] = useState(0);
  const [btnFoot, setBtnFoot] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  //--------------------FUNCTION--------------------------

  const handleChange = (event) => {
    let name = '';
    let value = '';
    if (event.editor) {
      name = 'description';
      value = event.editor.getData();
    } else {
      name = event.target.name;
      value = event.target.value.trim();
    }
    setProductState({ ...productState, [name]: value });
    console.log(productState);
  };
  const handleSubmit = async () => {
    const { id } = productState;
    const codeList = productState.code.split('');
    let code = '';
    if (codeList.length >= 2) {
      code = codeList[0] + codeList[1];
    }
    if (productState.name === '') {
      setSateSubmitted(true);
    } else {
      if (id !== '' && id > 0) {
        props.updateProduct(productState, id);
        props.setCreated(false);
        props.setFailSave(false);
        props.setAfterCreate(false);
      } else {
        console.log(code);
        if (code.toUpperCase() === 'SP') {
          props.setCreated(true);
          props.setFailSave(false);
        } else {
          console.log(productState);
          props.addProduct(productState);
          setTimeout(() => {
            props.setCreated(true);
            props.setFailSave(true);
            props.setAfterCreate(true);
          }, 1700);
        }
      }
    }
  };
  const handleNameChange = (e) => {
    let value = e.target.value;
    setProductState({ ...productState, name: value });
  };
  const forcusName = () => {
    setSateSubmitted(false);
  };
  const blurName = () => {
    if (productState.name === '') {
      setSateSubmitted(true);
    }
  };
  const handleKey = (tagList) => {
    setProductState({ ...productState, tags: tagList });
  };
  const onBlurTags = (tagList) => {
    setProductState({ ...productState, tags: tagList });

    setTimeout(() => {
      // setStatusLayoutTag('');
    }, 200);
    document.getElementById('tag').value = '';
  };

  const removeTag = (t) => {
    let tagList = [...productState.tags];
    tagList.splice(
      tagList.findIndex((tag) => tag === t),
      1
    );
    setProductState({ ...productState, tags: tagList });
  };
  useEffect(() => {
    setProgress(100);
    if (props.match !== undefined) {
      props.getOneProduct(props.match.params.id);
      setProductState({ ...productState, id: props.match.params.id });
    }
  }, []);

  const showToastSave = () => {
    let result = null;

    if (props.faildSave === false) {
      result = (
        <div
          className={`${
            props.createSuccess === false ? 'd-none-custom ' : 'd-block-custom '
          }`}
        >
          <div className={`faild-save d-flex col-lg-12 col-md-12 col-12`}>
            <i className='fa fa-ban' />
            <h2>
              {`Sản phẩm chưa được lưu:`}
              <li> Mã không được có tiền tố của hệ thống SP !!!</li>
            </h2>
          </div>
        </div>
      );
    } else {
      if (productState.id !== '') {
        result = (
          <div
            className={`${
              props.createSuccess === false
                ? 'd-none-custom '
                : 'd-block-custom '
            }`}
          >
            <div className={`created d-flex col-lg-12 col-md-12 col-12`}>
              <i className='fa fa-check-circle ' />
              <h2>{`${
                productState.id === '' ? '' : props.productDetail.name
              } đã được tạo.`}</h2>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <button className='btna' onClick={toCreate}>
                <span>Tạo sản phẩm mới</span>
              </button>
            </div>
          </div>
        );
      }
    }
    return result;
  };

  const toCreate = () => {
    window.location.replace('/admin/product-add');
  };
  useEffect(() => {
    const { productDetail } = props;
    if (productState.id !== '') {
      if (stt === false) {
        if (productDetail.code !== undefined) {
          let tagList = [...productState.tags];
          productDetail.tagsEntities.map((tag) => {
            tagList.push(tag.value);
          });
          let imgs = [];
          if (productDetail.imageEntity.length > 0) {
            productDetail.imageEntity.map((img) => {
              imgs.push(img.path);
            });
          }
          setProductState({
            ...productState,
            id: productDetail.id,
            name: productDetail.name,
            code: productDetail.code,
            description: productDetail.description,
            category: productDetail.category,
            brand: productDetail.brand,
            productPrice: productDetail.productPrice,
            tags: tagList,
            mass: productDetail.mass,
            images: imgs,
          });
          setStt(true);
        }
      }
    }
    if (productDetail.code !== undefined) {
      if (pushStt === false) {
        if (props.afterCreate === true) {
          props.history.push('/admin/product/' + productDetail.id);
          props.setAfterCreate(false);
          setPushStt(true);
        }
      }
    }
  }, [props]);

  const handleChangeBrand = (value) => {
    setProductState({ ...productState, brand: value });
    setTimeout(() => {
      props.getBrand(value, 1);
    }, 300);
  };

  const setBrand = (brand) => {
    setProductState({ ...productState, brand: brand });
    setStatusLayout('');
  };

  const setCate = (cate) => {
    setProductState({ ...productState, category: cate });
    setStatusLayout('');
  };

  const categoryChange = (value) => {
    setProductState({ ...productState, category: value });
    setTimeout(() => {
      props.getCate(value, 1);
    }, 300);
  };

  const setTags = (tagList) => {
    setProductState({ ...productState, tags: tagList });
    // setStatusLayoutTag('');
  };

  const [firebaseImage, setFirebaseImage] = useState([]);
  const onChangeImages = (e) => {
    let images = e.target.files;
    let imagePre = [...imagePreview];
    const fireBase = [...firebaseImage];
    let imgName = [...productState.images];
    for (var i = 0; i < images.length; i++) {
      console.log(e.target.files[i].name);
      imgName.push(e.target.files[i].name);
      fireBase.push(e.target.files[i]);
      const name = e.target.files[i].name;
      let reader = new FileReader();
      reader.readAsDataURL(images[i]);
      reader.onloadend = () => {
        imagePre.push({ name, base64: reader.result });
        setImage([
          ...image,
          { nameImage: image.name, base64Image: reader.result.split(',')[1] },
        ]);
      };
    }
    setProductState({
      ...productState,
      images: imgName,
    });
    setFirebaseImage(fireBase);
    setImagePreview(imagePre);
  };
  useEffect(() => {
    setBtnFoot(
      window.innerHeight + document.documentElement.scrollTop >=
        document.scrollingElement.scrollHeight - 40
    );
    window.onscroll = () => {
      setBtnFoot(
        window.innerHeight + document.documentElement.scrollTop >=
          document.scrollingElement.scrollHeight - 50
      );
    };
  }, []);
  const removeImage = (name, index) => {
    let imagesIndex = productState.images.findIndex((f) => f === name);
    let imgs = [...imagePreview];
    let imgsProduct = [...productState.images];
    if (imagesIndex > -1) {
      imgsProduct.splice(imagesIndex, 1);
    }
    if (index > -1) {
      imgsProduct.splice(index, 1);
      imgs.splice(index, 1);
    }
    setImagePreview(imgs);
    setProductState({ ...productState, images: imgsProduct });
  };
  const confircmDelete = () => {
    deleteProductRequest(props.match.params.id)
      .then((res) => {
        toastSuccess('Xoá sản phẩm thành công');
      })
      .then(() => {
        props.clearList();
        props.history.push('/admin/product-list');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clickCloseModal = (data) => {
    setShowModalDelete(data);
  };
  useEffect(() => {
    firebaseImage.map((f) => {
      const task = storage.ref(`/images/${f.name}`).put(f);
      task.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images')
            .child(f.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
            });
        }
      );
    });
  }, [firebaseImage]);
  return (
    <React.Fragment>
      <LoadingBar
        color='#08f'
        height='3px'
        progress={progress}
        onLoaderFinished={() => {
          setProgress(0);
        }}
      />
      <div
        className={`header-add-product ${props.miniActive ? 'w-80' : 'w-260'}`}
      >
        <div
          className={`button-header ${
            btnFoot ? 'd-none-custom' : 'd-block-custom'
          }`}
        >
          <div className='col-lg-12 col-sm-12 col-md-12'>
            <div className='col-lg-12 col-sm-12 col-md-12 text-right'>
              <NavLink to={'/admin/product-list'} className='btn btn-white'>
                Hủy
              </NavLink>
              <button
                className='btn btn-primary'
                onClick={() => handleSubmit()}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
      <Grid className={`${classes.root} mt-3`}>
        <NavLink
          to={'/admin/product-list'}
          style={{ color: '#637381' }}
          onClick={() => {
            props.clearFilter();
            props.clearList();
          }}
        >
          <ChevronLeftIcon />
          Quay lại danh sách sản phẩm
        </NavLink>
        <Grid>
          <h3 className={classes.title}>
            {productState.id === ''
              ? 'Thêm mới sản phẩm'
              : props.productDetail.name}
          </h3>
        </Grid>
        {showToastSave()}
        <GridContainer>
          <GridItem md={8} lg={8}>
            <Card>
              <CardHeader>
                <h4 className={classes.product_title}>Thông tin sản phẩm</h4>
              </CardHeader>
              <Grid className={classes.cardContent}>
                <Grid container spacing={4}>
                  <Grid item md={6} lg={6}>
                    <label>
                      Tên sản phẩm <b style={{ color: 'red' }}>*</b>
                    </label>
                    <input
                      type='text'
                      className={`form-control ${
                        sateSubmitted === true ? 'input-error' : ''
                      }`}
                      value={productState.name}
                      id='name'
                      name='prductName'
                      placeholder=''
                      onChange={handleNameChange}
                      onFocus={forcusName}
                      onBlur={blurName}
                      data-tip
                      data-for='err-name'
                      maxLength={255}
                    />
                    {sateSubmitted === true ? (
                      <ReactTooltip
                        id='err-name'
                        place='top'
                        className='datatooltip'
                        effect='solid'
                      >
                        Tên sản phẩm không được trống
                      </ReactTooltip>
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <label>Mã sản phẩm</label>
                    <input
                      type='text'
                      value={productState.code}
                      className='form-control'
                      name='code'
                      placeholder=''
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <Information
              classes={classes}
              productState={productState}
              handleChange={handleChange}
            />
          </GridItem>
          <GridItem md={4} lg={4}>
            <ProductType
              classes={classes}
              productState={productState}
              handleChange={handleChange}
              setCate={setCate}
              categoryChange={categoryChange}
              handleKey={handleKey}
              setBrand={setBrand}
              onBlurTags={onBlurTags}
              setTags={setTags}
              removeTag={removeTag}
              handleChangeBrand={handleChangeBrand}
            />
            <Card className={classes.height}>
              <CardHeader>
                <h4 className={classes.product_title}>Ảnh sản phẩm</h4>
                <span
                  className='float-right'
                  style={{
                    position: 'absolute',
                    top: '1.6rem',
                    right: '15px',
                    fontWeight: 500,
                  }}
                >
                  <div className='fileupload text-primary'>
                    Thêm ảnh
                    <input
                      type='file'
                      onChange={onChangeImages}
                      className='file'
                      multiple
                    />
                  </div>
                </span>
                <ImageProduct
                  imagePreview={imagePreview}
                  imagesUpdate={productState.images}
                  match={props.match}
                  removeImage={removeImage}
                  setTag={setTags}
                  removeTag={removeTag}
                />
              </CardHeader>
              <Grid className={classes.cardContent}>{}</Grid>
            </Card>
          </GridItem>

          <hr
            id='test'
            style={{
              borderTop: '1px solid',
              width: '97%',
              borderColor: 'rgba(0, 0, 0, 0.23)',
            }}
          ></hr>
          {props.match !== undefined ? (
            <React.Fragment>
              <div
                id='buttonx'
                className='col-lg-6 col-sm-6 col-md-6 col-6 button-footer text-left'
              >
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    setShowModalDelete(true);
                  }}
                >
                  Xóa sản phẩm
                </button>
              </div>
            </React.Fragment>
          ) : (
            ''
          )}

          <div
            id='buttonx'
            className={`${
              props.match !== undefined
                ? 'col-lg-6 col-sm-6 col-md-6 col-6'
                : 'col-lg-12 col-sm-12 col-md-12'
            } button-footer text-right`}
          >
            <NavLink to={'/admin/product-list'} className='btn btn-white'>
              Hủy
            </NavLink>
            <button className='btn btn-primary' onClick={() => handleSubmit()}>
              Lưu
            </button>
          </div>
        </GridContainer>
        <DeleteModal
          show={showModalDelete}
          closeModal={clickCloseModal}
          confirm={confircmDelete}
          debt={10}
        />
      </Grid>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    productDetail: state.productReducer.productItem,
    createSuccess: state.statusReducer.stateAdd.createSuccess,
    faildSave: state.statusReducer.stateAdd.faildSave,
    afterCreate: state.statusReducer.stateAdd.afterCreate,
    brand: state.productReducer.brand,
    cate: state.productReducer.cate.category,
    tag: state.productReducer.tag,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProduct: (data) => {
      dispatch(addProductRequest(data));
    },
    delete: (id) => {
      dispatch(deleteProductRequest(id));
    },
    clearList: () => {
      dispatch(clearList());
    },
    updateProduct: (data, id) => {
      dispatch(updateProductRequest(data, id));
    },
    getOneProduct: (id) => {
      dispatch(getOneProductRequest(id));
    },
    setCreated: (data) => {
      dispatch(setSttCreateSuccess(data));
    },
    setFailSave: (data) => {
      dispatch(setSttFailSave(data));
    },
    setAfterCreate: (data) => {
      dispatch(setSttAfterCreate(data));
    },
    clearFilter: () => {
      dispatch(clearFilter());
    },
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
export default connect(mapStateToProps, mapDispatchToProps)(Create);
