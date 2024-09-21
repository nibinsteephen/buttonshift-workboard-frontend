import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { appAuthConfig } from "../../apis/apiconfig";

function SearchAndAssign({onAssignUsers, assigned_to}) {
    const [usersList, setUsersList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(assigned_to || []);
    const assignInputRef = useRef();

    // Fetch the users list from the API
    const fetchUserList = async () => {
        try {
            const { data } = await appAuthConfig.get(`/workboard/assign-users-list/`);
            if (data.StatusCode === 6000) {
                setUsersList(data.data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    useEffect(() => {
        if (assigned_to) {
            setSelectedUsers(assigned_to);
            onAssignUsers(assigned_to);
        }
    }, []);


    // Enforce the input always starts with @
    const enforceAtSign = (inputValue) => {
        if (!inputValue.startsWith("@")) {
            assignInputRef.current.value = "@";
        }
    };

    // Handle showing users list when "@" is typed
    const handleAssignInputChange = (e) => {
        const inputValue = e.target.value;

        enforceAtSign(inputValue);

        const searchTerm = inputValue.split("@").pop();
        if (searchTerm) {
            const filtered = usersList.filter(
                (user) =>
                    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    };

    // Handle selecting a user from the dropdown
    const handleUserSelect = (user) => {
        const updatedUsers = [...selectedUsers, user];
        setSelectedUsers(updatedUsers);
        setFilteredUsers([]);
        assignInputRef.current.value = "@"; // Reset input to "@" for new selection
        onAssignUsers(updatedUsers); 
    };

    // Handle removing a selected user
    const handleUserRemove = (userId) => {
        const updatedUsers = selectedUsers.filter((user) => user.id !== userId);
        setSelectedUsers(updatedUsers);
        onAssignUsers(updatedUsers);
    };

    return (
        <AssignInputContainer>
            <SelectedUserContainer>
                {selectedUsers.map((user) => (
                    <SelectedUser key={user.id}>
                        {user.full_name}
                        <RemoveButton onClick={() => handleUserRemove(user.id)}>
                            &times;
                        </RemoveButton>
                    </SelectedUser>
                ))}
                <input
                    ref={assignInputRef}
                    placeholder="Assign others with @"
                    name="assign"
                    className="addTask"
                    onChange={handleAssignInputChange}
                />
            </SelectedUserContainer>
            {/* Show dropdown with filtered users */}
            {filteredUsers.length > 0 && (
                <Dropdown>
                    {filteredUsers.map((user) => (
                        <DropdownItem
                            key={user.id}
                            onClick={() => handleUserSelect(user)}
                        >
                            {user.full_name}
                        </DropdownItem>
                    ))}
                </Dropdown>
            )}
        </AssignInputContainer>
    );
}

export default SearchAndAssign;

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

const AssignInputContainer = styled.div`
    position: relative;
    width: 100%;
`;

const SelectedUserContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    border: none;
    border-bottom: 1px solid #f2f2f2;
    padding-left: 13px;
    input {
        border: none;
        border-radius: 5px;
        font-size: 16px;
        width: 100%;
        font-family: "Satoshi-Medium";
        margin-bottom: 10px;
        &::placeholder {
                color: #6a7683a1;
            }
    }
`;

const SelectedUser = styled.div`
    background-color: #e0e0e0;
    padding: 5px 10px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    gap: 5px;
    text-transform: capitalize;
`;

const RemoveButton = styled.span`
    cursor: pointer;
    color: red;
    font-weight: bold;
`;

const DropdownItem = styled.div`
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
    position: absolute;
    width: 100%;
`;
