import React from 'react';
import LoginPage from "../../../pages/auth/LoginPage";
import TestRenderer from 'react-test-renderer';
import { Provider as AuthProvider } from "../../../context/AuthContext";
import { render, act, fireEvent, waitFor } from "@testing-library/react";

const authContextValue = {
  state: {
    token: null,
    errorMessage: null,
    successMessage: null,
    username: null,
    userInfo: null,
  },
  signin: jest.fn(),
}

const testInstance = TestRenderer.create(<AuthProvider value={authContextValue}><LoginPage /></AuthProvider>).root;

describe('Login render Page', () => {
  it('contains input', () => {
    expect(testInstance.findAllByType("input").length).toBe(2);
  });

  it('contains buttons', () => {
    expect(testInstance.findAllByType('button').length).toBe(2);
  });

  it('contains labels', () => {
    const res = render(<AuthProvider value={authContextValue}> <LoginPage /> </AuthProvider>);
    expect(res.getByText('Email address')).toBeInTheDocument();
    expect(res.getByText('Password')).toBeInTheDocument();
  });

  it('shows an error message if the email address is not entered before clicking on the login button', async () => {
    const res = render(<AuthProvider value={authContextValue}> <LoginPage /> </AuthProvider>);
    expect(res.queryByText('Veuillez saisir une adresse email')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent(
        res.getByTestId('login-button'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    expect(res.queryByText('Veuillez saisir une adresse email')).toBeInTheDocument();
  });

  it('shows an error message if the email address entered has the wrong format', async () => {
    const res = render(<AuthProvider value={authContextValue}> <LoginPage /> </AuthProvider>);
    const value = '1234';
    const emailInput = res.getByTestId('email-input');
    const button = res.getByTestId('login-button');

    expect(res.queryByText('Entrez une adresse email valide')).not.toBeInTheDocument();
    await act(async () => {

      fireEvent.focus(emailInput);
      fireEvent.change(emailInput, { target: { value } });

      const inputHasValue = res.getByDisplayValue(value);
      expect(inputHasValue).toBeInTheDocument();

      fireEvent.blur(emailInput);

      fireEvent(
        button,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });

    
    expect(await res.findByText('Entrez une adresse email valide')).toBeInTheDocument();
    
  });

});