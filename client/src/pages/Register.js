import React, { useContext } from 'react';
import Btn from '../components/Btn/Btn';
import Checkbox from '../components/checkBox/Checkbox';
import Input from '../components/Controller/Controller';
import Loader from '../components/Loader/Loader';
import useCheckBox from '../hooks/useCheckbox/useCheckBox';
import { HttpContext } from '../hooks/useHttp/HttpContext';
import useFormValidator from '../hooks/validation/useFormValidator';
import useInputValidator from '../hooks/validation/useInputValidator';
import useValidation from '../hooks/validation/useValidation';
import { UserContext } from '../states/Context/userContext';

export default () => {
    const {register} = useContext(UserContext);
    const {load}     = useContext(HttpContext);

    const {checkboxState, setActive} = useCheckBox();

    const clsOfInputs = [
        'form-control',
        'auth-section__input',
    ];
    
    const {value: emailValue, onChange:onChangeEmail, onBlur:onBlurEmail, dirty: emailDirty} = useInputValidator();
    const {value: passwordValue, onChange:onChangePassword, onBlur:onBlurPassword, dirty: passwordDirty} = useInputValidator();
    const {value: userNameValue, onChange:onChangeUserName, onBlur:onBlurUserName, dirty: userNameDirty} = useInputValidator();


    const {inputValided: emailValided, clsOfInput: emailCls} = useValidation(emailValue, {isEmail: true}, clsOfInputs, emailDirty);
    const {inputValided: passwordValided, clsOfInput: passwordCls} = useValidation(passwordValue, {minLength: 6}, clsOfInputs,passwordDirty);
    const {inputValided: userNameValided, clsOfInput: userNameCls} = useValidation(userNameValue, {minLength: 4}, clsOfInputs,userNameDirty);

    const formValided = useFormValidator(emailValided, passwordValided, userNameValided);

    const objectOfData = {
        username: userNameValue,
        email: emailValue,
        password: passwordValue,
        isAdmin:checkboxState 
    };


    
    return (
        <section className="page auth-section">
            <h2 className="page__title">
                Register
            </h2>
            <div className="page__form-block">
                <Input value={userNameValue} changeValue={onChangeUserName} classes = {userNameCls} type = "text" onBlur={onBlurUserName}  placeholder='Username' />
                <Input value={emailValue} changeValue={onChangeEmail} classes = {emailCls} type = "text" onBlur={onBlurEmail}  placeholder='Email' />
                <Input value={passwordValue} changeValue={onChangePassword} classes = {passwordCls} type="password" onBlur={onBlurPassword}  placeholder='Password' />
                <Checkbox classes={'auth-section__checkbox'} state={checkboxState} changeState={setActive.bind(this,prev => !prev)} >
                    Admin
                </Checkbox>
            </div>
            <div className="wrapper">
                <div className="btn-box auth-section__btn-box">
                    <Btn disabled={!formValided || load} onClick={register.bind(this,objectOfData)} classes="btn btn_send-data auth-section__btn">
                        Sing up
                    </Btn>
                </div>
            </div>
        </section>
    )
};