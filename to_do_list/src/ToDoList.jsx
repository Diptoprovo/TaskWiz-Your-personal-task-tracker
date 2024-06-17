import React, {useState, useEffect} from "react";


function ToDoList(){
    const [tasks, setTask ] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completed, completeTask] = useState([]);

    useEffect(() => {
        let tasklist = localStorage.getItem("tasks")
        let completedList = localStorage.getItem("completed")
        if(tasklist) {
            setTask(JSON.parse(tasklist))
        }
        if(completedList){
            completeTask(JSON.parse(completedList))
        }
    }, [])

    function addTask(){
        if(newTask.trim() !== ""){
            localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
            console.log([[...tasks, newTask]])
            setTask(t => [...t, newTask])
            setNewTask("")
        }

        
    }

    function removeTask(index){
        localStorage.setItem("tasks", JSON.stringify(tasks.filter((_,i) => index != i)))
        setTask(t => (t.filter((_,i) => index != i)))
        console.log(tasks.filter((_,i) => index != i));
    }

    function newTaskDetails(event){
        setNewTask(event.target.value)
    }

    function moveUp(index){
        if(index>0){
            const updatedTasks = [...tasks]
            const t = updatedTasks[index]
            updatedTasks[index] = updatedTasks[index-1]
            updatedTasks[index-1] = t
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            setTask(updatedTasks)
        }
    }

    function moveDown(index){
        if(index<tasks.length-1){
            const updatedTasks = [...tasks]
            const t = updatedTasks[index]
            updatedTasks[index] = updatedTasks[index+1]
            updatedTasks[index+1] = t
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            setTask(updatedTasks)
        }
    }

    function taskDone(index){
        let updatedTasks = completed
        if(completed.length > 2){
            updatedTasks = completed.slice(0,-1)
        }
        localStorage.setItem("completed", JSON.stringify([tasks[index], ...updatedTasks]))
        completeTask([tasks[index], ...updatedTasks])
        removeTask(index)
        console.log(completed)
    }


    return(<>
        
        <div className="to-do-list">
            
            <h1>To-Do List: </h1>
            <div className="new-task">
                <input type="text" value={newTask} onChange={newTaskDetails} placeholder="Enter a task"/>
                <button onClick={addTask} >add</button>
            </div>
            <div>
                <ol className="list">
                    {tasks.map((task, index) => 
                        <li key={index} className="element">
                            <span className="text">
                            {task}
                            </span>
                            <button onClick={() => taskDone(index)} className="comp-btn">Complete</button>
                            <button onClick={() => removeTask(index)} className="delete-btn">Delete</button>
                            <button onClick={() => moveUp(index)} className="move-btn">👆</button>
                            <button onClick={() => moveDown(index)} className="move-btn">👇</button>
                        </li>)}
                </ol>
            </div>
            <h3>Recently completed: </h3>
            <div>
            <ul className="list clist">
            {completed.map((task, index) => 
                    <li key={index} className="element">
                        <span className="text">
                        {task}
                        </span>
                    </li>)}
            </ul>
            </div>
        </div>
        </>
    )
}

export default ToDoList