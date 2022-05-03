import "./App.css";
import Home from "./Containers/Home";
import Profile from "./Containers/Profile";
import Gallery from "./Containers/Gallery";
import Categories from "./Containers/Category.js";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">React JS Frontend</h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <Link className="btn btn-light btn-outline-primary" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item- m-1">
            <Link className="btn btn-light btn-outline-primary" to="/gallery">
              Gallery
            </Link>
          </li>
          <li className="nav-item- m-1">
            <Link className="btn btn-light btn-outline-primary" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item- m-1">
            <Link
              className="btn btn-light btn-outline-primary"
              to="/categories"
            >
              Categories
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
