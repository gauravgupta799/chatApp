import React,{useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import Logout from './Logout';
import {sendMessageRoute, getAllMessagesRoute} from "../utils/ApiRoutes";
import axios from "axios";
import {v4 as uuidv4} from "uuid"

const ChatContainer = ({currentChat,currentUser, socket}) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(()=>{
        async function fetchAllMessages(){
            const {data} = await axios.post(getAllMessagesRoute, {
                from:currentUser._id,
                to:currentChat._id
            });
            setMessages(data)
        }
        if(currentUser){
            fetchAllMessages();
        }
    },[currentUser])


    const handleSendMsg = async(msg) => {
        await axios.post(sendMessageRoute, {
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        });
        socket.current.emit('send-msg',{
            to:currentChat._id,
            from:currentUser._id,
            message:msg,
        });
        const msgs = [...messages];
        msgs.push({
            fromSelf: true,
            message: msg
        });
        setMessages(msgs);
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage({
                    fromSelf: false,
                    message:msg
                });
            })
        }
    },[]);

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=> [...prev, arrivalMessage])
    },[arrivalMessage ]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({
            behaviour:"smooth"
        });
    },[messages])

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
            <div className="chat-messages">
                {messages.map((message) =>{
                    return (
                        <div  ref={scrollRef} key={uuidv4()} >
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <ChatInput handleSendMsg = {handleSendMsg}/>
        </Container>
    )
}

const Container = styled.div`
    display:grid;
    grid-template-rows: 10% 78% 12%;
    gap:0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width:1080px) {
      grid-template-rows: 15% 70% 15%;
    }
    .chat-header{
        display: flex;
        align-items: center; 
        justify-content: space-between;
        padding: 0 1rem;
        height: 4rem;
        background-color: #080420;
        .user-details{
            display: flex;
            align-items: center;
            gap:1rem;
            .avatar{
                height: 3rem;
                width: 3rem;
            }
            .username{
                h3{
                    color:white;
                }
            }
        }
    }
    .chat-messages {
        display: flex;
        flex-direction: column;
        gap:1rem;
        overflow: auto;
        padding: 1rem 2rem;
        &::-webkit-scrollbar {
            background-color: #080420;
            width: 3px;
            &-thumb{
                background-color: #9186f3;
                border-radius:1rem;
            }
        }
        .message {
            display:flex;
            align-items: center;
            .content{
                max-width:100%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size:1rem;
                border-radius:1rem;
                color:#d1d1d1;
            } 
        }
        .sended {
        justify-content:flex-end;
            .content{
                background-color: #4f04ff21;
            }
        }
        .recieved {
            justify-content:flex-start;
            .content{
                background-color: #9900ff20;
            }
        }
    }
`

export default ChatContainer
