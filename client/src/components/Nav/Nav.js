import React, { useContext, useState } from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../states/Context/userContext';


export default () => {
    const {isAuth, role} = useSelector(state => state.User);

    const {logout} = useContext(UserContext);
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
                    {role === 'ADMIN' ? 
                        <li className="list-of-links__item">
                            <NavLink to='/user/profiles' activeClassName='list-of-links__item_active-link'>
                                All profiles        
                            </NavLink>
                        </li>
                        :
                        null
                    }
                    <li className="list-of-links__item">
                        <NavLink to='/user/userInfo' activeClassName='list-of-links__item_active-link'>
                            Your account       
                        </NavLink>
                    </li>
                    {role === 'ADMIN' ? 
                        <li className="list-of-links__item">
                            <NavLink to='/users/allUsers' activeClassName='list-of-links__item_active-link'>
                                All users        
                            </NavLink>
                        </li>
                        :
                        null
                    }
                    {role === 'ADMIN' ? 
                        <li className="list-of-links__item">
                            <NavLink to='/dashboard' activeClassName='list-of-links__item_active-link'>
                                Dashboard   
                            </NavLink>
                        </li>
                        :
                        null
                    }
                    <li className="list-of-links__item" onClick={logout}>
                        Logout            
                    </li>

                </>
            )
        }else{
            return (
                <>
                    <li className="list-of-links__item">
                        <NavLink to='/auth/reg' activeClassName='list-of-links__item_active'>
                            Register
                        </NavLink>
                    </li>
                    <li className="list-of-links__item">
                        <NavLink to='/auth/log' activeClassName='list-of-links__item_active'>
                            Login
                        </NavLink>
                    </li>
                </>
            )
        }
    };


    return (
        <nav className="menu" >
            <ul className={navCls.join(' ')} onClick={toggleMenu}>
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