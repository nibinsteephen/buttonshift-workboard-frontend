import React from "react";
import styled from "styled-components";

function Avatar({ name, type }) {
    const generateColor = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `#${(hash & 0x00ffffff).toString(16).padStart(6, "0")}`;
        return color;
    };

    const backgroundColor = generateColor(name);
    const initialLetter = name && name.length > 0 ? name[0] : "";

    return <Container backgroundColor={backgroundColor} type={type}>
        <p>{initialLetter}</p>
    </Container>;
}

export default Avatar;

const Container = styled.div`
    /* width: 60px; */
    width: ${({type})=>(type ? "30px" : "60px" )};
    height: ${({type})=>(type ? "30px" : "60px" )};
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ffffff;
    p {
        font-family: "Satoshi-Bold";
        color: #b1b3bd;
        font-size: ${({type})=>(type ? "13px" : "25px" )};
    }
`;
