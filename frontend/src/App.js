import React , { Fragment } from "react";

import "./App.css";
import "./styles/running.css"


import Login from "./componenets/Login";
import Home from "./componenets/Home";
import Root from "./componenets/Root";
import Register from "./componenets/Register";
import Courseinfo from "./componenets/Courseinfo";
import Instructor from "./componenets/Instructor";
import Running from "./componenets/running";
import Deptcourse from "./componenets/dept";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";


function App(){


    return (
    
    <div className="container">
        
    <BrowserRouter>
        <Routes>
            <Route exact path={"/"} element={<Root />} />
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path={"/home/registration"} element={<Register />} />
            <Route exact path={"/course/:course_id"} element={<Courseinfo />} />
            <Route exact path={"/instructor/:instructor_id"} element={<Instructor />} />
            <Route exact path={"/course/running"} element={<Running/>}/>
            <Route exact path={"/course/running/:dept_name"} element={<Deptcourse/>}/>
            {/* <Route exact path={"/instructor"} element={<Instructor />} /> */}
        </Routes>
    </BrowserRouter>
        

        </div>
       
   
    );
}


export default App;