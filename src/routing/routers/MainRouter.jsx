import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../../screens/Login";
import Workboard from "../../screens/Workboard";
import CreateWorkBoard from "../../screens/CreateWorkBoard";
import Board from "../../screens/Board";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardRoute from "./DashboardRoute";

function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <DashboardRoute />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;
