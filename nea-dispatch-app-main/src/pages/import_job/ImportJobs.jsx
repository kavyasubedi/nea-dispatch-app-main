import React, { useState } from "react";
import api from "../../Axios";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

export default function ImportJobs() {
  const [formData, setFormData] = useState({
    file: "",
  });

  const [error, setError] = useState({
    file: "",
  });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };
  const handleReset = () => {
    setFormData({
      file: "",
    });
  };

  // for csvFile
  // const [data, setData] = useState();
  // const [columnArray, setColumnArray] = useState();
  // const [values, setValues] = useState();
  // const handleFileChange = (event) => {
  //   setFormData({ ...formData, file: event.target.files[0] })
  //   Papa.parse(event.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (result) {
  //       const columnArray = [];
  //       const valuesArray = [];
  //       result.data.map((d) => {
  //         columnArray.push(Object.keys(d));
  //         valuesArray.push(Object.values(d));
  //       });
  //       setData(result.data);
  //       setColumnArray(columnArray[0]);
  //       setValues(valuesArray);
  //     }
  //   })
  // }

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  //onchange event
  const handleFile = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });

    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);

        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = (event) => {
          try {
            const workbook = XLSX.read(event.target.result, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10));
          } catch (error) {
            console.log(error);
          }
        };
      } else {
        setTypeError("Please Select a valid file type");
      }
    } else {
      setTypeError("Please Select A File");
    }
  };

  //submit event
  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post("/upload-file", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setFormData({
          file: "",
        });
        setError("");
        toast.success("File Imported Successfully.");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          // Access the error message from the server response
          const errorMessage = error.response.data.detail;
          console.log(errorMessage);
          const regex = /\"(.*?)\"/;
          try {
            const extractedText = errorMessage.match(regex)[1];
            toast.warning(extractedText);
            // Use the extracted text...
          } catch (e) {
            // Handle the case where the regex doesn't match
            toast.warning(errorMessage);
          }
        } else {
          // Handle other types of errors
          toast.error("An error occurred.");
        }
      });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center p-2 m-0 my-2"
      style={{ overflowX: "hidden" }}
    >
      <div className="card container-fluid p-0">
        <div className="card-header" style={{ backgroundColor: "#ffffff" }}>
          <h5>Import Job Data</h5>
        </div>
        <div className="card-body p-3">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <label htmlFor="File" className="form-label customizedLabel">
                  Job File
                </label>
                <div className="d-flex justify-content-start gap-3">
                  <input
                    type="file"
                    className="form-control form-control-md"
                    name="File"
                    id="File"
                    aria-describedby="helpId"
                    placeholder="Import CBS File"
                    accept=".xls, .xlsx, .csv"
                    onChange={handleFile}
                    required
                  />
                </div>
              </div>
              {typeError && (
                <div className="p-3 alert alert-danger mt-3 " role="alert">
                  {typeError}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end mt-4 gap-2">
              <div className="primaryButton" onClick={handleSubmit}>
                Submit
              </div>
              <div className="resetButton" onClick={handleReset}>
                Reset
              </div>
            </div>
            <div>
              {/* view data */}
              <div className="viewer">
                {excelData ? (
                  <div className="table-responsive mt-3">
                    <div className="table-responsive">
                      <table className="table table-striped customDatatable">
                        <thead>
                          <tr>
                            {Object.keys(excelData[0]).map((key) => (
                              <th
                                key={key}
                                style={{ backgroundColor: "#dadbf7" }}
                              >
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {excelData.map((individualExcelData, index) => (
                            <tr key={index}>
                              {Object.keys(individualExcelData).map((key) => (
                                <td key={key}>{individualExcelData[key]}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div>No Valid File Selected Yet!</div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
