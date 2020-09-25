import React from 'react'

const Workouts = ({workouts})=>{
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