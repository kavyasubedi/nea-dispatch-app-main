import { Link } from "react-router-dom";
import PaginatedDataTable from "../../components/table/PaginatedDataTable";
import AddEmployeePopUp from "./components/AddEmployeePopUp";
import ViewPopUp from "../all_jobs/components/ViewPopUp";

export default function AvailableJobs() {
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

  const myAssignee = (item) => {
    return <>{item?.assignedTo?.fullName}</>;
  };
  const myStatus = (item) => {
    return (
      <>
        {item.status},
        {item.dispatchRecords.map((val, index) => (
          <div key={val.id}>
            {index === item.dispatchRecords.length - 1 && (
              <p>Last item status: {val.status}</p>
            )}
            {/* Additional rendering for other properties if needed */}
          </div>
        ))}
      </>
    );
  };
  const myBranch = (item) => {
    console.log(item.branch);
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
  const closed_job_columns = [
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
      label: "Assigned To",
      closure: myAssignee,
    },
    {
      name: "publicationDate",
      label: "Publication Date",
    },
    {
      type: "closure",
      label: "Action",
      closure: myView,
    },
  ];
  const pagination_prop = {
    title: "Available Jobs",
    subTitle: "Employee Tools",
    api_end_point: "/dispatches/available-jobs",
    params: {},
    page: 0,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/edit-job/",
  };
  const pagination_closedJob_prop = {
    title: "Closed Jobs",
    subTitle: "Employee Tools",
    api_end_point: "/dispatches/closed-jobs",
    params: {},
    page: 0,
    size: 10,
    columns: closed_job_columns,
    viewLink: "view-client",
    editLink: "/edit-job/",
  };
  return (
    <>
      <div className="card p-2" style={{ minHeight: "87vh" }}>
        {/* <div
          className="card-header d-flex justify-content-end d-flex gap-2"
          style={{ border: "0", backgroundColor: "white" }}
        >
          <Link to="/add-job" className="text-decoration-none">
            <button className="primaryButton">Add Job</button>
          </Link>
          <Link to="/update-available-job/1" className="text-decoration-none">
            <button className="primaryButton">Update Job</button>
          </Link>
          <Link to="/add-job" className="text-decoration-none">
            <button className="primaryButton">Edit Job</button>
          </Link>
        </div> */}
        <div className="card-header bg-light d-flex justify-content-end">
          <Link to="/add-job" className="text-decoration-none">
            <button className="primaryButton">Add Job</button>
          </Link>
        </div>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
        <div className="card-body">
          <PaginatedDataTable
            {...pagination_closedJob_prop}
          ></PaginatedDataTable>
        </div>
      </div>
    </>
  );
}
