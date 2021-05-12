import React, { useContext, useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import { UserContext } from '../states/Context/userContext';
import Loader from '../components/Loader/Loader';
import Btn from '../components/Btn/Btn';
import { HttpContext } from '../hooks/useHttp/HttpContext';

export default () => {
    const {userInfo, getUserData} = useContext(UserContext); 
    const {load} = useContext(HttpContext);

    const [updateCardState, setStateOfUpdateCard] = useState(false);

    useEffect(() => {
        getUserData();
    }, []);

    if(load){
        return <Loader/>
    }

    return (
        <section className="page user-info-section">
           <h2 className="page__title">
                User Info
            </h2>
           <div className="content">
               <Card type={'user-card'} cardData={userInfo ? userInfo : {username: null, email:null}} classes={'user-info-section__card'}>
                    <Btn classes={'btn btn_send-data btn_large'} onClick={setStateOfUpdateCard.bind(this,true)}>
                        Update
                    </Btn>
               </Card>

               <Card cardState={updateCardState} type={'user-update-card'} closeCardFunc={setStateOfUpdateCard.bind(this, false)}>

               </Card>
           </div>
        </section>
    )
};