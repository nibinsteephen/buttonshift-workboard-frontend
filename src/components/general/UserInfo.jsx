import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import LogoutModal from "../modal/LogoutModal";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";

function UserInfo({ name = "" }) {

    const logout = useAuthStore((state) => state.logOut);
    const { user_name } = useAuthStore()
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(false);
        logout();
        toast.success("Logout Successfully");
    };

    return (
        <Container>
            <a className="logout" onClick={()=> setShowLogoutModal(true)}>Logout</a>
            <Avatar name={user_name}/>
            {/* <p className="name">{name}</p> */}
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </Container>
    );
}

export default UserInfo;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .logout {
        color: #575757;
        margin-right: 30px;
        cursor: pointer;
    }
    .name {
        margin-left: 10px;
    }
`;
