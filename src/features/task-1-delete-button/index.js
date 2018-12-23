import React, { useEffect } from "react";
import "./style.scss";

export default () => {
    useEffect(() => {
        document.title = "Task 1 - Delete button";
    }, []);
    return <button className="btn-delete">Delete</button>
};
