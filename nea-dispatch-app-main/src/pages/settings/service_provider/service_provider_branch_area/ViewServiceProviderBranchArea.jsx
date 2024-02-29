import React from 'react'
import { Link } from "react-router-dom";
import PaginatedDataTable from '../../../../components/table/PaginatedDataTable';

export default function ViewServiceProviderBranchArea() {



  const columns = [
    // Define your columns as needed
    // Example:

    {
      name: "name",
      label: "Name",
    },
    {
      name: "code",
      label: "Code",
    },
    {
      name: "details",
      label: "Details",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      name: "employee",
      label: "employee",
    },
    {
      name: "edit",
      label: "Action",
    },


  ];
  const pagination_prop = {
    title: "Area",
    subTitle: "Admin Tools",
    api_end_point: "/areas",
    params: {},
    page: 1,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/service-provider-branch-area-edit/",
  };
  return (
    <>

      <div className="card p-2" style={{ minHeight: '87vh' }}>
        <div className="card-header d-flex justify-content-end" style={{ border: '0', backgroundColor: 'white' }}>
          <Link to="/service-provider-branch-area-create" className='text-decoration-none'>
            <button className='primaryButton'>Add Area</button>
          </Link>
        </div>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  )
}
