import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Component/Global State/Ctx.jsx";
import { PostsProvider } from "./Component/Global State/PostsContext/PostsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
