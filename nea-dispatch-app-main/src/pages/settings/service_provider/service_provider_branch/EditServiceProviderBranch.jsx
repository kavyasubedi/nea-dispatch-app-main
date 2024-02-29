import { useEffect, useState } from "react";
import api from "../../../../Axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function EditServiceProviderBranch() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    status: "",
    serviceProvider: "",
  });

  function fetchData() {
    api
      .get("/branches/" + parseInt(id))
      .then((res) => {
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
  function storeData(event) {
    event.preventDefault();
    api
      .put("/branches/" + parseInt(id), formValues, {
        headers: {},
      })
      .then((res) => {
        window.history.back();
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
          const extractedText = errorMessage.match(regex)[1];
          // Handle the error message as needed
          toast.warning(extractedText);
        } else {
          // Handle other types of errors
          toast.error("An error occurred.");
        }
      });
  }
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
    const value = e.target.value;
    const ispValue = ispData.find((option) => option.id === parseInt(value));
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      serviceProvider: {
        id: ispValue.id,
        name: ispValue.name,
        code: ispValue.code,
        phone: ispValue.phone,
        address: ispValue.address,
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

  const handleStatusGet = () => {
    const tempData = convertedList.find(
      (option) => option.value == formValues.status
    );
    if (tempData) {
      setFormValues({ ...formValues, status: tempData });
    }
  };

  useEffect(() => {
    handleStatusGet();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, [convertedList]);

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
        setIspData(res.data);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        Edit Branch
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
                value={
                  formValues.serviceProvider
                    ? formValues.serviceProvider.id
                    : ""
                }
                onChange={handleIspChange}
              >
                <option value="0" disabled>
                  Open this select menu
                </option>
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
                {error.name === null || error.name === "" ? (
                  <span className="text-secondary small">
                    Select A Valid ISP.
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
                    Edit Branch Name.
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
                  <span className="text-secondary small">Edit Branch Code</span>
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
                value={formValues.status ? formValues.status.id : ""} // Use defaultValue to set the default selected option
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
                  <span className="text-secondary small">Edit Status.</span>
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
