import React from "react";
import "./style.scss";
import { NavLink as Link } from "react-router-dom";

export default () => (
    <nav className="nav">
        <ul>
            <li>
                <Link to="/task-1/">Task 1: Delete Button</Link>
            </li>
            <li>
                <Link to="/task-3/">Task 3: Auto Complete</Link>
            </li>
        </ul>
    </nav>
);
