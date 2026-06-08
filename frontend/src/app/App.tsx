import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routes } from "./router/routers";

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}