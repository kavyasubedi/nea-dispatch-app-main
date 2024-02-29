import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import api from "../../../Axios";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  minWidth: "450px",
  bgcolor: "background.transparent",
  border: "0px solid #000",
  boxShadow: 0,
  p: 0,
};

const AddEmployeePopUp = ({ title, buttonType, componentId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({
    id: "",
    assignedTo: "",
    remark: "",
  });
  const [error, setError] = useState({
    assignedTo: "",
    remark: "",
  });
  const [convertedList, setConvertedList] = useState([]);
  const handleSelectInputChange = (e) => {
    const value = JSON.parse(e.target.value);
    console.log(value);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      id: componentId,
      assignedTo: value,
    }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  function storeData(componentId) {
    if (componentId) {
      api
        .patch(
          "/dispatches/" + parseInt(componentId),
          JSON.stringify(formValues),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success("Employee updated successfully");
          window.location.reload();
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
  function fetchEmployee() {
    api
      .get("/employees")
      .then((res) => {
        setConvertedList(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchEmployee();
  }, [componentId]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      id: "",
      assignedTo: "",
      remark: "",
    });
    let newErrors = {};
    if (formValues.assignedTo === "") {
      newErrors = {
        ...newErrors,
        assignedTo: "employee cannot Be Empty",
      };
      console.log("employee cannot Be Empty");
    }
    if (formValues.remark === "") {
      newErrors = {
        ...newErrors,
        remark: "employee cannot Be Empty",
      };
      console.log("employee cannot Be Empty");
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      storeData(componentId);
    }
  };
  const handleReset = () => {
    setError({
      id: "",
      assignedTo: "",
      remark: "",
    });
    setFormValues({
      id: "",
      assignedTo: "",
      remark: "",
    });
  };

  return (
    <div className="p-2">
      <div className={buttonType} onClick={handleOpen}>
        {title}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card p-2">
            <div
              className="card-header h4"
              style={{ border: "0", backgroundColor: "white" }}
            >
              Assign Employee
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="assignedTo"
                    className="form-label customizedLabel"
                  >
                    Employee *
                  </label>
                  <select
                    className="form-select form-select-md"
                    aria-label="Default select example"
                    name="assignedTo"
                    id="assignedTo"
                    defaultValue="0" // Use defaultValue to set the default selected option
                    onChange={handleSelectInputChange}
                  >
                    <option value="">Select Employee</option>
                    {convertedList.map((item) => (
                      <option key={item.id} value={JSON.stringify(item)}>
                        {item.fullName}
                      </option>
                    ))}
                  </select>

                  <small
                    id="helpId"
                    className="form-text text-muted"
                    style={{ paddingLeft: "2%" }}
                  >
                    {error.employee === null || error.employee === "" ? (
                      <span className="text-secondary small">
                        Please Select Any Other Option Than The First One
                      </span>
                    ) : (
                      <span className="text-danger small">
                        {error.employee}
                      </span>
                    )}
                  </small>
                </div>
                <div>
                  <label
                    htmlFor="remark"
                    className="form-label customizedLabel"
                  >
                    Remark *
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-md"
                    name="remark"
                    id="remark"
                    aria-describedby="helpId"
                    placeholder="Remark"
                    onChange={handleInputChange}
                    value={formValues.remark}
                  />

                  <small
                    id="helpId"
                    className="form-text text-muted"
                    style={{ paddingLeft: "2%" }}
                  >
                    {error.remark === null || error.remark === "" ? (
                      <span className="text-secondary small">
                        Please Select Any Other Option Than The First One
                      </span>
                    ) : (
                      <span className="text-danger small">{error.remark}</span>
                    )}
                  </small>
                </div>
                <div className="container-fluid d-flex justify-content-end">
                  <button className="submitButton">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEmployeePopUp;
