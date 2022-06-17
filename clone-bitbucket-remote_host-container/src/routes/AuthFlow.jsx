//ROUTER
import { Route, Switch, Redirect } from "react-router-dom";
//LAYOUT
import AuthLayout from "../pages/auth/AuthLayout";
//PAGES
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";

/**
 * The authentification page of the application,
 * displays the components loginPage or ForgotPasswordPage depending on routes inside the AuthLayout component
 * @returns the authentification flow component
 */
const AuthFlow = () => {
  return (
    <AuthLayout>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>

        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </AuthLayout>
  );
};

export default AuthFlow;
