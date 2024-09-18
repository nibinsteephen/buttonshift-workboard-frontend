import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/general/Input";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../apis/apiconfig";
import { useAuthStore } from "../store/useAuthStore";
import { ToastContainer, toast } from "react-toastify";
import SmallLoader from "../components/loaders/SmallLoader";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true);
        try {
            const response = await appConfig.post("/workboard/login/", {
                username,
                password,
            });
            
            if (response.data.StatusCode == 6000) {
                console.log(response.data.data);
                login(
                    response.data.data.response.access,
                    response.data.data.response.refresh,
                    response.data.data.userDetails.full_name,
                )
                setLoader(false);
                toast.success(response.data.message);
                navigate("/workboard");
            } else {
                toast.error(response.data.message);
                setLoader(false);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            setLoader(false);
        }
    };

    return (
        <Container>
            <Details onSubmit={handleSubmit}>
                <h2>WorkBoards</h2>
                <Input
                    label="username:"
                    value={username}
                    required={true}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label="password:"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <div className="button-container">
                    <LoginButton type="submit">
                        {!loader ? "Log in" : <SmallLoader/>}
                    </LoginButton>
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
const Details = styled.form`
    width: 30%;
    h2 {
        margin-bottom: 40px;
        font-family: "Satoshi-Bold";
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
    font-family: "Satoshi-Medium";
    margin-top: 10px;
    cursor: pointer;
    width: 80px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
