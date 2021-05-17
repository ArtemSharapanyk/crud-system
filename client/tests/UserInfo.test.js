import 'babel-polyfill';
import React from 'react';
import {render} from '@testing-library/react';
import componentsWithContext from './helpers/componentsWithContext';
import UserInfo from '../src/pages/UserInfo';

describe('UserInfo component should', () => {
    it('render', () => {
        const {container} = render(componentsWithContext(UserInfo));

        expect(container).toBeInTheDocument();
    });
});
