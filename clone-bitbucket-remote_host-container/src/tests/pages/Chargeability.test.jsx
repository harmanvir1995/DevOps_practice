import React from 'react';
import Chargeability from "../../pages/Chargeability";
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom'
import { Provider as ProjectProvider } from "../../context/ProjectContext";
import {render, act, fireEvent} from "@testing-library/react";
import ReactTestUtils from 'react-dom/test-utils'

//Arrange
const projectContextValue = {
  state: {
    chargeability: {
        lastSync: "23/12/2021, 10:56:13",
        employeesWorkingHours: [
          {
              "name": "Baiyu HUO",
              "billable": 5,
              "nonBillable": 8,
              "objective": 100,
              "photoURL": null,
              "totalHoursWorked": 13,
              "objectiveHours": 13,
              "grossChargeability": 39,
              "netChargeability": 63
          },
          {
              "name": "Hugo Leconte",
              "billable": 0,
              "nonBillable": 8,
              "objective": 0,
              "photoURL": null,
              "totalHoursWorked": 8,
              "objectiveHours": 0,
              "grossChargeability": 0,
              "netChargeability": null
          },
          {
              "name": "Ethan Benabou",
              "billable": 0,
              "nonBillable": 5,
              "objective": 0,
              "photoURL": null,
              "totalHoursWorked": 5,
              "objectiveHours": 0,
              "grossChargeability": 0,
              "netChargeability": null
          }
      ]        
    },
  }, getEmployeesWorktime: jest.fn()
};

const projectContextValueEmpty = {
  state: {
    chargeability: null,
  }, getEmployeesWorktime: jest.fn()
};

//Act
const testInstance = TestRenderer.create(<ProjectProvider value={projectContextValue}><Chargeability /></ProjectProvider>).root;

describe('The chargeability component', () => {
  it('contains buttons', () => {
    expect(testInstance.findAllByType('button').length).toBe(5);
  });

  it('contains inputs', () => {
    expect(testInstance.findAllByType('input').length).toBe(2);
  });

  it('tests the elements surrounding the project details table', () => {
    
    //Act
    const res = render(<ProjectProvider value={projectContextValue}> <Chargeability /> </ProjectProvider>);
    //Assert
    expect(res.getByText('Dernière synchronisation : 23/12/2021, 10:56:13')).toBeInTheDocument();
    expect(res.getByText('Chargeabilité')).toBeInTheDocument();

  });

  it('tests the elements of the chargeability page without data', () => {
    
    const res = render(<ProjectProvider value={projectContextValueEmpty}> <Chargeability /> </ProjectProvider>);
    //Assert
    expect(res.getByText('Loading...')).toBeInTheDocument();

  });

  it('contains the right element in the header', () => {
    //Arrange
    const expectedResults = [
      "Employé.e",
      "Heures travaillées (total)",
      "Facturable",
      "Non-facturable",
      "Objectif (h)",
      "Objectif (%)",
      "Chargeabilité brute",
      "Chargeabilité nette",
      "",
      "Total",
       "26h",
       "5h",
       "21h",
       "13h",
       "50 %",
       "20 %",
       "39 %",
    ]
    //Act
    let headerArray = [];
    const res = render(<ProjectProvider value={projectContextValue}> <Chargeability /> </ProjectProvider>);
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
      "",
      "Baiyu HUO",
      "13h",
      "5h",
      "8h",
      "13h",
      "100 %",
      "39 %",
      "63 %",
      "",
      "Hugo Leconte",
      "8h",
      "0h",
      "8h",
      "0h",
      "0 %",
      "0 %",
      "0 %",
      "",
      "Ethan Benabou",
      "5h",
      "0h",
      "5h",
      "0h",
      "0 %",
      "0 %",
      "0 %",
    ]
    //Act
    let cellValues = [];
    const res = render(<ProjectProvider value={projectContextValue}> <Chargeability /> </ProjectProvider>);
    let cells = res.getAllByRole('cell');
    for (let index = 0; index < cells.length; index++) {
      cellValues.push(cells[index].textContent);
    }
    //Assert
    expect(cellValues).toEqual(expectedResults);
  });

  it('should call getEmployeesWorktime() 2 times, one at the beginning and one when we click on the refresh button', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValue}> <Chargeability /> </ProjectProvider>);
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
    //expect(projectContextValue.getEmployeesWorktime).toHaveBeenNthCalledWith(1, true, null, "ineat2207");
    expect(projectContextValue.getEmployeesWorktime).toHaveBeenCalledTimes(2); //we can't test the params because of the callback
  });
});
