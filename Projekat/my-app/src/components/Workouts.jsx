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
        <div className="workoutList">
        {workouts.map(w => 
            <div key={w.id} className="workout">
                <h3>{w.title}</h3>
                <img src={w.img} title={w.name} alt="vezba"/> 
                
                <p>{w.description}</p>
                <table>
                    <tr><th>Exercise Name</th><th>Sets</th><th>Reps</th><th></th></tr>
                    {console.log(w.workout)}
                    {w.workout.map(exercise =>
                    <tr> 
                        <td>{exercise.exercise}</td> 
                        <td>{exercise.sets}</td> 
                        <td>{exercise.reps}</td>
                    </tr>
                    )}
                    
                </table>

                <br/>  
                <hr/>
            </div>
        )}
        </div>
    )
}

export default Workouts