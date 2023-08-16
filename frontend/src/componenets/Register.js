import axios from 'axios';
import React,{Fragment, useEffect, useState} from 'react' 
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';

const Register=()=> {
    const navigate = useNavigate();
    const[selectedValue,setSelectedValue]=useState({});
    const[courses,setCourses]=useState("");
    const[section,setSection]=useState("");
    const [searchTerm, setSearchTerm] = useState("");
    
    //it is used to fetch data once when reloaded
    useEffect(()=>{
        const fetchData = async()=>{ 
        axios.get("http://localhost:5000/register",{headers:{'Content-Type':'application/json'}, withCredentials: true}).then((response)=>{
            console.log("ok response")
            console.log(response.data);
            if(response.data[0]==="cantaccess"){
                return(navigate('/login',{replace:"true"}));
            }
            if(response.data[0]==="instructor"){
                 return (navigate('/instructor/'+response.data[1]),{replace:"true"});
            }
            console.log(response)
        setCourses(prevCourses=>{
            console.log(prevCourses);
            console.log("response data is below");
            console.log(response.data);
            return response.data.course;

        });
        setSection(prevSection=>{
            return response.data.section;
        })
      }).catch((error)=>{
        console.log("caught an error");

        console.log(error);
        return(navigate('/',{replace:true}));
      }
    )};
    fetchData();
    },[]);

    // it is used to search for the term in the 
    const handleSearch=async()=>{
        try{
            console.log(searchTerm);
            console.log("sending to searcg");
            await axios.get('http://localhost:5000/register/'+searchTerm).then((response)=>{
                console.log(response.data);   
            
            if(response.data[0]==="cantaccess"){
                    return(navigate('/login',{replace:"true"}));
                }
                if(response.data[0]==="instructor"){
                     return (navigate('/instructor/'+response.data[1]),{replace:"true"});
                }
                setCourses(prevCourses=>{

                                console.log(prevCourses);
                                return response.data.course;
                    
                            });
                            console.log(courses)
                            setSection(prevSection=>{
                                return response.data.section;
                            })

            }).catch((err)=>{
                console.log(err);
            });
        } catch(error){console.log(error);}
    };
    


            const handleDrop=async(section_id,course_id)=>{
                try{
                    console.log(course_id);
                    console.log(section_id[course_id])
                    if(section_id[course_id]===undefined){
                        alert("choose a section")
                    }
                    else{
                    await axios.get('http://localhost:5000/register/'+course_id+'/'+section_id[course_id]).then((response)=>{
                        // if(response.data)
                        // if()
                        if(response.data==="successful"){alert("registration succesful"); window.location.reload();}
                        else{alert(response.data)}
                    }).catch((err)=>{
                        console.log(err);
                    });
                }
                    // setCourses(result.data);
                } catch(error){console.log(error);}
            
        };

        const handleChange = (courseId) => (e) => {
            // let updatedValue = {};
            // updatedValue = {"item1":"juice"};
            setSelectedValue(prevSelectedValue=>({ ...prevSelectedValue, [courseId]: e.target.value }));
          };
    const handleLogout = async() => {
            const d = axios.get("http://localhost:5000/logout").then((response) =>{
                if(response.data[0]==="successful"){
                    console.log(response.data[0]);

                return (navigate('/login',{replace:"true"}));}
            })
    }
   
    return(
        
       <div>
        <div align="center">
            <div style={{float:"right"}}>
         <button onClick={handleLogout} align="right">Logout</button>
         </div>
                <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      </div>
       {
            courses?
        <div>   
        <table style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>Course ID</th>
                    <th style={{ border: "1px solid black" }}>Course Name</th>
                    <th style={{ border: "1px solid black" }}>Dept Name</th>
                    <th style={{ border: "1px solid black" }}>Section</th>
                    <th style={{ border: "1px solid black" }}>Register</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(item=>(
                    
                    <tr key={item.course_id}>
                        <td style={{ border: "1px solid black" }}>{item.course_id}</td>
                        <td style={{ border: "1px solid black" }}>{item.title}</td>
                        <td style={{ border: "1px solid black" }}>{item.dept_name}</td>
                        {/* <td style={{ border: "1px solid black" }}><select value="section">
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            </select></td> */}
                            <td>
                                { item.course_id &&
                                <select value={selectedValue[item.course_id]} onChange={handleChange(item.course_id)}>
                                <option value="">Select an option</option> 
                            {section[item.course_id].map((newitem,index)=>(
                                // <option key={newitem[0]} value={newitem[]}
                                <option key={index} value={newitem}>{"S"+newitem}</option>
                            
                            ))}
                            </select>
}
                            </td>
                       
                        <button  onClick={() => handleDrop(selectedValue,item.course_id)}>Register</button>

                    </tr>

                ))}

            </tbody>




        </table>
        </div>: <div> Loading...</div>

                } 

              
        </div>
        
    )

}
export default Register 