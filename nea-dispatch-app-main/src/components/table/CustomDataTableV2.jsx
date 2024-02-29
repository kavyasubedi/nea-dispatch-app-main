import React, { useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import ArrowReturn from './ArrowReturn';
import { useEffect } from 'react';
import { AiOutlinePlusSquare, AiFillEye, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'


export default function CustomDataTableV2({ headers, data, title, subTitle, editLink = '', deleteLink = '', viewLink = '', customButton = '', costomLink = '' }) {
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        if (Array.isArray(headers)) {
            setColumns(headers);
        }
    }, [headers]);
    const [keyword, setKeyword] = useState('');
    const [sortedLabel, setSortedLabel] = useState('sn');
    const [searched, setSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setFilteredData(data)
    }, [data])
    const handleSearch = (keyword) => {
        setSearched(true);
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(keyword.toString().toLowerCase())
        );
        setFilteredData(filtered);
    };
    const clearSearch = () => {
        setSearched(false);
        setFilteredData(data);
    }
    const [asc, setAsc] = useState(true);

    const handleSort = (column) => {
        setSortedLabel(column)
        let sortedData;
        if (typeof filteredData[0][column] === 'string') {
            sortedData = [...filteredData].sort((a, b) =>
                asc ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column])
            );
        } else if (typeof filteredData[0][column] === 'number') {
            sortedData = [...filteredData].sort((a, b) =>
                asc ? a[column] - b[column] : b[column] - a[column]
            );
        }

        setFilteredData(sortedData);
        setAsc(!asc);
    };
    const handleExport = () => {
        const header = columns.map(column => column.label).join(',');
        const csv = [header];

        filteredData.forEach(row => {
            const values = columns.map(column => {
                const cellData = row[column.name];
                // Wrap cell data in quotes to handle commas and ensure correct CSV formatting
                return (typeof cellData === 'string' && cellData.includes(',')) ? `"${cellData}"` : cellData;
            });
            csv.push(values.join(','));
        });


        const csvContent = csv.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'table_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    return (
        <div className='p-md-1 p-0'>
            <div className='container-fluid d-flex justify-content-between align-items-end mb-2'>
                <div>
                    {title !== '' && (
                        <div className='container-fluid'>
                            <h6 className='p-0 m-0 text-secondary'>
                                {subTitle}
                            </h6>
                            <h3>{title}</h3>
                        </div>
                    )}

                </div>
                <div className='d-flex align-items-center'>
                    <div className='d-flex'>
                        <button className='resetButton me-2' onClick={() => clearSearch()} style={{ display: searched ? 'block' : 'none' }}>Clear</button>
                    </div>
                    <input
                        className='form-control me-2'
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className='d-flex'><button className='primaryButton me-2' onClick={() => handleSearch(keyword)}><AiOutlineSearch /></button></div>

                    <div className='d-flex'> <button className='primaryButton' style={{ minHeight: '30px', minWidth: '30px' }} onClick={handleExport}><FaFileExport /></button></div>

                </div>
            </div>

            <div className='react-table p-0 m-0' style={{ overflowX: 'auto' }}>
                <table className='react-table__scroll-container'>
                    <thead>
                        <tr>
                            {columns.map((name, index) => (
                                <th key={index} style={{ backgroundColor: '#dadbf7' }}>
                                    <div className='text-decoration-none text-dark' onClick={() => handleSort(name.name)}>
                                        {name.label}
                                        <ArrowReturn asc={asc} field={name.name} sortedLabel={sortedLabel} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredData) &&
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    {columns.map((col, k) => {
                                        // const nameOF = col.name.toString();
                                        if ((col.type == 'closure')) {
                                            return <td>
                                                {col.closure(item)}
                                            </td>
                                        } else {
                                            switch (col.type) {
                                                case 'viewButton':
                                                    const nameOf = col.name
                                                    return (
                                                        <td key={k}>
                                                            <Link className='text-decoration-none' to={item[nameOf]}>
                                                                <button className='primaryButton'>
                                                                    <AiFillEye className='me-2' fontSize='13px' />
                                                                    View
                                                                </button>
                                                            </Link>
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
            <div className="container-fluid d-flex justify-content-end gap-1">
                <div className="paginateButton d-flex gap-1 align-items-center"><AiFillLeftCircle style={{ marginTop: '2px' }} />Previous</div>
                <div className="paginateButton active">1</div>
                <div className="paginateButton">2</div>
                <div className="paginateButton">3</div>
                <div className="paginateButton d-flex gap-1 align-items-center">Next<AiFillRightCircle style={{ marginTop: '2px' }} /></div>
            </div>

        </div>
    );
}
