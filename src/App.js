import "./App.scss";
import Header from "./component/Header";
import Home from "./component/Home";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Home />
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
