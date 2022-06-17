import React from 'react';
import ForgotPasswordPage from "../../../pages/auth/ForgotPasswordPage";
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import { Provider as AuthProvider } from "../../../context/AuthContext";
import { render, act, fireEvent } from "@testing-library/react";

const projectContextValue = {
  state: {
    token: null,
    errorMessage: null,
    successMessage: null,
    username: null,
    userInfo: null,
  },
  forgotPassword: jest.fn(),
}

const testInstance = TestRenderer.create(<AuthProvider value={projectContextValue}><ForgotPasswordPage /></AuthProvider>).root;

describe('ForgotPassword render Page', () => {
  it('contains input', () => {
    expect(testInstance.findAllByType("input").length).toBe(1);
  });

  it('contains buttons', () => {
    expect(testInstance.findAllByType('button').length).toBe(1);
  });

  it('contains labels', () => {
    const res = render(<AuthProvider value={projectContextValue}> <ForgotPasswordPage /> </AuthProvider>);
    expect(res.getByText('Email address')).toBeInTheDocument();
    expect(res.queryByText('Password')).not.toBeInTheDocument();
  });

  it('shows an error message if the email address is not entered before clicking on the submit button', async () => {
    const res = render(<AuthProvider value={projectContextValue}> <ForgotPasswordPage /> </AuthProvider>);
    expect(res.queryByText('Veuillez saisir une adresse email')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent(
        res.getByTestId('submit-button'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    expect(res.queryByText('Veuillez saisir une adresse email')).toBeInTheDocument();
  });

});