import React, { useContext, useEffect } from 'react';
import { Context as AuthContext, Provider as AuthProvider } from "../../context/AuthContext";
import { render, act } from "@testing-library/react";
import { Text } from "@chakra-ui/react";

window.localStorage.__proto__.getItem = () => { return "Test" };
window.localStorage.__proto__.setItem = jest.fn();
window.localStorage.__proto__.removeItem = jest.fn();

jest.mock("../../api/strapiApi.js", () => ({
    post: (parameter1, parameter2) => {return {data: {jwt: 'tokenMock', user: {username: 'usernameMock'}}}},
    defaults: { headers: { common: {}}},
    get: (parameter1) => {return {data: 'user data'}},
    interceptors: { response: {use: (parameter1, parameter2) => {} } },
}))

const TestComponent = ({ functionToTest, param1 = null, param2 = null, param3 = null }) => {
    const authContext = useContext(AuthContext);
    let toTest = authContext[functionToTest];
    useEffect(async () => {
        toTest(param1, param2, param3);
    }, [])
    return <>
        <Text data-testid='state-username'>{authContext.state.username}</Text>
        <Text data-testid='state-token'>{authContext.state.token}</Text>
        <Text data-testid='state-errorMessage'>{authContext.state.errorMessage}</Text>
        <Text data-testid='state-successMessage'>{authContext.state.successMessage}</Text>
        <Text data-testid='state-userInfo'>{authContext.state.userInfo}</Text>
    </>
}

describe('Tests AuthContext functions', () => {

    it('tests tryLocalSignin', async () => {
        let res;
        await act(async () => {
            res = render(<AuthProvider><TestComponent functionToTest="tryLocalSignin" param1={true} param2={null} param3={"cat"} /></AuthProvider>);
        });
        expect(res.getByTestId('state-username').textContent).toEqual('Test');
        expect(res.getByTestId('state-token').textContent).toEqual('Test');
    });

    it('tests clearErrorMessage', async () => {
        let res;
        await act(async () => {
            res = render(<AuthProvider ><TestComponent functionToTest="clearErrorMessage" param1={true} param2={null} param3={"cat"} /></AuthProvider>);
        });
        expect(res.getByTestId('state-errorMessage').textContent).toEqual('');
    });

    it('tests signin', async () => {
        let res;
        await act(async () => {
            res = render(<AuthProvider ><TestComponent functionToTest="signin" param1={{email: 'email', password: 'password'}}  /></AuthProvider>);
        });
        expect(res.getByTestId('state-token').textContent).toEqual('tokenMock');
        expect(res.getByTestId('state-username').textContent).toEqual('usernameMock');
        expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith("token", "tokenMock"); //tests if data have been saved in the cache
        expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith("username", "usernameMock");
    });

    it('tests signout', async () => {
        let res;
        await act(async () => {
            res = render(<AuthProvider ><TestComponent functionToTest="signout" param1={null}  /></AuthProvider>);
        });
        expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledWith("token"); //tests if data have been saved in the cache
        expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledWith("username");
    });

    it('tests forgotPassword', async () => {
        let res;
        await act(async () => {
            res = render(<AuthProvider ><TestComponent functionToTest="forgotPassword" param1={{email: 'emailValue'}}  /></AuthProvider>);
        });
        expect(res.getByTestId('state-successMessage').textContent).toEqual('Un email vous a été envoyé');
    });

    it('tests getUserInfo', async () => {
        let res;
        await act(async () => {
            res = render(<AuthProvider ><TestComponent functionToTest="getUserInfo" /></AuthProvider>);
        });
        expect(res.getByTestId('state-userInfo').textContent).toEqual('user data');
    });
});