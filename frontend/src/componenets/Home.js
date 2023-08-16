import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useRouter } from 'next/router';


const Home = () => {
    const[isuser,setIsuser] = useState(false);
    const [datas,setDatas] = useState(null);
    const [psdatas,setPsdatas] = useState(null);
    const [csdatas,setCsdatas] = useState(null);
    const[selectedValue,setSelectedValue]=useState(null);
    const[error,setError] = useState(null);
    const[data,setData] = useState(null);
    const[loginuser, setLoginuser] = useState(null);
    const navigate = useNavigate();
    const a = axios.get("http://localhost:5000/home").then((response) =>{

        console.log(response.data[0]);

    if(response.data[0]==='cantaccess'){
        return <p> You do not have access</p>;
       
    }
        if(response.data[0]==='instructor'){
            console.log("instructor homepate");
            return (navigate('/instructor/'+response.data[1]),{replace:"true"})
        }
        if(response.data.userexist){
            setIsuser(true);
            setLoginuser(true);
        }
        else{
            alert("you are not logged in ");
            return (navigate('/login'),{replace:"true"});
        }
        setDatas(prevDatas=>{
            return response.data.info;
        });
        setPsdatas(prevPsdatas=>{
            return response.data.prevsem;
        });
        setCsdatas(prevCsdatas=>{
            return response.data.cursem;
        });
        console.log(datas);
    console.log("after getting rresponse");}
    ).catch((error)=>{
        console.log("caught an error");
        setError(error);
        console.log(error);
    });

    console.log("asdfsdf");
    console.log(datas);
const handleLogout = async() => {
    const d = axios.get("http://localhost:5000/logout").then((response) =>{
        if(response.data[0]==="successful"){
            console.log(response.data[0]);
            // setIsuser(prevIsuser=>{
            //     // console.log(prevCsdatas);
            //     return false;
            // });
            setIsuser(false);
        return (navigate('/login',{replace:"true"}));}
    })
}

const handleDelete=async(course_id)=>{
        try{
            console.log(course_id);
            const b = axios.get('http://localhost:5000/home/'+String(course_id)).then((response)=>{
                console.log("deelte after getting rresponse  2");
                if(response.data[0]==='cantaccess'){
            // alert("You are not logged in.Please login");
              return (navigate('/login'),{replace:"true"});
                }
                if(response.data[0]==='instructor'){
                    console.log("instructor homepate");
                    return (navigate('/instructor/'+response.data[1]),{replace:"true"})
                }
                setDatas(prevDatas=>{
                    // console.log(prevDatas);
                    return response.data.info;
                });
                setPsdatas(prevPsdatas=>{
                    // console.log(prevPsdatas);
                    return response.data.prevsem;
                });
                setCsdatas(prevCsdatas=>{
                    // console.log(prevCsdatas);
                    return response.data.cursem;
                });
            }).catch((err)=>{
                console.log(err);
            });
            // setCourses(result.data);
        } catch(error){console.log(error);}
    
};

    

        if(!isuser){
            navigate('you have no access');
        }

        // },[])
        // return(

        //     );
    // if(!isuser){
    //     navigate('\login');
    // }

    // if(!loginuser){
    //     return <p>You are not authorized to view this</p>
    // }

    if (error || !isuser) {
        console.log(error);
        console.log(isuser);
        return <p>Loading...</p>;
        // return(navigate('/login', {replace: true}));
    }
    const onRegisterForm = () => {
        return(navigate('/home/registration', {replace: true}));
    }
    return (
       
        <div>
             <div style={{float:"right"}}>
         <button onClick={handleLogout} align="right">Logout</button>
         </div>
            <div align='center'>
            <h1>Student info</h1>
            <p>ID: {datas.id}</p>
            <p>Name: {datas.name}</p>
            <p>Department: {datas.dept_name}</p>
            <p>Total Credits: {datas.tot_cred}</p>
            </div>
            { 
                csdatas.length?
            <div>
            <h2>Current Semester: {csdatas[0].semester} {csdatas[0].year}</h2>
            <table style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>Course ID</th>
                    <th style={{ border: "1px solid black" }}>Section</th>
                    <th style={{ border: "1px solid black" }}>Grade</th>
                    <th style={{ border: "1px solid black" }}>Drop</th>

                </tr>
                </thead>
                <tbody>
                    {csdatas.map(item => (
                        <tr key={item.course_id}>
                            <td style={{ border: "1px solid black" }}>{item.course_id}</td>
                            <td style={{ border: "1px solid black" }}>{item.sec_id}</td>
                            <td style={{ border: "1px solid black" }}>{item.grade}</td>
                            <td>
                            <button onClick={() => handleDelete(item.course_id)}>Drop</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>: <div> <h1>You have not registered any courses yet </h1> </div>
            }

            {/* <form style={{ color: 'black'}} onSubmit={onRegisterForm}> */}
            {/* <p></p> */}
            <div align="center">
            <button onClick={onRegisterForm} type="submit" >Register</button>
            </div>
            {/* </form> */}
            {[...new Set(psdatas.map(course_id => course_id.year))].map(year => {
            const semesters = [...new Set(psdatas.filter(course_id => course_id.year === year).map(course_id => course_id.semester))];
            const semesterMap = {
                'Spring': 1,
                'Summer': 2,
                'Fall': 3,
                'Winter': 4,
            };
            const sortedSemesters = semesters.sort((a, b) => semesterMap[b] - semesterMap[a]);
            
            return (
                <div key={year}>
                <h2>{year}</h2>
                {sortedSemesters.map(semester => (
                    <table key={semester} style={{ borderCollapse: "collapse", marginBottom: "1em" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black" }}>Semester</th>
                            <th style={{ border: "1px solid black" }}>Course ID</th>
                            <th style={{ border: "1px solid black" }}>Section</th>
                            <th style={{ border: "1px solid black" }}>Grade</th>
                        </tr>
                    </thead>

                    <tbody>
                        {psdatas.filter(course_id => course_id.year === year && course_id.semester === semester).map(course => (
                            <tr key={psdatas.course_id}>
                                <td style={{ border: "1px solid black" }}>{course.semester}</td>
                                <td style={{ border: "1px solid black" }}>{course.course_id}</td>
                                <td style={{ border: "1px solid black" }}>{course.sec_id}</td>
                                <td style={{ border: "1px solid black" }}>{course.grade}</td>
                                
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

export default Home
