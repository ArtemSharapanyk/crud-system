import React, { useContext, useEffect } from 'react'
import Card from '../components/Card/Card'
import { UserContext } from '../states/userContext';
import Loader from '../components/Loader/Loader';
import Btn from '../components/Btn/Btn';

export default () => {
    const {userInfo, getUserData,load} = useContext(UserContext); 

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
                    <Btn classes={'btn btn_send-data btn_large'}>
                        Update
                    </Btn>
               </Card>
           </div>
        </section>
    )
};