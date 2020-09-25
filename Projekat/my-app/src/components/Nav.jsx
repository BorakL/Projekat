import React from 'react'
import {Link} from 'react-router-dom'

const Nav = ()=>{
    return(
      <nav className="navigation">
        <ul>
          <li><Link to="/"> Home </Link></li>
          <li><Link to="/exercises"> Exercises </Link></li>
          <li><Link to="/workouts"> Workouts </Link></li>
          <li><Link to="/makeWorkout">MakeWorkout</Link></li>
        </ul>
      </nav>
    )
}

export default Nav