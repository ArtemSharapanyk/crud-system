import React, { useContext, useEffect, useState } from 'react';
import Btn from '../components/Btn/Btn';
import Card from '../components/Card/Card'
import Loader from '../components/Loader/Loader';
import { HttpContext } from '../hooks/useHttp/HttpContext';
import { UserContext } from '../states/Context/userContext';


export default () => {
    const {allUsersArray, getAllUsers, deleteUser} = useContext(UserContext);

    const [updateCardVisible, setUpdateCardVisible] = useState(false);
    const [cardData,updateData] = useState(null);
    
    const showAndUpdateCardData = data => {
        updateData(data);
        setUpdateCardVisible(true);
    };

    const closeUpdateCard = () => {
        setUpdateCardVisible(false);
    };

    const renderElements = () => {
        if(allUsersArray){
                if(!allUsersArray.length){
                    return 'Array is empty';
                }else{
                    return allUsersArray.map(item => {
                        return <Card type={'user-card-list'} key={item.username + item.id + 'user card'} cardData={item}>
                            <Btn classes={'btn btn_send-data'} onClick={deleteUser.bind(this, item.id)}>
                                Delete
                            </Btn>
                            <Btn classes={'btn btn_send-data'} onClick={showAndUpdateCardData.bind(this, item.id)}>
                                Update
                            </Btn>
                        </Card>
                    });
                }
            }
        
    };

    const {load} = useContext(HttpContext);

    useEffect(() => {
        getAllUsers()
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
            <Card cardState={updateCardVisible} cardData={cardData} type={'user-update-card-admin'} closeCardFunc={closeUpdateCard}>

            </Card>
        </section>
    )
};