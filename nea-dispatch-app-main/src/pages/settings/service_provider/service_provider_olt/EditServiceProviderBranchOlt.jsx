import React, { useEffect, useState } from "react";
import api from "../../../../Axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

export default function EditServiceProviderBranchOlt() {
  const { id } = useParams();
  const [convertedList, setConvertedList] = useState([]);
  const [selectedIsp, setSelectedIsp] = useState();

  const [formValues, setFormValues] = useState({
    ispId: "",
    branch: { id: "", name: "", serviceProvider: { id: "" } },
    oltName: "",
    detail: "",
    status: "",
  });

  function fetchData() {
    api
      .get("/olts/" + parseInt(id))
      .then((res) => {
        setSelectedIsp(res.data.branch.serviceProvider.id);
        setFormValues(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchData();
    fetchServiceProviderData();
    fetchStatusData();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, []);

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
        // Process fetched data as needed, reorganize it based on columns
        const filteredData = res.data.filter(
          (item) =>
            item.serviceProvider &&
            item.serviceProvider.id === formValues.branch.serviceProvider.id
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
    const value = e.target.value;
    const ispValue = ispData.find((option) => option.id === parseInt(value));
    console.log(value);
    console.log("thi iss", ispValue);
    setIspDetail(ispValue);
    setSelectedIsp(ispValue.id);

    setFormValues({
      ...formValues,
      branch: {
        id: formValues.branch.id,
        name: formValues.branch.name,
        code: formValues.branch.code,
        status: formValues.branch.status,
        serviceProvider: ispValue,
      },
    });
    fetchBranchData();
    console.log("form:", formValues);
  };

  const handleBranchChange = (e) => {
    const name = e.target.name;
    const value = JSON.parse(e.target.value);
    console.log(value);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      branch: {
        id: value.id,
        name: value.name,
        code: value.code,
        status: value.status,
        serviceProvider: formValues.branch.serviceProvider,
      },
    }));
  };

  const handleStatusGet = () => {
    console.log(formValues.status);
    const tempData = convertedList.find(
      (option) => option.value == formValues.status
    );
    if (tempData) {
      setFormValues({ ...formValues, status: tempData.id });
    }
  };

  useEffect(() => {
    handleStatusGet();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, [convertedList]);

  useEffect(() => {
    fetchBranchData();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, [formValues]);

  function storeData(event) {
    event.preventDefault();
    api
      .put("/olts/" + parseInt(id), formValues, {})
      .then((res) => {
        // create new toster function
        console.log(res);
        window.location.reload();
        toast.success("success");
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
      ispId: "",
      branchId: "",
      oltName: "",
      code: "",
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
      ispId: "",
      name: "",
      detail: "",
      status: "",
    });
    setFormValues({
      ispId: "",
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
        Edit OLT
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
                value={formValues.branch.serviceProvider.id}
                onChange={handleIspChange}
              >
                {ispData.map((option) => (
                  <option key={option.id} value={JSON.stringify(option.id)}>
                    {option.name}
                  </option>
                ))}
              </select>
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                <span className="text-secondary small">Update ISP</span>
              </small>
            </div>
            {/* service branch name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="ispId" className="form-label customizedLabel">
                Branch Name *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="ispId"
                id="ispId"
                defaultValue="0"
                value={formValues.branch.id}
                onChange={handleBranchChange}
              >
                <option value="0" disabled>
                  Open this select menu
                </option>
                {branchData.map((option) => (
                  <option key={option.id} value={JSON.stringify(option.id)}>
                    {option.name}
                  </option>
                ))}
              </select>

              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                <span className="text-secondary small">Update Branch</span>
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
                  <span className="text-secondary small">Update OLT Name</span>
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
                  <span className="text-secondary small">Edit OLT Detail.</span>
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
                value={formValues.status}
                onChange={handleInputChange}
              >
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
