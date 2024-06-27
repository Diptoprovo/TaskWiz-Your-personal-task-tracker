import React, { useState, useEffect } from "react";
import { useRef } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import toast, { Toaster } from 'react-hot-toast';


// define "lord-icon" custom element with default properties


function ToDoList() {
    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completed, completeTask] = useState([]);
    const clist = useRef(null);
    defineElement(lottie.loadAnimation);

    useEffect(() => {
        let tasklist = localStorage.getItem("tasks")
        let completedList = localStorage.getItem("completed")
        if (tasklist) {
            setTask(JSON.parse(tasklist))
        }
        if (completedList) {
            completeTask(JSON.parse(completedList))
        }
    }, [])

    function addTask() {
        if (newTask.trim() !== "") {
            localStorage.setItem("tasks", JSON.stringify([newTask, ...tasks]));
            console.log([[newTask, ...tasks]])
            setTask(t => [newTask, ...t])
            setNewTask("")
            toast("Task added")
        }

    }

    function removeTask(index) {
        localStorage.setItem("tasks", JSON.stringify(tasks.filter((_, i) => index != i)))
        setTask(t => (t.filter((_, i) => index != i)))
        console.log(tasks.filter((_, i) => index != i));
        toast("Task removed")
    }

    function newTaskDetails(event) {
        setNewTask(event.target.value)
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks]
            const t = updatedTasks[index]
            updatedTasks[index] = updatedTasks[index - 1]
            updatedTasks[index - 1] = t
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            setTask(updatedTasks)
            toast("Task moved up")
        }
    }
    // [a[i],a[i+1]] = [a[i+1], a[i]]
    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks]
            const t = updatedTasks[index]
            updatedTasks[index] = updatedTasks[index + 1]
            updatedTasks[index + 1] = t
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            setTask(updatedTasks)
            toast("Task moved down")
        }
    }

    function taskDone(index) {
        let updatedTasks = completed
        if (completed.length > 2) {
            updatedTasks = completed.slice(0, -1)
        }
        localStorage.setItem("completed", JSON.stringify([tasks[index], ...updatedTasks]))
        completeTask([tasks[index], ...updatedTasks])
        removeTask(index)
        console.log(completed)
        toast.success("Task completed!")
    }

    function showComplete() {
        if (completed.length > 0) {
            if (clist.current.style.visibility == "hidden") {
                clist.current.style.visibility = "visible"
                toast("Completed tasks shown")
            }
            else {
                clist.current.style.visibility = "hidden"
                toast("Completed tasks hidden")
            }
        }
    }
    function removeComplete(index) {
        localStorage.setItem("completed", JSON.stringify(completed.filter((_, i) => index != i)))
        completeTask(c => (c.filter((_, i) => index != i)))
        console.log(completed.filter((_, i) => index != i));
        toast("Task removed")
    }

    function editTask(event) {
        console.log(event)
        const index = event.target.accessKey;
        let ww = [...tasks];
        ww[index] = event.target.value;
        setTask(ww);
        //toast("Task edited");
    }

    function getTask(event) {
        return tasks[event.target.accessKey];
    }

    function print() {
        //console.log("here");
        if(tasks[0]){
            let comp = document.createElement("ul");
            tasks.forEach((task) => {
                let item = document.createElement("li");
                item.innerHTML = task;
                comp.appendChild(item);
            })
            var a = window.open('', '', 'height=500, width=500');
            a.document.write('<html>');
            a.document.write('<body style="font-family: monospace;"><h3 style="display: inline-block;">TaskWiz</h3>  <h4>Your tasks : </h4><div style="margin-left: 2em;">');
            a.document.write(comp.innerHTML);
            a.document.write('</div></body></html>');
            a.print();
            a.close();
        }else{
            toast("Task list empty");
        }
        // const original = dcoument.body.innerHTML;
        // document.body.innerHTML = comp;
        // window.print();
        // document.body.innerHTML = original;
        //<img src="wired-lineal-12-layers.png" style="display: inline-block; "/>


    }



    return (<>
        <Toaster
            position="bottom-right"
            toastOptions={{
                className: '',
                duration: 1000,

            }}
        />
        {/* <div class="absolute top-0 z-[-2] h-max min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"> */}


        <div className="to-do-list font-sans  ">

            <h1 className=" text-center pt-10 font-bold text-4xl text-white"><script src="https://cdn.lordicon.com/lordicon.js"></script>
                <lord-icon
                    src="https://cdn.lordicon.com/pcllgpqm.json"
                    trigger="loop"
                    stroke="light"
                >
                </lord-icon><span className="mx-2">TaskWiz</span></h1>
            <h3 className=" text-center pb-10 text-xl bg-gradient-to-r from-lime-700 to-zinc-300 bg-clip-text text-transparent font-mono">Your personal task tracker</h3>

            <div className="flex flex-row justify-center basis-11/12">
                <input type="text" value={newTask} onChange={newTaskDetails} placeholder="Enter a task" className="max-w-3xl flex-1 text-white px-1 py-1 ms-8 me-5 bg-inherit border border-green-500 rounded-lg" />
                <button onClick={addTask} className="px-2"><script src="https://cdn.lordicon.com/lordicon.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                    >
                    </lord-icon></button>
            </div>

            <div className="border-b border-green-400 mx-10 py-5">
                <ol className="list flex flex-col" id="list">
                    {tasks.map((task, index) =>
                        <li key={index} className="element flex flex-row my-3 py-3 border rounded-2xl">

                            <textarea accessKey={index} id="task-text" className=" text-green-200 basis-10/12 text-center font-medium text-xl content-center bg-transparent px-5 outline-none" value={task} onChange={editTask}>
                                {/* {task}  */}
                            </textarea>
                            <span className="block">
                                <button onClick={() => taskDone(index)} className="px-2 pt-3"><script src="https://cdn.lordicon.com/lordicon.js"></script>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/oqdmuxru.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                    >
                                    </lord-icon></button>
                                <button onClick={() => removeTask(index)} className="px-2 pt-3"><script src="https://cdn.lordicon.com/lordicon.js"></script>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                        trigger="morph"
                                        state="morph-trash-full"
                                        colors="primary:#ffffff"
                                    >
                                    </lord-icon></button>
                            </span>
                            <span>
                                <button onClick={() => moveUp(index)} className="px-2 pt-3"><script src="https://cdn.lordicon.com/lordicon.js"></script>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/dwoxxgps.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                    >
                                    </lord-icon></button>
                                <button onClick={() => moveDown(index)} className="px-2 pt-3"><script src="https://cdn.lordicon.com/lordicon.js"></script>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/rmkahxvq.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                    >
                                    </lord-icon></button>
                            </span>
                        </li>)}
                </ol>
                <span className="flex justify-end">
                    <button className="text-white py-2 px-2 mt-2" onClick={print}>

                        <script src="https://cdn.lordicon.com/lordicon.js"></script>
                        <lord-icon
                            src="https://cdn.lordicon.com/xtnsvhie.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>
                        <div className="text-sm">Print</div>
                    </button>
                </span>
            </div>
            <div className="mx-10 my-20 py-5 flex flex-col">
                <h3 className="text-2xl text-green-400 text-center cursor-pointer content-center w-fit ho" onClick={showComplete}><script src="https://cdn.lordicon.com/lordicon.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/zrtfxghu.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                    >
                    </lord-icon><span className="px-2">Recent tasks <span className="text-sm hover:text-white transition-all">(hide/show)</span>: </span></h3>

                {/* <button onClick={showComplete} className="px-2"><lord-icon trigger="hover" src="/src/assets/show.json">recent</lord-icon></button> */}

                <ul className="clist flex flex-col visible" ref={clist}>
                    {completed.map((task, index) =>
                        <li key={index} className="element flex flex-row my-3 py-3 border rounded-2xl">
                            <p className="  text-green-200 basis-11/12 text-center font-medium text-xl content-center">
                                {task}
                            </p>
                            <button onClick={() => removeComplete(index)} className="px-2 basis-1/12"><lord-icon
                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                trigger="morph"
                                state="morph-trash-full"
                                colors="primary:#ffffff"
                            >
                            </lord-icon></button>
                        </li>)}
                </ul>
            </div>
        </div>
        {/* </div> */}
    </>
    )
}

export default ToDoList