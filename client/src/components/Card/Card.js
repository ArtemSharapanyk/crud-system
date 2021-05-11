import React, { useContext, useState } from 'react';
import useFormValidator from '../../hooks/validation/useFormValidator';
import useInputValidator from '../../hooks/validation/useInputValidator';
import useValidation from '../../hooks/validation/useValidation';
import { UserContext } from '../../states/Context/userContext';
import Btn from '../Btn/Btn';
import Input from '../Controller/Controller';

export default ({type = 'profile-card', classes,cardData, children,cardState, closeCardFunc}) => {
    if(type === 'profile-card' ){
        const {name, typeOfWork, goals, minds, age} = cardData;
        return (
            <li className={["card card_profile-card", classes ? classes : ''].join(' ')}>
                    <div className="card__name card__property">
                        Name of profiles:
                        <div className="card__value">
                            {name}
                        </div>
                    </div>
                    <div className="card__type-of-work card__property">
                        Type of work:
                        <div className="card__value">
                            {typeOfWork}
                        </div>
                    </div>
                    <div className="card__list-of-goals card__property">
                        Goals:
                        <div className="card__value">
                            {goals}
                        </div>
                    </div>
                    <div className="card__minds card__property">
                        Age:
                        <div className="card__value">
                            {age}
                        </div>
                    </div>
                    <div className="card__minds card__property">
                        Your minds:
                        <div className="card__value">
                            {minds}
                        </div>
                    </div>
                    <div className="card__btn" >
                        <div className="btn-box">
                            {children}
                        </div>
                    </div>
                </li>
        )
    }

    if(type === 'user-card'){
        const {username, email} = cardData;
        return (
            <div className={['card card_user', classes ? classes : ''].join(' ')}>
                    <div className="card__name card__property">
                        User name:
                        <div className="card__value">
                            {username}
                        </div>
                    </div>
                    <div className="card__name card__property">
                        Email:
                        <div className="card__value">
                            {email}
                        </div>
                    </div>
                    <div className="card__btn" >
                        {children}
                    </div>
                </div>
        )
    }

    if(type === 'user-card-list'){
        const {username, email, role} = cardData;

        return (
            <div className={['card card_user', classes ? classes : ''].join(' ')}>
                    <div className="card__name card__property">
                        User name:
                        <div className="card__value">
                            {username}
                        </div>
                    </div>
                    <div className="card__name card__property">
                        Email:
                        <div className="card__value">
                            {email}
                        </div>
                    </div>
                    <div className="card__name card__property">
                        Role:
                        <div className="card__value">
                            {role}
                        </div>
                    </div>
                    <div className="card__btn" >
                        <div className="btn-box">
                            <Btn classes={'btn btn_send-data'}>
                                Update
                            </Btn>
                            <Btn classes={'btn btn_send-data'}>
                                Profiles
                            </Btn>
                            <Btn classes={'btn btn_send-data'}>
                                Delete
                            </Btn>
                        </div>
                    </div>
                </div>
        )
    }

    if(type === 'profile-update-card'){

        const {updateProfile} = useContext(UserContext);

        const {id} = cardData ? cardData : {id: 'id'};

        const cls = [
            'card-wrap',
            cardState ? 'card-wrap_active' : ''
        ];


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
        const {inputValided: ageValided, clsOfInput: ageCls} = useValidation(ageValue, {minLength: 0, isNumber: true}, clsOfInputs,ageDirty);
    
        
        const {inputValided: goalsValided, clsOfInput: goalsCls} = useValidation(goalsValue, {minLength: 6}, clsOfInputs,goalsDirty);
        const {inputValided: yourMindsValided, clsOfInput:yourMindsCls } = useValidation(yourMindsValue, {minLength: 20}, clsOfTextArea, yourMindsDirty,{
            error: 'message-block_bad-validation',
            successes: 'message-block_successes-validation'
        });

        const data = {
            name: profileNameValue,
            typeOfWork: typeOfWorkValue,
            goals: goalsValue,
            minds: yourMindsValue,
            id,
            age: ageValue
        };
        
        const formValided = useFormValidator(profileNameValided, typeOfWorkValided, goalsValided, yourMindsValided, ageValided);
    

        return (
            <div className={cls.join(' ')}>
                <div className={['card card_profile-update', classes ? classes : ''].join(' ')}>
                    <div className="card__btn card__btn_close" onClick={closeCardFunc}>
                        close
                    </div>
                    <div className="card__input-box">
                        <Input value={profileNameValue} changeValue={onChangeProfileName} onBlur={onBlurProfileName} classes={profileNameCls} placeholder='Profile name' />
                        <Input value={typeOfWorkValue} changeValue={onChangeTypeOfWork} onBlur={onBlurTypeOfWork} classes={typeOfWorkCls} placeholder='Type of work' />
                        <Input value={goalsValue} changeValue={onChangeGoals} onBlur={onBlurGoals}  classes={goalsCls} placeholder='Goals' />
                        <Input value={ageValue} changeValue={onChangeAge} onBlur={onBlurAge}  classes={ageCls} placeholder='Age' />
                        <Input typeOfControl={'textarea'}value={yourMindsValue} changeValue={onChangeYourMinds} onBlur={onBlurYourMinds}  classes={yourMindsCls}  placeholder='Your minds' />
                    </div>
                    <div className={["card__btn", formValided ? '' : 'disable'].join(' ')}>
                        <div className="btn-box">
                            <Btn classes={'btn btn_send-data'} onClick={updateProfile.bind(this, data)}>
                                Update
                            </Btn>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}