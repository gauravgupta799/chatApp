import React from 'react'
import styled from "styled-components";
import Robot from "../assets/robot.gif"

const Welcome = ({currentUser}) => {
    return (
        <Container>
            <img src= {Robot} alt="robotGIF"/>
            <h1>
                Welcome,
                <span> {currentUser?.username}</span>
            </h1>
            <p>Please select a chat to <strong>Start Messaging.</strong></p>
            
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color:white;
    gap:1rem;
    letter-spacing: 1px;
    img{
        height: 10rem;
        width: 10rem;
        border-radius: 50%;
    }
    h1{
        span{
            color:#4e0eff;
        }
    }
    p{
        font-size:1.2rem;
    }

`

export default Welcome
