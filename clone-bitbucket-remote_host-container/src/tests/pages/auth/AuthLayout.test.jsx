import React from 'react';
import AuthLayout from "../../../pages/auth/AuthLayout";
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom'


jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ pathname : '/forgot-password'})
  .mockReturnValueOnce({ pathname : '/login'})
}));

const testInstance1 = TestRenderer.create(<AuthLayout />).root;
const testInstance2 = TestRenderer.create(<AuthLayout />).root;

describe('AuthLayout render Page', () => {
  it('contains an image', () => {
    expect(testInstance1.findAllByType("img").length).toBe(1);
  });

  it('contains a link to forgot-password page', () => {
    expect(testInstance1.findAllByProps({to:"/forgot-password"}).length).toBe(3);
    expect(testInstance1.findAllByProps({to:"/login"}).length).toBe(0);
  });

  it('contains a link to the login page', () => {
    expect(testInstance2.findAllByProps({to:"/forgot-password"}).length).toBe(0);
    expect(testInstance2.findAllByProps({to:"/login"}).length).toBe(3);
  });

});