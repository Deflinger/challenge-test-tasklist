import { MouseEventHandler, ReactNode } from "react"
import "./button.scss"

type ButtonProps = {
  title: string
  icon?: ReactNode
  outline?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset";
}

export const Button = ({ title, icon, outline, disabled, onClick, type = "button"}: ButtonProps) => {
  const buttonClass = `${outline ? "outline":""}button`.trim();
  return (
    <button 
      type= {type}
      className={buttonClass} 
      onClick={onClick} 
      disabled={disabled}
    >
      {icon && <span className="icon">{icon}</span>}
      {title}
    </button>
  )
}