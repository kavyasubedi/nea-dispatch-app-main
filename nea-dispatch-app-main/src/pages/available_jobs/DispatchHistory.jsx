import { Link } from "react-router-dom";
import PaginatedDataTable from "../../components/table/PaginatedDataTable";
export default function DispatchHistory() {
  const getEmployee = (item) => {
    return <>{item?.employee?.fullName}</>;
  };

  const getDipatch = (item) => {
    return (
      <>
        {item?.dispatch?.customerId}-{item?.dispatch?.customerName}
      </>
    );
  };
  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      name: "publicationDate",
      label: "Publication Date",
    },
    {
      type: "closure",
      label: "Employee",
      closure: getEmployee,
    },
    {
      type: "closure",
      label: "Dispatch",
      closure: getDipatch,
    },
    {
      name: "remark",
      label: "Remarks",
    },
  ];
  const pagination_prop = {
    title: "All Dispatch History",
    subTitle: "Admin Tools",
    api_end_point: "/dispatch-records",
    params: {},
    page: 1,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/edit-client/",
  };
  return (
    <>
      <div className="card p-2" style={{ minHeight: "87vh" }}>
        {/* <div
          className="card-header d-flex justify-content-end"
          style={{ border: "0", backgroundColor: "white" }}
        >
          <Link to="/create-dispatch-record" className="text-decoration-none">
            <button className="primaryButton">Create Dispatch Record</button>
          </Link>
        </div> */}
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  );
}
