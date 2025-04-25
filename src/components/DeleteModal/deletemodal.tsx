import { Button } from "../Button/button"
import { Modal } from "../Modal/modal"
import "./deletemodal.scss"

interface DeleteProps{
  onClose:()=>void
  onDelete:()=>void 
}

export const DeleteModal = ({onClose,onDelete}:DeleteProps) => {

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button 
              title="Delete" 
              onClick={onDelete} 
          />
          <Button 
              title="Cancel" 
              outline 
              onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  )
}

