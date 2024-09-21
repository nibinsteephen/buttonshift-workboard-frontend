import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import Input from "./Input";
import SearchAndAssign from "./searchAndAssign";
import { appAuthConfig } from "../../apis/apiconfig";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditTask({
    fetchTasks,
    taskStatus,
    onEdit = false,
    onCancel,
    onSave,
    title,
    description,
    status,
    assigned_to,
    taskid,
    editTypeTempTask = false,
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [editedTempTask, setEditedTempTask] = useState([]);
    const { workboard_id } = useParams();

    const handleEdit = () => {
        if (onEdit) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        handleEdit();
    }, [onEdit]);

    const editTask = async (formdata) => {
        try {
            const { data } = await appAuthConfig.post(
                `/workboard/edit-task/`,
                formdata
            );
            if (data.StatusCode == 6000) {
                setIsExpanded(false);
                toast.success("Task Edited successfully");
                onSave();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const taskValidationSchema = Yup.object().shape({
        title: Yup.string().required("Task title is required"),
        // assigned_to: Yup.array()
        //     .min(1, "At least one user must be assigned")
        //     .required("Assigned to is required"),
        status: Yup.string().required("Status is required"),
    });

    const tempTaskCreation = useFormik({
        initialValues: {
            title: title,
            description: description,
            assigned_to: [],
            status: taskStatus,
            workboard_id: editTypeTempTask ? "gvhb" : workboard_id,
            task_id: taskid,
        },
        validationSchema: taskValidationSchema,
        validateOnBlur: true,
        validateOnMount: true,

        onSubmit: (values) => {

            if (!editTypeTempTask) {
                const formdata = new FormData();

                formdata.append("title", values.title);
                formdata.append("description", values.description);
                formdata.append("status", values.status);
                formdata.append("workboard_id", workboard_id);
                formdata.append("task_id", values.task_id);
                formdata.append(
                    "assigned_to",
                    JSON.stringify(values.assigned_to)
                );
                if (!editTypeTempTask) {
                    formdata.append("workboard_id", workboard_id);
                }
                editTask(formdata);
            } else {
                onSave(values,taskid);
            }
        },
    });

    // const setTaskId = () => {
    //     tempTaskCreation.setFieldValue("task_id", taskid);
    // }

    const handleAssignUsers = (selectedUsers) => {
        if (editTypeTempTask) {
            tempTaskCreation.setFieldValue("assigned_to", selectedUsers);
            console.log(selectedUsers, "ASSIGNED WITH ID AND USERNAME");
        } else {
            selectedUsers = selectedUsers.map((user) => user.id);
            tempTaskCreation.setFieldValue("assigned_to", selectedUsers);
            console.log(selectedUsers, "ASSIGNED WITH ID ONLY");
        }
    };

    // useEffect(() => {
    //     setTaskId();
    // }, [taskid]);
    // console.log(
    //     taskid
    // )

    return (
        <Container onSubmit={tempTaskCreation.handleSubmit}>
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
                    <SearchAndAssign
                        onAssignUsers={handleAssignUsers}
                        assigned_to={assigned_to}
                    />
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
                    >
                        <option value="to_do">To-do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </Dropdown>
            </AddAtaskContainer>
            <div className="button-container">
                <Cancel type="button" onClick={() => onCancel()}>
                    Cancel
                </Cancel>
                {/* {editTypeTempTask ? (
                    <Save
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setEditedTempTask(tempTaskCreation.values);
                            onSave(editedTempTask);
                            // console.log(
                            //     editedTempTask,
                            //     "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR"
                            // );
                        }}
                    >
                        Save
                    </Save>
                ) : ( */}
                <Save type="button" onClick={tempTaskCreation.handleSubmit}>
                    Save
                </Save>
                {/* )} */}
            </div>
        </Container>
    );
}

export default EditTask;

const Container = styled.form`
    .button-container {
        display: flex;
        gap: 15px;
    }
`;

const Cancel = styled.button`
    width: 50%;
    font-size: 20px;
    padding: 5px 10px;
    border: 1px solid #ffffff;
    color: #ffffff;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 15px;
`;
const Save = styled.button`
    width: 50%;
    font-size: 15px;
    padding: 5px 10px;
    border: 1px solid #ffffff;
    color: #ffffff;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
`;

const AddAtaskContainer = styled.div`
    /* background-color: #e3e3e3; */
    border-radius: 8px;
    transition: height 0.3s ease, padding 0.3s;

    height: ${({ $isExpanded }) => ($isExpanded ? "280px" : "0")};
    overflow: hidden;
    /* padding: ${({ $isExpanded }) => ($isExpanded ? "20px" : "0")}; */
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
    border-bottom: 1px solid #f2f2f2;
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
