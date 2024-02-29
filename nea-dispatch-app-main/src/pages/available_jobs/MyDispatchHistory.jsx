import PaginatedDataTable from "../../components/table/PaginatedDataTable";
export default function MyDispatchHistory() {
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
    title: "My Dispatch History",
    subTitle: "Employee Tools",
    api_end_point: "/dispatch-records/my-records",
    params: {},
    page: 0,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/edit-client/",
  };
  return (
    <>
      <div className="card p-2" style={{ minHeight: "87vh" }}>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  );
}
