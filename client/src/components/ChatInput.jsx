import React,{useState} from 'react'
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message = message + event.emoji;
        setMsg(message);
    }
    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("")
        }
    }
    
  return (
    <Container>
        <div className="button-container">
          <div className="emoji" >
            <BsEmojiSmileFill onClick={toggleEmojiPicker}/>
            { showEmojiPicker && 
                <Picker onEmojiClick={handleEmojiClick}/>
            }
          </div>
        </div>
        <form className="input-container" onSubmit={sendChat}>
            <input 
                type="text" 
                placeholder="Type your message here..."
                value={msg} 
                onChange={(e)=>setMsg(e.target.value)}                 
            />
            <button type="submit">
                <IoMdSend/>
            </button>
        </form>     
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns:5% 95%;
    align-items: center;
    background-color: #080420;
    padding:0 2rem;
    padding-top: 0.3rem;
    .button-container{
        display: flex;
        align-items: center;
        color:white;
        gap:1rem;
        .emoji {
            position:relative;
            svg{
                font-size:1.5rem;
                color:#ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position:absolute;
                top:-355px;
                height:340px !important;
                width:320px !important;
                background-color: #080420;
                box-shadow: 0 1px 5px  #9a86f3;
                border-color:#9186f3;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb{
                        background-color: #9186f3;
                    }
                }
                .epr-body{
                    /* background-color:#080420; */
                    cursor: pointer;
                }
                .epr-search {
                    background-color: transparent !important;
                    border-color: #9186f3;
                    color:white;
                    letter-spacing: 0.5px;
                }
                .epr-group:before {
                    background-color:#080420;
                }
                .epr-emoji-category-label {
                    color:#9186f6;
                }

            }
        }
    }
    .input-container{
        width: 100%;
        display: flex;
        align-content: center;
        gap:2rem;
        border-radius:2rem;
        background-color: #ffffff34;
        input{
            width: 90%;
             background-color: transparent;
             color:white;
             letter-spacing: 0.5px;
             border:none;
             padding-left: 1rem;
             font-size:1.2rem;
             &::selection {
                background-color: #9a86f3;
             }
             &:focus{
                outline:none;
             }
        }
        button{
            padding: 0.3rem 2rem;
            /* border-radius:2rem; */
            border-top-right-radius: 2rem;
            border-bottom-right-radius: 2rem;
            display:flex;
            align-items: center;
            justify-content: center;
            background-color: #9a86f3;
            border:none;
            svg{
                font-size:2rem;
                color:white;
            }
            &:hover{
                cursor:pointer;
                background-color:#9a6df0;
            }
        }
        
    }


`
export default ChatInput
