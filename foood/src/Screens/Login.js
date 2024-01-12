import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: inputs.email, password: inputs.password })
    });
    const temp = await res.json();
    console.log(temp);

    if (!temp.success) {
      alert("enter valid inputs")
    } else {
      navigate("/");

      localStorage.setItem("useremail", inputs.email);
      //console.log(localStorage.getItem("useremail") + "here!!!!");//line2
      localStorage.setItem("authToken", temp.authToken);
      console.log(localStorage.getItem("authToken"));
    }
  }

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='container'>
      <form className='mt-4' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={inputs.email} onChange={handleChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={inputs.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/createuser" className="m-3 btn btn-danger">I'm a new user</Link>
      </form>
    </div>
  )
}

export default Login
