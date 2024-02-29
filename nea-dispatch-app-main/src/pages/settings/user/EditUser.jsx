import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import EditUserPage from "./navtabs-components/EditUser";
import CreateEmployee from "./navtabs-components/CreateEmployee";
import UploadDocument from "./navtabs-components/UploadDocument";
import AddEmployeeAreas from "./navtabs-components/AddEmployeeAreas";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../../Axios.jsx";
import { set } from "../../../store/dataSlice.js";

function TabPanel(props) {
  const { login } = useParams();
  const { children, value, index, ...other } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    api
      .get("/enums/statuses")
      .then((res) => {
        dispatch(
          set({
            enumStatuses: Object.entries(res.data).map(([id, value]) => ({
              id,
              value,
            })),
          })
        );
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    api
      .get(`admin/users/${login}`)
      .then((res) => {
        dispatch(set({ user: res.data }));
      })
      .catch((e) => console.log(e));
  }, [login]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

export default function EditUser() {
  const [value, setValue] = useState(0); // State to manage selected tab
  const data = useSelector((state) => state.data.data);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        User
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Edit User" />
        <Tab label="Employee Details" />
        {data.user && data.user.employee
          ? // eslint-disable-next-line react/jsx-key
            [<Tab label="Upload Documents" />, <Tab label="Branch Details" />]
          : ""}
      </Tabs>

      <TabPanel value={value} index={0}>
        <div
          className="card-header h5 fw-semibold text-center"
          style={{ backgroundColor: "white" }}
        >
          Edit User
        </div>
        <div className="card-body d-flex justify-content-center p-0 m-0">
          <div
            className="container-fluid row p-0 m-0"
            style={{ maxWidth: "1400px" }}
          >
            <EditUserPage />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div
          className="card-header h5 fw-semibold text-center"
          style={{ backgroundColor: "white" }}
        >
          Employee Details
        </div>
        <div className="card-body d-flex justify-content-center p-0 m-0">
          <div
            className="container-fluid row p-0 m-0"
            style={{ maxWidth: "1400px" }}
          >
            <CreateEmployee />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div
          className="card-header h5 fw-semibold text-center"
          style={{ backgroundColor: "white" }}
        >
          Upload Data
        </div>
        <div className="card-body d-flex justify-content-center p-0 m-0">
          <div
            className="container-fluid row p-0 m-0"
            style={{ maxWidth: "1400px" }}
          >
            <UploadDocument />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div
          className="card-header h5 fw-semibold text-center"
          style={{ backgroundColor: "white" }}
        >
          Branch Details
        </div>
        <div className="card-body d-flex justify-content-center p-0 m-0">
          <div
            className="container-fluid row p-0 m-0"
            style={{ maxWidth: "1400px" }}
          >
            <AddEmployeeAreas />
          </div>
        </div>
      </TabPanel>
    </div>
  );
}
