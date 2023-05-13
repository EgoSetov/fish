import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import News from "../pages/News";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Home from "../pages/HomePage";
import Rules from "../pages/Rules";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <News />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/rules",
        element: <Rules />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/admin",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export { router };
