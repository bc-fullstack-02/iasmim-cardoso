import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'
import SingnUp from './Pages/SignUp';
import Home from './Pages/home';
import ProfilePage from './Pages/ProfilePage';
import Friends from './Pages/Friends';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SingnUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/friends",
    element: <Friends />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
