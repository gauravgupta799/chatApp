import React,{useState} from "react";
import styled from "styled-components";
import {Link,useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"
import axios from "axios";
import {ToastContainer} from "react-toastify";
import {toastError, toastSuccess} from "../toastify";
import {registeRoute} from "../utils/ApiRoutes";


const Register = () => {
    const [ newUser, setNewUser] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const {username, email, password, confirmPassword} = newUser;
    const navigate = useNavigate()
    const handleChange =(e)=>{
        setNewUser({...newUser, [e.target.name]:e.target.value})

    }
    const handleValidation =()=>{
        const {password, confirmPassword} = newUser;
        if(password !== confirmPassword){
            toastError("Password and confirm password should be same")
            return false;
        }else if (username.length < 3){
            toastError("Username should be greater than 3 characters");
            return false;
        }else if(password.length < 8){
            toastError("Password should be  equal or greater than 8 characters");
            return false;
        }else if(email === ""){
            toastError("Eamil is required.")
            return false;
        }
        return true;
    }

    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        if(handleValidation()){
            const {data} = await axios.post(registeRoute,{
                username,email, password
            });
            if(data.status === false){
                toastError(data.msg);
            }
            if(data.status === 200){
                toastSuccess(data.msg)
                localStorage.setItem("chatApp-User", JSON.stringify(data.user))
                navigate("/")
            }
            console.log(data.status);
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
                        type='text' 
                        name='username'
                        value={username} 
                        placeholder='Username' 
                        onChange={handleChange}
                        required
                     />
					<input 
                        type='email' 
                        name='email' 
                        value={email} 
                        placeholder='Email' 
                        onChange={handleChange}
                        required
                    />
					<input
						type='password'
						name='password'
						value={password}
						placeholder='Password'
                        onChange={handleChange}
                        required
					/>
					<input
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						placeholder='Confirm Password'
                        onChange={handleChange}
                        required
					/>
                    <button type= "submit">Create User</button>
                    <span>Already have an account?
                        <Link to ="/login">
                            Login
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
            height: 5rem;
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
export default Register;
