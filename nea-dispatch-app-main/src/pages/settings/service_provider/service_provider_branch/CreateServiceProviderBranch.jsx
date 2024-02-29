import React, { useEffect, useState } from "react";
import api from "../../../../Axios";
import { toast } from "react-toastify";

export default function CreateServiceProviderBranch() {
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    status: "",
    serviceProvider: "",
  });
  const [error, setError] = useState({
    name: "",
    code: "",
    status: "",
    serviceProvider: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleIspChange = (e) => {
    const name = e.target.name;
    const value = JSON.parse(e.target.value);
    console.log(value);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      ispId: "",
      name: "",
      code: "",
      status: "",
      serviceProvider: "",
    });
    let newErrors = {};
    if (formValues.name === "") {
      newErrors = {
        ...newErrors,
        name: "Service Provider Name cannot Be Empty",
      };
      console.log("Service Provider Name cannot Be Empty");
    } else if (formValues.name.length < 3) {
      newErrors = {
        ...newErrors,
        name: "Service Provider Name must be atleast 3 characters long",
      };
      console.log("Service Provider Name must be atleast 3 characters long");
    }
    if (formValues.ispId === "") {
      newErrors = {
        ...newErrors,
        ispId: "Service Provider Code cannot Be Empty",
      };
      console.log("Service Provider Code cannot Be Empty");
    }
    if (formValues.code === "") {
      newErrors = {
        ...newErrors,
        code: "Service Provider Code cannot Be Empty",
      };
      console.log("Service Provider Code cannot Be Empty");
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

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      storeData(event);
    }
  };

  function storeData(event) {
    event.preventDefault();
    api
      .post("/branches", formValues, {})
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

  const handleReset = () => {
    setError({
      name: "",
      code: "",
      address: "",
      phone: "",
      status: "",
    });
    setFormValues({
      name: "",
      code: "",
      address: "",
      phone: "",
      status: "",
    });
  };

  const [ispData, setIspData] = useState([]);
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

  useEffect(() => {
    fetchServiceProviderData();
    fetchStatusData();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, []);

  function extractNameAndId(dataset) {
    const idNamePairs = dataset.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    return idNamePairs;
  }

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        Add New Branch
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
                {error.name === null || error.name === "" ? (
                  <span className="text-secondary small">
                    Select An Appropriate ISP.
                  </span>
                ) : (
                  <span className="text-danger small">{error.name}</span>
                )}
              </small>
            </div>
            {/* service provider Branch name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                Branch Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="name"
                id="name"
                aria-describedby="helpId"
                placeholder="Branch Name"
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
                    Create An Appropriate Branch Name.
                  </span>
                ) : (
                  <span className="text-danger small">{error.name}</span>
                )}
              </small>
            </div>
            {/* Service provider code */}
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
                placeholder="Branch Code"
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
                    Create An Appropriate Branch Code.
                  </span>
                ) : (
                  <span className="text-danger small">{error.code}</span>
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
                    Select An Appropriate Status.
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
