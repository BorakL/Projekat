import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Search = ()=>{

    const muscless = ["chest","back","abs","biceps","triceps","shoulders","legs"]
    const equipment = ["dumbbell","cable","bar","machine","bodyweight"]
    const[imgPath,setImgPath] = useState("human")

    return( 
        <div className="search">
        <h3 className="title">Exercises by muscle group</h3>
        <section className="by-muscle"> 
            <div className="meni">   
                <ul>
                    {muscless.map(m => 
                    <li onMouseOver={()=>setImgPath(m)} onMouseLeave={()=>setImgPath("human")}>
                        <Link to={`/${m}`}>{m.toUpperCase()}</Link>
                    </li>
                    )}
                </ul> 
            </div>
            <div className="image">
                <img src={`img/muscless/${imgPath}.png`}/>
            </div>
           
        </section>
        <h3 className="title">Exercises by equipment</h3>
        <section className="by-equipment">    
            <div className="meni">
                {equipment.map(e=>
                    <div className="equipment">
                        <Link to={`/${e}`}>
                        <p>{e.toUpperCase()}</p>
                        <img src={`img/equipment/${e}.png`} alt="image"/>    
                        </Link>
                    </div>
                )}
            </div>
        </section>
        </div>
    )
}

export default Search