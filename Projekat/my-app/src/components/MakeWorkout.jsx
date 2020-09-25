import React,{useState} from 'react'
import { useEffect } from 'react'
import { postWorkout } from '../services'

const MakeWorkout = ({exercises})=>{

    const[title,setTitle]=useState("")
    const[autor,setAutor]=useState("")
    const[workoutLevel,setWorkoutLevel]=useState("begginer")
    const[description,setDescription]=useState("")
    const[img,setImg]=useState("")
    const[muscleGroups,setMusclGroups]=useState(new Array(7).fill(false))
    const[targetMuscles,setTargetMuscles]=useState([])
    const[exercise,setExercise]=useState("")
    const[filteredExercises,setFilteredExercises]=useState([])
    const[imgPath,setImgPath]=useState("")
    const[sets,setSets]=useState("4")
    const[reps,setReps]=useState("10")
    const[changedSets,setChangedSets]=useState(0)
    const[changedReps,setChangedReps]=useState(0)
    const[workout,setWorkout]=useState([])
    

    //Filtriranje vežbi po odabiru mišića prilikom promene u checkbox-ovima
    useEffect(()=>{
        let result = exercises.filter(e=>targetMuscles.map(t=>t.toLowerCase()).includes(e.target_muscle.toLowerCase()))
        setFilteredExercises(result)
    },[targetMuscles])


    const muscles = ["chest","back","biceps","triceps","shoulders","legs","abs"]

    //Dodavanje mišića u checkbox za filtriranje vežbi
    const addMuscle = (m)=>{
        let tmp = [...muscleGroups]
        tmp[m] = (!tmp[m])
        setMusclGroups(tmp)
        let result = []
        tmp.forEach((t,i)=>{if(t)result.push(muscles[i])})
        setTargetMuscles(result)
    }

    //Validacija
    const exerciseFormValid = (exercise)=>{
        if(exercise==""){
            alert("Select Exercise")
            return false
        }
        return true        
    }
    const workoutFormValid = ()=>{
        if(workout.length===0){
             alert("You have not selected any exercises")
            return false
        }
        if(title.trim()===""){
            alert("Title is required")
            return false
        }
        if(autor.trim()===""){
            alert("The author's name is required")
            return false
        }
        return true
    }

    //Promena broja setova i ponavljanja za odabranu vežbu
    const changeExercise = (name,prop,targetValue)=>{
        let tmp=[...workout]
        let index = tmp.findIndex(e => e.exercise==name)
        if(index!==-1){
            if(tmp[index][prop]!==targetValue){
                tmp[index][prop]=targetValue
            }
        }
        setWorkout(tmp)
    }

    //Brisanje prethodno selektovane vežbe iz liste za trening
    const deleteExercise = (name)=>{
        let tmp=[...workout]
        let index = tmp.findIndex(e=>e.exercise==name)
        if(index!==-1){
            tmp.splice(index,1)
        }
        setWorkout(tmp)
    }

    //Dodavanje vežbe na listu za trening
    const addExercise = (exercise,sets,reps)=>{
        if(!exerciseFormValid(exercise,sets,reps))return
        let eObj = {
            "exercise":exercise,
            "sets":sets,
            "reps":reps   
        }
        let tmp=[]
        tmp=[...workout]
        let index = tmp.findIndex(e=>e.exercise==exercise)
        if(index==-1){
            tmp.push(eObj)
            setWorkout(tmp)
        }
        else{
            tmp[index]=eObj
            setWorkout(tmp)
        }
        document.getElementById("exerciseForm").reset()
    }        
    
    //Dodavanje workouta
    const addWorkout = ()=>{
        if(!workoutFormValid())return
        let workoutObj = {
            title: title,
            autor: autor,
            workoutLevel: workoutLevel,
            description: description,
            img: imgPath,
            workout: workout
        }
        postWorkout(workoutObj).then(res=>console.log(res))
        
    }
    
    return(
        <form class="makeWorkout">
            <input type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/><br/>
            <input type="text" placeholder="Autor" onChange={(e)=>setAutor(e.target.value)}/><br/>
    
            <select id="workoutLevel" onChange={(e)=>setWorkoutLevel(e.target.value)}>
                <option value="" selected disabled>Level</option>
                <option value="Begginer">Begginer</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
            <br/>
            <textarea id="description" placeholder="Description" onChange={(e)=>setDescription(e.target.value)}></textarea><br/>

            <input type="text" placeholder="image path" onChange={(e)=>setImg(e.target.value)}/><br/>
            
            <br/><hr/><br/>

            <h4>MUSCLE GROUP</h4>
            {muscles.map((m,i) => 
                <div>
                    <label for={m}>{m.toUpperCase()} </label>
                    <input type="checkbox" id={m} value={i} onChange={(e)=>addMuscle(e.target.value)}/>
                </div> 
                )}

                <br/>
                <h4>EXERCISES</h4>
                <div className="exerciseForm">
                    <form id="exerciseForm">
                        <select id="exerciseInput"  onChange={e=>{    
                            setExercise(e.target.value)
                        }}
                        >
                        <option selected disabled >Choose Muscle Group</option>
                        {filteredExercises.map(e=>
                        <option key={e.name} value={e.name}>
                        {e.name}
                        </option>)}
                        </select>
                        
                        <input type="submit" value ="Select" onClick={e=>{
                            e.preventDefault() 
                            addExercise(exercise,sets,reps)
                            }
                            }/>
                    </form> 
                </div>
                
                <br/>
                <table>
                    <tr><th>Exercise Name</th><th>Sets</th><th>Reps</th><th></th></tr>
                    {workout.map(exercise=>
                    <tr> 
                        <td>{exercise.exercise}</td> 
                        <td>
                            <input type="number" style={{width:"30px"}} defaultValue={exercise.sets} name="sets"
                            onChange={(e)=>changeExercise(exercise.exercise,e.target.name,e.target.value)}/>
                        </td> 
                        <td>
                            <input type="number" style={{width:"30px"}} defaultValue={exercise.reps} name="reps"
                            onChange={(e)=>changeExercise(exercise.exercise,e.target.name,e.target.value)}/>
                        </td>
                        <td>
                            <span onClick={()=>deleteExercise(exercise.exercise)}>Delete</span>
                        </td>
                    </tr>
                    )}
                </table>   

                <input type="submit" value="DONE" onClick={(e)=>{
                    e.preventDefault()
                    addWorkout()
                    }}/>  
        </form>
    )
}

export default MakeWorkout
