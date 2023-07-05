import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default  function Profile() {
    let [data,setData]=useState([])
    const fetchMyOrder = async () => {
        await fetch("http://localhost:5000/api/getUserDetails", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response= await res.json()
            await setData([response.name,response.location])
        })}
        console.log(data)
        useEffect(() => {
            fetchMyOrder()
        }, [])
        let navigate=useNavigate()
        const handleLogout=()=>{
            localStorage.setItem('isLogin','false')
            navigate("/")
          }
    return (
        <div>
        <div><Navbar /></div>
        <div className="wrapper ">
            <div className="logo ">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""/>
            </div>
            <div className='d-flex'>
              <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Name :</label></div>
              <div className="form-label m-1 mt-4">{data[0]}</div>
            </div>
            <div className='d-flex'>
              <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Email:</label></div>
              <div className="form-label mt-4">{localStorage.getItem('userEmail')}</div>
            </div>
            <div className='d-flex'>
              <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">location : </label></div>
              <div className="form-label m-1 mt-4">{data[1]}</div>
            </div>
            <Link to="/myOrders" className="btn mt-4 fs-6 bg-success">My Orders</Link>
            <Link to="/" className="btn mt-4 fs-6 bg-success " onClick={handleLogout}>Log Out</Link>
            <Link to="/" className="btn mt-4 fs-6 bg-success">Home</Link>
            
        </div>
        <div><Footer /></div>
        </div>
        
    )
}