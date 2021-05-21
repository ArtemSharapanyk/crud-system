import React, { useContext, useEffect, useState } from 'react';
import {Btn} from '../components/Btn/Btn';
import {Card} from '../components/Card/Card'
import {Loader} from '../components/Loader/Loader';
import { HttpContext } from '../hooks/useHttp/HttpContext';
import { UserContext } from '../states/Context/userContext';



export const AllUsers = () => {
    const {allUsersArray, getAllUsers, deleteUser, userInfo, getUserData} = useContext(UserContext);

    const [updateCardVisible, setUpdateCardVisible] = useState(false);
    const [cardData,updateData] = useState(null);
    
    const showAndUpdateCardData = data => {
        updateData(data);
        setUpdateCardVisible(true);
    };

    const closeUpdateCard = () => {
        setUpdateCardVisible(false);
    };

    const isNotYou = username => {
        if(userInfo){
            if(userInfo.username === username){
                return true
            }else{
                return false
            }
        }
    };


    const renderElements = () => {
        if(allUsersArray){
                if(!allUsersArray.length){
                    return 'Array is empty';
                }else{
                    return allUsersArray.map((item, i) => {
                        return <Card type={'user-card-list'} key={item.username + item.id + 'user card' + i} cardData={item}>
                            <Btn classes={'btn btn_send-data'} disabled={isNotYou(item.username)} onClick={deleteUser.bind(this, item.id)}>
                                Delete
                            </Btn>
                            <Btn classes={'btn btn_send-data'} onClick={showAndUpdateCardData.bind(this, item)}>
                                Update
                            </Btn>
                        </Card>
                    });
                }
            }
        
    };

    const {load} = useContext(HttpContext);

    useEffect(() => {
        getAllUsers();
        getUserData();
    }, [])

    if(load){
        return <Loader/>
    }

    return (
        <section className="page all-users-section">
            <div className="page__title">
                All users
            </div>
            <ul className="all-users-section__list-of-users">
                {renderElements()}
            </ul>
            
            {
                updateCardVisible ?
                    <Card cardData={cardData} cardState={updateCardVisible} type={'user-update-card-admin'} closeCardFunc={closeUpdateCard} />
                :
                    null
            
            }
        </section>
    )
};