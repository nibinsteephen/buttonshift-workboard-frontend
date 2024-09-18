import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserInfo from "../components/general/UserInfo";
import Input from "../components/general/Input";
import ExitingTask from "../components/general/ExitingTask";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { appAuthConfig } from "../apis/apiconfig";
import SearchAndAssign from "../components/general/searchAndAssign";
import TemporaryTask from "../components/general/TemporaryTask";

function CreateWorkBoard() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [tasks, setTasks] = useState([]);
    const taskContainerRef = useRef();
    const navigate = useNavigate();
    const assignInputRef = useRef();

    // api for Assiging users list

    const fetchUserList = async () => {
        try {
            const { data } = await appAuthConfig.get(
                `/workboard/assign-users-list/`
            );
            if (data.StatusCode == 6000) {
                setUsersList(data.data.data);
                console.log(data.data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const viewAddTask = () => {
        setIsExpanded(true);
    };

    const temptask = [];

    const taskValidationSchema = Yup.object().shape({
        task_title: Yup.string().required("Task title is required"),
        assigned_to: Yup.array()
            .min(1, "At least one user must be assigned")
            .required("Assigned to is required"),
        status: Yup.string().required("Status is required"),
    });

    const tempTaskCreation = useFormik({
        initialValues: {
            task_title: "",
            description: "",
            assigned_to: [],
            status: "to-do",
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
                <CreateWorkSpace>
                    <div className="seperator">
                        <Input
                            placeholder="Name your Board"
                            addClass="WorkpaceTitle"
                        />
                        <Input
                            placeholder="Board description"
                            addClass="WorkpaceDescription"
                        />
                        <Tasks onSubmit={tempTaskCreation.handleSubmit}>
                            {tasks &&
                                tasks.map((item, key) => (
                                    <TemporaryTask
                                        title={item.task_title}
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
                                    name="task_title"
                                    addClass="addTask"
                                    value={tempTaskCreation.values.task_title}
                                    onChange={tempTaskCreation.handleChange}
                                    onBlur={tempTaskCreation.handleBlur(
                                        "task_title"
                                    )}
                                    errorMessage={
                                        tempTaskCreation.touched.task_title
                                            ? tempTaskCreation.errors.task_title
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
                                <SearchAndAssign
                                    onAssignUsers={handleAssignUsers}
                                />
                                <Dropdown>
                                    <select
                                        name="status"
                                        id="status"
                                        value={tempTaskCreation.values.status}
                                        onChange={tempTaskCreation.handleChange}
                                    >
                                        <option value="to-do">To-do</option>
                                        <option value="progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                </Dropdown>
                            </AddAtaskContainer>
                            {isExpanded ? (
                                <Save type="submit">Save</Save>
                            ) : (
                                <AddTask type="button" onClick={viewAddTask}>
                                    + Add A Task
                                </AddTask>
                            )}
                        </Tasks>
                    </div>
                    <CreateButton onClick={() => navigate("/board")}>
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
