export const useFormValidator = (...params) => {
    const inputsValidation = params.find(inputValidation => !inputValidation);

    if(undefined === inputsValidation){
        return true;
    }else{
        return false;
    }
};