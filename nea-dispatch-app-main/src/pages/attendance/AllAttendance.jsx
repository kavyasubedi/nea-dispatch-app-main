import PaginatedDataTable from "../../components/table/PaginatedDataTable";
import ShowImg from "../../components/ShowImg";
const myEmployee = (item) => {
  return <>{item?.employee?.fullName}</>;
};
const myArea = (item) => {
  return <>{item?.employee?.areas?.map((val) => val.name) || ""}</>;
};
const meterDifference = (item) => {
  return <>{parseInt(item.checkOutMeter) - parseInt(item.checkInMeter)}</>;
};
export default function AllAttendance() {
  const columns = [
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
      type: "closure",
      label: "Area",
      closure: myArea,
    },
    {
      type: "closure",
      name: "checkInMeterPicContentType",
      label: "Check InMeter Pic",
      closure: (item) => <ShowImg src={item.checkInMeterPicContentType} />,
    },
    {
      type: "closure",
      name: "checkOutMeterPicContentType",
      label: "Check Out Meter Pic",
      closure: (item) => <ShowImg src={item.checkOutMeterPicContentType} />,
    },
    {
      name: "checkIn",
      label: "Check In",
    },
    {
      name: "checkOut",
      label: "Check Out",
    },
    {
      name: "checkInMeter",
      label: "Check In Meter(KM)",
    },
    {
      name: "checkOutMeter",
      label: "check Out Meter(KM)",
    },
    {
      type: "closure",
      label: "Meter Difference(KM)",
      closure: meterDifference,
    },
    {
      name: "publicationDate",
      label: "Publication Date",
    },
  ];
  const pagination_prop = {
    title: "All Attendance",
    subTitle: "Admin Tools",
    api_end_point: "/attendances",
    params: {},
    page: 0,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/edit-job/",
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
