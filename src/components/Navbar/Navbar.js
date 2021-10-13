import { NavLink } from 'react-router-dom'
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <NavLink className='navLink' to="/">WFWorldState</NavLink>
      </div>
      <div className='navRight'>
        <NavLink className='navLink' to="/PoE">Plains of Eidelon</NavLink>
        <NavLink className='navLink' to="/OV">Orb Vallis</NavLink>
        <NavLink className='navLink' to="/CD">Cambion Drift</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
