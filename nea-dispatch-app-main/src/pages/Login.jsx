import { useEffect, useState } from "react";
import loginBackgroundImage from "../images/login_background.png";
import LogoImg from "../images/logo.jpg";
import api from "../Axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import LoadingDots from "./LoadingDots.jsx";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [accessToken, setAccessToken] = useState(Cookies.get("access_token"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (accessToken) {
      window.location.href = "/#/dashboard";
    }
  }, [accessToken]);
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    api
      .post(
        "login",
        {
          username: username,
          password: password,
        },
        {}
      )
      .then((res) => {
        console.log(res.data.role);
        // const { access, refresh } = res.data.token
        const access = res.data.token.id_token;
        // Store tokens in cookies
        Cookies.set("access_token", access);
        // console.log(res)
        // console.log(access)
        // Cookies.set('refresh_token', refresh)
        localStorage.setItem(
          "userRoles",
          JSON.stringify(res.data.user.authorities)
        );

        setSuccessMessage(res.data);
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Login Failed");
        // setErrors(err.response.data)
        setIsLoading(false);
      });
  };

  return (
    <div
      className="container-fluid loginBackground d-flex justify-content-center"
      style={{
        backgroundImage: `url(${loginBackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="loginCover col-10 d-flex">
        <div className="col-6 p-3 d-none d-md-block">
          <div
            className="col-4 p-3 mb-5"
            style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
          >
            <img
              src={LogoImg}
              alt=""
              style={{
                width: "100%",
                // height: '100%',
                objectFit: "cover", // This ensures the image covers the entire container
              }}
            />
          </div>
          <h4 className="text-center fw-bold" style={{ color: "#3B1E54" }}>
            Welcome To{" "}
          </h4>
          <h4 className="text-center fw-bold" style={{ color: "#3B1E54" }}>
            Dispatch Management System
          </h4>
        </div>
        <div
          className="col-12 col-md-6 px-3 px-md-4 loginContainer"
          style={{ height: "100%" }}
        >
          <div className="d-flex align-items-top">
            <div className="loginHeader col-9 col-md-12">
              <h3 className="py-md-3 m-0">Login</h3>
              <span
                className="text-secondary fw-semibold"
                style={{ fontSize: "12px" }}
              >
                Login To Continue
              </span>
            </div>
            <div
              className="col-3 d-block d-md-none mt-5 p-2"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                maxHeight: "50px",
              }}
            >
              <img
                src={LogoImg}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // This ensures the image covers the entire container
                }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control form-control-md"
                id="username"
                style={{
                  border: "#BCBCBC solid 1px",
                  backgroundColor: "#ffffff",
                }}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-md"
                id="password"
                style={{
                  border: "#BCBCBC solid 1px",
                  backgroundColor: "#ffffff",
                }}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="loginButton mb-2 py-2"
              style={{ width: "100%" }}
            >
              {isLoading ? (
                <>
                  Loading
                  <LoadingDots />
                </>
              ) : (
                "Submit"
              )}
            </button>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "#3B1E54" }}
            >
              <h6 htmlFor="forgotPassword" className="fw-bold text-center">
                Forgot Password?
              </h6>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
