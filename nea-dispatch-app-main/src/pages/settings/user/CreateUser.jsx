import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../../../Axios";
import { toast } from "react-toastify";
import { convertDateTimeToServer } from "/src/date-utils.js";

export default function CreateUser() {
  const options = [
    { value: "ROLE_ADMIN", label: "ROLE_ADMIN" },
    { value: "ROLE_USER", label: "ROLE_USER" },
  ];
  const [formValues, setFormValues] = useState({
    id: "",
    login: "",
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    activated: true,
    createdBy: "",
    createdDate: null,
    lastModifiedBy: "",
    lastModifiedDate: null,
    authorities: [],
    langKey: "en",
    password: "",
  });
  const [employeeFormValues, setEmployeeFormValues] = useState({
    id: 0,
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    photo: "",
    photoContentType: "",
    citizenshipNo: "",
    panNo: "",
    detail: "",
    code: "",
    maritalStatus: "",
    position: "",
    baseSalary: "",
    startDate: "",
    endDate: "",
    status: "",
    user: null,
    education: "",
    experienceYears: "",
  });
  const [error, setError] = useState({
    login: "",
    firstName: "",
    lastName: "",
    email: "",
    authorities: [],
    maritalStatus: "",
    position: "",
    baseSalary: "",
    startDate: "",
    endDate: "",
    education: "",
    experienceYears: "",
  });

  const [convertedList, setConvertedList] = useState([]);
  function fetchStatusData() {
    api
      .get("/enums/statuses")
      .then((res) => {
        const fetchedData = res.data;
        // Process fetched data as needed, reorganize it based on columns
        // setData(reorganizedData);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  function storeData() {
    api
      .post("/admin/users", formValues, {})
      .then((res) => {
        storeEmployeeData(res.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          const errorMessage = error.response.data.detail;
          // Define a regular expression to match the properties
          const propertiesRegex = /properties='(.+?)'/;

          // Use the regular expression to find the properties in the error message
          const match = errorMessage.match(propertiesRegex);

          // Extract the properties if a match is found
          const properties = match ? match[1] : null;

          // Log the extracted properties
          const messageRegex = /message=([^,}]+)/;

          // Use the regular expression to find the message value in the properties string
          const newMatch = properties.match(messageRegex);

          // Extract the message value if a newMatch is found
          const messageValue = newMatch ? newMatch[1].trim() : null;

          // Log the extracted message value
          if (messageValue == "error.emailexists") {
            toast.warning("Email Already Exists");
          } else {
            toast.warning(messageValue);
          }
        } else {
          // Handle other types of errors
          toast.error("An error occurred.");
        }
      });
    console.log("submitted");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      login: "",
      firstName: "",
      lastName: "",
      email: "",
      authorities: [],
    });
    let newErrors = {};
    if (formValues.login === "") {
      newErrors = { ...newErrors, login: "User Name cannot Be Empty" };
      console.log("User Name cannot Be Empty");
    }
    if (formValues.email === "") {
      newErrors = { ...newErrors, email: "Email cannot Be Empty" };
      console.log("Email cannot Be Empty");
    }
    if (formValues.firstName === "") {
      newErrors = { ...newErrors, firstName: "First Name cannot Be Empty" };
      console.log("Name cannot Be Empty");
    }
    if (formValues.lastName === "") {
      newErrors = { ...newErrors, lastName: "Last Name cannot Be Empty" };
      console.log("Name cannot Be Empty");
    }
    if (formValues.authorities.length == 0) {
      newErrors = { ...newErrors, authorities: "Authorities cannot Be Empty" };
      console.log("Name cannot Be Empty");
    }
    if (employeeFormValues.dob === "") {
      newErrors = { ...newErrors, dob: "Code cannot Be Empty" };
      console.log("Code cannot Be Empty");
    }
    if (employeeFormValues.gender === "") {
      newErrors = { ...newErrors, gender: "Gender cannot Be Empty" };
      console.log("Gender cannot Be Empty");
    }
    if (employeeFormValues.mobile === "") {
      newErrors = { ...newErrors, mobile: "Mobile cannot Be Empty" };
      console.log("Mobile cannot Be Empty");
    } else if (employeeFormValues.mobile.length < 10) {
      newErrors = {
        ...newErrors,
        mobile: "Mobile Number must be at least 10 characters long",
      };
      console.log("Mobile Number must be at least 10 characters long");
    }
    if (employeeFormValues.citizenshipNo === "") {
      newErrors = {
        ...newErrors,
        citizenshipNo: "Citizenship cannot Be Empty",
      };
      console.log("Citizenship No cannot Be Empty");
    } else if (employeeFormValues.panNo.length < 3) {
      newErrors = {
        ...newErrors,
        panNo: "Citizenship No must be at least 3 characters long",
      };
      console.log("Citizenship No must be at least 3 characters long");
    }
    if (employeeFormValues.panNo === "") {
      newErrors = { ...newErrors, panNo: "PAN No cannot Be Empty" };
      console.log("PAN No cannot Be Empty");
    } else if (employeeFormValues.panNo.length < 9) {
      newErrors = {
        ...newErrors,
        panNo: "PAN No must be at least 9 characters long",
      };
      console.log("PAN No must be at least 9 characters long");
    }
    if (employeeFormValues.detail === "") {
      newErrors = { ...newErrors, detail: "Experience cannot Be Empty" };
      console.log("Experience cannot Be Empty");
    }
    if (employeeFormValues.maritalStatus === "") {
      newErrors = {
        ...newErrors,
        maritalStatus: "Marital Status cannot Be Empty",
      };
      console.log("Marital Status cannot Be Empty");
    }
    if (employeeFormValues.baseSalary === "") {
      newErrors = { ...newErrors, baseSalary: "Base Salary cannot Be Empty" };
      console.log("Base Salary cannot Be Empty");
    }
    if (employeeFormValues.position === "") {
      newErrors = {
        ...newErrors,
        position: "Employee Position cannot Be Empty",
      };
      console.log("Employee Position cannot Be Empty");
    }
    if (employeeFormValues.startDate === "") {
      newErrors = { ...newErrors, startDate: "Start Date cannot Be Empty" };
      console.log("Start Date cannot Be Empty");
    }
    if (employeeFormValues.endDate === "") {
      newErrors = { ...newErrors, endDate: "End Date cannot Be Empty" };
      console.log("End Date cannot Be Empty");
    }
    if (employeeFormValues.code === "") {
      newErrors = { ...newErrors, code: "Employee Code cannot Be Empty" };
      console.log("Employee Code cannot Be Empty");
    }
    if (employeeFormValues.education === "") {
      newErrors = {
        ...newErrors,
        education: "Employee education cannot Be Empty",
      };
      console.log("Employee education cannot Be Empty");
    }
    if (employeeFormValues.experienceYears === "") {
      newErrors = {
        ...newErrors,
        experienceYears: "Experience Years cannot Be Empty",
      };
      console.log("Experience Years cannot Be Empty");
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
      id: "",
      login: "",
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      activated: true,
      createdBy: "",
      createdDate: null,
      lastModifiedBy: "",
      lastModifiedDate: null,
      authorities: [],
      langKey: "en",
      password: "",
    });
    setFormValues({
      id: 0,
      fullName: "",
      dob: "",
      gender: "",
      mobile: "",
      photo: "",
      photoContentType: "",
      citizenshipNo: "",
      panNo: "",

      detail: "",
      code: "",
      maritalStatus: "",
      position: "",
      baseSalary: "",
      startDate: "",
      endDate: "",
      status: "",
      user: null,
      education: "",
      experienceYears: "",
    });
    setError({
      fullName: "",
      dob: "",
      gender: "",
      mobile: "",
      photo: "",
      citizenshipNo: "",
      panNo: "",
      detail: "",
      status: "",
      user: "",
    });
    setEmployeeFormValues({
      fullName: "",
      dob: "",
      gender: "",
      mobile: "",
      photo: "",
      citizenshipNo: "",
      panNo: "",
      detail: "",
      status: "",
      code: "",
      maritalStatus: "",
      position: "",
      baseSalary: "",
      startDate: "",
      endDate: "",
      user: "",
    });
  };

  const handleChange = (selectedOption) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      authorities: selectedOption.map((r) => r.value),
    }));
  };

  const handleEmployeeInputChange = (event) => {
    const { name, value, type } = event.target;
    setEmployeeFormValues({ ...employeeFormValues, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name } = event.target;
    // Access the files from the file input
    const files = event.target.files;

    // Check if files array is not empty
    if (files.length > 0) {
      const file = files[0];
      // Check file size (in bytes)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert(
          "File size exceeds the limit of 2MB. Please choose a smaller file."
        );
        // Optionally, you can clear the file input
        event.target.value = null;
        return;
      } else {
        // Update state with the file
        const reader = new FileReader();

        reader.onload = (e) => {
          // Update state with the binary data of the file
          const contentType = e.target.result.split(";")[0].split(":")[1];
          setEmployeeFormValues({
            ...employeeFormValues,
            // [name]: file
            [name]: e.target.result.split(",")[1], // Extract the base64 data part
            photoContentType: contentType,
          });
        };

        reader.readAsDataURL(file);
      }
    } else {
      // Handle the case where no file is selected
      setError({
        ...error,
        photo: "Please Add A File",
      });
      alert("Please select a file.");
    }
  };

  function storeEmployeeData(responseData) {
    if (typeof employeeFormValues.dob === "string") {
      const dobDate = new Date(employeeFormValues.dob);
      // Check if the conversion was successful
      if (!isNaN(dobDate.getTime())) {
        employeeFormValues.dob = convertDateTimeToServer(dobDate);
      } else {
        // Handle the case where the conversion failed
        alert("Invalid date string:", employeeFormValues.dob);
        return null;
      }
    }
    if (typeof employeeFormValues.startDate === "string") {
      const startDate = new Date(employeeFormValues.startDate);

      // Check if the conversion was successful
      if (!isNaN(startDate.getTime())) {
        employeeFormValues.startDate = convertDateTimeToServer(startDate);
      } else {
        // Handle the case where the conversion failed
        alert("Invalid date string:", employeeFormValues.startDate);
        return null;
      }
    }
    if (typeof employeeFormValues.endDate === "string") {
      const endDate = new Date(employeeFormValues.endDate);

      // Check if the conversion was successful
      if (!isNaN(endDate.getTime())) {
        employeeFormValues.endDate = convertDateTimeToServer(endDate);
      } else {
        // Handle the case where the conversion failed
        alert("Invalid date string:", employeeFormValues.endDate);
        return null;
      }
    }

    const emp = {
      fullName: formValues.firstName + " " + formValues.lastName,
      dob: employeeFormValues.dob,
      gender: employeeFormValues.gender,
      mobile: employeeFormValues.mobile,
      photo: employeeFormValues.photo,
      citizenshipNo: employeeFormValues.citizenshipNo,
      panNo: employeeFormValues.panNo,
      detail: employeeFormValues.detail,
      maritalStatus: employeeFormValues.maritalStatus,
      position: employeeFormValues.position,
      baseSalary: employeeFormValues.baseSalary,
      startDate: employeeFormValues.startDate,
      endDate: employeeFormValues.endDate,
      code: employeeFormValues.code,
      user: {
        id: responseData.id,
        login: responseData.login,
      },
    };
    if (employeeFormValues.id > 0) {
      emp.id = employeeFormValues.id;
      api
        .patch(`/employees/${emp.id}`, emp)
        .then((res) => {
          toast.success("success");
          window.location.reload();
          window.location.href = "#/user-edit/" + responseData.login;
        })
        .catch((e) => {
          // setError(e.response.data);
          toast.warning("Please Recheck The Form");
        });
    } else {
      api
        .post("/employees", emp)
        .then((res) => {
          toast.success("success");
          window.location.href = "#/user-edit/" + responseData.login;
        })
        .catch((e) => {
          // setError(e.response.data);
          toast.warning("Please Recheck The Form");
        });
    }
  }

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        Add New Employee
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* User name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="login" className="form-label customizedLabel">
                User Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="login"
                id="login"
                aria-describedby="helpId"
                placeholder="User Name"
                onChange={handleInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.login === null || error.login === "" ? (
                  <span className="text-secondary small">
                    Unique Username For Login.
                  </span>
                ) : (
                  <span className="text-danger small">{error.login}</span>
                )}
              </small>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="email" className="form-label customizedLabel">
                Email *
              </label>
              <input
                type="email"
                className="form-control form-control-md"
                name="email"
                id="email"
                autoComplete="email"
                aria-describedby="helpId"
                placeholder="Email"
                onChange={handleInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.email === null || error.email === "" ? (
                  <span className="text-secondary small">
                    Email to receive password.
                  </span>
                ) : (
                  <span className="text-danger small">{error.email}</span>
                )}
              </small>
            </div>
            {/* First name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="firstName" className="form-label customizedLabel">
                First Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="firstName"
                id="firstName"
                aria-describedby="helpId"
                placeholder="First Name"
                onChange={handleInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.firstName === null || error.firstName === "" ? (
                  <span className="text-secondary small">
                    Legal name used in citizenship.
                  </span>
                ) : (
                  <span className="text-danger small">{error.firstName}</span>
                )}
              </small>
            </div>
            {/* last name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="lastName" className="form-label customizedLabel">
                Last Name *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="lastName"
                id="lastName"
                aria-describedby="helpId"
                placeholder="Last Name"
                onChange={handleInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.lastName === null || error.lastName === "" ? (
                  <span className="text-secondary small">
                    Legal name used in citizenship.
                  </span>
                ) : (
                  <span className="text-danger small">{error.lastName}</span>
                )}
              </small>
            </div>
            {/* Authorities */}
            <div className="col-12 col-md-6 col-lg-3">
              <label
                htmlFor="authorities"
                className="form-label customizedLabel"
              >
                Authorities *
              </label>
              <Select
                onChange={handleChange}
                options={options}
                placeholder="Select a Authorities"
                name="authorities"
                id="authorities"
                isMulti
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.authorities == null || error.authorities == "" ? (
                  <span className="text-secondary small">
                    Authorities to Give the User.
                  </span>
                ) : (
                  <span className="text-danger small">{error.authorities}</span>
                )}
              </small>
            </div>
          </div>
          <div className="row">
            {/* dob */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="dob" className="form-label customizedLabel">
                Date Of Birth *
              </label>
              {employeeFormValues.dob}
              <input
                name="dob"
                id="employee-dob"
                data-cy="dob"
                placeholder="YYYY-MM-DD HH:mm"
                type="date"
                className=" is-touched is-valid form-control"
                aria-invalid="false"
                onChange={handleEmployeeInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.dob == null || error.dob == "" ? (
                  <span className="text-secondary small">
                    Legal DOB used in citizenship.
                  </span>
                ) : (
                  <span className="text-danger small">{error.dob}</span>
                )}
              </small>
            </div>
            {/* gender */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="gender" className="form-label customizedLabel">
                Gender *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                onChange={handleEmployeeInputChange}
                name="gender"
                id="gender"
              >
                <option value="0">Open this select menu</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.gender == null || error.gender == "" ? (
                  <span className="text-secondary small">
                    Legal gender used in citizenship.
                  </span>
                ) : (
                  <span className="text-danger small">{error.gender}</span>
                )}
              </small>
            </div>
            {/* mobile */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="mobile" className="form-label customizedLabel">
                Mobile *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="mobile"
                id="mobile"
                aria-describedby="helpId"
                placeholder="Mobile"
                onChange={handleEmployeeInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.mobile == null || error.mobile == "" ? (
                  <span className="text-secondary small">
                    Users Phone Number.
                  </span>
                ) : (
                  <span className="text-danger small">{error.mobile}</span>
                )}
              </small>
            </div>
            {/* code */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="photo" className="form-label customizedLabel">
                Photo
              </label>
              <input
                type="file"
                className="form-control form-control-md"
                name="photo"
                id="photo"
                aria-describedby="helpId"
                onChange={handleFileChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.photo == null || error.photo == "" ? (
                  <span className="text-secondary small">
                    Users Profile Photo.
                  </span>
                ) : (
                  <span className="text-danger small">{error.photo}</span>
                )}
              </small>
            </div>
            {/* citizenshipNo */}
            <div className="col-12 col-md-6 col-lg-3">
              <label
                htmlFor="citizenshipNo"
                className="form-label customizedLabel"
              >
                Citizenship/License No *
              </label>
              <input
                type="number"
                className="form-control form-control-md"
                name="citizenshipNo"
                id="citizenshipNo"
                aria-describedby="helpId"
                placeholder="Citizenship/License No"
                onChange={handleEmployeeInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.citizenshipNo == null || error.citizenshipNo == "" ? (
                  <span className="text-secondary small">
                    Citizenship/License Number.
                  </span>
                ) : (
                  <span className="text-danger small">
                    {error.citizenshipNo}
                  </span>
                )}
              </small>
            </div>
            {/* panNo */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="panNo" className="form-label customizedLabel">
                PAN No *
              </label>
              <input
                type="number"
                className="form-control form-control-md"
                name="panNo"
                id="panNo"
                aria-describedby="helpId"
                placeholder="PAN Number"
                onChange={handleEmployeeInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.panNo == null || error.panNo == "" ? (
                  <span className="text-secondary small">PAN Number.</span>
                ) : (
                  <span className="text-danger small">{error.panNo}</span>
                )}
              </small>
            </div>
            {/* detail */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="detail" className="form-label customizedLabel">
                Detail *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="detail"
                id="detail"
                aria-describedby="helpId"
                placeholder="Detail"
                onChange={handleEmployeeInputChange}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.detail == null || error.detail == "" ? (
                  <span className="text-secondary small">Employee Detail.</span>
                ) : (
                  <span className="text-danger small">{error.detail}</span>
                )}
              </small>
            </div>
            {/* code */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="code" className="form-label customizedLabel">
                Employee code *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="code"
                id="code"
                aria-describedby="helpId"
                placeholder="Employee Code"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.code}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.code === null || error.code === "" ? (
                  <span className="text-secondary small">Employee code.</span>
                ) : (
                  <span className="text-danger small">{error.code}</span>
                )}
              </small>
            </div>
            {/* marital status */}
            <div className="col-12 col-md-6 col-lg-3">
              <label
                htmlFor="maritalStatus"
                className="form-label customizedLabel"
              >
                Marital Status *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                onChange={handleEmployeeInputChange}
                name="maritalStatus"
                value={employeeFormValues.maritalStatus}
                id="maritalStatus"
              >
                <option value="">Open this select menu</option>
                <option value="married">Married</option>
                <option value="unmarried">UnMarried</option>
              </select>
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.maritalStatus === null || error.maritalStatus === "" ? (
                  <span className="text-secondary small">Marital Status.</span>
                ) : (
                  <span className="text-danger small">
                    {error.maritalStatus}
                  </span>
                )}
              </small>
            </div>
            {/* position */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="position" className="form-label customizedLabel">
                Position *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="position"
                id="position"
                aria-describedby="helpId"
                placeholder="Position"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.position}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.position === null || error.position === "" ? (
                  <span className="text-secondary small">Position.</span>
                ) : (
                  <span className="text-danger small">{error.position}</span>
                )}
              </small>
            </div>
            {/* baseSalary */}
            <div className="col-12 col-md-6 col-lg-3">
              <label
                htmlFor="baseSalary"
                className="form-label customizedLabel"
              >
                Base Salary *
              </label>
              <input
                type="number"
                className="form-control form-control-md"
                name="baseSalary"
                id="baseSalary"
                aria-describedby="helpId"
                placeholder="Base Salary"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.baseSalary}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.baseSalary === null || error.baseSalary === "" ? (
                  <span className="text-secondary small">Base Salary.</span>
                ) : (
                  <span className="text-danger small">{error.baseSalary}</span>
                )}
              </small>
            </div>
            {/* startDate */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="startDate" className="form-label customizedLabel">
                Start Date *
              </label>
              <input
                type="date"
                className="form-control form-control-md"
                name="startDate"
                id="startDate"
                aria-describedby="helpId"
                placeholder="startDate"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.startDate}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.startDate === null || error.startDate === "" ? (
                  <span className="text-secondary small">Start Date.</span>
                ) : (
                  <span className="text-danger small">{error.startDate}</span>
                )}
              </small>
            </div>
            {/* endDate */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="endDate" className="form-label customizedLabel">
                End Date *
              </label>
              <input
                type="date"
                className="form-control form-control-md"
                name="endDate"
                id="endDate"
                aria-describedby="helpId"
                placeholder="endDate"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.endDate}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.endDate === null || error.endDate === "" ? (
                  <span className="text-secondary small">End Date.</span>
                ) : (
                  <span className="text-danger small">{error.endDate}</span>
                )}
              </small>
            </div>
            {/* education */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="education" className="form-label customizedLabel">
                education *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="education"
                id="education"
                aria-describedby="helpId"
                placeholder="education"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.education}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.education === null || error.education === "" ? (
                  <span className="text-secondary small">
                    Employee Education.
                  </span>
                ) : (
                  <span className="text-danger small">{error.education}</span>
                )}
              </small>
            </div>
            {/* experienceYears */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="detail" className="form-label customizedLabel">
                Experience Years *
              </label>
              <input
                type="number"
                className="form-control form-control-md"
                name="detail"
                id="detail"
                aria-describedby="helpId"
                placeholder="Experience Years"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.detail}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.detail === null || error.detail === "" ? (
                  <span className="text-secondary small">Experience year.</span>
                ) : (
                  <span className="text-danger small">{error.detail}</span>
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
