import React from 'react';

export const CheckBox = ({state, children, changeState, classes}) => {
    const cls = [
        'checkbox',
        state ? 'checkbox_active' : '',
        classes
    ];

    return (
        <>
            <div className={cls.join(' ')} onClick={changeState}>
                <div className="checkbox__box">
                    <div className="checkbox__small-box"></div>
                </div>
                <div className="checkbox__label">
                    {children}
                </div>
            </div>
        </>
    )
}