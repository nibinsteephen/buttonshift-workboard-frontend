import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserInfo from "../components/general/UserInfo";
import Input from "../components/general/Input";
import ExitingTask from "../components/general/ExitingTask";
import { useNavigate } from "react-router-dom";
import {  useFormik } from "formik";
import * as Yup from "yup";
import { appAuthConfig } from "../apis/apiconfig";
import SearchAndAssign from "../components/general/searchAndAssign";
import TemporaryTask from "../components/general/TemporaryTask";
import { toast } from "react-toastify";

function CreateWorkBoard() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const taskContainerRef = useRef();
    const navigate = useNavigate();
    const workboardFormRef = useRef(null);

    const createWorkboard = async (workboardData) => {
        try {
            const response = await appAuthConfig.post(
                `/workboard/create-workboard/`,
                workboardData
            );
            console.log(response.data.StatuCode);
            if (response.data.StatusCode == 6000) {
                navigate("/workboard");
                toast.success("Workboard created successfully");
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    };
    console.log(tasks)

    const viewAddTask = () => {
        setIsExpanded(true);
    };

    const workboardValidationSchema = Yup.object().shape({
        workboard_title: Yup.string().required("Workboard title is required"),
        workboard_description: Yup.string().required(
            "Workboard description is required"
        ),
    });

    const taskValidationSchema = Yup.object().shape({
        title: Yup.string().required("Task title is required"),
        assigned_to: Yup.array()
            .min(1, "At least one user must be assigned")
            .required("Assigned to is required"),
        status: Yup.string().required("Status is required"),
    });

    const createWorkBoard = useFormik({
        initialValues: {
            workboard_title: "",
            workboard_description: "",
        },
        validationSchema: workboardValidationSchema,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: (values) => {
            const workboardData = new FormData();

            workboardData.append("title", values.workboard_title);
            workboardData.append("description", values.workboard_description);
            workboardData.append("tasks", JSON.stringify(tasks));

            createWorkboard(workboardData);
        },
    });

    const tempTaskCreation = useFormik({
        initialValues: {
            title: "",
            description: "",
            assigned_to: [],
            status: "to_do",
        },
        validationSchema: taskValidationSchema,
        validateOnBlur: true,
        validateOnMount: true,

        onSubmit: (values) => {
            console.log(values);
            setIsExpanded(false);
            setTasks((prevTasks) => [...prevTasks, values]);
        },
    });

    const handleAssignUsers = (selectedUsers) => {
        tempTaskCreation.setFieldValue("assigned_to", selectedUsers);
    };

    return (
        <Container className="wrapper">
            <Head>
                <TopLeft>
                    <h2>Create a WorkBoard</h2>
                </TopLeft>
                <UserInfo name={"John Doe"} />
            </Head>
            <Content>
                <CreateWorkSpace onSubmit={createWorkBoard.handleSubmit}>
                    <div className="seperator">
                        <form
                            ref={workboardFormRef}
                            onSubmit={createWorkBoard.handleSubmit}
                        >
                            <Input
                                placeholder="Name your Board"
                                addClass="WorkpaceTitle"
                                name="workboard_title"
                                value={createWorkBoard.values.workboard_title}
                                onChange={createWorkBoard.handleChange}
                                onBlur={createWorkBoard.handleBlur(
                                    "workboard_title"
                                )}
                                errorMessage={
                                    createWorkBoard.touched.workboard_title
                                        ? createWorkBoard.errors.workboard_title
                                        : ""
                                }
                            />
                            <Input
                                placeholder="Board description"
                                addClass="WorkpaceDescription"
                                name="workboard_description"
                                value={
                                    createWorkBoard.values.workboard_description
                                }
                                onChange={createWorkBoard.handleChange}
                                onBlur={createWorkBoard.handleBlur(
                                    "workboard_description"
                                )}
                                errorMessage={
                                    createWorkBoard.touched
                                        .workboard_description
                                        ? createWorkBoard.errors
                                              .workboard_description
                                        : ""
                                }
                            />
                        </form>
                        <Tasks>
                            {tasks &&
                                tasks.map((item, key) => (
                                    <TemporaryTask
                                        title={item.title}
                                        status={item.status}
                                        users={item.assigned_to}
                                    />
                                ))}
                            <AddAtaskContainer
                                ref={taskContainerRef}
                                $isExpanded={isExpanded}
                            >
                                <Input
                                    placeholder="Task Title"
                                    name="title"
                                    addClass="addTask"
                                    value={tempTaskCreation.values.title}
                                    onChange={tempTaskCreation.handleChange}
                                    onBlur={tempTaskCreation.handleBlur(
                                        "title"
                                    )}
                                    errorMessage={
                                        tempTaskCreation.touched.title
                                            ? tempTaskCreation.errors.title
                                            : ""
                                    }
                                />
                                <Input
                                    placeholder="Task Description (Optional)"
                                    name="description"
                                    addClass="addTask"
                                    value={tempTaskCreation.values.description}
                                    onChange={tempTaskCreation.handleChange}
                                />
                                <div className="assignDropDown">
                                    <SearchAndAssign
                                        onAssignUsers={handleAssignUsers}
                                    />
                                    <div className="dropDownError">
                                        {tempTaskCreation.touched.assigned_to &&
                                            tempTaskCreation.errors
                                                .assigned_to && (
                                                <ErrorMessage>
                                                    {
                                                        tempTaskCreation.errors
                                                            .assigned_to
                                                    }
                                                </ErrorMessage>
                                            )}
                                    </div>
                                </div>
                                <Dropdown>
                                    <select
                                        name="status"
                                        id="status"
                                        value={tempTaskCreation.values.status}
                                        onChange={tempTaskCreation.handleChange}
                                    >
                                        <option value="to_do">To-do</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                </Dropdown>
                            </AddAtaskContainer>
                            {isExpanded ? (
                                <Save onClick={tempTaskCreation.handleSubmit}>
                                    Save
                                </Save>
                            ) : (
                                <AddTask type="button" onClick={viewAddTask}>
                                    + Add A Task
                                </AddTask>
                            )}
                        </Tasks>
                    </div>
                    <CreateButton
                        type="button"
                        onClick={createWorkBoard.handleSubmit}
                    >
                        Create Work Board
                    </CreateButton>
                </CreateWorkSpace>
            </Content>
        </Container>
    );
}

export default CreateWorkBoard;

const Container = styled.div``;

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    align-items: center;
    height: 20%;
`;
const TopLeft = styled.div`
    display: flex;
    align-items: center;
    h2 {
        font-family: "Satoshi-Bold";
        color: #45464c;
        font-size: 32px;
    }
`;
const Content = styled.div`
    margin-top: 50px;
    height: 80vh;
    overflow: scroll;
`;

const CreateWorkSpace = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .seperator {
        height: 500px;
        overflow: scroll;
    }
`;
const Tasks = styled.form``;
const Save = styled.button`
    width: 100%;
    font-size: 20px;
    border: 1px solid #bdbdbd;
    padding: 10px 20px;
    color: #bdbdbd;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
`;

const AddTask = styled.button`
    width: 100%;
    font-size: 20px;
    border: 1px solid #bdbdbd;
    padding: 10px 20px;
    color: #bdbdbd;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
`;
const CreateButton = styled.button`
    width: 100%;
    font-size: 20px;
    border: 1px solid #25a51e;
    padding: 10px 20px;
    background-color: #198814;
    color: #ffffff;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
`;
const AddAtaskContainer = styled.div`
    background-color: #e3e3e3;
    border-radius: 8px;
    transition: height 0.3s ease, padding 0.3s;

    height: ${({ $isExpanded }) => ($isExpanded ? "280px" : "0")};
    overflow: hidden;
    padding: ${({ $isExpanded }) => ($isExpanded ? "20px" : "0")};
    .assignDropDown {
        position: relative;
        .dropDownError {
            position: absolute;
            right: 0;
        }
    }
`;

const ErrorMessage = styled.p`
    /* position: absolute; */
    right: 0;
    /* bottom: -18px; */
    font-size: 12px;
    color: red;
`;

const Dropdown = styled.div`
    margin-top: 10px;
    select {
        cursor: pointer;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        color: #9b9b9b;
        font-family: "Satoshi-Medium";
    }
`;
