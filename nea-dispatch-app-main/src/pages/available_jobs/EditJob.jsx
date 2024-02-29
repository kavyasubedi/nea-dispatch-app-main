import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../Axios";
import { toast } from "react-toastify";
export default function EditJob() {
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    customerName: "",
    customerId: "",
    contactNo: "",
    address: "",
    complain: "",
    regDate: "",
    branch: "",
    status: "",
  });
  const [error, setError] = useState({
    customerName: "",
    customerId: "",
    contactNo: "",
    address: "",
    complain: "",
    regDate: "",
    branch: "",
    status: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function getJob(id) {
    api
      .get("/dispatches/" + parseInt(id))
      .then((res) => {
        setFormValues(res.data);
      })
      .catch((e) => console.log(e));
  }

  const [branchData, setBranchData] = useState([]);
  function fetchBranch() {
    api
      .get("/branches")
      .then((res) => {
        setBranchData(res.data);
      })
      .catch((e) => console.log(e));
  }
  const handleBranchChange = (e) => {
    const value = JSON.parse(e.target.value);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      branch: {
        id: value.id,
        name: value.id,
        code: value.id,
        phone: value.id,
        address: value.id,
      },
    }));
  };
  const [statusList, setStatusList] = useState([]);
  function fetchStatusData() {
    api
      .get("/enums/statuses")
      .then((res) => {
        setStatusList(
          Object.entries(res.data).map(([id, value]) => ({ id, value }))
        );
      })
      .catch((e) => console.log(e));
  }

  const handleStatusGet = () => {
    const tempData = statusList.find(
      (option) => option.value == formValues.status
    );
    if (tempData) {
      setFormValues({ ...formValues, status: tempData.id });
    }
    // console.log('hello', statusList.find(option => option.value == formValues.status));
  };

  useEffect(() => {
    handleStatusGet();
  }, [formValues]);
  useEffect(() => {
    fetchBranch();
    fetchStatusData();
    return () => {};
  }, []);

  useEffect(() => {
    getJob(id);
  }, [id]);
  function storeData() {
    if (id) {
      api
        .put("/dispatches/" + parseInt(id), JSON.stringify(formValues), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.success("Updated Job Successfully");
          window.location.href = "/#/all-jobs";
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
    } else {
      console.log("No id Found!");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      customerName: "",
      customerId: "",
      contactNo: "",
      address: "",
      complain: "",
      regDate: "",
      branch: "",
      status: "",
    });
    let newErrors = {};
    if (formValues.customerName === "") {
      newErrors = { ...newErrors, customerName: "name cannot Be Empty" };
      console.log("Name cannot Be Empty");
    }
    if (formValues.customerId === "") {
      newErrors = {
        ...newErrors,
        customerId: "Customer Id Status cannot Be Empty",
      };
      console.log("Customer Id Status cannot Be Empty");
    }

    if (formValues.contactNo === "") {
      newErrors = {
        ...newErrors,
        contactNo: "Contact No Status cannot Be Empty",
      };
      console.log("contactNo Status cannot Be Empty");
    }
    if (formValues.address === "") {
      newErrors = { ...newErrors, address: "Address cannot Be Empty" };
      console.log("address cannot Be Empty");
    }
    if (formValues.complain === "") {
      newErrors = {
        ...newErrors,
        complain: "Complain Message cannot Be Empty",
      };
      console.log("complain Message cannot Be Empty");
    }
    if (formValues.regDate === "") {
      newErrors = { ...newErrors, regDate: "Complain Date cannot Be Empty" };
      console.log("RegDate Status cannot Be Empty");
    }
    if (formValues.branch === "") {
      newErrors = { ...newErrors, branch: "Branch Status cannot Be Empty" };
      console.log("branch Status cannot Be Empty");
    }
    if (formValues.complain === "") {
      newErrors = { ...newErrors, complain: "Complain Status cannot Be Empty" };
      console.log("complain Status cannot Be Empty");
    }
    if (formValues.status === "") {
      newErrors = {
        ...newErrors,
        status: "Status cannot Be Empty",
      };
      console.log("Status cannot Be Empty");
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
      customerName: "",
      customerId: "",
      contactNo: "",
      address: "",
      complain: "",
      regDate: "",
      branch: "",
      status: "",
    });
    setFormValues({
      customerName: "",
      customerId: "",
      contactNo: "",
      address: "",
      complain: "",
      regDate: "",
      branch: "",
      status: "",
    });
  };

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        Edit New Job
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Customer Name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label
                htmlFor="customerName"
                className="form-label customizedLabel"
              >
                Customer Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="customerName"
                id="customerName"
                aria-describedby="helpId"
                placeholder="Customer Name"
                onChange={handleInputChange}
                value={formValues.customerName}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.customerName === null || error.customerName === "" ? (
                  <span className="text-secondary small">Name Required</span>
                ) : (
                  <span className="text-danger small">
                    {error.customerName}
                  </span>
                )}
              </small>
            </div>
            {/* detail */}
            <div className="col-12 col-md-6 col-lg-3">
              <label
                htmlFor="customerId"
                className="form-label customizedLabel"
              >
                Customer Id *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="customerId"
                id="customerId"
                aria-describedby="helpId"
                placeholder="Customer Id"
                onChange={handleInputChange}
                value={formValues.customerId}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.customerId === null || error.customerId === "" ? (
                  <span className="text-secondary small">
                    Customer Id Is Required
                  </span>
                ) : (
                  <span className="text-danger small">{error.customerId}</span>
                )}
              </small>
            </div>

            {/* status */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="contactNo" className="form-label customizedLabel">
                Contact No *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="contactNo"
                id="contactNo"
                aria-describedby="helpId"
                placeholder="Contact No"
                onChange={handleInputChange}
                value={formValues.contactNo}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.contactNo === null || error.contactNo === "" ? (
                  <span className="text-secondary small">
                    Contact No Is Required.
                  </span>
                ) : (
                  <span className="text-danger small">{error.contactNo}</span>
                )}
              </small>
            </div>
            {/* */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="branch" className="form-label customizedLabel">
                Branch *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="branch"
                id="branch"
                defaultValue="0"
                onChange={handleBranchChange}
                value={formValues.branch ? formValues.branch.id : ""}
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
                {error.branch === null || error.branch === "" ? (
                  <span className="text-secondary small">
                    Must Select An branch.
                  </span>
                ) : (
                  <span className="text-danger small">{error.branch}</span>
                )}
              </small>
            </div>
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
                placeholder="Address"
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
                    Address Is Required.
                  </span>
                ) : (
                  <span className="text-danger small">{error.address}</span>
                )}
              </small>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="regDate" className="form-label customizedLabel">
                Complain Entry Time *
              </label>
              <div className="d-flex gap-1">
                <input
                  type="datetime-local"
                  className="form-control form-control-md"
                  name="regDate"
                  id="regDate"
                  aria-describedby="helpId"
                  placeholder="Complain Entry Time"
                  value={formValues.regDate}
                  onChange={handleInputChange}
                />
              </div>

              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.regDate === null || error.regDate === "" ? (
                  <span className="text-secondary small">
                    Complain Entry Time.
                  </span>
                ) : (
                  <span className="text-danger small">{error.regDate}</span>
                )}
              </small>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="status" className="form-label customizedLabel">
                Status *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="status"
                id="status"
                value={formValues.status ? formValues.status : "0"} // Use defaultValue to set the default selected option
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select one
                </option>
                {statusList.map(({ id, value }) => (
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
                    Status is Required.
                  </span>
                ) : (
                  <span className="text-danger small">{error.status}</span>
                )}
              </small>
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="complain" className="form-label customizedLabel">
              Complain Message *
            </label>
            <textarea
              className="form-control form-control-md"
              name="complain"
              id="complain"
              aria-describedby="helpId"
              placeholder="Complain Message"
              onChange={handleInputChange}
              value={formValues.complain}
            />

            <small
              id="helpId"
              className="form-text text-muted"
              style={{ paddingLeft: "2%" }}
            >
              {error.complain === null || error.complain === "" ? (
                <span className="text-secondary small">
                  Complain Message Is Required.
                </span>
              ) : (
                <span className="text-danger small">{error.complain}</span>
              )}
            </small>
          </div>

          <div className="container-fluid d-flex justify-content-end gap-2 mt-3">
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
