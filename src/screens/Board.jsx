import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfo from "../components/general/UserInfo";
import ExitingTask from "../components/general/ExitingTask";
import { useParams } from "react-router-dom";
import { appAuthConfig } from "../apis/apiconfig";
import AddTask from "../components/general/AddTask";

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
            if (data.StatusCode == 6000) {
                setWorkboardDetails((prevState) => ({
                    ...prevState,
                    title: data.data.workboard_title,
                    description: data.data.workboard_description,
                }));
            } else {
                toast.error("Something went Wrong");
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
            if (data.StatusCode == 6000) {
                setTasks(data.data.tasks);
            } else {
                toast.error("Something went Wrong");
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchWorkboardDetails();
        fetchTasks();
    }, []);
    console.log(tasks)

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
                <TaskSection>
                    <EachSection>
                        <Title>To-Do’s</Title>
                        <CardContainer className="to-do">
                            <div className="overflow">
                                {tasks.map(
                                    (item, key) =>
                                        item.status == "to_do" && (
                                            <ExitingTask
                                                key={key}
                                                taskid={item.task_id}
                                                title={item.title}
                                                users={item.assigned_users_name}
                                                description={item.description}
                                                assigned_to={
                                                    item.assigned_users_id
                                                }
                                                status={item.status}
                                                onComplete={fetchTasks}
                                            />
                                        )
                                )}
                                <AddTask
                                    fetchTasks={fetchTasks}
                                    taskStatus="to_do"
                                />
                            </div>
                        </CardContainer>
                    </EachSection>
                    <EachSection>
                        <Title>In Progress</Title>
                        <CardContainer className="in-progress">
                            <div className="overflow">
                                {tasks.map(
                                    (item, key) =>
                                        item.status == "in_progress" && (
                                            <ExitingTask
                                                key={key}
                                                taskid={item.task_id}
                                                title={item.title}
                                                users={item.assigned_users_name}
                                                description={item.description}
                                                assigned_to={
                                                    item.assigned_users_id
                                                }
                                                status={item.status}
                                                onComplete={fetchTasks}
                                            />
                                        )
                                )}
                                <AddTask
                                    fetchTasks={fetchTasks}
                                    taskStatus="in_progress"
                                />
                            </div>
                        </CardContainer>
                    </EachSection>
                    <EachSection>
                        <Title>Completed</Title>
                        <CardContainer className="completed">
                            <div className="overflow">
                                {tasks.map(
                                    (item, key) =>
                                        item.status == "completed" && (
                                            <ExitingTask
                                                key={key}
                                                taskid={item.task_id}
                                                title={item.title}
                                                users={item.assigned_users_name}
                                                description={item.description}
                                                assigned_to={
                                                    item.assigned_users_id
                                                }
                                                status={item.status}
                                                onComplete={fetchTasks}
                                            />
                                        )
                                )}
                                <AddTask
                                    fetchTasks={fetchTasks}
                                    taskStatus="completed"
                                />
                            </div>
                        </CardContainer>
                    </EachSection>
                </TaskSection>
            </Content>
        </Container>
    );
}

export default Board;

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
