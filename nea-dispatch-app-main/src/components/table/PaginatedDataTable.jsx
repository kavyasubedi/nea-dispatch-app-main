import React, { useEffect, useState } from "react";
import api from "../../Axios";
import { Link } from "react-router-dom";
import { AiFillEye, AiOutlinePlusSquare } from "react-icons/ai";
import { FaFileExport, FaRegEdit } from "react-icons/fa";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { toast } from "react-toastify";
const PaginatedDataTable = ({
  title,
  subTitle,
  api_end_point,
  params,
  page,
  size,
  columns,
  viewLink,
  editLink,
  deleteLink,
  refresh,
}) => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [total, setTotal] = useState(0);

  const [keyword, setKeyword] = useState("");

  const handleExport = () => {
    const header = columns.map((column) => column.label).join(",");
    const csv = [header];

    data.forEach((row) => {
      const values = columns.map((column) => {
        const cellData = row[column[name]];
        // Wrap cell data in quotes to handle commas and ensure correct CSV formatting
        return typeof cellData === "string" && cellData.includes(",")
          ? "${cellData}"
          : cellData;
      });
      csv.push(values.join(","));
    });

    const csvContent = csv.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchData = (params) => {
    params.page = parseInt(currentPage) - 1;
    params.size = size;

    api
      .get(api_end_point, { params })
      .then((res) => {
        setData(res.data);
        if (res.headers["x-total-count"]) {
          setTotal(parseInt(res.headers["x-total-count"]));
        }

        const options = [];
        if (!size) {
          setPages([
            <option key={1} disabled={true} value={1}>
              {" "}
              Page 1
            </option>,
          ]);
        } else if (size > 0 && parseInt(res.headers["x-total-count"]) > 0) {
          for (
            let i = 1;
            i <= Math.ceil(parseInt(res.headers["x-total-count"]) / size);
            i++
          ) {
            options.push(
              <option key={i} value={i}>
                {" "}
                Page {i}
              </option>
            );
          }
          setPages(options);
        } else {
          setPages([
            <option key={1} disabled={true} value={1}>
              {" "}
              Page 1
            </option>,
          ]);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          // Access the error message from the server response
          const errorMessage = error.response.data.detail;
          console.log(errorMessage);
          const regex = /\"(.*?)\"/;
          const extractedText = errorMessage.match(regex)[1];
          // Handle the error message as needed
          toast.warning(extractedText);
        } else {
          // Handle other types of errors
          toast.error("An error occurred.");
        }
      });
  };

  useEffect(() => {
    fetchData(params);
  }, [currentPage, refresh]);

  useEffect(() => {
    setCurrentPage(1);
    params.keyword = keyword;
    fetchData(params);
  }, [keyword]);

  const getData = (x, data) => {
    if (x && typeof x === "string" && x.includes(".")) {
      const keys = x.split(".");
      return keys.reduce((acc, key) => acc[key], data);
    }

    if (data[x] !== undefined) {
      return typeof data[x] === "string" ? data[x] : JSON.stringify(data[x]);
    }

    // Handle the case when x is not a valid key in data
    return undefined;
  };

  function formatEndpoint(endpoint) {
    let formattedEndpoint = endpoint;

    // Add "/" at the beginning if not present
    if (!formattedEndpoint.startsWith("/")) {
      formattedEndpoint = "/" + formattedEndpoint;
    }

    // Add "/" at the end if not present
    if (!formattedEndpoint.endsWith("/")) {
      formattedEndpoint = formattedEndpoint + "/";
    }

    return formattedEndpoint;
  }

  return (
    <div className="p-md-1 p-0">
      <div className="container-fluid d-flex justify-content-between align-items-end mb-2">
        <div>
          {title !== "" && (
            <div className="container-fluid">
              <h6 className="p-0 m-0 text-secondary">{subTitle}</h6>
              <h3>
                {title} ({total})
              </h3>
            </div>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            name="tableSearch"
            id="tableSearch"
            onChange={(e) => setKeyword(e.target.value)}
          />

          <div className="d-flex">
            <button
              className={"btn btn-sm btn-success"}
              style={{ height: "35px" }}
              onClick={handleExport}
            >
              <FaFileExport />
            </button>
          </div>
        </div>
      </div>

      <div
        className="table-responsive p-md-1 p-0"
        style={{ overflowX: "auto" }}
      >
        <table className="table table-striped customDatatable m-0">
          <thead>
            <tr>
              {columns.map((name, index) => (
                <th key={index} style={{ backgroundColor: "#dadbf7" }}>
                  <a
                    className="text-decoration-none text-dark"
                    // onClick={() => handleSort(name.name)}
                  >
                    {name.label}
                    {/*<ArrowReturn*/}
                    {/*    asc={asc}*/}
                    {/*    field={name.name}*/}
                    {/*    sortedLabel={sortedLabel}*/}
                    {/*/>*/}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <tr key={index}>
                  {/*<td>{JSON.stringify(item)}</td>*/}
                  {columns.map((col, k) => {
                    if (col.type === "closure") {
                      return <td key={k}>{col.closure(item)}</td>;
                    } else {
                      switch (col.name) {
                        case "view":
                          return (
                            <td className="d-flex" key={k}>
                              {viewLink && (
                                <Link
                                  className="text-decoration-none"
                                  to={formatEndpoint(viewLink) + item.id}
                                >
                                  <button className="primaryButton">
                                    <AiFillEye
                                      className="me-2"
                                      fontSize="13px"
                                    />
                                    View
                                  </button>
                                </Link>
                              )}
                            </td>
                          );
                        case "edit":
                          return (
                            <td key={k}>
                              {editLink && (
                                <Link
                                  className="text-decoration-none me-2"
                                  to={formatEndpoint(editLink) + item.id}
                                >
                                  <button className="warningButton">
                                    Edit
                                  </button>
                                </Link>
                              )}
                            </td>
                          );
                        case "delete":
                          return (
                            <td key={k}>
                              {deleteLink && (
                                <Link
                                  className="text-decoration-none me-2"
                                  to={formatEndpoint(deleteLink) + item.id}
                                >
                                  <button className="resetButton">
                                    Delete
                                  </button>
                                </Link>
                              )}
                            </td>
                          );
                        case "viewNedit":
                          return (
                            <td key={k}>
                              <div className="d-flex">
                                {editLink && (
                                  <Link
                                    className="text-decoration-none me-2"
                                    to={formatEndpoint(editLink) + item.id}
                                  >
                                    <button
                                      className="warningButton d-flex justify-content-center"
                                      style={{
                                        aspectRatio: "1",
                                        height: "36px",
                                        width: "36px",
                                        paddingTop: "8px",
                                      }}
                                    >
                                      <FaRegEdit />
                                    </button>
                                  </Link>
                                )}
                                {viewLink && (
                                  <Link
                                    className="text-decoration-none"
                                    to={formatEndpoint(viewLink) + item.id}
                                  >
                                    <button
                                      className="primaryButton d-flex justify-content-center"
                                      style={{
                                        aspectRatio: "1",
                                        height: "36px",
                                        width: "36px",
                                        paddingTop: "8px",
                                      }}
                                    >
                                      <AiFillEye fontSize="20px" />
                                    </button>
                                  </Link>
                                )}
                              </div>
                            </td>
                          );
                        case "both":
                          return (
                            <td key={k}>
                              <div className="d-flex">
                                {editLink && (
                                  <Link
                                    className="text-decoration-none me-2"
                                    to={formatEndpoint(editLink) + item.id}
                                  >
                                    <button className="warningButton">
                                      Edit
                                    </button>
                                  </Link>
                                )}
                                {deleteLink && (
                                  <Link
                                    className="text-decoration-none me-2"
                                    to={formatEndpoint(deleteLink) + item.id}
                                  >
                                    <button className="resetButton">
                                      Delete
                                    </button>
                                  </Link>
                                )}
                              </div>
                            </td>
                          );
                        case "addLoan":
                          return (
                            <td key={k}>
                              <div>
                                <Link
                                  className="text-decoration-none me-2"
                                  to={"/" + "add-loan" + "/" + item.id}
                                >
                                  <button className="warningButton">
                                    <AiOutlinePlusSquare />
                                  </button>
                                </Link>
                              </div>
                            </td>
                          );
                        case "threeInOne":
                          return (
                            <td key={k}>
                              <div>
                                {viewLink && (
                                  <Link
                                    className="text-decoration-none"
                                    to={formatEndpoint(viewLink) + item.id}
                                  >
                                    <button className="primaryButton">
                                      <AiFillEye
                                        className="me-2"
                                        fontSize="13px"
                                      />
                                      View
                                    </button>
                                  </Link>
                                )}
                                {editLink && (
                                  <Link
                                    className="text-decoration-none me-2"
                                    to={formatEndpoint(editLink) + item.id}
                                  >
                                    <button className="warningButton">
                                      Edit
                                    </button>
                                  </Link>
                                )}
                                {deleteLink && (
                                  <Link
                                    className="text-decoration-none me-2"
                                    to={formatEndpoint(deleteLink) + item.id}
                                  >
                                    <button className="resetButton">
                                      Delete
                                    </button>
                                  </Link>
                                )}
                              </div>
                            </td>
                          );
                        default:
                          return <td key={k}>{getData(col.name, item)}</td>;
                      }
                    }
                  })}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          {currentPage > 1 ? (
            <div
              className={"nextPrevButton"}
              onClick={(e) => setCurrentPage(parseInt(currentPage) - 1)}
            >
              <TbPlayerTrackPrev />
              Previous page {parseInt(currentPage) - 1}
            </div>
          ) : (
            <div className={"nextPrevButton"} disabled={true}>
              Previous page
            </div>
          )}
          {pages && (
            <select
              className="form-control form-control-md"
              name="page"
              id="page"
              style={{ maxWidth: "80px" }}
              onChange={(e) => setCurrentPage(e.target.value)}
              value={currentPage}
            >
              {pages}qqqq
            </select>
          )}
          {total > parseInt(currentPage) * size ? (
            <div
              className={"nextPrevButton"}
              onClick={(e) => setCurrentPage(parseInt(currentPage) + 1)}
            >
              Next page
              <TbPlayerTrackNext /> {parseInt(currentPage) + 1}
            </div>
          ) : (
            <div className={"nextPrevButton"} disabled={true}>
              Next page
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginatedDataTable;
