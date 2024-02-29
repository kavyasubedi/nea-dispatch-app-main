import React from "react";
import withAuth from "./Middleware";

// Dashboard
const Dashboard = React.lazy(() => import("../pages/dashboard/Index"));
const DashboardNormal = React.lazy(() =>
  import("../pages/dashboard/NormalIndex")
);

// Service Provider Main
const ServiceProviderMain = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_main/ViewServiceProviderMain"
  )
);
const ServiceProviderMainCreate = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_main/CreateServiceProviderMain"
  )
);
const ServiceProviderMainEdit = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_main/EditServiceProviderMain"
  )
);

// Service Provider Branch
const ServiceProviderBranch = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_branch/ViewServiceProviderBranch"
  )
);
const ServiceProviderBranchCreate = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_branch/CreateServiceProviderBranch"
  )
);
const ServiceProviderBranchEdit = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_branch/EditServiceProviderBranch"
  )
);

// Service Provider Area
const ServiceProviderBranchArea = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_branch_area/ViewServiceProviderBranchArea"
  )
);
const ServiceProviderBranchAreaCreate = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_branch_area/CreateServiceProviderBranchArea"
  )
);
const ServiceProviderBranchAreaEdit = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_branch_area/EditServiceProviderBranchArea"
  )
);

// Service Provider Olt
const ServiceProviderOlt = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_olt/ViewServiceProviderBranchOlt"
  )
);
const ServiceProviderOltCreate = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_olt/CreateServiceProviderBranchOlt"
  )
);
const ServiceProviderOltEdit = React.lazy(() =>
  import(
    "../pages/settings/service_provider/service_provider_olt/EditServiceProviderBranchOlt"
  )
);

// Problem Types
const ProblemTypes = React.lazy(() =>
  import("../pages/settings/problem_type/ViewProblemType")
);
const ProblemTypesCreate = React.lazy(() =>
  import("../pages/settings/problem_type/CreateProblemType")
);
const ProblemTypesEdit = React.lazy(() =>
  import("../pages/settings/problem_type/EditProblemType")
);

// Users
const User = React.lazy(() => import("../pages/settings/user/ViewUser"));
const UserCreate = React.lazy(() =>
  import("../pages/settings/user/CreateUser")
);
const UserEdit = React.lazy(() => import("../pages/settings/user/EditUser"));

// EveryoneAttendance
const EveryoneAttendance = React.lazy(() =>
  import("../pages/attendance/EveryoneAttendance")
);

// Import Jobs
const ImportJobs = React.lazy(() => import("../pages/import_job/ImportJobs"));
const AddJob = React.lazy(() => import("../pages/available_jobs/AddJob"));
const EditJob = React.lazy(() => import("../pages/available_jobs/EditJob"));

// Normal User pages
//Available Jobs
const AllJobs = React.lazy(() => import("../pages/all_jobs/view"));
const AvailableJobs = React.lazy(() =>
  import("../pages/available_jobs/AvailableJobs")
);
const MyJobs = React.lazy(() => import("../pages/available_jobs/MyJobs"));
const EmployeeDispatchHistory = React.lazy(() =>
  import("../pages/available_jobs/EmployeeDispatchHistory")
);
const MyDispatchHistory = React.lazy(() =>
  import("../pages/available_jobs/MyDispatchHistory")
);
const DispatchHistory = React.lazy(() =>
  import("../pages/available_jobs/DispatchHistory")
);
const CreateDispatchRecord = React.lazy(() =>
  import("../pages/available_jobs/CreateDispatchRecord")
);
const UpdateAvailableJobs = React.lazy(() =>
  import("../pages/available_jobs/UpdateJob")
);

//Attendance
const AllAttendance = React.lazy(() =>
  import("../pages/attendance/AllAttendance")
);
const AvailableAttendance = React.lazy(() =>
  import("../pages/attendance/AvailableAttendance")
);
const MyAttendance = React.lazy(() =>
  import("../pages/attendance/MyAttendance")
);
const Reports = React.lazy(() => import("../pages/reports/Reports"));

//Clock In Out
const Clock = React.lazy(() => import("../pages/clock_in_out/ClockInOut"));

const routes = [
  // Dashboard
  { path: "/dashboard", element: Dashboard, name: "Dashboard" },
  // { path: "/dashboard", element: withAuth(Dashboard, ["ROLE_USER", "ROLE_ADMIN"]) },
  {
    path: "/normal-dashboard",
    element: DashboardNormal,
    name: "DashboardNormal",
  },

  { path: "/import-jobs", element: withAuth(ImportJobs, ["ROLE_ADMIN"]) },
  { path: "/add-job", element: withAuth(AddJob, ["ROLE_ADMIN"]) },
  { path: "/edit-job/:id", element: withAuth(EditJob, ["ROLE_ADMIN"]) },

  //  Service Provider Main
  {
    path: "/service-provider",
    element: withAuth(ServiceProviderMain, ["ROLE_ADMIN"]),
    name: "ServiceProviderMain",
  },
  {
    path: "/service-provider-create",
    element: withAuth(ServiceProviderMainCreate, ["ROLE_ADMIN"]),
    name: "ServiceProviderMainCreate",
  },
  {
    path: "/service-provider-edit/:id",
    element: withAuth(ServiceProviderMainEdit, ["ROLE_ADMIN"]),
    name: "ServiceProviderMainEdit",
  },

  //Service Provider Branch
  {
    path: "/service-provider-branch",
    element: withAuth(ServiceProviderBranch, ["ROLE_ADMIN"]),
    name: "ServiceProviderBranch",
  },
  {
    path: "/service-provider-branch-create/",
    element: withAuth(ServiceProviderBranchCreate, ["ROLE_ADMIN"]),
    name: "ServiceProviderBranchCreate",
  },
  {
    path: "/service-provider-branch-edit/:id",
    element: withAuth(ServiceProviderBranchEdit, ["ROLE_ADMIN"]),
    name: "ServiceProviderBranchEdit",
  },

  //Service Provider Branch Area
  {
    path: "/service-provider-branch-area/",
    element: withAuth(ServiceProviderBranchArea, ["ROLE_ADMIN"]),
    name: "ServiceProviderBranchArea",
  },
  {
    path: "/service-provider-branch-area-create/",
    element: withAuth(ServiceProviderBranchAreaCreate, ["ROLE_ADMIN"]),
    name: "ServiceProviderBranchAreaCreate",
  },
  {
    path: "/service-provider-branch-area-edit/:id",
    element: withAuth(ServiceProviderBranchAreaEdit, ["ROLE_ADMIN"]),
    name: "ServiceProviderBranchAreaEdit",
  },

  // //Service Provider Branch Area
  {
    path: "/service-provider-branch-olt",
    element: withAuth(ServiceProviderOlt, ["ROLE_ADMIN"]),
    name: "ServiceProviderOlt",
  },
  {
    path: "/service-provider-branch-olt-create",
    element: withAuth(ServiceProviderOltCreate, ["ROLE_ADMIN"]),
    name: "ServiceProviderOltCreate",
  },
  {
    path: "/service-provider-branch-olt-edit/:id",
    element: withAuth(ServiceProviderOltEdit, ["ROLE_ADMIN"]),
    name: "ServiceProviderOltEdit",
  },

  //Problem Types
  {
    path: "/problem-types",
    element: withAuth(ProblemTypes, ["ROLE_ADMIN"]),
    name: "ProblemTypes",
  },
  {
    path: "/problem-types-create",
    element: withAuth(ProblemTypesCreate, ["ROLE_ADMIN"]),
    name: "ProblemTypesCreate",
  },
  {
    path: "/problem-types-edit/:id",
    element: withAuth(ProblemTypesEdit, ["ROLE_ADMIN"]),
    name: "ProblemTypesEdit",
  },

  //Users
  { path: "/user", element: withAuth(User, ["ROLE_ADMIN"]), name: "User" },
  {
    path: "/user-create",
    element: withAuth(UserCreate, ["ROLE_ADMIN"]),
    name: "UserCreate",
  },
  {
    path: "/user-edit/:login",
    element: withAuth(UserEdit, ["ROLE_ADMIN"]),
    name: "UserEdit",
  },

  //Everyone's Attendance
  {
    path: "/everyone-attendance",
    element: withAuth(EveryoneAttendance, ["ROLE_ADMIN"]),
    name: "EveryoneAttendance",
  },

  // For Normal User
  // Available Jobs
  {
    path: "/all-jobs",
    element: withAuth(AllJobs, ["ROLE_ADMIN"]),
    name: "AllJobs",
  },
  {
    path: "/available-jobs",
    element: withAuth(AvailableJobs, ["ROLE_ADMIN"]),
    name: "AvailableJobs",
  },
  {
    path: "/my-jobs",
    element: withAuth(MyJobs, ["ROLE_USER"]),
    name: "MyJobs",
  },
  {
    path: "/dispatch-history",
    element: withAuth(DispatchHistory, ["ROLE_ADMIN"]),
    name: "DispatchHistory",
  },
  {
    path: "/employee-dispatch-history",
    element: withAuth(EmployeeDispatchHistory, ["ROLE_ADMIN"]),
    name: "EmployeeDispatchHistory",
  },
  {
    path: "/my-dispatch-history",
    element: withAuth(MyDispatchHistory, ["ROLE_USER"]),
    name: "MyDispatchHistory",
  },
  {
    path: "/create-dispatch-record",
    element: withAuth(CreateDispatchRecord, ["ROLE_ADMIN"]),
    name: "CreateDispatchRecord",
  },
  {
    path: "/update-available-job/:id",
    element: withAuth(UpdateAvailableJobs, ["ROLE_USER"]),
    name: "UpdateAvailableJobs",
  },

  //Attendance
  {
    path: "/all-attendance",
    element: withAuth(AllAttendance, ["ROLE_ADMIN"]),
    name: "AllAttendance",
  },
  {
    path: "/available-attendance",
    element: withAuth(AvailableAttendance, ["ROLE_ADMIN"]),
    name: "AvailableAttendance",
  },
  {
    path: "/my-attendance",
    element: withAuth(MyAttendance, ["ROLE_USER"]),
    name: "MyAttendance",
  },
  {
    path: "/reports",
    element: withAuth(Reports, ["ROLE_ADMIN"]),
    name: "Reports",
  },

  //Clock In Out
  { path: "/clock", element: withAuth(Clock, ["ROLE_USER"]), name: "Clock" },

  // { path: "/edit-user/:id", element: withAuth(EditUser, ["Admin", "Approver"]) },
  // { path: "/assign-valuator", element: withAuth(AssignTo, ["Admin", "Approver", "Initiator", "Normal"]) },
];

export default routes;
