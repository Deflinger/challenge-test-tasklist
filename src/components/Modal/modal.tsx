import "./modal.scss"

type ModalProps = {
  children: React.ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  )
}