import PaginatedDataTable from "../../components/table/PaginatedDataTable.jsx";
export default function Index() {
  const userRole = localStorage.getItem("userRoles");
  const isAdmin = userRole?.includes("ROLE_ADMIN");
  const isUser = userRole && !isAdmin;
  const myEmployee = (item) => {
    return <>{item?.employee?.fullName}</>;
  };
  const getDipatch = (item) => {
    return (
      <>
        {item?.dispatch?.customerId}-{item?.dispatch?.customerName}
      </>
    );
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
  const dispatch_columns = [
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
  ];
  const dispatch_records_columns = [
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
      closure: myEmployee,
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
  const checkIn_columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      type: "closure",
      label: "Employee",
      closure: myEmployee,
    },
    {
      name: "checkIn",
      label: "Check In",
    },
  ];
  const checkOut_columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      type: "closure",
      label: "Employee",
      closure: myEmployee,
    },
    {
      name: "checkOut",
      label: "Check Out",
    },
  ];
  const closed_By_Employee_dispatch_pagination_prop = {
    title: "Closed By Employee Dispatch",
    subTitle: "",
    api_end_point: "/dispatches/closed-employee-jobs",
    params: {},
    page: 1,
    size: 10,
    columns: dispatch_columns,
    viewLink: "",
    editLink: "",
  };
  const expiring_dispatch_pagination_prop = {
    title: "Expiring Dispatch",
    subTitle: "",
    api_end_point: "/dispatches/expiring-jobs",
    params: {},
    page: 1,
    size: 10,
    columns: dispatch_columns,
    viewLink: "",
    editLink: "",
  };
  const dispatchRecord_pagination_prop = {
    title: "Today Job Records",
    subTitle: "",
    api_end_point: "/dispatch-records/today",
    params: {},
    page: 1,
    size: 10,
    columns: dispatch_records_columns,
    viewLink: "",
    editLink: "",
  };
  const checkIn_pagination_prop = {
    title: "Today CheckIn",
    subTitle: "",
    api_end_point: "/attendances/today-checkIn",
    params: {},
    page: 1,
    size: 10,
    columns: checkIn_columns,
    viewLink: "",
    editLink: "",
  };
  const checkOut_pagination_prop = {
    title: "Today CheckOut",
    subTitle: "",
    api_end_point: "/attendances/today-checkOut",
    params: {},
    page: 1,
    size: 10,
    columns: checkOut_columns,
    viewLink: "",
    editLink: "",
  };
  return (
    <>
      {isAdmin && (
        <div className="px-2">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <PaginatedDataTable
                    {...checkIn_pagination_prop}
                  ></PaginatedDataTable>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body">
                  <PaginatedDataTable
                    {...checkOut_pagination_prop}
                  ></PaginatedDataTable>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <PaginatedDataTable
                    {...dispatchRecord_pagination_prop}
                  ></PaginatedDataTable>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <PaginatedDataTable
                    {...expiring_dispatch_pagination_prop}
                  ></PaginatedDataTable>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <PaginatedDataTable
                    {...closed_By_Employee_dispatch_pagination_prop}
                  ></PaginatedDataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
