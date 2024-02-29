import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// routes config
import routes from "../components/Routes";

const AppContent = () => {
    return (
        <div className='container-fluid p-0 m-0'>
            <Suspense >
                <Routes>
                    {routes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={<route.element />}
                                />
                            )
                        );
                    })}
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default React.memo(AppContent);
