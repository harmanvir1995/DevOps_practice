import { WarningTwoIcon } from "@chakra-ui/icons";
import TextFormatNumber from "../components/TextFormatNumber";

export const dataProjectMock = [
  {
    id: 1,
    client: "Videotron",
    ressources: ["Yannick, Ethienne, Quentin"],
    period: "Annuelle",
    flag: true,
    estimated: 401,
    used: 728,
    deltaUnit: -327.37,
    deltaPourcentage: 81.64,
  },
  {
    id: 2,
    client: "Via Rail",
    ressources: ["Yannick, Ethienne, Quentin"],
    period: "Hebdo",
    flag: false,
    estimated: 34,
    used: 2128.26,
    deltaUnit: -2094.37,
    deltaPourcentage: 6158.64,
  },
  {
    id: 3,
    client: "Wazo",
    ressources: ["Yannick, Ethienne, Quentin"],
    period: "Annuelle",
    flag: true,
    estimated: 374,
    used: 818.26,
    deltaUnit: 94.37,
    deltaPourcentage: 58.64,
  },
];

export const columnsProjectListMock = [
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
    accessor: "isOver",
    Cell: (props) => {
      return props.value ? <WarningTwoIcon /> : null;
    },
  },
  {
    Header: "Estimé",
    accessor: "estimatedHours",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
  {
    Header: "Utilisation",
    accessor: "workedHours",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
  {
    Header: "Delta",
    accessor: "delta",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
  {
    Header: "%",
    accessor: "percentage",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
];

export const columnsProjectDetailsMock = [
  {
    Header: "Composants",
    accessor: "",
  },
  {
    Header: "Flag",
    accessor: "flag",
    Cell: (props) => {
      return props.value ? <WarningTwoIcon /> : null;
    },
  },
  {
    Header: "Estimé",
    accessor: "estimated",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
  {
    Header: "Utilisation",
    accessor: "used",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
  {
    Header: "Delta",
    accessor: "deltaUnit",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
  {
    Header: "%",
    accessor: "deltaPourcentage",
    isNumeric: true,
    Cell: (props) => {
      return <TextFormatNumber number={props.value} />;
    },
  },
];
