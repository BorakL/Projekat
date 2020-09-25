import React from 'react'
import {Link, useParams} from 'react-router-dom'

const Exercises = ({exercises})=>{
    const group = useParams().group 
    var result = exercises.filter(e=>e.target_muscle.toLowerCase()===group).length===0 ?
                exercises.filter(e=>e.equipment.toLowerCase()===group) :
                exercises.filter(e=>e.target_muscle.toLowerCase()===group)

    return(
        <div className="exercises">
        {result.map(e =>
            
            <Link to={`/${e.target_muscle}/${e.name}`}> 
                <div key={e.name} className="exercise">
                    <h3>{e.name}</h3>
                <img src={e.img} alt="" /> 
                </div>
            </Link>
            
        )}
        </div>
    )
}

export default Exercises