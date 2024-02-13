import { beforeEach, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from '../components/Signup/Signup';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter, Navigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

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

    it('should be submittable with valid content in all fields', async () => {
        // Setup
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Signup />
                </BrowserRouter>
            </Provider>
        );

        const usernameInput = screen.getByTestId('usernameInput');
        const emailInput = screen.getByTestId('emailInput');
        const passwordInput = screen.getByTestId('passwordInput');
        const submitButton = screen.getByTestId('submitButton');

        // Exercise
        await userEvent.type(usernameInput, 'example username');
        await userEvent.type(emailInput, 'example@gmail.com');
        await userEvent.type(passwordInput, 'passwordexample');

        // Verify
        expect(submitButton.getAttributeNames().includes('disabled')).toBe(false);

        // Cleanup
        await userEvent.clear(usernameInput);
        await userEvent.clear(emailInput);
        await userEvent.clear(passwordInput);
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
                await userEvent.clear(usernameInput);
            })

            it('should invalidate script', async () => {
                // Setup
                const usernameInput = screen.getByTestId('usernameInput');
                const emailInput = screen.getByTestId('emailInput');
                const passwordInput = screen.getByTestId('passwordInput');
                const submitButton = screen.getByTestId('submitButton');

                const text = '<script>console.log(\'hacked\');</script>'

                // Exercise
                await userEvent.type(usernameInput, text);
                await userEvent.type(emailInput, 'example@gmail.com');
                await userEvent.type(passwordInput, 'passwordexample');

                // Verify
                expect(submitButton.getAttributeNames().includes('disabled')).toBe(true);

                // Cleanup
                await userEvent.clear(usernameInput);
                await userEvent.clear(emailInput);
                await userEvent.clear(passwordInput);
            })
        })

        describe('email field', () => {
            it('should correctly display value as a stateless element', async () => {
                // Setup
                const emailInput = screen.getByTestId('passwordInput');

                const text = 'example@gmail.com';
                
                // Exercise
                await userEvent.type(emailInput, text);

                // Verify
                expect(emailInput.value).toBe(text);
                
                // Cleanup
                await userEvent.clear(emailInput);
            })

            it('should invalidate anything other than a valid email format (x@y.z), testing x@y.', async () => {
                // Setup
                const usernameInput = screen.getByTestId('usernameInput');
                const emailInput = screen.getByTestId('emailInput');
                const passwordInput = screen.getByTestId('passwordInput');
                const submitButton = screen.getByTestId('submitButton');

                const text = 'example@gmail.'

                // Exercise
                await userEvent.type(usernameInput, 'example username');
                await userEvent.type(emailInput, text);
                await userEvent.type(passwordInput, 'passwordexample');

                // Verify
                expect(submitButton.getAttributeNames().includes('disabled')).toBe(true);

                // Cleanup
                await userEvent.clear(usernameInput);
                await userEvent.clear(emailInput);
                await userEvent.clear(passwordInput);
            })

            it('should invalidate anything other than a valid email format (x@y.z), testing xy.z', async () => {
                // Setup
                const usernameInput = screen.getByTestId('usernameInput');
                const emailInput = screen.getByTestId('emailInput');
                const passwordInput = screen.getByTestId('passwordInput');
                const submitButton = screen.getByTestId('submitButton');

                const text = 'examplegmail.com'

                // Exercise
                await userEvent.type(usernameInput, 'example username');
                await userEvent.type(emailInput, text);
                await userEvent.type(passwordInput, 'passwordexample');

                // Verify
                expect(submitButton.getAttributeNames().includes('disabled')).toBe(true);

                // Cleanup
                await userEvent.clear(usernameInput);
                await userEvent.clear(emailInput);
                await userEvent.clear(passwordInput);
            })

            it('should invalidate anything other than a valid email format (x@y.z), testing @y.z', async () => {
                // Setup
                const usernameInput = screen.getByTestId('usernameInput');
                const emailInput = screen.getByTestId('emailInput');
                const passwordInput = screen.getByTestId('passwordInput');
                const submitButton = screen.getByTestId('submitButton');

                const text = '@gmail.com'

                // Exercise
                await userEvent.type(usernameInput, 'example username');
                await userEvent.type(emailInput, text);
                await userEvent.type(passwordInput, 'passwordexample');

                // Verify
                expect(submitButton.getAttributeNames().includes('disabled')).toBe(true);

                // Cleanup
                await userEvent.clear(usernameInput);
                await userEvent.clear(emailInput);
                await userEvent.clear(passwordInput);
            })

            it('should invalidate anything other than a valid email format (x@y.z), testing x@yz', async () => {
                // Setup
                const usernameInput = screen.getByTestId('usernameInput');
                const emailInput = screen.getByTestId('emailInput');
                const passwordInput = screen.getByTestId('passwordInput');
                const submitButton = screen.getByTestId('submitButton');

                const text = 'example@gmailcom'

                // Exercise
                await userEvent.type(usernameInput, 'example username');
                await userEvent.type(emailInput, text);
                await userEvent.type(passwordInput, 'passwordexample');

                // Verify
                expect(submitButton.getAttributeNames().includes('disabled')).toBe(true);

                // Cleanup
                await userEvent.clear(usernameInput);
                await userEvent.clear(emailInput);
                await userEvent.clear(passwordInput);
            })
        })

        describe('password field', () => {
            it('should correctly display value as a stateless element', async () => {
                // Setup
                const passwordInput = screen.getByTestId('passwordInput');

                const text = 'examplepassword';
                
                // Exercise
                await userEvent.type(passwordInput, text);

                // Verify
                expect(passwordInput.value).toBe(text);
                
                // Cleanup
                await userEvent.clear(passwordInput);
            })

            it('should invalidate script', async () => {
                // Setup
                const usernameInput = screen.getByTestId('usernameInput');
                const emailInput = screen.getByTestId('emailInput');
                const passwordInput = screen.getByTestId('passwordInput');
                const submitButton = screen.getByTestId('submitButton');

                const text = '<script>console.log(\'hacked\');</script>'

                // Exercise
                await userEvent.type(usernameInput, 'example username');
                await userEvent.type(emailInput, 'example@gmail.com');
                await userEvent.type(passwordInput, text);

                // Verify
                expect(submitButton.getAttributeNames().includes('disabled')).toBe(true);

                // Cleanup
                await userEvent.clear(usernameInput);
                await userEvent.clear(emailInput);
                await userEvent.clear(passwordInput);
            })
        })
    })

    describe('persistence check', () => {
        it('should automatically navigate to the nutrition page if there\'s already a jwt', () => {
            // Setup
            localStorage.setItem('token', 'exampletoken');

            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            );

            // Verify
            // console.log('HITHIT', localStorage.getItem('token'));
            // screen.debug(null, Infinity);
            expect(screen.getByTestId('nutrition')).toBeVisible();

            // Cleanup
            localStorage.removeItem('token');
        })
    })
})