import React from 'react'
import Btn from '../components/Btn/Btn';
import Input from '../components/Controller/Controller';
import useFormValidator from '../hooks/validation/useFormValidator';
import useInputValidator from '../hooks/validation/useInputValidator';
import useValidation from '../hooks/validation/useValidation';

export default () => {
    const clsOfInputs = [
        'form-control',
        'auth-section__input',
    ];
    
    const {value: emailValue, onChange:onChangeEmail, onBlur:onBlurEmail, dirty: emailDirty} = useInputValidator();
    const {value: passwordValue, onChange:onChangePassword, onBlur:onBlurPassword, dirty: passwordDirty} = useInputValidator();

    const {inputValided: emailValided, clsOfInput: emailCls} = useValidation(emailValue, {isEmail: true}, clsOfInputs, emailDirty);
    const {inputValided: passwordValided, clsOfInput: passwordCls} = useValidation(passwordValue, {minLength: 6}, clsOfInputs,passwordDirty);

    const formValided = useFormValidator(emailValided, passwordValided);


    
    return (
        <section className="page auth-section auth-section_login">
            <h2 className="page__title">
                Auth
            </h2>
            <div className="page__form-block">
                <Input value={emailValue} changeValue={onChangeEmail} classes = {emailCls} type = "text" onBlur={onBlurEmail}  placeholder='Email' />
                <Input value={passwordValue} changeValue={onChangePassword} classes = {passwordCls} type="password" onBlur={onBlurPassword}  placeholder='Password' />
            </div>
            <div className="wrapper">
                <div className="btn-box auth-section__btn-box">
                    <Btn disabled={!formValided} classes="btn btn_send-data auth-section__btn">
                        Sing in
                    </Btn>
                    <Btn disabled={!formValided} classes="btn btn_send-data auth-section__btn">
                        Sing up
                    </Btn>
                </div>
            </div>
        </section>
    )
};