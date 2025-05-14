import  Add  from "./assets/icons/add.svg"
import './App.scss'
import { Button } from "./components/Button/button"
import { DeleteModal } from "./components/DeleteModal/deletemodal"
import { TaskCard } from "./components/Taskcard/taskcard"
import { AddEditTaskForm } from "./components/Addtaskform/addtask"
import { useState } from "react"
import { taskList as initialtasks} from "./components/siteData/tasklist"



function App() {
  const [task,setTask]= useState(initialtasks)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showAddModal,setShowAddModal] = useState(false);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [selector, setSelector] = useState("");
  const [modbutton,setModButton]= useState("");
  const [modinput,setModInput] = useState("")
  
  const handleStatus =(task:Task)=>{
    let nextStatus="";
    let nextProgress=0;
    if(task.status=="To Do"){
      nextStatus = "In Progress";
      nextProgress= 50;
    }else if(task.status == "In Progress"){
      nextStatus = "Done";
      nextProgress= 100;
    }else if(task.status== "Done"){
      nextStatus = "To Do";
      nextProgress= 0;
    }
    setTask((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id? { ...t, status: nextStatus,progress:nextProgress }: t
      )
    );
  }
  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTask((prevTasks) => prevTasks.filter(t => t.id !== taskToDelete.id));
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };
  
  const handleTask = (newtask:Task)=>{
    if (selector === "Edit Task" && taskToEdit) {
      setTask((prev) =>
        prev.map((t) =>
          t.id === taskToEdit.id ? { ...t, ...newtask } : t
        )
        
      );
    } else {    
      setTask((prev) => [
        ...prev,
        {
          ...newtask,
          id: crypto.randomUUID(),
          status: "To Do",
          progress: 0,
        },
      ]);
    }
  }
  const handleAdd = () =>{
    setModButton("Add")
    setSelector("Add Task")
    setModInput("")
    setShowAddModal(true)
  }
  const handleCloseAdd = () => {
    setShowAddModal(false)
  }
  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };   
  const handleDelete = (task: Task) => {
    setTaskToDelete(task);
    console.log("Task Deleted"); 
    setShowDeleteModal(true);
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setShowAddModal(true)
    setSelector("Edit Task")
    setModButton("Edit")
    setModInput(task.title)
  console.log("Editando:", task);
  
};

  return (
    <>
      <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button 
            title="Add Task" 
            icon={<img src={Add}/>} 
            onClick={handleAdd} />
        </div>

        <div className="task-container">
          {task.map((task) => (
            <TaskCard 
                key={task.id} 
                task={task}
                onEdit={handleEdit} 
                onDelete={handleDelete}
                onStatusChange={handleStatus}
            />
          ))}
        </div>
      </div>
      {showAddModal &&   (
        <AddEditTaskForm 
          modalInput={modinput}
          modalButton={modbutton}
          modalTitle={selector}
          onClose={handleCloseAdd} 
          onSubmit={(newtask) => {handleTask(newtask)}
          } 
        />
      )}
      {showDeleteModal && taskToDelete && (
        <DeleteModal
          onClose={handleCloseDelete}
          onDelete={handleDeleteTask}
        />)}
    </div>
    </>
  )
}

export default App
