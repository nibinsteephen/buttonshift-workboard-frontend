import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "../../screens/Board";
import CreateWorkBoard from "../../screens/CreateWorkBoard";
import Workboard from "../../screens/Workboard";

function DashboardRoute() {
    return (
        <Routes>
            <Route path="workboard" element={<Workboard />} />
            <Route path="create-workboard" element={<CreateWorkBoard />} />
            <Route path="workboard/:workboard_id" element={<Board />} />
        </Routes>
    );
}

export default DashboardRoute;
