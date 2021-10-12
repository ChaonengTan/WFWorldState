import { NavLink } from 'react-router-dom'
// import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <NavLink to="/">WFWorldState</NavLink>
      </div>
      <div>
        <NavLink to="/PoE">Plains of Eidelon</NavLink>
        <NavLink to="/OV">Orb Vallis</NavLink>
        <NavLink to="/CD">Cambion Drift</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
