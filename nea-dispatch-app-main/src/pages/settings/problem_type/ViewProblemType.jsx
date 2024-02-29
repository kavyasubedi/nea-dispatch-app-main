import React from 'react'
import { Link } from "react-router-dom";
import PaginatedDataTable from '../../../components/table/PaginatedDataTable';

export default function ViewProblemType() {



  const columns = [
    // Define your columns as needed
    // Example:

    {
      name: "id",
      label: "ID",
    },
    {
      name: "problem_type_name",
      label: "Problem Type Name",
    },
    {
      name: "edit",
      label: "Action",
    },


  ];
  const pagination_prop = {
    title: "Problem Types",
    subTitle: "Admin Tools",
    api_end_point: '/service-providers/',
    params: { status: 'approved' },
    page: 0,
    size: 10,
    columns: columns,
    viewLink: 'view-client',
    editLink: "/edit-client/",
  }
  return (
    <>

      <div className="card p-2" style={{ minHeight: '87vh' }}>
        <div className="card-header d-flex justify-content-end" style={{ border: '0', backgroundColor: 'white' }}>
          <Link to="/problem-types-create" className='text-decoration-none'>
            <button className='primaryButton'>Add Problem Type</button>
          </Link>
        </div>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  )
}
