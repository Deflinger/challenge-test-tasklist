import { useState } from "react";
import { AddEditTaskForm } from "../Addtaskform/addtask";

export const ParentModal = ()=> {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = () => {
        setIsModalOpen(false); // Cierra el modal
      };
    const handleSubmit = (task: { title: string; priority: string }) => {
        console.log(task); // Maneja los datos del formulario
        setIsModalOpen(false); // Cierra el modal después de enviar
    }
    return (
        <div>
      <button onClick={() => setIsModalOpen(true)}>Add Task</button>

      {isModalOpen && (
        // Se pasa la función de cierre y de envío al formulario
        <AddEditTaskForm onClose={handleClose} onSubmit={handleSubmit} />
      )}
    </div>
    );
}