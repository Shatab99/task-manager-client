import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import Root from './Root';
import ToDo from './Components/ToDo';
import OnGoing from './Components/OnGoing';
import Completed from './Components/Completed';
import DashBoard from './Components/DashBoard';
import AuthBanner from './Components/LoginUp/AuthBanner';
import AuthProvider from './Providers/AuthProvider';
import PrivateRoute from './Providers/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Root /></PrivateRoute>,
    children: [
      {
        path: '/',
        element: <PrivateRoute><ToDo /></PrivateRoute>,
      },
      {
        path: '/ongoing',
        element: <PrivateRoute><OnGoing /></PrivateRoute>
      },
      {
        path: '/completed',
        element: <PrivateRoute><Completed /></PrivateRoute>
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard /></PrivateRoute>
      }
    ]
  },
  {
    path: '/login',
    element: <AuthBanner />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
