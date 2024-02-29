import React, { useEffect, useState } from "react";
import api from "../../../../Axios";
import { toast } from "react-toastify";

export default function CreateServiceProviderBranchOlt() {
  const [convertedList, setConvertedList] = useState([]);
  function fetchStatusData() {
    api
      .get("/enums/statuses")
      .then((res) => {
        setConvertedList(
          Object.entries(res.data).map(([id, value]) => ({ id, value }))
        );
      })
      .catch((e) => console.log(e));
  }
  const [ispData, setIspData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [ispDetail, setIspDetail] = useState([]);
  function fetchServiceProviderData() {
    api
      .get("/service-providers")
      .then((res) => {
        setIspData(res.data);
      })
      .catch((e) => console.log(e));
  }

  function fetchBranchData() {
    api
      .get("/branches")
      .then((res) => {
        const filteredData = res.data.filter(
          (item) =>
            item.serviceProvider &&
            item.serviceProvider.id === formValues.serviceProvider.id
        );
        setBranchData(filteredData);
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

  const [formValues, setFormValues] = useState({
    name: "",
    detail: "",
    status: "",
  });
  const [error, setError] = useState({
    name: "",
    detail: "",
    status: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleIspChange = (e) => {
    const value = JSON.parse(e.target.value);
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
    const value = JSON.parse(e.target.value);
    setIspDetail(value.id);
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

  function storeData(event) {
    event.preventDefault();
    api
      .post("/olts", formValues, {})
      .then((res) => {
        // create new toster function
        console.log(res);
        toast.success("success");
        window.history.back();
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
      name: "",
      detail: "",
      status: "",
    });
    let newErrors = {};
    if (formValues.name === "") {
      newErrors = { ...newErrors, name: "OLT Name cannot Be Empty" };
      console.log("OLT Name cannot Be Empty");
    }
    if (formValues.serviceProvider === "") {
      newErrors = {
        ...newErrors,
        serviceProvider: "Service Provider Status cannot Be Empty",
      };
      console.log("Service Provider Status cannot Be Empty");
    }
    if (formValues.status === "") {
      newErrors = {
        ...newErrors,
        status: "Service Provider Status cannot Be Empty",
      };
      console.log("Service Provider Status cannot Be Empty");
    }
    if (formValues.detail === "") {
      newErrors = { ...newErrors, detail: "Detail cannot Be Empty" };
      console.log("Detail cannot Be Empty");
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
      name: "",
      detail: "",
      status: "",
    });
    setFormValues({
      name: "",
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
        Add New OLT
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* service provider name */}
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
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                <span className="text-secondary small">
                  Select An Appropriate ISP.
                </span>
              </small>
            </div>
            {/* service branch name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="branchId" className="form-label customizedLabel">
                Branch Name *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="branchId"
                id="branchId"
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
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                <span className="text-secondary small">
                  Select An Appropriate ISP Branch
                </span>
              </small>
            </div>
            {/* service provider name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                OLT Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="name"
                id="name"
                aria-describedby="helpId"
                placeholder="OLT Name"
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
                    Provide An Appropriate OLT Name.
                  </span>
                ) : (
                  <span className="text-danger small">{error.name}</span>
                )}
              </small>
            </div>

            {/* Service provider detail */}
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
                placeholder="Service Provider detail"
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
                    Provide Detail Of OLT
                  </span>
                ) : (
                  <span className="text-danger small">{error.detail}</span>
                )}
              </small>
            </div>

            {/* Service provider status */}
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
                    Select Appropriate Status.
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
