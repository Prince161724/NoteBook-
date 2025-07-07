import React,{useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
const host = "http://localhost:5000";

const Login=()=>{
  
    let history=useNavigate();
    const {alert,Showalert,setToken}=useContext(noteContext);
    const [details,setDetails]=useState({email:"",password:""});
    const onChange=(e)=>{
    setDetails({ ...details, [e.target.name]: e.target.value });
}
const handleclick=async (e)=>{
    e.preventDefault();
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    });
    const json = await response.json();
    console.log("Edit response:", json);
    if(json){
      console.log("Token = "+localStorage.getItem('token'));
        localStorage.setItem('token', json.authenticationtoken);
        if(json.authenticationtoken){
        history("/Home");
        Showalert("Logged in Successfully");
        setToken(json.authenticationtoken);
      }
    }
    }
    return(<>
        <div className="container" style={{ marginTop: "50px" }}>
          
    <form>
      <h1 style={{marginBottom: "100px",marginLeft: "350px" }}>Login Form</h1>

  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={onChange}
/>
    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={onChange}
/>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={(e)=>{handleclick(e)}}>Submit</button>
</form>
</div>
</>)

}

export default Login;