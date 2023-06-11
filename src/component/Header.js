import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/image/logo192.png";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = (props) => {

  const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("token")
navigate("/login")
toast.success("Logout Success")
}

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span> Hung" Web</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Manage Users
            </NavLink>
            <Nav acticeKey={"/"} className="me-auto">
              <NavDropdown title="Setting" className="justify-content-end">
              <NavLink to="/login" className="dropdown-item">
              Login
            </NavLink>
                <NavDropdown.Item onClick={() => {handleLogout()}}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
