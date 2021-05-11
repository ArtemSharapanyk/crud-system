import React, { useContext } from 'react'
import Btn from '../components/Btn/Btn';
import Input from '../components/Controller/Controller';
import useFormValidator from '../hooks/validation/useFormValidator';
import useInputValidator from '../hooks/validation/useInputValidator';
import useValidation from '../hooks/validation/useValidation';
import { UserContext } from '../states/userContext';

export default () => {
    const {login} = useContext(UserContext);


    const clsOfInputs = [
        'form-control',
        'auth-section__input',
    ];
    
    const {value: passwordValue, onChange:onChangePassword, onBlur:onBlurPassword, dirty: passwordDirty} = useInputValidator();
    const {value: userNameValue, onChange:onChangeUserName, onBlur:onBlurUserName, dirty: userNameDirty} = useInputValidator();


    const {inputValided: passwordValided, clsOfInput: passwordCls} = useValidation(passwordValue, {minLength: 6}, clsOfInputs,passwordDirty);
    const {inputValided: userNameValided, clsOfInput: userNameCls} = useValidation(userNameValue, {minLength: 4}, clsOfInputs,userNameDirty);

    const formValided = useFormValidator(passwordValided, userNameValided);

    const objectOfData = {
        username: userNameValue,
        password: passwordValue
    };


    
    return (
        <section className="page auth-section">
            <h2 className="page__title">
                Login
            </h2>
            <div className="page__form-block">
                <Input value={userNameValue} changeValue={onChangeUserName} classes = {userNameCls} type = "text" onBlur={onBlurUserName}  placeholder='Username' />
                <Input value={passwordValue} changeValue={onChangePassword} classes = {passwordCls} type="password" onBlur={onBlurPassword}  placeholder='Password' />
            </div>
            <div className="wrapper">
                <div className="btn-box auth-section__btn-box">
                    <Btn disabled={!formValided} classes="btn btn_send-data auth-section__btn" onClick={login.bind(this, objectOfData)}>
                        Sing in
                    </Btn>
                </div>
            </div>
        </section>
    )
};