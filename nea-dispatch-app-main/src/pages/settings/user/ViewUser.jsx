import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginatedDataTable from "../../../components/table/PaginatedDataTable";
import api from "../../../Axios";

export default function ViewUser() {
  //   const [notSyncedEmployee, setNotSyncedEmployee] = useState(0);
  //   const checkSync = () => {
  //     api
  //       .get("/v1/payroll/employee-check")
  //       .then((res) => {
  //         setNotSyncedEmployee(res.data);
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         alert("Error Occurred");
  //         console.log(err);
  //       });
  //   };

  //   useEffect(() => {
  //     checkSync();
  //   }, []);
  //   const syncEmployee = () => {
  //     api
  //       .get("/v1/payroll/employee-sync")
  //       .then((res) => {
  //         checkSync();
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  function fetchData() {
    api
      .get("/admin/users")
      .then((res) => {
        const fetchedData = res.data;
        // Process fetched data as needed, reorganize it based on columns
        // setData(reorganizedData);
        console.log("Data:", res.data);
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchData();

    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, []);
  const columns = [
    // Define your columns as needed
    // Example:

    {
      name: "id",
      label: "id",
    },
    {
      name: "firstName",
      label: "First Name",
    },
    {
      name: "lastName",
      label: "Last Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "imageUrl",
      label: "imageUrl",
    },
    {
      name: "createdBy",
      label: "Created By",
    },
    {
      name: "authorities",
      label: "Authorities",
    },
    {
      // name:"Action",
      label: "Action",
      type: "closure",
      closure: (item) => (
        <>
          <Link
            className="text-decoration-none me-2"
            to={"/user-edit/" + item.login}
          >
            <button className="warningButton">Edit</button>
          </Link>
        </>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const pagination_prop = {
    title: "Users",
    subTitle: "Admin Tools",
    api_end_point: "/admin/users",
    params: {},
    page: 1,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/user-edit/",
  };
  return (
    <>
      <div className="card p-2" style={{ minHeight: "87vh" }}>
        <div
          className="card-header d-flex justify-content-end gap-2"
          style={{ border: "0", backgroundColor: "white" }}
        >
          {/* <button className="primaryButton" onClick={(e) => syncEmployee()}>
            Sync Employee
          </button> */}

          <Link to="/user-create" className="text-decoration-none">
            <button className="primaryButton">Add User</button>
          </Link>
        </div>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
          {/* <SimpleTable columns={columns} data={data} /> */}
        </div>
      </div>
    </>
  );
}
