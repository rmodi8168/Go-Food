import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function Login() {
  
  const [credentials,setCredentials] =useState({email:"",password:""})
  let navigate=useNavigate()
  const handlesubmit= (event)=>{
    event.preventDefault();
    console.log(credentials.email,credentials.password)
    fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({email:credentials.email,password:credentials.password})
    }).then(response => response.json()).then(json => {
      if(!json.success){
        localStorage.setItem('isLogin','false')
        alert("Enter Valid Credentials")
      }
      else{
        localStorage.setItem('userEmail',credentials.email)
        localStorage.setItem('isLogin','true')
        navigate("/");
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
  //               <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  //               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
  //               <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  //           </div>
  //           <div className="mb-3">
  //               <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  //               <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  //           </div>
  //           <button type="submit" className="btn btn-primary">Submit</button>
  //           <Link to="/creatuser" className='m-3 btn btn-danger'>New User</Link>
  //       </form>
  //   </div>
  // )

  return(
    <form onSubmit={handlesubmit}> 
    <div><Navbar /></div>
    <div className="wrapper ">
        
        <div className="logo">
            <img src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
            GoFood
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label m-4">Login Here</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="email" id="userName" placeholder="email" name='email' value={credentials.email} onChange={onChange}/>
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button className="btn mt-3 bg-success">Login</button>
        <Link to="/creatuser" className="btn mt-3 fs-6 bg-success">New User</Link>
        
      </div>
      <div><Footer /></div>
    </form>
  )
}

