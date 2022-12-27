
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const toastError =(msg)=>{
    toast.error(msg,{
        position:"top-right",
        autoClose:3000,
        closeOnClick: true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    })
}
export const toastSuccess =(msg)=>{
    toast.success(msg,{
        position:"top-right",
        autoClose:3000,
        closeOnClick: true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    })
}
export const toastWarning =(msg)=>{
    toast.warning(msg,{
        position:"top-right",
        autoClose:3000,
        closeOnClick: true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    })
}