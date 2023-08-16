
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    // React.useEffect(() => {
    // fetch("/login")
    //   .then((res) => res.json())
    //   .then((data) => setData(data.message));
    // }, []);
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("ji");
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

    }
    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/home">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>

                </section>
            )}
        </>
    )
}

export default Login

// import React, {useState} from "react";
// import { ReactDOM } from "react-dom";
// import "./Login.css";


// function Login() {
// //   const [data, setData] = React.useState(null);
//   const [errorMessages, setErrorMessages] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const errors = {
//     uname: "invalid username",
//     pass: "invalid password"
//   };
//   const database = [
//     {
//       username: "user1",
//       password: "pass1"
//     },
//     {
//       username: "user2",
//       password: "pass2"
//     }
//   ];
//   const handleSubmit = (event) => {
//     //Prevent page reload
//     event.preventDefault();

//     var { uname, pass } = document.forms[0];

//     // Find user login info
//     const userData = database.find((user) => user.username === uname.value);

//     // Compare user info
//     if (userData) {
//       if (userData.password !== pass.value) {
//         // Invalid password
//         setErrorMessages({ name: "pass", message: errors.pass });
//       } else {
//         setIsSubmitted(true);
//       } 
//     } else {
//         // Username not found
//         setErrorMessages({ name: "uname", message: errors.uname });
//       }
//     };
//     const renderErrorMessage = (name) =>
//     name === errorMessages.name && (
//       <div className="error">{errorMessages.message}</div>
//     );
//   
//   const renderForm = (
//     <div className="form">
//       <form onSubmit={handleSubmit}>
//         <div className="input-container">
//           <label>Username </label>
//           <input type="text" name="uname" required />
//           {renderErrorMessage("uname")}
//         </div>
//         <div className="input-container">
//           <label>Password </label>
//           <input type="password" name="pass" required />
//           {renderErrorMessage("pass")}
//         </div>
//         <div className="button-container">
//           <input type="submit" />
//         </div>
//       </form>
//     </div>
//   );

//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>{!data ? "Loading..." : data}</p>
//   //     </header>
//   //   </div>
//   // );

//   return (
//     <div className="app">
//       <div className="login-form">
//         <div className="title">Sign In</div>
//         {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//       </div>
//     </div>
//   );
// }


// export default Login;




























// // import './App.css';
// // import React, { useState, useEffect } from "react";
// // import { BrowserRouter, Route, Switch } from 'react-router-dom';
// // import Dashboard from 'components/Dashboard/Dashboard';
// // import Preferences from 'components/Preferences/Preferences';

// // function App() {
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     fetch("http://localhost:3000/message")
// //       .then((res) => res.json())
// //       .then((data) => setMessage(data.message));
// //   }, []);

// //   return (
// //     <div className="App">
// //       <h1>Application</h1>
// //       <BrowserRouter>
// //         <Switch>
// //           <Route path="/dashboard">
// //             <Dashboard />
// //           </Route>
// //           <Route path="/preferences">
// //             <Preferences />
// //           </Route>
// //         </Switch>
// //       </BrowserRouter>
// //     </div>

// //   );
// // }

// // export default App


      


import React, { Fragment,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Login(){

    const[userid,setUserid]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();
    const OnLoginForm = async(e) => {
        e.preventDefault()
        const  = await fetch("http://localhost:5000/login", {
            method: 'POST',
            credentials : 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid, password })
          });
          const data1 = await response.json();
          console.log(data1.data);
        //   console.log(data)
          if(data1.data=="successful")

             return(navigate('/home', {replace: true}));
           else {
            alert('Login failed. Please try again.');
          }
    };
    return (
        <form onSubmit={OnLoginForm}>
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
  );
    

}
export default Login;