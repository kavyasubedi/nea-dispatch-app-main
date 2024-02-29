import React from 'react'
import { Link } from "react-router-dom";
import PaginatedDataTable from '../../../../components/table/PaginatedDataTable';

export default function ViewServiceProviderBranchOlt() {



  const columns = [
    // Define your columns as needed
    // Example:

    {
      name: "name",
      label: "Name",
    },
    {
      name: "detail",
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
    title: "OLT",
    subTitle: "Admin Tools",
    api_end_point: '/olts',
    params: {},
    page: 0,
    size: 10,
    columns: columns,
    viewLink: 'view-client',
    editLink: "service-provider-branch-olt-edit",
  }
  return (
    <>

      <div className="card p-2" style={{ minHeight: '87vh' }}>
        <div className="card-header d-flex justify-content-end" style={{ border: '0', backgroundColor: 'white' }}>
          <Link to="/service-provider-branch-olt-create" className='text-decoration-none'>
            <button className='primaryButton'>Add OLT</button>
          </Link>
        </div>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  )
}
