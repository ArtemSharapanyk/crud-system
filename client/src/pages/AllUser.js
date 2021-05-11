import React, { useContext, useEffect } from 'react'
import Btn from '../components/Btn/Btn';
import Card from '../components/Card/Card'
import Loader from '../components/Loader/Loader';
import { HttpContext } from '../hooks/useHttp/HttpContext';
import { UserContext } from '../states/Context/userContext';


export default () => {
    const {allUsersArray, getAllUsers} = useContext(UserContext);

    const {load} = useContext(HttpContext);

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
                    return <Card type={'user-card-list'} key={item.username + item.id + 'user card'} cardData={item}>
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
            <ul className="all-users-section__list-of-users">
                {renderItems()}
            </ul>
        </section>
    )
};