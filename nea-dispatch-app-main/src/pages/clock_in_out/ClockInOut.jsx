import { useEffect, useState } from "react";
import api from "../../Axios";
import { toast } from "react-toastify";

export default function ClockInOut() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [ableToSubmit, setAbleToSubmit] = useState(true);

  function fetchAttendanceData() {
    api
      .get("/attendances/today")
      .then((res) => {
        console.log(res.data);
        const fetchedData = res.data;
        setAttendanceData(fetchedData);
        setCheckIn(!!res.data?.checkIn);
        setCheckOut(!!res.data?.checkOut);
        setFormValues((preValue) => ({
          ...preValue,
          checkInMeter: res?.data?.checkInMeter,
        }));

        if (fetchedData == null) {
          console.log("need to check out");
        } else {
          console.log("check in first");
        }
      })
      .catch((e) => {
        console.log(e);
        setCheckIn(false);
      });
  }

  useEffect(() => {
    fetchAttendanceData();
    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      // Add cleanup logic if needed (e.g., cancel ongoing requests)
    };
  }, []);
  const date = new Date();
  const [formValues, setFormValues] = useState({
    checkInMeterPic: "",
    checkOutMeterPic: "",
    checkIn: date,
    checkInMeter: "",
    checkOutMeter: "",
  });

  const [formValuesUpdate, setFormValuesUpdate] = useState({
    checkOutMeterPic: "",
    checkIn: "",
    checkInMeter: "",
    checkOutMeter: "",
  });
  const [error, setError] = useState({
    checkOutMeterPic: "",
    checkIn: "",
    checkInMeter: "",
    checkOutMeter: "",
  });

  function storeData() {
    if (ableToSubmit) {
      setAbleToSubmit(false);
      console.log("submitting....");
      api
        .post("/attendances", formValues, {})
        .then((res) => {
          toast.success("success");
          setTimeout(function () {
            setAbleToSubmit(true);
            window.location.reload(true);
          }, 1000);
        })
        .catch((e) => {
          setError(e.response.data);
          toast.warning("Please Recheck The Form");
        });
      console.log("submitted");
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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
          // const contentType = e.target.result.split(';')[0].split(':')[1];
          setFormValues({
            ...formValues,
            // [name]: file
            [name]: e.target.result.split(",")[1], // Extract the base64 data part
            // photoContentType: contentType
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Initialize an empty object to accumulate errors
    setError({
      checkInMeterPic: "",
      ch: "",
    });
    let newErrors = {};

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      storeData();
    }
  };

  return (
    <div className="card p-2" style={{ minHeight: "87vh" }}>
      <div
        className="card-header h4"
        style={{ border: "0", backgroundColor: "white" }}
      >
        Clock In/Out
      </div>
      <div className="card-body">
        <div className="col-12 col-md-6 mt-3">
          <div
            className={
              checkIn
                ? "px-4 pb-3 border rounded checkAddDisabled "
                : " px-4 pb-3 border rounded"
            }
            style={{ display: checkIn ? "none" : "block" }}
          >
            <h4 className="mt-3">Check In</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Service provider code */}
                <div className="col-12">
                  <label
                    htmlFor="checkInMeterPic"
                    className="form-label customizedLabel"
                  >
                    Check In Meter Photo *
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-md"
                    name="checkInMeterPic"
                    id="checkInMeterPic"
                    aria-describedby="helpId"
                    placeholder="Service Provider file"
                    onChange={handleFileChange}
                    disabled={checkIn}
                  />
                  <small
                    id="helpId"
                    className="form-text text-muted"
                    style={{ paddingLeft: "2%" }}
                  >
                    {error.meterPics === null || error.meterPics === "" ? (
                      <span className="text-secondary small">
                        Legal name used in citizenship.
                      </span>
                    ) : (
                      <span className="text-danger small">
                        {error.meterPics}
                      </span>
                    )}
                  </small>
                </div>
                <div className="col-12">
                  <label
                    htmlFor="checkInMeter"
                    className="form-label customizedLabel"
                  >
                    Check In Meter Readout *
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-md"
                    name="checkInMeter"
                    id="checkInMeter"
                    aria-describedby="helpId"
                    placeholder="Service Provider file"
                    onChange={handleInputChange}
                    disabled={checkIn}
                  />
                  <small
                    id="helpId"
                    className="form-text text-muted"
                    style={{ paddingLeft: "2%" }}
                  >
                    {error.meterPics === null || error.meterPics === "" ? (
                      <span className="text-secondary small">
                        Legal name used in citizenship.
                      </span>
                    ) : (
                      <span className="text-danger small">
                        {error.meterPics}
                      </span>
                    )}
                  </small>
                </div>
              </div>

              <div className="container-fluid d-flex justify-content-end gap-2 mt-3">
                <button
                  className={checkIn ? "secondaryButton" : "submitButton"}
                  disabled={!checkIn ? false : true}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-3">
          <div
            className={
              !checkIn
                ? "px-4 pb-3 border rounded checkAddDisabled"
                : " px-4 pb-3 border rounded"
            }
            style={{ display: checkIn ? "block" : "none" }}
          >
            <h4 className="mt-3">Check Out</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Service provider code */}
                <div className="col-12">
                  <label
                    htmlFor="checkOutMeterPic"
                    className="form-label customizedLabel"
                  >
                    Check Out Meter Photo *
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-md"
                    name="checkOutMeterPic"
                    id="checkOutMeterPic"
                    aria-describedby="helpId"
                    placeholder="Service Provider file"
                    onChange={handleFileChange}
                    disabled={checkOut}
                  />
                  <small
                    id="helpId"
                    className="form-text text-muted"
                    style={{ paddingLeft: "2%" }}
                  >
                    {error.checkOutMeterPic === null ||
                    error.checkOutMeterPic === "" ? (
                      <span className="text-secondary small">
                        Legal name used in citizenship.
                      </span>
                    ) : (
                      <span className="text-danger small">
                        {error.checkOutMeterPic}
                      </span>
                    )}
                  </small>
                </div>
                <div className="col-12">
                  <label
                    htmlFor="checkOutMeter"
                    className="form-label customizedLabel"
                  >
                    Check Out Meter Readout *
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-md"
                    name="checkOutMeter"
                    id="checkOutMeter"
                    aria-describedby="helpId"
                    placeholder="Service Provider file"
                    onChange={handleInputChange}
                    disabled={checkOut}
                  />
                  <small
                    id="helpId"
                    className="form-text text-muted"
                    style={{ paddingLeft: "2%" }}
                  >
                    {error.checkOutMeterPic === null ||
                    error.checkOutMeterPic === "" ? (
                      <span className="text-secondary small">
                        Legal name used in citizenship.
                      </span>
                    ) : (
                      <span className="text-danger small">
                        {error.checkOutMeterPic}
                      </span>
                    )}
                  </small>
                </div>
              </div>
              <div className="container-fluid d-flex justify-content-end gap-2 mt-3">
                <button
                  className={checkOut ? "secondaryButton" : "submitButton"}
                  disabled={checkOut}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
