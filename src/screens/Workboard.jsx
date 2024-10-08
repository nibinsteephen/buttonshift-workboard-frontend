import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfo from "../components/general/UserInfo";
import { useNavigate } from "react-router-dom";
import Card from "../components/general/Card";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import { appAuthConfig, appConfig } from "../apis/apiconfig";

function Workboard() {
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();
    const [workboard, setWorkboard] = useState([]);

    // api call

    const fetchworkboards = async () => {
        try {
            const { data } = await appAuthConfig.get(`/workboard/workboards/`);
            console.log(data.data.workboard);
            setWorkboard(data.data.workboard);
        } catch (error) {}
    };

    useEffect(() => {
        fetchworkboards();
    }, []);

    return (
        <Container className="wrapper">
            <Head>
                <TopLeft>
                    <h2>My WorkBoards</h2>
                    <p>Assigned to Me</p>
                </TopLeft>
                <UserInfo />
            </Head>
            <Content>
                <AddWorkboard onClick={() => navigate("/create-workboard")}>
                    <span>+</span>
                </AddWorkboard>
                {workboard &&
                    workboard.map((item, key) => (
                        <Card
                            workboard_id={item.id}
                            title={item.title}
                            taskNumber={item.number_of_tasks}
                            users={item.users_list}
                        />
                    ))}
            </Content>
        </Container>
    );
}

export default Workboard;

const Container = styled.div`
    height: 100%;
`;
const Head = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    align-items: center;
    height: 20%;
`;
const TopLeft = styled.div`
    display: flex;
    gap: 100px;
    align-items: center;
    h2 {
        font-family: "Satoshi-Bold";
        color: #45464c;
        font-size: 32px;
    }
`;
const Content = styled.div`
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 20px;
    height: 80vh;
    overflow: scroll;
`;
const AddWorkboard = styled.div`
    border: 1px solid #c5c5c5;
    width: 250px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 35px;
    cursor: pointer;
    span {
        font-size: 70px;
        color: #c5c5c5;
    }
`;
