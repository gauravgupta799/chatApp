import React from 'react'
import "./loader.css";

const Loader = () => {
    return (
        <div className="container">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
         </div>
    )
}

// const Container = styled.div`
//     width:100%;
//     height: 80vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap:0.5rem;
//     animation:move;
//     .box{
//         height:20px;
//         width:20px;
//         border-radius:50%;
//         animation: move 1s linear infinite;
//     }
//     :nth-of-type(1){
//         animation-delay: 0.1s;
//         background-color: rgb(34, 172, 187);
//     }
//     :nth-of-type(2){
//         animation-delay: 0.1s;
//         background-color: rgb(221, 96, 217);
//     }
//     :nth-of-type(3){
//         animation-delay: 0.3s;
//         background-color: rgb(32, 107, 236);
//     }
//     :nth-of-type(4){
//         animation-delay: 0.4s;
//         background-color: rgb(205, 214, 31);
//     }
//     :nth-of-type(5){
//         animation-delay: 0.5s;
//         background-color: rgb(226, 138, 30);
//     }
//     @keyframes move {
//     0% {
//       transform: scale(0);
//     }
//     50% {
//       transform: scale(1);
//    }
//     100% {
//       transform: scale(0);
//     }
//   }
// `
// const Box = styled.div`
//     height:20px;
//     width:20px;
//     border-radius:50%;
//     animation: move 1s linear infinite;
// `

export default Loader
