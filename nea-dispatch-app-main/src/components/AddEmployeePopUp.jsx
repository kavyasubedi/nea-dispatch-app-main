import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import api from "../../../Axios";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const AddEmployeePopUp = ({ title, buttonType, componentId }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formValues, setFormValues] = useState({
        employee: "",
    });
    const [error, setError] = useState({
        employee: "",
    });
    const [convertedList, setConvertedList] = useState([]);
    const handleInputChange = (event) => {
        const value = JSON.parse(event.target.value);
        console.log("value of the selected dropdown", value);
        const toAssignValue = JSON.parse(event.target.value);
        setFormValues({ ...formValues, [name]: toAssignValue });
    };

    function storeData(componentId) {
        if (componentId) {
            api
                .patch("/dispatches/1", JSON.stringify(formValues), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    setError(res.data);
                })
                .catch((e) => {
                    setError(e.response.data);
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
                console.log("before filter", res.data);
            })
            .catch((e) => console.log(e));
    }
    console.log("Employee:", convertedList);
    useEffect(() => {
        fetchEmployee();
    }, [componentId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Initialize an empty object to accumulate errors
        setError({
            employee: "",
        });
        let newErrors = {};
        if (formValues.employee === "") {
            newErrors = {
                ...newErrors,
                employee: "employee cannot Be Empty",
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
            employee: "",
        });
        setFormValues({
            employee: "",
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
                    <div className="card p-2" style={{ minHeight: "87vh" }}>
                        <div
                            className="card-header h4"
                            style={{ border: "0", backgroundColor: "white" }}
                        >
                            Assign Employee
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label
                                            htmlFor="employee"
                                            className="form-label customizedLabel"
                                        >
                                            Employee *
                                        </label>
                                        <select
                                            className="form-select form-select-md"
                                            aria-label="Default select example"
                                            name="employee"
                                            id="employee"
                                            defaultValue="0" // Use defaultValue to set the default selected option
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Employee</option>
                                            {convertedList.map((item) => (
                                                <option key={item.id} value={item}>
                                                    {item.fullName}
                                                </option>
                                            ))}
                                        </select>

                                        {JSON.stringify(formValues)}
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
                                </div>
                                {/* {JSON.stringify(formValues)} */}
                                <div className="container-fluid d-flex justify-content-end gap-2">
                                    <button className="submitButton">Submit</button>
                                    <button className="resetButton" onClick={handleReset}>
                                        Reset
                                    </button>
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