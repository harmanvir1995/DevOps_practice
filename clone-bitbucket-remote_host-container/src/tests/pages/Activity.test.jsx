import React from 'react';
import Activity from "../../pages/Activity";
import TestRenderer from 'react-test-renderer';
import { Provider as ProjectProvider } from "../../context/ProjectContext";
import {act, fireEvent, render} from "@testing-library/react";

//Arrange
const projectContextValue = {
  state: {
    activity: {
      "lastSync": "23/12/2021, 10:56:15",
      "employeesActivity": [
        {
            "name": "Clauvis Kitieu",
            "photoURL": null,
            "Interne": 0,
            "Projet": 24,
            "Avant-vente": 20,
            "Support": 0,
            "Consulting": 16,
            "R&D": 36,
            "Escouade": 0,
            "totalHoursWorked": 96
        },
        {
            "name": "Philippe Blanchette",
            "photoURL": null,
            "Interne": 64,
            "Projet": 0,
            "Avant-vente": 0,
            "Support": 16,
            "Consulting": 0,
            "R&D": 0,
            "Escouade": 0,
            "totalHoursWorked": 80
        },
    ],
      "categoriesLabelsList": [
        "Interne",
        "Projet",
        "Avant-vente",
        "Support"
      ]
    },
  }, getEmployeesActivity: jest.fn()
};

//Act
const testInstance = TestRenderer.create(<ProjectProvider value={projectContextValue}><Activity /></ProjectProvider>).root;

describe('The activity component', () => {
  it('contains buttons', () => {
    expect(testInstance.findAllByType('button').length).toBe(5);
  });

  it('contains inputs', () => {
    expect(testInstance.findAllByType('input').length).toBe(2);
  });

  it('tests the elements of the activity page without data', () => {
    
    //Act
    const res = render(<ProjectProvider value={projectContextValue}> <Activity /> </ProjectProvider>);

    //Assert
    expect(res.getByText('Dernière synchronisation : 23/12/2021, 10:56:15')).toBeInTheDocument();
    expect(res.getByText('Activité')).toBeInTheDocument();

  });

  it('contains the right elements in the header', () => {
    //Arrange
    const expectedResults = [
      "Employé.e",
      "Interne",
      "Projet",
      "Avant-vente",
      "Support",
      "Heures travaillées (total)",
      "",
      "Total",
      "64h",
      "24h",
      "20h",
      "16h",
      "176h",
    ]
    //Act
    let headerArray = [];
    const res = render(<ProjectProvider value={projectContextValue}> <Activity /> </ProjectProvider>);
    let columnHeaders = res.getAllByRole('columnheader');
    for (let index = 0; index < columnHeaders.length; index++) {
      headerArray.push(columnHeaders[index].textContent);
    }
    //Assert
    expect(headerArray).toEqual(expectedResults);
  });

  it('should call getEmployeesActivity() 2 times, one at the beginning and one when we click on the refresh button', async () => {

    //Act
    const res = render(<ProjectProvider value={projectContextValue}> <Activity /> </ProjectProvider>);
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
    expect(projectContextValue.getEmployeesActivity).toHaveBeenCalledTimes(2); //we can't test the params because of the callback
  });

  it('contains the right elements in the table\'s body', () => {
    //Arrange
    const expectedResults = [
      "",
      "Clauvis Kitieu",
      "0h",
      "24h",
      "20h",
      "0h",
      "96h",
      "",
      "Philippe Blanchette",
      "64h",
      "0h",
      "0h",
      "16h",
      "80h",
    ]
    //Act
    let cellValues = [];
    const res = render(<ProjectProvider value={projectContextValue}> <Activity /> </ProjectProvider>);
    let cells = res.queryAllByRole('cell');
    for (let index = 0; index < cells.length; index++) {
      cellValues.push(cells[index].textContent);
    }
    //Assert
    expect(cellValues).toEqual(expectedResults);
  });
});
