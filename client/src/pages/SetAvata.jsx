import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../toastify";
import { setAvatarRoute } from "../utils/ApiRoutes";
import Loader from "../components/Loader/Loader";

const api ="https://api.multiavatar.com/337453";

const SetAvata = () => {
	const [avatars, setAvatars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("chat-user")){
            navigate("/login")
        }
    },[]);

	useEffect(() => {
		async function fetchData() {
			let data = [];
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
				const buffer = new Buffer(image.data);
				data.push(buffer.toString("base64"));
			}
			setAvatars(data);
			setLoading(false);
		}
		fetchData();
	}, []);

    const setProfilePircture = async()=>{
        if(selectedAvatar === undefined){
            toastError("Please select an avatar.");
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            });
            if(data.isSet){
                user.isAvatarImageSet= true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-user",JSON.stringify(user))
                toastSuccess("Your avatar has been successfully set up!");
                navigate("/")
            }else{
                toastError("Error setting avatar. Please try again!")
            }
        }

    }
	return (
		<>
            { loading ? (
                <Loader/>
                ) :(
                <>
                    <Container>
                        <div className='title-container'>
                            <h1>Pick an avatar as your profile picture.</h1>
                        </div>
                        <div className='avatars'>
                            {avatars.map((avatar, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={` avatar ${
                                            selectedAvatar === index ? "selected" : " "
                                        }`}
                                    >
                                        <img
                                            src={`data:image/svg+xml;base64,${avatar}`}
                                            alt='avatar'
                                            onClick={() => setSelectedAvatar(index)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <button className='setProfile-btn'
                            onClick={setProfilePircture}
                        >
                            Set as Profile Picture
                        </button>
                    </Container>
                    <ToastContainer /> 
                </>
                )
            }
		</>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: #131324;
	height: 100vh;
	width: 100vw;
	.title-container {
		h1 {
			color: white;
            font-size:1.5rem;
            letter-spacing: 1px;
		}	
	}
    .avatars {
			display: flex;
            margin-top: 1.5rem;
        .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            gap:1rem;
            transition: 0.3s ease-in-out;
            img {
                height: 6rem;
                &:hover{
                    cursor:pointer;
                    transform:scale(1.02);
                }
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
	}
    .setProfile-btn{
            background-color:#997af0;
            color:white;
            padding: 1rem 2rem;
            border:none;
            font-weight: bold;
            border-radius: 0.4rem;
            font-size: 1rem;
            margin-top: 1.5rem;
            text-transform: uppercase;
            cursor:pointer;
            transition:0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
`;

export default SetAvata;