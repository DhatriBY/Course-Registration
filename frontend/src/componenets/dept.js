import React,{useState,useEffect} from 'react' 
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'


const Deptcourse=()=> {
    // const navigate = useNavigate();
    // console.log(useParams().dept_name);
    const dept = useParams().dept_name;
    const[courses,setCourses]=useState("");
    console.log(dept);
    const navigate = useNavigate();
    useEffect(()=>{
        // console.log(dept);
        const fetchData= async()=>{
            axios.get('http://localhost:5000/courses/'+dept).then((response)=>{
        console.log(response.data);
            if(response.data=="cantaccess"){
            return (navigate('/login',{replace:"true"}));
        }
        // console.log(response.data.courses);
        setCourses(prevCourses=>{
            return (response.data);
        });
       

    })

        };
        fetchData();
    },[]);
    
    const handleLogout = async() => {
        const d = axios.get("http://localhost:5000/logout").then((response) =>{
            if(response.data[0]==="successful"){
                console.log(response.data[0]);
                // setIsuser(prevIsuser=>{
                //     // console.log(prevCsdatas);
                //     return false;
                // });
                // setIsuser(false);
            return (navigate('/login',{replace:"true"}));}
        })
    }
    return(
        <div>
          {
            courses?
        <div>   
            <div style={{float:"right"}}>
         <button onClick={handleLogout} align="right">Logout</button>
         </div>
        {/* <p>okkk</p> */}
        <table style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>Course Id</th>
                    <th style={{ border: "1px solid black" }}>Course Name</th>
                    {/* <th style={{ border: "1px solid black" }}>Dept Name</th> */}
                    {/* <th style={{ border: "1px solid black" }}>Register</th> */}
                </tr>
            </thead>
            <tbody>
                {courses.map(item=>(
                    <tr>
                        <td style={{ border: "1px solid black" }}><a href={"/course/"+item.course_id+"/"}>{item.course_id}</a></td>
                        <td style={{ border: "1px solid black" }}>{item.title}</td>
                        {/* <td style={{ border: "1px solid black" }}>{item.dept_name}</td> */}
                        {/* <button onClick={() => handleDrop(item.course_id)}>Register</button> */}
                    </tr>

                ))}

            </tbody>




        </table>
        </div>: <div> Loading...</div>

                } 
	</div>
    )
}
export default Deptcourse