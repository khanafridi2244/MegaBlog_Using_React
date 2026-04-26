import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && (
            <label htmlFor={id} className='inline-block mb-2 pl-1 text-sm font-medium text-text-secondary'>
                {label}
            </label>
        )}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-4 py-3 rounded-xl bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary border border-border w-full transition-all duration-200 ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)

