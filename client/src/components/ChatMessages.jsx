import React from 'react'
import styled from "styled-components";

const ChatMessages = ({messages}) => {
    // console.log("Mess", messages)
    return (
        <Container>
            {messages.map((message) =>{
                console.log(message)
                return (
                    <div>
                        <div className={`message ${message.fromself ? "sended" : "recieved"}`}>
                          <div className="content">
                              <p>{message.message}</p>
                          </div>
                        </div>
                    </div>
                )
             })
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:1rem;
    overflow: auto;
    padding: 1rem 2rem;
    ::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;

        &-thumb{
            background-color: #9186f3;
            border-radius:1rem;
        }
    }
    .message{
        display:flex;
        align-items: center;
        .content{
            max-width:40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size:1rem;
            border-radius:1rem;
            color:white;
        }
    }
    .sended{
        justify-content:flex-end;
        .content{
            background-color: #4f04ff21;
        }
    }
    .recieved{
        justify-content:flex-start;
        color:red;
        .content{
            background-color: #9900ff20;
        }
    }
`
export default ChatMessages
