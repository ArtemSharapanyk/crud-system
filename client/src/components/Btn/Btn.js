import React from 'react';

export const Btn = ({children,classes, disabled, onClick}) => {
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