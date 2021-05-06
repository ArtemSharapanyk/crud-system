import React from 'react'

export default ({children,classes, disabled}) => {
    const cls = [
        classes,
        disabled ? 'btn_disable' : ''
    ];

    return (
        <div className={cls.join(' ')}>
            {children}
        </div>
    )
}