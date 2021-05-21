import React, { useEffect, useState } from 'react';

export const useValidation = (value, validationsRules, baseClasses, dirty, validatedClasses = {
    error: 'form-control_bad-validation',
    successes:'form-control_successes-validation'
}) => {
    const valueOfInput = value.trim();

    const [isEmail, setEmail] = useState(false);
    const [minLength, setMinLength] = useState(false);
    const [isNumber, setIsNumber] = useState(false); 


    let inputValided = true;

    useEffect(() => {
        for(let validationRule in validationsRules){
            switch(validationRule){
                case 'isEmail':
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        .test(valueOfInput) ? setEmail(true) : setEmail(false)
                    break;
                case 'minLength':
                    valueOfInput.length >= validationsRules[validationRule] ? setMinLength(true) : setMinLength(false) 
                    break;
                case 'isNumber':
                    !isNaN(+valueOfInput) ? setIsNumber(true) : setIsNumber(false) 
            }
        }
    }, [valueOfInput]);

    const dataAboutValidation = {
        isEmail,
        minLength,isNumber
    };

    Object.keys(validationsRules).forEach(property => {
        inputValided =  inputValided && dataAboutValidation[property];  
    });

    const clsOfInput = [
        ...baseClasses,
        dirty ? 
            !inputValided ?
                validatedClasses.error
            :
                validatedClasses.successes
        : '' 
    ];



    return {
        isEmail, isNumber,
        minLength, inputValided, clsOfInput
    }

}