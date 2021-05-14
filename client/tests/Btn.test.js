import { render } from '@testing-library/react';
import 'babel-polyfill';
import React from 'react';
import Btn from '../src/components/Btn/Btn';



describe('Btn component should', () => {
    it('render', () => {
        const {container} = render(<Btn/>);

        expect(container).toBeInTheDocument();
    });
});