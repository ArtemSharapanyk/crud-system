import { render,screen } from '@testing-library/react';
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import Card from '../src/components/Card/Card';
import UseHttp from '../src/hooks/useHttp/useHttp';
import { store } from '../src/redux/store/store';
import UserState from '../src/states/User/UserState';
import AlertState from '../src/states/Alert/AlertState';
import userEvents from '@testing-library/user-event';

describe('Card component should', () => {
    let component;

    beforeEach(() => {
        component = (Component, props) => {
            if(props){
                return (
                    <Provider store={store}>
                        <AlertState>
                            <UseHttp>
                                <UserState>
                                    <Component {...props} />
                                </UserState>
                            </UseHttp>
                        </AlertState>
                    </Provider>
                )
            }else{
                return (
                    <Provider store={store}>
                        <AlertState>
                            <UseHttp>
                                <UserState>
                                    <Component />
                                </UserState>
                            </UseHttp>
                        </AlertState>
                    </Provider>
                )
            }
        };
    });

    it('render', () => {
        const {container} = render(<Card/>)
        expect(container).toBeInTheDocument();
    });

    it('return user-card', () => {
        const {getByText}= render(<Card type={'user-card'} />);

        expect(getByText('User name:')).toBeInTheDocument();

    });

    it('return user-card-list', () => {
        const {getByText}= render(<Card type={'user-card-list'} />);

        expect(getByText('User name:')).toBeInTheDocument();

    });

    it('return profile-update-card and update by click', () => {
       
        const {getByText} = render(
            component(Card, {
                type: 'profile-update-card',
                closeCardFunc:jest.fn()
            })
        );

        expect(getByText('close')).toBeInTheDocument();
        const btn = getByText('Update');

        userEvents.click(btn);
    });

    it('return user-update-card-admin and do update action after click', () => {
        const {getByText} = render(
            component(Card, {
                type: 'user-update-card-admin',
                closeCardFunc:jest.fn()
            })
        );

        expect(getByText('close')).toBeInTheDocument();

        const updateBtn = getByText('Update');
        userEvents.click(updateBtn);
    });

    it('return user-update-card', () => {
        const {getByText} = render(
            component(Card, {
                type: 'user-update-card-admin',
                closeCardFunc:jest.fn()
            })
        );

        expect(getByText('close')).toBeInTheDocument();

        const updateBtn = getByText('Update');
        userEvents.click(updateBtn);
        
    });

    it(`return truthly data if we have props classes`,() => {
        const {getByText} = render(
            component(Card, {
                classes: true
            })
        );
    });
});
