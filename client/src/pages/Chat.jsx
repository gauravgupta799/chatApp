import React,{useState, useEffect } from 'react'
import styled from "styled-components";
import {useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/ApiRoutes";
import axios from "axios";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';


const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

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
    async function checkCurrentUser(){
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          // console.log("Data", data);
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

  console.log("Contacts", contacts);
  console.log("currentChat", currentChat);
  console.log("currentUser", currentUser);
  return (
    <Container>
        <div className="Container">
         <Contacts 
           contacts ={contacts} 
           currentUser={currentUser}
            changeChat ={handleChatChange}
          />
          { isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser}/>
            ):(
              <ChatContainer currentChat={currentChat}/>
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
  gap:1rem;
  background-color: #131324;
  color:white;
  .Container{
    height: 85vh;
    width: 85vw;
    background-color:#00000076;
    border-radius:4px;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`


export default Chat
