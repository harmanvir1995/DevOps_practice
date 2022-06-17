import React from 'react';
import ProjectDetails from "../../pages/ProjectDetails";
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import { Provider as ProjectProvider } from "../../context/ProjectContext";
import {act, render, fireEvent} from "@testing-library/react";
import ReactTestUtils from 'react-dom/test-utils'
import { useToast } from "@chakra-ui/react";

//import {fireEvent} from '@testing-library/user-event'

//Arrange
const projectContextValueFull = {
  state: {
    projectDetails : {
        name: "BNMG4058 - Support et Maintenance site internet",
        clientName: "Nom du client",
        lastSync: "23/12/2021, 10:56:15",
        avatarURL: null,
        projectType: "service_desk",
        componentsInfos: [
            {
                componentName: "Miscellaneous",
                componentTimeSpent: 69.5,
                componentRAF: 181.25,
                componentTimeOriginalEstimate: 180,
                componentDelta: 111,
                componentTimeSpentPercent: 39,
            },
            {
              componentName: "Mobile",
              componentTimeSpent: 100,
              componentRAF: 50,
              componentTimeOriginalEstimate: 90,
              componentDelta: -10,
              componentTimeSpentPercent: 112,
          }
        ],
        totals: {
            totalTimeSpent: 69.5,
            totalRAF: 181.25,
            totalTimeOriginalEstimate: 180
        }
    },
  }, getProjectDetails: jest.fn()
};

const projectContextValueEmpty = {
  state: {
    projectDetails : null,
  }, getProjectDetails: jest.fn()
};

jest.mock('react-router', () => ({
  useParams: () => {return {projectKey: 'ineat2207'}}
}));
//Act
const testInstanceFull = TestRenderer.create(<ProjectProvider value={projectContextValueFull}><ProjectDetails /></ProjectProvider>).root;

describe('The project details component', () => {
  it('contains buttons', () => {
    expect(testInstanceFull.findAllByType('button').length).toBe(5);
  });

  it('tests the elements of the project details page without data', () => {
    
    const res = render(<ProjectProvider value={projectContextValueEmpty}> <ProjectDetails /> </ProjectProvider>);

    //Assert
    expect(res.getByText('Loading...')).toBeInTheDocument();

  });

  it('tests the elements surrounding the project details table', () => {
    
    const res = render(<ProjectProvider value={projectContextValueFull}> <ProjectDetails /> </ProjectProvider>);

    //Assert
    expect(res.getByText('Dernière synchronisation: 23/12/2021, 10:56:15')).toBeInTheDocument();
    expect(res.getByText('BNMG4058 - Support et Maintenance site internet')).toBeInTheDocument();
    expect(res.getByText('Nom du client')).toBeInTheDocument();

  });

  it('contains the right element in the header', () => {
    //Arrange
    const expectedResults = [
      "composantes",
      "Flag",
      "Estimé",
      "Utilisation",
      "Delta",
      "RAF",
      "%",
      "Total",
      "",
      "180h",
      "69h 30m",
      "110h 30m",
      "181h 15m",
      "39",
    ]
    //Act
    let headerArray = [];
    const res = render(<ProjectProvider value={projectContextValueFull}> <ProjectDetails /> </ProjectProvider>);
    let columnHeaders = res.getAllByRole('columnheader');
    for (let index = 0; index < columnHeaders.length; index++) {
      headerArray.push(columnHeaders[index].textContent);
    }
    //Assert
    expect(headerArray).toEqual(expectedResults);
  });

  it('contains the right elements in the table\'s body', () => {
    //Arrange
    const expectedResults = [
      "Miscellaneous",
      "",
      "180h",
      "70h",
      "111h",
      "182h",
      "39 %",
      "Mobile",
      "",
      "90h",
      "100h",
      "-10h",
      "50h",
      "112 %"
    ]
    //Act
    let cellValues = [];
    const res = render(<ProjectProvider value={projectContextValueFull}> <ProjectDetails /> </ProjectProvider>);
    let cells = res.getAllByRole('cell');
    for (let index = 0; index < cells.length; index++) {
      cellValues.push(cells[index].textContent);
    }
    //Assert
    expect(cellValues).toEqual(expectedResults);
  });

  it('should call getProjectDetails() 2 times, one at the beginning and one when we click on the refresh button', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValueFull}> <ProjectDetails /> </ProjectProvider>);
    await act(async () => {
      fireEvent(
        res.getByTestId('refresh-button'),
          new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
          })
      );
    });
    //Assert
    expect(projectContextValueFull.getProjectDetails).toHaveBeenNthCalledWith(1, true, null, "ineat2207");
    expect(projectContextValueFull.getProjectDetails).toHaveBeenCalledTimes(2); //we can't test the params because of the callback
  });


});
