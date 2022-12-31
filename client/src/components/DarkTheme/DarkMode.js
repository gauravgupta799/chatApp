import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CiDark } from "react-icons/ci";
import { BsFillSunFill } from "react-icons/bs";

const DarkMode = () => {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.body.className = theme;
	}, [theme]);

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	return (
		<Button onClick={toggleTheme}>
			{theme === "light" ? 
            <CiDark className="dIcon"/> :
             <BsFillSunFill  className="lIcon"/>}
		</Button>
	);
};

const Button = styled.button`
    border:none;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 50%;
    padding: 0.4rem;
    background-color:#333;
    color:#fff;
    font-size:1.2rem;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        background-color: #9186f3;
        color:#000;
    }
`
export default DarkMode;
