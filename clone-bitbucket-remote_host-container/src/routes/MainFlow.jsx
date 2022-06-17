// REACT ROUTER
import { Switch, Route, Redirect } from "react-router-dom";

// COMPONENTS
import MainLayout from "../components/MainLayout";
import NotFound from "../components/NotFound";

// PAGES
import ProjectDetails from "../pages/ProjectDetails";
import ProjectsForfait from "../pages/ProjectsForfait";
import ProjectsSupport from "../pages/ProjectsSupport";
import Chargeability from "../pages/Chargeability";
import Activity from "../pages/Activity";


/**
 * Main page of the application, 
 * displays components depending on routes
 * @returns the main flow component
 */
const MainFlow = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/">
          <Redirect to="/projects-forfait" />
        </Route>

        <Route path="/projects-forfait">
          <ProjectsForfait />
        </Route>

        <Route path="/projects-support">
          <ProjectsSupport />
        </Route>

        <Route path="/activity">
          <Activity />
        </Route>

        <Route path="/chargeability">
          <Chargeability />
        </Route>
        
        <Route path="/project-details/:projectKey">
          <ProjectDetails />
        </Route>

        <Redirect from="/login" to="/projects-forfait" />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </MainLayout>
  );
};

export default MainFlow;
