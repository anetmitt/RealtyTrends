import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './site.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/Identity/Login';
import Register from './routes/Identity/Register';
import UserTriggers from './routes/userTriggers/UserTriggers';
import PriceStatistics from './routes/PriceStatistics/PriceStatistics';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login/",
          element: <Login />
        },
        {
          path: "register/",
          element: <Register />
        },
        {
          path: "mytriggers/:id?",
          element: <UserTriggers />
        },
        {
          path: "pricestatistics/",
          element: <PriceStatistics />
        }
      ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

