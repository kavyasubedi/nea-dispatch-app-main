import { Link } from "react-router-dom";
import PaginatedDataTable from "../../components/table/PaginatedDataTable";
import UpdateJobsPopUp from "./components/UpdateJobsPopUp";

export default function MyJobs() {
  const myView = (item) => (
    <UpdateJobsPopUp
      title="Update Job"
      buttonType="primaryButton"
      componentId={item}
    />
  );

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
  const pagination_prop = {
    title: "Jobs Assigned To Me",
    subTitle: "Employee Tools",
    api_end_point: "/dispatches/my-jobs",
    params: {},
    page: 1,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/edit-client/",
  };
  const pagination_prop_area = {
    title: "My Available Jobs",
    subTitle: "Employee Tools",
    api_end_point: "/dispatches/my-available-jobs",
    params: {},
    page: 1,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/edit-client/",
  };
  return (
    <>
      <div className="card p-2 m-2">
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop_area}></PaginatedDataTable>
        </div>
      </div>
      <div className="card p-2 m-2">
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  );
}
