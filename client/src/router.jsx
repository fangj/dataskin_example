import React from "react";
import { createHashRouter } from "react-router-dom";
import App from './App';
import loadable from "@loadable/component";

const Loading=()=><div>加载中...</div>

const Login = loadable(() => import("./routers/Login"), {fallback: <Loading /> })
const Coffee = loadable(() => import("./routers/Coffee"), {fallback: <Loading /> })
const CoffeeController = loadable(() => import("./routers/CoffeeController"), {fallback: <Loading /> })
const BlueTech = loadable(() => import("./routers/BlueTech"), {fallback: <Loading /> })

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
        path: "/coffee",
        element: <Coffee/>,
    },
    {
        path: "/coffee_controller",
        element: <CoffeeController/>,
    },
    {
        path: "/bluetech",
        element: <BlueTech/>,
    },
    {
        path: "/*",
        element: <div>Other</div>,
    },
]);

export default router;