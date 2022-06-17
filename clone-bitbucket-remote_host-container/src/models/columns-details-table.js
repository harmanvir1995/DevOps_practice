import { WarningTwoIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/layout";
import TextFormatNumber from "../components/TextFormatNumber";
import TextFormatTime from "../components/TextFormatTime";

import { Context as ProjectContext } from "../context/ProjectContext";
import { useContext } from "react";

export const columnsProjectDetails = [
    {
      Header: () => { return <Text>composantes</Text> },
      id: "composantes",
      columns: [
        {
          Header : () => { return <Text>Total</Text>; },
          id: "componentsNamesColumn",
          accessor: (data) => { return data.componentName },
        },
      ]
    },

    {
      Header: () => { return <Text>Flag</Text> },
      id: "flag",
      columns: [
        {
          Header : (props) => {
            const { state } = useContext(ProjectContext);
            return <>{(state.projectDetails.totals.totalTimeSpent > state.projectDetails.totals.totalTimeOriginalEstimate) ?
              <WarningTwoIcon /> : null
            }</>;
          },
          id: "flagColumn",
          accessor: (data) => { return data.componentTimeSpent > data.componentTimeOriginalEstimate },
          Cell: (props) => {
            return props.value ? <WarningTwoIcon /> : null;
          },
        },
      ]
    },

    {
      Header: () => { return <Text align='right'>Estimé</Text> },
      id: "estimated",
      columns: [
        {
          Header : (props) => {
            const { state } = useContext(ProjectContext);
            return <TextFormatTime hours={state.projectDetails.totals.totalTimeOriginalEstimate} />;
          },
          id: "timeOrigEstimateColumn",
          accessor: (data) => { return data.componentTimeOriginalEstimate },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value} roundUp={true}/>;
          },
        },
      ],
    },

    {
      Header: () => { return <Text align='right'>Utilisation</Text> },
      id: "timeSpent",
      columns: [
        {
          Header : (props) => {
            const { state } = useContext(ProjectContext);
            return <TextFormatTime hours={state.projectDetails.totals.totalTimeSpent} />;
          },
          id: "timeSpentColumn",
          accessor: (data) => { return data.componentTimeSpent },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value} roundUp={true}/>;
          },
        },
      ],
    },

    {
      Header: () => { return <Text align='right'>Delta</Text> },
      id: "delta",
      columns: [
        {
          Header : (props) => {
            const { state } = useContext(ProjectContext);
            let value = state.projectDetails.totals.totalTimeOriginalEstimate - state.projectDetails.totals.totalTimeSpent;
            return <TextFormatTime hours={value} color={(value < 0) ? '#e50046' : '#2AAE47'} />;
          },
          id: "deltaColumn",
          accessor: (data) => { 
            let value = data.componentDelta;
            let color = (value < 0) ? '#e50046' : '#2AAE47';
            return {value, color}; 
          },
          isNumeric: true,
          Cell: (props) => {
            return <TextFormatTime hours={props.value.value} color={props.value.color} roundUp={true}/>;
          },
        },
      ],
    },

    {
        Header: () => { return <Text align='right'>RAF</Text> },
        id: "raf",
        columns: [
          {
            Header : (props) => {
              const { state } = useContext(ProjectContext);
              return <TextFormatTime hours={state.projectDetails.totals.totalRAF} />;
            },
            id: "RAFColumn",
            accessor: (data) => { return data.componentRAF },
            isNumeric: true,
            Cell: (props) => {
              return <TextFormatTime hours={props.value} roundUp={true}/>;
            },
          },
        ],
    },

    {
      Header: () => { return <Text align='right'>%</Text> },
      id: "ratio",
      columns: [
        {
          Header : (props) => {
            const { state } = useContext(ProjectContext);
            let value = (state.projectDetails.totals.totalTimeOriginalEstimate === 0) ?
              null : state.projectDetails.totals.totalTimeSpent === 0 ? 
              0 : (state.projectDetails.totals.totalTimeSpent / state.projectDetails.totals.totalTimeOriginalEstimate) * 100;
            return <TextFormatNumber number = {value} color={(value > 100) ? '#e50046' : '#2AAE47'} roundUp={true}/>;
          },
          id: "%Column",
          accessor: (data) => { 
            let value = data.componentTimeSpentPercent;
            let color = (value > 100) ? '#e50046' : '#2AAE47';
            return {value, color};
          },
          isNumeric: true,
          Cell: (props) => {
            return props.value == null ?
            "" : <TextFormatNumber number={props.value.value} color={props.value.color} isPercentage={true} roundUp={true}/>;
          },
        },
      ],
    },
  ];
  