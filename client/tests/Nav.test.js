import React from 'react';
import 'babel-polyfill';
import {render} from '@testing-library/react';
import Nav from '../src/components/Nav/Nav';
import componentWithContex from './helpers/componentsWithContext';
import { BrowserRouter } from 'react-router-dom';
import userEvents from '@testing-library/user-event';

describe('Nav component should', () => {
    it('render and handle a click to menu btn', () => {
        const {container, getByText} = render(
            <BrowserRouter>
                {componentWithContex(Nav)}
            </BrowserRouter>
        );

        expect(container).toBeInTheDocument();

        const toggleBtn = getByText('menu');
        userEvents.click(toggleBtn);
    });
});