import React,{useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import {useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import axios from "axios";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    async function getChatUser(){
      if(!localStorage.getItem("chat-user")){
        navigate("/login")
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")))
        setIsLoaded(true);
      }
    }
    getChatUser();
  },[])

  useEffect(() => {
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
  },[currentUser]);

  useEffect(() => {
    async function checkCurrentUser(){
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data);
        }else{
          navigate("/setAvata")
        }
      }
    }
    checkCurrentUser();
  },[currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
        <div className="Container" >
         <Contacts 
           contacts ={contacts} 
           currentUser={currentUser}
            changeChat ={handleChatChange}
          />
          { isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser}/>
            ):(
              <ChatContainer 
              currentChat={currentChat}
              currentUser ={currentUser} 
              socket = {socket}
              />
            )
          }   
        </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color:#222;
  gap:1rem;
  .Container{
    height: 90vh;
    width: 90vw;
    background-color:#00000076;
    color:white;
    border-radius:4px;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`


export default Chat
