import { useFormik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import Input from "./Input";
import SearchAndAssign from "./searchAndAssign";
import { appAuthConfig } from "../../apis/apiconfig";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function AddTask({fetchTasks, taskStatus,}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { workboard_id } = useParams();

    const viewAddTask = () => {
        setIsExpanded(true);
    };

    const addNewtask =async (formdata) => {
        try {
            const {data} = await appAuthConfig.post(
                `/workboard/add-task/`,
                formdata
            )
            if (data.StatusCode == 6000){
                toast.success("Task created successfully")
                fetchTasks()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const taskValidationSchema = Yup.object().shape({
        title: Yup.string().required("Task title is required"),
        assigned_to: Yup.array()
            .min(1, "At least one user must be assigned")
            .required("Assigned to is required"),
        status: Yup.string().required("Status is required"),
    });

    const tempTaskCreation = useFormik({
        initialValues: {
            title: "",
            description: "",
            assigned_to: [],
            status: taskStatus,
            workboard_id: workboard_id,
        },
        validationSchema: taskValidationSchema,
        validateOnBlur: true,
        validateOnMount: true,

        onSubmit: (values) => {
            console.log(values);
            setIsExpanded(false);
            const formdata = new FormData();

            formdata.append("title", values.title);
            formdata.append("description", values.description);
            formdata.append("status", values.status);
            formdata.append("workboard_id", workboard_id);
            formdata.append("assigned_to", JSON.stringify(values.assigned_to));

            addNewtask(formdata)
        },
    });

    const handleAssignUsers = (selectedUsers) => {
        tempTaskCreation.setFieldValue("assigned_to", selectedUsers);
    };

    return (
        <Container>
            <AddAtaskContainer $isExpanded={isExpanded}>
                <Input
                    placeholder="Task Title"
                    name="title"
                    addClass="addTask"
                    value={tempTaskCreation.values.title}
                    onChange={tempTaskCreation.handleChange}
                    onBlur={tempTaskCreation.handleBlur("title")}
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
                    <SearchAndAssign onAssignUsers={handleAssignUsers} />
                    <div className="dropDownError">
                        {tempTaskCreation.touched.assigned_to &&
                            tempTaskCreation.errors.assigned_to && (
                                <ErrorMessage>
                                    {tempTaskCreation.errors.assigned_to}
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
                        disabled
                    >
                        <option value="to_do">To-do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </Dropdown>
            </AddAtaskContainer>

            {isExpanded ? (
                <Save onClick={tempTaskCreation.handleSubmit}>Save</Save>
            ) : (
                <AddTaskButton type="button" onClick={viewAddTask}>
                    +
                </AddTaskButton>
            )}
        </Container>
    );
}

export default AddTask;

const Container = styled.div``;



const AddTaskButton = styled.button`
    width: 100%;
    font-size: 20px;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    color: #ffffff;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 35px;
`;
const Save = styled.button`
    width: 100%;
    font-size: 20px;
    padding: 10px 20px;
    border: 1px solid #ffffff;
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

const AddButton = styled.div`
    border: 1px solid #ffffff;
    color: #ffffff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    font-size: 35px;
    cursor: pointer;
    margin-top: 10px;
`;
