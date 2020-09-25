import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

const Exercise = ({exercises})=>{ 
    const name = useParams().name
    const e = exercises.find(e=>e.name===name)
    return e ? 
    (
        <div class="exerciseInstruction">
            <h2>{e.name}</h2>
            <img src={`http://localhost:3000/${e.img}`} alt="image"/> 
            <h3>TIPS</h3>
            <ul>
                {e.tips.map(t=><li>{t}</li>)}
            </ul>
            <iframe width="420" height="315" title={e.name}
                src={`https://www.youtube.com/embed/${e.youtube_id}`}>
            </iframe> 
        </div>
    ) 
    :
    <Redirect to="/" />
}

export default Exercise