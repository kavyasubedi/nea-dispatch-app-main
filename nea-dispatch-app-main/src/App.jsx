import "./App.css";
import React, { Suspense } from "react";
// import LayoutsV2 from "./components/LayoutsV2";
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const accessToken = Cookies.get('access_token')
const Login = React.lazy(() => import("./pages/Login"));
const DefaultLayout = React.lazy(() => import('./components/Layouts'))
function App() {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={accessToken ? <DefaultLayout /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </HashRouter>

  );
}

export default App;
