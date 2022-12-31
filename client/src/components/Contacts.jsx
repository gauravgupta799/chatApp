import React,{useState, useEffect} from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.png";

const Contacts = ({contacts, currentUser,changeChat}) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    },[currentUser]);

    const changeCurrentChat =(index,contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
      <>
          {
            currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                            <img src ={Logo} alt="logo"/>
                            <h3>snappy</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact,index)=>{
                                return (
                                    <div
                                    key={index}
                                    className={`contact ${index === currentSelected ? "selected":""}` }
                                    onClick= {()=>changeCurrentChat(index,contact)}
                                    >
                                        <div className="avatar">
                                            <img
                                                src={contact.avatarImage ? `data:image/svg+xml;base64,${contact.avatarImage}` : ""
                                                    }
                                                alt='avatar'
                                            /> 
                                        </div>
                                       <div className="username">
                                            <h3>{contact.username}</h3>      
                                       </div>
                                    </div>
                                )
                            })  
                        }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={ currentUserImage ? `data:image/svg+xml;base64,${ currentUserImage}` : ""
                                    }
                                alt='avatar'
                            /> 
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>      
                        </div>
                    </div>
                </Container>
            )
        }
      </>
    )
}


const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    background-color: #080420;
    overflow: hidden;
   .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:10rem;
        img{
              height: 3rem;
              border-radius: 50%;
          }
        h3{
            color:white;
            text-transform: uppercase;
        }
   } 
   .contacts{
       display:flex;
       align-items: center;
       flex-direction: column;
       overflow: auto;
       gap:0.8rem;
       margin-top: 1rem;
       &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.3rem;
            border-radius: 1rem;
        }
       }
        .contact {
            display: flex;
            align-items: center;
            background-color: #ffffff39;
            border: 0.1px solid #9186f3;
            min-height:5rem;
            width: 90%;
            padding: 0.4rem;
            gap:1rem;
            border-radius:0.2rem;
            cursor: pointer;
            transition:0.5s ease-in-out;
            .avatar{
                height:3.7rem;
                width:3.7rem;
                border: 0.2rem solid #4e0eff;
                border-radius:50%;
                display:flex;
                align-items: center;
                justify-content: center;
                img{
                    height: 3rem;
                }
            }
            .username{
                color:white;
            }
        }
    .selected {
            background-color: #9186f3;
    }
   }
   .current-user{
       display: flex;
       align-items: center;
       justify-content: center;
       gap:2rem;
       background-color: #0d0d30;
       border: 0.1rem solid #9186f3;
       .avatar{
            height:5rem;
            width:5rem;
            border: 0.2rem solid #4e0ef0;
            border-radius:50%;
            display:flex;
            align-items: center;
            justify-content: center;
            img{
                height: 4rem;
                max-inline-size:100%;
            }
        }
        .username{
            h2{
                color:white;
            }
        }
        @media screen and (min-width: 720px) and (max-width:1080px) {
            gap:0.5rem;
            .username{
                font-size:1rem;
            }
        }
   }
`

export default Contacts
