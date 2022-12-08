import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'
import SingnUp from './Pages/SignUp';
import Home from './Pages/home';

const router = createBrowserRouter ([
  {
    path:"/",
    element:<Login />
  },
  {
    path:"/signup",
    element: <SingnUp />,
  },
  {
    path:"/home",
    element: <Home />,
  }
]);

 function App() {
  return <RouterProvider router={router}/>;
}

export default App;
