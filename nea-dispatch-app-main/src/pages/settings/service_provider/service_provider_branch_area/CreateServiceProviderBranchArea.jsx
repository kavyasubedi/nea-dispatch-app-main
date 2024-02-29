import React, { useEffect, useState } from "react";
import api from "../../../../Axios";
import { toast } from "react-toastify";

export default function CreateServiceProviderBranchArea() {
  const [convertedList, setConvertedList] = useState([]);
  function fetchStatusData() {
    api
      .get("/enums/statuses")
      .then((res) => {
        const fetchedData = res.data;
        // Process fetched data as needed, reorganize it based on columns
        // setData(reorganizedData);
        console.log("Data:", res);
        setConvertedList(
          Object.entries(res.data).map(([id, value]) => ({ id, value }))
        );
      })
      .catch((e) => console.log(e));
  }

  const [ispData, setIspData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [oltData, setOltData] = useState([]);
  const [ispDetail, setIspDetail] = useState([]);
  const [branchDetail, setBranchDetail] = useState([]);
  function fetchServiceProviderData() {
    api
      .get("/service-providers")
      .then((res) => {
        const fetchedData = res.data;
        // Process fetched data as needed, reorganize it based on columns
        // setData(reorganizedData);
        console.log("Data:", res.data);
        setIspData(res.data);
      })
      .catch((e) => console.log(e));
  }

  function fetchBranchData() {
    api
      .get("/branches")
      .then((res) => {
        // Process fetched data as needed, reorganize it based on columns
        // setData(reorganizedData);
        console.log("Data:", res.data);
        const filteredData = res.data.filter(
          (item) =>
            item.serviceProvider &&
            item.serviceProvider.id === formValues.serviceProvider.id
        );
        console.log("Filtered Data:", filteredData);
        setBranchData(filteredData);
      })
      .catch((e) => console.log(e));
  }
  function fetchOltData() {
    api
      .get("/olts")
      .then((res) => {
        // Process fetched data as needed, reorganize it based on columns
        // setData(reorganizedData);
        console.log("OLT Data:", res.data);
        const filteredData = res.data.filter(
          (item) => item.branch.id && item.branch.id == parseInt(formValues.branch.id)
        );
        console.log("Filtered Data:", filteredData);
        setOltData(filteredData);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchStatusData();
    fetchServiceProviderData();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, []);

  useEffect(() => {
    fetchBranchData();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, [ispDetail]);

  useEffect(() => {
    fetchOltData();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, [branchDetail]);

  const [formValues, setFormValues] = useState({
    olt: "",
    name: "",
    code: "",
    detail: "",
    status: "",
  });
  const [error, setError] = useState({
    olt: "",
    name: "",
    code: "",
    detail: "",
    status: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleIspChange = (e) => {
    const name = e.target.name;
    const value = JSON.parse(e.target.value);
    console.log(value);
    setIspDetail(value.id);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      serviceProvider: {
        id: value.id,
        name: value.id,
        code: value.id,
        phone: value.id,
        address: value.id,
      },
    }));
  };

  const handleBranchChange = (e) => {
    const name = e.target.name;
    const value = JSON.parse(e.target.value);
    console.log(value);
    setBranchDetail(value.id);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      branch: {
        id: value.id,
        name: "string",
        code: "string",
        status: "OPEN",
        serviceProvider: {
          id: 9,
          name: "string",
          code: "string",
          phone: "string",
          address: "string",
          status: "OPEN",
        },
      },
    }));
  };

  const handleOltChange = (e) => {
    const name = e.target.name;
    const value = JSON.parse(e.target.value);
    console.log(value);
    setIspDetail(value.id);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      olt: {
        id: value.id,
        name: value.name,
      },
    }));
  };

  function storeData(event) {
    event.preventDefault();
    api
      .post("/areas", formValues, {})
      .then((res) => {
        // create new toster function
        console.log(res);
        toast.success("success");
        window.history.back();
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
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      olt: "",
      name: "",
      code: "",
      detail: "",
      status: "",
    });
    let newErrors = {};
    if (formValues.name === "") {
      newErrors = { ...newErrors, name: "Area Name cannot Be Empty" };
      console.log("Area Name cannot Be Empty");
    } else if (formValues.name.length < 3) {
      newErrors = {
        ...newErrors,
        name: "Area Name must be atleast 3 characters long",
      };
      console.log("Area Name must be atleast 3 characters long");
    }
    if (formValues.code === "") {
      newErrors = { ...newErrors, code: "OLT Code cannot Be Empty" };
      console.log("OLT Code cannot Be Empty");
    }
    if (formValues.olt === "") {
      newErrors = { ...newErrors, olt: "OLT cannot Be Empty" };
      console.log("OLT Code cannot Be Empty");
    }
    if (formValues.detail === "") {
      newErrors = { ...newErrors, detail: "Area Detail cannot Be Empty" };
      console.log("Area Detail cannot Be Empty");
    }
    if (formValues.status === "") {
      newErrors = { ...newErrors, status: "Area Status cannot Be Empty" };
      console.log("Area Status cannot Be Empty");
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      storeData(event);
    }
  };
  const handleReset = () => {
    setError({
      olt: "",
      name: "",
      code: "",
      detail: "",
      status: "",
    });
    setFormValues({
      olt: "",
      name: "",
      code: "",
      detail: "",
      status: "",
    });
  };

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        Add New Area
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* ISP name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="ispId" className="form-label customizedLabel">
                ISP Name *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="ispId"
                id="ispId"
                defaultValue="0"
                onChange={handleIspChange}
              >
                <option value="0" disabled>
                  Open this select menu
                </option>
                {ispData.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {option.name}
                  </option>
                ))}
              </select>
              <small>
                <span className="text-secondary small mx-2">Select ISP</span>
              </small>
            </div>
            {/* OLT Branch name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                Branch Name *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="ispId"
                id="ispId"
                defaultValue="0"
                onChange={handleBranchChange}
              >
                <option value="0" disabled>
                  Open this select menu
                </option>
                {branchData.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {option.name}
                  </option>
                ))}
              </select>
              <small>
                <span className="text-secondary small mx-2">
                  Select ISP Branch
                </span>
              </small>
            </div>
            {/* OLT Olt */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                OLT Name *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="ispId"
                id="ispId"
                defaultValue="0"
                onChange={handleOltChange}
              >
                <option value="0" disabled>
                  Open this select menu
                </option>
                {oltData.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {option.name}
                  </option>
                ))}
              </select>
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.olt === null || error.olt === "" ? (
                  <span className="text-secondary small">
                    Select A Valid OLT Name.
                  </span>
                ) : (
                  <span className="text-danger small">{error.olt}</span>
                )}
              </small>
            </div>
            {/* OLT name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                Area Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="name"
                id="name"
                aria-describedby="helpId"
                placeholder="Area Name"
                onChange={handleInputChange}
                value={formValues.name}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.name === null || error.name === "" ? (
                  <span className="text-secondary small">
                    Create An Appropriate Area Name.
                  </span>
                ) : (
                  <span className="text-danger small">{error.name}</span>
                )}
              </small>
            </div>
            {/* OLT code */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="code" className="form-label customizedLabel">
                Code *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="code"
                id="code"
                aria-describedby="helpId"
                placeholder="Area Code"
                onChange={handleInputChange}
                value={formValues.code}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.code === null || error.code === "" ? (
                  <span className="text-secondary small">
                    Create An Appropriate Area Code.
                  </span>
                ) : (
                  <span className="text-danger small">{error.code}</span>
                )}
              </small>
            </div>
            {/* OLT detail */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="detail" className="form-label customizedLabel">
                Detail *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="detail"
                id="detail"
                aria-describedby="helpId"
                placeholder="Area detail"
                onChange={handleInputChange}
                value={formValues.detail}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.detail === null || error.detail === "" ? (
                  <span className="text-secondary small">
                    Provide Area Detail.
                  </span>
                ) : (
                  <span className="text-danger small">{error.detail}</span>
                )}
              </small>
            </div>

            {/* OLT status */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="status" className="form-label customizedLabel">
                Status *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="status"
                id="status"
                defaultValue="0" // Use defaultValue to set the default selected option
                onChange={handleInputChange}
              >
                <option value="0" disabled>
                  Open this select menu
                </option>
                {convertedList.map(({ id, value }) => (
                  <option key={id} value={id}>
                    {value}
                  </option>
                ))}
              </select>
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.status === null || error.status === "" ? (
                  <span className="text-secondary small">
                    Select A Valid Status.
                  </span>
                ) : (
                  <span className="text-danger small">{error.status}</span>
                )}
              </small>
            </div>
          </div>
          <div className="container-fluid d-flex justify-content-end gap-2 mt-4">
            <button className="submitButton">Submit</button>
            <button className="resetButton" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
