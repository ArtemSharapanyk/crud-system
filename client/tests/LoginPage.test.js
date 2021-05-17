import 'babel-polyfill';
import React from 'react';
import {render} from '@testing-library/react';
import Login from '../src/pages/Login';
import componentsWithContext from './helpers/componentsWithContext';


describe('Login page component should', () => {
    let component;

    beforeEach(() => {
        component = componentsWithContext
    });

    it('render', () => {
        const {container} = render(component(Login));

        expect(container).toBeInTheDocument();
    })
}) ;
