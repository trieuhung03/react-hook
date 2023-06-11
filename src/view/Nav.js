// import './Nav.css'
import "./Nav.scss";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <div class="topnav">
      <NavLink activeClassName="active" to="/" exact={true}>
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/news">
        News
      </NavLink>
      <NavLink activeClassName="active" to="/contact">
        Contact
      </NavLink>
    </div>
  );
};

export default Nav;
