import React, { useContext } from 'react';
import Btn from '../components/Btn/Btn';
import Input from '../components/Controller/Controller';
import useFormValidator from '../hooks/validation/useFormValidator';
import useInputValidator from '../hooks/validation/useInputValidator';
import useValidation from '../hooks/validation/useValidation';
import { UserContext } from '../states/Context/userContext';



export default () => {
    const {createProfile} = useContext(UserContext);

    const clsOfInputs = [
        'form-control',
        'auth-section__input',
    ];

    const clsOfTextArea = ['message-block create-profile-section__message-block ']; 
    
    const {value: profileNameValue, onChange:onChangeProfileName, onBlur:onBlurProfileName, dirty: profileNameDirty} = useInputValidator();
    const {value: typeOfWorkValue, onChange:onChangeTypeOfWork, onBlur:onBlurTypeOfWork, dirty: typeOfWorkDirty} = useInputValidator();

    const {value: goalsValue, onChange:onChangeGoals, onBlur:onBlurGoals, dirty: goalsDirty} = useInputValidator();
    const {value: yourMindsValue, onChange:onChangeYourMinds, onBlur:onBlurYourMinds, dirty: yourMindsDirty} = useInputValidator();

    const {value: ageValue, onChange:onChangeAge, onBlur:onBlurAge, dirty: ageDirty} = useInputValidator();


    const {inputValided:profileNameValided, clsOfInput: profileNameCls} = useValidation(profileNameValue, {minLength: 6}, clsOfInputs,profileNameDirty);
    const {inputValided: typeOfWorkValided, clsOfInput:typeOfWorkCls } = useValidation(typeOfWorkValue, {minLength: 6}, clsOfInputs, typeOfWorkDirty);
    
    const {inputValided: goalsValided, clsOfInput: goalsCls} = useValidation(goalsValue, {minLength: 6}, clsOfInputs,goalsDirty);
    const {inputValided: yourMindsValided, clsOfInput:yourMindsCls } = useValidation(yourMindsValue, {minLength: 20}, clsOfTextArea, yourMindsDirty,{
        error: 'message-block_bad-validation',
        successes: 'message-block_successes-validation'
    });

    const {inputValided: ageValided, clsOfInput: ageCls} = useValidation(ageValue, {minLength: 0, isNumber: true}, clsOfInputs, ageDirty);
    
    const formValided = useFormValidator(profileNameValided, typeOfWorkValided, goalsValided, yourMindsValided, ageValided);

    const objectData = {
        name:profileNameValue,
        typeOfWork: typeOfWorkValue,
        goals: goalsValue,
        minds: yourMindsValue,
        age: ageValue
    };

    return (
        <section className="page create-profile-section">
           <h2 className="page__title">
                Create Profile
            </h2>
            <div className="page__form-block">
                <Input value={profileNameValue} changeValue={onChangeProfileName} onBlur={onBlurProfileName} classes={profileNameCls} placeholder='Profile name' />
                <Input value={typeOfWorkValue} changeValue={onChangeTypeOfWork} onBlur={onBlurTypeOfWork} classes={typeOfWorkCls} placeholder='Type of work' />
                <Input value={goalsValue} changeValue={onChangeGoals} onBlur={onBlurGoals}  classes={goalsCls} placeholder='Goals' />
                <Input value={ageValue} changeValue={onChangeAge} onBlur={onBlurAge}  classes={ageCls} placeholder='Age' />
                <Input typeOfControl={'textarea'} value={yourMindsValue} changeValue={onChangeYourMinds} onBlur={onBlurYourMinds}  classes={yourMindsCls}  placeholder='Your minds' />
            </div>
            <div className="wrapper">
                <Btn classes="btn btn_large btn_send-data create-profile-section__btn" onClick={createProfile.bind(this, objectData)} disabled={!formValided}>
                    Create
                </Btn>
            </div>
        </section>
    )
};