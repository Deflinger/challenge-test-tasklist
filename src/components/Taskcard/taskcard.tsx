import DeleteIcon  from "../../assets/icons/delete-img.svg"
import EditIcon  from "../../assets/icons/edit.svg"
import { CircularProgressBar } from "../Progressbar/progressbarr"

import "./taskcard.scss"

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const { id, title, priority, status, progress } = task

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={`${priority}-priority priority`}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status">{status}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <img 
            src={EditIcon} 
            className="mr-20 cp" 
            onClick={()=> onEdit(task)}
        />
        <img 
            src={DeleteIcon} 
            className="cp" 
            onClick={()=> onDelete(task)}
        />
      </div>
    </div>
  )
}