import React from 'react';
import DrawerMenu from "../../components/DrawerMenu";
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import { Provider as ProjectProvider } from "../../context/ProjectContext";
import { fireEvent, act, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";


const projectContextValue = {
  state : {

  },
  refreshAllData : jest.fn(),
}
const testInstance = TestRenderer.create(<div id='root'><Router><ProjectProvider ><DrawerMenu isOpen={true} onClose={jest.fn()} /></ProjectProvider></Router></div>).root;

describe('The DrawerMenu component', () => {

  it('contains the right links and labels', () => {
    //Arrange
    const linksExpectedResults = [
      "http://localhost/projects-forfait",
      "http://localhost/projects-support",
      "http://localhost/chargeability",
      "http://localhost/activity",
    ]

    const labelsExpectedResults = [
      "Projets forfait",
      "Projets support",
      "Chargeabilité",
      "Activité",
    ]
    //Act
    let linksArray = [];
    let labelsArray = [];
    const res = render(<Router> <ProjectProvider > <DrawerMenu isOpen={true} onClose={jest.fn()} /> </ProjectProvider> </Router>);
    let columnHeaders = res.getAllByRole('link');
    for (let index = 0; index < columnHeaders.length; index++) {
      linksArray.push(columnHeaders[index].href);
      labelsArray.push(columnHeaders[index].textContent);
    }
    //Assert
    expect(linksArray).toEqual(linksExpectedResults);
    expect(labelsArray).toEqual(labelsExpectedResults);
  });

  it('should call refreshAllData() when we click on the refresh all button', async () => {

    //Act
    const res = render(<Router> <ProjectProvider value={projectContextValue}> <DrawerMenu isOpen={true} onClose={jest.fn()}/> </ProjectProvider> </Router>);
    await act(async () => {
      fireEvent(
        res.getByTestId('refresh-all-button'),
          new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
          })
      );
    });
    //Assert
    expect(projectContextValue.refreshAllData).toHaveBeenCalledTimes(1); //we can't test the params because of the callback
  });
  
});