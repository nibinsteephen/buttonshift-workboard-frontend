import React from "react";
import styled from "styled-components";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const handleLogout = () => {
        onConfirm();
    };

    return (
        <ModalBackground>
            <ModalContent>
                <ModalMessage>Are you sure you want to log out ?</ModalMessage>
                <ModalActions>
                    <Button onClick={handleLogout}>Logout</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalActions>
            </ModalContent>
        </ModalBackground>
    );
};

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const ModalContent = styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

const ModalMessage = styled.p`
    font-size: 18px;
    margin-bottom: 20px;
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;

    &:hover {
        background-color: #ccc;
    }
`;

export default LogoutModal;
