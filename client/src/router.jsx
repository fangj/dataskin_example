import React from "react";
import { createHashRouter } from "react-router-dom";
import App from './App';
const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <div>Login</div>,
    },
    {
        path: "/*",
        element: <div>Other</div>,
    },
]);

export default router;