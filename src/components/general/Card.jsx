import React from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

function Card({ title, taskNumber, users, key, workboard_id }) {
    const navigate = useNavigate()
    const maxVisibleAvatars = 2;

    return (
        <Container key={key} onClick={() => navigate(`/workboard/${workboard_id}`)}>
            <h4>{title}</h4>
            <Details>
                <p>{taskNumber} Task</p>
                <Users>
                    {users.slice(0, maxVisibleAvatars).map((users, key) => (
                        <Avatar key={key} name={users} type={"small"} />
                    ))}
                    {users.length > maxVisibleAvatars && (
                        <RemainingCount>+{users.length - maxVisibleAvatars}</RemainingCount>
                    )}
                </Users>
            </Details>
        </Container>
    );
}

export default Card;

const Container = styled.div`
    border: 1px solid #c5c5c5;
    width: 250px;
    height: 150px;
    border-radius: 35px;
    padding: 20px;
    background-color: #ffeeb0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    h4 {
        font-size: 25px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-transform: capitalize;
    }
`;
const Details = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 14px;
    }
`;
const Users = styled.div`
    display: flex;
    & > div {
        margin-left: -10px;
        &:first-child {
            margin-left: 0;
        }
    }
`;

const RemainingCount = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 14px;
    margin-left: -10px;
    border: 1px solid #ffffff;
`;
