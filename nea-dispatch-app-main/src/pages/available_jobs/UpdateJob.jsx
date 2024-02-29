import { useState } from "react";

export default function UpdateJob() {
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

  function storeData() {
    // api
    //   .post("/client/store/", formValues, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     notify("success");
    //     window.location.href = "/#/edit-client/" + parseInt(res.data.id);
    //   })
    //   .catch((e) => {
    //     setError(e.response.data);
    //     notify("Please Recheck The Form");
    //   });
    console.log("submitted");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
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
      storeData();
    }
  };
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
              <label htmlFor="name" className="form-label customizedLabel">
                Update Job *
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
                    Legal name used in citizenship.
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
                placeholder="Service Provider Code"
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
                    Legal name used in citizenship.
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
              <input
                type="text"
                className="form-control form-control-md"
                name="status"
                id="status"
                aria-describedby="helpId"
                placeholder="Service Provider Code"
                onChange={handleInputChange}
                value={formValues.status}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.status === null || error.status === "" ? (
                  <span className="text-secondary small">
                    Legal name used in citizenship.
                  </span>
                ) : (
                  <span className="text-danger small">{error.status}</span>
                )}
              </small>
            </div>
            {/* Service provider */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="status" className="form-label customizedLabel">
                Service Provider *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="serviceProvider"
                id="serviceProvider"
                aria-describedby="helpId"
                placeholder="Service Provider Code"
                onChange={handleInputChange}
                value={formValues.serviceProvider}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.serviceProvider === null ||
                error.serviceProvider === "" ? (
                  <span className="text-secondary small">
                    Legal name used in citizenship.
                  </span>
                ) : (
                  <span className="text-danger small">
                    {error.serviceProvider}
                  </span>
                )}
              </small>
            </div>
          </div>
          <div className="container-fluid d-flex justify-content-end gap-2">
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
