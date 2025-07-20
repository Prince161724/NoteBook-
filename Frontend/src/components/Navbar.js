import React,{useEffect,useContext} from 'react';
import nextContext from '../context/notes/noteContext';
import {Link,useLocation,useNavigate} from "react-router-dom";
const Navbar=()=>{
  const history=useNavigate();
  const onClick2=()=>{
    history("/Signup")
  }
  const onClick3=()=>{
    history("/")
  }
  let location=useLocation();
  const {token,setToken}=useContext(nextContext);
  const onClick=()=>{
    localStorage.removeItem('token');
    setToken('');
    history("/");
  }
    return(
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="#">INoteBook</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item ${location.pathname==='/Home'?"active":""}`}>
        <Link className="nav-link" to="/Home">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className={`nav-item ${location.pathname==='/about'?"active":""}`}>
        <Link className="nav-link" to="/about">About</Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      {(!token)?<a className="btn btn-primary mx-2" href="#" role="button" onClick={onClick3}>Log-In</a>:<a className="btn btn-primary mx-2" href="#" role="button" onClick={onClick}>Log-Out</a>}
      {!token && <a className="btn btn-primary mx-2" href="#" role="button" onClick={onClick2}>Sign-Up</a>}
    </form>
  </div>
</nav>
        </>
    )
}
export default Navbar;