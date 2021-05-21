import React, { useState } from 'react';
import { AlertContext } from '../Context/AlertContext';

export const AlertState = ({children}) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('error');
    const [message,setMessage] = useState(null);

    const hideAlert = () => {
        setVisible(false);
    };

    const showAlert = (message, type = 'error') => {
        setVisible(true);
        setMessage(message);
        setType(type);
    };

    const toggleAlert = (ms, message, type = 'error') => {
        showAlert(message, type);
        setTimeout(hideAlert, ms)
    };

    return (
        <AlertContext.Provider value={{
            visible, type, message,
            hideAlert,showAlert,toggleAlert
        }}>
            {children}
        </AlertContext.Provider>
    )
}