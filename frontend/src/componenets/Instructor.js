import React, { useState, useEffect, Fragment } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Instructor = () => {
    const [datas,setDatas] = useState(null);
    const [psdatas,setPsdatas] = useState(null);
    const [csdatas,setCsdatas] = useState(null);
    const {instructor_id} = useParams();
    const navigate = useNavigate();
    const a = axios.get("http://localhost:5000/instructor/"+instructor_id).then((response) =>{
        console.log(response.data);
        if(response.data=="cantaccess"){
            return (navigate('/login',{replace:"true"}));
        }
        setDatas(prevDatas=>{
            console.log(prevDatas);
            return response.data.info;
        });
        setPsdatas(prevPsdatas=>{
            console.log(prevPsdatas);
            return response.data.prevsem;
        });
        setCsdatas(prevCsdatas=>{
            console.log(prevCsdatas);
            return response.data.cursem;
        });
    console.log("after getting rresponse");

    }).catch((error)=>{
        console.log("caught an error");
        console.log(error);
    });


    if (!datas) {
        return <p>Loading...</p>;
    }
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
    
    return (
       
        <div>
            <div>
            <div style={{float:"right"}}>
         <button onClick={handleLogout} align="right">Logout</button>
         </div>
            <p>ID: {datas.id}</p>
            <p>Name: {datas.name}</p>
            <p>Department: {datas.dept_name}</p>
            </div>
            {
                csdatas.length?
            <div>
            <h2>Current Semester: {csdatas[0].semester} {csdatas[0].year}</h2>
            <table style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>Course ID</th>
                    <th style={{ border: "1px solid black" }}>Title</th>
                </tr>
                </thead>
                <tbody>
                    {csdatas.map(item => (
                        <tr key={item.id}>
                            <td style={{ border: "1px solid black" }}><a href={"/course/"+item.course_id}>{item.course_id}</a></td>
                            <td style={{ border: "1px solid black" }}>{item.title}</td>

                        {/* <button onClick={() => handleDrop(item.id)}>Drop</button> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div> : <div> <p> No courses taken in current semester </p> </div>}
            {[...new Set(psdatas.map(course_id => course_id.year))].map(year => {
            const semesters = [...new Set(psdatas.filter(course_id => course_id.year === year).map(course_id => course_id.semester))];
            return (
                <div key={year}>
                <h2>{year}</h2>
                {semesters.map(semester => (
                    <table key={semester} style={{ borderCollapse: "collapse", marginBottom: "1em" }}>
                    <thead>
                        <tr>
                           
                            <th style={{ border: "1px solid black" }}>Course ID</th>
                            <th style={{ border: "1px solid black" }}>Title</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {psdatas.filter(course_id => course_id.year === year && course_id.semester === semester).map(course => (
                            <tr key={psdatas.course_id}>
                               
                                <td style={{ border: "1px solid black" }}><a href={"/course/"+course.course_id}>{course.course_id}</a></td>
                                <td style={{ border: "1px solid black" }}>{course.title}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                    </table>
                ))}
                </div>
            );
            })}
        </div>
    )
}

export default Instructor
