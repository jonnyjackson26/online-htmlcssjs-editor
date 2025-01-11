import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import OnlineEditor from './Pages/OnlineEditor/OnlineEditor';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/editor",
    element: <OnlineEditor />,
  },
  
]);

function Main() {
  return (
    <RouterProvider router={router} />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
);