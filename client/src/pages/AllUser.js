import React, { useContext, useEffect } from 'react'
import Btn from '../components/Btn/Btn';
import Card from '../components/Card/Card'
import Loader from '../components/Loader/Loader';
import { UserContext } from '../states/userContext';


export default () => {
    const {allUsersArray, getAllUsers,load} = useContext(UserContext);

    useEffect(() => {
        getAllUsers()
    }, [])

    if(load){
        return <Loader/>
    }

    const renderItems = () => {
        if(allUsersArray){
            if(!allUsersArray.length){
                return 'Array is empty'
            }else{
                return allUsersArray.map(item => {
                    return <Card type={'user-card-list'} key={item.username + 'user card'} cardData={item}>
                        <Btn classes={'btn btn_send-data'}>
                            Delete
                        </Btn>
                        <Btn classes={'btn btn_send-data'}>
                            Profiles
                        </Btn>
                        <Btn classes={'btn btn_send-data'}>
                            Update
                        </Btn>
                    </Card>
                });
            }
        }
    };


    return (
        <section className="page all-users-section">
            <div className="page__title">
                All users
            </div>
            <ul className="grid all-users-section__list-of-users">
                {renderItems()}
            </ul>
        </section>
    )
};