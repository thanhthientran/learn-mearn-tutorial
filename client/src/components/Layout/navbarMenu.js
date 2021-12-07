// import {Navigate} from 'react-router-dom'
import { useContext } from 'react'

import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import logoutIcon from '../../assets/logout.svg'
import {AuthContext} from '../../contexts/AuthContext'

const NavbarMenu = () => {

    //Take username
    const {authState:{user:{username}},logoutUser} = useContext(AuthContext)
    // console.log(username)

    //logout
    const logout =()=>{
        logoutUser()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
      <img src={logo} alt='logo' width='32' height='32' />
    <span className="navbar-brand ml-1">PrevLife</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link active" >Dashboard</Link>
          <span className="visually-hidden">(current)</span>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link" >About</Link>
          <span className="visually-hidden">(current)</span>
        </li>
        
      </ul>
        <span className="navbar-brand nav-item" disabled>{username}</span>
      <button className="btn btn-secondary my-2 my-sm-0 nav-item" onClick={logout}>
        <img src={logoutIcon} alt="logout" width='24' height='16'/>
        Logout
        </button>
    </div>
  </div>
</nav>
    )
}

export default NavbarMenu