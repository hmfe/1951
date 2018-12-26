import React from "react";
import useTitle from "../../utils/useDocumentTitle";
import "./style.scss";

export default () => {
    useTitle("Task 1 - Delete button");
    return <button className="btn-delete">Delete</button>
};
