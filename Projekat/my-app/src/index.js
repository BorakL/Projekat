import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getAllExercises, getAllWorkouts } from './services';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Workouts from './components/Workouts'
import Home from './components/Home'
import Nav from './components/Nav'
import Exercises from './components/Exercises'
import Footer from './components/Footer'
import Exercise from './components/Exercise'
import Search from './components/Search';
import MakeWorkout from './components/MakeWorkout.jsx'
import Header from './components/Header';

const App = ()=>{
  const[exercises,setExecrises]=useState([])
  const[workouts,setWorkouts]=useState([])

  useEffect(()=>{
    getAllExercises().then(res=>{setExecrises(res.data)});
    getAllWorkouts().then(res=>{setWorkouts(res.data)})
  },[])
 
  

  return(
  <>
  <Router>
    <Header />
    <Nav />
    <div className="wrapper">
    <Switch>
      <Route exact path="/">
        <Home workouts={workouts}/>
      </Route>
      <Route path="/exercises">
        <Search/>
      </Route>
      <Route path="/workouts">
        <Workouts workouts={workouts}/> 
      </Route>
      <Route path="/makeWorkout">
        <MakeWorkout exercises={exercises}/>
      </Route>
      <Route path="/:group">
        <Exercises  exercises={exercises}/>
        <Route exact path="/:group/:name">
          <Exercise  exercises={exercises}/>
        </Route>
      </Route>      
    </Switch>
    </div>
    <Footer/>
  </Router>
  </>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
