import {BrowserRouter,Routes,Route } from "react-router-dom"
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvata from "./pages/SetAvata";

function App() {
  // const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Chat/>} />
        <Route path="/setAvata" element={<SetAvata/>} />
        <Route path="/register" element={<Register/>} />
        <Route path ="/login" element={<Login/>} />
      </Routes>
 
    </BrowserRouter>
  );
}

export default App;
