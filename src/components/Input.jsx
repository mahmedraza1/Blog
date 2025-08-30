import React, {useId} from 'react'

const Input = React.forwardRef(({label, type = 'text', className = '', ...props}, ref) => {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id} className='mb-1'>{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        {...props}
        id={id}
      />
    </div>
  )
})

export default Input
