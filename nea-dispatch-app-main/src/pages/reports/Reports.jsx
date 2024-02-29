import PaginatedDataTable from "../../components/table/PaginatedDataTable";
import { useEffect, useState } from "react";
import api from "../../Axios";
import NepaliDate from "nepali-date";
import { monthDays } from "/src/lib/nep_date";
import SimpleTable from "../../components/table/SimpleTable";
export default function Reports() {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState("");
  const [fiscalYears, setFiscalYears] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchFiscalYear();
  }, []);
  useEffect(() => {
    if (selectedFiscalYear && selectedMonth) {
      const y = JSON.parse(selectedFiscalYear);
      const m = parseInt(selectedMonth);

      if (m > 0 && m < 13) {
        const fromDate = new NepaliDate(
          new Date(m > 3 ? y.startDate : y.endDate)
        );

        // Logging for debugging
        console.log("From Date:", new NepaliDate(fromDate.getYear(), m - 1, 1));
        console.log(
          "To Date:",
          new NepaliDate(
            fromDate.getYear(),
            m - 1,
            monthDays(fromDate.getYear(), m)
          )
        );
        const to = new NepaliDate(
          fromDate.getYear(),
          m - 1,
          monthDays(fromDate.getYear(), m)
        ).timestamp.toISOString();
        const from = new NepaliDate(
          fromDate.getYear(),
          m - 1,
          1
        ).timestamp.toISOString();
        fetchData(m, from, to);
      }
    }
  }, [selectedFiscalYear, selectedMonth]);

  function fetchFiscalYear() {
    api
      .get("/fiscal-years")
      .then((res) => {
        setFiscalYears(res.data);
      })
      .catch((e) => console.log(e));
  }
  function fetchData(month, from, to) {
    api
      .get(`/attendances/report?month=${month}&from=${from}&to=${to}`)
      .then((res) => {
        // Map the response data to a structured format
        const mappedData = res.data?.content.map((entry) => ({
          id: entry.id,
          month: entry.month,
          leaves: entry.leaves,
          workDays: entry.workDays,
          totalMeter: entry.totalMeter,
          overtime: entry.overtime,
          lastSync: entry.lastSync,
          fiscalYear: entry.fiscalYear.title,
          employee: entry.employee.fullName,
        }));

        // Set the mapped data to your state or wherever you want to store it
        setData(mappedData);
      })
      .catch((e) => console.log(e));
  }

  const handleFiscalYearChange = (event) => {
    const year = event.target.value;
    setSelectedFiscalYear(year);
  };
  const handleMonthChange = (event) => {
    const month = event.target.value;
    console.log("month.....", month);
    if (selectedFiscalYear) {
      setSelectedMonth(month);
    }
  };

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "employee",
      label: "Employee",
    },
    {
      name: "fiscalYear",
      label: "Fiscal Year",
    },
    {
      name: "month",
      label: "Month",
    },
    {
      name: "workDays",
      label: "Work Days",
    },
    {
      name: "totalMeter",
      label: "Total Meter",
    },
    {
      name: "overtime",
      label: "Overtime",
    },
    {
      name: "leaves",
      label: "Total Leave",
    },
  ];
  const pagination_prop = {
    title: "Reports",
    subTitle: "Admin Tools",
    api_end_point: "/attendance/report",
    params: {},
    page: 1,
    size: 10,
    columns: columns,
    viewLink: "view-client",
    editLink: "/edit-job/",
    deleteLink: "/dispatches/",
  };
  return (
    <>
      <div className="card p-2" style={{ minHeight: "87vh" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <span className="h4 fw-semibold">Employee Reports</span>
            <div className="mx-1 fw-semibold warningButton">
              Generate Report for all Employees
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <div className="mb-4 row">
                <div className="col-md-6">
                  <label className="fw-semibold h6">Select Fiscal Year</label>
                  <select
                    className="form-control form-select"
                    onChange={handleFiscalYearChange}
                    value={selectedFiscalYear}
                  >
                    <option value="">Select Fiscal Year</option>
                    {fiscalYears.map((item, key) => (
                      <option key={key} value={JSON.stringify(item)}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="fw-semibold h6">Select Month</label>
                  <select
                    className="form-control form-select"
                    onChange={handleMonthChange}
                    value={selectedMonth}
                    disabled={!selectedFiscalYear} // Disable month selection if no fiscal year is selected
                  >
                    <option value="">Select Month</option>
                    <option value="1">Baisakh</option>
                    <option value="2">Jestha</option>
                    <option value="3">Ashard</option>
                    <option value="4">Shrawan</option>
                    <option value="5">Bhadra</option>
                    <option value="6">Asojh</option>
                    <option value="7">Karthik</option>
                    <option value="8">Manghsir</option>
                    <option value="9">Poush</option>
                    <option value="10">Magh</option>
                    <option value="11">Falgun</option>
                    <option value="12">Chaitra</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <SimpleTable columns={columns} data={data}></SimpleTable>
        </div>
      </div>
    </>
  );
}
