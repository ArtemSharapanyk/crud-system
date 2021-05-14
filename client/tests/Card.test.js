import { render,screen } from '@testing-library/react';
import 'babel-polyfill';
import React from 'react';
import Card from '../src/components/Card/Card';

describe('Card component should', () => {
    let component;

    beforeEach(() => {
        component = render(<Card/>);
    });

    it('render', () => {
        expect(component.container).toBeInTheDocument();
    });

    it('return profile-card', () => {
        const {getByTestId, container}= render(<Card />);

        // expect(getByTestId(container, 'profile-card')).toBeInTheDocument();

        screen.debug();
    });
});
