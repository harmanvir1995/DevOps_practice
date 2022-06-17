import React, { useContext, useEffect } from 'react';
import { Context as ProjectContext, Provider as PojectProvider } from "../../context/ProjectContext";
import { render, act} from "@testing-library/react";
import { Text } from "@chakra-ui/react";

jest.mock("../../services/project.service.js", () => ({
  //parameter2: used to determine if fetchProjectsWithTimesV2 succeeds or fails, which allows to test both cases
  fetchProjectsWithTimesV2: (parameter1, parameter2) => { return parameter2 ? { data: {lastSync: "2022/11/21" } } : null},

  //parameter1: used to determine if fetchProjectDetails succeeds or fails, which allows to test both cases
  fetchProjectDetails: (parameter1, parameter2) => { return parameter1 ? { data: {lastSync: "2022/11/21" } } : null},
  
  fetchEmployeesWorktime: (parameter1) => { return parameter1 ? { data: {lastSync: "2022/11/21" } } : null},

  fetchEmployeesActivity: (parameter1) => { return parameter1 ? { data: {lastSync: "2022/11/21" } } : null},

  sendRefreshAllData: () => { return {};},
}))

const TestComponent = ({ functionToTest, param1 = null, param2 = null, param3 = null }) => {
  const pContext = useContext(ProjectContext);
  let toTest = pContext[functionToTest];
  useEffect(async () => {
    toTest(param1, param2, param3);
  }, [])
  return <>
    <Text data-testid='state-forfait'>{pContext.state.forfait ? pContext.state.forfait.lastSync : ""}</Text>
    <Text data-testid='state-error'>{pContext.state.errorMessage}</Text>
    <Text data-testid='state-support'>{pContext.state.support ? pContext.state.support.lastSync : ""}</Text>
    <Text data-testid='state-selectedCategory'>{pContext.state.selectedCategory}</Text>
    <Text data-testid='state-projectDetails'>{pContext.state.projectDetails ? pContext.state.projectDetails.lastSync : ""}</Text>
    <Text data-testid='state-chargeability'>{pContext.state.chargeability ? pContext.state.chargeability.lastSync : ""}</Text>
    <Text data-testid='state-activity'>{pContext.state.activity ? pContext.state.activity.lastSync : ""}</Text>
    <Text data-testid='state-reloadOnChange'>{pContext.state.reloadOnChange}</Text>

  </>
}

describe('Login render Page', () => {

  it('contains', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getProjectsForfait" param1={true} param2={null} param3={"cat"} /></PojectProvider>);
    });
    expect(res.getByTestId('state-forfait').textContent).toEqual('21/11/2022, 00:00:00');
  });

  it('tests ', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getProjectsForfait" param1={false} param2={null} param3={"cat"} /></PojectProvider>);
    });
    expect(res.getByTestId('state-error').textContent).toEqual('Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.');
  });

  it('contains', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getProjectsSupport" param1={true} param2={null} param3={"cat"} /></PojectProvider>);
    });
    expect(res.getByTestId('state-support').textContent).toEqual('21/11/2022, 00:00:00');
  });

  it('tests ', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getProjectsSupport" param1={false} param2={null} param3={"cat"} /></PojectProvider>);
    });
    expect(res.getByTestId('state-error').textContent).toEqual('Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.');
  });

  it('tests if ', () => {
    const res = render(<PojectProvider><TestComponent functionToTest="setError" param1={"error"} /></PojectProvider>);
    expect(res.getByTestId('state-error').textContent).toEqual("error");
  });

  it('tests if ', () => {
    const res = render(<PojectProvider><TestComponent functionToTest="setSelectedCategory" param1={"catTest"} /></PojectProvider>);
    expect(res.getByTestId('state-selectedCategory').textContent).toEqual("catTest");
  });

  it('tests ', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getProjectDetails" param1={true} param2={null} param3={"key"} /></PojectProvider>);
    });
    expect(res.getByTestId('state-projectDetails').textContent).toEqual('21/11/2022, 00:00:00');
  });

  it('tests getProjectDetails', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getProjectDetails" param1={false} param2={null} param3={"key"} /></PojectProvider>);
    });
    expect(res.getByTestId('state-error').textContent).toEqual('Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.');
  });

  it('tests getEmployeesWorktime', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getEmployeesWorktime" param1={true} param2={null} /></PojectProvider>);
    });
    expect(res.getByTestId('state-chargeability').textContent).toEqual('21/11/2022, 00:00:00');
  });

  it('tests getEmployeesWorktime error', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getEmployeesWorktime" param1={false} param2={null} /></PojectProvider>);
    });
    expect(res.getByTestId('state-error').textContent).toEqual('Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.');
  });

  it('tests getEmployeesActivity', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getEmployeesActivity" param1={true} param2={null} /></PojectProvider>);
    });
    expect(res.getByTestId('state-activity').textContent).toEqual('21/11/2022, 00:00:00');
  });

  it('tests getEmployeesActivity error', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="getEmployeesActivity" param1={false} param2={null} /></PojectProvider>);
    });
    expect(res.getByTestId('state-error').textContent).toEqual('Oups ! Problème durant la récupération des infos. Merci de rafraichir ou réessayer plus tard.');
  });

  it('tests refreshAllData', async () => {
    let res;
    await act(async () => {
      res = render(<PojectProvider><TestComponent functionToTest="refreshAllData" param1={null} /></PojectProvider>);
    });
    expect(res.getByTestId('state-reloadOnChange').textContent).toEqual('1');
  });
});