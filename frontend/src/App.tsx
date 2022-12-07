import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'
import SingnUp from './Pages/SignUp';

const router = createBrowserRouter ([
  {
    path:"/",
    element:<Login />
  },
  {
    path:"/signup",
    element: <SingnUp />,
  }
]);

 function App() {
  return <RouterProvider router={router}/>;
}

export default App;
