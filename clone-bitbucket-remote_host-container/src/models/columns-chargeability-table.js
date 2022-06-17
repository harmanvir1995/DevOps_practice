import TextFormatNumber from "../components/TextFormatNumber";
import TextFormatTime from "../components/TextFormatTime";
import { Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { BASE_URL } from "../helpers/constants";

import { Context as ProjectContext } from "../context/ProjectContext";
import { useContext } from "react";


export const columnsChargeability = [
    {
      Header: "Employé.e",
      id: "employee",
      columns: [
        {
          Header : () => { return <Text></Text>; },
          id: "employeesPhotosColumn",
          accessor: (data) => { return data.photoURL; },
          Cell: (props) => {
            return (props.value) ? <Image boxSize="32px" src={BASE_URL + props.value} alt="" /> : null;
          },
        },
        {
          Header : () => { return <Text>Total</Text>; },
          id: "employeesNamesColumn",
          accessor: (data) => { return data.name; },
        },
      ]
    },

    {
      Header: "Heures travaillées (total)",
      id: "hoursWorked",
      columns: [
        {
          Header : () => { 
            const { state } = useContext(ProjectContext);
            let employeesWorkingHours = state.chargeability.employeesWorkingHours;
            let totalHoursWorked = 0;
            employeesWorkingHours.forEach(empObj => {
              totalHoursWorked += empObj.totalHoursWorked;
            });
            return <TextFormatTime hours={totalHoursWorked} roundUp={true}/>; 
          },
          id: "hoursWorkedColumn",
          accessor: (data) => { return data.totalHoursWorked; },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value} roundUp={true}/>;
          },
        },
      ]
    },

    {
      Header: "Facturable",
      id: "billableHours",
      columns: [
        {
          Header : (props) => { 
            const { state } = useContext(ProjectContext);
            let employeesWorkingHours = state.chargeability.employeesWorkingHours;
            let totalBillableHours = 0;
            employeesWorkingHours.forEach(empObj => {
              totalBillableHours += empObj.billable;
            });
            return <TextFormatTime hours={totalBillableHours} roundUp={true}/>; 
          },
          id: "billableHoursColumn",
          accessor: (data) => {
            let value = data.billable;
            let color = (value < (data.billable + data.nonBillable) * data.objective / 100) ? '#e50046' : '#000000' ;
            return {value, color}; 
          },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value.value} color={(props.value.color)} roundUp={true}/>;
          },
        },
      ]
    },

    {
      Header: "Non-facturable",
      id: "nonBillableHours",
      columns: [
        {
          Header : (props) => { 
            const { state } = useContext(ProjectContext);
            let employeesWorkingHours = state.chargeability.employeesWorkingHours;
            let totalNonBillableHours = 0;
            employeesWorkingHours.forEach(empObj => {
              totalNonBillableHours += empObj.nonBillable;
            });
            return <TextFormatTime hours={totalNonBillableHours} roundUp={true}/>; 
          },
          id: "nonBillableHoursColumn",
          accessor: (data) => { return data.nonBillable },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value} roundUp={true}/>;
          },
        },
      ]
      
    },

    {
      Header: "Objectif (h)",
      id: "objectiveH",
      columns: [
        {
          Header : () => { 
            const { state } = useContext(ProjectContext);
            let employeesWorkingHours = state.chargeability.employeesWorkingHours;
            let totalObjectiveH = 0;
            employeesWorkingHours.forEach(empObj => {
              totalObjectiveH += empObj.objectiveHours;
            });
            return <TextFormatTime hours={totalObjectiveH} roundUp={true}/>; 
          },
          id: "objectiveHColumn",
          accessor: (data) => {return data.objectiveHours; },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value} roundUp={true}/>;
          },
        },
      ]
    },

    {
      Header: "Objectif (%)",
      id: "objective%",
      columns: [
        {
          Header : () => { 
            const { state } = useContext(ProjectContext);
            let employeesWorkingHours = state.chargeability.employeesWorkingHours;
            let totalObjectiveH = 0;
            let totalHoursWorked = 0;
            employeesWorkingHours.forEach(empObj => {
              totalObjectiveH += empObj.objectiveHours;
              totalHoursWorked += empObj.totalHoursWorked;
            });
            let totalObjectifPercent = (totalHoursWorked === 0) ? null : (totalObjectiveH / totalHoursWorked) * 100;
            return <TextFormatNumber number={totalObjectifPercent} isPercentage={true} roundUp={true}/>; 
          },
          id: "objective%Column",
          accessor: (data) => { return data.objective; },
          isNumeric: true,
          Cell: (props) => { 
            return <TextFormatNumber number={props.value} isPercentage={true} roundUp={true}/>;
          },
        },
      ]
    },

    {
      Header: "Chargeabilité brute",
      id: "grossChargeability",
      columns: [
        {
          Header : () => { 
            const { state } = useContext(ProjectContext);
            let employeesWorkingHours = state.chargeability.employeesWorkingHours;
            let totalHoursWorked = 0;
            let totalBillableHours = 0;
            let totalGrossChargeabilityPercent = 0;
            employeesWorkingHours.forEach(empObj => {
              totalHoursWorked += empObj.totalHoursWorked;
              totalBillableHours += empObj.billable;
            });
            totalGrossChargeabilityPercent = (totalHoursWorked === 0) ? null : (totalBillableHours / totalHoursWorked) * 100;
            return <TextFormatNumber number={totalGrossChargeabilityPercent} isPercentage='true' roundUp={true}/>; 
          },
          id: "grossChargeabilityColumn",
          accessor: (data) => { 
            let value = data.grossChargeability;
            let color = data.billable < data.objectiveHours ? '#e50046' : '#000000';
            return {value, color}; 
          },
          isNumeric: true,
          Cell: (props) => {
            return props.value == null ?
            "" :
            <TextFormatNumber number={props.value.value} color={props.value.color} isPercentage='true' roundUp={true}/>;
          },
        },
      ]
    },

    {
      Header: "Chargeabilité nette",
      id: "netChargeability",
      columns: [
        {
          Header : () => { 
            const { state } = useContext(ProjectContext);
            let employeesWorkingHours = state.chargeability.employeesWorkingHours;
            let totalObjectiveH = 0;
            let totalBillableHours = 0;
            let totalNetChargeabilityPercent = 0;
            employeesWorkingHours.forEach(empObj => {
              totalObjectiveH += empObj.objectiveHours;
              totalBillableHours += empObj.billable;
            });
            totalNetChargeabilityPercent = (totalObjectiveH === 0) ? null : (totalBillableHours / totalObjectiveH) * 100;
            return <TextFormatNumber number={totalNetChargeabilityPercent} isPercentage='true' roundUp={true}/>; 
          },
          id: "netChargeabilityColumn",
          accessor: (data) => { 
            let value = data.netChargeability;
            let color = (data.billable < data.objectiveHours) ? '#e50046' : '#000000' ;
            return {value, color}; 
          },
          isNumeric: true,
          Cell: (props) => {
            return props.value == null ?
                "" : <TextFormatNumber number={props.value.value} color={props.value.color} isPercentage='true' roundUp={true}/>;
          },
        },
      ]
    },

  ];