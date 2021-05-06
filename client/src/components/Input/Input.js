import React from 'react'

export default ({value, changeValue, placeholder, classes, onBlur, type}) => {
    return (
        <input  type={type} className={classes.join(' ')} onBlur={onBlur} value={value} placeholder={placeholder} onChange={changeValue} />
    )
}