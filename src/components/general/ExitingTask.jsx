import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import EditTask from "./EditTask";
import { Draggable } from "react-beautiful-dnd";

function ExitingTask(
    {
        title,
        description,
        status,
        assigned_to,
        users = [],
        className,
        taskid,
        onComplete,
        index,
    },
    key
) {
    const [isEdit, setIsEdit] = useState(false);

    const maxVisibleAvatars = 2;
    let display_status = "--";

    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleOnSave = () => {
        setIsEdit(false);
        onComplete();
    };

    if (status == "to_do") {
        display_status = "To Do";
    } else if (status == "in_progress") {
        display_status = "In Progress";
    } else if (status == "completed") {
        display_status = "Completed";
    }

    return (
        <Draggable draggableId={taskid.toString()} index={index}>
            {(provided) => (
                <Container taskid={taskid} key={key} $isEdit={isEdit} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {!isEdit && (
                        <div>
                            <p className="edit" onClick={handleEdit}>
                                Edit
                            </p>
                            <Content>
                                <h5>{title}</h5>
                                {
                                    <BottomContent className={className}>
                                        <p className="status">
                                            {display_status}
                                        </p>
                                        <Users>
                                            {users
                                                .slice(0, maxVisibleAvatars)
                                                .map((users, key) => (
                                                    <Avatar
                                                        key={key}
                                                        name={users}
                                                        type={"small"}
                                                    />
                                                ))}
                                            {users.length >
                                                maxVisibleAvatars && (
                                                <RemainingCount>
                                                    +
                                                    {users.length -
                                                        maxVisibleAvatars}
                                                </RemainingCount>
                                            )}
                                        </Users>
                                    </BottomContent>
                                }
                            </Content>
                        </div>
                    )}
                    {isEdit && (
                        <EditTask
                            onEdit={true}
                            onCancel={() => setIsEdit(false)}
                            title={title}
                            description={description}
                            taskStatus={status}
                            assigned_to={assigned_to}
                            taskid={taskid}
                            onSave={handleOnSave}
                        />
                    )}
                </Container>
            )}
        </Draggable>
    );
}

export default ExitingTask;

const Container = styled.div`
    background-color: #d5ade4;
    border-radius: 8px;
    padding: ${({ $isEdit }) => ($isEdit ? "10px 10px" : "10px 40px")};
    margin-bottom: 10px;
    transition: 0.25s ease-in-out;
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
    .withoutStatus {
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
