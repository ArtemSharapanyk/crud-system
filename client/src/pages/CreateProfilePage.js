import React from 'react'
import Input from '../components/Input/Input';

export default () => {
    return (
        <section className="page create-profile-section">
           <h2 className="page__title">
                Create Profile
            </h2>
            <div className="page__form-block">
                <Input value=''  specialClass='auth-section__input' placeholder='Profile name' />
                <Input value=''  specialClass='auth-section__input' placeholder='Type of work' />
                <Input value=''  specialClass='auth-section__input' placeholder='Goals' />
                <Input value=''  specialClass='auth-section__input'  placeholder='Your minds' />
            </div>
            <div className="wrapper">
                <div className="btn btn_large btn_send-data create-profile-section__btn">
                    Create
                </div>
            </div>
        </section>
    )
};