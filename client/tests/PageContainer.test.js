import React from 'react';
import 'babel-polyfill';
import {render} from '@testing-library/react';
import PageContainer from '../src/components/PageContainer/PageConatiner';
import componentsWithContext from './helpers/componentsWithContext';
import { BrowserRouter } from 'react-router-dom';

describe('PageContainer component should ', () => {
    it('render', () => {
        const {container} = render(
            <BrowserRouter>
                {componentsWithContext(PageContainer)}
            </BrowserRouter>
        )

        expect(container).toBeInTheDocument();
    });
});

