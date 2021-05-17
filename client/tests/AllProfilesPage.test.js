import React from 'react';
import 'babel-polyfill';
import {render} from '@testing-library/react';
import componentsWithContext from './helpers/componentsWithContext';
import AllProfilesPage from '../src/pages/AllProfilesPage';

describe('All profile component should', () => {
    it('render', () => {
        const {container} = render(
            componentsWithContext(AllProfilesPage)
        );

        expect(container).toBeInTheDocument();
    });
});
