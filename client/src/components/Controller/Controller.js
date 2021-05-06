import React from 'react'

export default ({value, changeValue, placeholder, classes, onBlur, type,typeOfControl = 'input'}) => {

    if(typeOfControl != 'input'){
        return (
        <textarea className={classes.join(' ')} value={value} onChange={changeValue} onBlur={onBlur} placeholder={placeholder}>
                
        </textarea>
        )
    }

    return (
        <input  type={type} className={classes.join(' ')} onBlur={onBlur} value={value} placeholder={placeholder} onChange={changeValue} />
    )
}