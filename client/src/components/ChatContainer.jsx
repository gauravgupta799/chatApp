import React from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import Logout from './Logout';

const ChatContainer = ({currentChat}) => {
    // console.log(currentChat)

    const handleSendMsg = async (msg) => {
        console.log("Message", msg)

    }
    return (
        <Container>
           <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                            alt='avatar'
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat?.username}</h3>
                    </div>
                </div>
                <Logout/>
           </div>
            <ChatMessages/>
            <ChatInput handleSendMsg = {handleSendMsg}/>
        </Container>
    )
}

const Container = styled.div`
    /* border:1px solid green; */
    /* display: flex;
    justify-content: space-between;
     */
    .chat-header{
        /* border:1px solid blue; */
        display: flex;
        align-items: center; 
        justify-content: space-between;
        padding:0 1rem;
        height: 4rem;
        background-color: #ffffff09;
        .user-details{
            /* width: 100%; */
            /* height: 4rem; */
            display: flex;
            align-items: center;
            /* justify-content: space-between; */
            gap:1rem;
            .avatar{
                height: 3rem;
                width: 3rem;
                /* margin-left: 10px; */
            }
            .username{
                /* margin-right: 1rem; */
                /* padding: 1rem; */
            }
        }
    }
`

export default ChatContainer
