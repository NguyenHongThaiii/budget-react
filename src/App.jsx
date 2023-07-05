import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./View/Auth/LoginPage/LoginPage";
import RegisterPage from "./View/Auth/RegisterPage/RegisterPage";
import MainPage from "./View/Main/MainPage";
import { Store } from "./store/store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage store={Store} />,
  },
  {
    path: "/login",
    element: <LoginPage store={Store} />,
  },
  {
    path: "/register",
    element: <RegisterPage store={Store} />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
