import React from 'react'
import { useState,useEffect } from 'react'
import {getAllWorkouts} from '../services'

const Workouts = ()=>{
    const[workouts,setWorkouts]=useState([])

    useEffect(()=>{
        getAllWorkouts().then(res=>setWorkouts(res.data))
    },[])

    console.log(workouts)


    return(
        <>
         
        {workouts.map(w => 
            <div key={w.id}>
                <img src={w.img} title={w.name} alt="vezba"/>
                <p>{w.title}</p>
            </div>
        )}
        </>
    )
}

export default Workouts