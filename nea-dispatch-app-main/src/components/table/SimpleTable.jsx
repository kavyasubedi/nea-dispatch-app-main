import React from "react";

export default function SimpleTable({ columns, data }) {
  return (
    <div style={{ overflowX: "scroll", maxHeight: "60vh" }}>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {columns?.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((column) => (
                  <td key={column.name}>{row[column.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
