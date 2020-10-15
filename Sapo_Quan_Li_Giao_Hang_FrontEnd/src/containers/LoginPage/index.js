import React, { useState } from "react";
import {
  Grid,
  Container,
  Button,
  Typography,
  TextField,
  Link,
} from "@material-ui/core";
import useStyles from "./styles";
import { connect } from "react-redux";
import { login, loginThunk } from "./../../redux/actions/auth";
import logo from "../../assets/image/logo_sapo.svg";
import fb from "../../assets/image/facebook-8-1-2020.svg";
import google from "../../assets/image/gp-btn.svg";
import { useForm } from "react-hook-form";
function LoginPage({ login }) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [sateUser, setSateUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSateUser({ ...sateUser, [name]: value });
  };
  const onSubmit = (data) => {
    
    login(data);
  };
  return (
    <Grid className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid
            lg={10}
            md={10}
            sm={10}
            xs={12}
            className={classes.loginWarpper}
            item
          >
            <Grid className={classes.areaLogin}>
              <Grid lg={6} md={6} sm={12} xs={12}>
                <form
                  name="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className={classes.formLogin}
                >
                  <Grid className={classes.divlogo}>
                    <img src={logo} alt="" className={classes.logo}></img>
                  </Grid>
                  <TextField
                    onChange={(e) => handleChange(e)}
                    inputRef={register({ required: true })}
                    label="Email"
                    name="email"
                    variant="outlined"
                    style={{ width: "100%", margin: "20px 0px" }}
                  />
                  {errors.email && "email is required."}
                  <TextField
                    onChange={(e) => handleChange(e)}
                    inputRef={register({ required: true })}
                    type="password"
                    name="password"
                    label="Mật khẩu"
                    variant="outlined"
                    style={{ width: "100%", margin: "20px 0px" }}
                  />
                  {errors.password && "password is required."}
                  <Grid className={classes.div_action_login}>
                    <Button className={classes.btn_login} type="submit">
                      Đăng nhập
                    </Button>
                  </Grid>
                  <Grid className={classes.div_action_register}>
                    <Typography variant="inherit" className={classes.tit}>
                      <Typography
                        variant="inherit"
                        align="center"
                        className={classes.tit_item}
                      >
                        Hoặc đăng ký
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="body1" align="center">
                      Bạn chưa có tài khoản ?{" "}
                      <Link style={{ cursor: "pointer" }}>Đăng ký tại đây</Link>
                    </Typography>
                    <Typography align="center">
                      <Link style={{ cursor: "pointer" }}>Quên mật khẩu</Link>
                    </Typography>
                  </Grid>
                  <Grid style={{ textAlign: "center", marginTop: 20 }}>
                    <Typography variant="body1" style={{ marginBottom: 10 }}>
                      Hoặc đăng nhập bằng
                    </Typography>
                    <Link className={classes.loginmore}>
                      <img
                        src={fb}
                        alt=""
                        style={{ width: 125, height: 37 }}
                      ></img>
                    </Link>
                    <Link className={classes.loginmore}>
                      <img
                        src={google}
                        style={{ width: 125, height: 37 }}
                        alt=""
                      ></img>
                    </Link>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (data) => {
      dispatch(loginThunk(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(LoginPage);
