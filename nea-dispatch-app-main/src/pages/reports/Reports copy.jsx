import PaginatedDataTable from "../../components/table/PaginatedDataTable";
import { useEffect, useState } from "react";
import api from "../../Axios";
import { ADToBS, BSToAD } from "bikram-sambat-js";
import NepaliDate from "nepali-date";
import { monthDays } from "/src/lib/nep_date";

export default function Reports() {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState("");
  const [fiscalYears, setFiscalYears] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    fetchFiscalYear();
  }, []);

  function fetchFiscalYear() {
    api
      .get("/fiscal-years")
      .then((res) => {
        setFiscalYears(res.data);
      })
      .catch((e) => console.log(e));
  }
  const fetchData = async () => {
    // api
    //   .get("")
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((e) => console.log(e));
  };
  function convertEnglishToNepaliDate(date) {
    return ADToBS(date);
  }
  function convertNepaliToEnglishiDate(date) {
    return BSToAD(date);
  }
  const handleFiscalYearChange = (event) => {
    const year = event.target.value;
    setSelectedFiscalYear(year);
    fetchData();
  };
  const handleMonthChange = (event) => {
    const month = event.target.value;
    if (selectedFiscalYear) {
      setSelectedMonth(month);
      // Check if a fiscal year has been selected
      const parsedObject = JSON.parse(selectedFiscalYear);

      // Parse the datetime strings into Date objects
      const startDate = new Date(parsedObject.startDate);
      const endDate = new Date(parsedObject.endDate);

      // Get the date parts as strings
      const english_start_date = startDate.toISOString().substring(0, 10);
      const english_end_date = endDate.toISOString().substring(0, 10);
      const nepali_start_date = convertEnglishToNepaliDate(english_start_date);
      const nepali_end_date = convertEnglishToNepaliDate(english_end_date);
      if (month == 1 || month == 2 || month == 3) {
        // Parse the Nepali date components
        // Split the date string by '-'
        const dateParts = nepali_end_date.split("-");

        // Extract the year as the first element
        const current_year = dateParts[0];
        const start_day = 1;
        const attendNepaliStartDate = `${current_year}-${month
          .toString()
          .padStart(2, "0")}-${start_day.toString().padStart(2, "0")}`;
        const attendEnglishStartDate = convertNepaliToEnglishiDate(
          attendNepaliStartDate
        );
        const attendEnglishEndDate = getAttendEndDate(attendEnglishStartDate);
        console.log(
          "Attend Start Date:",
          attendNepaliStartDate,
          attendEnglishStartDate
        );
        // console.log("Attend End Date:", attendEnglishEndDate);
      }
      fetchData();
    } else {
      console.warn("Please select a fiscal year first.");
    }
  };
  function getAttendEndDate(attendEnglishStartDate) {
    const date = new Date(attendEnglishStartDate);
    const attendLastDate = new Date(
      date.getFullYear(), // Use getFullYear() for accurate year
      date.getMonth() + 1,
      0
    );
    console.log(attendLastDate);
    return attendLastDate; // Return the last day of the month
  }

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
      name: "fiscal_year",
      label: "Fiscal Year",
    },
    {
      name: "month",
      label: "Month",
    },
    {
      name: "work_days",
      label: "Work Days",
    },
    {
      name: "total_meter",
      label: "Total Meter",
    },
    {
      name: "overtime",
      label: "Overtime",
    },
    {
      name: "leave",
      label: "Total Leave",
    },
  ];
  const pagination_prop = {
    title: "Reports",
    subTitle: "Admin Tools",
    api_end_point: "/dispatches",
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
        <div className="card-header">
          <span className="h2 fw-bold">Employee Reports</span>

          <div className="float-end">
            <button className="btn rounded-pill mx-1 text-light fw-bold bg-warning">
              Generate Report for all Employees
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="mb-4 row">
              <div className="col-md-6">
                <label className="fw-bold px-2 h4">Select Fiscal Year</label>
                <select
                  className="form-control form-select rounded-pill"
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
                <label className="fw-bold px-2 h4">Select Month</label>
                <select
                  className="form-control form-select rounded-pill"
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

        <div className="card-body">
          <PaginatedDataTable {...pagination_prop}></PaginatedDataTable>
        </div>
      </div>
    </>
  );
}
