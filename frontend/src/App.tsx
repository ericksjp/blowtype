import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
