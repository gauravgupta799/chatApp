import React from 'react'
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <Container>
            <p>Logout</p>
            <Button onClick={handleLogout}>
            <BiPowerOff/>
            </Button>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    p{
        position: absolute;
        top:-40%;
        right: -20%;
        display: none;
    }
    &:hover{ 
        p{
            display: block;
        }
    }
`
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border:none;
    border-radius:0.5rem;
    background-color: #9a86f3;
    transition:0.5s ease-in-out;
    svg{
        font-size:1.3rem;
        color:#ebe7ff;
    }
    &:hover{
        cursor: pointer;
        background-color: #9a86ff;
    }

`
export default Logout
