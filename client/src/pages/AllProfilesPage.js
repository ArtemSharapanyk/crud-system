import React, { useContext, useEffect, useState } from 'react';
import Btn from '../components/Btn/Btn';
import Card from '../components/Card/Card'
import Loader from '../components/Loader/Loader';
import { HttpContext } from '../hooks/useHttp/HttpContext';
import { UserContext } from '../states/Context/userContext';

export default () => {
    const {getProfiles, profiles, deleteProfile} = useContext(UserContext);
    const [updateCardVisible, setUpdateCardVisible] = useState(false);
    const [cardData,updateData] = useState(null);

    const {load} = useContext(HttpContext);

    useEffect(() => {
        getProfiles();
    }, []);


    if(load){
        return <Loader/>
    }

    const showAndUpdateCardData = data => {
        updateData(data);
        setUpdateCardVisible(true);
    };

    const closeUpdateCard = () => {
        setUpdateCardVisible(false);
    };

    const renderElements = () => {
        if(profiles){
                if(!profiles.length){
                    return 'Profiles is empty';
                }else{
                    return profiles.map(item => {
                        return (
                            <>
                                <Card key={item.id + 'profile card'} cardState={updateCardVisible} cardData = {item}>
                                    <Btn classes={'btn btn_send-data'} onClick={showAndUpdateCardData.bind(this, item)}>
                                        Update
                                    </Btn>
    
                                    <Btn classes={'btn btn_send-data '} onClick={deleteProfile.bind(this, item.id)}>
                                        Delete
                                    </Btn>
                                </Card>
                            </>
                        )    
                    });
                }
            }
        
    };


    return(
        <section className="page all-profile-page">
           <h2 className="page__title">
                All your profiles
            </h2>
           <ul className="all-profile-page__profilea-list">
                {renderElements()}
           </ul>
           
           {
               updateCardVisible ?
                    <Card type={'profile-update-card'} cardState={updateCardVisible} cardData={cardData} closeCardFunc={closeUpdateCard}/>
                :
                    null
           }
        </section>
    )
};