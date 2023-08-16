import React, { Fragment,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/Login.css";
function Login(){

    const[userid,setUserid]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();
    const OnLoginForm = async(e) => {
        e.preventDefault();
      console.log(userid);
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            credentials : 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid, password })
          });
          const data1 = await response.json();
          console.log(data1[0]);
        //   console.log(data)
          if(data1[0]==="successful")

             return(navigate('/home', {replace: true}));
           else {
            alert('Login failed. Please try again.');
          }
    };
    return (
      <div>
        <form style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'}} onSubmit={OnLoginForm}>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input type="text" id="userId" value={userid} onChange={e => setUserid(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
    </div>

  );
    

}
export default Login;