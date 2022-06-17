//REACT
import React, { useContext, useEffect, useState } from "react";
// CHAKRA
import { ChakraProvider } from "@chakra-ui/react";
//REACT ROUTER
import { BrowserRouter as Router } from "react-router-dom";
//CONTEXT
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./context/AuthContext";
import { Provider as ProjectProvider } from "./context/ProjectContext";
//ROUTES
import MainFlow from "./routes/MainFlow";
import AuthFlow from "./routes/AuthFlow";
//COMPONENTS
import Loader from "./components/Loader";

/**
 * display home page or the authentification page depending on token
 * @returns home page component or authentification component
 */
const AppWorflow = () => {
  const { state: authState, tryLocalSignin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authState.token) {
      tryLocalSignin();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [authState]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      {authState.token ? <MainFlow /> : <AuthFlow />}
    </Router>
  );
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ProjectProvider>
          <AppWorflow />
        </ProjectProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
