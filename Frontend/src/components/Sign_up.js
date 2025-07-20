import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
const host = "http://localhost:5000";
const Signup = () => {
  const { alert, Showalert } = useContext(noteContext);
  const history = useNavigate();
  const [details, setDetails] = useState({ name: "", email: "", password: "", ConfirmPassword: "" })
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const handleclick = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createuser`;
    const { email, name, password } = details;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, password })

    });
    const json = await response.json();
    //console.log(json);
    if (!json.error) {
      localStorage.setItem('token', json.authenticationtoken);
      const token = localStorage.getItem('token');
      //console.log(token);
      history("/Home");
      Showalert("Signed in Successfully");
    }
  }
  return (
    <>
      <div className="container" style={{ marginTop: "50px" }}>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name={"name"} placeholder="Enter Name" onChange={onChange} value={details.name} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}  name={"email"} value={details.email}/>

          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChange} value={details.Password} name={"password"} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input type="password" className="form-control" id="ConfirmPassword" placeholder="Password" name={"ConfirmPassword"} onChange={onChange} value={details.ConfirmPassword} />
          </div>
          <div className="form-check my-2">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <div className="my-3">
            <small id="emailHelp" className="form-text text-muted">Make sure that everything entered above is correct</small>
            <button type="submit" className="btn btn-primary mt-3" onClick={handleclick}>Submit</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default Signup;