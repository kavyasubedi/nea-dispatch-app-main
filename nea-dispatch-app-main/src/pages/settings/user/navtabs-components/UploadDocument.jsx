import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../Axios";
import { useSelector } from "react-redux";
import SimpleTable from "../../../../components/table/SimpleTable";
export default function UploadDocument() {
  const data = useSelector((state) => state.data.data);
  const [docDetails, setDocDetails] = useState();

  function fetchData() {
    api
      .get("/documents/employee/" + parseInt(data.user?.employee.id))
      .then((res) => {
        console.log("Document Data:", res.data);
        // setFormValues(res.data);
        setDocDetails(res.data);
      })
      .catch((e) => console.log(e));
  }

  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    file: "",
    fileContentType: "",
    employee: "",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const [error, setError] = useState({
    id: "",
    name: "",
    file: "",
  });

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
        return 0;
      } else {
        // Update state with the file
        const reader = new FileReader();

        reader.onload = (e) => {
          const contentType = e.target.result.split(";")[0].split(":")[1];
          setFormValues({
            ...formValues,
            // [name]: file
            [name]: e.target.result.split(",")[1], // Extract the base64 data part
            fileContentType: contentType,
          });
        };

        reader.readAsDataURL(file);
      }
    } else {
      // Handle the case where no file is selected
      setError({
        ...error,
        file: "Please Add A File",
      });
      alert("Please select a file.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function storeData() {
    const doc = {
      name: formValues.name,
      file: formValues.file,
      fileContentType: formValues.fileContentType,
      employee: {
        id: data.user.employee.id,
      },
    };
    if (formValues.id > 0) {
      doc.id = formValues.id;
      api
        .put(`/documents/${doc.id}`, doc)
        .then((res) => {
          toast.success("success");
          fetchData();
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
            const extractedText = errorMessage.match(regex)[1];
            // Handle the error message as needed
            toast.warning(extractedText);
          } else {
            // Handle other types of errors
            toast.error("An error occurred.");
          }
        });
      console.log("submitted");
    } else {
      api
        .post("/documents", doc)
        .then((res) => {
          toast.success("success");
          fetchData();
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
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {};
    if (formValues.name === "") {
      newErrors = { ...newErrors, name: "File Name Cannot Be empty" };
      console.log("File Name Cannot Be empty");
    }
    if (formValues.file === "") {
      newErrors = { ...newErrors, file: "File Cannot Be empty" };
      console.log("File Cannot Be empty");
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      if (data.user?.employee) storeData();
      else alert("data not loaded");
    }
  };
  const handleReset = () => {
    setError({
      id: "",
      name: "",
      file: "",
    });
    setFormValues({
      id: "",
      name: "",
      file: "",
    });
  };
  const columns = [
    {
      name: "id",
      label: "id",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "fileContentType",
      label: "File",
    },
  ];
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* File Name */}
          <div className="col-12 col-md-6">
            <label htmlFor="name" className="form-label customizedLabel">
              File Name *
            </label>
            <select
              name="name"
              id="name"
              className="form-select form-select-md"
              defaultValue=""
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Citizenship Front">Citizenship Front</option>
              <option value="Citizenship Back">Citizenship Back</option>
              <option value="Citizenship Both">Citizenship Both</option>
              <option value="PAN Card">PAN Card</option>
              <option value="ID Card">ID Card</option>
            </select>
            <small
              id="helpId"
              className="form-text text-muted"
              style={{ paddingLeft: "2%" }}
            >
              {error.name === null || error.name === "" ? (
                <span className="text-secondary small">
                  Document Name.
                </span>
              ) : (
                <span className="text-danger small">{error.name}</span>
              )}
            </small>
          </div>
          {/* Document File */}
          <div className="col-12 col-md-6">
            <label htmlFor="file" className="form-label customizedLabel">
              file *
            </label>
            <input
              type="file"
              className="form-control form-control-md"
              name="file"
              id="file"
              aria-describedby="helpId"
              placeholder="file"
              onChange={handleFileChange}
            />
            <small
              id="helpId"
              className="form-text text-muted"
              style={{ paddingLeft: "2%" }}
            >
              {error.file === null || error.file === "" ? (
                <span className="text-secondary small">
                  Document File.
                </span>
              ) : (
                <span className="text-danger small">{error.file}</span>
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
      <SimpleTable columns={columns} data={docDetails} />
    </>
  );
}
