import { generateColumnsActivity } from "../models/columns-activity-table";

import { toastError, toastSuccess } from "../models/toasts";
// COMPONENTS
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";
//CHAKRA
import { Heading } from "@chakra-ui/layout";
import { Button, Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
//REACT
import { useToast } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
//CONTEXT
import { Context as ProjectContext } from "../context/ProjectContext";
//DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Activity = () => {
    const toast = useToast();

    /*Date picker*/
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;

    const { state, getEmployeesActivity } = useContext(ProjectContext);
    useEffect(() => {
      getEmployeesActivity(true, null, startDate, endDate);
    }, [state.reloadOnChange]);

    if (state.errorMessage) {
      return (
        <Text color="red.400" fontWeight="bold" textAlign="center">
          {state.errorMessage}
        </Text>
      );
    }
    
    const onClickRefresh = () => {
        getEmployeesActivity( 
            false, //useCache
            (isSuccess) => {
              toast(
                isSuccess
                  ? toastSuccess("")
                  : toastError("")
              );
            },
            startDate,
            endDate );
      };
    return state.activity ? (
      <>
      <Flex alignItems="center">
        <Box>
          <Heading pb={8}>Activité</Heading>
        </Box>
        <Spacer />
        <Box data-testid={"DatePicker"}>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              
              /*the if will prevent loading after selecting only the startDate*/
              if(update[1]) {
                getEmployeesActivity( 
                  true, //useCache
                  (isSuccess) => {
                    toast(
                      isSuccess
                        ? toastSuccess("")
                        : toastError("")
                    );
                  },
                  update[0], //startDate
                  update[1], //endDate 
                );
              }
            }}
          />
        </Box>
      </Flex>  
        <Flex alignItems="center" mb={8}>
            <Box>
            <Text id="activityLastSync">Dernière synchronisation : {state.activity.lastSync} </Text>
            </Box>
            <Spacer />
            <Box>
                <Button
                data-testid={"refresh-button"}
                leftIcon={<RepeatIcon />}
                colorScheme="teal"
                variant="solid"
                onClick={onClickRefresh}
                isLoading={state.isLoading}
                >
                Rafraichir
                </Button>
            </Box>
        </Flex>
        <DataTable columns={generateColumnsActivity(state.activity.categoriesLabelsList)} data={state.activity.employeesActivity} isPaginated={true} />
      </>

    ):(
      <Loader />
  );
}

export default Activity;