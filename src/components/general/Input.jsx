import React from "react";
import styled from "styled-components";
import SmallLoader from "../loaders/SmallLoader";

const Input = ({
    name = "",
    label = "",
    type = "text",
    placeholder = "",
    value = "",
    isReadOnly = false,
    isLoading = false,
    isTextArea = false,
    onBlur = "",
    addClass = "",
    onChange = (value = "", name = "") => {},
    errorMessage = "",
    disabled = false,
    autoFocus = false,
    required = false,
}) => {
    return (
        <Container>
            <label htmlFor={name}>{label}</label>
            <div className={`input-wrapper ${addClass}`} >
                {isLoading ? (
                    <div className="loader">
                        <SmallLoader />
                    </div>
                ) : isTextArea ? (
                    <textarea
                        readOnly={isReadOnly}
                        name={name}
                        type={type}
                        id={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        disabled={disabled}
                        // onBlur={onBlur}
                        // onChange={e => onChange(e.target.value, e.target.name)}
                    ></textarea>
                ) : (
                    <input
                        autoFocus={autoFocus}
                        readOnly={isReadOnly}
                        name={name}
                        type={type}
                        id={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        disabled={disabled}
                        // onBlur={onBlur}
                        // onChange={e => onChange(e.target.value, e.target.name)}
                        className={addClass}
                        required={required}
                    />
                )}
            </div>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Container>
    );
};

export default Input;

const Container = styled.div`
    position: relative;
    margin-bottom: 20px;

    &:focus-within {
        border-color: #233256;
    }

    .loader {
        padding: 6px;
    }

    label {
        color: #535c66;
        font-size: 16px;
        font-family: 'Satoshi-Bold';
        text-transform: capitalize;
    }
    .input-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 6px;
        border: 1px solid #928fb2;
        border-radius: 5px;
        padding-left: 10px;

        input,
        textarea {
            display: block;
            flex: 1;
            padding: 8px 0;
            font-size: 14px;
            color: #212529;
            font-family: Satoshi-Medium;

            *,
            &::placeholder {
                color: #6a7683a1;
            }

            resize: none;
        }
        span.icon {
            cursor: pointer;
            img {
                width: 20px;
            }
        }
    }
    .WorkpaceTitle{
        border: 1px solid #f2f2f2;
        background-color: #ececec;
        input {
            border: none;
            border-radius: 5px;
            font-size: 20px;
        }
        textarea {
            border: none;
            border-radius: 5px;
            font-size: 20px;
        }
    }
    .WorkpaceDescription {
        border: none;
        border-bottom: 1px solid #f2f2f2;
        input {
            border: none;
            border-radius: 5px;
            font-size: 18px;
        }
        textarea {
            border: none;
            border-radius: 5px;
            font-size: 18px;
        }
    }
    .addTask {
        border: none;
        border-bottom: 1px solid #f2f2f2;
        input {
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }
        textarea {
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }
    }
    
`;
const ErrorMessage = styled.p`
    position: absolute;
    right: 0;
    bottom: -18px;
    font-size: 12px;
    color: red;
`;
