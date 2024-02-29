import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { BiSolidDashboard, BiSolidReport, BiBriefcase } from "react-icons/bi";

import {
  FaTasks,
  FaHistory,
  FaUserCheck,
  FaCodeBranch,
  FaServer,
  FaChartArea,
  FaUserCog,
} from "react-icons/fa";
import {
  MdEngineering,
  MdLogout,
  MdHomeWork,
  MdOutlineWorkHistory,
  MdOutlinePlaylistAddCheckCircle,
  MdReportProblem,
} from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import Cookies from "js-cookie";
import longLogo from "../images/logo.jpg";
import smallLogo from "../images/mini_logo.png";
import { useLocation } from "react-router-dom";
import api from "../Axios";
export default function SidebarNav(props) {
  const location = useLocation();
  const userRole = localStorage.getItem("userRoles");
  function logout() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.reload();
  }
  const [isSuperAdmin, setIsSuperAdmin] = useState();
  const { collapsed, setCollapsed } = props.myCollapse;
  function checkSuperAdmin() {
    api
      .get("/v1/isSuperAdmin")
      .then((res) => {
        setIsSuperAdmin(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    checkSuperAdmin();
  }, []);
  useEffect(() => {
    setCollapsed(collapsed);
  }, [collapsed, setCollapsed]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add a window resize event listener when the component mounts
    window.addEventListener("resize", handleResize);
    if (windowWidth < 900) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, setCollapsed]); // The empty array [] as the second argument ensures that the effect runs only once when the component mounts
  const isAdmin = userRole?.includes("ROLE_ADMIN");
  const isUser = userRole && !isAdmin;
  if (collapsed) {
    return (
      <>
        <div className="p-0 m-0 d-none d-sm-block ">
          <div
            style={{
              display: "flex",
              height: "100%",
              minHeight: "100vh",
              color: "#ffffff",
            }}
          >
            <Sidebar
              onBackdropClick={() => setCollapsed(true)}
              collapsed={collapsed}
              backgroundColor="#010445"
            >
              <div className="container-fluid mt-2">
                <div
                  className="d-flex justify-content-center mb-3"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "6px",
                    maxHeight: "75px",
                  }}
                >
                  <img
                    src={smallLogo}
                    alt=""
                    style={{
                      width: "100%",
                      // height: '100%',
                      objectFit: "cover", // This ensures the image covers the entire container
                    }}
                  />
                </div>
              </div>
              <Menu
                menuItemStyles={{
                  button: {
                    // the active class will be added automatically by react router
                    // so we can use it to style the active menu item
                    [`&.active`]: {
                      backgroundColor: "#682793",
                      color: "#000000",
                    },
                    [`&.hover`]: {
                      backgroundColor: "#682793",
                      color: "#000000",
                    },
                  },
                }}
              >
                <MenuItem
                  href="#/dashboard"
                  rootStyles={{
                    backgroundColor:
                      location.pathname === "/dashboard"
                        ? "#682793"
                        : "#010445",
                  }}
                  icon={<BiSolidDashboard />}
                >
                  {" "}
                  Dashboard
                </MenuItem>
                {isUser ? (
                  <MenuItem
                    href="#/clock"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/clock" ? "#682793" : "#010445",
                    }}
                    icon={<LuUploadCloud />}
                  >
                    {" "}
                    Clock In/Out
                  </MenuItem>
                ) : null}
                {isSuperAdmin ? (
                  <MenuItem
                    href="#/all-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/all-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdHomeWork />}
                  >
                    {" "}
                    All Jobs
                  </MenuItem>
                ) : null}
                {isSuperAdmin ? (
                  <MenuItem
                    href="#/reports"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/reports"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdHomeWork />}
                  >
                    {" "}
                    Reports
                  </MenuItem>
                ) : null}
                {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/available-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/available-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<FaTasks />}
                  >
                    {" "}
                    Available Jobs
                  </MenuItem>
                ) : null}
                {isUser ? (
                  <MenuItem
                    href="#/my-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/my-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<BiBriefcase />}
                  >
                    {" "}
                    My Jobs
                  </MenuItem>
                ) : null}
                {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/employee-dispatch-history"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/employee-dispatch-history"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdOutlineWorkHistory />}
                  >
                    {" "}
                    Employee Dispatch History
                  </MenuItem>
                ) : null}
                {isUser ? (
                  <MenuItem
                    href="#/my-dispatch-history"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/my-dispatch-history"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<BiSolidReport />}
                  >
                    {" "}
                    My Dispatch History
                  </MenuItem>
                ) : null}
                {isSuperAdmin ? (
                  <MenuItem
                    href="#/dispatch-history"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/dispatch-history"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<FaHistory />}
                  >
                    {" "}
                    Dispatch History
                  </MenuItem>
                ) : null}

                {isSuperAdmin ? (
                  <MenuItem
                    href="#/all-attendance"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/all-attendance"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<FaUserCheck />}
                  >
                    {" "}
                    All Attendance
                  </MenuItem>
                ) : null}
                {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/available-attendance"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/available-attendance"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdOutlinePlaylistAddCheckCircle />}
                  >
                    {" "}
                    Available Attendance
                  </MenuItem>
                ) : null}
                {isUser ? (
                  <MenuItem
                    href="#/my-attendance"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/my-attendance"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<LuUploadCloud />}
                  >
                    {" "}
                    My Attendance
                  </MenuItem>
                ) : null}
                {isAdmin && isSuperAdmin ? (<MenuItem
                  href="#/service-provider"
                  rootStyles={{
                    backgroundColor:
                      location.pathname === "/service-provider" ||
                        location.pathname === "/service-provider-create" ||
                        /^\/service-provider-edit\/\d+$/.test(
                          location.pathname
                        )
                        ? "#8a6dc0"
                        : "#010445",
                  }}
                  icon={<MdEngineering />}
                >
                  {" "}
                  DC Branch
                </MenuItem>) : <></>}


                {isAdmin && isSuperAdmin ? (<MenuItem
                  href="#/user"
                  rootStyles={{
                    backgroundColor:
                      location.pathname === "/user" ||
                        location.pathname === "/user" ||
                        location.pathname === "/user-edit/admin"
                        ? "#8a6dc0"
                        : "#010445",
                  }}
                  icon={<FaUserCog />}
                >
                  {" "}
                  User
                </MenuItem>) : <></>}
                {/* {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/import-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/import-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<LuUploadCloud />}
                  >
                    {" "}
                    Import Job
                  </MenuItem>
                ) : (
                  <></>
                )} */}
                <MenuItem
                  icon={<MdLogout />}
                  rootStyles={{ backgroundColor: "#FF0519FF" }}
                  onClick={logout}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Sidebar>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="p-0 m-0">
          <div
            style={{
              display: "flex",
              height: "100%",
              minHeight: "100vh",
              color: "#ffffff",
            }}
          >
            <Sidebar
              onBackdropClick={() => setCollapsed(true)}
              collapsed={collapsed}
              backgroundColor="#010445"
            >
              <div className="container-fluid mt-2">
                <div
                  className="d-flex justify-content-center p-3 mb-3"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "6px",
                    maxHeight: "75px",
                  }}
                >
                  <img
                    src={longLogo}
                    alt=""
                    style={{
                      width: "100%",
                      // height: '100%',
                      objectFit: "cover", // This ensures the image covers the entire container
                    }}
                  />
                </div>
              </div>
              <Menu
                menuItemStyles={{
                  button: {
                    // the active class will be added automatically by react router
                    // so we can use it to style the active menu item
                    [`&.active`]: {
                      backgroundColor: "#682793",
                      color: "#000000",
                    },
                    [`&.hover`]: {
                      backgroundColor: "#682793",
                      color: "#000000",
                    },
                  },
                }}
              >
                <MenuItem
                  href="#/dashboard"
                  rootStyles={{
                    backgroundColor:
                      location.pathname === "/dashboard"
                        ? "#682793"
                        : "#010445",
                  }}
                  icon={<BiSolidDashboard />}
                >
                  {" "}
                  Dashboard
                </MenuItem>
                {isUser ? (
                  <MenuItem
                    href="#/clock"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/clock" ? "#682793" : "#010445",
                    }}
                    icon={<LuUploadCloud />}
                  >
                    {" "}
                    Clock In/Out
                  </MenuItem>
                ) : null}
                {isSuperAdmin ? (
                  <MenuItem
                    href="#/all-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/all-jobs" || location.pathname === "/all-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdHomeWork />}
                  >
                    {" "}
                    All Jobs
                  </MenuItem>
                ) : null}
                {isSuperAdmin ? (
                  <MenuItem
                    href="#/reports"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/reports"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdHomeWork />}
                  >
                    {" "}
                    Reports
                  </MenuItem>
                ) : null}
                {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/available-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/available-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<FaTasks />}
                  >
                    {" "}
                    Available Jobs
                  </MenuItem>
                ) : null}
                {isUser ? (
                  <MenuItem
                    href="#/my-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/my-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<BiBriefcase />}
                  >
                    {" "}
                    My Jobs
                  </MenuItem>
                ) : null}
                {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/employee-dispatch-history"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/employee-dispatch-history"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdOutlineWorkHistory />}
                  >
                    {" "}
                    Employee Dispatch History
                  </MenuItem>
                ) : null}
                {isUser ? (
                  <MenuItem
                    href="#/my-dispatch-history"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/my-dispatch-history"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<BiSolidReport />}
                  >
                    {" "}
                    My Dispatch History
                  </MenuItem>
                ) : null}
                {isSuperAdmin ? (
                  <MenuItem
                    href="#/dispatch-history"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/dispatch-history"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<FaHistory />}
                  >
                    {" "}
                    Dispatch History
                  </MenuItem>
                ) : null}

                {isSuperAdmin ? (
                  <MenuItem
                    href="#/all-attendance"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/all-attendance"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<FaUserCheck />}
                  >
                    {" "}
                    All Attendance
                  </MenuItem>
                ) : null}
                {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/available-attendance"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/available-attendance"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<MdOutlinePlaylistAddCheckCircle />}
                  >
                    {" "}
                    Available Attendance
                  </MenuItem>
                ) : null}
                {isUser ? (
                  <MenuItem
                    href="#/my-attendance"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/my-attendance"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<LuUploadCloud />}
                  >
                    {" "}
                    My Attendance
                  </MenuItem>
                ) : null}
                {isAdmin && isSuperAdmin ? (<MenuItem
                  href="#/service-provider"
                  rootStyles={{
                    backgroundColor:
                      location.pathname === "/service-provider" ||
                        location.pathname === "/service-provider-create" ||
                        /^\/service-provider-edit\/\d+$/.test(
                          location.pathname
                        )
                        ? "#8a6dc0"
                        : "#010445",
                  }}
                  icon={<MdEngineering />}
                >
                  {" "}
                  DC Branch
                </MenuItem>) : <></>}


                {isAdmin && isSuperAdmin ? (<MenuItem
                  href="#/user"
                  rootStyles={{
                    backgroundColor:
                      location.pathname === "/user" ||
                        location.pathname === "/user" ||
                        location.pathname === "/user-edit/admin"
                        ? "#8a6dc0"
                        : "#010445",
                  }}
                  icon={<FaUserCog />}
                >
                  {" "}
                  User
                </MenuItem>) : <></>}
                {/* {isAdmin && !isSuperAdmin ? (
                  <MenuItem
                    href="#/import-jobs"
                    rootStyles={{
                      backgroundColor:
                        location.pathname === "/import-jobs"
                          ? "#682793"
                          : "#010445",
                    }}
                    icon={<LuUploadCloud />}
                  >
                    {" "}
                    Import Job
                  </MenuItem>
                ) : (
                  <></>
                )} */}
                <MenuItem
                  icon={<MdLogout />}
                  rootStyles={{ backgroundColor: "#FF0519FF" }}
                  onClick={logout}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Sidebar>
          </div>
        </div>
      </>
    );
  }
}
