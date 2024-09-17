import React from "react";
import { Route, Routes } from "react-router-dom";
import Workboard from "../../screens/Workboard";
import Board from "../../screens/Board";
import CreateWorkBoard from "../../screens/CreateWorkBoard";

function DashboardRoute() {
    return (
        <Routes>
            <Route path="workboard" element={<Workboard />} />
            <Route path="create-workboard" element={<CreateWorkBoard />} />
            <Route path="board" element={<Board />} />
        </Routes>
    );
}

export default DashboardRoute;
