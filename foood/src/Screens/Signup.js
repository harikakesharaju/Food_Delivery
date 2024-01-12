import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';

function Signup() {
const navigate=useNavigate();
const [inputs,setinputs]=useState({name:"",email:"",password:"",location:""})


const handleSubmit=async (e)=>{
e.preventDefault();
const res=await fetch("http://localhost:5000/api/createuser",{
  method:'POST',
  headers:{
    'Content-Type' : 'application/json'
  },
  body:JSON.stringify({name:inputs.name,email:inputs.email,password:inputs.password,location:inputs.location})
}) 
const temp=await res.json();
console.log(temp);

if(!temp.success){
  alert("enter valid inputs")
}
else{
  navigate('/');
}
}

const handleChange=(e)=>{
  setinputs({
    ...inputs,
    [e.target.name]:e.target.value,
  })
}

  return (
    <div className='container'>
      <form className='mt-4' onSubmit={handleSubmit}>
  <div className="mb-3" >
  <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' value={inputs.name} onChange={handleChange}/>
   </div>
   <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='email' value={inputs.email}  onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  name='password' value={inputs.password}  onChange={handleChange}/>
  </div>
  <div className="mb-3" >
  <label htmlFor="location" className="form-label">Location</label>
    <input type="text" className="form-control" id="location" name='location' value={inputs.location} onChange={handleChange}/>
   </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
</form>
    </div>
  )
}

export default Signup
