import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

function ExitingTask({title,status,users,className}) {
    const maxVisibleAvatars = 2;
    return (
        <Container>
            <p className="edit">Edit</p>
            <Content>
                <h5>{title}</h5>
                <BottomContent className={className}>
                    <p className="status">{status}</p>
                    <Users>
                        {users.slice(0, maxVisibleAvatars).map((users, key) => (
                            <Avatar
                                key={key}
                                name={users}
                                type={"small"}
                            />
                        ))}
                        {users.length > maxVisibleAvatars && (
                            <RemainingCount>
                                +{users.length - maxVisibleAvatars}
                            </RemainingCount>
                        )}
                    </Users>
                </BottomContent>
            </Content>
        </Container>
    );
}

export default ExitingTask;

const Container = styled.div`
    background-color: #d5ade4;
    border-radius: 8px;
    padding: 10px 40px;
    margin-bottom: 10px;
    .edit {
        width: 100%;
        text-align: end;
        font-size: 14px;
        color: #000000;
        cursor: pointer;
    }
`;
const Content = styled.div`
    h5 {
        font-size: 16px;
        width: 100%;
    }
    .withoutStatus{
        justify-content: end;
    }
`;
const BottomContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .status {
        font-size: 14px;
        color: #000000;
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