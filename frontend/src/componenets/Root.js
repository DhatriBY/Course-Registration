import React, { Fragment,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Root.css";

function Root(){
    const navigate = useNavigate();
    const OnLoginForm =() => {
        return(navigate('/login', {replace: true}));
    }
    

    return (
    <form  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'}} onSubmit={OnLoginForm}>
      <h1>Welcome to IITASC!!</h1>
      <button type="submit" >Login</button>
    </form>
  );
    

}
export default Root;