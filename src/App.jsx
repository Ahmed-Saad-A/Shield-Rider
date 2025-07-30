import "./App.css";
import Navbar from './App/Layout/Navbar/Navbar';
import Footer from './App/Layout/Footer/Footer';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default App;
