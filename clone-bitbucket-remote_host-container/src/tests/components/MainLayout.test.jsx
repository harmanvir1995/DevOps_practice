import React from 'react';
import MainLayout from "../../components/MainLayout";
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import { Provider as AuthProvider } from "../../context/AuthContext";
import { Provider as ProjectProvider } from "../../context/ProjectContext";
import { act, fireEvent, render } from "@testing-library/react";

const authContextValue = {
  state: {
    token: null,
    errorMessage: null,
    successMessage: null,
    username: null,
    userInfo: null,
  },
  getUserInfo: jest.fn(),
  signout: jest.fn(),
}

const authContextValueUserAvatar = {
  state: {
    token: null,
    errorMessage: null,
    successMessage: null,
    username: 'Henri',
    userInfo: {Avatar:{url:"avatar"}},
  },
  getUserInfo: jest.fn(),
  signout: jest.fn(),
}

const projectContextValue = {
  state: { },
  refreshAllData: jest.fn(),
}

/*jest.mock("../../components/DrawerMenu", () => ({
        DrawerMenu: ({ isOpen, onClose }) => {
            return <div> </div>;
        },
}));*/


//const testInstance = TestRenderer.create(<AuthProvider value={projectContextValue}><MainLayout /></AuthProvider>).root;
describe('The MainLayout component', () => {
  it('should call getUserInfo()', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValue}><AuthProvider value={authContextValue}> <MainLayout /> </AuthProvider></ProjectProvider>);
    //Assert
    expect(authContextValue.getUserInfo).toHaveBeenCalledTimes(1);
  });

  it('should have the avatar', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValue}><AuthProvider value={authContextValueUserAvatar}> <MainLayout /> </AuthProvider></ProjectProvider>);
    //Assert
    expect(res.queryByAltText('Avatar')).toBeInTheDocument();
  });

  it('should have the user name', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValue}><AuthProvider value={authContextValueUserAvatar}> <MainLayout /> </AuthProvider></ProjectProvider>);
    //Assert
    expect(res.queryByText('Henri')).toBeInTheDocument();
  });
/*
  it('kjgkjjh', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValue}><AuthProvider value={authContextValue}> <MainLayout /> </AuthProvider></ProjectProvider>);

    expect(res.getByTestId('testneedtosee')).not.toBeVisible();
    await act(async () => {
      const element = res.getByTestId('menu-button-id');
      //fireEvent.keyDown(element, { key: " " });
      //fireEvent.keyUp(element, { key: " " });
      fireEvent.click(element);
     /* fireEvent(
        res.getByTestId('menu-button-id'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    expect(res.getByTestId('testneedtosee')).toBeVisible();

  });*/

  it('call diconection function when clik on button se deconecter.', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValue}><AuthProvider value={authContextValue}> <MainLayout /> </AuthProvider></ProjectProvider>);

    await act(async () => {      
      fireEvent(
        res.getByText('Se déconnecter'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    expect(authContextValue.signout).toHaveBeenCalledTimes(1);

  });
});