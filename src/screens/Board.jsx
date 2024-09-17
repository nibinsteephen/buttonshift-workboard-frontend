import React from "react";
import styled from "styled-components";
import UserInfo from "../components/general/UserInfo";
import ExitingTask from "../components/general/ExitingTask";

function Board() {
    return (
        <Container className="wrapper">
            <Head>
                <TopLeft>
                    <BreadCrumbs>
                        <a href="/workboard" className="small">
                            My Workboards / &nbsp;
                        </a>
                        <a href="/board" className="large">
                            My First WorkBoard
                        </a>
                    </BreadCrumbs>
                </TopLeft>
                <UserInfo name={"John Doe"} />
            </Head>
            <Content>
                <Description>
                    I made this board as an assignment for ButtonShift
                </Description>
                <TaskSection>
                    <EachSection >
                        <Title>To-Do’s</Title>
                        <CardContainer className="to-do">
                            <ExitingTask title="My First Task" users={["Doe"]}/>
                            <AddButton>+</AddButton>
                        </CardContainer>
                    </EachSection>
                    <EachSection>
                        <Title>In Progress</Title>
                        <CardContainer className="in-progress">
                            <AddButton>+</AddButton>
                        </CardContainer>
                    </EachSection>
                    <EachSection>
                        <Title>Completed</Title>
                        <CardContainer className="completed">
                            <AddButton>+</AddButton>
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
    .to-do{
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
    font-family: 'Satoshi-Bold';
    font-size: 22px;
`;

const CardContainer = styled.div`
    height: 90%;
    margin-top: 15px;
    border-radius: 10px;
    padding: 10px;
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
