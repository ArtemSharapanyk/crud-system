import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

export default () => {
    const {isAuth} = useSelector(state => state.User);
    const [visible, setVisible] = useState(false);

    const navCls = [
        'list-of-links menu__list-of-links',
        visible ? 'list-of-links_active' : 'list-of-links_hide'
    ];

    const btnMenuCls = [
        'btn menu-btn_hide-menu',
        visible ? 'menu-btn_hide-menu_active' : '' 
    ];

    const toggleMenu = () => {
        setVisible(visible => !visible);
    };

    const renderLinks = () => {
        if(isAuth){
            return (
                <>
                    <li className="list-of-links__item">
                        <NavLink to='/user/createProfile' activeClassName='list-of-links__item_active-link'>
                            Create Profile
                        </NavLink>
                    </li>
                    <li className="list-of-links__item">
                        <NavLink to='/user/:id/profiles' activeClassName='list-of-links__item_active-link'>
                            All profiles        
                        </NavLink>
                    </li>
                    <li className="list-of-links__item">
                        <NavLink to='/user/:id/account' activeClassName='list-of-links__item_active-link'>
                            Your account       
                        </NavLink>
                    </li>
                    <li className="list-of-links__item">
                        <NavLink to='/users' activeClassName='list-of-links__item_active-link'>
                            All users        
                        </NavLink>
                    </li>

                </>
            )
        }else{
            return (
                <>
                    <li className="list-of-links__item">
                        <NavLink to='/auth' activeClassName='list-of-links__item_active'>
                            Auth
                        </NavLink>
                    </li>
                </>
            )
        }
    };


    return (
        <nav className="menu">
            <ul className={navCls.join(' ')}>
                {renderLinks()}
            </ul>
            <div className={'btn menu-btn'} onClick={toggleMenu}>
                 menu
            </div>
            <div className={btnMenuCls.join(' ')} onClick={toggleMenu}>
                hide
            </div>
        </nav>
    )


};