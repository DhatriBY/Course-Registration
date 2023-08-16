import React, { Fragment,useState } from "react";



const Inputdata = () => {


    const[userid,setUserid]=useState("");
    const[password,setPassword]=useState("");
    const[linkedata,setLinkedata] = useState("");
    const OnLoginForm = async e => {
        // e.preventDefault();
        try{
            // const info = {userid:userid,password:password};
            // setLinkedata([info]);
            const info = {userid};
            console.log("vaishanvi");
            console.log (info);
            console.log(JSON.stringify(info));
            const response = await fetch("http://localhost:5000/login",{
                method: "POST",
                // headers: {"Content-Type":"application/json"},
                // body: JSON.stringify(info)

        });
            console.log("vaishanvi");
            const dat = await response.json();
            
            console.log(dat);
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center
            mt-5">todolist</h1>
            <form className = "d-flex" onSubmit={OnLoginForm}>
                <input 
                    type = "text" 
                    className="form-control" 
                    value={userid}
                    onChange={e => setUserid(e.target.value)}
                />
                <input 
                    type = "text" 
                    className="form-control" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className= "btn btn-success">Login</button>
            </form>
        </Fragment>
    );

};
export default Inputdata;