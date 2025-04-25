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
  const [taskToAdd, setTaskToAdd] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showAddModal,setShowAddModal] = useState(false)
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [selector, setSelector] = useState("")
  
  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTask((prevTasks) => prevTasks.filter(t => t.id !== taskToDelete.id));
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };
  /*
  const handleAddTask = ()=>{
    if(taskToAdd){
      setTask((prev) => [...prev, taskToAdd])
      setShowAddModal(false);
      setTaskToAdd(null);
    }
  }
*/
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
/*
useEffect(() => {
  if (taskToAdd) {
    setTask((prev) => [...prev, taskToAdd]);
    setTaskToAdd(null);
    setShowAddModal(false);
  }
}, [taskToAdd]);
*/

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
            />
          ))}
        </div>
      </div>
      {showAddModal &&   (
        <AddEditTaskForm 
          modalTitle={selector}
          onClose={handleCloseAdd} 
          onSubmit={(newtask) => {
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
