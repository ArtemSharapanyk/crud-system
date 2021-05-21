import React, {useState, useEffect, useContext } from 'react';
import { AlertContext } from '../../states/Context/AlertContext';
import { HttpContext } from './HttpContext';


export const UseHttp = ({children}) => {
    const [load, setLoad] = useState(false);
    const [errorMessage, setError] = useState(null);
    const [successesMessage, setMessage] = useState(null);

    const {toggleAlert} = useContext(AlertContext);

    const switchMessage = (message,cal, type = 'error') => {
        toggleAlert(2000, message, type);
        cal();
    };


    useEffect(() => {
        if(successesMessage){
            switchMessage(successesMessage, cleanMessages, 'success');
        }
    }, [successesMessage]);

    useEffect(() => {
        if(errorMessage){
            switchMessage(errorMessage, cleanMessages);
        }
    }, [errorMessage]);


    const request = async (url,method = 'GET', body = null, headers = {}) => {
        try{
            setLoad(true);

            if(body){
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(body);
            }
    
            const res = await fetch(url, {
                method, body, headers
            });
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message);
            }
            setLoad(false);
            setMessage(data.message);

            return {
                res, data
            }

        }catch(e){
            setLoad(false);
            setError(e.message);
        }
    }; 

    const cleanMessages = () => {
        setError('');
        setMessage('');
    };


    return (
        <HttpContext.Provider value={{
            request, load, successesMessage, errorMessage, cleanMessages,
        }}>
            {children}
        </HttpContext.Provider>
    )
};