import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

function UserInfo({ name = "" }) {
    return (
        <Container>
            <a className="logout" href="#">Logout</a>
            <Avatar name={name}/>
            {/* <p className="name">{name}</p> */}
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
    }
    .name {
        margin-left: 10px;
    }
`;
