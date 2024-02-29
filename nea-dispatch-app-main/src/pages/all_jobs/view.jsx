import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewPopUp from "./components/ViewPopUp";
import CustomDataTableV3 from "../../components/table/CutomDataTableV3";
import AddEmployeePopUp from "./components/AddEmployeePopUp";
import api from "../../Axios";
export default function AllJobs() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    expired: "",
    issued: "",
    branch: "",
  });
  const [branchData, setBranchData] = useState([]);

  function fetchBranchData() {
    api
      .get("/branches")
      .then((res) => {
        // Process fetched data as needed, reorganize it based on columns
        setBranchData(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchBranchData();
  }, []);
  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  function fetchData() {
    const { from, to, status, expired, issued, branch } = filters;
    const requestData = {
      columns: { from, to, status, expired, issued, branch },
    };
    api
      .post("/v1/dispatch?size=10", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [filters]);

  const myStatus = (item) => {
    return (
      <>
        {item.status},
        {item.dispatchRecords.map((val, index) => (
          <div key={val.id}>
            {index === item.dispatchRecords.length - 1 && (
              <p>Last item status: {val.status}</p>
            )}
          </div>
        ))}
      </>
    );
  };

  const myView = (item) => (
    <div className="d-flex gap-1">
      <Link to={"/edit-job/" + item.id} className="text-decoration-none">
        <button className="warningButton">Edit</button>
      </Link>
      <ViewPopUp
        title="View"
        buttonType="primaryButton m-0"
        data={item.dispatchRecords}
      />
      <AddEmployeePopUp
        title="Assign Job"
        buttonType="primaryButton"
        componentId={item.id}
      />
    </div>
  );
  const myBranch = (item) => {
    return <>{item?.branch?.name}</>;
  };
  const columns = [
    {
      name: "id",
      label: "ID",
      sortable: true,
    },
    {
      type: "closure",
      label: "Branch",
      closure: myBranch,
      sortable: true,
    },
    {
      name: "customerName",
      label: "Customer Name",
      sortable: true,
    },
    {
      name: "customerId",
      label: "Customer Id",
      sortable: true,
    },
    {
      name: "contactNo",
      label: "Contact No",
      sortable: true,
    },
    {
      name: "regDate",
      label: "Reg Date",
      sortable: true,
    },
    {
      name: "complain",
      label: "Complain",
      sortable: true,
    },
    {
      name: "remark",
      label: "Remark",
      sortable: true,
    },
    {
      type: "closure",
      label: "Status",
      closure: myStatus,
      sortable: false,
    },
    {
      name: "location",
      label: "Location",
      sortable: false,
    },
    {
      type: "closure",
      label: "Action",
      closure: myView,
      sortable: false,
    },
  ];
  const pagination_prop = {
    title: "All Jobs",
    headers: columns,
    data: data,
    viewLink: "view-client",
    editLink: "/edit-job/",
    deleteLink: "/dispatches/",
  };
  return (
    <>
      <div className="card p-2" style={{ minHeight: "87vh" }}>
        <div
          className="card-header d-flex justify-content-end d-flex gap-2"
          style={{ border: "0", backgroundColor: "white" }}
        >
          <Link to="/add-job" className="text-decoration-none">
            <button className="primaryButton">Add Job</button>
          </Link>
        </div>
        <div className="mb-4 px-4 row d-flex justify-content-end align-items-end">
          <div className="col-6 mb-2 mb-md-0 col-md-2">
            <label className="fw-semibold">Select Start Date</label>
            <input
              type="date"
              className="form-control form-control-md"
              name="from"
              id="from"
              aria-describedby="helpId"
              placeholder="From"
              onChange={handleFilter}
            />
          </div>
          <div className="col-6 mb-2 mb-md-0 col-md-2">
            <label className="fw-semibold">Select End Date</label>
            <input
              type="date"
              className="form-control form-control-md"
              name="to"
              id="to"
              aria-describedby="helpId"
              placeholder="To"
              onChange={handleFilter}
            />
          </div>
          <div className="col-6 mb-2 mb-md-0 col-md-2">
            <label className="fw-semibold">Select Status</label>
            <select
              className="form-control form-select"
              name="status"
              onChange={handleFilter}
            >
              <option value="">Select Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="col-6 mb-2 mb-md-0 col-md-2">
            <label className="fw-semibold">Select Branch</label>
            <select
              className="form-control form-select"
              name="branch"
              onChange={handleFilter}
            >
              <option value="">Select Branch</option>
              {branchData.map((option) => (
                <option key={option.id} value={JSON.stringify(option.id)}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 mb-2 mb-md-0 col-md-2">
            <label className="fw-semibold">Expired</label>
            <select
              className="form-control form-select"
              name="expired"
              onChange={handleFilter}
            >
              <option value="">Select Option</option>
              <option value="True">Expired</option>
            </select>
          </div>
          <div className="col-6 mb-2 mb-md-0 col-md-2">
            <label className="fw-semibold">Issued</label>
            <select
              className="form-control form-select"
              name="issued"
              onChange={handleFilter}
            >
              <option value="">Select Option</option>
              <option value="True">Issued</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          {/* <PaginatedDataTable {...pagination_prop}></PaginatedDataTable> */}
          <CustomDataTableV3 {...pagination_prop}></CustomDataTableV3>
        </div>
      </div>
    </>
  );
}
