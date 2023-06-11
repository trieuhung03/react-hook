import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h2>This Page Isn't Available</h2>
      <h3>this Link may be broken ....</h3>
      <button className="btn btn-primary">
        <NavLink to={"/"}>Back to Home page</NavLink>
      </button>
    </div>
  );
};

export default NotFound;
