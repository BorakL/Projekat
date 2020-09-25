import axios from 'axios'

export const getAllExercises = ()=>{
    return axios.get("http://localhost:3004/exercises")
}

export const getAllWorkouts = ()=>{
    return axios.get("http://localhost:3004/workouts")
}

export const postWorkout = (workout)=>{
    return axios.post("http://localhost:3004/workouts", workout)
}