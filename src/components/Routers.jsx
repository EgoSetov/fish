import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import News from "../pages/News";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Home from "../pages/HomePage";

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
