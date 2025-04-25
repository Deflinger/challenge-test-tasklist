import "./input.scss"

interface InputProps {
  label: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  value: string
}
    
export const Input = ({ label, placeholder, onChange, name, value }: InputProps) => {
  return (
    <div className="input">
      <label htmlFor={name}>
        {label}
      </label>
      <input 
        type="text" 
        placeholder={placeholder} 
        onChange={onChange} 
        name={name} 
        value={value} 
      />
    </div>
  )
}
