import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App, { loader as postsLoader } from "./routes/App";
import ConnectWallet from "./routes/ConnectWallet";
import RootLayout from "./routes/RootLayout";
import PostDetails, { loader as postDetailsLoader } from "./routes/PostDetails";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        loader: postsLoader,
        children: [
          {
            path: "/connect-wallet",
            element: <ConnectWallet />
          },
          {
            path: "/:id",
            element: <PostDetails />,
            loader: postDetailsLoader
          }
        ]
      }
    ]
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
