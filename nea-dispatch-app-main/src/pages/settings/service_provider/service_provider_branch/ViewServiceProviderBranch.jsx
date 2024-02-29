import React from "react";
import { Link } from "react-router-dom";
import PaginatedDataTable from "../../../../components/table/PaginatedDataTable";

export default function ViewServiceProviderBranch() {
  const columns = [
    // Define your columns as needed
    // Example:

    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Branch Name",
    },
    {
      name: "code",
      label: "Branch Code",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      name: "edit",
      label: "Action",
    },
  ];
  const pagination_prop = {
    title: "Branches",
    subTitle: "Admin Tools",
    api_end_point: "/branches",
    params: {},
    page: 0,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/service-provider-branch-edit/",
  };
  return (
    <>
      <div className="card p-2" style={{ minHeight: "87vh" }}>
        <div
          className="card-header d-flex justify-content-end"
          style={{ border: "0", backgroundColor: "white" }}
        >
          <Link
            to="/service-provider-branch-create"
            className="text-decoration-none"
          >
            <button className="primaryButton">Add Branch</button>
          </Link>
        </div>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  );
}
