import axios from 'axios';
import React,{useEffect, useState} from 'react' 
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const Courseinfo=()=> {
    const[courses,setCourses]=useState("");
    const[prereq,setPrereq]=useState("");
    const[instructor,setInstructor]=useState("");
    const[isempty,setIsempty]=useState("");
    // }
    const navigate = useNavigate();
    const {course_id} = useParams();
    // console.log(course_id);
    

    useEffect(()=>{
        const fetchData= async()=>{
            axios.get('http://localhost:5000/course/'+course_id).then((response)=>{
        console.log(response.data);
        if(response.data=="cantaccess"){
            return (navigate('/login',{replace:"true"}));
        }
        if(response.data.courses.length>0){
            setIsempty(prevIsempty=>{
                return(1);
            })

        }
        else{
            setIsempty(prevIsempty=>{
                return("");
            })
        }
        // console.log(response.data.courses);
        setCourses(prevCourses=>{
            return (response.data.courses);
        });
        setPrereq(prevPrereq=>{
            return(response.data.prereq);
        })
        setInstructor(prevInstructor=>{
            return(response.data.instructor);
        })

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
            {courses.length?
            <div>
            {
            courses.length?
        <div>   
            <div style={{float:"right"}}>
         <button onClick={handleLogout} align="right">Logout</button>
         </div>
        {/* <p>okkk</p> */}
        <table style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>Course ID</th>
                    <th style={{ border: "1px solid black" }}>Course Name</th>
                    <th style={{ border: "1px solid black" }}>Credits</th>
                   
                </tr>
            </thead>
            <tbody>
                {courses.map(item=>(
                    <tr>
                        <td style={{ border: "1px solid black" }}>{item.course_id}</td>
                        <td style={{ border: "1px solid black" }}>{item.title}</td>
                        <td style={{ border: "1px solid black" }}>{item.credits}</td>
                        {/* <button onClick={() => handleDrop(item.course_id)}>Register</button> */}
                    </tr>

                ))}

            </tbody>




        </table>
        </div>: <div> There is no such course</div>

                } 

{
            prereq.length?
        <div>   
        {/* <p>okkk</p> */}
        <table style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>Prereq Id</th>
                    <th style={{ border: "1px solid black" }}>Prereq Name</th>
                    {/* <th style={{ border: "1px solid black" }}>Credits</th>
                    <th style={{ border: "1px solid black" }}>Building</th>
                    <th style={{ border: "1px solid black" }}>room_number</th> */}
                </tr>
            </thead>
            <tbody>
                {prereq.map(item=>(
                    <tr>
                        <td style={{ border: "1px solid black" }}><a href={"/course/"+item.prereq_id}>{item.prereq_id}</a></td>
                        <td style={{ border: "1px solid black" }}>{item.title}</td>
                        {/* <td style={{ border: "1px solid black" }}>{item.credits}</td>
                        <td style={{ border: "1px solid black" }}>{item.building}</td>
                        <td style={{ border: "1px solid black" }}>{item.room_number}</td> */}
                        {/* <button onClick={() => handleDrop(item.course_id)}>Register</button> */}
                    </tr>

                ))}

            </tbody>
        </table>
        </div>: <div> There are no prereq for this course</div>
                } 

                {
            instructor.length?
        <div>   
        {/* <p>okkk</p> */}
        <table style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>Instructor ID</th>
                    <th style={{ border: "1px solid black" }}>Instructor Name</th>
                    {/* <th style={{ border: "1px solid black" }}>Credits</th>
                    <th style={{ border: "1px solid black" }}>Building</th>
                    <th style={{ border: "1px solid black" }}>room_number</th> */}
                </tr>
            </thead>
            <tbody>
                {instructor.map(item=>(
                    <tr>
                        <td style={{ border: "1px solid black" }}>{item.id}</td>
                        <td style={{ border: "1px solid black" }}><a href={"/instructor/"+item.id}>{item.name}</a></td>
                        {/* <td style={{ border: "1px solid black" }}>{item.credits}</td>
                        <td style={{ border: "1px solid black" }}>{item.building}</td>
                        <td style={{ border: "1px solid black" }}>{item.room_number}</td> */}
                        {/* <button onClick={() => handleDrop(item.course_id)}>Register</button> */}
                    </tr>

                ))}

            </tbody>




        </table>
        </div>: <div> This course is not offered in current semester</div>

                } 



</div>:<div><h2 align="center"> There exists no such course</h2></div>
            }  
           
	</div>
    )
}
export default Courseinfo 