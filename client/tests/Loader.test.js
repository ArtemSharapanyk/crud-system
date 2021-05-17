import 'babel-polyfill';
import React from 'react';
import {render} from '@testing-library/react';
import Loader from '../src/components/Loader/Loader';

describe('Loader should', () => {
    it('render', () => {
        const {container} = render(
            <Loader/>
        );

        expect(container).toBeInTheDocument();
    });
});
