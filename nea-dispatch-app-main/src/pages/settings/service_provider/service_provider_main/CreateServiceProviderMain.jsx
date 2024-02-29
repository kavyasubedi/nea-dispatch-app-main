import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../Axios";

export default function CreateServiceProviderMain() {
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    status: "",
  });
  const [error, setError] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    status: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

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
    fetchStatusData();

    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      name: "",
      code: "",
      address: "",
      phone: "",
      status: "",
    });
    let newErrors = {};
    if (formValues.name === "") {
      newErrors = {
        ...newErrors,
        name: "DC Branch Name cannot Be Empty",
      };
      console.log("DC Branch Name cannot Be Empty");
    } else if (formValues.name.length < 3) {
      newErrors = {
        ...newErrors,
        name: "DC Branch Name must be atleast 3 characters long",
      };
      console.log("DC Branch Name must be atleast 3 characters long");
    }
    if (formValues.code === "") {
      newErrors = {
        ...newErrors,
        code: "DC Branch Code cannot Be Empty",
      };
      console.log("DC Branch Code cannot Be Empty");
    }
    if (formValues.address === "") {
      newErrors = {
        ...newErrors,
        address: "DC Branch Address cannot Be Empty",
      };
      console.log("DC Branch Address cannot Be Empty");
    }
    if (formValues.phone === "") {
      newErrors = {
        ...newErrors,
        phone: "DC Branch phone cannot Be Empty",
      };
      console.log("DC Branch phone cannot Be Empty");
    } else if (formValues.phone.toString().length < 10) {
      newErrors = {
        ...newErrors,
        phone: "DC Branch phone cannot Be Less Than 10 Digits",
      };
      console.log("DC Branch phone cannot Be Empty");
    }
    if (formValues.status === "" || formValues.status <= 0) {
      newErrors = {
        ...newErrors,
        status: "DC Branch Status Must Be Valid",
      };
      console.log("DC Branch Status Must Be Valid");
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
      .post("/service-providers", formValues, {})
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

  const handleReset = (event) => {
    event.preventDefault();
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

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        Add New DC Branch
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* DC Branch name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                DC Branch Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="name"
                id="name"
                aria-describedby="helpId"
                placeholder="DC Branch Name"
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
                    Create An Appropriate ISP Name.
                  </span>
                ) : (
                  <span className="text-danger small">{error.name}</span>
                )}
              </small>
            </div>
            {/* DC Branch code */}
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
                placeholder="DC Branch Code"
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
                    Create An Appropriate ISP Code.
                  </span>
                ) : (
                  <span className="text-danger small">{error.code}</span>
                )}
              </small>
            </div>
            {/* DC Branch address */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="address" className="form-label customizedLabel">
                Address *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="address"
                id="address"
                aria-describedby="helpId"
                placeholder="DC Branch Address"
                onChange={handleInputChange}
                value={formValues.address}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.address === null || error.address === "" ? (
                  <span className="text-secondary small">
                    Provide Correct Address.
                  </span>
                ) : (
                  <span className="text-danger small">{error.address}</span>
                )}
              </small>
            </div>
            {/* DC Branch phone */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="phone" className="form-label customizedLabel">
                Contact Number *
              </label>
              <input
                type="number"
                className="form-control form-control-md"
                name="phone"
                id="phone"
                aria-describedby="helpId"
                placeholder="Contact Number"
                onChange={handleInputChange}
                value={formValues.phone}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.phone === null || error.phone === "" ? (
                  <span className="text-secondary small">
                    Provide Correct Contact Number.
                  </span>
                ) : (
                  <span className="text-danger small">{error.phone}</span>
                )}
              </small>
            </div>
            {/* DC Branch status */}
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
