import React, {useState } from 'react'


export default () => {
    const [load, setLoad] = useState(false);
    const [errorMessage, setError] = useState(null);
    const [successesMessage, setMessage] = useState(null);


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


    return {
        request, load, successesMessage, errorMessage, cleanMessages,
    }
};