import React, { useState } from "react";
import { Grid, Link } from "@material-ui/core";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader/CardHeader.js";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import * as types from "./styles";
import { NavLink } from "react-router-dom";
import CKEditor from "react-ckeditor-component";
import ImageUploader from "react-images-upload";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";


function Update(props) {
  
  const classes = types.useStyles();
  const CusTextField = types.CusTextField;
  const CusRightTextField = types.CusRightTextField;
  const [sateSubmitted, setSateSubmitted] = useState(false);
  const [editorStatus, setEditorStatus] = useState(false);
  const [pictures, setPictures] = useState([]);

  const [productState, setProductState] = useState({
    id: "",
    code: "",
    name: "",
    barcode: "",
    publisher_id: "",
    category_id: "",
    price_import: 0,
    price_wholesale: 0,
    price_retail: 0,
    description: "",
  });

  const handleChange = (event) => {
    let name = "";
    let value = "";
    if (event.editor) {
      name = "description";
      value = event.editor.getData();
    } else {
      name = event.target.name;
      value = event.target.value;
    }
    setProductState({ ...productState, [name]: value });
  };
  console.log(productState);
  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  };
  const handleSubmit = () => {
    setSateSubmitted(true);
    if (productState.code && productState.name && productState.publisher_id && productState.category_id) {
     
    }
  };

  return (
    <Grid className={classes.root}>
      <NavLink to={"/admin/product"}>
        <ChevronLeftIcon />
        Quay lại danh sách sản phẩm
      </NavLink>
      <Grid>
        <h3 className={classes.title}>Cập nhật sản phẩm</h3>
        <Link className={classes.add_product} onClick={()=>handleSubmit()}> Lưu</Link>
        <Link className={classes.add_cancle}> Hủy</Link>
      </Grid>

      <GridContainer>
        <GridItem md={8} lg={8}>
          <Card>
            <CardHeader>
              <h4 className={classes.product_title}>Thông tin sản phẩm</h4>
            </CardHeader>
            <Grid className={classes.cardContent}>
              <CusTextField 
                id="outlined-basic"
                label={
                  <p className={classes.name}>
                    Tên sản phẩm <span style={{ color: "red" }}>*</span>
                  </p>
                }
                name="name"
                onChange={(e) => handleChange(e)}
                value={productState.name}
                fullWidth
                variant="outlined"
              />
              {sateSubmitted && !productState.name && (
                <div
                  className="help-block"
                  style={{ color: "#a94442", margin: "5px 0px" }}
                >
                  Tên sản phẩm không để trống
                </div>
              )}
              <Grid container spacing={4} style={{ marginTop: 10 }}>
                <Grid item md={6} lg={6}>
                  <CusTextField
                    id="outlined-basic"
                    label="Mã sản phẩm"
                    name="code"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    value={productState.code}
                    variant="outlined"
                  />
                   {sateSubmitted && !productState.code && (
                <div
                    className="help-block"
                    style={{ color: "#a94442", margin: "5px 0px" }}
                  >
                    Mã sản phẩm không để trống
                  </div>
                )}
                </Grid>
               
                <Grid item md={6} lg={6}>
                  <CusTextField
                    id="outlined-basic"
                    label="Barcode"
                    name="barcode"
                    value={productState.barcode}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid className={classes.editor}>
                <Link
                  onClick={() => setEditorStatus(!editorStatus)}
                  className={classes.description}
                >
                  {!editorStatus ? "Thêm mô tả" : "Ẩn mô tả"}
                </Link>
                {editorStatus ? (
                  <CKEditor
                    activeClass="p10"
                    content={productState.description}
                    events={{
                      change: (e) => handleChange(e),
                    }}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Card>
          <Card>
            <CardHeader>
              <h4 className={classes.product_title}>Giá sản phẩm</h4>
            </CardHeader>
            <Grid className={classes.cardContent}>
              <Grid container spacing={4}>
                <Grid item md={6} lg={6}>
                  <CusRightTextField
                    id="outlined-basic"
                    label="Giá bán lẻ "
                    type="number"
                    name="price_retail"
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    value={productState.price_retail}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ fontSize: 14 }}
                        >
                          ₫
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} lg={6}>
                  <CusRightTextField
                    id="outlined-basic"
                    label="Giá bán buôn "
                    name="price_wholesale"
                    onChange={(e) => handleChange(e)}
                    value={productState.price_wholesale}
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ fontSize: 14 }}
                        >
                          ₫
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item md={6} lg={6}>
                  <CusRightTextField
                    id="outlined-basic"
                    label="Giá bán nhập "
                    type="number"
                    name="price_import"
                    onChange={(e) => handleChange(e)}
                    value={productState.price_import}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ fontSize: 14 }}
                        >
                          ₫
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} lg={6}></Grid>
              </Grid>
            </Grid>
          </Card>
        </GridItem>
        <GridItem md={4} lg={4}>
          <Card>
            <CardHeader>
              <h4 className={classes.product_title}>Phân loại</h4>
            </CardHeader>
            <Grid className={classes.cardContent}>
              <CusTextField
                id="outlined-select-currency"
                select
                label="Loại sản phẩm"
                fullWidth
                name="category_id"
                value={productState.category_id}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              >

             
              </CusTextField>
              {sateSubmitted && !productState.category_id && (
                <div
                  className="help-block"
                  style={{ color: "#a94442", margin: "5px 0px" }}
                >
                  Thể loại không để trống
                </div>
              )}
              <CusTextField
                style={{ marginTop: 20 }}
                id="outlined-select-currency"
                select
                label="Nhãn hiệu"
                fullWidth
                name="publisher_id"
                value={productState.publisher_id}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              >
               
              </CusTextField>
              {sateSubmitted && !productState.publisher_id && (
                <div
                  className="help-block"
                  style={{ color: "#a94442", margin: "5px 0px" }}
                >
                  Nhãn hiệu không để trống
                </div>
              )}
            </Grid>
          </Card>
          <Card>
            <CardHeader>
              <h4 className={classes.product_title}>Ảnh sản phẩm</h4>
            </CardHeader>
            <Grid className={classes.cardContent}>
              <ImageUploader
                withIcon={false}
                buttonText="Thêm ảnh"
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                onChange={onDrop}
                withPreview
                className={classes.upload}
                singleImage={true}
                fileContainerStyle={{
                  margin: 0,
                  border: "1px solid",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                }}
              />
            </Grid>
          </Card>
        </GridItem>

        <hr
          style={{
            borderTop: "1px solid",
            width: "97%",
            borderColor: "rgba(0, 0, 0, 0.23)",
          }}
        ></hr>
      </GridContainer>
    </Grid>
  );
}

export default connect(null, null)(Update)
