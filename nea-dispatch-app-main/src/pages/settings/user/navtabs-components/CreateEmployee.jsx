import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "/src/Axios";
import {
  convertDateFromServer,
  convertDateTimeToServer,
} from "/src/date-utils.js";
import { useDispatch, useSelector } from "react-redux";

export default function CreateEmployee() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const [employeeFormValues, setemployeeFormValues] = useState({
    id: 0,
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    code: "",
    maritalStatus: "",
    photo: "",
    photoContentType: "",
    citizenshipNo: "",
    panNo: "",
    detail: "",
    position: "",
    baseSalary: "",
    startDate: "",
    endDate: "",
    user: {},
    education: "",
    experienceYears: "",
  });

  const [error, setError] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    photo: "",
    maritalStatus: "",
    citizenshipNo: "",
    panNo: "",
    detail: "",
    status: "",
    position: "",
    baseSalary: "",
    startDate: "",
    endDate: "",
    code: "",
    education: "",
    experienceYears: "",
  });
  useEffect(() => {
    console.log(data.user);
    if (data.user?.employee)
      setemployeeFormValues({
        ...data.user.employee,
        fullName: data.user?.firstName + " " + data.user?.lastName,
        user: {
          id: data.user.id,
          login: data.user.login,
        },
      });
  }, []);

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
        event.target.value = "";
        return;
      } else {
        // Update state with the file
        const reader = new FileReader();

        reader.onload = (e) => {
          // Update state with the binary data of the file
          const contentType = e.target.result.split(";")[0].split(":")[1];
          setemployeeFormValues({
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

  const handleEmployeeInputChange = (event) => {
    const { name, value, type } = event.target;
    setemployeeFormValues({ ...employeeFormValues, [name]: value });
  };

  function storeEmployeeData() {
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
      fullName: employeeFormValues.fullName,
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
        id: data.user.id,
        login: data.user.login,
      },
    };
    if (employeeFormValues.id > 0) {
      emp.id = employeeFormValues.id;
      api
        .patch(`/employees/${emp.id}`, emp)
        .then((res) => {
          console.log(res);
          toast.success("success");
        })
        .catch((e) => {
          // setError(e.response.data);
          toast.warning("Please Recheck The Form");
        });
    } else {
      api
        .post("/employees", emp)
        .then((res) => {
          console.log(res);
          toast.success("success");
        })
        .catch((error) => {
          console.log(error);
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
  }

  const handleEmployeeSubmit = async (event) => {
    event.preventDefault();

    let newErrors = {};
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
    }

    if (employeeFormValues.citizenshipNo === "") {
      newErrors = {
        ...newErrors,
        citizenshipNo: "Citizenship cannot Be Empty",
      };
      console.log("Citizenship No cannot Be Empty");
    }
    if (employeeFormValues.panNo === "") {
      newErrors = { ...newErrors, panNo: "PAN No cannot Be Empty" };
      console.log("PAN No cannot Be Empty");
    }
    if (employeeFormValues.detail === "") {
      newErrors = { ...newErrors, detail: "Employee Details cannot Be Empty" };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.maritalStatus === "") {
      newErrors = { ...newErrors, maritalStatus: " cannot Be Empty" };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.baseSalary === "") {
      newErrors = { ...newErrors, baseSalary: "Base Salary cannot Be Empty" };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.position === "") {
      newErrors = {
        ...newErrors,
        position: "Employee Position cannot Be Empty",
      };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.startDate === "") {
      newErrors = { ...newErrors, startDate: "Start Date cannot Be Empty" };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.endDate === "") {
      newErrors = { ...newErrors, endDate: "End Date cannot Be Empty" };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.code === "") {
      newErrors = { ...newErrors, code: "Employee Code cannot Be Empty" };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.education === "") {
      newErrors = {
        ...newErrors,
        education: "education cannot Be Empty",
      };
      console.log(" cannot Be Empty");
    }
    if (employeeFormValues.experienceYears === "") {
      newErrors = {
        ...newErrors,
        experienceYears: "Experience Years cannot Be Empty",
      };
      console.log(" cannot Be Empty");
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      storeEmployeeData();
    }
  };
  const handleEmployeeReset = () => {
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
    setemployeeFormValues({
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
  };

  return (
    <>
      {data.user && (
        <form onSubmit={handleEmployeeSubmit}>
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
                value={convertDateFromServer(employeeFormValues.dob)}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.dob === null || error.dob === "" ? (
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
                value={employeeFormValues.gender}
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
                {error.gender === null || error.gender === "" ? (
                  <span className="text-secondary small">Gender.</span>
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
                placeholder="mobile"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.mobile}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.mobile === null || error.mobile === "" ? (
                  <span className="text-secondary small">Mobile number.</span>
                ) : (
                  <span className="text-danger small">{error.mobile}</span>
                )}
              </small>
            </div>
            {/* code */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="photo" className="form-label customizedLabel">
                Photo *
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
                {error.photo === null || error.photo === "" ? (
                  <span className="text-secondary small">Profile Photo.</span>
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
                Citizenship No *
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                name="citizenshipNo"
                id="citizenshipNo"
                aria-describedby="helpId"
                placeholder="citizenshipNo"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.citizenshipNo}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.citizenshipNo === null || error.citizenshipNo === "" ? (
                  <span className="text-secondary small">Citizenship No.</span>
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
                placeholder="panNo"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.panNo}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.panNo === null || error.panNo === "" ? (
                  <span className="text-secondary small">Pan Number.</span>
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
                placeholder="detail"
                onChange={handleEmployeeInputChange}
                value={employeeFormValues.detail}
              />
              <small
                id="helpId"
                className="form-text text-muted"
                style={{ paddingLeft: "2%" }}
              >
                {error.detail === null || error.detail === "" ? (
                  <span className="text-secondary small">Details.</span>
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
                placeholder="code"
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
                placeholder="position"
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
                placeholder="baseSalary"
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
            {/* status */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="status" className="form-label customizedLabel">
                Status *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="status"
                id="status"
                value={employeeFormValues.status} // Use defaultValue to set the default selected option
                onChange={handleEmployeeInputChange}
              >
                {data.enumStatuses?.map(({ id, value }) => (
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
                  <span className="text-secondary small">Status</span>
                ) : (
                  <span className="text-danger small">{error.status}</span>
                )}
              </small>
            </div>
            {/* education */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="education" className="form-label customizedLabel">
                Education *
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
                  <span className="text-secondary small">education.</span>
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
                  <span className="text-secondary small">
                    Experience Years.
                  </span>
                ) : (
                  <span className="text-danger small">{error.detail}</span>
                )}
              </small>
            </div>
          </div>

          <div className="container-fluid d-flex justify-content-end gap-2">
            <button className="submitButton">Submit</button>
            <button className="resetButton" onClick={handleEmployeeReset}>
              Reset
            </button>
          </div>
        </form>
      )}
    </>
  );
}
