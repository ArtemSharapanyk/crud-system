import 'babel-polyfill';

import React from 'react';

import {render} from '@testing-library/react';
import App from '../src/App';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store/store';


describe('app component should', () => {
    it('render', () => {
        const app = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        expect(app.container).toBeInTheDocument();
    });
});