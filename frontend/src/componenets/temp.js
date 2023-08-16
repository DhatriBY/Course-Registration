import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
    // let { id } = useParams();
    const [datainf, setDatainf] = useState(null);
    const [data,setData] = useState(null);
    const [pastc, setPastc] = useState(null);
    const [currc, setCurrc] = useState(null);
    const [error, setError] = useState(null);
    const id ='sdf';
    useEffect(() => {
        (async () => {
            try {
                
                let res = await fetch('http://localhost:5000/home', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id }),
                });
                let result = await res.json();
                console.log(result);
                // const a = result.past_courses;
                // console.log({a});
                setData(result);
                setDatainf(result.inf);
                setPastc(result.past_courses);
                setCurrc(result.current_courses);
                console.log(data);
                
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [id]);

 
    if (error) {
        return (
            <p>
                An error occurred ({error.message})
                Kindly reload the page!
            </p>
        );
    }

    // if (!datainf) {
    //     return <p>Loading...</p>;
    // }
    if(data){
    return (
        <div>
            <p>ID: {datainf.id}</p>
            <p>Name: {datainf.name}</p>
            <p>Department: {datainf.dept_name}</p>
            <p>Total Credits: {datainf.tot_cred}</p>
            
            
        </div>
    );}
};

export default Home
