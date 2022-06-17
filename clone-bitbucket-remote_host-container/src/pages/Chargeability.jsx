import { columnsChargeability } from "../models/columns-chargeability-table";
import { toastError, toastSuccess } from "../models/toasts";
// COMPONENTS
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";
//REACT
import { useToast } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
//CONTEXT
import { Context as ProjectContext } from "../context/ProjectContext";
//CHAKRA
import { Heading } from "@chakra-ui/layout";
import { Button, Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
//DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Chargeability = () => {
    const toast = useToast();
    /*Date picker*/
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;

    const { state, getEmployeesWorktime } = useContext(ProjectContext);
    useEffect(() => {
      getEmployeesWorktime(true, null, startDate, endDate);
    }, [state.reloadOnChange]);

    if (state.errorMessage) {
      return (
        <Text color="red.400" fontWeight="bold" textAlign="center">
          {state.errorMessage}
        </Text>
      );
    }
    
    const onClickRefresh = () => {
      getEmployeesWorktime( 
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

    return state.chargeability ? (
      <>
      <Flex alignItems="center">
        <Box>
          <Heading pb={8}>Chargeabilité</Heading>
        </Box>
        <Spacer />
        <Box>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              /*the if will prevent loading after selecting only the startDate*/
              if(update[1]) {
                getEmployeesWorktime( 
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
            <Text>Dernière synchronisation : {state.chargeability.lastSync} </Text>
            </Box>
            <Spacer />
            <Box>
                <Button
                data-testid="refresh-button"
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
        <DataTable columns={columnsChargeability} data={state.chargeability.employeesWorkingHours} isPaginated={true} />
      </>
        
      ):(
        <Loader />
    );
}

export default Chargeability;