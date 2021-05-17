import 'babel-polyfill';
import React from 'react';
import Alert from '../src/components/Alert/Alert';
import {render,screen} from '@testing-library/react';
import AlertState from '../src/states/Alert/AlertState';


describe('alert component should', () => {
    it('render', () => {
        const {container} = render(
            <AlertState>
                <Alert/>
            </AlertState>
        );

        expect(container).toBeInTheDocument();
    });
});