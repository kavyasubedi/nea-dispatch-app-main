import React, { useState } from 'react'

export default function CreateDispatchRecord() {




    const [formValues, setFormValues] = useState({
        status: "",
        publicationDate: "",
        employee: "",
        area: "",
    });
    const [error, setError] = useState({
        status: "",
        publicationDate: "",
        employee: "",
        area: "",
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
        console.log('submitted');
    }




    const handleSubmit = async (event) => {
        event.preventDefault();
        // Initialize an empty object to accumulate errors
        setError({
            status: "",
            publicationDate: "",
            employee: "",
            area: "",
        });
        let newErrors = {};
        if (formValues.status === "") {
            newErrors = { ...newErrors, status: "Service Provider Name cannot Be Empty" };
            console.log("Service Provider Name cannot Be Empty");
        } else if (formValues.status.length < 3) {
            newErrors = {
                ...newErrors,
                status: "Service Provider Name must be atleast 3 characters long",
            };
            console.log("Service Provider Name must be atleast 3 characters long");
        }
        if (formValues.publicationDate === "") {
            newErrors = { ...newErrors, publicationDate: "Service Provider publicationDate cannot Be Empty" };
            console.log("Service Provider publicationDate cannot Be Empty");
        }
        if (formValues.employee === "") {
            newErrors = { ...newErrors, employee: "Service Provider Status cannot Be Empty" };
            console.log("Service Provider Status cannot Be Empty");
        }
        if (formValues.area === "") {
            newErrors = { ...newErrors, area: "Service Provider area cannot Be Empty" };
            console.log("Service Provider area cannot Be Empty");
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
            status: "",
            publicationDate: "",
            employee: "",
            area: "",
        });
        setFormValues({
            status: "",
            publicationDate: "",
            employee: "",
            area: "",
        });
    };



    return (
        <div className="card p-2" style={{ minHeight: '87vh' }}>
            <div className="card-header h4" style={{ border: '0', backgroundColor: 'white' }}>Create Dispatch Record</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* service provider name */}
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
                                placeholder="Branch Name"
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
                        {/* Service provider code */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <label htmlFor="publicationDate" className="form-label customizedLabel">
                                Publication Date *
                            </label>
                            <input
                                type="Date"
                                className="form-control form-control-md"
                                name="publicationDate"
                                id="publicationDate"
                                aria-describedby="helpId"
                                placeholder="Service Provider publicationDate"
                                onChange={handleInputChange}
                                value={formValues.publicationDate}
                            />
                            <small
                                id="helpId"
                                className="form-text text-muted"
                                style={{ paddingLeft: "2%" }}
                            >
                                {error.publicationDate === null || error.publicationDate === "" ? (
                                    <span className="text-secondary small">
                                        Legal name used in citizenship.
                                    </span>
                                ) : (
                                    <span className="text-danger small">{error.publicationDate}</span>
                                )}
                            </small>
                        </div>

                        {/* Service provider status */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <label htmlFor="employee" className="form-label customizedLabel">
                                employee *
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                name="employee"
                                id="employee"
                                aria-describedby="helpId"
                                placeholder="Service Provider Code"
                                onChange={handleInputChange}
                                value={formValues.employee}
                            />
                            <small
                                id="helpId"
                                className="form-text text-muted"
                                style={{ paddingLeft: "2%" }}
                            >
                                {error.employee === null || error.employee === "" ? (
                                    <span className="text-secondary small">
                                        Legal name used in citizenship.
                                    </span>
                                ) : (
                                    <span className="text-danger small">{error.employee}</span>
                                )}
                            </small>
                        </div>
                        {/* Service provider */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <label htmlFor="area" className="form-label customizedLabel">
                                Area *
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                name="area"
                                id="area"
                                aria-describedby="helpId"
                                placeholder="Service Provider Code"
                                onChange={handleInputChange}
                                value={formValues.area}
                            />
                            <small
                                id="helpId"
                                className="form-text text-muted"
                                style={{ paddingLeft: "2%" }}
                            >
                                {error.area === null || error.area === "" ? (
                                    <span className="text-secondary small">
                                        Legal name used in citizenship.
                                    </span>
                                ) : (
                                    <span className="text-danger small">{error.area}</span>
                                )}
                            </small>
                        </div>
                    </div>
                    <div className="container-fluid d-flex justify-content-end gap-2">
                        <button className='submitButton'>Submit</button>
                        <button className='resetButton' onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
