import React from 'react';
import 'babel-polyfill';
import componentsWithContext from './helpers/componentsWithContext';
import CreateProfilePage from '../src/pages/CreateProfilePage';
import {render} from '@testing-library/react';

describe('CreateProfilePage should', () => {
    it('render', () => {
        const {container} = render(componentsWithContext(CreateProfilePage));

        expect(container).toBeInTheDocument()
    });
});
