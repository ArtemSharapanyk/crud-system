import 'babel-polyfill';
import React from 'react';
import {render} from '@testing-library/react';
import componentsWithContext from './helpers/componentsWithContext';
import AllUsers from '../src/pages/AllUsers';
import userEvents from '@testing-library/user-event';


describe('AllUsers component should', () => {
    it('render and handle a click to btn', () => {
        const {container, getByText} = render(componentsWithContext(AllUsers));

        expect(container).toBeInTheDocument();

        const btn = getByText('Update');
        userEvents.click(btn);
    });

    
});
