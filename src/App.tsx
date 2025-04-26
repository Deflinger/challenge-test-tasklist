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
  const [showAddModal,setShowAddModal] = useState(false)
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [selector, setSelector] = useState("")
  
  const handleStatus =(task:Task)=>{
    let nextStatus="";
    if(task.status=="To Do"){
      nextStatus = "In Progress";
    }else if(task.status == "In Progress"){
      nextStatus = "Done";
    }else if(task.status== "Done"){
      nextStatus = "To Do";
    }
    setTask((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id? { ...t, status: nextStatus }: t
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
          status: "Pending",
          progress: 0,
        },
      ]);
    }
  }
  const handleAdd = () =>{
    setSelector("Add Task")
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
