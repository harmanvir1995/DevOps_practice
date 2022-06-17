//CHAKRA
import { Button } from "@chakra-ui/button";
import { WarningTwoIcon } from "@chakra-ui/icons";
//COMPONENTS
import TextFormatNumber from "../components/TextFormatNumber";
import TextFormatTime from "../components/TextFormatTime";


/**
 * Columns description for the projects table.
 */
export const columnsProjectList = [
  {
    Header: "Client",
    accessor: "name",
  },
  {
    Header: "Période",
    accessor: "period",
  },
  {
    Header: "Flag",
    accessor: (data) => data.times?.isOver ?? data.isOver,
    Cell: (props) => {
      return props.value ? <WarningTwoIcon color='#e50046'/> : null;
    },
    sortType: "basic",
  },
  {
    Header: "Estimé",
    accessor: (data) => data.times?.estimatedHours ?? data.estimatedHours,
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatTime hours={props.value} roundUp={true}/>;
    },
  },
  {
    Header: "Utilisation",
    accessor: (data) => data.times?.workedHours ?? data.workedHours,
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatTime hours={props.value} roundUp={true}/>;
    },
  },
  {
    Header: "Delta",
    accessor: (data) => {
      let value = data.times?.delta ?? data.delta;
      let color = (value < 0) ? '#e50046' : '#2AAE47' ;
      return {value, color}; 
    },
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatTime hours={props.value.value} color={(props.value.color)} roundUp={true}/>;
    },
  },
  {
    Header: "%",
    accessor: (data) => {
      let value = data.times?.percentage ?? data.percentage ?? 0;
      let color = (value > 100) ? '#e50046' : '#2AAE47' ;
      return {value, color}; 
    },
  
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value.value} isPercentage = {true} color={props.value.color} roundUp = {true}/>;
    },
  },
  {
    Header: "Détails",
    accessor: (data) => {return {key : data.key, onClickDetails : data.onClickDetails}},
    Cell: (props) => {
      return <Button 
              size="xs" 
              borderColor="#e50046" 
              fontWeight="bold" 
              color="#e50046" 
              border="2px" 
              borderRadius="10px"  
              _hover={{ bg: "#e50046", color:"white"}} 
              variant="outline" 
              onClick={props.value.onClickDetails} 
              value={props.value.key}> Détails 
              </Button>
    }
  }
];
