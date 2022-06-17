import TextFormatTime from "../components/TextFormatTime";
import { Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { BASE_URL } from "../helpers/constants";
import { Context as ProjectContext } from "../context/ProjectContext";
import { useContext } from "react";

/**
 * 
 * @param {*} categoriesLabelsList 
 * @returns 
 */
export const generateColumnsActivity = (categoriesLabelsList) => {
  let activityColumns = [];

  activityColumns.push({
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
  });

  /*Add the categories columns */
  categoriesLabelsList.forEach(label => {
    activityColumns.push({
      Header: () => { return <Text align='right'>{label}</Text> },
      id: label,
      columns: [
        {
          Header : () => { 
            const { state } = useContext(ProjectContext);
            let employeesActivity = state.activity.employeesActivity;
            let totalHoursCategory = 0;
            employeesActivity.forEach(empObj => {
              totalHoursCategory += empObj[label];
            });
            return <TextFormatTime hours={totalHoursCategory} roundUp={true}/>;
          },
          id: label + "Column",
          accessor: (data) => { return data[label]; },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value} roundUp={true}/>;
          }
        },
      ]
    });
  });

  activityColumns.push({
    Header: () => { return <Text align='right'>Heures travaillées (total)</Text> },
    id: "totalHoursWorked",
    columns: [
      {
        Header : () => { 
          const { state } = useContext(ProjectContext);
          let employeesActivity = state.activity.employeesActivity;
          let totalHoursEmployees = 0;
          employeesActivity.forEach(empObj => {
            totalHoursEmployees += empObj.totalHoursWorked;
          });
          return <TextFormatTime hours={totalHoursEmployees} roundUp={true}/>;
        },
        id: "totalHoursWorkedColumn",
        accessor: (data) => { 
          return data.totalHoursWorked; //The sum of hours worked by an emp in all categories
        },
        isNumeric: true,
        Cell: (props) => { return <TextFormatTime hours={props.value} roundUp={true}/>; },
      },
    ]
  });

  return activityColumns;
}