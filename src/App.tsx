import React from "react";
import { useState } from 'react';
import { ChangeEvent } from "react";
import {RenderList} from "./components/RenderList";

export interface TodoTask {
  idNumber: number,
  taskName: string,
  isCompletedTask: boolean,
}

const App: React.FC = () => {
  const [idNum, setIdNum] = useState<number>(1)
  const [task, setTask] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [list,setList] = useState<TodoTask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" && task.length > 0) {
      addTask();
  }
}

  const addTask = () => {
    const newTask:TodoTask = {
      idNumber:idNum,
      taskName:task,
      isCompletedTask:isCompleted
    }
    setTask('');
    setList([...list, newTask]);
    setIdNum((idNum) => idNum + 1);
  }

  const toggleDoneTask = (id:number):void => {
    const newTasks:TodoTask[] = [...list];
    newTasks[id].isCompletedTask = !newTasks[id].isCompletedTask;
    setList(newTasks);
    
  }

  const delTask = (id:number):void => {
    const newTasks:TodoTask[] = [...list];
    newTasks.splice(id, 1);
    setList(newTasks);
  }
  return (
    <>
     <div className="card" >
      <div className="card-body">
        <input type="text" name='task' value={task} onKeyDown={handleKeyDown} onChange={handleChange} className="form-control" autoFocus required/>
        <button onClick={addTask} className="btn btn-success mt-2 ">add</button>
      </div>
      <div className="renderlist">
        
      {
      list.map((tarea:TodoTask, id:number) =>  {
        return <div className="card card-body mt-2" key={id}>
          <h2 style={{textDecoration: tarea.isCompletedTask ?'line-through' : ''}}> {tarea.taskName}</h2>
          <button className ="btn btn-secondary" onClick={() => toggleDoneTask(id)}>
            {tarea.isCompletedTask ? '✓' : '✗' }
          </button>
          <button className="btn btn-danger" onClick={() => delTask(id)}>
          🗑️
          </button>
          </div>
      })
    }    
      </div>
     </div>
    </>
  )
}

export default App
