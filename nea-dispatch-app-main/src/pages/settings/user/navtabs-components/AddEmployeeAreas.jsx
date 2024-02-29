import React, { useEffect, useState } from "react";
import api from "../../../../Axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SimpleTable from "../../../../components/table/SimpleTable";

export default function AddEmployeeAreas() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const [branchList, setBranchList] = useState([]);
  const [formValues, setFormValues] = useState({
    branch: "",
    employee: {
      id: data.user.employee.id,
    },
  });
  const [error, setError] = useState({
    branch: "",
    employee: "",
  });

  const [branchData, setBranchData] = useState([]);

  function fetchBranchData() {
    api
      .get("/branches")
      .then((res) => {
        // Process fetched data as needed, reorganize it based on columns
        setBranchData(res.data);
      })
      .catch((e) => console.log(e));
  }
  function fetchEmployeeBranch() {
    api
      .get("/branches/employee/" + data?.user?.employee?.id)
      .then((res) => {
        setBranchList(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchEmployeeBranch();
    fetchBranchData();
    // Cleanup function to cancel ongoing requests when the component unmounts
  }, []);

  const handleBranchChange = (e) => {
    const value = JSON.parse(e.target.value);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      branch: {
        id: value.id,
        name: "string",
        code: "string",
        status: "OPEN",
      },
    }));
  };

  function storeData() {
    api
      .post("/employee-branches", formValues, {
        headers: {},
      })
      .then((res) => {
        toast.success("success");
        window.location.reload();
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
    console.log("submitted");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      branch: "",
      employee: "",
    });
    let newErrors = {};
    if (formValues.branch.id == "") {
      newErrors = { ...newErrors, name: "Branch cannot Be Empty" };
      console.log("Branch cannot Be Empty");
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
      branch: "",
      employee: "",
    });
    setFormValues({
      branch: "",
      employee: "",
    });
  };

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Branch",
    },
    // {
    //     name: "delete",
    //     label: "Delete",
    // },
  ];

  return (
    <>
      {branchList.length === 0 && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Branch name */}
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="name" className="form-label customizedLabel">
                Branch Name *
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                name="branchName"
                id="branchName"
                defaultValue="0"
                onChange={handleBranchChange}
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
              <small>
                <span className="text-secondary small mx-2">Select Branch</span>
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
      )}
      <SimpleTable columns={columns} data={branchList} />
    </>
  );
}
