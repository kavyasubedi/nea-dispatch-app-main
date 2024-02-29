import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../Axios";
import { useParams } from "react-router-dom";
import LoadingDots from "../../../LoadingDots";

export default function EditUser() {
  const { login } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [authorities, setAuthorities] = useState([]);
  const [userAuthorities, setUserAuthorities] = useState([]);
  const [formValues, setFormValues] = useState({
    id: 0,
    login: "string",
    firstName: "string",
    lastName: "string",
    email: "string",
    imageUrl: "string",
    activated: true,
    createdBy: "string",
    createdDate: "2024-01-11T09:12:45.645Z",
    lastModifiedBy: "string",
    lastModifiedDate: "2024-01-11T09:12:45.645Z",
    authorities: ["string"],
    langKey: "en",
  });

  const [error, setError] = useState({
    login: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    api
      .get("/enums/authority-constants")
      .then((res) => {
        setAuthorities(res.data);

        setUserAuthorities(
          formValues.authorities.map((a) => {
            return { label: a, value: a };
          })
        );
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false); // Set loading to false after response or error
      });
  }, [formValues.authorities]);

  function fetchData() {
    if (login)
      api
        .get(`/admin/users/${login}`)
        .then((res) => {
          setFormValues(res.data);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setIsLoading(false); // Set loading to false after response or error
        });
  }

  useEffect(() => {
    fetchData();
  }, [login]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function storeData() {
    if (formValues.id > 0) {
      api
        .put("/admin/users", formValues, {})
        .then((res) => {
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
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after response or error
        });
    } else {
      api
        .post("/admin/users", formValues, {})
        .then((res) => {
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
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after response or error
        });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({
      login: "",
      firstName: "",
      lastName: "",
      email: "",
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

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      storeData();
    }
  };
  const handleReset = () => {
    setError({
      login: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    setFormValues({
      login: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  return isLoading ? (
    <LoadingDots />
  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
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
              value={formValues.login}
            />
            <small
              id="helpId"
              className="form-text text-muted"
              style={{ paddingLeft: "2%" }}
            >
              {error.login === null || error.login === "" ? (
                <span className="text-secondary small">
                  Legal name used in citizenship.
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
              type="text"
              className="form-control form-control-md"
              name="email"
              id="email"
              autoComplete="email"
              aria-describedby="helpId"
              placeholder="User Name"
              onChange={handleInputChange}
              value={formValues.email}
            />
            <small
              id="helpId"
              className="form-text text-muted"
              style={{ paddingLeft: "2%" }}
            >
              {error.email === null || error.email === "" ? (
                <span className="text-secondary small">
                  Legal name used in citizenship.
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
              value={formValues.firstName}
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
              value={formValues.lastName}
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
            <label htmlFor="authorities" className="form-label customizedLabel">
              Authorities *
            </label>
            <select
              className="form-control form-control-md form-select"
              onChange={(e) => {
                const selectedValues = Array.from(e.target.selectedOptions).map(
                  (option) => option.value
                );
                setFormValues({ ...formValues, authorities: selectedValues });
                console.log(selectedValues); // This will now log the array of selected values
              }}
              name="authorities"
              id="authorities"
              multiple={true}
              value={formValues.authorities}
            >
              {authorities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <small
              id="helpId"
              className="form-text text-muted"
              style={{ paddingLeft: "2%" }}
            >
              {error.authorities === null || error.authorities === "" ? (
                <span className="text-secondary small">
                  Legal name used in citizenship.
                </span>
              ) : (
                <span className="text-danger small">{error.authorities}</span>
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
    </>
  );
}
