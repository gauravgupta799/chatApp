import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../toastify";
import { setAvatar } from "../utils/ApiRoutes";

const SetAvata = () => {
	// const api ="https://api.multiavatar.com";
    // const api =" https://avatars.dicebear.com/api"

	const [avatars, setAvatars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	// const navigate = useNavigate();

	// const setProfilePic = async()=>{}

	useEffect(() => {
		async function fetchData() {
			let data = [];
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(
					`${api}/${Math.round(Math.random() * 1000)}`
				);
                console.log(image)
				const buffer = new Buffer(image.data);
				data.push(buffer.toString("base64"));
			}
			setAvatar(data);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			{!loading ? 
            (
                <>
                    <LoaderContainer className="loaderContainer">
                        <img src ={loader} alt="loading"/>
                    </LoaderContainer>
                </>
            ):(
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
                                    className={`avatar ${
                                        selectedAvatar === index ? "selected" : ""
                                    }`}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt='avatar'
                                        onChange={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button 
                        className='setProfile-btn'
                        onClick={setSelectedAvatar()}
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
		}
		.avatars {
			display: flex;
			gap: 2rem;
			.avatatr {
				display: flex;
				align-items: center;
				justify-content: center;
				border: 0.4rem solid transparent;
				padding: 0.4rem;
				border-radius: 5rem;
				transition: 0.5s ease-in-out;
				img {
					height: 6rem;
				}
			}
			.selected {
				border: 0.4rem solid #4e0eff;
			}
            .setProfile-btn{
            background-color:#997af0;
            color:white;
            padding: 1rem 2rem;
            border:none;
            font-weight: bold;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            cursor:pointer;
            transition:0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff;
            }
        }
		}
	}
`;
const LoaderContainer = styled.div`
    display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: #131324;
	height: 100vh;
	width: 100vw;
    img{
        width: 400px;
        height:400px;
        background-color: #131324;
        border-radius:50%;
    }
`

export default SetAvata;
