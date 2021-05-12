import React, { useContext } from 'react';
import { AlertContext } from '../../states/Context/AlertContext';


export default () => {
    const {message, type,visible} = useContext(AlertContext);
    const cls = [
        `alert alert_${type}`,
        visible ? 'alert_active' : ''
    ];

    return (
            <div className={cls.join(' ')}>
                <div className="alert__title">
                    {type[0].toUpperCase() + type.slice(1)}
                </div>
                <div className="alert__message">
                    {message}
                </div>
            </div>
    )
};