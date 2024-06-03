import React from 'react'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ className, ...rest }): React.JSX.Element => {
  return (
    <button
      {...rest}
      className={`${
        className ? className : 'bg-primary-100 hover:bg-primary-50 shadow-md p-2 rounded-md'
      }`}
    >
      {rest.children}
    </button>
  )
}

export default Button
