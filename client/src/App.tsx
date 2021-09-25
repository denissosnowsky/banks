import { useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import BankPage from "./components/BankPage/BankPage";
import CalculationPage from "./components/CalculationPage/CalculationPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ListPage from "./components/ListPage/ListPage";
import { useGetUserId } from "./hooks/useGetUserId";
import { useDeleteHistoriesMutation } from "./store/generated/graphql";

function App() {

  return (
    <BrowserRouter>
      <AlertComponent />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/banks" />} />
        <Route exact path="/banks" render={() => <ListPage />} />
        <Route exact path="/banks/:id" render={() => <BankPage />} />
        <Route path="/calculation" render={() => <CalculationPage />} />
        <Route path="*" render={() => <ErrorPage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
