import React, { useState } from "react";
import Base from "../../Base/Base";
import Card from "@mui/material/Card";
import {
  Button,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

// form validation
export const filedValidationScheme = yup.object({
  name: yup.string().required("Please fill your name"),
  email: yup.string().required("Please fill your email"),
  password: yup.string().required("Please fill password"),
});
const Login = () => {
  const history = useHistory();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: filedValidationScheme,
      onSubmit: (userInfo) => {
        console.log("onsubmit", userInfo.name);
        handleLogin(userInfo);
      },
    });
  // ---------------------------------------------------------------------------------------------------------------------------------------
  // pop-up message
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    history.push("/DashBoard");
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        close
      </IconButton>
    </React.Fragment>
  );
  // pop-up end------------------------------------------------------------------------------------------------------------------------
  const handleLogin = async (userInfo) => {
    const res = await fetch(
      `https://url-shortener-backened.vercel.app/users/login`,
      {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.data.token) {
      toast(data.message, {
        type: "success",
        position: toast.POSITION.TOP_CENTER,
      });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("id", data.data.user._id);
      localStorage.setItem("user", data.data.user.email);
      // console.log(data.data.user);
      // console.log(userInfo);
      handleClick();
    } else {
      toast(data.message, {
        type: "error",
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <Base title={"Login To Your Account"}>
      <div className="container">
        <Card sx={{ p: "10px" }} className="Bg-color container">
          <div className="bg">
            <h3 className="sub_heading">Don't have an account?</h3>
            <Button
              className="button-Bg"
              onClick={() => history.push("/SignIn")}
              variant="outlined"
            >
              Register
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <CardContent>
              <h2 className="heading">For Existing Users</h2>
              <TextField
                sx={{ width: "300px" }}
                id="standard-basic"
                variant="standard"
                label="Enter Name"
                name="name"
                type="name"
                size="small"
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
              />
              <div style={{ color: "crimson", fontSize: "small" }}>
                {touched.name && errors ? errors.name : ""}
              </div>
            </CardContent>
            <CardContent>
              <TextField
                sx={{ width: "300px" }}
                label="Email"
                name="email"
                id="standard-basic"
                variant="standard"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                type="email"
                size="small"
              />
              <div style={{ color: "crimson", fontSize: "small" }}>
                {touched.email && errors ? errors.email : ""}
              </div>
            </CardContent>

            <CardContent>
              <TextField
                sx={{ width: "300px" }}
                id="standard-basic"
                variant="standard"
                type="password"
                label="Password"
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                size="small"
              />
              <div style={{ color: "crimson", fontSize: "small" }}>
                {touched.password && errors ? errors.password : ""}
              </div>
            </CardContent>
            <div className="forget-password">
              <p>Forget password?</p>
            </div>
            <div className="button">
              <Button className="button-Bg" type="submit" variant="outlined">
                Login
              </Button>
            </div>
          </form>
        </Card>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Login Successfully"
          action={action}
        />
      </div>
    </Base>
  );
};

export default Login;
