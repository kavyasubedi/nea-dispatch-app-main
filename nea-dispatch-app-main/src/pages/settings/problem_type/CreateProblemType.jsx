import React, { useState } from 'react'

export default function CreateProblemType() {




  const [formValues, setFormValues] = useState({
    name: "",
  });
  const [error, setError] = useState({
    name: "",
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
      name: "",
    });
    let newErrors = {};
    if (formValues.name === "") {
      newErrors = { ...newErrors, name: "Problem Name cannot Be Empty" };
      console.log("Problem Name cannot Be Empty");
    } else if (formValues.name.length < 3) {
      newErrors = {
        ...newErrors,
        name: "Problem Name must be atleast 3 characters long",
      };
      console.log("Problem Name must be atleast 3 characters long");
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
    });
    setFormValues({
      name: "",
    });
  };



  return (
    <div className="card p-2" style={{ minHeight: '87vh' }}>
      <div className="card-header h4" style={{ border: '0', backgroundColor: 'white' }}>Add New Problem Type</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* service provider name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                Problem Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="name"
                id="name"
                aria-describedby="helpId"
                placeholder="Problem Name"
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

          </div>
          <div className="container-fluid d-flex justify-content-end gap-2 mt-4">
            <button className='submitButton'>Submit</button>
            <button className='resetButton' onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}
