import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import CustomDataTable from '../../../../components/table/CustomDataTable'
import PaginatedDataTable from '../../../../components/table/PaginatedDataTable';
import api from '../../../../Axios';
import SimpleTable from '../../../../components/table/SimpleTable';

export default function ViewServiceProviderMain() {


  function fetchData() {
    api
      .get("/service-providers")
      .then((res) => {
        const fetchedData = res.data;
        // Process fetched data as needed, reorganize it based on columns
        // setData(reorganizedData);
        console.log("Data:", res.data);
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchData();

    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, []);
  const columns = [
    // Define your columns as needed
    // Example:

    {
      name: "id",
      label: "id",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "code",
      label: "Code",
    },
    {
      name: "phone",
      label: "Phone",
    },
    {
      name: "address",
      label: "Address",
    },
    {
      name: "edit",
      label: "Action",
    },



  ];

  const [data, setData] = useState([]);
  const pagination_prop = {
    title: "DC Branches",
    subTitle: "Admin Tools",
    api_end_point: "/service-providers",
    params: {},
    page: 1,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/service-provider-edit/",

  };

  return (
    <>

      <div className="card p-2" style={{ minHeight: '87vh' }}>
        <div className="card-header d-flex justify-content-end gap-2" style={{ border: '0', backgroundColor: 'white' }}>
          <Link to="/service-provider-create" className='text-decoration-none'>
            <button className='primaryButton'>Add DC Branch</button>
          </Link>
        </div>
        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  )
}
