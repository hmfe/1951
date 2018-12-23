import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Task3 from "./features/task-3";
import Task1 from "./features/task-1-delete-button";
import Navigation from "./features/navigation";
import "./features/_shared/style.scss";

const App = () => (
    <Router>
        <>
            <Navigation />
            <main>
                <Redirect from="/" exact to="/task-1" />
                <Route path="/task-1/"  component={Task1} />
                <Route path="/task-3/" component={Task3} />
            </main>
        </>
    </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
