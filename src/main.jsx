import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";

import Root from "./routes/root";
import Rooms from "./routes/rooms";
import Room from "./routes/room";
import ErrorPage from "./error-page";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "rooms",
//         element: <Rooms />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: "rooms/:roomId",
//         element: <Room />,
//         errorElement: <ErrorPage />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Root />}></Route>
      <Route path="rooms" element={<Rooms />} />
      <Route path="rooms">
        <Route path=":roomId" element={<Room />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
