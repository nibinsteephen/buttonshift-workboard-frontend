import React from "react";
import styled from "styled-components";
import Input from "../components/general/Input";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <Container>
            <Details>
                <h2>WorkBoards</h2>
                <Input label="username:" />
                <Input label="password:" />
                <div className="button-container">
                    <LoginButton onClick={() => navigate("/workboard")}>Log in</LoginButton>
                </div>
            </Details>
        </Container>
    );
}

export default Login;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;
const Details = styled.div`
    width: 30%;
    h2 {
        margin-bottom: 40px;
        font-family: 'Satoshi-Bold';
        color: #45464c;
    }
    .button-container {
        display: flex;
        justify-content: center;
    }
`;
const LoginButton = styled.button`
    background-color: #5bb9becc;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 5px;
    font-family: 'Satoshi-Medium';
    margin-top: 10px;
    cursor: pointer;
`;
