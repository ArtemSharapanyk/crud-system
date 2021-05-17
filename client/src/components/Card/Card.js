import React, { useContext } from 'react';
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
                            {children}
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
        const {inputValided: ageValided, clsOfInput: ageCls} = useValidation(ageValue, {minLength: 1, isNumber: true}, clsOfInputs,ageDirty);
    
        
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

        const update = () => {
            updateProfile(data);
            closeCardFunc(false);
        };
    

        return (
            <div className={cls.join(' ')}>
                <div className={['card card_update card_profile-update', classes ? classes : ''].join(' ')}>
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
                            <Btn classes={'btn btn_send-data'} onClick={update}>
                                Update
                            </Btn>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if(type === 'user-update-card'){
        const {updateUserInfo} = useContext(UserContext);

        const cls = [
            'card-wrap',
            cardState ? 'card-wrap_active' : ''
        ];


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


        const data = {
            username: userNameValue, 
            password: passwordValue,
            email: emailValue
        };


        const update = () => {
            updateUserInfo(data);
            closeCardFunc(false);
        };

        return (
            <div className={cls.join(' ')}>
                <div className={['card card_update card_user-update', classes ? classes : ''].join(' ')}>
                    <div className="card__btn card__btn_close" onClick={closeCardFunc}>
                        close
                    </div>
                    <div className="card__input-box">
                        <Input value={userNameValue} changeValue={onChangeUserName} classes = {userNameCls} type = "text" onBlur={onBlurUserName}  placeholder='Username' />
                        <Input value={emailValue} changeValue={onChangeEmail} classes = {emailCls} type = "text" onBlur={onBlurEmail}  placeholder='Email' />
                        <Input value={passwordValue} changeValue={onChangePassword} classes = {passwordCls} type="password" onBlur={onBlurPassword}  placeholder='Password' />
                    </div>
                    <div className={["card__btn", formValided ? '' : 'disable'].join(' ')}>
                        <div className="btn-box">
                            <Btn classes={'btn btn_send-data'} onClick={update}>
                                Update
                            </Btn>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if(type === 'user-update-card-admin'){
        const {updateUserInfoAdmin} = useContext(UserContext);
    
        const id = cardData ? cardData : '';

        const cls = [
            'card-wrap',
            cardState ? 'card-wrap_active' : ''
        ];


        const clsOfInputs = [
            'form-control',
            'auth-section__input',
        ];
    
        const {value: emailValue, onChange:onChangeEmail, onBlur:onBlurEmail, dirty: emailDirty} = useInputValidator();
        const {value: passwordValue, onChange:onChangePassword, onBlur:onBlurPassword, dirty: passwordDirty} = useInputValidator();
        const {value: userNameValue, onChange:onChangeUserName, onBlur:onBlurUserName, dirty: userNameDirty} = useInputValidator();
        const {value: roleName, onChange:onChangeRoleName, onBlur:onBlurRoleName, dirty: roleNameDirty} = useInputValidator();


        const {inputValided: emailValided, clsOfInput: emailCls} = useValidation(emailValue, {isEmail: true}, clsOfInputs, emailDirty);
        const {inputValided: passwordValided, clsOfInput: passwordCls} = useValidation(passwordValue, {minLength: 6}, clsOfInputs,passwordDirty);
        const {inputValided: userNameValided, clsOfInput: userNameCls} = useValidation(userNameValue, {minLength: 4}, clsOfInputs,userNameDirty);
        const {inputValided: roleNameValided, clsOfInput: roleNameCls} = useValidation(roleName, {minLength: 4}, clsOfInputs,roleNameDirty);


        const formValided = useFormValidator(emailValided, passwordValided, userNameValided, roleNameValided);

        const roleToUpper = () => {
            const role = roleName.trim();

            if(role){
                return role.toUpperCase();
            };
        };


        const data = {
            username: userNameValue, 
            password: passwordValue,
            email: emailValue, 
            role: roleToUpper()
        };

        const update = () => {
            updateUserInfoAdmin(id, data);
            closeCardFunc(false);
        };

        return (
            <div className={cls.join(' ')}>
                <div className={['card card_update card_user-update', classes ? classes : ''].join(' ')}>
                    <div className="card__btn card__btn_close" onClick={closeCardFunc}>
                        close
                    </div>
                    <div className="card__input-box">
                        <Input value={userNameValue} changeValue={onChangeUserName} classes = {userNameCls} type = "text" onBlur={onBlurUserName}  placeholder='Username' />
                        <Input value={emailValue} changeValue={onChangeEmail} classes = {emailCls} type = "text" onBlur={onBlurEmail}  placeholder='Email' />
                        <Input value={passwordValue} changeValue={onChangePassword} classes = {passwordCls} type="password" onBlur={onBlurPassword}  placeholder='Password' />
                        <Input value={roleName} changeValue={onChangeRoleName} classes = {roleNameCls} type="text" onBlur={onBlurRoleName}  placeholder='Role' />
                    </div>
                    <div className={["card__btn", formValided ? '' : 'disable'].join(' ')}>
                        <div className="btn-box">
                            <Btn classes={'btn btn_send-data'} onClick={update}>
                                Update
                            </Btn>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}