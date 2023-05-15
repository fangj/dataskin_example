import React from "react";
import { createHashRouter } from "react-router-dom";
import App from './App';
import loadable from "@loadable/component";

const Loading=()=><div>加载中...</div>
const Login = loadable(() => import("./routers/Login"), {fallback: <Loading /> })

const router = createHashRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/*",
        element: <div>Other</div>,
    },
]);

export default router;