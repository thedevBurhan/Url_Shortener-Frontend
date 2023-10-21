import React, { useEffect, useState } from "react";
import Base from "../../Base/Base";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import LogoutIcon from "@mui/icons-material/Logout";
import AddLinkIcon from "@mui/icons-material/AddLink";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const DashBoard = () => {
  const [url, setLongurl] = useState("");
  const [urls, setUrls] = useState([]);
  const [data, setData] = useState({});
  const history = useHistory();
  var setUser = localStorage.getItem("user");

  //  alert Function
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const getUrl = async () => {
    try {
      let y = window.localStorage.getItem("id");
      // console.log(y);
      let req = await axios.get(
        `https://url-shortener-backened.vercel.app/url/SpecificUser/${y}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      // console.log(localStorage.getItem("token"))
      const { data } = req;
      const { message, statusCode, urls } = data;
      // console.log(data)
      if (statusCode === 200) {
        setUrls(urls);
        // console.log(urls);
      } else {
        setData({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUrl();
  }, []);

  const handleDelete = async (id) => {
    // console.log(id)
    try {
      let req = await axios.delete(
        `https://url-shortener-backened.vercel.app/url/deleteUrl/${id}`,
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      const { message, statusCode } = data.data;
      // console.log(data);
      if (statusCode === 200) {
        getUrl();
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({ icon: "error", title: "Can't delete short URL" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleURL = async (e) => {
    e.preventDefault();
    try {
      let req = await axios.post(
        `https://url-shortener-backened.vercel.app/url/`,
        {
          id: window.localStorage.getItem("id"),
          url,
        },
        {
          headers: {
            authtoken: window.localStorage.getItem("token"),
          },
        }
      );
      const { data } = req;
      //  console.log(req);
      const { message, statusCode } = data;
      //  console.log(data);
      if (statusCode === 200) {
        getUrl();
        setLongurl("");
        Toast.fire({ icon: "success", title: message });
      } else {
        Toast.fire({ icon: "error", title: message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function redirects() {
    history.push("/");
  }
  return (
    <div>
      <div className="logOut">
        <Button
          sx={{
            color: "#c3c8dc",
          }}
          variant="text"
          onClick={() => redirects()}
        >
          <LogoutIcon />
          Logout{" "}
        </Button>
      </div>
      <Base title={"Put Your URL To get Shorten"}>
        <div className="input">
          <Input
            id="input-with-icon-adornment"
            name="text"
            type="text"
            value={url}
            onChange={(e) => setLongurl(e.target.value)}
            placeholder="Enter your long url... "
            startAdornment={
              <InputAdornment position="start">
                <AddLinkIcon />
              </InputAdornment>
            }
          />

          <Button
            sx={{
              color: "white",
            }}
            variant="text"
            type="submit"
            onClick={handleURL}
          >
            Shorten URL
          </Button>
        </div>
        <h3 className="heading">User: {setUser}</h3>
        <Card sx={{ p: "0.5px" }} className="Bg-color container">
          <div className="user-table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="heading">
                    <TableCell style={{ color: "#666F80" }}>S.No</TableCell>
                    <TableCell style={{ color: "#666F80" }}>Long URL</TableCell>
                    <TableCell style={{ color: "#666F80" }}>
                      Short URL
                    </TableCell>
                    <TableCell style={{ color: "#666F80" }}>
                      Total Click
                    </TableCell>
                    <TableCell style={{ color: "#666F80" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urls.length > 0 && urls ? (
                    urls.length > 0 &&
                    urls.map((item, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>

                          <TableCell>
                            <a
                              href={item.redirectURL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.redirectURL}
                            </a>
                          </TableCell>

                          <TableCell style={{ color: "rgb(36,164,242)" }}>
                            <a
                              href={`https://url-shortener-backened.vercel.app/${item.shortID}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.shortID}
                            </a>
                          </TableCell>

                          <TableCell align="center">
                            {item.visitHistory.length}
                          </TableCell>

                          <TableCell>
                            <button
                              className="button-Bg"
                              onClick={() => handleDelete(item._id)}
                            >
                              <DeleteOutlineIcon />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <div className="message">
                      {" "}
                      <h4
                        style={{
                          color: "rgb(99,102,241)",
                          fontFamily: "monospace",
                        }}
                      >
                        {" "}
                        No Data To BE shown
                      </h4>{" "}
                    </div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Card>
      </Base>
    </div>
  );
};

export default DashBoard;
