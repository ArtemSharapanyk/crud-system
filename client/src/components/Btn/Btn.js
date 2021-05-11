import React from 'react'

export default ({children,classes, disabled, onClick}) => {
    const cls = [
        classes,
        disabled ? 'btn_disable' : ''
    ];

    return (
        <div className={cls.join(' ')} onClick ={onClick}>
            {children}
        </div>
    )
}