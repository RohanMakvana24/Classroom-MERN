import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/services/store.js";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
