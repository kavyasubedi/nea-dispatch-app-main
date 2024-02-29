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

const UpdateJobsPopUp = ({ title, buttonType, componentId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({
    remark: "",
    dispatch: "",
    status: "",
  });
  const [error, setError] = useState({
    remark: "",
    dispatch: "",
    status: "",
  });
  const [convertedList, setConvertedList] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function storeData() {
    api
      .post("/dispatch-records", formValues)
      .then((res) => {
        toast.success("Task updated successfully");
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
  }
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
  useEffect(() => {
    fetchStatusData();
    setFormValues((prevValues) => ({
      ...prevValues,
      dispatch: componentId,
    }));
  }, [componentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      remark: "",
      dispatch: "",
      status: "",
    });
    let newErrors = {};
    if (formValues.remark === "") {
      newErrors = {
        ...newErrors,
        remark: "remark cannot Be Empty",
      };
      console.log("remark cannot Be Empty");
    } else if (formValues.remark.length < 3) {
      newErrors = {
        ...newErrors,
        remark: "remark must be atleast 3 characters",
      };
      console.log("remark must be atleast 3 characters");
    }
    if (formValues.dispatch === "") {
      newErrors = {
        ...newErrors,
        dispatch: "dispatch cannot Be Empty",
      };
      console.log("dispatch cannot Be Empty");
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
              Update Job
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label
                      htmlFor="status"
                      className="form-label customizedLabel"
                    >
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
                        Select One Status
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
                          Please Select Any Other Option Than The First One
                        </span>
                      ) : (
                        <span className="text-danger small">
                          {error.status}
                        </span>
                      )}
                    </small>
                  </div>
                  <div className="col-12 col-lg-6">
                    <label
                      htmlFor="remark"
                      className="form-label customizedLabel"
                    >
                      Remark*
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
                    ></input>
                    <small
                      id="helpId"
                      className="form-text text-muted"
                      style={{ paddingLeft: "2%" }}
                    >
                      {error.remark === null || error.remark === "" ? (
                        <span className="text-secondary small">
                          Remark is required
                        </span>
                      ) : (
                        <span className="text-danger small">
                          {error.remark}
                        </span>
                      )}
                    </small>
                  </div>
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

export default UpdateJobsPopUp;
