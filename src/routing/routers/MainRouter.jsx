import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../../screens/login";
import Workboard from "../../screens/Workboard";
import CreateWorkBoard from "../../screens/CreateWorkBoard";
import Board from "../../screens/Board";

function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Navigate to="/login"/>} />
                <Route path="login" element={<Login />} />
                <Route path="workboard" element={<Workboard />} />
                <Route path="create-workboard" element={<CreateWorkBoard />} />
                <Route path="board" element={<Board />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;
