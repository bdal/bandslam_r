import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StackSandbox from './components/StackSandbox';
import GridSandbox from './components/GridSandbox';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import Upload from './components/upload/Upload';
import Watch from './components/watch/Watch';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "viewer",
        element: <App/>
      },
      {
        path: "upload",
        element: <Upload/>
      },
      {
        path: "temp",
        element: <Watch/>
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <StyledEngineProvider injectFirst>
//       <App />
//     </StyledEngineProvider>
    
//   </React.StrictMode>
// );

