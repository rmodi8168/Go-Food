import React, { useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Signup() {
  
  const [credentials,setCredentials] =useState({name:"",location:"",email:"",password:""})
  let navigate=useNavigate();
  const handlesubmit=(event)=>{
    event.preventDefault();
    fetch("http://localhost:5000/api/creatuser", {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name:credentials.name,location:credentials.location,email:credentials.email,password:credentials.password})
    }).then(response => response.json()).then(json => {
      if(json.success){
        alert("Your Account is Successfully Created")
        navigate('/login')
      }
     
      //console.log(global.email_exist)
      else{
        global.email_exist=false;
        alert("Not a Valid Credentials or Entered Email is Allready Exist!!")
      }
      
    })
   
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  // return (
  //   <div className='container bg-secondary m-3'>
  //     <form onSubmit={handlesubmit}>
  //           <div className="mb-3">
  //               <label htmlFor="name" className="form-label">Name</label>
  //               <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
  //           </div>
  //           <div className="mb-3">
  //               <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  //               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
  //               <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  //           </div>
  //           <div className="mb-3">
  //               <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  //               <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  //           </div>
  //           <div className="mb-3">
  //               <label htmlFor="location" className="form-label">location</label>
  //               <input type="text" className="form-control" id="exampleInputlocation" name='location' value={credentials.location} onChange={onChange}/>
  //           </div>
            
  //           <button type="submit" className="btn btn-primary">Submit</button>
  //           <Link to="/Login" className='m-3 btn btn-danger'>Allready User</Link>
  //       </form>
  //   </div>
  // )

  return(
    <form onSubmit={handlesubmit}> 
    <div><Navbar /></div>
    <div className="wrapper">
        <div className="logo">
            <img src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            GoFood
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label m-4">Create Your Account</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text"  id="userName" placeholder="Name"  name='name' value={credentials.name} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" id="userName" placeholder="email" name='email' value={credentials.email} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" id="userName" placeholder="address"  name='location' value={credentials.location} onChange={onChange}/>
        </div>
        <button className="btn mt-3 bg-success">Signup</button>
        <Link to="/login" className="btn mt-3 fs-6 bg-success">Signin</Link>
      </div>
      <div><Footer /></div>
    </form>
  )
}