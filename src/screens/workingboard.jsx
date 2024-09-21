
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfo from "../components/general/UserInfo";
import ExitingTask from "../components/general/ExitingTask";
import { useParams } from "react-router-dom";
import { appAuthConfig } from "../apis/apiconfig";
import AddTask from "../components/general/AddTask";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

function Board() {
    const { workboard_id } = useParams();
    const [workboardDetails, setWorkboardDetails] = useState({
        title: "",
        description: "",
    });
    const [tasks, setTasks] = useState([]);

    // api for Workboard Details

    const fetchWorkboardDetails = async () => {
        try {
            const { data } = await appAuthConfig.get(
                `/workboard/workboard-details/${workboard_id}/`
            );
            if (data.StatusCode === 6000) {
                setWorkboardDetails({
                    title: data.data.workboard_title,
                    description: data.data.workboard_description,
                });
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // api for tasks

    const fetchTasks = async () => {
        try {
            const { data } = await appAuthConfig.get(
                `/workboard/workboard-tasks/${workboard_id}/`
            );
            if (data.StatusCode === 6000) {
                setTasks(data.data.tasks);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWorkboardDetails();
        fetchTasks();
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // No destination (dropped outside droppable area)
        if (!destination) return;

        // If dropped in the same place, no change
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const taskIndex = tasks.findIndex(
            (t) => t.task_id.toString() === draggableId
        );
        const task = tasks[taskIndex];

        // Update task's status and reorder it in the task array
        const updatedTask = { ...task, status: destination.droppableId };

        const updatedTasks = Array.from(tasks);
        updatedTasks.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, updatedTask);

        setTasks(updatedTasks);

        // Optionally: Make an API call to update the task's status on the server
        // await appAuthConfig.put(`/workboard/update-task-status/`, updatedTask);
    };

    // Helper function to filter tasks by status
    const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

    return (
        <Container className="wrapper">
            <Head>
                <TopLeft>
                    <BreadCrumbs>
                        <a href="/workboard" className="small">
                            My Workboards / &nbsp;
                        </a>
                        <a href="/board" className="large">
                            {workboardDetails.title}
                        </a>
                    </BreadCrumbs>
                </TopLeft>
                <UserInfo name={"John Doe"} />
            </Head>
            <Content>
                <Description>{workboardDetails.description}</Description>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <TaskSection>
                        {["to_do", "in_progress", "completed"].map((status) => (
                            <EachSection key={status}>
                                <Title>{status === "to_do" ? "To-Do’s" : status.replace("_", " ")}</Title>
                                <Droppable droppableId={status}>
                                    {(provided) => (
                                        <CardContainer
                                            className={status.replace("_", "-")}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className="overflow">
                                                {getTasksByStatus(status).map((item, index) => (
                                                    <Draggable
                                                        key={item.task_id}
                                                        draggableId={item.task_id.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <ExitingTask
                                                                    key={item.task_id}
                                                                    taskid={item.task_id}
                                                                    title={item.title}
                                                                    users={item.assigned_users_name}
                                                                    description={item.description}
                                                                    assigned_to={item.assigned_users_id}
                                                                    status={item.status}
                                                                    onComplete={fetchTasks}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                                <AddTask fetchTasks={fetchTasks} taskStatus={status} />
                                            </div>
                                        </CardContainer>
                                    )}
                                </Droppable>
                            </EachSection>
                        ))}
                    </TaskSection>
                </DragDropContext>
            </Content>
        </Container>
    );
}

export default Board;

// Styles remain unchanged


const Container = styled.div`
    height: 85vh;
`;

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    align-items: center;
`;
const TopLeft = styled.div``;
const Content = styled.div`
    height: 100%;
`;
const Description = styled.p`
    font-size: 18px;
    color: #000000;
`;

const BreadCrumbs = styled.div`
    display: flex;
    align-items: end;
    .small {
        font-size: 18px;
        margin-bottom: 3px;
        color: #2a407c;
    }

    .large {
        font-family: "Satoshi-Bold";
        color: #45464c;
        font-size: 28px;
        color: #2a407c;
        text-transform: capitalize;
    }
`;

const TaskSection = styled.div`
    width: 100%;
    height: 85%;
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
`;

const EachSection = styled.div`
    width: 32%;
    height: 100%;
    .to-do {
        background-color: #e3e3e3;
    }
    .in-progress {
        background-color: #c9e6ff;
    }
    .completed {
        background-color: #d1e7d2;
    }
`;

const Title = styled.p`
    color: #4c4c4c;
    font-family: "Satoshi-Bold";
    font-size: 22px;
`;

const CardContainer = styled.div`
    height: 90%;
    margin-top: 15px;
    border-radius: 10px;
    padding: 10px;
    .overflow {
        height: 100%;
        overflow-y: scroll;
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
`;
