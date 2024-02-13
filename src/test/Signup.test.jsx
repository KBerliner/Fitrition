import { beforeEach, describe, expect } from 'vitest';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Signup from '../components/Signup/Signup';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('control test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    })

    it('should render', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Signup />
                </BrowserRouter>
            </Provider>
        )
        const header = screen.getByText('Sign Up Here');
        let result = false;
        header ? result = true : result = false;
        
        expect(result).toBe(true);
        })
})

describe('Form Submission', () => {
    it('should initialize with no content in any fields and a disabled submit button', () => {
        // Setup
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Signup />
                </BrowserRouter>
            </Provider>
        );
        const submitBtn = screen.getByTestId('submitButton');
        const usernameInput = screen.getByTestId('usernameInput');
        const emailInput = screen.getByTestId('emailInput');
        const passwordInput = screen.getByTestId('passwordInput');

        const expected = true;
        let result = false;

        // Exercise
        if (submitBtn.getAttributeNames().includes('disabled')
        && usernameInput.value.length < 1
        && emailInput.value.length < 1
        && passwordInput.value.length < 1) {
            result = true;
        }

        // Verify
        expect(result).toBe(expected);
    })

    describe('input fields', () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Signup />
                    </BrowserRouter>
                </Provider>
            );
        })
        describe('username field', () => {
            it('should correctly display value as a stateless element', async () => {
                // Setup
                const usernameInput = screen.getByTestId('usernameInput');

                const text = 'example username';
                
                // Exercise
                await userEvent.type(usernameInput, text);

                // Verify
                expect(usernameInput.value).toBe(text);
                
                // Cleanup
                await userEvent.clear(screen.getByTestId('usernameInput'));
            })
        })

        describe('email field', () => {

        })

        describe('password field', () => {

        })
    })
})