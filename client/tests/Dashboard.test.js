import 'babel-polyfill';
import React from 'react';
import {render} from '@testing-library/react';
import componentsWithContext from './helpers/componentsWithContext';
import Dashboard from '../src/pages/Dashboard';

describe('Dashboard component should', () => {
    it('render', () => {
        const {container} = render(componentsWithContext(Dashboard, true));

        expect(container).toBeInTheDocument();
    });
})