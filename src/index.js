import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";
import Home from "./component/Home/Home";
import TodoInput from "./component/todolist/TodoInput";
import Login from "./component/Login/login";
import ListUser from "./component/ListUser/ListUser";
import UserDetail from "./component/UserDetail/UserDetails";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/todo",
        element: (
          <PrivateRouter>
            <TodoInput />
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user",
        element: (
          <PrivateRouter>
            <ListUser />
          </PrivateRouter>
        ),
      },
      {
        path: "/detail/:idUser",
        element: <UserDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>loi tai trang 404</h1>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
