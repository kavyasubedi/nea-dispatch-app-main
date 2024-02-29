import React, { useEffect, useState } from "react";
import { FaFileExport, FaRegEdit } from "react-icons/fa";
import ArrowReturn from "./ArrowReturn";
import { AiFillEye, AiOutlinePlusSquare, AiOutlineSearch, } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function CustomDataTable({
    headers,
    data,
    title,
    subTitle,
    editLink,
    deleteLink,
    viewLink,
}) {
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        if (Array.isArray(headers)) {
            setColumns(headers);
        }
    }, [headers]);
    const [keyword, setKeyword] = useState("");
    const [sortedLabel, setSortedLabel] = useState("sn");
    const [searched, setSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        console.log("Data:", data);
        setFilteredData(data);
    }, [data]);
    const handleSearch = (keyword) => {
        setSearched(true);
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(keyword.toString().toLowerCase())
        );
        setFilteredData(filtered);
    };
    const clearSearch = () => {
        setSearched(false);
        setFilteredData(data);
    };
    const [asc, setAsc] = useState(true);

    const handleSort = (column) => {
        setSortedLabel(column);
        let sortedData;
        if (typeof filteredData[0][column] === "string") {
            sortedData = [...filteredData].sort((a, b) =>
                asc
                    ? a[column].localeCompare(b[column])
                    : b[column].localeCompare(a[column])
            );
        } else if (typeof filteredData[0][column] === "number") {
            sortedData = [...filteredData].sort((a, b) =>
                asc ? a[column] - b[column] : b[column] - a[column]
            );
        }

        setFilteredData(sortedData);
        setAsc(!asc);
    };
    const handleExport = () => {
        const header = columns.map((column) => column.label).join(",");
        const csv = [header];

        filteredData.forEach((row) => {
            const values = columns.map((column) => {
                const cellData = row[column.name];
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

    return (
        <div className="p-md-1 p-0">
            <div className="container-fluid d-flex justify-content-between align-items-end mb-2">
                <div>
                    {title !== "" && (
                        <div className="container-fluid">
                            <h6 className="p-0 m-0 text-secondary">{subTitle}</h6>
                            <h3>{title}</h3>
                        </div>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex">
                        <button
                            className="resetButton me-2"
                            onClick={() => clearSearch()}
                            style={{ display: searched ? "block" : "none" }}
                        >
                            Clear
                        </button>
                    </div>
                    <input
                        className="form-control me-2 mt-3"
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="d-flex">
                        <button
                            className="primaryButton me-2"
                            onClick={() => handleSearch(keyword)}
                        >
                            <AiOutlineSearch />
                        </button>
                    </div>

                    <div className="d-flex">
                        <button
                            className="primaryButton"
                            style={{ minHeight: "30px", minWidth: "30px" }}
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
                <table className="table table-striped customDatatable">
                    <thead>
                        <tr>
                            {columns.map((name, index) => (
                                <th key={index} style={{ backgroundColor: "#dadbf7" }}>
                                    <a
                                        className="text-decoration-none text-dark"
                                        onClick={() => handleSort(name.name)}
                                    >
                                        {name.label}
                                        <ArrowReturn
                                            asc={asc}
                                            field={name.name}
                                            sortedLabel={sortedLabel}
                                        />
                                    </a>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredData) &&
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    {columns.map((col, k) => {
                                        if (col.type === "closure") {
                                            return <td className="d-flex" key={k}>{col.closure(item)}</td>;
                                        } else {
                                            switch (col.name) {
                                                case "view":
                                                    return (
                                                        <td className="d-flex" key={k}>
                                                            {viewLink && (
                                                                <Link
                                                                    className="text-decoration-none"
                                                                    to={'/' + viewLink.toString()}
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
                                                                    to={'/' + editLink.toString() + '/' + item.id}
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
                                                                    to={'/' + deleteLink.toString() + '/' + item.id}
                                                                >
                                                                    <button className="resetButton">
                                                                        Delete
                                                                    </button>
                                                                </Link>
                                                            )}
                                                        </td>
                                                    );
                                                case "viewNedit":
                                                    return (<td key={k}>
                                                        <div className="d-flex">
                                                            {editLink && (<Link
                                                                className="text-decoration-none me-2"
                                                                to={'/' + editLink.toString() + '/' + item.id}
                                                            >
                                                                <button className="warningButton d-flex justify-content-center" style={{ aspectRatio: '1', height: '36px', width: '36px', paddingTop: '8px' }}>
                                                                    <FaRegEdit />
                                                                </button>
                                                            </Link>)}
                                                            {viewLink && (<Link
                                                                className="text-decoration-none"
                                                                to={'/' + viewLink.toString() + '/' + item.id}
                                                            >
                                                                <button className="primaryButton d-flex justify-content-center" style={{ aspectRatio: '1', height: '36px', width: '36px', paddingTop: '8px' }}>
                                                                    <AiFillEye
                                                                        fontSize="20px"

                                                                    />

                                                                </button>
                                                            </Link>)}
                                                        </div>
                                                    </td>);
                                                case "both":
                                                    return (
                                                        <td key={k}>
                                                            <div className="d-flex">
                                                                {editLink && (
                                                                    <Link
                                                                        className="text-decoration-none me-2"
                                                                        to={'/' + editLink.toString() + '/' + item.id}
                                                                    >
                                                                        <button className="warningButton">
                                                                            Edit
                                                                        </button>
                                                                    </Link>
                                                                )}
                                                                {deleteLink && (
                                                                    <Link
                                                                        className="text-decoration-none me-2"
                                                                        to={'/' + deleteLink.toString() + '/' + item.id}
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
                                                                    to={'/' + "add-loan" + '/' + item.id}
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
                                                                        to={'/' + viewLink.toString() + '/' + item.id}
                                                                    >
                                                                        <button className="primaryButton me-2">
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
                                                                        to={'/' + editLink.toString() + '/' + item.id}
                                                                    >
                                                                        <button className="warningButton">
                                                                            Edit
                                                                        </button>
                                                                    </Link>
                                                                )}
                                                                {deleteLink && (
                                                                    <Link
                                                                        className="text-decoration-none me-2"
                                                                        to={'/' + deleteLink.toString() + '/' + item.id}
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
                                                    return <td key={k}>{item[col.name]}</td>;
                                            }
                                        }
                                    })}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
