import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {Link,useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"
import axios from "axios";
import {ToastContainer} from "react-toastify";
import {toastError, toastSuccess} from "../toastify";
import {loginRoute} from "../utils/ApiRoutes";


const Login = () => {
    const [ user, setUser] = useState({
        email:"",
        password:""
    })
    const {email, password} = user;
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("chat-user")){
            navigate("/")
        }
    },[])

    const handleChange =(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    const handleValidation =()=>{
        const {email, password} = user;
        if(email === "" || password === ""){
            toastError("Email and Password are required.")
            return false;
        }
        return true;
    }

    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        if(handleValidation()){
            const {data}= await axios.post(loginRoute,{
                email, password
            });
            if(data.status === false){
                toastError(data.message);
            }
            if(data.status === 200){
                toastSuccess(data.message)
                localStorage.setItem("chat-user", JSON.stringify(data))
                navigate('/setAvata')
            }
        }
    }
   
	return (
		<>
			<FormContainer>
				<form onSubmit={handleSubmit}>
					<div className='brand'>
						<img src={logo } alt='logo' />
						<h1>Snappy</h1>
					</div>
					<input 
                        type='email' 
                        name='email' 
                        value={email} 
                        placeholder='Email' 
                        onChange={handleChange}
                    />
					<input
						type='password'
						name='password'
						value={password}
						placeholder='Password'
                        onChange={handleChange}
					/>
                    <button type= "submit">Login</button>
                    <span>Don't have an account?
                        <Link to ="/register">
                            Register
                        </Link>
                    </span>
				</form>
			</FormContainer>
            <ToastContainer/>
		</>
	);
};

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display:flex;
    align-items: center;
    justify-content: center;
    gap:1rem;
    flex-direction: column;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:1rem;
        img{
            height: 4rem;
            border-radius:50%;
        }
        h1{
            color:white;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction:column;
        gap:2rem;
        background-color: #00000076;
        border-radius:2rem;
        padding: 3rem 5rem;
        input{
            background-color:transparent;
            padding: 1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width: 100%;
            font-size:1.03rem;
            letter-spacing:0.8px;
            caret-color: #4e0eff;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none;
            }
        }
        button{
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
        span{
            color:white;
            text-transform: uppercase;
            letter-spacing: 1px;;
            a{
                color:#4e0eff;
                text-decoration: none;
                font-weight: bold;
                margin-left: 5px;
                &:hover{
                    color:#4e0ef3;
                }
            }
        }

    }

    `
export default Login;

