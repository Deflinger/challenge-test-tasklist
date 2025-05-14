import { useEffect, useState } from "react"
import Close  from "../../assets/icons/close.svg"
import "./addtask.scss"
import { Button } from "../Button/button"
import { Modal } from "../Modal/modal"
import { Input } from "../input/input"

interface AddEditTaskFormProps {
  modalInput:string;
  modalButton: string;
  modalTitle: string;
  onClose: ()=> void;
  onSubmit: (task :{title: string; priority: string})=>void;
}

export const AddEditTaskForm = ({modalInput,modalButton,modalTitle,onClose, onSubmit}:AddEditTaskFormProps) => {
  const [title,setTitle] = useState('');
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();
    if(!title.trim())return;
    onSubmit({title,priority});
    onClose();
  }
  useEffect(() => {
    setTitle(modalInput);
  }, [modalInput]);
  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{modalTitle} </span>
            <img 
              src={Close} 
              className="cp"
              onClick={onClose}
              alt="close" 
            />
          </div>
          <Input 
            label="Task" 
            placeholder="Type your task here..." 
            onChange={(e) => {setTitle(e.target.value)}} 
            name="title" 
            value={title} 
          />
          
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((prioritylevel) => (
                <li 
                  key={prioritylevel} 
                  className={`${priority === prioritylevel? "priority-selected": ""}${prioritylevel}`}
                  onClick={() =>setPriority(prioritylevel as "high"|"medium"|"low")}
                >
                  {prioritylevel.charAt(0).toUpperCase()+prioritylevel.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title={modalButton} type="submit" />
          </div>
        </div>
      </form>
    </Modal>
  )
}
